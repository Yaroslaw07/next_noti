import { Icons } from "@/components/Icons";
import { FC } from "react";
import SidebarItem from "./base/SidebarItem";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/router";
import { useNotesInfo } from "@/features/note-infos/hooks/useNotesInfo";

const NewNoteModule: FC = () => {
  const router = useRouter();

  const { addNewNote } = useNotesInfo();
  const { openToast } = useToast();

  const handleClick = async () => {
    const response = await addNewNote();

    if (response.ok) {
      router.push(`/notes/${response.data.id}`);
    } else {
      openToast("Failed to create a new note", "error");
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
