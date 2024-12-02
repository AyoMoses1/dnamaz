import { AdminLoginRequest, AdminLoginResponse } from '@/app/_types/apiTypes';
import { handleAxiosError } from '@/app/utils/errorHandler';
import { authUserPost } from '../axiosAuthUser';

export const ADMIN_LOGIN_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/login`;

export const adminLogin = async (
  loginData: AdminLoginRequest
): Promise<AdminLoginResponse | undefined> => {
  try {
    const response = await authUserPost(
      ADMIN_LOGIN_ENDPOINT,
      loginData
    );
    return response.data as AdminLoginResponse;
  } catch (error: any) {
    handleAxiosError(error);
    throw error;
  }
};