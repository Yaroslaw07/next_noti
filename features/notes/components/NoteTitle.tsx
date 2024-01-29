import { TextField } from "@mui/material";
import useNoteStore from "../store/notesStore";

const NoteTitle = () => {
  const { currentNoteTitle, setCurrentNoteTitle } = useNoteStore();

  return (
    <TextField
      variant="standard"
      placeholder="Undefined"
      sx={{ input: { fontSize: "40px", fontWeight: "500", height: "70px" } }}
      InputProps={{ disableUnderline: true }}
      value={currentNoteTitle || ""}
      spellCheck={false}
      onChange={(e) => setCurrentNoteTitle(e.target.value)}
    />
  );
};

export default NoteTitle;
