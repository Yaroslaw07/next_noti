import axios, { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../../features/auth/accessToken";

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

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    throw error;
  }
);

export default api;
