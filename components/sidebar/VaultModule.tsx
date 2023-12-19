import { Menu, MenuItem, Typography } from "@mui/material";
import { Icons } from "../Icons";
import { useVaults } from "@/lib/hooks/useVaults";
import SidebarWrapper from "./SidebarItem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

const VaultSidebar = () => {
  const router = useRouter();

  const { logout } = useAuth();
  const { currentVault } = useVaults();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeVault = () => {
    router.push("/vaults");
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SidebarWrapper
        onClick={handleClick}
        Icon={Icons.Vault}
        title={currentVault?.name!}
      ></SidebarWrapper>
      <Typography variant="subtitle1" sx={{ fontSize: "1.4rem" }}></Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ marginLeft: "-6px", marginTop: "10px", paddingY: "-15px" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={{
            width: "180px",
            display: "flex",
            gap: "8px",
            paddingX: "4px",
            paddingY: "0px",
          }}
          onClick={handleChangeVault}
        >
          <Icons.Logout />
          <Typography variant="subtitle1" sx={{ fontSize: "1rem" }}>
            Change vault
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{
            width: "180px",
            display: "flex",
            gap: "8px",
            paddingX: "4px",
            paddingY: "0px",
          }}
          onClick={handleLogout}
        >
          <Icons.Logout />
          <Typography variant="subtitle1" sx={{ fontSize: "1rem" }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default VaultSidebar;
