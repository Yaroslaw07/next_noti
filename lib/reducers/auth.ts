import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
import { AxiosError, AxiosResponse } from "axios";
import {
  AuthApiResponse,
  AuthStatuses,
  LoginCredentials,
  SignupCredentials,
} from "@/types/auth";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  status: AuthStatuses;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  status: "loading",
};

export const loginAsync = createAsyncThunk<
  AuthApiResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  "auth/login",
  async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        (err.response?.data as { message: string }).message
      );
    }
  }
);

export const signupAsync = createAsyncThunk<
  AuthApiResponse,
  SignupCredentials,
  { rejectValue: string }
>(
  "auth/signup",
  async (credentials: SignupCredentials, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api.post("/auth/signup", {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        (err.response?.data as { message: string }).message
      );
    }
  }
);

export const logoutAsync = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch(setAuthStatus("unauthenticated"));
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state) => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.status = "authenticated";
      } else {
        state.status = "unauthenticated";
      }
    },

    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      setAuthStatus("authenticated");
    });

    builder.addCase(loginAsync.rejected, (state) => {
      setAuthStatus("unauthenticated");
    });

    builder.addCase(signupAsync.fulfilled, (state, action) => {
      setAuthStatus("authenticated");
    });

    builder.addCase(signupAsync.rejected, (state) => {
      setAuthStatus("unauthenticated");
    });
  },
});

export const { setAuthStatus, loadUser } = AuthSlice.actions;
export default AuthSlice.reducer;
