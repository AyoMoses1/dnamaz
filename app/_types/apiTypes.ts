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

// types.ts

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
