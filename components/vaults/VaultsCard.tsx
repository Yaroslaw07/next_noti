import { Vault } from "@/types/vault";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import theme from "@/lib/ui/theme";
import { Icons } from "../Icons";

interface VaultsCardProps {
  vault: Vault;
}

const VaultsCard: FC<VaultsCardProps> = ({ vault }) => {
  const handleClick = () => {};

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "secondary.main",
        borderWidth: "1px",
        borderColor: "primary.main",
        display: "flex",
        justifyContent: "space-between",
        height: "55px",
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: `${theme.palette.secondary.dark} !important`,
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ paddingY: "10px" }}>
        <Typography
          component="h4"
          sx={{ fontSize: "1.4rem", fontWeight: "500" }}
        >
          {vault.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton disableRipple>
          <Icons.KeyboardRight color={"primary"} sx={{ fontSize: "30px" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default VaultsCard;
