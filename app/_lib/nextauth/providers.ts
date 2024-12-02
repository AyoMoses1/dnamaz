import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth";
import { ApiResponse, RoleType } from "@/app/_types/apiTypes";

const ADMIN_LOGIN_ENDPOINT = "https://dnamaz-capital-backend.onrender.com/api/v1/admin/login";

const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials, req): Promise<User | null> {
    if (!credentials?.username || !credentials?.password) {
      throw new Error("Email and password are required");
    }

    try {
      // Log the request payload
      const requestPayload = {
        username: credentials.username.trim().toLowerCase(),
        password: credentials.password
      };
      
      console.log('Sending request with payload:', {
        username: requestPayload.username,
        passwordLength: requestPayload.password.length
      });

      const response = await axios.post<ApiResponse>(
        ADMIN_LOGIN_ENDPOINT,
        requestPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      console.log('Response received:', {
        status: response.status,
        headers: response.headers,
        data: response.data
      });

      const data = response.data;
      
      if (!data.token?.token || !data.user) {
        console.log('Invalid response structure:', data);
        throw new Error("Invalid response from server");
      }

      const user = {
        id: data.user.id,
        email: data.user.email,
        is_staff: Boolean(data.user.is_staff),
        is_admin: Boolean(data.user.is_admin),
        role: data.user.is_admin ? "ADMIN" : data.user.is_staff ? "STAFF" : "USER",
        accessToken: data.token.token,
        tokenType: data.token.type
      } as User;

      console.log('Successfully authenticated user:', {
        email: user.email,
        role: user.role
      });

      return user;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Authentication Error:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          config: {
            url: err.config?.url,
            method: err.config?.method,
            data: JSON.parse(err.config?.data || '{}')
          }
        });

        // Check if the error contains a specific message from the API
        const apiMessage = err.response?.data?.message || err.response?.data?.error;
        if (apiMessage) {
          throw new Error(apiMessage);
        }

        throw new Error("Invalid credentials");
      }
      console.error('Unexpected error:', err);
      throw new Error("An unexpected error occurred");
    }
  },
});

export default credentialsProvider;