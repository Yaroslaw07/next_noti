import { useSelector } from "react-redux";
import {
  createNewVault,
  selectVault,
  loadVault,
} from "../../../lib/stores/actions/vaults"; // Update with the correct path to your actions
import { Vault } from "@/types/vault";
import { useEffect } from "react";
import useVaultStore from "@/features/vaults/store/vaultStore";

export const useVaults = () => {
  const { currentVault } = useVaultStore();

  const createNewVaultHandler = async (
    name: string
  ): Promise<HookOperationResponse> => {
    try {
      await dispatch(createNewVault(name)).unwrap();

      return {
        ok: true,
        message: "Vault created successfully",
      };
    } catch (error) {
      return {
        ok: false,
        message: (error as string) || "Error creating vault",
      };
    }
  };

  const selectVaultHandler = async (vault: Vault) => {
    try {
      await dispatch(selectVault(vault));
    } catch (error) {
      console.error("Error selecting vault:", error);
    }
  };

  return {
    createNewVault: createNewVaultHandler,
    selectVault: selectVaultHandler,
    currentVault,
  };
};
