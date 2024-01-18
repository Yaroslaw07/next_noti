import useCurrentNote from "@/lib/hooks/useCurrentNote";
import TextBlock from "../note-blocks/TextBlock";

const NoteContent = () => {
  const { note, updateContent } = useCurrentNote();

  const handleOnChange = (id: string, props: any) => {
    updateContent(id, props);
  };

  return (
    <>
      {note?.blocks &&
        note.blocks
          .sort((block) => block.order)
          .map((block) => {
            const updateBlocks = (text: string) => {
              handleOnChange(block.id, { ...block.props, text });
            };

            return (
              <TextBlock
                key={block.id}
                props={block.props}
                onChange={updateBlocks}
              ></TextBlock>
            );
          })}
    </>
  );
};

export default NoteContent;
