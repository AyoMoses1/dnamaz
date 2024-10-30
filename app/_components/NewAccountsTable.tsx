import { PenSquare } from 'lucide-react';

const accountsData = [
  {
    name: "Christine Brooks",
    about: "Student",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Cooperate",
    date: "04 Sep 2024",
    request: "Verification"
  },
  {
    name: "Rosie Pearson",
    about: "Civil Servant",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Cooperate",
    date: "28 May 2024",
    request: "Verification"
  },
  {
    name: "Darrell Caldwell",
    about: "Doctor",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Cooperate",
    date: "23 Nov 2024",
    request: "Verification"
  },
  {
    name: "Gilbert Johnston",
    about: "Military",
    address: "No 24, Kutch Green Estate, 448",
    accountType: "Cooperate",
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
    request: "Verification"
  }
];

const NewAccountsTable = () => {

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
    <div className="bg-white rounded-lg mt-0">
      <div className="px-6 pt-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">New Account Request</h2>
            <p className="text-sm text-gray-500 mt-1">Updated 48 mins ago</p>
          </div>
          <div className="bg-gray-100 text-black p-1 rounded-lg flex gap-1">
            <button className="px-4 py-2 rounded-md hover:bg-white">
              Individual
            </button>
            <button className="px-4 py-2 rounded-md hover:bg-white">
              Cooperate
            </button>
          </div>
        </div>

        <div className="mt-6">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">NAME</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">ABOUT</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">ACCOUNT</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">DATE</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">REQUEST</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {accountsData.map((account, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="py-4 px-6">
                    <span className="text-gray-900 font-medium">{account.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{account.about}</div>
                    <div className="text-gray-500 text-sm">{account.address}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-50 text-yellow-800 font-medium">
                      {account.accountType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{account.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-600">
                      {account.request}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-green-800 hover:text-green-900">
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
  </div>
  );
};

export default NewAccountsTable;