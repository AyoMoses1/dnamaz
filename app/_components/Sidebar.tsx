import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Users, Landmark, Settings, LogOut } from 'lucide-react';
import dlogo from "@/public/dlogo.png";

const navLinks = [
  {
    name: "Business Overview",
    href: "/",
    icon: Home,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Funding",
    href: "/funding",
    icon: Landmark,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  }
];

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen border bg-gray-100 p-6 flex flex-col">
      <div className="h-full">
        <div className="mb-16">
          <div className="relative w-40 h-20">
            <Image
              src={dlogo}
              alt="D'Namaz Capital Limited"
              layout="fill"
              quality={80}
              objectFit="contain"
              priority
            />
          </div>
        </div>

        <div className="text-[#2D5A27] font-medium text-sm mb-4">MAIN MENU</div>
        
        <div className="space-y-4">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className="block">
              <div className="flex items-center space-x-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-white">
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </div>
            </Link>
          ))}
        </div>

<div className="mt-8 pt-8 border-t border-gray-200">
        <div className="mt-8">
          <div className="text-[#2D5A27] font-medium text-sm mb-4">OTHERS</div>
          <Link href="/logout" className="block">
            <div className="flex items-center space-x-3 py-2 px-3 text-gray-700 hover:bg-white">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </div>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
