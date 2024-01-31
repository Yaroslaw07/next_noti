import { getAccessToken } from "@/features/auth/accessToken";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import useVaultStore from "../../store/vaultStore";

interface VaultSocketLayoutProps {
  children: React.ReactNode;
}

export const VaultSocketLayout: FC<VaultSocketLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { initializeSocket, closeSocket } = useVaultStore();

  useEffect(() => {
    const initVaultSocket = async () => {
      const token = await getAccessToken();
      const socket = await initializeSocket(token);

      if (socket === undefined) {
        router.push("/vaults");
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
