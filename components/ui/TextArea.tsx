import theme from "@/lib/ui/theme";
import { text } from "node:stream/consumers";
import { FC, useEffect, useRef, useState } from "react";

interface TextAreaProps {
  value: string;
  onChange: (content: string) => void;
  onBlur?: () => void;
  handleEnter?: () => void;
  handleBackspace?: () => void;
}

const MIN_TEXTAREA_HEIGHT = 2;

const TextArea: FC<TextAreaProps> = ({
  value,
  onChange,
  onBlur,
  handleEnter,
  handleBackspace,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isBackspacePressed = event.key === "Backspace";

    if (isBackspacePressed && textareaRef.current?.value.length === 0) {
      handleBackspace && handleBackspace();
      event.preventDefault();
      return;
    }

    if (event.key === "Enter") {
      handleEnter && handleEnter();
      event.preventDefault();
      return;
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    onChange(newContent);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
    }
  }, [value]);

  return (
    <textarea
      placeholder="Empty content"
      ref={textareaRef}
      value={value || ""}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      onChange={handleOnChange}
      style={{
        width: "100%",
        resize: "none",
        outline: "none",
        border: "none",
        fontSize: "1.1rem",
        background: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily,
        lineHeight: "1.5",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    />
  );
};

export default TextArea;
