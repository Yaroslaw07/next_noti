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
                // Simulate fetching vaults from an API (replace with actual API calls)
                const userVaults = await fetchUserVaults(userId); // Implement this function

                if (userVaults.length > 0) {
                  // Save the fetched vaults to Redux
                  dispatch(setVaults(userVaults));
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