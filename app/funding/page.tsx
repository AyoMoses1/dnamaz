import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";
import OutstandingBalance from "@/app/_components/OutstandingBalance";
import FundingTable from "../_components/FundingTable";

export default function Page() {
  return (
    <div className="flex">
      <div className="fixed">
         <Sidebar/>
      </div>
     <main className="ml-64 flex-1 p-6">
      <div className="flex-1 p-5">
        <Header 
          name="Asset Finance" 
          description="Here's an overview of your funded project base" 
          email="adamu.tosin@gmail.com" />

    <div className="container mx-auto py-8">
      <OutstandingBalance
        totalProjects={713}
        outstandingBalance={9500000}
        dueAmount={500000}
        dueClients={21}
        cooperateCustomers={69}
        individualCustomers={0}
      />
    </div>

        <FundingTable />
      </div>
    </main>
    </div>
  );
}