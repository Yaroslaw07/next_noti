import { Box } from "@mui/material";

const HR = () => {

  return (
    <Box
      sx={{
        width: "88%",
        height: "2px", // You can adjust the height as needed
        backgroundColor: "primary.main",
        margin: "0 auto", // Center the horizontal rule
      }}
    />
  );
};

export default HR;
