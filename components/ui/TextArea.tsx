import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";
import { current } from "@reduxjs/toolkit";
import { useTheme } from "next-themes";
import {
  CSSProperties,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  isFocused: boolean;
  style?: CSSProperties;
  minHeightPx?: number;
}

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
  { value, isFocused, style, minHeightPx: minHeight = 20, ...props },
  ref
) => {
  const { resolvedTheme } = useTheme();
  const theme = getCurrentTheme(resolvedTheme);

  const innerRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => innerRef.current!);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.height = "inherit";

      innerRef.current.style.height = `${Math.max(
        innerRef.current.scrollHeight,
        minHeight
      )}px`;
    }
  }, [value]);

  useEffect(() => {
    if (isFocused && innerRef.current) {
      innerRef.current.focus();
    }
  }, [isFocused]);

  return (
    <textarea
      ref={innerRef}
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
        overflow: "hidden",
        boxSizing: "border-box",
        minHeight: minHeight,
        lineHeight: "1.5",
        ...style,
      }}
    />
  );
};

export default forwardRef(TextArea);
