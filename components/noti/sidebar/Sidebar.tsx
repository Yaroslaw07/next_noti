import {
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { FC } from "react";
import VaultModule from "./VaultModule";
import HR from "@/components/ui/HR";
import SettingsModule from "./SettingsModule";
import AddModule from "./AddModules";

const Sidebar: FC = () => {
  return (
    <Paper
      sx={{ marginRight: "1px" }}
      component="aside"
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#ededed",
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}
    >
      <Box>
        <VaultModule />
        <AddModule />
        <HR />
      </Box>
      List of notes
      <Box sx={{ marginTop: "auto" }}>
        <SettingsModule />
        <HR />
        <Typography sx={{ textAlign: "center", fontSize: "0.8rem" }}>
          Noti v0.1.0
        </Typography>
      </Box>
    </Paper>
  );
};

export default Sidebar;
