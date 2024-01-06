import { Icons } from "@/components/Icons";
import { FC } from "react";
import SidebarItem from "./SidebarItem";
import { useNotesInfo } from "@/lib/hooks/useNotesInfo";

const NewNoteModule: FC = () => {
  const { addNote, handleRedirect } = useNotesInfo();

  const handleClick = async () => {
    const newNote = await addNote();

    if (newNote !== undefined) {
      await handleRedirect(`/notes/${newNote.id}`);
    } else {
      console.log("Adding new note ended unsuccessfully");
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
