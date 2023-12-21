import { Input, TextareaAutosize, styled } from "@mui/material";
import { FC } from "react";

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

interface TextAreaProps {
  value: string;
  onChange: (content: string) => void;
}

const TextArea: FC<TextAreaProps> = ({ value, onChange }) => {
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;
    onChange(newContent);
  };

  return (
    <Input
      placeholder="Empty content"
      value={value}
      onChange={handleContentChange}
      disableUnderline={true}
      multiline
    />
  );
};

export default TextArea;
