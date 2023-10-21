import ForgeUI, { render, SpaceCustomContentListView, SpacePage, useState, CustomContent, useProductContext } from '@forge/ui';
import { createPineconeIndex } from "./createPineconeIndex.js";
import { updatePinecone } from "./updatePinecone.js";
import {extractAppId,getSpaceIdByKey} from "./helpers.js";
import { createCustomContent} from "./keywordCustomContent.js";
import { keywordView } from './keywordView.js';
require('dotenv').config();




const App = () => {


  const context = useProductContext();
  const {spaceKey, localId, environmentType} = useProductContext();
  const appID = extractAppId(localId); // extract app ID
  const type = `forge:${appID}:${environmentType}:KeyWord`;

  useState(async () => await createCustomContent(type, parseInt(getSpaceIdByKey(spaceKey), 10), "1", "hello"));
  // Create a the keyword type:

  /*
  // PINECONE
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });
  */

 
// modify below
return (
  <SpaceCustomContentListView
    type={type}  // Replace with your custom content type
    spaceKey={spaceKey}      // Replace with your space key
  >
    {(customContent, context) => (
      <CustomContent key={customContent.id}>
        {keywordView(context)}
      </CustomContent>
    )}
  </SpaceCustomContentListView>
);
};

export const run = render(
  <SpacePage>
    <App/>
  </SpacePage>
);




