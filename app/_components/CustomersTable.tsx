"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useState } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";

interface Customer {
  name: string;
  id: string;
  about: {
    role: string;
    address: string;
  };
  accountType: "Individual" | "Cooperate";
  date: string;
  investments: string;
}

const CustomersTable: FC = () => {
  const [selectedAccountType, setSelectedAccountType] = useState<"Individual" | "Cooperate" | "All">("All");

  const customers: Customer[] = [
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: { role: "Student", address: "No 24, Kutch Green Estate, 448" },
      accountType: "Individual",
      date: "04 Sep 2024",
      investments: "2 Active",
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: { role: "Civil Servant", address: "No 24, Kutch Green Estate, 448" },
      accountType: "Individual",
      date: "28 May 2024",
      investments: "1 Active",
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: { role: "Banker", address: "No 24, Kutch Green Estate, 448" },
      accountType: "Cooperate",
      date: "29 Jul 2024",
      investments: "0 Active",
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: { role: "Real Estate Developer", address: "No 24, Kutch Green Estate, 448" },
      accountType: "Cooperate",
      date: "15 Aug 2024",
      investments: "2 Active",
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: { role: "Investment Banker", address: "No 24, Kutch Green Estate, 448" },
      accountType: "Individual",
      date: "21 Dec 2024",
      investments: "0 Active",
    },
  ];

  const filteredCustomers = selectedAccountType === "All"
    ? customers
    : customers.filter(customer => customer.accountType === selectedAccountType);

  return (
    <div className="rounded-lg mt-12">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-gray-100 text-black p-1 rounded-lg flex gap-1 w-72">
             <button
              onClick={() => setSelectedAccountType("All")}
              className={`px-4 py-2 rounded-md ${selectedAccountType === "All" ? "bg-white" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedAccountType("Individual")}
              className={`px-4 py-2 rounded-md ${selectedAccountType === "Individual" ? "bg-white" : ""}`}
            >
              Individual
            </button>
            <button
              onClick={() => setSelectedAccountType("Cooperate")}
              className={`px-4 py-2 rounded-md ${selectedAccountType === "Cooperate" ? "bg-white" : ""}`}
            >
              Cooperate
            </button>
          </div>
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6"></div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">NAME</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ABOUT</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ACCOUNT</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">DATE</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">INVESTMENTS</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-500 text-sm">{customer.name}</p>
                      <p className="text-sm text-gray-500">ID: {customer.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-sm text-gray-500">{customer.about.role}</p>
                      <p className="text-sm text-gray-500">{customer.about.address}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      customer.accountType === 'Individual' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customer.accountType}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{customer.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{customer.investments}</td>
                  <td className="px-4 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaEdit className="w-4 h-4 text-green-900" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center mt-4 space-x-4">
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          <span className="text-sm text-black">10 of 20</span>
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
