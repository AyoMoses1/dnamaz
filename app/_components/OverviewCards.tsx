import { FC } from "react";
import { FaUsers, FaWallet, FaUniversity, FaChartLine } from "react-icons/fa";
import { RxEnvelopeClosed } from "react-icons/rx";

interface CardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  backgroundColor: string;
  icon: JSX.Element;
  iconBgColor: string;
}

const Card: FC<CardProps> = ({ title, value, change, isPositive, backgroundColor, icon, iconBgColor }) => {
  return (
    <div className={`p-5 rounded-lg shadow-md ${backgroundColor}`}>
  
      <div className="flex justify-between items-center">
        <p className={`${backgroundColor === 'bg-green-800' ? 'text-white' : 'text-black'} text-lg font-medium`}>
          {title}
        </p>
        <div className={`p-3 rounded-full ${iconBgColor}`}>
          {icon}
        </div>
      </div>
  
      <h2 className={`${backgroundColor === 'bg-green-800' ? 'text-white' : 'text-black'} text-3xl font-bold mt-3`}>
        {value}
      </h2>
     
      <div className="flex items-center mt-1">
        {isPositive ? (
          <FaChartLine className="text-green-500 mr-2" />  
        ) : (
          <FaChartLine className="text-red-500 mr-2 transform rotate-180" />  
        )}
        <p className={`${isPositive ? "text-green-500" : "text-red-500"} text-sm`}>
          {change}
        </p>
      </div>
    </div>
  );
};

const OverviewCards: FC = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <Card
        title="Active Customers"
        value="30,000"
        change="+15% more from last month"
        isPositive={true}
        backgroundColor="bg-green-800"
        icon={<FaUsers className="text-white text-xl" />}
        iconBgColor="bg-green-300"
      />
      <Card
        title="Wallets Total"
        value="₦623K"
        change="-24% less from last month"
        isPositive={false}
        backgroundColor="bg-green-100"
        icon={<FaWallet className="text-green-800 text-xl" />}
        iconBgColor="bg-green-300"
      />
      <Card
        title="Amount Invested"
        value="₦923K"
        change="+35% more from last month"
        isPositive={true}
        backgroundColor="bg-white"
        icon={<RxEnvelopeClosed className="text-white text-xl" />}
        iconBgColor="bg-yellow-400"
      />
      <Card
        title="Funded Projects"
        value="₦0"
        change="-37% less from last month"
        isPositive={false}
        backgroundColor="bg-white"
        icon={<FaUniversity className="text-gray-600 text-xl" />}
        iconBgColor="bg-gray-300"
      />
    </div>
  );
};

export default OverviewCards;
