// Request payload type for login
export interface AdminLoginRequest {
  username: string;
  password: string;
}

// Response data type from login endpoint
export interface AdminLoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
}
