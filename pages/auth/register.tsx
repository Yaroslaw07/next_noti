import { Icons } from "@/components/Icons";
import Link from "@/components/Link";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [username, setUsername] = useState("");
  const [vaultName, setVaultName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(session?.user?.id, username, vaultName);

    const result = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user?.id,
        username: username,
        vaultName: vaultName,
      }),
    });

    await update({
      ...session,
      user: { ...session?.user, isRegistered: true },
    });

    if (result.ok) {
      session?.user?.isRegistered
        ? router.push("/note")
        : router.push("register");
    } else {
      console.log();
    }
  };

  useEffect(() => {
    setUsername(session?.user?.name || "");
    setVaultName(session?.user?.name || "");
  }, [session]);

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  if (session?.user?.isRegistered) router.push("/note");

  return (
    <>
      <Head>
        <title>Register to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
      <Backdrop
        open={status === "loading"}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" size={80} />
      </Backdrop>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icons.Logo size={140} />
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontSize: "2rem", fontWeight: "600" }}
          >
            Finish registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your username"
              name="name"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="vault"
              label="Name of first vault"
              type="text"
              id="vault"
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Finish registration
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
  return (
    <>
      <Head>
        <title>Register to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
      <Backdrop
        open={status === "loading"}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="primary" size={80} />
      </Backdrop>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icons.Logo size={140} />
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontSize: "2rem", fontWeight: "600" }}
          >
            Finish registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your username"
              name="name"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="vault"
              label="Name of first vault"
              type="text"
              id="vault"
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Finish registration
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
