import api from "@/lib/api/api";
import { Vault } from "../types/vaultTypes";
import { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { getAxiosErrorMessage } from "@/lib/api/getAxiosErrorMessage";

export const vaultService = {
  createNewVault: async (name: string): Promise<ServiceOperationResult> => {
    try {
      await api.post<Vault>("/vaults/", { name });
      return {
        ok: true,
        message: "Vault created successfully",
      };
    } catch (error) {
      const err = error as AxiosError;
      return {
        ok: false,
        message: getAxiosErrorMessage(err, "Error creating vault"),
      };
    }
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
