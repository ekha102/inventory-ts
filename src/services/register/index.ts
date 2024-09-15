import { IRegisterForm } from "@/sections/register/type-regsiter-form"
import axiosInstance from "../axios"

export const createUserAccount = async (payload:IRegisterForm) => {
  try {
    const response = await axiosInstance.post(`/api/register/created-account`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response.d
  }
}