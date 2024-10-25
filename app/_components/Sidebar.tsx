import Image from 'next/image';
import { Home, Users, Landmark, LogOut } from 'lucide-react';
import dlogo from "@/public/dlogo.png";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen  bg-black text-white p-5 pt-8 flex flex-col">
      <div className="h-full">
        <div className="mb-14">
          <Image 
          src={dlogo} 
          alt="logo" 
          quality={100}
        />
        </div>

        <div className="text-gray-400 text-sm mb-4">MAIN MENU</div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2D5A27] cursor-pointer transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-medium">Business Overview</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2D5A27] cursor-pointer transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Customers</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2D5A27] cursor-pointer transition-colors">
            <Landmark className="w-5 h-5" />
            <span className="font-medium">Funding</span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-gray-400 text-sm mb-4">OTHERS</div>
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#2D5A27] cursor-pointer transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
