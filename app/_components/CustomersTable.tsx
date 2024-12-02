"use client";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import { fetchCustomers } from "@/app/_lib/Api/endpoints/adminCustomerTable";
import Spinner from "./Spinner";
import { CustomerResponse } from "../_types/apiTypes";

const CustomersTable: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchInput, setSearchInput] = useState(
    searchParams?.get("search") || ""
  );

  const selectedAccountType =
    (searchParams?.get("userType") as "Individual" | "Cooperate") ||
    "Individual";
  const searchTerm = searchParams?.get("search") || "";
  const page = Number(searchParams?.get("page")) || 1;
  const pageSize = Number(searchParams?.get("pageSize")) || 10;

  const createQueryString = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    return newSearchParams.toString();
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      router.push(`?${createQueryString({ search: value, page: "1" })}`, {
        scroll: false,
      });
    }, 500),
    [router, searchParams]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useQuery<CustomerResponse>({
    queryKey: [
      "customers",
      { userType: selectedAccountType, search: searchTerm, page, pageSize },
    ],
    queryFn: () =>
      fetchCustomers({
        user_type: selectedAccountType,
        search: searchTerm,
        page,
        page_size: pageSize,
      }),
    staleTime: 5000,
  });

  const handleAccountTypeChange = (type: "Individual" | "Cooperate") => {
    router.push(`?${createQueryString({ userType: type })}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`?${createQueryString({ page: String(newPage) })}`, {
      scroll: false,
    });
  };

  const customers = data?.data || [];

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (isError)
    return (
      <>
        <Spinner />
        <div className="text-red-600 text-xl mt-5 border">
          Error fetching customers...
        </div>
      </>
    );

  return (
    <div className="rounded-lg mt-12">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-gray-100 text-black p-1 rounded-lg flex gap-1 w-72">
            <button
              onClick={() => handleAccountTypeChange("Individual")}
              className={`px-4 py-2 rounded-md ${
                selectedAccountType === "Individual" ? "bg-white" : ""
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => handleAccountTypeChange("Cooperate")}
              className={`px-4 py-2 rounded-md ${
                selectedAccountType === "Cooperate" ? "bg-white" : ""
              }`}
            >
              Cooperate
            </button>
          </div>
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  NAME
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  ABOUT
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  ACCOUNT
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  DATE
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  INVESTMENTS
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.userId} className="border-b">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-500 text-sm">
                          {customer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID: {customer.userId}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-sm text-gray-500">
                          {customer.occupation || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {customer.address || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          customer.userType?.toLowerCase() === "individual"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {customer.userType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {customer.investments}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() =>
                          router.push(`/customers/${customer.userId}`)
                        }
                      >
                        <FaEdit className="w-4 h-4 text-green-900" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center mt-4 space-x-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          <span className="text-sm text-black">
            {data?.meta.current_page} of {data?.meta.last_page}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= (data?.meta.last_page || 1)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
