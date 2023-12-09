import { Icons } from "@/components/Icons";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import SignupForm from "@/components/auth/SignupForm";
import Backdrop from "@/components/ui/Backdrop";
import { useEffect, useState } from "react";
import { useToast } from "@/lib/hooks/useToast";
import { useAuth } from "@/lib/hooks/useAuth";
import { SignupCredentials } from "@/types/auth";
import Link from "@/components/ui/Link";

export default function SignUpPage() {
  const router = useRouter();

  const { signup, status } = useAuth();
  const { openToast } = useToast();

  const [displayBackdrop, setDisplayBackdrop] = useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisplayBackdrop(true);

    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    const { ok, message } = await signup({
      username,
      email,
      password,
    } as SignupCredentials);

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
        <title>Signup to Noti</title>
        <meta name="description" content="Signup page of Noti" />
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
            Signup to Noti
          </Typography>
          <SignupForm handleSubmit={handleSubmit} />
          <Link
            href="login"
            variant="body2"
            style={{ textAlign: "center", width: "100%" }}
          >
            {"Already have an account? Log In"}
          </Link>
        </Box>
      </Container>
    </>
  );
}
