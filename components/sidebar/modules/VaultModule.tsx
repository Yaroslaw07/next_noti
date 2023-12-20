import { Menu, MenuItem, Typography } from "@mui/material";
import { Icons } from "../../Icons";
import { useVaults } from "@/lib/hooks/useVaults";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import SidebarModule from "../SidebarModule";
import SidebarItem from "./SidebarItem";

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
      <SidebarModule onClick={handleClick}>
        <Icons.Vault sx={{ fontSize: "30px", color: "text.secondary" }} />
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "text.secondary",
            marginTop: "2px",
          }}
        >
          {currentVault?.name}
        </Typography>
      </SidebarModule>
      <Menu
        id="basic-menu"
        autoFocus={false}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          marginLeft: "-10px",
          marginTop: "8px",
          background: "additional.main",
          paddingTop: "0px",
          "& .MuiMenu-paper": { backgroundColor: "additional.main" },
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          disablePadding: true,
        }}
      >
        <MenuItem
          sx={{
            maxWidth: "190px",
            paddingX: "0px",
            paddingY: "0px",
          }}
          onClick={handleChangeVault}
        >
          <SidebarItem
            sx={{ paddingLeft: "6px" }}
            Icon={Icons.ChangeVault}
            title={"Change vault"}
          />
        </MenuItem>
        <MenuItem
          sx={{
            width: "190px",
            paddingX: "0px",
            paddingY: "0px",
          }}
          onClick={handleLogout}
        >
          <SidebarItem
            sx={{ paddingLeft: "8px", gap: "10px" }}
            Icon={Icons.Logout}
            title={"Logout"}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default VaultSidebar;
