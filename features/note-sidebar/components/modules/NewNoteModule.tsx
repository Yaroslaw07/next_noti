import { Icons } from "@/components/Icons";
import { FC } from "react";
import SidebarItem from "./SidebarItem";
import { useNotesInfo } from "../../hooks/useNotesInfo";
import { useRouter } from "next/router";
import { useToast } from "@/lib/hooks/useToast";

const NewNoteModule: FC = () => {
  const router = useRouter();

  const { addNote } = useNotesInfo();
  const { openToast } = useToast();

  const handleClick = async () => {
    const { ok, data } = await addNote();

    if (ok) {
      router.push(`/notes/${data.id}`);
    } else {
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
