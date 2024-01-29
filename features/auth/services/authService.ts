import axios, { AxiosError } from "axios";
import { LoginCredentials, SignupCredentials } from "../types/authTypes";
import { getAxiosErrorMessage } from "@/lib/api/getAxiosErrorMessage";

axios.defaults.headers["Content-Type"] = "application/json";

const authFetch = async (
  url: string,
  credentials?: any
): Promise<ServiceOperationResult> => {
  try {
    await axios.post(url, credentials);

    return {
      ok: true,
      message: "",
    };
  } catch (error) {
    const err = error as AxiosError;

    return {
      ok: false,
      message: getAxiosErrorMessage(err, "Error"),
    };
  }
};

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<ServiceOperationResult> =>
    authFetch("/api/auth/login", credentials).then((res) =>
      res.ok
        ? { ok: true, message: "Login successful" }
        : {
            ok: false,
            message: res.message !== "" ? res.message : "Login failed",
          }
    ),

  signup: async (
    credentials: SignupCredentials
  ): Promise<ServiceOperationResult> =>
    authFetch("/api/auth/signup", credentials).then((res) =>
      res.ok
        ? { ok: true, message: "Signup successful" }
        : {
            ok: false,
            message: res.message !== "" ? res.message : "Signup failed",
          }
    ),

  logout: async (): Promise<void> => {
    await axios.post("/api/auth/logout");
  },
};
