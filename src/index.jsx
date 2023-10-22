import ForgeUI, { render, SpacePage, useState, useProductContext, Table, Head, Cell, Text, Row } from '@forge/ui';
import { createPineconeIndex } from "./createPineconeIndex.js";
import { updatePinecone } from "./updatePinecone.js";
import {extractAppId,getSpaceIdByKey} from "./helpers.mjs";
import { createCustomContent} from "./createKeyword.js";
import { keywordView } from './keywordView.js';
require('dotenv').config();

const keywords = [{

}];

const App = () => {
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
  </Head>
  {keywords.map(keyword => (
    <Row>
      <Cell>
        <Text>{issue.key}</Text>
      </Cell>
      <Cell>
        <Text>{issue.status}</Text>
      </Cell>
      <Cell>
        <Text>{issue.page}</Text>
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




