import useCurrentNote from "@/hooks/useCurrentNote";
import { TextareaAutosize, styled } from "@mui/material";
import { useEffect } from "react";

const TextAreaAuto = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-weight: 500;
  line-height: 1.5;
  font-size: 1rem;
  padding: 4px 4px;
  border: none;
  background: transparent;
  resize: none;
  &:hover {
    border-color: "primary.secondary";
  }

  &:focus {
    border-color: "primary.main";
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default function TextArea() {

  const {note, status} = useCurrentNote();

  if (note == undefined) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <TextAreaAuto
      aria-label="empty textarea"
      placeholder="Empty content"
      defaultValue={note.content ? note.content : ""}
    />
  );
}
