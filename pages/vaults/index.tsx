import { Icons } from "@/components/Icons";
import VaultsActions from "@/components/vaults/VaultsActions";
import VaultsList from "@/components/vaults/VaultsList";
import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { NextPageWithLayout } from "../_app";
import ProtectedRoute from "@/components/ProtectedRoute";

const VaultsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Noti" />
      </Head>
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
                fontWeight: "600",
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
            <VaultsList />
          </Box>
          <VaultsActions />
        </Stack>
      </Container>
    </>
  );
};

VaultsPage.getLayout = (page) => {
  return <ProtectedRoute>{page}</ProtectedRoute>;
};

export default VaultsPage;
