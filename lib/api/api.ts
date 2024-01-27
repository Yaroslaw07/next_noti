import axios, { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./accessToken";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:3535",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config): Promise<InternalAxiosRequestConfig<any>> => {
    try {
      const accessToken = await getAccessToken();
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.log(error);
      throw error;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
