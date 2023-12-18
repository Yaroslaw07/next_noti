import { LoginCredentials, SignupCredentials } from "@/types/auth";
import axios, { AxiosError } from "axios";

const authFetch = async (
  url: string,
  credentials?: any
): Promise<HookOperationResponse> => {
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
  ): Promise<HookOperationResponse> => {
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
  ): Promise<HookOperationResponse> => {
    return authFetch("/api/auth/signup", credentials).then((res) =>
      res.ok
        ? { ok: true, message: "Signup successful" }
        : {
            ok: false,
            message: res.message !== "" ? res.message : "Signup failed",
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
