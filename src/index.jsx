import ForgeUI, { render, SpacePage, useState, useProductContext, Table, Head, Cell, Text, Row } from '@forge/ui';
import api, { route } from "@forge/api";
import * as cheerio from 'cheerio';
import { BlobServiceClient } from "@azure/storage-blob";
import { v1 as uuidv1 } from 'uuid';


require('dotenv').config();








const keywords = [{
  title:"hello world",
  category:"greeting",
  definition:"greeting expression",
  resides:"page 1",
},]



const runProgram = async () => {

  const context = useProductContext();
  const spaceKey = context.spaceKey;
  const spaceID = getSpaceIdByKey(spaceKey);


const result = await fetchPageContents_toBlobStorage(spaceID);

  return result
}






const App = () => {

  const result =  useState(async () => await runProgram());

  console.log(result);

// pages are now stored inside blob storage and accessible to the LLm
// make api call to extract keywords and return a dictionary with their information
// render as done below
return(


  <Table>
  <Head>
    <Cell>
      <Text>Keyword</Text>
    </Cell>
    <Cell>
      <Text>Category</Text>
    </Cell>
    <Cell>
      <Text>Definition</Text>
    </Cell>
    <Cell>
      <Text>Mentioned in</Text>
    </Cell>
    <Cell>
      <Text>Test</Text>
    </Cell>
  </Head>
  {keywords.map(keyword => (
    <Row>
      <Cell>
        <Text>{keyword.title}</Text>
      </Cell>
      <Cell>
        <Text>{keyword.category}</Text>
      </Cell>
      <Cell>
        <Text>{keyword.definition}</Text>
      </Cell>
      <Cell>
        <Text>{keyword.resides}</Text>
      </Cell>
      <Cell>
        <Text>{data_response.resides}</Text>
      </Cell>
    </Row>
  ))}
</Table>



)
   
};

export const run = render(
  <SpacePage>
    <App/>
  </SpacePage>
);

const getSpaceIdByKey = async (spaceKey) => {

    
  const response = await api.asApp().requestConfluence(route`/wiki/api/v2/spaces?key=${spaceKey}`, {
      headers: {
      'Accept': 'application/json'
      }
  });
  
  const data_response = await response.json();
  

  
  // Iterate through the results to find the space with the matching key
  for (const space of data_response.results) {
      if (space.key === spaceKey) {
      return space.id; // Return the ID of the matching space
      }
  }
  
  // If no matching space is found, return null or handle the error accordingly
  console.log("space key not found")
  return null;

};


// pass page id and return page content as string
const fetchPage_content = async (pageid) =>{
  
    
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
const fetchPageContents_toBlobStorage = async (spaceID) => {
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
    return 1;


  } catch (error) {
    console.error("Error fetching and storing page contents:", error);
    return -1;
  }

};




function extractAppId(inputString) {
  const regex = /--extension-(.*?)--static/;
  const match = regex.exec(inputString);
  if (match && match[1]) {
    return match[1];
  } else {
    return null; // Return null if no match is found
  }
};



// works
function extractPageIds(jsonResponse) {
    const parsedResponse = JSON.parse(jsonResponse); // Parse the JSON response
  
    if (parsedResponse.results && Array.isArray(parsedResponse.results)) {
      // Check if the "results" property is an array
      const pageIds = parsedResponse.results.map(page => page.id);
      return pageIds;
    } else {
      // Handle the case where the JSON structure is different
      return [];
    }
  };
