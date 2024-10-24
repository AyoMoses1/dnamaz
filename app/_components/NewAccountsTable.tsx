// components/NewAccountsTable.tsx
import { FC } from "react";
import { FaEdit } from "react-icons/fa";

interface Account {
  name: string;
  about: string;
  accountType: string;
  date: string;
  request: string;
}

const accountsData: Account[] = [
  { name: "Christine Brooks", about: "Student", accountType: "Individual", date: "04 Sep 2024", request: "Gifting" },
  { name: "Rosie Pearson", about: "Civil Servant", accountType: "Individual", date: "28 May 2024", request: "Verification" },
  // Add more accounts as per the image
];

const NewAccountsTable: FC = () => {
  return (
    <div className="bg-white rounded-lg p-5 mt-5 shadow-md">
      <h2 className="text-xl font-bold mb-3">New Accounts Request</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2">Name</th>
            <th>About</th>
            <th>Account</th>
            <th>Date</th>
            <th>Request</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accountsData.map((account, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2">{account.name}</td>
              <td>{account.about}</td>
              <td>{account.accountType}</td>
              <td>{account.date}</td>
              <td>{account.request}</td>
              <td>
                <FaEdit className="text-green-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewAccountsTable;
