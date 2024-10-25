import { FC } from "react";
import { TrendingUp, TrendingDown, Users, Wallet, Building2, LayoutGrid } from "lucide-react";

interface CardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  variant: 'green' | 'mint' | 'white';
  icon: 'users' | 'wallet' | 'investment' | 'projects';
}

const Card: FC<CardProps> = ({ title, value, change, isPositive, variant, icon }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'green':
        return {
          wrapper: 'bg-green-800',
          text: 'text-white',
          title: 'text-white/80',
          icon: 'bg-green-700/50'
        };
      case 'mint':
        return {
          wrapper: 'bg-green-50',
          text: 'text-green-950',
          title: 'text-green-950/70',
          icon: 'bg-green-500/20'
        };
      default:
        return {
          wrapper: 'bg-white',
          text: 'text-gray-950',
          title: 'text-gray-950/70',
          icon: icon === 'investment' ? 'bg-yellow-400' : 'bg-gray-100'
        };
    }
  };

  const getIcon = () => {
    switch (icon) {
      case 'users':
        return <Users className={`h-5 w-5 ${variant === 'green' ? 'text-white' : 'text-green-800'}`} />;
      case 'wallet':
        return <Wallet className={`h-5 w-5 ${variant === 'green' ? 'text-white' : 'text-green-800'}`} />;
      case 'investment':
        return <LayoutGrid className="h-5 w-5 text-white" />;
      case 'projects':
        return <Building2 className="h-5 w-5 text-gray-600" />;
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.wrapper} rounded-2xl p-6 space-y-4`}>
      <div className="flex justify-between items-center">
        <span className={`${styles.title} text-lg font-medium`}>
          {title}
        </span>
        <div className={`${styles.icon} p-3 rounded-full`}>
          {getIcon()}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className={`${styles.text} text-3xl font-bold`}>
          {value}
        </h2>
        
        <div className="flex items-center gap-2">
          <div className={`border ${isPositive ? 'border-green-500' : 'border-red-500'} rounded p-0.5`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
          </div>
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};

const OverviewCards: FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card
        title="Active Customers"
        value="30,000"
        change="+15% more from last month"
        isPositive={true}
        variant="green"
        icon="users"
      />
      <Card
        title="Wallets Total"
        value="₦623K"
        change="-24% less from last month"
        isPositive={false}
        variant="mint"
        icon="wallet"
      />
      <Card
        title="Amount Invested"
        value="₦923K"
        change="+35% more from last month"
        isPositive={true}
        variant="white"
        icon="investment"
      />
      <Card
        title="Funded Projects"
        value="₦0"
        change="-37% less from last month"
        isPositive={false}
        variant="white"
        icon="projects"
      />
    </div>
  );
};

export default OverviewCards;