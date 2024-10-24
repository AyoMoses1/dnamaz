import Sidebar from "@/app/_components/Sidebar";
import Header from "@/app/_components/Header";
import OverviewCards from "@/app/_components/OverviewCards";
import NewAccountsTable from "@/app/_components/NewAccountsTable";

const Page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <Header name="Adamu" email="adamu.tosin@gmail.com" />
        <OverviewCards />
        <NewAccountsTable />
      </div>
    </div>
  );
};

export default Page;