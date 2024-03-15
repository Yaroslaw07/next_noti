import { Stack } from "@mui/material";
import SettingsModule from "./SettingsModule";
import NewNoteModule from "./NewNoteModule";
import SearchModule from "./SearchModule";

const SidebarModules = () => {
  return (
    <Stack spacing={0} sx={{ width: "100%", paddingY: "0.1rem" }}>
      <SearchModule />
      <SettingsModule />
      <NewNoteModule />
    </Stack>
  );
};

export default SidebarModules;
