import { FC, useEffect } from "react";
import { useSocketStore } from "./socketStore";
import { useToast } from "@/lib/hooks/useToast";

interface SocketLayout {
  children: React.ReactNode;
}

export const SocketLayout: FC<SocketLayout> = ({ children }) => {
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
  <SocketLayout>{page}</SocketLayout>
);
