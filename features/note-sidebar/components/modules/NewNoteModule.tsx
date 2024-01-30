import { Icons } from "@/components/Icons";
import { FC } from "react";
import SidebarItem from "./SidebarItem";
import { useNotesInfo } from "../../hooks/useNotesInfo";
import { useToast } from "@/hooks/useToast";

const NewNoteModule: FC = () => {
  const { addNote } = useNotesInfo();
  const { openToast } = useToast();

  const handleClick = async () => {
    const { ok, data } = await addNote();

    if (!ok) {
      openToast(data.message, "error");
    }
  };

  return (
    <SidebarItem
      onClick={handleClick}
      Icon={Icons.newNote}
      title={"New Note"}
    ></SidebarItem>
  );
};

export default NewNoteModule;
