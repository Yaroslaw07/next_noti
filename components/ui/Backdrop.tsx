import {
  BackdropProps,
  CircularProgress,
  Backdrop as MuiBackdrop,
} from "@mui/material";

export default function Backdrop(props: BackdropProps) {
  return (
    <MuiBackdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} {...props}>
      <CircularProgress color="primary" size={80} />
    </MuiBackdrop>
  );
}
