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

    
    const response = await api.asUser().requestConfluence(route`/wiki/api/v2/spaces?key=${spaceKey}`, {
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

export function extractPageIds(jsonResponse) {
      const parsedResponse = JSON.parse(jsonResponse); // Parse the JSON response
    
      if (parsedResponse.results && Array.isArray(parsedResponse.results)) {
        // Check if the "results" property is an array
        const pageIds = parsedResponse.results.map(page => page.id);
        return pageIds;
      } else {
        // Handle the case where the JSON structure is different
        return [];
      }
    }


const ID = await getSpaceIdByKey('CS');
console.log(ID);
    
    
    
    