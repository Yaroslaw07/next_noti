import { ChangeEvent, FC, use, useEffect, useRef, useState } from "react";
import { Vault } from "../../types/vaultTypes";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCurrentVault } from "../../hooks/useCurrentVault";
import HR from "@/components/ui/HR";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vaultSchema } from "../../vaultsValidator";

interface VaultSettingsModalProps {
  isOpen: boolean;
  handleClose: () => void;
  vault: Vault;
}

const VaultSettingsModal: FC<VaultSettingsModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const { currentVault, updateVault, deleteVault } = useCurrentVault();

  const [hasChanges, setHasChanges] = useState(false);

  const {
    handleSubmit: onSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<{ name: string }>({
    resolver: zodResolver(vaultSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    reset({ name: currentVault?.name || "" });
  }, [currentVault?.name]);

  const watchName = watch("name");

  useEffect(() => {
    if (watchName !== currentVault?.name) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [currentVault?.name, watchName]);

  const handleUpdateVault = (vault: Partial<Vault>) => {
    updateVault({ ...currentVault!, ...vault });
  };

  const handleReset = () => {
    reset({ name: currentVault?.name || "" });
    setHasChanges(false);
  };

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
        spacing={3}
        alignItems={"center"}
        component="form"
        onSubmit={onSubmit(handleUpdateVault)}
        sx={{
          backgroundColor: "secondary.main",
          width: "400px",
          borderRadius: "12px",
          borderColor: "primary.main",
          borderWidth: "1.5px",
          borderStyle: "solid",
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
          padding: "18px",
        }}
      >
        <Typography variant="h5">Vault Settings</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Vault Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Stack direction={"row"} spacing={1} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!hasChanges}
            sx={{ width: "50%" }}
            type="submit"
          >
            Update
          </Button>
          <Button onClick={handleReset} sx={{ width: "50%" }}>
            Cancel
          </Button>
        </Stack>
        <HR></HR>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            width: "100%",
            backgroundColor: "additional.main",
            padding: "10px 20px",
            borderRadius: "8px",
            borderColor: "warning.main",
          }}
        >
          <Typography variant="h6">
            {"Delete your vault permanently"}
          </Typography>

          <Button
            color="primary"
            variant="contained"
            sx={{ width: "40%" }}
            onClick={() => deleteVault()}
          >
            Delete{" "}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default VaultSettingsModal;
