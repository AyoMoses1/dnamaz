import React from 'react';
import { BadgeCheck } from 'lucide-react';

const ClientDetailsForm: React.FC = () => {
  return (
    <div className="mt-4 border rounded-lg shadow-sm">
      <div className="rounded-t-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-green-600" />
          <div>
            <h3 className="text-lg font-medium text-black">BVN Validated</h3> 
            <p className="text-sm text-gray-500">Client Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm text-red-600 bg-red-100 rounded-md">Reject</button>
          <button className="px-4 py-2 text-sm text-green-600 bg-green-100 rounded-md">Accept</button>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div>
          <label className="block text-sm text-gray-500">First Name</label>
          <input
            type="text"
            value="Abdulmalik"
            readOnly
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Last Name</label>
          <input
            type="text"
            value="Jackson"
            readOnly
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">D.O.B</label>
          <input
            type="text"
            value=""
            readOnly
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">B.V.N</label>
          <input
            type="text"
            value="209876457886"
            readOnly
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsForm;