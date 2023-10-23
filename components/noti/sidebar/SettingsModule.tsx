import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material"
import SidebarModule from "./SidebarModule";


const SettingsModule = () => {
    return (
      <SidebarModule>
        <Icons.Settings size={20} />
        <Typography
          variant="subtitle1"
        >
          Settings
        </Typography>
      </SidebarModule>
    );
}

export default SettingsModule;