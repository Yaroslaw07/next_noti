import { Menu, MenuItem, Typography } from "@mui/material";
import { Icons } from "../Icons";
import useVaults from "@/lib/hooks/useVaults";
import SidebarModule from "./SidebarModule";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const VaultModule = () => {
  const { currentVault } = useVaults();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <SidebarModule onClick={handleClick}>
        <Icons.Vault size={25} />
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "1.2rem", paddingTop: "5px" }}
        >
          {currentVault?.name}
        </Typography>
      </SidebarModule>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleLogout}
        sx={{ marginLeft: "-6px",marginTop:"10px", paddingY: "-15px" }}
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
          onClick={handleLogout}
        >
          <Icons.Logout size={25} />
          <Typography variant="subtitle1" sx={{ fontSize: "1rem" }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default VaultModule;
