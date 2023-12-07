import { Icons } from "@/components/Icons";
import Backdrop from "@/components/ui/Backdrop";
import { useAuth } from "@/lib/hooks/useAuth";
import useVaults from "@/lib/hooks/useVaults";
import { refreshTokens } from "@/lib/reducers/auth";
import store from "@/lib/store";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VaultsPage() {
  const router = useRouter();

  const { status } = useAuth();
  const { vaults, isLoaded, getVaults } = useVaults();

  useEffect(() => {
    if (status === "authenticated") {
      getVaults();
      getVaults();
    }
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status]);

  const refresh = async () => {
    store.dispatch(refreshTokens());
  };

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Noti" />
      </Head>
      <Backdrop open={status === "loading" || !isLoaded} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginX: "1rem",
          }}
        >
          <Icons.Logo sx={{ fontSize: "120px" }} />
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: { xs: "2.25rem", sm: "3rem" },
            }}
          >
            Your vaults
          </Typography>

          <Box
            sx={{
              height: "50vh",
              width: "100%",
              borderColor: "red",
              borderWidth: "2px",
            }}
          >
            {vaults.length === 0 ? (
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "600" }}
              >
                {"You don't have any vaults yet"}
              </Typography>
            ) : (
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "600" }}
                textAlign={"center"}
              >
                You have {vaults.length} vaults
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
