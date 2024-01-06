import { MenuItem } from "@mui/material";
import { FC } from "react";
import SidebarModule from "../SidebarModule";

interface VaultModuleMenuItemProps {
  children: React.ReactNode;
  onClick?: (event?: any) => void;
}

const VaultModuleMenuItem: FC<VaultModuleMenuItemProps> = ({
  children,
  onClick,
}) => {
  return (
    <MenuItem
      sx={{
        width: "190px",
        paddingX: "0px",
        paddingY: "0px",
      }}
      onClick={onClick}
    >
      <SidebarModule sx={{ paddingLeft: "12px", gap: "8px" }}>
        {children}
      </SidebarModule>
    </MenuItem>
  );
};

export default VaultModuleMenuItem;
