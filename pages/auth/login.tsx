import Head from "next/head";

import { Box, Container, Typography } from "@mui/material";
import { Icons } from "@/components/Icons";
import Link from "@/components/ui/Link";
import { useRouter } from "next/router";
import { useToast } from "@/lib/hooks/useToast";
import LoginForm from "@/components/auth/LoginForm";
import { useEffect, useState } from "react";
import Backdrop from "@/components/ui/Backdrop";
import { useAuth } from "@/lib/hooks/useAuth";
import { LoginCredentials } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();

  const { login, status } = useAuth();
  const { openToast } = useToast();

  const [displayBackdrop, setDisplayBackdrop] = useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisplayBackdrop(true);

    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    const { ok, message } = await login({
      email,
      password,
    } as LoginCredentials);

    if (!ok) {
      openToast(message, "error");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/vaults");
      openToast("Signed up successfully", "success");
    }

    if (status === "unauthenticated") {
      setDisplayBackdrop(false);
    }

    if (status === "loading") {
      setDisplayBackdrop(true);
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Login to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
      <Backdrop open={displayBackdrop} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginX: "1rem",
          }}
        >
          <Link href="../">
            <Icons.Logo sx={{ fontSize: "135px" }} />
          </Link>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontSize: "2.2rem",
              fontWeight: "600",
              marginTop: "0",
              textAlign: "center",
            }}
          >
            Login to Noti
          </Typography>
          <LoginForm handleSubmit={handleSubmit} />
          <Link
            href="/auth/signup"
            variant="body2"
            style={{ textAlign: "center", width: "100%" }}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Container>
    </>
  );
}
