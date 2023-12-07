import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Vault } from "@/types/vault";
import { api, authApi } from "../api/api";

interface VaultState {
  vaults: Vault[];
}

const initialState: VaultState = {
  vaults: [],
};

export const getVaults = createAsyncThunk<Vault[], void>(
  "vault/getVaults",
  async (_, { dispatch }) => {
    console.log("getVaults");
    try {
      const response = await authApi.get("/vaults/");

      dispatch(vaultSlice.actions.setVaults(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const vaultSlice = createSlice({
  name: "vault",
  initialState: initialState,
  reducers: {
    setVaults: (state, action: PayloadAction<Vault[]>) => {
      state.vaults = action.payload;
    },
    setActiveVault: (state, action: PayloadAction<Vault>) => {
      localStorage.setItem("activeVault", JSON.stringify(action.payload));
    },
  },
});

export const { setVaults } = vaultSlice.actions;
export default vaultSlice.reducer;
