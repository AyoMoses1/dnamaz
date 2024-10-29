import { ChevronLeft, ChevronRight, Edit2 } from "lucide-react";
import { FC } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
  const customers: Customer[] = [
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: {
        role: "Student",
        address: "No 24, Kutch Green Estate, 448"
      },
      accountType: "Individual",
      date: "04 Sep 2024",
      investments: "2 Active"
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: {
        role: "Civil Servant",
        address: "No 24, Kutch Green Estate, 448"
      },
      accountType: "Individual",
      date: "28 May 2024",
      investments: "1 Active"
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: {
        role: "Doctor",
        address: "No 24, Kutch Green Estate, 448"
      },
      accountType: "Individual",
      date: "23 Nov 2024",
      investments: "4 Active"
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: {
        role: "Military",
        address: "No 24, Kutch Green Estate, 448"
      },
      accountType: "Individual",
      date: "05 Feb 2024",
      investments: "1 Active"
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: {
        role: "Banker",
        address: "No 24, Kutch Green Estate, 448"
      },
      accountType: "Cooperate",
      date: "29 Jul 2024",
      investments: "0 Active"
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: {
        role: "Real Estate Developer",
        address: "No 24, Kutch Green Estate, 448"
      },
      accountType: "Cooperate",
      date: "15 Aug 2024",
      investments: "2 Active"
    },
    {
      name: "Christine Brooks",
      id: "17206438925",
      about: {
        role: "Investment Banker",
        address: "No 24, Kutch Green Estate, 448"
      },
      accountType: "Cooperate",
      date: "21 Dec 2024",
      investments: "0 Active"
    }
  ];

  return (
      <div className="border border-gray-200 rounded-lg mt-12">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl text-gray-900">All Accounts</h2>
            <p className="text-sm text-gray-500">Updated 48 mins ago</p>
          </div>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
         <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         </div>
        </div>

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
              {customers.map((customer, index) => (
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

        <div className="flex justify-between items-center mt-4">
          <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          <span className="text-sm text-gray-500">10 of 20</span>
          <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;