// components/Sidebar.tsx
import Image from "next/image";
import { FC } from "react";
import { FaUsers, FaCog, FaSignOutAlt, FaBusinessTime } from "react-icons/fa";
import dlogo from "@/public/dlogo.png";

const Sidebar: FC = () => {
  return (
    <div className="w-64 bg-black text-white h-screen p-5 flex flex-col justify-between">
      <div>
        <Image 
        src={dlogo} 
        alt="logo" 
        quality={100}
        // className="rounded-full" 
        />
        <div className="space-y-4 mt-14">
          <div className="flex items-center space-x-3">
            <FaBusinessTime />
            <span>Business Overview</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaUsers />
            <span>Customers</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaCog />
            <span>Settings</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
