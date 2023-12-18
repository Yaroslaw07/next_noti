import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import HR from "../ui/HR";
import { Icons } from "../Icons";
import { useVaults } from "@/lib/hooks/useVaults";
import { validateVaultName } from "@/lib/validator";
import { useRouter } from "next/router";
import { useToast } from "@/lib/hooks/useToast";

interface NewVaultModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NewVaultModal: FC<NewVaultModalProps> = ({ isOpen, handleClose }) => {
  const router = useRouter();
  const { openToast } = useToast();

  const { createNewVault } = useVaults();

  const [newVaultName, setNewVaultName] = useState("");
  const [error, setError] = useState("");

  const handleCreateNewVault = async () => {
    setError(validateVaultName(newVaultName));
    if (error !== "") return;

    const { ok, message } = await createNewVault(newVaultName);
    openToast(message, ok ? "success" : "error");
    ok === true ? router.push("/notes") : null;
  };

  const handleCloseModal = () => {
    setNewVaultName("");
    setError("");
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
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
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontSize: "1.8rem",
            fontWeight: "600",
            marginTop: "0",
            textAlign: "center",
          }}
        >
          Enter name for new vault
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          size="small"
          id="vault-name"
          label="Vault Name"
          name="vaultName"
          autoComplete="vault"
          error={!!error}
          helperText={error}
          onChange={(e) => setNewVaultName(e.target.value)}
        />
        <HR />
        <Stack spacing={0.5} sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              fontSize: "18px",
            }}
            endIcon={<Icons.KeyboardRight />}
            onClick={handleCreateNewVault}
          >
            Create New
          </Button>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            sx={{
              borderColor: "primary.main",
            }}
            onClick={handleCloseModal}
          >
            Back to vaults list
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default NewVaultModal;
