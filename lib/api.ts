import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "./store";
import { parseCookies } from "nookies";
import * as cookie from "cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:3535",
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:3535",
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use((config) => {
  config.headers!["Authorization"] = `Bearer ${
    window === undefined
      ? parseCookies().accessToken
      : cookie.parse(config.headers.cookie || "").accessToken
  }`;
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response?.status === 401) {
      try {
        return api(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  }
);

export { api, authApi };
