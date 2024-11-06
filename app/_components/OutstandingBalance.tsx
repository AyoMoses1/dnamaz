// components/DashboardCard.tsx
import React from 'react';
import { FaUniversity, FaClock, FaUsers } from 'react-icons/fa';

const OutstandingBalance: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-8 p-6 max-w-4xl mx-auto mt-10">
      {/* Outstanding Balance */}
      <div className="flex flex-col justify-between">
        <div className="flex items-center mb-2">
          <FaUniversity className="text-gray-600 mr-2" />
          <span className="text-gray-800 font-semibold">Outstanding balance</span>
        </div>
        <div className="text-4xl font-bold text-green-800">₦9,500,000</div>
        <div className="text-gray-400">Total of <span className="text-green-700 font-semibold">713</span> funded projects</div>
      </div>

      {/* Customers Donut Chart */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full relative">
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-800">69</div>
        </div>
        <div className="text-sm font-semibold text-gray-500 mt-2">Customers</div>
        <div className="flex mt-2 space-x-2">
          <div className="flex items-center text-sm">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
            Cooperate
          </div>
          <div className="flex items-center text-sm">
            <span className="w-2 h-2 bg-green-200 rounded-full mr-1"></span>
            Individual
          </div>
        </div>
      </div>

      {/* Due Amount & Clients */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <FaClock className="text-gray-600 mr-2" />
          <div>
            <div className="text-gray-800 font-semibold">Due amount this month</div>
            <div className="text-3xl font-bold text-green-800">₦500,000</div>
          </div>
        </div>
        <div className="flex items-center">
          <FaUsers className="text-green-700 mr-2" />
          <div>
            <div className="text-gray-800 font-semibold">Due clients this month</div>
            <div className="text-3xl font-bold">21</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutstandingBalance
;
