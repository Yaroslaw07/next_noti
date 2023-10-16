import Head from "next/head";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Icons } from "@/components/Icons";
import Link from "@/components/Link";
import { useRouter } from "next/router";
import { AuthenticationType } from "@/lib/auth/next-auth";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const authenticateType = AuthenticationType.LogIn;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      authenticateType,
    });

    if (res?.ok) {
      session?.user?.isRegistered
        ? router.push("/note")
        : router.push("register");
    } else {
      console.log(res?.error);
    }
  };

  if (status === "authenticated") {
    session?.user?.isRegistered ? router.push("/note") : router.push("register");
  }

  return (
    <>
      <Head>
        <title>Login to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
      <Backdrop open={status === "loading"} sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="primary" size={80}/>
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
            Log In to Noti
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Link
              href="signup"
              variant="body2"
              style={{ textAlign: "center", width: "100%" }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
