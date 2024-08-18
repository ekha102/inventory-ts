import { ICreateItem } from "@/sections/home/typeItems";
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