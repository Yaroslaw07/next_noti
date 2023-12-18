import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import styled from "@emotion/styled";

const StyledIcon = (IconComponent: any, width: number) =>
  styled(IconComponent)(() => ({
    stroke: "#ffff",
    strokeWidth: width,
  }));

export const Icons = {
  //logo
  Logo: StyledIcon(CollectionsBookmarkOutlinedIcon, 0.7),

  //auth
  ShowPassword: VisibilityOutlinedIcon,
  HidePassword: VisibilityOffOutlinedIcon,
  Logout: LogoutOutlinedIcon,

  //design
  KeyboardRight: StyledIcon(ArrowCircleRightOutlinedIcon, 0.4),
  Empty: ClearOutlinedIcon,

  //vaults
  ChangeVault: ExitToAppOutlinedIcon,

  //notes
  ListOfNotes: DnsOutlinedIcon,

  // options
  More: MoreHorizOutlinedIcon,
  Settings: SettingsOutlinedIcon,

  //crud operations
  Delete: DeleteOutlineOutlinedIcon,
  Edit: EditOutlinedIcon,
  Plus: AddCircleOutlinedIcon,
};
