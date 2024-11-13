import { guestGet } from "../axiosGuest";
import { ClientResponse } from "@/app/_types/apiTypes";
import { handleAxiosError } from "@/app/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";

export const fetchClientData = async (userId: string) => {
    try {
        const data  = await guestGet<ClientResponse>(`/api/v1/admin/customer/${userId}`);
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
