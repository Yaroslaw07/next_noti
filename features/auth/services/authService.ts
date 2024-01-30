import axios, { AxiosError } from "axios";
import { LoginCredentials, SignupCredentials } from "../types/authTypes";
import { getAxiosErrorMessage } from "@/lib/api/getAxiosErrorMessage";
import { serviceApiCall } from "@/lib/api/serviceCall";

axios.defaults.headers["Content-Type"] = "application/json";

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<ServiceOperationResult> =>
    serviceApiCall(
      () => axios.post("/api/auth/login", credentials),
      "Login successful",
      "Login failed"
    ),

  signup: async (
    credentials: SignupCredentials
  ): Promise<ServiceOperationResult> =>
    serviceApiCall(
      () => axios.post("/api/auth/signup", credentials),
      "Signup successful",
      "Signup failed"
    ),

  logout: async (): Promise<void> => {
    await axios.post("/api/auth/logout");
  },
};
