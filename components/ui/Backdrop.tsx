import {
  BackdropProps,
  CircularProgress,
  Backdrop as MuiBackdrop,
} from "@mui/material";

export default function Backdrop(props: BackdropProps) {
  return (
    <MuiBackdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "rgba(212, 212, 212, 0.3)",
      }}
      {...props}
    >
      <CircularProgress color="primary" size={60} />
    </MuiBackdrop>
  );
}
