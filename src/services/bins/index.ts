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