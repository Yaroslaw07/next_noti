import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { Box, Input, InputClasses, Skeleton, TextField } from "@mui/material";

const customStyles: Partial<InputClasses> = {
  input: "fontSize: 80px",
};

const NoteTitle = () => {
  const { note, updateTitle } = useCurrentNote();

  if (note === undefined) {
    return <Skeleton height={"80px"}></Skeleton>;
  }

  return (
    <TextField
      variant="standard"
      InputLabelProps={{ shrink: true }}
      placeholder="Undefined"
      sx={{ input: { fontSize: "40px", fontWeight: "500" } }}
      InputProps={{ disableUnderline: true }}
      value={note.title}
      onChange={(e) => updateTitle(e.target.value)}
    />
  );
};

export default NoteTitle;
