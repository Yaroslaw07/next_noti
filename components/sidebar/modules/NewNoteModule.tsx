import { Icons } from "@/components/Icons";
import { useVaults } from "@/lib/hooks/useVaults";
import { useRouter } from "next/router";
import { FC } from "react";
import { useUiUpdate } from "@/lib/hooks/useUiUpdate";
import SidebarItem from "./SidebarItem";
import { useNotesInfo } from "@/lib/hooks/useNotesInfo";

const NewNoteModule: FC = () => {
  const router = useRouter();

  const { addNote } = useNotesInfo();

  const { setToNotesListUpdate } = useUiUpdate();

  const handleClick = async () => {
    const newNote = await addNote();

    if (newNote != undefined) {
      const noteId = newNote.id;
      setToNotesListUpdate(true);
      router.push(`/notes/${noteId}`);
    } else {
      console.log("error");
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
