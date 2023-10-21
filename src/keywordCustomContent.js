import {useState}   from '@forge/ui';
import api, { route } from "@forge/api";

export const createCustomContent = async (type, spaceID, customContentID,value) => {

    // type: forge:[APP_ID]:[ENVIRONMENT_ID]:[MODULE_KEY]
// if keyword is not already created then:
    var bodyData = {
      "type": type,
      "status": "current",
      "spaceId": spaceID,
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






