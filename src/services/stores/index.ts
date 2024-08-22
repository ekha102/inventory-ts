import axios from "../axios";


export const deleteStore = async (storeId: number) => {
  // console.log("Api Store Id: ", storeId)
  try {
    const  response = await axios.delete(`/api/stores/deleted-store/${storeId}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
}
