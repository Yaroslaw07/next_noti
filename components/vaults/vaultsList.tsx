import { Vault } from "@/types/vault";
import { Box, Stack } from "@mui/material";
import { FC } from "react";
import VaultCard from "./vaultsCard";

interface VaultsListProps {
  vaults: Vault[];
}

const VaultsList: FC<VaultsListProps> = ({ vaults }) => {
  return (
    <Box sx={{ height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
      <Stack spacing={1.2} sx={{ width: "100%" }}>
        {vaults.map((vault) => (
          <VaultCard key={vault.id} vault={vault} />
        ))}
      </Stack>
    </Box>
  );
};

export default VaultsList;
