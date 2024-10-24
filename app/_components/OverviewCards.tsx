// components/OverviewCards.tsx
import { FC } from "react";

interface CardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const Card: FC<CardProps> = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className={isPositive ? "text-green-500" : "text-red-500"}>{change}</p>
    </div>
  );
};

const OverviewCards: FC = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <Card title="Active Customers" value="30,000" change="+15% more from last month" isPositive={true} />
      <Card title="Wallets Total" value="₦623K" change="-24% less from last month" isPositive={false} />
      <Card title="Amount Invested" value="₦923K" change="+35% more from last month" isPositive={true} />
      <Card title="Funded Projects" value="₦0" change="-37% less from last month" isPositive={false} />
    </div>
  );
};

export default OverviewCards;
