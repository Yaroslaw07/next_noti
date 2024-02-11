import Head from "next/head";
import { useRouter } from "next/router";

import Link from "@/components/ui/Link";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginCredentials } from "@/features/auth/types/authTypes";
import { NextPageWithLayout } from "../_app";
import AuthPageFormLayout from "@/features/auth/components/AuthPageLayout";
import AuthLayoutTitle from "@/features/auth/components/AuthLayoutTitle";
import { useToast } from "@/hooks/useToast";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { login } = useAuth();
  const { openToast } = useToast();

  const handleSubmit = async (data: LoginCredentials) => {
    const { ok, message } = await login(data);

    openToast(message, ok ? "success" : "error");
    ok && router.push("/vaults");
  };

  return (
    <>
      <Head>
        <title>Login to Noti</title>
        <meta name="description" content="Login page of Noti" />
      </Head>
      <AuthLayoutTitle title="Log In" />
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
  <AuthPageFormLayout>{page}</AuthPageFormLayout>
);

export default LoginPage;
