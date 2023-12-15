import { useAuth } from "@/lib/hooks/useAuth";
import { Backdrop } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status]);

  return (
    <>
      <Backdrop open={status === "loading"} />
      {children}
    </>
  );
};

export default ProtectedRoute;
