import axiosInstance from '../axiosInstance';
import { AdminLoginRequest, AdminLoginResponse } from '@/app/_types/apiTypes';

export const adminLogin = async (
  loginData: AdminLoginRequest
): Promise<AdminLoginResponse> => {
  try {
    const response = await axiosInstance.post<AdminLoginResponse>('/api/v1/admin/login', loginData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Login error:', error.response.data);
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('Network error: No response received from the server. Please check your connection.');
    } else {
      console.error('Error during request:', error.message);
      throw new Error('Unexpected error: ' + error.message);
    }
  }
};
