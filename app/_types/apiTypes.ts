export interface AdminLoginRequest {
  username: string;
  password: string;
}
export interface AdminLoginResponse {
  token: {
    type: string; 
    token: string; 
  };
  user: {
    id: number;
    email: string;
    is_staff: boolean;
    is_admin: boolean;
  };
}

export interface NewRequest {
  data: {
    userId: number;
    email: string;
    name: string;
    userType: "cooperate" | "individual";
    createdAt: string;
    activationStatus: string;
    natureOfBusiness?: string; 
    primaryBusinessAddress?: string; 
    occupation?: string; 
    address?: string; 
  }[];
  message: string;
}
export interface Customer {
  userId: number;
  email: string;
  name: string;
  userType: "cooperate" | "individual";
  createdAt: string;
  activationStatus: string;
  natureOfBusiness?: string; 
  primaryBusinessAddress?: string; 
  occupation?: string; 
  address?: string; 
  investments: number;
}

export interface MetaData {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
}

export interface CustomerResponse {
  data: Customer[];  
  meta: MetaData;
  message: string;
}

export interface CustomerError {
  error: string;
  message: string;
}

export interface CooperateProfile {
  id: number;
  rc: string;
  dateOfIncorporation: string;
  businessName: string;
  natureOfBusiness: string;
  primaryBusinessAddress: string;
  phone: string;
  companyEmail: string;
  activationStatus: string;
  kycLevel: number;
  cooperateRepresentative: {
    id: number;
    fullName: string;
    designation: string;
    idNumber: string;
    issueDate: string;
    expiryDate: string;
    document: string;
    typeOfId: string;
  };
  cooperateDocuments: Array<{
    id: number;
    typeOfId: string;
    document: string;
    idNumber: string | null;
    issueDate: string | null;
    expiryDate: string | null;
    documentType: string;
  }>;
}

export interface IndividualProfile {
  id: number;
  firstName: string;
  lastName: string;
  clientNumber: string;
  occupation: string;
  houseAddress: string;
  phoneNumber: string;
  nationality: string;
  dateOfBirth: string;
  userDocument?: Array<{
    id: number;
    typeOfId: string;
    document: string;
    documentType: string;
  }>;
  nextOfKin?: {
    firstName: string;
    lastName: string;
    relationship: string;
    email: string;
  };
}

export interface ClientResponse {
  data: {
    userId: number;
    userType: "cooperate" | "individual";
    profile: CooperateProfile | IndividualProfile;
  };
  message: string;
}
