import { vaultService } from "../services/vaultsService";
import { Vault } from "../types/vaultTypes";
import useVaultStore from "@/features/vaults/stores/vaultStore";
import { useEffect } from "react";

export const useCurrentVault = () => {
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

    result.ok && vaultService.saveCookieVault(result.data as Vault);
    setCurrentVault(result.data as Vault);

    return result;
  };

  const selectVaultHandler = async (vault: Vault) => {
    vaultService.saveCookieVault(vault);
    setCurrentVault(vault);
  };

  const leaveVaultHandler = async () => {
    vaultService.saveCookieVault(null);
    setCurrentVault(null);
  };

  const updateVaultHandler = async (vault: Vault) => {
    vaultService.updateVault(vault);
  };

  const deleteVaultHandler = async () => {
    await vaultService.deleteVault(currentVault!.id);
  };

  return {
    createNewVault: createNewVaultHandler,
    selectVault: selectVaultHandler,
    leaveVault: leaveVaultHandler,
    updateVault: updateVaultHandler,
    deleteVault: deleteVaultHandler,
    setCurrentVault,
    currentVault,
  };
};
