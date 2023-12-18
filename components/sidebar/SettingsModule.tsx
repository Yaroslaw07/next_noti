import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material";
import SidebarWrapper from "./SidebarItemWrapper";

const SettingsModule = () => {
  return (
    <SidebarWrapper>
      <Icons.Settings size={20} />
      <Typography variant="subtitle1">Settings</Typography>
    </SidebarWrapper>
  );
};

export default SettingsModule;
