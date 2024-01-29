import { Icons } from "@/components/Icons";
import VaultsActions from "@/features/vaults/components/VaultsActions";
import VaultsList from "@/features/vaults/components/VaultsList";
import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import fetchCall from "@/lib/api/fetch";
import { FC, useState } from "react";
import { Vault } from "@/features/vaults/types/vaultsTypes";
import NewVaultModal from "@/features/vaults/components/NewVaultModal";
import { useRouter } from "next/router";
import { useToast } from "@/lib/hooks/useToast";

interface VaultsPageProps {
  vaults: Vault[] | null;
}

const VaultsPage: FC<VaultsPageProps> = ({ vaults }: VaultsPageProps) => {
  const router = useRouter();

  const { openToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  if (vaults === null) {
    openToast("Can't load vaults, try again later", "error");
    router.push("/login");
  }

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
  const response = await fetchCall(context, "/vaults", {
    method: "GET",
  });

  return {
    props: {
      vaults: (await response?.json()) ?? null,
    },
  };
}

export default VaultsPage;
