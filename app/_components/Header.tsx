import Image from "next/image";
import { FC } from "react";
import { FaBell } from "react-icons/fa";
import rita from "@/public/Rita.jpg";

interface HeaderProps {
  name?: string;
  email: string;
  title?: string;
  description?: string;
}

const Header: FC<HeaderProps> = ({ name, email, description }) => {
  return (
    <header className="pt-5 flex justify-between items-center">
      <div>
        <h1 className="text-gray-700 text-2xl font-bold">{name}!</h1>
        <p className="text-gray-500">{description}!</p> 
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
            <FaBell className="text-gray-500 text-lg" />
          </div>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </div>
       
        <div className="flex items-center space-x-3">
          <Image
            src={rita}
            alt="User Avatar"
            quality={80}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-700 font-bold">{name}</p>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
