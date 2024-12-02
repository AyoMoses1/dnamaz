import QueryProvider from "@/app/_lib/_providers/QueryProvider";
import AxiosGuestProvider from "../Api/axiosGuest";
import AuthSessionProvider from "./AuthSessionProvider";
import { Query } from "@tanstack/react-query";
import AxiosAuthUserProvider from "../Api/axiosAuthUser";
import { auth } from "../nextauth/auth";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <QueryProvider>
      <AuthSessionProvider session={session}>
        <AxiosGuestProvider />
        <AxiosAuthUserProvider />
        {children}
      </AuthSessionProvider>
    </QueryProvider>
  );
};

export default Providers;
