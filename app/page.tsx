import LoginForm from "@/app/_components/LoginForm";
import Image from "next/image";
import dlogo from "@/public/dlogo.png";
import { LogOut } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="absolute top-10 left-10">
        <Image src={dlogo} alt="D'namaz Capital Limited" width={120} height={120} />
      </div>

      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Admin Control Panel
      </h2>

      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md flex flex-col items-center">
        <div className="bg-white border p-4 rounded-md mb-4">
          <LogOut className="text-black w-10 h-10" />
        </div>

        <h3 className="text-xl font-semibold text-black mb-2 text-center">Sign in with username</h3>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Verify account, Get business overview and Approve request
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
