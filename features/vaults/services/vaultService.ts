import api from "@/lib/api/api";
import { Vault } from "../types/vaultTypes";
import { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { getAxiosErrorMessage } from "@/lib/api/getAxiosErrorMessage";
import { serviceApiCall } from "@/lib/api/serviceCall";

export const vaultService = {
  createNewVault: async (name: string): Promise<ServiceOperationResult> => {
    return serviceApiCall(
      () => api.post("/vaults/", { name }),
      "Vault created successfully",
      "Error creating vault"
    );
  },

  selectVault: async (vault: Vault): Promise<void> => {
    setCookie(null, "currentVault", JSON.stringify(vault), {
      path: "/",
    });
  },

  loadVault: async (): Promise<Vault | null> => {
    const cookies = parseCookies();
    return cookies.currentVault ? JSON.parse(cookies.currentVault) : null;
  },
};
