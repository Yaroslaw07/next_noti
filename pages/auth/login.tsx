import Head from "next/head";

import Link from "@/components/ui/Link";
import { useToast } from "@/lib/hooks/useToast";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/lib/hooks/useAuth";
import { LoginCredentials } from "@/types/auth";
import { NextPageWithLayout } from "../_app";
import FormLayout from "@/components/form/layouts/FormPageLayout";
import { Icons } from "@/components/Icons";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import HR from "@/components/ui/HR";
import AuthTitle from "@/components/auth/AuthTitle";

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
    ok && router.push("/vaults");
  };

  return (
    <>
      <Head>
        <title>Login to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
      <AuthTitle title="Log In" />
      <LoginForm handleSubmit={handleSubmit} />
      <Link
        href="/auth/signup"
        variant="subtitle1"
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
