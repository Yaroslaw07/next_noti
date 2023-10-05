import { Icons } from "@/components/Icons";
import Link from "@/components/Link";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Head from "next/head";

export default function RegisterPage() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("submitting registration");
    };

    return (
      <>
        <Head>
          <title>Register to Noti</title>
          <meta name="description" content="Login page of Noti" />
        </Head>
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
              Finish registration
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Your username"
                name="name"
                
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Name of first vault"
                type="text"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Finish registration
              </Button>
            </Box>
          </Box>
        </Container>
      </>
    );
}