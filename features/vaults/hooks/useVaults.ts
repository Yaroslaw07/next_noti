import { vaultService } from "../services/vaultService";
import { Vault } from "../types/vaultsTypes";
import useVaultStore from "@/features/vaults/store/vaultStore";
import { useEffect } from "react";

export const useVaults = () => {
  const { currentVault, setCurrentVault } = useVaultStore();

  useEffect(() => {
    if (currentVault === null) {
      vaultService.loadVault().then((vault) => {
        if (vault) {
          setCurrentVault(vault);
        }
      });
    }
  }, []);

  const createNewVaultHandler = async (
    name: string
  ): Promise<ServiceOperationResult> => {
    const result = await vaultService.createNewVault(name);

    result.ok && vaultService.selectVault(result.data as Vault);
    setCurrentVault(result.data as Vault);

    return result;
  };

  const selectVaultHandler = async (vault: Vault) => {
    vaultService.selectVault(vault);
    setCurrentVault(vault);
  };

  return {
    createNewVault: createNewVaultHandler,
    selectVault: selectVaultHandler,
    currentVault,
  };
};
