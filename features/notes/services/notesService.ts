import { getVaultHeader } from "@/features/auth/services/authService";
import api from "@/lib/api/api";
import { serviceApiCall } from "@/lib/api/serviceApiCall";

export const notesService = {
  updateTitle: async (vaultId: string, noteId: string, newTitle: string) => {
    return serviceApiCall(
      () =>
        api.put(
          `/notes/${noteId}/title`,
          { title: newTitle },
          getVaultHeader(vaultId)
        ),
      "Title updated successfully",
      "Error updating title"
    );
  },
};
