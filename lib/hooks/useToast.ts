import { ToastContext } from "@/lib/contexts/toastContext";
import { useContext } from "react";

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return { openToast: context.openToast };
};
