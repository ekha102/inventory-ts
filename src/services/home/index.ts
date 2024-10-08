import { ICreateItem, IEditIdList } from "@/sections/home/typeItems";
import axios from "../axios";


export const createItemToForm = async (payload: ICreateItem) => {
  // console.log("API: ", payload);
  try {
    const response = await axios.post(`/api/items/created-item`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}


export const editIdForm = async (itemId: number) => {
  try {
    const response = await axios.get(`/api/items/get-itemId/${itemId}`);
    // console.log("response", response);
    
    return response.data;
  } catch (error: any) {
    return error.response.data
  }
}

export const deleteItemId = async (itemId: number) => {
  // console.log("Send to the be:", itemId)
  try {
    // const response = 
    await axios.delete(`/api/items/deleted-item/${itemId}`);
    // console.log("Be push into FE: ", response.data)

  } catch (error: any) {
    throw error.response.data;
  }
}

// Put: after edit the data put into the API
export const updateFormItemById = async (itemId:number, payload:IEditIdList) => {
  console.log("BE: ", payload);
  try {
    const response = await axios.put(`/api/items/put-itemIdUpdate/${itemId}`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

