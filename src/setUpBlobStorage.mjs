import { BlobServiceClient } from "@azure/storage-blob";
import { v1 as uuidv1 } from 'uuid';
import { DefaultAzureCredential } from '@azure/identity';

import 'dotenv/config';

async function createBlobStorage() {
    ```
    Creates a container on Azure Blob storage 

    Input: None
    Output: Blob service client object , container client object
    ```
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");


    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');

    const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
    );


  // Create a unique name for the container
const containerName = 'pagescontainer' + uuidv1();

console.log('\nCreating container...');
console.log('\t', containerName);

// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(containerName);
// Create the container
const createContainerResponse = await containerClient.create();
console.log(
  `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
);

return {blobServiceClient, containerClient};


}






// containerClient: ContainerClient object
// blobName: string, includes file extension if provided
// fileContentsAsString: blob content
async function uploadBlobFromString(containerClient, blobID, fileContentsAsString){
    ```
    Uloads a string text as a blob into the container
    
    ```
      // Create a unique name for the blob
    const blobName = 'page' + blobID + '.txt';

    // Display blob name and url
    console.log(
    `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    );
    // Create blob client from container client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
    await blockBlobClient.upload(fileContentsAsString, fileContentsAsString.length);
  }

  export { createBlobStorage, uploadBlobFromString };