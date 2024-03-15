import { Icons } from "@/components/Icons";
import SidebarItem from "../base/SidebarItem";
import { useState } from "react";
import VaultSettingsModal from "@/features/vaults/components/modals/VaultSettingsModal";
import { useCurrentVault } from "@/features/current-vault/hooks/useCurrentVault";

const SettingsModule = () => {
  const [open, setOpen] = useState(false);

  const handleSettingClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { currentVault } = useCurrentVault();

  return (
    <>
      <VaultSettingsModal
        isOpen={open}
        handleClose={handleClose}
        vault={currentVault!}
      />
      <SidebarItem
        Icon={Icons.Settings}
        title={"Settings"}
        onClick={handleSettingClick}
      ></SidebarItem>
    </>
  );
};

export default SettingsModule;
