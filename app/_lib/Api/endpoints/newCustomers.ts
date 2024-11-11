import { guestGet } from "../axiosGuest";
import { handleAxiosError } from "@/app/utils/errorHandler";
import { NEW_ACCOUNT_REQUEST_ENDPOINT } from "..";

export const newCustomerRequest = async () => {
  try {
    const response = await guestGet(NEW_ACCOUNT_REQUEST_ENDPOINT);
    return response; 
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
