import { getVaults as thunkGetVaults } from "@/lib/reducers/vaults";
import { AppDispatch, RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useVaults = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { vaults } = useSelector((state: RootState) => state.vaults);

  const getVaults = () => {
    dispatch(thunkGetVaults());
  };

  return { vaults, getVaults };
};

export default useVaults;
