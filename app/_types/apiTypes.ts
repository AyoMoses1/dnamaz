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
