import { useEffect, useState } from "react";
import { authApi } from "../api";
import { Vault } from "@/types/vault";

const useVaults = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authApi.get<Vault[]>("/vaults");
        setVaults(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { vaults, isLoading, isError };
};

export default useVaults;
