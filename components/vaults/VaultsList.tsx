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
  const { openToast } = useToast();

  // if (isLoading)
  //   return (
  //     <Stack spacing={1.4}>
  //       <Skeleton variant="rounded" width="100%" height="55px" />
  //       <Skeleton variant="rounded" width="100%" height="55px" />
  //     </Stack>
  //   );

  if (vaults === null) {
    return <></>;
  }

  // if (vaults.length === 0) {
  //   return (
  //     <Box
  //       sx={{
  //         height: "100%",
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         marginX: "20%",
  //         gap: "0.5rem",
  //       }}
  //     >
  //       <Icons.noVaults
  //         sx={{
  //           fontSize: "5rem",
  //           color: "primary.main",
  //         }}
  //       />
  //       <Typography
  //         component="h1"
  //         variant="h5"
  //         sx={{ fontWeight: "600", fontSize: "1.8rem", textAlign: "center" }}
  //       >
  //         {"No vaults"}
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Stack spacing={1.4}>
      {vaults!.map((vault) => (
        <VaultsCard key={vault.id} vault={vault} />
      ))}
    </Stack>
  );
};

export default VaultsList;
