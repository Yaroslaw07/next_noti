import { getVaultHeader } from "@/features/auth/services/authService";
import api from "@/lib/api/api";
import { serviceApiCall } from "@/lib/api/serviceApiCall";

export const notesService = {
  getNote: async (vaultId: string, noteId: string) => {
    return serviceApiCall(
      () => api.get(`/notes/${noteId}`, getVaultHeader(vaultId)),
      "Successfully fetched note",
      "Failed to fetch note"
    );
  },
};
