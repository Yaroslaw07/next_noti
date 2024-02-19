import { Icons } from "@/components/Icons";
import SidebarItem from "./base/SidebarItem";
import { useToast } from "@/lib/hooks/useToast";

const SettingsModule = () => {
  const { openToast } = useToast();

  const handleSettingClick = () => {
    openToast("Setting are not implemented now. Wait for update", "info");
  };

  return (
    <SidebarItem
      Icon={Icons.Settings}
      title={"Settings"}
      onClick={handleSettingClick}
    />
  );
};

export default SettingsModule;
