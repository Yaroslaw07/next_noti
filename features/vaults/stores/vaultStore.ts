import { create } from "zustand";
import { Vault } from "../types/vaultTypes";

interface VaultStore {
  currentVault: Vault | null;

  setCurrentVault: (vault: Vault | null) => void;
  exitVault: () => void;
}

const useVaultStore = create<VaultStore>((set) => ({
  currentVault: null,

  setCurrentVault: (vault: Vault | null) => {
    set({ currentVault: vault });
  },

  exitVault: () => {
    set({ currentVault: null });
  },
}));

export default useVaultStore;
