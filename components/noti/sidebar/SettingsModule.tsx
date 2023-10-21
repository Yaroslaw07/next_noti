import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material"
import SidebarModuleWrapper from "./SidebarModuleWrapper";


const SettingsModule = () => {
    return (
      <SidebarModuleWrapper>
        <Icons.Settings size={20} />
        <Typography
          variant="subtitle1"
        >
          Settings
        </Typography>
      </SidebarModuleWrapper>
    );
}

export default SettingsModule;