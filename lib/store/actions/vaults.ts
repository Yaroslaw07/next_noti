import api from "@/lib/api/api";
import { Vault } from "@/types/vault";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseCookies, setCookie } from "nookies";
import { setCurrentVault } from "../reducers/currentVault";
import { AxiosError } from "axios";

export const getVaults = createAsyncThunk<Vault[], void>(
  "vault/getVaults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Vault[]>("/vaults/");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch vaults");
    }
  }
);

export const createNewVault = createAsyncThunk<Vault, string>(
  "vault/createNewVault",
  async (name, { rejectWithValue, dispatch }) => {
    console.log("createNewVault");
    try {
      console.log("createNewVault");
      const response = await api.post<Vault>("/vaults/", { name });
      setCookie(null, "currentVault", JSON.stringify(response.data), {
        path: "/",
      });
      dispatch(setCurrentVault({ vault: response.data }));
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        (err.response?.data as { message: string }).message ||
          "Failed to create vault"
      );
    }
  }
);

export const selectVault = createAsyncThunk<Vault, Vault>(
  "vault/selectVault",
  async (vault, { rejectWithValue, dispatch }) => {
    console.log("selectVault");
    try {
      setCookie(null, "currentVault", JSON.stringify(vault), {
        path: "/",
      });
      dispatch(setCurrentVault({ vault: vault }));
      return vault;
    } catch (error) {
      return rejectWithValue("Failed to select vault");
    }
  }
);

export const loadVault = createAsyncThunk(
  "vault/loadVault",
  async (_, { dispatch }) => {
    console.log("loadVault");
    const cookies = parseCookies();
    dispatch(setCurrentVault({ vault: JSON.parse(cookies.currentVault) }));
  }
);
