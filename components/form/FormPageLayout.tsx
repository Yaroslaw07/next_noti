import { Backdrop, Box, Container, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Icons } from "../Icons";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";

interface FormLayoutProps {
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
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

export default FormLayout;
