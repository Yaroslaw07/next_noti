import { Icons } from "@/components/Icons";
import { Box, Typography } from "@mui/material"


const SidebarOptions = () => {
    return (
      <Box
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          paddingY: "5px",
          margin: "auto 0",
          paddingLeft: "12px",
          paddingRight: "12px",
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          gap: "8px",
          transition: "box-shadow 0.3s ease", // Smooth transition for the box-shadow
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        }}
      >
        <Icons.Settings size={20} />
        <Typography
          variant="subtitle2"
          sx={{ fontSize: "1rem", paddingTop: "5px" }}
        >
          Settings
        </Typography>
      </Box>
    );
}

export default SidebarOptions;