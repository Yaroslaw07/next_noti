import { Backdrop, Box, Container, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Icons } from "../../Icons";
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginX: "1rem",
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
};

export default FormLayout;
