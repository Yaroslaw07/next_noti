import Link from "@/components/ui/Link";
import { Icons } from "@/components/Icons";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { AuthenticationType } from "@/lib/auth/next-auth";
import AuthForm from "@/components/auth/authForm";
import Backdrop from "@/components/ui/Backdrop";
import { useEffect } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

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

    await update({
      ...session,
      user: { ...session?.user, isRegistered: true },
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
      href="login"
      variant="body2"
      style={{ textAlign: "center", width: "100%" }}
    >
      {"Already have an account? Log In"}
    </Link>
  );

  return (
    <>
      <Head>
        <title>Signup to Noti</title>
        <meta name="description" content="Signup page of Noti" />
      </Head>
      <Backdrop open={status==="loading"}/>
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
          <AuthForm
            handleSubmit={handleSubmit}
            AnotherAuthLink={AnotherAuthLink}
          />
        </Box>
      </Container>
    </>
  );
}
