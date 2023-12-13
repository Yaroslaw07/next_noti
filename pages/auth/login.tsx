import Head from "next/head";

import Link from "@/components/ui/Link";
import { useToast } from "@/lib/hooks/useToast";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/lib/hooks/useAuth";
import { LoginCredentials } from "@/types/auth";
import { NextPageWithLayout } from "../_app";
import FormLayout from "@/components/form/layouts/FormPageLayout";
import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { login } = useAuth();
  const { openToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    const { ok, message } = await login({
      email,
      password,
    } as LoginCredentials);

    openToast(message, ok ? "success" : "error");
    ok && router.push("/auth/vault");
  };

  return (
    <>
      <Head>
        <title>Login to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
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
    </>
  );
};

LoginPage.getLayout = (page: React.ReactNode) => (
  <FormLayout>{page}</FormLayout>
);

export default LoginPage;
