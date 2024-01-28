import { authService } from "../services/authService";
import { LoginCredentials, SignupCredentials } from "../types/auth";

export const useAuth = () => {
  const login = async (credentials: LoginCredentials) => {
    return authService.login(credentials);
  };

  const signup = async (credentials: SignupCredentials) => {
    return authService.signup(credentials);
  };

  const logout = async () => {
    await authService.logout();
  };

  return {
    login,
    signup,
    logout,
  };
};
