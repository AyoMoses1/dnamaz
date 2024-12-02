import { CustomerUpdateRequest } from "@/app/_types/apiTypes";
import { authUserPost } from "../axiosAuthUser";
import { handleAxiosError } from "@/app/utils/errorHandler";
import { ADMIN_CUSTOMER_UPDATE_REQUEST_ENDPOINT } from "..";

export const updateCustomer = async (
  updateData: CustomerUpdateRequest
): Promise<void> => {
  try {
    const apiPayload = {
      userId: updateData.user_id,
      status: updateData.status.toUpperCase(),
      user_type: updateData.user_type
    };
    
    await authUserPost(ADMIN_CUSTOMER_UPDATE_REQUEST_ENDPOINT, apiPayload);
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};