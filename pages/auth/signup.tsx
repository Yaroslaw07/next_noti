import Head from "next/head";
import { useRouter } from "next/router";

import SignupForm from "@/features/auth/components/SignupForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SignupCredentials } from "@/features/auth/types/authTypes";
import Link from "@/components/ui/Link";
import { NextPageWithLayout } from "../_app";
import AuthPageFormLayout from "@/features/auth/components/AuthPageLayout";
import AuthTitle from "@/features/auth/components/AuthTitle";
import { useToast } from "@/hooks/useToast";

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
  <AuthPageFormLayout>{page}</AuthPageFormLayout>
);

export default SignUpPage;
