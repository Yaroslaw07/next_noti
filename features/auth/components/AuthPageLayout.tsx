import { Box, Container } from "@mui/material";

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

const AuthPageFormLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            height: "100dvh",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginX: { xs: "1rem", sm: "1.5rem" },
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
};

export default AuthPageFormLayout;
