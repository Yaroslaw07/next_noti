import theme from "@/lib/ui/theme";
import { FC, useEffect, useRef } from "react";

interface TextAreaProps {
  value: string;
  onChange: (content: string) => void;
}

const MIN_TEXTAREA_HEIGHT = 32;

const TextArea: FC<TextAreaProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      onChange={handleContentChange}
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
        height: "100%",
      }}
    />
  );
};

export default TextArea;
