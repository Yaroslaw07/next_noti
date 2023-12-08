import { Icons } from "@/components/Icons";
import Backdrop from "@/components/ui/Backdrop";
import HR from "@/components/ui/HR";
import VaultsList from "@/components/vaults/vaultsList";
import { useAuth } from "@/lib/hooks/useAuth";
import useVaults from "@/lib/hooks/useVaults";
import { refreshTokens } from "@/lib/reducers/auth";
import store from "@/lib/store";
import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VaultsPage() {
  const router = useRouter();

  const { status } = useAuth();
  const { vaults, getVaults } = useVaults();

  useEffect(() => {
    if (status === "authenticated") {
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
      <Backdrop open={status === "loading"} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            height: "100%",
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

          <Box sx={{ height: "12px" }}></Box>
          {vaults === null ? (
            <Skeleton />
          ) : (
            <Box
              sx={{
                height: "45vh",
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
                <VaultsList vaults={vaults} />
              )}
            </Box>
          )}

          <Box sx={{ height: "12px" }}></Box>
          <HR />
          <Grid container spacing={1} sx={{ marginTop: "6px", width: "98%" }}>
            <Grid item xs>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<Icons.Plus />}
                sx={{
                  flex: "1",
                  fontSize: "1.1rem",
                  height: "45px",
                  lineHeight: "1.05",
                }}
              >
                New Vault
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{
                  height: "45px",
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              >
                <Icons.Logout />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
