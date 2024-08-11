import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from './config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
//Get fuctions for data from back
export const endpoints = {
  bins: '/api/bins//created-bin',
  items: '/api/items/get-items',
  locations: '/api/locations/get-locations',
  createlocations: '/api/locations/created-location',



  // LocationRoute.get("/get-locations", getLocations);
  // LocationRoute.post("/created-location", getInputLocation,)
  // LocationRoute.delete("/deleted-location/:locId", getDeletedLocation);


  stores: '/stores',
};
