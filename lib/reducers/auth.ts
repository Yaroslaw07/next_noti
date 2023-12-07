import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { AxiosError, AxiosResponse } from "axios";
import {
  AuthApiResponse,
  AuthStatuses,
  LoginCredentials,
  SignupCredentials,
} from "@/types/auth";

import jwt, { JwtPayload } from "jsonwebtoken";
import { RootState } from "../store";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  status: AuthStatuses;
  userLoaded: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  status: "loading",
  userLoaded: false,
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

      dispatch(
        setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );

      dispatch(setAuthStatus("authenticated"));

      return response.data;
    } catch (error) {
      dispatch(setAuthStatus("unauthenticated"));
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

      dispatch(
        setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      dispatch(setAuthStatus("authenticated"));

      return response.data;
    } catch (error) {
      dispatch(setAuthStatus("unauthenticated"));
      const err = error as AxiosError;

      return rejectWithValue(
        (err.response?.data as { message: string }).message
      );
    }
  }
);

export const refreshTokens = createAsyncThunk<AuthApiResponse>(
  "auth/refreshTokens",
  async (_, { dispatch, getState }) => {
    try {
      const refreshToken = (getState() as RootState).auth.refreshToken;

      const response: AxiosResponse = await api.post("/auth/refresh", {
        refreshToken: refreshToken,
      });

      dispatch(
        setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      dispatch(setAuthStatus("authenticated"));

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err.response?.data;
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
        try {
          const decodedAccessToken = jwt.decode(accessToken) as JwtPayload;
          const decodedRefreshToken = jwt.decode(refreshToken) as JwtPayload;

          if (
            decodedAccessToken &&
            decodedRefreshToken &&
            decodedRefreshToken.exp! > Date.now() / 1000
          ) {
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.status = "authenticated";
            return;
          }
        } catch (error) {
          console.error("Error decoding tokens:", error);
        }

        // Clear tokens and set unauthenticated status if decoding fails or tokens are invalid
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        state.status = "unauthenticated";
      } else {
        state.status = "unauthenticated";
      }
    },

    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },

    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  },
});

export const { setAuthStatus, loadUser, setTokens } = AuthSlice.actions;
export default AuthSlice.reducer;
