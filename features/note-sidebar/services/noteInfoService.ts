import api from "@/lib/api/api";
import { getAxiosErrorMessage } from "@/lib/api/getAxiosErrorMessage";
import { serviceApiCall } from "@/lib/api/serviceCall";
import { AxiosError } from "axios";

const getVaultHeader = (vaultId: string) => ({
  headers: {
    vault_id: vaultId,
  },
});

export const notesInfoService = {
  getNotes: async (vaultId: string): Promise<ServiceOperationResult> => {
    return serviceApiCall(
      () => api.get("/notes/", getVaultHeader(vaultId)),
      "Notes loaded successfully",
      "Error loading notes"
    );
  },

  addNote: async (vaultId: string): Promise<ServiceOperationResult> => {
    return serviceApiCall(
      () => api.post("/notes/", {}, getVaultHeader(vaultId)),
      "Note added successfully",
      "Error adding note"
    );
  },

  removeNote: async (
    vaultId: string,
    noteId: string
  ): Promise<ServiceOperationResult> => {
    return serviceApiCall(
      () => api.delete(`/notes/${noteId}`, getVaultHeader(vaultId)),
      "Note removed successfully",
      "Error removing note"
    );
  },
};

export default notesInfoService;
