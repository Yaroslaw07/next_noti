import { Box, Container, Typography } from "@mui/material";
import { Icons } from "../../Icons";
import useVaults from "@/hooks/useVaults";
import Sidebar from "./Sidebar";
import SidebarModuleWrapper from "./SidebarModuleWrapper";

const VaultModule = () => {

  const {currentVault} = useVaults();

  return (
    <SidebarModuleWrapper>
      <Icons.Vault size={25} />
      <Typography
        variant="subtitle1"
        sx={{ fontSize: "1.1rem", paddingTop: "5px" }}
      >
        {currentVault?.name}
      </Typography>
    </SidebarModuleWrapper>
  );
};

export default VaultModule;
