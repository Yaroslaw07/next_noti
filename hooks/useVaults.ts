import { fetchVaultData, setVautls } from "@/lib/reducers/vaults";
import { AppDispatch, RootState } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useVaults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {vaults,currentVault,currentUserId} = useSelector((state: RootState) => state.vault);

  useEffect(() => {
    dispatch(fetchVaultData());
  }, [dispatch]);

  return { vaults, currentVault, currentUserId };
};

export default useVaults;
