import { getVaultHeader } from "@/features/auth/services/authService";
import api from "@/lib/api/api";
import { serviceApiCall } from "@/lib/api/serviceApiCall";

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

  updateNotePin: async (
    vaultId: string,
    noteId: string,
    pinned: boolean
  ): Promise<ServiceOperationResult> => {
    return serviceApiCall(
      () =>
        api.patch(`/notes/${noteId}/pin`, { pinned }, getVaultHeader(vaultId)),
      "Note pin updated successfully",
      "Error updating note pin"
    );
  },
};

export default notesInfoService;
