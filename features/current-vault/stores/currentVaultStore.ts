import { create } from "zustand";
import { Vault } from "../../vaults/types/vaultTypes";

interface CurrentVaultStore {
  currentVault: Vault | null;

  setCurrentVault: (vault: Vault | null) => void;
  exitVault: () => void;
}

const useCurrentVaultStore = create<CurrentVaultStore>((set) => ({
  currentVault: null,

  setCurrentVault: (vault: Vault | null) => {
    set({ currentVault: vault });
  },

  exitVault: () => {
    set({ currentVault: null });
  },
}));

export default useCurrentVaultStore;
