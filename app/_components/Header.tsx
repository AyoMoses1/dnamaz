// components/Header.tsx
import Image from "next/image";
import { FC } from "react";
import rita from "@/public/Rita.jpg";

interface HeaderProps {
  name: string;
  email: string;
}

const Header: FC<HeaderProps> = ({ name, email }) => {
  return (
    <header className="p-5 flex justify-between items-center">
      <div>
        <h1 className="text-gray-500 text-2xl font-bold">Hello, {name}!</h1>
        <p className="text-gray-500">Here’s an overview of your business!</p>
      </div>
      <div className="flex items-center space-x-3">
        <Image
          src={rita}
          alt="User Avatar"
          quality={80}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-gray-500">{name}</p>
          <p className="">{email}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
