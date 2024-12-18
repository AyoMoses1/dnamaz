"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PenSquare } from "lucide-react";
import { newCustomerRequest } from "../_lib/Api/endpoints/newCustomers";
// import { NewRequest } from "../_types/apiTypes";
import { useParams } from "next/navigation";
import { useClientData } from "../_lib/Api/endpoints/fetchClientDetail";
import Spinner from "./Spinner";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CorporateCustomer, IndividualCustomer } from "../_types/apiTypes";

type Customer = CorporateCustomer | IndividualCustomer;

interface ApiResponse {
  data: Customer[];
  message: string;
}

const NewAccountsTable = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId as string;
  const [activeFilter, setActiveFilter] = useState<"individual" | "cooperate">(
    "individual"
  );

  const {
    data: accountsData,
    isLoading: accountsLoading,
    isError: accountsError,
    error: accountsErrorData,
    // refetch: refetchAccounts,
  } = useQuery<ApiResponse>({
    queryKey: ["newAccountRequests"],
    queryFn: newCustomerRequest,
    enabled: !!session?.user?.accessToken,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: clientData,
    isLoading: clientLoading,
    isError: clientError,
    // refetch: refetchClient,
  } = useClientData(userId);

  if (accountsLoading || clientLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (accountsError) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Error:{" "}
        {accountsErrorData?.message || "An error occurred loading accounts"}
      </div>
    );
  }

  if (clientError) {
    return <div>Error loading client details</div>;
  }

  const accounts: (Customer | null)[] = accountsData?.data ?? [];
  const validAccounts = accounts.filter(
    (account): account is Customer => account !== null
  );
  const filteredAccounts = validAccounts.filter(
    (account) => account.userType.toLowerCase() === activeFilter.toLowerCase()
  );

  return (
    <div className="bg-white rounded-lg mt-0">
      <hr className="border-t border-gray-200 mt-8" />
      <div className="px-6 pt-6">
        {clientData && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Client Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  Name:{" "}
                  <span className="text-gray-900">{clientData.data.name}</span>
                </p>
                <p className="text-gray-600">
                  Email:{" "}
                  <span className="text-gray-900">{clientData.data.email}</span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  Type:{" "}
                  <span className="text-gray-900">
                    {clientData.data.userType}
                  </span>
                </p>
                <p className="text-gray-600">
                  Status:{" "}
                  <span className="text-gray-900">
                    {clientData.data.activationStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              New Account Request
            </h2>
            <p className="text-sm text-gray-500 mt-1">Updated 48 mins ago</p>
          </div>
          <div className="bg-gray-100 text-black p-1 rounded-lg flex gap-1">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === "individual" ? "bg-white" : "hover:bg-white"
              }`}
              onClick={() => setActiveFilter("individual")}
            >
              Individual
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === "cooperate" ? "bg-white" : "hover:bg-white"
              }`}
              onClick={() => setActiveFilter("cooperate")}
            >
              Corporate
            </button>
          </div>
        </div>

        <div className="mt-6">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  NAME
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  ABOUT
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  ACCOUNT
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  DATE
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  REQUEST
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.userId} className="border-t border-gray-200">
                  <td className="py-4 px-6">
                    <span className="text-gray-900 font-medium">
                      {account.name}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{account.userType}</div>
                    <div className="text-gray-500 text-sm">
                      {account.userType === "cooperate"
                        ? account.primaryBusinessAddress
                        : account.address}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-50 text-yellow-800 font-medium">
                      {account.userType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">
                      {new Date(account.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-600">
                      {account.activationStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="text-green-800 hover:text-green-900"
                      onClick={() =>
                        router.push(`/customers/${account.userId}`)
                      }
                    >
                      <PenSquare className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewAccountsTable;
