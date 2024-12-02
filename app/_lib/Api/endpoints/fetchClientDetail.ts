import { ClientResponse } from "@/app/_types/apiTypes";
import { handleAxiosError } from "@/app/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { authUserGet } from "../axiosAuthUser";

export const fetchClientData = async (userId: string) => {
    try {
        const data  = await authUserGet<ClientResponse>(`/api/v1/admin/customer/${userId}`);
        return data;
        console.log(data);
    } catch (error) {
       return handleAxiosError(error);
    }
};


export const useClientData = (userId: string) => {
  return useQuery({
    queryKey: ['client', userId],
    queryFn: () => fetchClientData(userId),
    enabled: !!userId,
  });
};
