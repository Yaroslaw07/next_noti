import Link from "@/components/Link";
import { Icons } from "@/components/Icons";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { sign } from "crypto";
import { signIn } from "next-auth/react";
import { AuthenticationType } from "@/lib/auth/next-auth";

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const authenticateType = AuthenticationType.SignUp;


    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      authenticateType,
    });

    if (res!.ok) {
      router.push("/note");
    } else {
      console.log(res?.error);
    }    
  };

  return (
    <>
      <Head>
        <title>Signup to Noti</title>
        <meta name="description" content="Signup page of Noti" />
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
            Sign Up to Noti
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
              Sign Up
            </Button>
            <Link
              href="login"
              variant="body2"
              style={{ textAlign: "center", width: "100%" }}
            >
              {"Already have an account? Log In"}
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
