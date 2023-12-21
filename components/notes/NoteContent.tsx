import useCurrentNote from "@/lib/hooks/useCurrentNote";
import TextArea from "../ui/TextArea";

const NoteContent = () => {
  const { note, updateContent } = useCurrentNote();

  return <TextArea value={note?.content!} onChange={updateContent}></TextArea>;
};

export default NoteContent;
