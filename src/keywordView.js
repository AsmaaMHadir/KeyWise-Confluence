import ForgeUI, {render, Text, CustomContent} from '@forge/ui';
import api, { route } from "@forge/api";

const keywordView = async (context) => {
    const { customContentId } = context;
  
    // Fetch the custom content data (e.g., body) based on the customContentId.
    const customContentData = await fetchCustomContentData(customContentId);
  
    // Create the UI to display the custom content.
    const contentUI =  <Text>This is a place where the custom content will be rendered!</Text>
  
    return contentUI;
  };
  
  // Fetch custom content data (e.g., body) based on customContentId.
  const fetchCustomContentData = async (customContentId) => {
    // Implement the logic to fetch data from Confluence REST API or your own data source.
    // You might need to use the `customContentId` to make the request.
  
    // For example:
    const response = await api.asUser().requestConfluence(`/wiki/api/v2/custom-content/${customContentId}`);
    const customContentData = await response.json();
  
    return customContentData;
  };
  
export  {keywordView}