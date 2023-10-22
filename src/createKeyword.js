import {useState}   from '@forge/ui';
import api, { route } from "@forge/api";

 
export  function createKeyword (ktitle,topic,def,pages)  {

  /*
  get a dictionary contained desired keyword properties and info 
  */

  const keywordList = [];

  const keyword = {
    keyword_title: ktitle,
    keyword_topic: topic,
    keyword_definition: def,
    listed_in_pages:pages,
  }

  keywordList.push(keyword);

  return keywordList

}

// function to create and return a list of keyword dictionaries  

export function updateKeywordList(keyword) {

  const keywordList = [];

  keywordList.push(keyword_dict);
  return keywordList;



}




