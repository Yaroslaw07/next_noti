import { fetchVaultData, setLoading } from "@/lib/reducers/vaults";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useVaults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {vaults,currentVault,currentUserId, isLoading} = useSelector((state: RootState) => state.vault);

  useEffect(() => {
    dispatch(fetchVaultData());
  }, [dispatch]);

  return { vaults, currentVault, currentUserId, isLoading };
};

export default useVaults;
