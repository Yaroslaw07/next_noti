import {
  setActiveVault,
  getVaults as thunkGetVaults,
} from "@/lib/reducers/vaults";
import { AppDispatch, RootState } from "@/lib/store";
import { Vault } from "@/types/vault";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useVaults = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { vaults, isLoaded } = useSelector((state: RootState) => state.vaults);

  const getVaults = () => {
    if (isLoaded) return;
    dispatch(thunkGetVaults());
  };

  const setCurrentVault = (vault: Vault) => {
    dispatch(setActiveVault(vault));
  };

  return { vaults, getVaults, setVault: setCurrentVault };
};

export default useVaults;
