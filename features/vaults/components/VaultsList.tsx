import { Stack } from "@mui/material";
import { FC } from "react";
import VaultsCard from "./VaultsCard";
import { Vault } from "../types/vaultTypes";
interface VaultsListProps {
  vaults: Vault[] | null;
}

const VaultsList: FC<VaultsListProps> = ({ vaults }) => {
  if (vaults === null) {
    return <></>;
  }

  return (
    <Stack spacing={1.4}>
      {vaults!.map((vault) => (
        <VaultsCard key={vault.id} vault={vault} />
      ))}
    </Stack>
  );
};

export default VaultsList;
