import { UserStatistics } from "@/app/_types/apiTypes";
import { handleAxiosError } from "@/app/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { authUserGet } from "../axiosAuthUser";
import { TOTAL_USERS_ENDPOINT } from "..";

export const fetchTotalUsers = async () => {
    try {
        const data  = await authUserGet<UserStatistics>(TOTAL_USERS_ENDPOINT);
        // console.log("Fetched total users:", data);
        return data;
    } catch (error) {
       return handleAxiosError(error);
    }
};

export const useTotalUsers = () => {
  return useQuery({
    queryKey: ['totalUsers'],
    queryFn: fetchTotalUsers,
  });
}