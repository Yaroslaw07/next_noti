import { BackdropProps, CircularProgress,Backdrop } from "@mui/material";


export default function MyBackdrop(props: BackdropProps ) {
    return (
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        {...props}
      >
        <CircularProgress color="primary" size={80} />
      </Backdrop>
    );

}