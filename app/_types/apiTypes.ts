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
