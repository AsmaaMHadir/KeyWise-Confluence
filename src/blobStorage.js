
import { BlobServiceClient } from "@azure/storage-blob";
import { v1 as uuidv1 } from 'uuid';
import { DefaultAzureCredential } from '@azure/identity';



// works
export const createBlobStorage = async () => {
    ```
    Creates a container on Azure Blob storage 
  
    Input: None
    Output: Blob service client object , container client object
    ```
  const storageAccountName = 'keywisestorage';
  const sasToken = process.env.AZURE_SAS_TOKEN;
  
  // Create the BlobServiceClient object with connection string
  const blobServiceClient = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  
  // Create a unique name for the container
  const containerName = 'pagescontainer' + uuidv1();
  
  console.log('\nCreating container...');
  console.log('\t', containerName);
  
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
  // Create the container
  const createContainerResponse = await containerClient.createIfNotExists({
    access: 'container',
  });
  console.log(
  `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
  );
  
  return {blobServiceClient, containerClient};
  
  
  }
  
  // works
  
  // containerClient: ContainerClient object
  // blobName: string, includes file extension if provided
  // fileContentsAsString: blob content
  export const uploadBlobFromString = async (containerClient, blobID, fileContentsAsString) => {
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
    
  
  