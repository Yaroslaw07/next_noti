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
import AuthForm from "@/components/auth/authForm";
import { useEffect } from "react";

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

    if (!res?.ok) {
      console.log(res?.error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      session?.user?.isRegistered
        ? router.push("/note")
        : router.push("register");
    }
  }, [status]);

  const AnotherAuthLink = () => (
    <Link
      href="/auth/signup"
      variant="body2"
      style={{ textAlign: "center", width: "100%" }}
    >
      {"Don't have an account? Sign Up"}
    </Link>
  );

  return (
    <>
      <Head>
        <title>Login to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
      <Backdrop open={status === "loading"} />
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
          <AuthForm
            handleSubmit={handleSubmit}
            AnotherAuthLink={AnotherAuthLink}
          />
        </Box>
      </Container>
    </>
  );
}
