import { Box, Button, Grid } from "@mui/material";
import HR from "../ui/HR";
import { Icons } from "../Icons";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";

const VaultsActions = () => {
  const router = useRouter();

  const handleNewVault = () => {
    router.push("/vaults/new");
  };

  const { logout } = useAuth();

  return (
    <Box sx={{ width: "100%", height: "8rem", alignSelf: "flex-end" }}>
      <HR />
      <Grid container spacing={1} sx={{ marginTop: "6px", width: "102%" }}>
        <Grid item xs>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<Icons.Plus />}
            sx={{
              flex: "1",
              fontSize: "1.1rem",
              height: "45px",
              lineHeight: "1.05",
            }}
            onClick={handleNewVault}
          >
            New Vault
          </Button>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{
              height: "45px",
              borderColor: "primary.main",
            }}
            onClick={logout}
          >
            <Icons.Logout />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VaultsActions;
