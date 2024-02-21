import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Icons } from "../../../components/Icons";
import { Vault } from "../types/vaultTypes";
import { useCurrentVault } from "../hooks/useCurrentVault";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";

interface VaultsCardProps {
  vault: Vault;
}

const VaultsCard: FC<VaultsCardProps> = ({ vault }) => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const theme = getCurrentTheme(resolvedTheme);

  const { selectVault } = useCurrentVault();

  const handleClick = () => {
    selectVault(vault);
    router.push(`/notes/`);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "secondary.main",
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
