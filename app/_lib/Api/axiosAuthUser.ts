"use client";

import axios from "axios";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export const axiosAuthUser = axios.create({
 baseURL: process.env.NEXT_PUBLIC_API_URL,  
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers": "Content-Type, multipart/form-data",
    "Authorization": "",
  },
});

export const authUserGet = async <TQueryParams,>(
  url: string,
  queryParams?: TQueryParams
) =>
  await axiosAuthUser
    .get(url, { params: { ...queryParams } })
    .then((res: any) => res.data);
export const authUserPost = (url: string, data: any) =>
  axiosAuthUser.post(url, data).then((res: any) => res.data);
export const authUserPut = (url: string, data: any) =>
  axiosAuthUser.put(url, data).then((res: any) => res.data);
export const authUserDel = (url: string) =>
  axiosAuthUser.delete(url).then((res: any) => res.data);

const AxiosAuthUserProvider = () => {
  const { data: session } = useSession();

  const token = session?.user.accessToken;

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = axiosAuthUser.interceptors.request.use(
      async (config) => {
        const session = await getSession();
        const token = session?.user?.accessToken;
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

  // Add response interceptor
    const responseInterceptor = axiosAuthUser.interceptors.response.use(
      (response) => response,
      (error) => {
        const { status } = error.response || {};
        if (status === 401 || status === 403) {
          signOut({ callbackUrl: "/login" });
          throw new Error("Unauthorized user");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component unmounts
    return () => {
      axiosAuthUser.interceptors.request.eject(requestInterceptor);
      axiosAuthUser.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return null;
};


export default AxiosAuthUserProvider;
