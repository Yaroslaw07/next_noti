import { Stack } from "@mui/material";
import SettingsModule from "./SettingsModule";
import NewNoteModule from "./NewNoteModule";
import SidebarItem from "./base/SidebarItem";
import { Icons } from "@/components/Icons";
import { useToast } from "@/lib/hooks/useToast";

const SidebarModules = () => {
  const { openToast } = useToast();

  const handleSearchClick = () => {
    openToast("Search are not implemented now. Wait for update", "info");
  };

  return (
    <Stack spacing={0} sx={{ width: "100%", paddingY: "0.1rem" }}>
      <SidebarItem
        Icon={Icons.Search}
        title={"Search"}
        onClick={handleSearchClick}
      />
      <SettingsModule />
      <NewNoteModule />
    </Stack>
  );
};

export default SidebarModules;
