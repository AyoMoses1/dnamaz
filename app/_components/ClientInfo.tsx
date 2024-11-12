import React from 'react';
import { Copy, Ellipsis, File, MoreVertical, User } from 'lucide-react'; 
import avatar from "@/public/avatar.png";
import Image from 'next/image';

interface ClientDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bvn: string;
  address: string;
  nationality: string;
  nextOfKin: string;
}

const ClientInfo = ({ client }: { client: ClientDetails }) => (
  <div className="w-[360px] mr-4 border-r p-4">
    {/* Green section */}
    <div className="bg-[#d9edd9] rounded-lg p-4 mb-6 relative w-full h-28">
      <div className="flex items-start justify-between">
        {/* Avatar extending slightly outside the green section */}
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center absolute top-16 left-4 border-2 border-white">
          {/* <UserCircle className="w-full h-full text-gray-500" /> */}
          <Image quality={80} src={avatar} alt="avatar" />
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-black text-sm">{client.bvn}</span>
          <Copy className="w-4 h-4 text-gray-500 cursor-pointer" />
        </div>
      </div>
    </div>

    {/* Client details */}
    <div className="mt-6 mb-4">
      <h2 className="text-lg font-semibold text-black">{`${client.firstName} ${client.lastName}`}</h2>
      <p className="text-green-500 text-sm mt-1">ID: {client.id}</p>
      <p className="text-gray-600 text-sm mt-1">Email: {client.email}</p>
      <p className="text-gray-600 text-sm mt-1">Phone: {client.phone}</p>
    </div>

    {/* Individual and Nationality on the same line */}
    <div className="flex items-center mt-4">
      <div className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-[#E8F3E8] text-green-600">
        <User className="w-4 h-4 mr-1 text-green-600" /> Individual
      </div>
      <span className="border bg-gray-50 px-2 py-1 w-24 rounded-md text-sm text-black ml-2">{client.nationality}</span>
    </div>

    {/* Address section */}
    <hr className="my-6" />
    <div className="mb-6">
      <h3 className="text-sm text-black font-medium mb-2">Address</h3>
      <p className="text-sm text-gray-600">{client.address}</p>
    </div>

    {/* Attachments section */}
    <div className="mb-6">
      <h3 className="text-sm text-black font-medium mb-2">Attachments</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-md w-full bg-gray-100 h-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              <File className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-sm text-gray-500">International Passport</span>
          </div>
          <Ellipsis className="w-4 h-4 mr-3 text-black cursor-pointer" />
        </div>
        <div className="flex items-center  bg-gray-100 w-full h-10 rounded-md justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              <File className="w-4 h-4 text-gray-500" />
            </div>
            <span className="text-sm text-gray-500">Utility Bill</span>
          </div>
          <Ellipsis className="w-4 h-4 mr-2 cursor-pointer text-black" />
        </div>
      </div>
    </div>

    {/* Next of Kin section */}
    <div>
      <h3 className="text-sm text-black font-medium mb-2">Next of Kin</h3>
      <p className="text-sm text-gray-600">{client.nextOfKin}</p>
    </div>
  </div>
);

export default ClientInfo;
