import { ADMIN_CUSTOMER_ENDPOINT } from ".."; 
import { CustomerResponse } from "@/app/_types/apiTypes";
import { handleAxiosError } from "@/app/utils/errorHandler"; 
import { guestGet } from "../axiosGuest";

interface fetchCustomersParams {
    user_type: string;  
    page?: number;
    page_size?: number;
    search?: string;
}

export const fetchCustomers = async (
  params: fetchCustomersParams
): Promise<CustomerResponse> => {
  try {
    const response = await guestGet(ADMIN_CUSTOMER_ENDPOINT, {
      
        user_type: params.user_type.toLowerCase(),  
        page: params.page || 1,
        page_size: params.page_size,
        search: params.search || "",
 
    });
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};