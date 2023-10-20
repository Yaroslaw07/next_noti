import { Box, Container, Typography } from "@mui/material";
import { Icons } from "../../Icons";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const VaultModule = () => {

  const currentVault = useSelector((state:RootState) => state.vault.currentVault);

  return (
    <Box
      sx={{
        height: "40px",
        display: "flex",
        alignItems: "center",
        paddingY: "5px",
        paddingLeft: "12px",
        paddingRight: "12px",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        gap: "8px",
        transition: "box-shadow 0.3s ease", // Smooth transition for the box-shadow
        "&:hover": {
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
    >
      <Icons.Vault size={25} />
      <Typography variant="subtitle1" sx={{ fontSize: "1.1rem",paddingTop:"5px" }}>
        {currentVault?.name}        
      </Typography>
    </Box>
  );
};

export default VaultModule;
function useVault() {
  throw new Error("Function not implemented.");
}
