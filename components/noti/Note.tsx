import { Box, Container, Input, Stack, Typography } from "@mui/material";
import TextArea from "../ui/TextArea";
import useCurrentNote from "@/hooks/useCurrentNote";
import { useEffect, useState } from "react";
import Backdrop from "../ui/Backdrop";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { updateTitle } from "@/lib/reducers/currentNote";

const Note = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { note, status } = useCurrentNote();
  const [title, setTitle] = useState(note?.title || "");

  useEffect(() => {
    setTitle(note?.title! || "");
  }, [note]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle({title: event.target.value}));
    console.log(title);
  }

  if (status === "loading" && title!=="" ) return <Backdrop open={true} />;

  return (
    <Box sx={{ paddingX: "80px" }}>
      <Container
        component="main"
        maxWidth="md"
        sx={{ height: "90%", marginX: "auto" }}
      >
        <Box sx={{ height: "80px" }}></Box>
        <Input
          sx={{ fontWeight: "600", marginBottom: "20px",fontSize: "3rem" }}
          value={title}
          onChange={handleTitleChange}
        >
        </Input>
        <TextArea></TextArea>
      </Container>
    </Box>
  );
};

export default Note;

