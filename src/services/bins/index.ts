import { IBins } from "@/sections/bins/typeBins";
import axios from "../axios";


export const createBinName = async (payload: []) => {
  try {
    // console.log(payload);
    const response = await axios.post(`/api/bins/created-bin`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export const deleteBinId = async (binId: number) => {
  try {
    await axios.delete(`/api/bins/deleted-bin/${binId}`);
  } catch (error: any) {
    throw error.response.data;
  }
}


export const getBinById = async (binId: number) => {
  try {
    const response = await axios.get(`/api/bins/bin-by-id/${binId}`);
    // console.log("Back API: ", response.data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}


export const putBinForm = async (binId: number, payload: IBins) => {
  try {
    console.log("Back API: ", binId, payload);
    const response = await axios.put(`/api/bins/put-binIdUpdate/${binId}`, payload);
    
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}