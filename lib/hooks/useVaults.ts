import { useSelector } from "react-redux";
import {
  createNewVault,
  selectVault,
  loadVault,
} from "../store/actions/vaults"; // Update with the correct path to your actions
import { Vault } from "@/types/vault";
import { RootState, useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { useUiUpdate } from "./useUiUpdate";

export const useVaults = () => {
  const dispatch = useAppDispatch();
  const currentVault = useSelector(
    (state: RootState) => state.currentVault.vault
  );

  const { toNotesListUpdate, setToNotesListUpdate } = useUiUpdate();

  useEffect(() => {
    dispatch(loadVault());
    setToNotesListUpdate(true);
  }, []);

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
