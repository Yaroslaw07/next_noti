import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { InputClasses, Skeleton, TextField } from "@mui/material";

const NoteTitle = () => {
  const { note, updateTitle } = useCurrentNote();

  return (
    <TextField
      variant="standard"
      placeholder="Undefined"
      sx={{ input: { fontSize: "40px", fontWeight: "500", height: "70px" } }}
      InputProps={{ disableUnderline: true }}
      value={note?.title || ""}
      spellCheck={false}
      onChange={(e) => updateTitle(e.target.value)}
    />
  );
};

export default NoteTitle;
