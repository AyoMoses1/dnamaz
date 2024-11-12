import React from 'react';

interface Investment {
  title: string;
  amount: number;
  date: string;
  status: 'Done' | 'Pending';
}

const InvestmentTable = ({ investments }: { investments: Investment[] }) => (
  <div className="px-4">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left py-3 px-4 text-xs font-medium text-black">TITLE</th>
          <th className="text-left py-3 px-4 text-xs font-medium text-black">AMOUNT</th>
          <th className="text-left py-3 px-4 text-xs font-medium text-black">STATUS</th>
        </tr>
      </thead>
      <tbody>
        {investments.map((investment, index) => (
          <tr key={index} className="border-b">
            <td className="py-4 px-4">
              <div>
                <p className="font-medium text-sm text-black">{investment.title}</p>
                <p className="text-gray-500 text-sm">{investment.date}</p>
              </div>
            </td>
            <td className="py-4 px-4 text-sm text-black">₦{investment.amount.toLocaleString()}</td>
            <td className="py-4 px-4">
              <span className={`px-3 py-1 rounded-full text-xs ${
                investment.status === 'Done' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {investment.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default InvestmentTable;
