import { guestPost } from '../axiosGuest';
import { AdminLoginRequest, AdminLoginResponse } from '@/app/_types/apiTypes';
import { handleAxiosError } from '@/app/utils/errorHandler';
import { ADMIN_LOGIN_ENDPOINT } from '..';

export const adminLogin = async (
  loginData: AdminLoginRequest
): Promise<AdminLoginResponse | undefined> => {
  try {
    const response = await guestPost(ADMIN_LOGIN_ENDPOINT, loginData);
    return response;
  } catch (error: any) {
    handleAxiosError(error); 
    throw error; 
  }
};
