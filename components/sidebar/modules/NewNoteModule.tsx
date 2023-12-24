import { Icons } from "@/components/Icons";
import { useRouter } from "next/router";
import { FC } from "react";
import SidebarItem from "./SidebarItem";
import { useNotesInfo } from "@/lib/hooks/useNotesInfo";
import { useUiUpdate } from "@/lib/hooks/useUiUpdate";

const NewNoteModule: FC = () => {
  const router = useRouter();

  const { addNote, handleRedirect } = useNotesInfo();
  const { setToNotesListUpdate } = useUiUpdate();

  const handleClick = async () => {
    const newNote = await addNote();

    if (newNote != undefined) {
      const noteId = newNote.id;
      await handleRedirect(`/notes/${noteId}`);
      setToNotesListUpdate(true);
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
