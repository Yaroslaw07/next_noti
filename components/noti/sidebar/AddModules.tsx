
import { Icons } from "@/components/Icons";
import { Typography } from "@mui/material";
import SidebarModuleWrapper from "./SidebarModuleWrapper";

const AddModule = () => {
  return (
<SidebarModuleWrapper>
      <Icons.NewNote size={20} />
      <Typography
        variant="subtitle1"
      >
        New Note
      </Typography>
    </SidebarModuleWrapper>
  );
};

export default AddModule;