import useThemeStore from "@/lib/stores/themeStore";
import { FC, useEffect, useRef } from "react";

interface TextAreaProps {
  value: string;
  onChange: (content: string) => void;

  handleEnter?: () => void;
  handleBackspace?: () => void;

  onFocus?: () => void;
  isFocused?: boolean;

  moveToPrevious?: () => void;
  moveToNext?: () => void;

  onBlur?: () => void;
}

const MIN_TEXTAREA_HEIGHT = 32;

const TextArea: FC<TextAreaProps> = ({
  value,
  onChange,

  handleEnter,
  handleBackspace,

  onFocus,
  isFocused,

  moveToPrevious,
  moveToNext,

  onBlur,
}) => {
  const { getCurrentTheme } = useThemeStore();
  const theme = getCurrentTheme();

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

    if (event.key === "ArrowUp" && textareaRef.current?.selectionStart === 0) {
      moveToPrevious && moveToPrevious();
      event.preventDefault();
      return;
    }

    if (
      event.key === "ArrowDown" &&
      textareaRef.current?.selectionEnd === value.length
    ) {
      moveToNext && moveToNext();
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

  useEffect(() => {
    if (isFocused && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  return (
    <textarea
      placeholder="Empty content"
      ref={textareaRef}
      value={value || ""}
      onFocus={onFocus}
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
        color: theme.palette.text.primary,
        lineHeight: "1.5",
        overflow: "hidden",
        boxSizing: "border-box",
        minHeight: MIN_TEXTAREA_HEIGHT,
      }}
    />
  );
};

export default TextArea;
