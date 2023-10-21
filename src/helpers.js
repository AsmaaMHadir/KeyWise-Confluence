import api, { route } from "@forge/api";


export function extractAppId(inputString) {
    const regex = /--extension-(.*?)--static/;
    const match = regex.exec(inputString);
    if (match && match[1]) {
      return match[1];
    } else {
      return null; // Return null if no match is found
    }
  };

export const getSpaceIdByKey = async (spaceKey) => {

    
    const response = await api.asApp().requestConfluence(route`/wiki/api/v2/spaces?${spaceKey}`, {
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
