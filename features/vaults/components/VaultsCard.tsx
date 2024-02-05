import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import theme from "@/lib/ui/theme";
import { Icons } from "../../../components/Icons";
import { Vault } from "../types/vaultTypes";
import { useVaults } from "../hooks/useVaults";
import { useRouter } from "next/router";

interface VaultsCardProps {
  vault: Vault;
}

const VaultsCard: FC<VaultsCardProps> = ({ vault }) => {
  const router = useRouter();

  const { selectVault } = useVaults();

  const handleClick = () => {
    selectVault(vault);
    router.push(`/notes/`);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "additional.light",
        borderWidth: "0.5px",
        borderColor: "text.secondary",
        display: "flex",
        justifyContent: "space-between",
        height: "55px",
        boxShadow: "0 1px 0px 1px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: `${theme.palette.additional?.main} !important`,
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ paddingTop: "3%" }}>
        <Typography
          component="h4"
          sx={{ fontSize: "1.2rem", fontWeight: "400" }}
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
