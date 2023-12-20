import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

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
  Search: SearchOutlinedIcon,

  //vaults
  ChangeVault: ViewAgendaOutlinedIcon,
  Vault: DoorFrontOutlinedIcon,

  //notes
  SelectItem: StyledIcon(MenuOpenOutlinedIcon, 0.4),
  Note: DescriptionOutlinedIcon,
  ListOfNotes: ListOutlinedIcon,
  newNote: NoteAddOutlinedIcon,

  // options
  More: MoreHorizOutlinedIcon,
  Settings: SettingsOutlinedIcon,

  //crud operations
  Delete: DeleteOutlineOutlinedIcon,
  Edit: EditOutlinedIcon,
  Plus: AddCircleOutlinedIcon,
};
