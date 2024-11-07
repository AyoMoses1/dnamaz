"use client";

import axios from "axios";

const axiosGuest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const guestGet = (url: string) =>
  axiosGuest.get(url).then((res) => res.data);

export const guestPost = (url: string, data: any) =>
  axiosGuest.post(url, data).then((res) => res.data);

export const guestPut = (url: string, data: any) =>
  axiosGuest.put(url, data).then((res) => res.data);

export const guestDel = (url: string) =>
  axiosGuest.delete(url).then((res) => res.data);

const AxiosGuestProvider = () => {
  axiosGuest.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          throw new Error("Unauthorized user");
        }
      }
      return Promise.reject(error);
    }
  );

  return null;
};

export default AxiosGuestProvider;



