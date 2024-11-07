import QueryProvider from "@/app/_lib/_providers/QueryProvider";
import AxiosGuestProvider from "../Api/axiosGuest";
import { Query } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AxiosGuestProvider />
        {children}
    </QueryProvider>
  );
};

export default Providers;