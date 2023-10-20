import {useState}   from '@forge/ui';
import api, { route } from "@forge/api";

const createCustomContent = async (type, spaceID, pageID, customContentID,value) => {


  
    var bodyData = {
      "type": type,
      "status": "current",
      "spaceId": spaceID,
      "pageId": pageID,
      "customContentId": customContentID,
      "title": "Keywords",
      "body": {
        "representation": "storage",
        "value": value
      }
    };
    
    const response = await api.asUser().requestConfluence(route`/wiki/api/v2/custom-content`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData) // Convert the bodyData object to a JSON string
    });
    
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(await response.json());
    
    }





export const getSpaceIdByKey = async (spaceKey) => {

    
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
    
const getCustomContent = async () => {

    const response = await api.asUser().requestConfluence(route`/wiki/api/v2/custom-content?type={type}`, {
        headers: {
          'Accept': 'application/json'
        }
      });



}