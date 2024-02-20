import { FC } from "react";
import { Vault } from "../../types/vaultTypes";
import { Modal, Stack, Typography } from "@mui/material";

interface VaultSettingsModalProps {
  isOpen: boolean;
  handleClose: () => void;
  vault: Vault;
}

const VaultSettingsModal: FC<VaultSettingsModalProps> = ({
  isOpen,
  handleClose,
  vault,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={2}
        alignItems={"center"}
        sx={{
          backgroundColor: "secondary.main",
          width: "320px",
          borderRadius: "12px",
          borderColor: "primary.main",
          borderWidth: "1.5px",
          borderStyle: "solid",
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
          padding: "18px",
        }}
      >
        <Typography variant="h5">Vault Settings</Typography>
      </Stack>
    </Modal>
  );
};

export default VaultSettingsModal;
