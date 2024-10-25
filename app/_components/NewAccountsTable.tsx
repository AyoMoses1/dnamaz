import React from 'react';
import { PenSquare } from 'lucide-react';

const accountsData = [
  {
    name: "Christine Brooks",
    about: "Student",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Individual",
    date: "04 Sep 2024",
    request: "Funding"
  },
  {
    name: "Rosie Pearson",
    about: "Civil Servant",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Individual",
    date: "28 May 2024",
    request: "Verification"
  },
  {
    name: "Darrell Caldwell",
    about: "Doctor",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Individual",
    date: "23 Nov 2024",
    request: "Verification"
  },
  {
    name: "Gilbert Johnston",
    about: "Military",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Individual",
    date: "05 Feb 2024",
    request: "Verification"
  },
  {
    name: "Alan Cain",
    about: "Banker",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Cooperate",
    date: "29 Jul 2024",
    request: "Verification"
  },
  {
    name: "Alfred Murray",
    about: "Real Estate Developer",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Cooperate",
    date: "15 Aug 2024",
    request: "Verification"
  },
  {
    name: "Maggie Sullivan",
    about: "Investment Banker",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Cooperate",
    date: "21 Dec 2024",
    request: "Joint Acct"
  }
];

const NewAccountsTable = () => {
  const getRequestStyle = (request: string) => {
    switch (request) {
      case 'Funding':
        return 'bg-pink-100 text-pink-600';
      case 'Verification':
        return 'bg-red-100 text-red-500';
      case 'Joint Acct':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg mt-12">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl text-gray-900">New Accounts Request</h2>
            <p className="text-sm text-gray-500">Updated 48 mins ago</p>
          </div>
          <div className="bg-gray-100 w-50 rounded-lg p-2 flex gap-3">
            <button className="px-4 py-1 w-40 bg-white border border-gray-200 text-gray-900">All</button>
            <button className="px-4 py-1  text-gray-900 flex items-center gap-2">
              Unverified
              <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">12</span>
            </button>
            <button className="px-4 py-1 text-gray-900">Funding</button>
            <button className="px-4 py-1 text-gray-900">Joint Account</button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="py-3 px-4 text-black">NAME</th>
              <th className="py-3 px-4 text-black">ABOUT</th>
              <th className="py-3 px-4 text-black">ACCOUNT</th>
              <th className="py-3 px-4 text-black">DATE</th>
              <th className="py-3 px-4 text-black">REQUEST</th>
              <th className="py-3 px-4 text-black">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {accountsData.map((account, idx) => (
              <tr key={idx} className="border-t border-gray-100">
                <td className="py-4 px-4 text-gray-900">{account.name}</td>
                <td className="py-4 px-4">
                  <div className="text-gray-900">{account.about}</div>
                  <div className="text-gray-400 text-sm">{account.address}</div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    account.accountType === 'Individual' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {account.accountType}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-900">{account.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getRequestStyle(account.request)}`}>
                    {account.request}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-gray-600 hover:text-gray-900">
                    <PenSquare size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewAccountsTable;