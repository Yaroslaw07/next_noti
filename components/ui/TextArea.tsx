import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";
import { useTheme } from "next-themes";
import { CSSProperties, FC, useEffect, useRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  isFocused: boolean;
  style: CSSProperties | undefined;
}

const MIN_TEXTAREA_HEIGHT = 32;

const TextArea: FC<TextAreaProps> = ({ value, isFocused, style, ...props }) => {
  const { resolvedTheme } = useTheme();
  const theme = getCurrentTheme(resolvedTheme);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      ref={textareaRef}
      value={value}
      autoComplete={"off"}
      {...props}
      style={{
        width: "100%",
        resize: "none",
        outline: "none",
        border: "none",
        background: "transparent",
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        lineHeight: "1.5",
        overflow: "hidden",
        boxSizing: "border-box",
        minHeight: MIN_TEXTAREA_HEIGHT,
        ...style,
      }}
    />
  );
};

export default TextArea;
