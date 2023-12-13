import { LoginCredentials, SignupCredentials } from "@/types/auth";
import axios, { AxiosError } from "axios";

interface AuthOperationResponse {
  ok: boolean;
  message: string;
}

const authFetch = async (
  url: string,
  credentials?: any
): Promise<AuthOperationResponse> => {
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
      message: (err.response?.data as { message: string }).message || "",
    };
  }
};

export const useAuth = () => {
  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthOperationResponse> => {
    return authFetch("/api/auth/login", credentials).then((res) =>
      res.ok
        ? { ok: true, message: "Login successful" }
        : {
            ok: false,
            message: res.message !== " " ? res.message : "Login failed",
          }
    );
  };

  const signup = async (
    credentials: SignupCredentials
  ): Promise<AuthOperationResponse> => {
    return authFetch("/api/auth/signup", credentials).then((res) =>
      res.ok
        ? { ok: true, message: "Login successful" }
        : {
            ok: false,
            message: res.message !== "" ? res.message : "Login failed",
          }
    );
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
  };

  return {
    login,
    signup,
    logout,
  };
};
