import Head from "next/head";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Icons } from "@/components/Icons";
import Link from "@/components/ui/Link";

const welcomeButtonStyle = {
  fontSize: { xs: "1.25rem", sm: "1.5rem" },
  padding: "0.5rem 1.25rem",
  textTransform: "none",
  border: "2px solid",
  borderColor: "primary.main",
};

export default function WelcomePage() {
  return (
    <>
      <Head>
        <title>Noti</title>
        <meta name="description" content="Welcome page of Noti" />
      </Head>
      <Container>
        <Stack
          spacing={0}
          minHeight={"100vh"}
          alignItems="center"
          justifyContent="center"
          textAlign={"center"}
        >
          <Icons.Logo sx={{ fontSize: { xs: "160px", md: "180px" } }} />
          <Typography
            variant="h1"
            sx={{
              lineHeight: "1",
              fontWeight: "900",
              fontSize: { xs: "3.5rem", sm: "6rem", md: "7rem" },
            }}
          >
            Welcome to Noti
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "2rem", md: "2,25rem" },
              lineHeight: "2.5rem",
              fontWeight: "500",
            }}
          >
            {"Let's create some notes"}
          </Typography>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ marginTop: "1rem" }}
            justifyContent="center"
          >
            <Link href={"auth/login"}>
              <Button
                variant="contained"
                color="primary"
                component="button"
                sx={welcomeButtonStyle}
              >
                Log In
              </Button>
            </Link>
            <Link href={"auth/signup"}>
              <Button
                variant="contained"
                color="secondary"
                component="button"
                sx={welcomeButtonStyle}
              >
                Sign Up
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
