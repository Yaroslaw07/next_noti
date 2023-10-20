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
    setVaults: (state, action: PayloadAction<VaultState>) => {
      state.vaults = action.payload.vaults;
      state.currentUserId = action.payload.currentUserId;
      
    },
    setCurrentVault: (state, action: PayloadAction<Vault | null>) => {
      state.currentVault = action.payload;
    },
  },
});

export const { setVaults, setCurrentVault } = vaultSlice.actions;
export default  vaultSlice.reducer;
