import { ILocations, ILocationsPayload } from "@/sections/location/typeLocation";
import axios from "../axios";

export const deleteLocation = async (locId: number) => {
  try {
    // console.log(loc_id);
    const  response = await axios.delete(`/api/locations/deleted-location/${locId}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
}

export const getAddForm = async (payload: ILocations ) => {
  try {
    // console.log(payload);
    const response = await axios.post(`/api/locations/created-location`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}