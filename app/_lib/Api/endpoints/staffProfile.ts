import { STAFF_PROFILE_ENDPOINT } from "..";
import { handleAxiosError } from "@/app/utils/errorHandler";
import { authUserGet } from "../axiosAuthUser";
import { useQuery } from "@tanstack/react-query";


type UserType = {
  id: number;
  email: string;
  isStaff: boolean;
  isAdmin: boolean;
};

type DataType = {
  id: number;
  userId: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  profilePictureUrl: string | null;
  employeeId: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
};

type ResponseType = {
  data: DataType;
};

export const fetchStaffProfile = async (): Promise<ResponseType> => {
  try {
    const response = await authUserGet<ResponseType>(STAFF_PROFILE_ENDPOINT);
    return response;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const useStaffProfile = () => {
    return useQuery({
        queryKey: ["staffProfile"],
        queryFn: fetchStaffProfile,
        retry: 2,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
    };