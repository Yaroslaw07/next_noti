import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { Icons } from "@/components/Icons";
import { useVaults } from "@/features/vaults/hooks/useVaults";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import SidebarModule from "./SidebarModule";
import VaultModuleMenuItem from "./VaultModuleMenuItem";

const VaultSidebar = () => {
  const router = useRouter();

  const { logout } = useAuth();
  const { currentVault } = useVaults();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeVault = async () => {
    router.push("/vaults");
  };

  const handleLogout = async () => {
    // await saveCurrentNote();
    await logout();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SidebarModule
        onClick={handleClick}
        sx={{
          justifyContent: "space-between",
          ...(anchorEl && { backgroundColor: "additional.dark" }),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
        </Box>
        <Icons.ArrowDown sx={{ color: "text.secondary", fontSize: "24px" }} />
      </SidebarModule>
      <Menu
        id="basic-menu"
        autoFocus={false}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          marginLeft: "-10px",
          marginTop: "10px",
          background: "additional.main",
          paddingTop: "0px",
          "& .MuiMenu-paper": { backgroundColor: "additional.main" },
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          disablePadding: true,
        }}
      >
        <VaultModuleMenuItem onClick={handleChangeVault}>
          <Icons.ChangeVault
            sx={{ fontSize: "24px", color: "text.secondary" }}
          />
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "400",
              color: "text.secondary",
              marginTop: "2px",
            }}
          >
            Change vault
          </Typography>
        </VaultModuleMenuItem>
        <VaultModuleMenuItem onClick={handleLogout}>
          <Icons.Logout sx={{ fontSize: "24px", color: "text.secondary" }} />
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "400",
              color: "text.secondary",
              marginTop: "2px",
            }}
          >
            Logout
          </Typography>
        </VaultModuleMenuItem>
      </Menu>
    </>
  );
};

export default VaultSidebar;
