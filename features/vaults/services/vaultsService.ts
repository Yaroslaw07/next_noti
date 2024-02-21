import api from "@/lib/api/api";
import { Vault } from "../types/vaultTypes";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { serviceApiCall } from "@/lib/api/serviceApiCall";

export const vaultService = {
  createNewVault: async (name: string): Promise<ServiceOperationResult> => {
    return serviceApiCall(
      () => api.post("/vaults/", { name }),
      "Vault created successfully",
      "Error creating vault"
    );
  },

  saveCookieVault: async (vault: Vault | null): Promise<void> => {
    if (vault === null) {
      destroyCookie(null, "currentVault");
    } else {
      setCookie(null, "currentVault", JSON.stringify(vault), {
        path: "/",
      });
    }
  },

  loadVault: async (): Promise<Vault | null> => {
    const cookies = parseCookies();
    return cookies.currentVault ? JSON.parse(cookies.currentVault) : null;
  },

  updateVault: async (vault: Vault) => {
    return serviceApiCall(
      () => api.put(`/vaults/${vault.id}`, vault),
      "Vault updated successfully",
      "Error updating vault"
    );
  },

  deleteVault: async (vaultId: string) => {
    return serviceApiCall(
      () => api.delete(`/vaults/${vaultId}`),
      "Vault deleted successfully",
      "Error deleting vault"
    );
  },
};
