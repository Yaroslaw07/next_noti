import api from "@/lib/api/api";
import { getAxiosErrorMessage } from "@/lib/api/getAxiosErrorMessage";
import { AxiosError } from "axios";

const getVaultHeader = (vaultId: string) => ({
  headers: {
    vault_id: vaultId,
  },
});

export const notesInfoService = {
  getNotes: async (vaultId: string): Promise<ServiceOperationResult> => {
    try {
      const response = await api.get(`/notes/`, getVaultHeader(vaultId));

      console.log(response);

      return {
        ok: true,
        message: "Notes loaded successfully",
        data: response.data,
      };
    } catch (error) {
      const err = error as AxiosError;

      return {
        ok: false,
        message: getAxiosErrorMessage(err, "Error loading notes"),
      };
    }
  },

  addNote: async (vaultId: string): Promise<ServiceOperationResult> => {
    try {
      const response = await api.post(
        `/notes/`,
        undefined,
        getVaultHeader(vaultId)
      );

      return {
        ok: true,
        message: "Note created successfully",
        data: response.data,
      };
    } catch (error) {
      const err = error as AxiosError;

      return {
        ok: false,
        message: getAxiosErrorMessage(err, "Error creating note"),
      };
    }
  },

  removeNote: async (
    vaultId: string,
    noteId: string
  ): Promise<ServiceOperationResult> => {
    try {
      const response = await api.delete(
        `/notes/${noteId}`,
        getVaultHeader(vaultId)
      );
      return {
        ok: true,
        message: "Note removed successfully",
        data: response.data,
      };
    } catch (error) {
      const err = error as AxiosError;

      return {
        ok: false,
        message: getAxiosErrorMessage(err, "Error removing note"),
      };
    }
  },
};

export default notesInfoService;
