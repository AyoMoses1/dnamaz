import { WALLETSTATS_ENDPOINT } from "..";
import { BalanceData } from "@/app/_types/apiTypes";
import { authUserGet } from "../axiosAuthUser";
import { handleAxiosError } from "@/app/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const fetchWalletStats = async (): Promise<BalanceData> => {
  try {
    const res = await authUserGet(WALLETSTATS_ENDPOINT);
    // console.log("API response:", res); // This shows the correct value
    return res; 
  } catch (error) {
   
    handleAxiosError(error);
    return {
      totalBalance: "0.00",
      balanceChangePercent: 0,
      currentMonth: "",
      previousMonth: ""
    };
  }
}

export const useWalletStats = () => {
  return useQuery<BalanceData>({
    queryKey: ["walletStats"],
    queryFn: fetchWalletStats,
    retry: 2,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false
  });
}