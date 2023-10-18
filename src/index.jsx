import ForgeUI, { render, Text, ContentAction, ModalDialog, useState, PageCustomContentListView } from '@forge/ui';
import { createPineconeIndex } from "./1-createPineconeIndex.js";
import { updatePinecone } from "./2-updatePinecone.js";

require('dotenv').config();



// get space key, app ID, environment type from product context (space)
const {spaceKey, localId, environmentType} = useProductContext();

// PINECONE
const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

const App = () => {




  const type = `forge:${extractAppId(localId)}:${environmentType}:KeyWord`; // custom content type
  const keyWordID = 1;
  const pageId = 753665;
  const keyword =  useState( async () => await createKeyWordCustomContent(type,));

 

  return (
    <SpaceCustomContentListView type={type} spaceKey={spaceKey} />
  );
};

export const run = render(
  <ContentAction>
    <App/>
  </ContentAction>
);

const getSpaceIdByKey = async (spaceKey) => {

  
  const response = await api.asUser().requestConfluence(route`/wiki/api/v2/spaces?${spaceKey}`, {
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

  // If no matching space is found, you can return null or handle the error accordingly
  console.log("space key not found")
  return null; 
}

// Create custom Keyword content
// type <---
const createKeyWordCustomContent = async (type, spaceKey, pageId, keywordID, keywordValue) =>{

  const spaceId = await getSpaceIdByKey(spaceKey);

  var bodyData = `{
    "type": ${type},
    "spaceId": ${spaceId},
    "pageId": ${pageId},
    "customContentId": ${keyWordID},
    "title": "Keyword",
    "body": {
      "representation": "storage",
      "value": ${keywordValue}
    }
  }`;
  
  const response = await api.asUser().requestConfluence(route`/wiki/api/v2/custom-content`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  });
  
  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());

  // postcondition: keyword custom content type created 

  // update the keyword value




}
