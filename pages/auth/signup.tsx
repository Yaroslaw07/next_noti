import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import SignupForm from "@/components/auth/SignupForm";
import { useToast } from "@/lib/hooks/useToast";
import { useAuth } from "@/lib/hooks/useAuth";
import { SignupCredentials } from "@/types/auth";
import Link from "@/components/ui/Link";
import { NextPageWithLayout } from "../_app";
import FormLayout from "@/components/form/layouts/FormPageLayout";

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
    ok && router.push("/auth/vault");
  };

  return (
    <>
      <Head>
        <title>Signup to Noti</title>
        <meta name="description" content="Signup page of Noti" />
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
      <SignupForm handleSubmit={handleSubmit} />
      <Link
        href="login"
        variant="body2"
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
