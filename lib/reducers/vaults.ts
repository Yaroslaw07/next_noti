// reducers/vaultReducer.ts
import { Vault } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VaultState {
  vaults: Vault[];
  currentVault: Vault | null;
  currentUserId: string | null;
}


const initialState: VaultState = {
  vaults: [],
  currentVault: null,
  currentUserId: null,
};

const vaultSlice = createSlice({
  name: "vault",
  initialState:initialState,
  reducers: {
    setAll: (state, action: PayloadAction<VaultState>) => {
      state.vaults = action.payload.vaults;
      state.currentUserId = action.payload.currentUserId;
      state.currentVault = action.payload.currentVault;
    },
  },
});

export const { setAll } = vaultSlice.actions;
export default  vaultSlice.reducer;
