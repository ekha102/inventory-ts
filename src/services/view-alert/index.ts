import axios from "../axios";

export const getDetailItemById = async (itemId: number) => {
  console.log("Item ID API: ", itemId)
  try {
    const response = await axios.get(`/api/alert-view/get-alertViewId/${itemId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}