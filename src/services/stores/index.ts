import { IStoreCreate } from "@/sections/stores/typeStores";
import axios from "../axios";


export const deleteStore = async (storeId: number) => {
  // console.log("Api Store Id: ", storeId)
  try {
    const  response = await axios.delete(`/api/stores/deleted-store/${storeId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}


export const createStore = async (payload: IStoreCreate) => {
  try {
    const response = await axios.post(`/api/stores/created-store`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }

  
} 