import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import React from "react";
import { ReactNode, createContext, useState } from "react";

interface ToastContextProps {
  openToast: (
    message: string,
    severity?: "success" | "info" | "warning" | "error"
  ) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const openToast = (
    newMessage: string,
    newSeverity: "success" | "info" | "warning" | "error" = "success"
  ) => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const closeToast = () => {
    setOpen(false);
  };

  const ToastComponent = (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={closeToast}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={closeToast} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );

  return (
    <ToastContext.Provider value={{ openToast }}>
      {children}
      {ToastComponent}
    </ToastContext.Provider>
  );
};
