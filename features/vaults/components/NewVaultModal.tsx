import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import HR from "../../../components/ui/HR";
import { Icons } from "../../../components/Icons";
import { useRouter } from "next/router";
import { useVaults } from "../hooks/useVaults";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Vault } from "../types/vaultTypes";
import { Controller, useForm } from "react-hook-form";
import { vaultSchema } from "../vaultsValidator";

interface NewVaultModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NewVaultModal: FC<NewVaultModalProps> = ({ isOpen, handleClose }) => {
  const router = useRouter();

  const { openToast } = useToast();
  const { createNewVault } = useVaults();

  const {
    handleSubmit: onSubmit,
    formState: { errors },
    control,
  } = useForm<{ name: string }>({
    resolver: zodResolver(vaultSchema),
    defaultValues: { name: "" },
  });

  const handleCreateNewVault = async (vault: Partial<Vault>) => {
    const { ok, message } = await createNewVault(vault.name as string);

    openToast(message, ok ? "success" : "error");
    ok && router.push("/notes");
  };

  const handleCloseModal = () => {
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
        component="form"
        alignItems={"center"}
        onSubmit={onSubmit(handleCreateNewVault)}
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
            fontSize: "1.6rem",
            fontWeight: "500",
            marginTop: "0",
            textAlign: "center",
          }}
        >
          {"New vault"}
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              name="name"
              fullWidth
              margin="normal"
              size="small"
              id="vault-name"
              label="Vault Name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <HR />
        <Stack spacing={0.5} sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              fontSize: "18px",
            }}
            endIcon={<Icons.KeyboardRight />}
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
