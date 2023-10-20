import { setVaults } from "@/lib/reducers/vaults";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const fetchUserVaults = async (userId:string) => {
  try {
    const response = await fetch("/api/vaults", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user vaults.");
  }
};


const useVaults = (userId: string) => {
    const dispatch = useDispatch();
    const {vaults,currentVault,currentUserId} = useSelector((state: RootState) => state.vault);

    useEffect(() => {
        if (vaults.length === 0 || currentUserId !== userId || currentVault !== null) {
            
            const fetchVaults = async () => {
              try {
                const payload = await fetchUserVaults(userId);

                if (payload !== null) {
                  dispatch(setVaults(payload));
                }
              } catch (error) {
                throw new Error("Failed to fetch user vaults.");
              }
            };

            fetchVaults();

        }
    }, [dispatch, vaults, currentVault, currentUserId, userId]);

    return vaults;
}

export default useVaults;