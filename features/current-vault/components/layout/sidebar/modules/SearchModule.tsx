import { Icons } from "@/components/Icons";
import SidebarItem from "../base/SidebarItem";
import { useState } from "react";
import SearchModal from "../../../search/SearchModal";

const SearchModule = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SidebarItem
        onClick={handleOpen}
        Icon={Icons.Search}
        title={"Search"}
      ></SidebarItem>
      <SearchModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default SearchModule;
