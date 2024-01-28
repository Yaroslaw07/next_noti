import { Vault } from "@/types/vault";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useToast } from "@/lib/hooks/useToast";
import { GetServerSidePropsContext } from "next";
import VaultsCard from "./VaultsCard";

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
