
import api, { route } from "@forge/api";


const cheerio = require('cheerio');


const getPages_ids = async () =>{

    const response = await api.asApp().requestConfluence(route`/wiki/api/v2/pages`, {
      headers: {
        'Accept': 'application/json'
      }
     
    });  
  
    const data = await response.json();
  
    const pages_ids = data.results.map(page => page.id);
  
    return pages_ids;
  
  
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
  const fetchAllPageContents = async () => {
    try {
      const pageIds = await getPages_ids(); // Get the list of page IDs
  
      // fetch content for all pages concurrently
      const pageContentPromises = pageIds.map(pageid => fetchPage_content(pageid));
      const pageContents = await Promise.all(pageContentPromises);
  
      return pageContents
  
    } catch (error) {
      console.error("Error fetching page contents:", error);
    }
  };
  