import Head from "next/head";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Icons } from "@/components/Icons";
import Link from "@/components/Link";
import { useRouter } from "next/router";


export default function LoginPage() {

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch("/api/auth/login", options);

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("jwt-token", data.token);

      data.isRegistered ? router.push("/noti") :
      router.push("/auth/register");
    } else {
      console.error(response.statusText);
    }
  };


  return (
    <>
      <Head>
        <title>Login to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
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
