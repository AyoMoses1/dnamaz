import React from 'react';

const ClientDetailsForm: React.FC = () => {
  return (
    <div className="mt-4 border rounded-lg shadow-sm">
      <div className="bg-[#F4F9F4] rounded-t-lg p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-black">BVN Validated</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm text-red-600 bg-red-100 rounded-md">Reject</button>
          <button className="px-4 py-2 text-sm text-green-600 bg-green-100 rounded-md">Accept</button>
        </div>
      </div>
      <div className="px-4 py-3 grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
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
    </div>
  );
};

export default ClientDetailsForm;