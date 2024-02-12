import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useSocketStore } from "@/lib/socketStore";
import { useToast } from "@/lib/hooks/useToast";

interface VaultSocketLayoutProps {
  children: React.ReactNode;
}

export const VaultSocketLayout: FC<VaultSocketLayoutProps> = ({ children }) => {
  const { initializeSocket, closeSocket } = useSocketStore();
  const { openToast } = useToast();

  useEffect(() => {
    const initVaultSocket = async () => {
      const socket = await initializeSocket();

      if (socket === undefined) {
        openToast("Unable to connect to server", "error");
        return;
      }
    };

    initVaultSocket();

    return () => {
      closeSocket();
    };
  }, []);

  return <>{children}</>;
};

export const getVaultSocketLayout = (page: any) => (
  <VaultSocketLayout>{page}</VaultSocketLayout>
);
