
import api, {  route  } from "@forge/api";
import {createBlobStorage, uploadBlobFromString} from "./setUpBlobStorage.mjs";
import {getSpaceIdByKey,extractPageIds} from "./helpers.mjs";
import { useProductContext} from '@forge/ui';

import * as cheerio from 'cheerio';





// pass page id and return page content as string
export const fetchPage_content = async (pageid) =>{
  
    
    const response = await api.asApp().requestConfluence(route`/wiki/api/v2/pages/${pageid}?body-format=storage`, {
      headers: {
        'Accept': 'application/json'
      }
     
    });  
  
    
    const data = await response.json();
    const bodyVal = data.body.storage.value;
  
    // Load the HTML content into Cheerio
    const $ = cheerio.load(bodyVal);
  
    // Extract the text content using Cheerio
    const plainTextContent = $.text();
   
    return plainTextContent;
    // embed this -> send to pinecone and perform query
  
  
  };
  
  
  // retrieve body content for each page
  // what happens when new page is added or modified?
export const fetchPageContents_toBlobStorage = async (spaceID) => {
    try {
 

      const response = await api.asApp().requestConfluence(route`/wiki/api/v2/spaces/${spaceID}/pages`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json(); // Get the list of page IDs

      const pageIds = extractPageIds(data);
  
    
      // Create a blob storage container
      const { blobServiceClient, containerClient } = await createBlobStorage();

      // Fetch content for all pages concurrently
      const pageContentPromises = pageIds.map(async (pageId) => {
        const pageContent = await fetchPageContent(pageId);
        const blobID = pageId; 
        const fileContentsAsString = JSON.stringify(pageContent); // Convert content to a string

        // Upload the content as a blob
        await uploadBlobFromString(containerClient, blobID, fileContentsAsString);
        console.log(`Uploaded page content for page ID ${pageId} to blob storage.`);

      });

      const pageContents = await Promise.all(pageContentPromises);



    } catch (error) {
      console.error("Error fetching and storing page contents:", error);
    }

  };
  
const context = useProductContext();
const spaceKey = context.spaceKey;
const spaceID = getSpaceIdByKey(spaceKey);

fetchPageContents_toBlobStorage(spaceID)
  .then(() => {
    console.log('Page contents have been fetched and stored in blob storage.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });