import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import OverviewCards from "@/app/_components/OverviewCards";
import NewAccountsTable from "@/app/_components/NewAccountsTable";

const Page = () => {
  return (
    <div className="flex">
      <div className="fixed">
         <Sidebar/>
      </div>
     <main className="ml-64 flex-1 p-6">
      <div className="flex-1 p-5">
        <Header name="Adamu Tosin" email="adamu.tosin@gmail.com" />
        <div className="mb-6"></div>
        <OverviewCards />
        <NewAccountsTable />
      </div>
    </main>
    </div>
  );
};

export default Page;