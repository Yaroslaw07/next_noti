import { Stack } from "@mui/material";
import SettingsModule from "./SettingsModule";
import NewNoteModule from "./NewNoteModule";
import SidebarItem from "./base/SidebarItem";
import { Icons } from "@/components/Icons";

const SidebarModules = () => {
  return (
    <Stack spacing={0} sx={{ width: "100%", paddingY: "0.1rem" }}>
      <SidebarItem Icon={Icons.Search} title={"Search"} />
      <SettingsModule />
      <NewNoteModule />
    </Stack>
  );
};

export default SidebarModules;
