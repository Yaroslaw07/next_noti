import { getVaults as thunkGetVaults } from "@/lib/reducers/vaults";
import { AppDispatch, RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useVaults = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { vaults } = useSelector((state: RootState) => state.vaults);

  const getVaults = () => {
    setIsLoaded(false);
    dispatch(thunkGetVaults());
    setIsLoaded(true);
  };

  return { vaults, isLoaded, getVaults };
};

export default useVaults;
