import React from 'react';

const SummaryCard = () => (
  <div className="flex gap-2 p-2">
    <div className="bg-gray-100 flex-1 w-60 rounded-lg p-4">
      <div className="text-2xl text-black font-semibold">4</div>
      <div className="text-black font-semibold text-sm">Total Investments</div>
    </div>
    <div className="bg-[#2B572B] text-white flex-1 w-60 rounded-lg p-4">
      <div className="text-2xl font-semibold">₦ 154,000</div>
      <div className="text-[#A5C4A5]">Wallet Balance</div>
    </div>
    <div className="border border-[#FFDDB3] rounded-lg w-60 p-4">
      <div className="text-2xl font-semibold text-[#FFB84D]">14</div>
      <div className="text-black font-semibold text-sm">Financed Projects</div>
    </div>
  </div>
);

export default SummaryCard;
