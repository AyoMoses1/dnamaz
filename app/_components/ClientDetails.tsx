import React from 'react';
import { ChevronLeft } from 'lucide-react';
import ClientInfo from "./ClientInfo";
import ClientDetailsForm from './ClientDetailsForm';
import SummaryCard from "./SummaryCards";
import InvestmentTable from './InvestmentTable';

// Types
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

interface Investment {
  title: string;
  amount: number;
  date: string;
  status: 'Done' | 'Pending';
}

const ClientDetail = () => {
  const clientData: ClientDetails = {
    id: '123456789105',
    firstName: 'Abdulmalik',
    lastName: 'Jackson',
    email: 'masdasd@gmail.com',
    phone: '+2349024430184',
    bvn: '209876457886',
    address: '1901 Thorn Bridge, Adamu Boulevard, Abuja',
    nationality: 'Nigerian',
    nextOfKin: 'Hashim Jada'
  };

  const investments: Investment[] = [
    { title: 'Mudarabah Investment', amount: 25000, date: 'Sun Nov 24, 2024', status: 'Done' },
    { title: 'Flexi Funding', amount: 725000, date: 'Sun Nov 24, 2023', status: 'Pending' },
    { title: 'BKM Investment', amount: 50000, date: 'Sun Oct 24, 2024', status: 'Done' },
    { title: 'Gifting', amount: 600000, date: 'Sun Oct 24, 2024', status: 'Done' },
  ];

  return (
    <div className="h-screen bg-white">
      <div className="flex items-center gap-2 p-4">
        <ChevronLeft className="w-8 h-8 border rounded-md" />
        <h1 className="text-lg font-medium text-black">Client details</h1>
      </div>
      <div className="flex">
        <ClientInfo client={clientData} />
        <div className="">
          <SummaryCard />
          <ClientDetailsForm />
          <div className="mt-12">
          <InvestmentTable investments={investments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
