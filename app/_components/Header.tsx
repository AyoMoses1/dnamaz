"use client";
import { FC } from "react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import rita from "@/public/Rita.jpg";
import { useStaffProfile } from "@/app/_lib/Api/endpoints/staffProfile";
// import { useStaffProfile } from "./staffProfileHooks";

const Header: FC = () => {
  const { data: staffData, isLoading } = useStaffProfile();
  const profile = staffData?.data;

  if (isLoading) {
    return <div className="animate-pulse h-24 bg-gray-100" />;
  }

  return (
    <header className="pt-5 flex justify-between items-center">
      <div>
        <h1 className="text-gray-700 text-2xl font-bold">
          {profile?.firstName ? `Hello ${profile.firstName}!` : "Welcome!"}
        </h1>
        <p className="text-gray-500">Here's an overview of your business!</p>
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
            <FaBell className="text-gray-500 text-lg" />
          </div>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
        </div>

        <div className="flex items-center space-x-3">
          <Image
            src={profile?.profilePictureUrl || rita}
            alt="User Avatar"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-700 font-bold">
              {profile?.firstName && profile?.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : profile?.employeeId}
            </p>
            <p className="text-gray-500">{profile?.user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
