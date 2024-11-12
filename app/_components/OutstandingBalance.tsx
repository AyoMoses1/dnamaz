"use client";
import React from 'react';
import { FaUniversity } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface OutstandingBalanceProps {
  outstandingBalance: number;
  totalProjects: number;
  customerCount: {
    total: number;
    cooperative: number;
    individual: number;
  };
  dueAmount: number;
  dueClients: number;
}

const OutstandingBalance: React.FC<OutstandingBalanceProps> = ({
  outstandingBalance = 9500000,
  totalProjects = 713,
  customerCount = { total: 69, cooperative: 30, individual: 39 },
  dueAmount = 500000,
  dueClients = 21
}) => {
  const chartData = {
    datasets: [
      {
        data: [customerCount.cooperative, customerCount.individual],
        backgroundColor: ['#F59E0B', '#D1FAE5'],
        borderWidth: 0,
        cutout: '80%',
      }
    ]
  };

  return (
    <div className="w-full max-w-6xl px-8 py-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Outstanding Balance Section */}
        <div className="space-y-8">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full">
              <FaUniversity className="text-gray-600" />
            </div>
            <span className="text-lg ml-2 font-semibold text-black">Outstanding balance</span>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <span className="text-green-800 font-bold text-3xl mr-1">₦</span>
              <span className="text-4xl font-medium text-black">9,500,000</span>
            </div>
            <div className="text-gray-500 mt-4">
              Total of <span className="text-green-800">{totalProjects}</span> funded projects
            </div>
          </div>
        </div>

        {/* Customers Chart */}
  <div className="flex items-start space-y-20 translate-y-[-24px] translate-x-[-8px]">
  {/* Doughnut Chart Container */}
  <div className="relative w-[300px] h-[350px]">
    <Doughnut
      className=""
      data={chartData}
      options={{
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        rotation: -90,
        circumference: 180,
        maintainAspectRatio: true,
        responsive: true
      }}
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center ">
      <div className="text-sm text-black">Customers</div>
      <span className="text-3xl font-bold text-black">{customerCount.total}</span>
    </div>
  </div>

  {/* Legends */}
  <div className="flex flex-col items-start space-y-4">
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
      <span className="text-sm text-black">Corporate</span>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full bg-green-100"></div>
      <span className="text-sm text-black">Individual</span>
    </div>
  </div>
</div>



        {/* Due Amount and Due Clients Section */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gray-200 rounded-md">
                <span role="img" aria-label="clock">⏱️</span>
              </div>
              <span className="text-lg font-semibold text-black">Due amount this month</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-green-800 font-bold mr-1 ml-10">₦</span>
              <span className="text-3xl font-bold text-black">500,000</span>
            </div>
          </div>
          <div className="h-px bg-gray-200 w-full"></div>
          <div className="p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <span role="img" aria-label="people" className="text-green-800">👥</span>
              </div>
              <span className="text-lg font-semibold text-black">Due clients this month</span>
            </div>
            <div className="text-3xl font-bold mt-2 text-black ml-10">{dueClients}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutstandingBalance;