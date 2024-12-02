import { handleAxiosError } from "@/app/utils/errorHandler";
import { NEW_ACCOUNT_REQUEST_ENDPOINT } from "..";
import { authUserGet } from "../axiosAuthUser";
// import { ApiResponse } from "../types";

interface BaseCustomer {
  userId: number;
  email: string;
  name: string;
  userType: string;
  createdAt: string;
  activationStatus: string;
}

interface CorporateCustomer extends BaseCustomer {
  userType: 'cooperate';
  natureOfBusiness: string;
  primaryBusinessAddress: string;
}

interface IndividualCustomer extends BaseCustomer {
  userType: 'individual';
  occupation: string;
  address: string;
}

type Customer = CorporateCustomer | IndividualCustomer;

interface ApiResponse {
  data: Customer[];
  message: string;
}

export const newCustomerRequest = async (): Promise<ApiResponse> => {
  try {
    const response = await authUserGet<ApiResponse>(NEW_ACCOUNT_REQUEST_ENDPOINT);
    
    if (!response || !response.data) {
      throw new Error("Invalid response format from server");
    }
    
    return response;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};