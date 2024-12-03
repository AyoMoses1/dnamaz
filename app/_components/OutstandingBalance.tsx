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
        backgroundColor: ['#EAB308', '#E8F5E9'],
        borderWidth: 0,
        cutout: '75%',
      }
    ]
  };

  return (
    <div className="w-full max-w-6xl p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Outstanding Balance Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-gray-50 p-2 rounded-lg">
              <FaUniversity className="text-gray-500 text-lg" />
            </div>
            <span className="text-base font-medium text-gray-900">Outstanding balance</span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline">
              <span className="text-green-700 font-bold text-2xl">₦</span>
              <span className="text-3xl font-bold text-gray-900 ml-1">9,500,000</span>
            </div>
            <div className="text-gray-500 text-sm mt-2">
              Total of <span className="text-gray-700">{totalProjects}</span> funded projects
            </div>
          </div>
        </div>

        {/* Customers Chart */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[200px] h-[120px]">
            <Doughnut
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
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
              <span className="text-2xl font-bold text-gray-900">{customerCount.total}</span>
              <div className="text-sm text-gray-500">Customers</div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600">Cooperate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-50"></div>
              <span className="text-sm text-gray-600">Individual</span>
            </div>
          </div>
        </div>

        {/* Due Amount and Due Clients Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <span role="img" aria-label="clock" className="text-lg">⏱️</span>
              </div>
              <span className="text-sm text-gray-500">Due amount this month</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-green-700 font-bold text-xl mr-1">₦</span>
              <span className="text-2xl font-bold text-gray-900">500,000</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-sm text-gray-500">Due clients this month</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{dueClients}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutstandingBalance;