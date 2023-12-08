import { Vault } from "@/types/vault";
import { Box, Stack } from "@mui/material";
import { FC } from "react";
import VaultCard from "./vaultsCard";

interface VaultsListProps {
  vaults: Vault[];
}

const VaultsList: FC<VaultsListProps> = ({ vaults }) => {
  return (
    <Stack spacing={1.2}>
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
    </Stack>
  );
};

export default VaultsList;
