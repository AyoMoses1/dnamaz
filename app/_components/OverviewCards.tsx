"use client";
import { FC } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Wallet,
  Landmark,
  SquareActivity,
} from "lucide-react";
import { useWalletStats } from "../_lib/Api/endpoints/walletstats";
import { useTotalUsers } from "../_lib/Api/endpoints/totalUsers";
interface CardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  variant: "green" | "mint" | "white";
  icon: "users" | "wallet" | "investment" | "projects";
  isLoading?: boolean;
  previousMonth: string;
}

const Card: FC<CardProps> = ({
  title,
  value,
  change,
  isPositive,
  variant,
  icon,
  isLoading,
  previousMonth,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "green":
        return {
          wrapper: "bg-green-800 border-transparent",
          text: "text-white",
          title: "text-white/80",
          icon: "bg-green-700/50",
          changeText: "text-white",
        };
      case "mint":
        return {
          wrapper: "bg-green-50 border-green-800",
          text: "text-green-950",
          title: "text-green-950/70",
          icon: "bg-green-600/40",
          changeText: "text-green-950",
        };
      default:
        return {
          wrapper: "bg-white border-gray-200",
          text: "text-gray-950",
          title: "text-gray-950/70",
          icon: icon === "investment" ? "bg-yellow-400" : "bg-gray-100",
          changeText: "text-gray-950",
        };
    }
  };

  const getIcon = () => {
    switch (icon) {
      case "users":
        return (
          <Users
            className={`h-5 w-5 ${
              variant === "green" ? "text-white" : "text-green-800"
            }`}
          />
        );
      case "wallet":
        return (
          <Wallet
            className={`h-5 w-5 ${
              variant === "green" ? "text-white" : "text-white"
            }`}
          />
        );
      case "investment":
        return <SquareActivity className="h-5 w-5 text-white" />;
      case "projects":
        return <Landmark className="h-5 w-5 text-gray-600" />;
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.wrapper} rounded-2xl border p-6 space-y-4`}>
      <div className="flex justify-between items-center">
        <span className={`${styles.title} text-lg font-medium`}>{title}</span>
        <div className={`${styles.icon} p-3 rounded-full`}>{getIcon()}</div>
      </div>

      <div className="space-y-2">
        <h2 className={`${styles.text} text-3xl font-bold`}>
          {isLoading ? "Loading..." : value}
        </h2>

        {!isLoading && (
          <div className="flex items-center gap-1">
            <div
              className={`inline-flex items-center justify-center border ${
                isPositive ? "border-green-500" : "border-red-500"
              } rounded p-0.5`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
            </div>
            <span className="text-sm whitespace-nowrap">
              <span className={isPositive ? "text-green-500" : "text-red-500"}>
                {isPositive ? `+${change}%` : `-${change}%`}
              </span>
              <span className={`${styles.changeText} ml-1 font-semibold`}>
                from {previousMonth}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const OverviewCards: FC = () => {
  const { data: walletData, isLoading: isWalletLoading } = useWalletStats();
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useTotalUsers();

  const formatBalance = (balance: string) => {
    if (!balance) return "₦0.00";
    const numBalance = parseFloat(balance);
    if (isNaN(numBalance)) return "₦0.00";

    if (numBalance >= 1000000) {
      return `₦${(numBalance / 1000000).toFixed(1)}M`;
    }
    if (numBalance >= 1000) {
      return `₦${(numBalance / 1000).toFixed(1)}K`;
    }
    return `₦${numBalance.toFixed(2)}`;
  };

  // Use memoized values to prevent calculations during render
  const balanceChange = walletData?.balanceChangePercent ?? 0;
  const isPositiveChange = balanceChange >= 0;
  const totalBalance = walletData?.totalBalance ?? "0.00";
  const formattedValue = isWalletLoading
    ? "Loading..."
    : formatBalance(totalBalance);
  const formattedChange = Math.abs(balanceChange).toFixed(2);

  // Handle user statistics
  const userStats = usersData?.data;
  const totalUsersValue = isUsersError
    ? "Error"
    : isUsersLoading
    ? "Loading..."
    : userStats?.totalUsers ?? "0";
  const userGrowthPercent = Math.abs(userStats?.userGrowthPercent ?? 0).toFixed(
    2
  );
  const isPositiveGrowth = (userStats?.userGrowthPercent ?? 0) >= 0;
  const previousMonth = userStats?.previousMonth ?? "last month";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        title="Active Customers"
        value={totalUsersValue}
        change={userGrowthPercent}
        isPositive={isPositiveGrowth}
        variant="green"
        icon="users"
        isLoading={isUsersLoading}
        previousMonth={previousMonth}
      />
      <Card
        title="Wallets Total"
        value={formattedValue}
        change={formattedChange}
        isPositive={isPositiveChange}
        variant="mint"
        icon="wallet"
        isLoading={isWalletLoading}
        previousMonth={previousMonth}
      />
      <Card
        title="Amount Invested"
        value="₦923K"
        change="35"
        isPositive={true}
        variant="white"
        icon="investment"
        previousMonth={previousMonth}
      />
      <Card
        title="Funded Projects"
        value="₦0"
        change="37"
        isPositive={false}
        variant="white"
        icon="projects"
        previousMonth={previousMonth}
      />
    </div>
  );
};

export default OverviewCards;
