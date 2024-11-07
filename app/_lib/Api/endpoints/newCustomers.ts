import { guestGet } from "../axiosGuest";
import { NewRequest } from "@/app/_types/apiTypes";
import { handleAxiosError } from "@/app/utils/errorHandler";
import { NEW_ACCOUNT_REQUEST_ENDPOINT } from "..";

export const newCustomerRequest = async () => {
  try {
    const response = await guestGet(NEW_ACCOUNT_REQUEST_ENDPOINT);
    console.log("API Response:", response);
    return response; // Make sure the structure of 'response' matches what you're expecting
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
