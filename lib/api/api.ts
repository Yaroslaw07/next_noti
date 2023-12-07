import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import auth, { logoutAsync, refreshTokens } from "../reducers/auth";
import { AuthApiResponse } from "@/types/auth";

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
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers!["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response?.status === 401) {
      try {
        await store.dispatch(refreshTokens());

        originalRequest.headers!.Authorization = `Bearer ${
          store.getState().auth.accessToken
        }`;
        return api(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    throw error;
  }
);

export { api, authApi };
