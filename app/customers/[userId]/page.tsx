// pages/index.tsx
import ClientDetails from "@/app/_components/ClientDetails";
import Sidebar from "@/app/_components/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="flex">
      <div className="fixed">
        <Sidebar/>
      </div>
     <main className="ml-64 flex-1 p-6">
      <div className="flex-1 p-5">
        <ClientDetails  />
      </div>
    </main>
    </div>
    
  );
};

export default Home;
