import { Vault } from "@/types/vault";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import VaultCard from "./VaultsCard";
import { Icons } from "../Icons";
import store from "@/lib/store";
import { getVaults } from "@/lib/reducers/vaults";
import useVaults from "@/lib/hooks/useVaults";
import { useToast } from "@/lib/hooks/useToast";

const VaultsList: FC = () => {
  const { vaults, isLoading, isError } = useVaults();
  const { openToast } = useToast();

  if (isLoading)
    return (
      <Stack spacing={1.4}>
        <Skeleton variant="rounded" width="100%" height="55px" />
        <Skeleton variant="rounded" width="100%" height="55px" />
      </Stack>
    );

  if (isError) {
    openToast("Could not fetch vaults", "error");
  }

  if (vaults.length === 0) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginX: "20%",
          gap: "0.5rem",
        }}
      >
        <Icons.noVaults
          sx={{
            fontSize: "5rem",
            color: "primary.main",
          }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "600", fontSize: "1.8rem", textAlign: "center" }}
        >
          {"No vaults"}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1.4}>
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
    </Stack>
  );
};

export default VaultsList;
