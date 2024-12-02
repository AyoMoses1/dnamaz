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
    userProfileId?: number;
    createdAt?: string;
    updatedAt?: string;
  }>;
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
    userProfileId?: number;
    createdAt?: string;
    updatedAt?: string;
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
  maidenName?: string;
  activationStatus: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  postcode?: string | null;
  postalAddress?: string | null;
  annualIncome?: number | null;
  kycLevel: number;
  bvnVerified: boolean;
  userBvn?: string | null;
  userDocument?: Array<{
    id: number;
    typeOfId: string;
    document: string;
    documentType: string;
    idNumber?: string | null;
    issueDate?: string | null;
    expiryDate?: string | null;
    userProfileId?: number;
    createdAt?: string;
    updatedAt?: string;
  }>;
  nextOfKin?: {
    id: number;
    firstName: string;
    lastName: string;
    relationship: string;
    occupation?: string;
    houseAddress?: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    userProfileId: number;
  };
}

export interface ClientResponse {
  data: {
    userId: number;
    userType: "cooperate" | "individual";
    createdAt: string;
    bvn: string | null;
    profile: CooperateProfile | IndividualProfile;
    documents?: Array<{
      id: number;
      typeOfId: string;
      document: string;
      documentType: string;
      idNumber?: string | null;
      issueDate?: string | null;
      expiryDate?: string | null;
      userProfileId?: number;
      createdAt?: string;
      updatedAt?: string;
    }>;
    nextOfKin?: {
      id: number;
      firstName: string;
      lastName: string;
      relationship: string;
      occupation?: string;
      houseAddress?: string;
      phoneNumber: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      userProfileId: number;
    };
  };
  message: string;
}


export interface ApiResponse {
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

export type RoleType = "ADMIN" | "STAFF" | "USER";

export type ActivationStatus = "approved" | "rejected";
export interface CustomerUpdateRequest {
  user_id: number;
  status: ActivationStatus; // Added status field
  activationStatus: ActivationStatus;
  user_type: "individual" | "cooperate";
}
export interface MutationError {
  error: string;
  message: string;
}

export type UserType = "individual" | "cooperate";


export interface BaseCustomer {
  userId: number;
  email: string;
  name: string;
  userType: "individual" | "cooperate";
  createdAt: string;
  activationStatus: string;
}

export interface CorporateCustomer extends BaseCustomer {
  userType: "cooperate";
  natureOfBusiness: string;
  primaryBusinessAddress: string;
}

export interface IndividualCustomer extends BaseCustomer {
  userType: "individual";
  occupation: string;
  address: string;
}

// type Customer = CorporateCustomer | IndividualCustomer;

