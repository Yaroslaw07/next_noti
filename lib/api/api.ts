import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:3535",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config): Promise<InternalAxiosRequestConfig<any>> => {
    const accessToken = parseCookies().accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    }

    const response = await fetch("/api/auth/refresh", {
      method: "POST",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new AxiosError(data.message, response.status.toString(), config);
    }

    config.headers["Authorization"] = `Bearer ${data.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
