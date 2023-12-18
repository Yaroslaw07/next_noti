import { Vault } from "@/types/vault";
import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "nookies";
import { exit } from "process";

interface currentVaultState {
  vault?: Vault | null;
}

const initialState: currentVaultState = {
  vault: undefined,
};

const currentVaultSlice = createSlice({
  name: "currentVault",
  initialState: initialState,
  reducers: {
    setCurrentVault: (state, action) => {
      state.vault = action.payload.vault;
    },
    exitVault: (state) => {
      state.vault = null;
    },
  },
});

export const { setCurrentVault } = currentVaultSlice.actions;
export default currentVaultSlice.reducer;
