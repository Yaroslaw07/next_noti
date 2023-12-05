import { RootState, useAppDispatch } from "../store";
import auth, {
  loginAsync,
  signupAsync,
  logoutAsync,
  loadUser,
} from "../reducers/auth";
import { LoginCredentials, SignupCredentials } from "@/types/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface AuthOperationResponse {
  ok: boolean;
  message: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (status === "loading") {
      dispatch(loadUser());
    }
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthOperationResponse> => {
    try {
      await dispatch(loginAsync(credentials)).unwrap();
      return {
        ok: true,
        message: "Login successful",
      };
    } catch (error) {
      return {
        ok: false,
        message: (error as string) || "Login failed",
      };
    }
  };

  const signup = async (
    credentials: SignupCredentials
  ): Promise<AuthOperationResponse> => {
    try {
      await dispatch(signupAsync(credentials)).unwrap();
      return {
        ok: true,
        message: "Signup successful",
      };
    } catch (error) {
      return {
        ok: false,
        message: (error as string) || "Signup failed",
      };
    }
  };

  const logout = () => {
    dispatch(logoutAsync());
  };

  return {
    status,
    login,
    signup,
    logout,
  };
};
