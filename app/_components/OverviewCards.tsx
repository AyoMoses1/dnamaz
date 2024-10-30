import { FC } from "react";
import { TrendingUp, TrendingDown, Users, Wallet, Landmark, SquareActivity } from "lucide-react";

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
          wrapper: 'bg-green-800 border-transparent',
          text: 'text-white',
          title: 'text-white/80',
          icon: 'bg-green-700/50',
          changeText: 'text-white'
        };
      case 'mint':
        return {
          wrapper: 'bg-green-50 border-green-800',
          text: 'text-green-950',
          title: 'text-green-950/70',
          icon: 'bg-green-600/40',
          changeText: 'text-green-950'
        };
      default:
        return {
          wrapper: 'bg-white border-gray-200',
          text: 'text-gray-950',
          title: 'text-gray-950/70',
          icon: icon === 'investment' ? 'bg-yellow-400' : 'bg-gray-100',
          changeText: 'text-gray-950'
        };
    }
  };

  const getIcon = () => {
    switch (icon) {
      case 'users':
        return <Users className={`h-5 w-5 ${variant === 'green' ? 'text-white' : 'text-green-800'}`} />;
      case 'wallet':
        return <Wallet className={`h-5 w-5 ${variant === 'green' ? 'text-white' : 'text-white'}`} />;
      case 'investment':
        return <SquareActivity className="h-5 w-5 text-white" />;
      case 'projects':
        return <Landmark className="h-5 w-5 text-gray-600" />;
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.wrapper} rounded-2xl border p-6 space-y-4`}>
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
          <span className="text-sm">
            <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
              {isPositive ? `+${change}%` : `-${change}%`}
            </span>
            <span className={styles.changeText}>
              {isPositive ? ' more from last month' : ' less from last month'}
            </span>
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
        change="15"
        isPositive={true}
        variant="green"
        icon="users"
      />
      <Card
        title="Wallets Total"
        value="₦623K"
        change="24"
        isPositive={false}
        variant="mint"
        icon="wallet"
      />
      <Card
        title="Amount Invested"
        value="₦923K"
        change="35"
        isPositive={true}
        variant="white"
        icon="investment"
      />
      <Card
        title="Funded Projects"
        value="₦0"
        change="37"
        isPositive={false}
        variant="white"
        icon="projects"
      />
    </div>
  );
};

export default OverviewCards;