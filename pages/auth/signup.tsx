import { Icons } from "@/components/Icons";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import SignupForm from "@/components/auth/SignupForm";
import { useToast } from "@/lib/hooks/useToast";
import { useAuth } from "@/lib/hooks/useAuth";
import { SignupCredentials } from "@/types/auth";
import Link from "@/components/ui/Link";
import { NextPageWithLayout } from "../_app";
import FormLayout from "@/components/form/FormPageLayout";
import AuthTitle from "@/components/auth/AuthTitle";

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { signup } = useAuth();
  const { openToast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    const { ok, message } = await signup({
      username,
      email,
      password,
    } as SignupCredentials);

    openToast(message, ok ? "success" : "error");
    ok && router.push("/vaults");
  };

  return (
    <>
      <Head>
        <title>Signup to Noti</title>
        <meta name="description" content="Signup page of Noti" />
      </Head>
      <AuthTitle title="Sign up" />
      <SignupForm handleSubmit={handleSubmit} />
      <Link
        href="login"
        variant="subtitle1"
        style={{ textAlign: "center", width: "100%" }}
      >
        {"Already have an account? Log In"}
      </Link>
    </>
  );
};

SignUpPage.getLayout = (page: React.ReactNode) => (
  <FormLayout>{page}</FormLayout>
);

export default SignUpPage;
