import { Icons } from "@/components/Icons";
import VaultsActions from "@/components/vaults/VaultsActions";
import VaultsList from "@/components/vaults/VaultsList";
import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { Vault } from "@/types/vault";
import { GetServerSidePropsContext } from "next";
import customFetch from "@/lib/api/fetch";
import NewVaultModal from "@/components/vaults/NewVaultModal";
import { FC, useState } from "react";

interface VaultsPageProps {
  vaults: Vault[] | null;
}

const VaultsPage: FC<VaultsPageProps> = ({ vaults }: VaultsPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Noti" />
      </Head>
      <NewVaultModal isOpen={isModalOpen} handleClose={handleModalClose} />
      <Container component="main" maxWidth="xs">
        <Stack
          spacing={1.5}
          justifyContent="space-between"
          alignContent="flex-start"
          sx={{
            height: "100dvh",
            margin: 0,
            marginX: "1rem",
          }}
        >
          <Box
            sx={{
              height: "12rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Icons.Logo sx={{ fontSize: "120px" }} />
            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                fontSize: { xs: "2rem", sm: "2.2rem" },
              }}
            >
              Your vaults
            </Typography>
          </Box>
          <Box
            alignSelf="flex-start"
            flexGrow={1}
            sx={{
              width: "100%",
              overflow: "auto",
            }}
          >
            <VaultsList vaults={vaults} />
          </Box>
          <VaultsActions handleNewVault={handleModalOpen} />
        </Stack>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await customFetch(context, "/vaults", {
    method: "GET",
  });

  return {
    props: {
      vaults: (await response?.json()) ?? null,
    },
  };
}

export default VaultsPage;
