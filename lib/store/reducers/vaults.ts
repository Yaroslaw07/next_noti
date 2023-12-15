import { createAsyncThunk } from "@reduxjs/toolkit";
import { Vault } from "@/types/vault";
import { authApi } from "../../api/api";

export const getVaults = createAsyncThunk<Vault[], void>(
  "vault/getVaults",
  async (_, { rejectWithValue }) => {
    console.log("getVaults");
    try {
      const response = await authApi.get<Vault[]>("/vaults/");
      return response.data;
    } catch (error) {
      console.error("Error fetching vaults:", error);
      return rejectWithValue("Failed to fetch vaults");
    }
  }
);
