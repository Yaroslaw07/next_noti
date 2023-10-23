import { Box, Container, Typography } from "@mui/material";
import { Icons } from "../../Icons";
import useVaults from "@/hooks/useVaults";
import Sidebar from "./Sidebar";
import SidebarModule from "./SidebarModule";

const VaultModule = () => {

  const {currentVault} = useVaults();

  return (
    <SidebarModule>
      <Icons.Vault size={25} />
      <Typography
        variant="subtitle1"
        sx={{ fontSize: "1.1rem", paddingTop: "5px" }}
      >
        {currentVault?.name}
      </Typography>
    </SidebarModule>
  );
};

export default VaultModule;
