import { setAll } from "@/lib/reducers/vaults";
import { RootState } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const fetchUserVaults = async () => {
  try {
    const response = await fetch("/api/vaults/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user vaults" + error);
  }
};

const useVaults = () => {
  const dispatch = useDispatch();

  const { vaults, currentVault, currentUserId } = useSelector(
    (state: RootState) => state.vault
  );

  const { data, status } = useSession();
  const userId = data?.user.id;

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (
      status == "authenticated" &&
      (currentUserId !== userId || currentVault === null) &&
      !dataFetched
    ) {
      const fetchVaults = async () => {
        try {
          const payload = await fetchUserVaults();

          if (payload !== null) {
            dispatch(setAll(payload));
          }
        } catch (error) {
          throw error;
        }
      };

      fetchVaults();
      setDataFetched(true);
    }
  },[status, dataFetched, currentUserId, userId, currentVault, dispatch]);

  return { vaults, currentVault, currentUserId };
};

export default useVaults;
