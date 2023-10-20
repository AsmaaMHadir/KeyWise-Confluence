import ForgeUI, { render, Text, ContentAction, ModalDialog, useState, CustomContent } from '@forge/ui';
import { createPineconeIndex } from "./createPineconeIndex.js";
import { updatePinecone } from "./updatePinecone.js";

import {getSpaceIdByKey, createKeyWordCustomContent} from "./CustomKeywordContent.js"

require('dotenv').config();




const App = () => {

  /*
  // PINECONE
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });
  */

  // get space key, app ID, environment type from product context (space)
  //const {spaceKey, localId, environmentType} = useProductContext();
  //const type = `forge:${extractAppId(localId)}:${environmentType}:KeyWord`; // custom content type
  //const pageId = "753665";

 
// modify below
  return (
    <SpaceCustomContentListView type={type} spaceKey={spaceKey} />
  );
};

export const run = render(
  <ContentAction>
    <App/>
  </ContentAction>
);



const App = () => {
    return (
        <Text>This is a place where the custom content will be rendered!</Text>
    );
};

export const run = render(
    <CustomContent>
        <App/>
    </CustomContent>
);
