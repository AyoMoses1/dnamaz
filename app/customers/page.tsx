import CustomersTable from "@/app/_components/CustomersTable";
import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <div className="fixed">
         <Sidebar/>
      </div>
     <main className="ml-64 flex-1 p-6">
      <div className="flex-1 p-5">
        <Header 
          name="Customers" 
          description="Here's an overview of your client base!" 
          email="adamu.tosin@gmail.com" />
        <div className="mb-6"></div>
        <CustomersTable />
      </div>
    </main>
    </div>
  );
}