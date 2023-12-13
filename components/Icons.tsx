import {
  TbDots,
  TbNotesOff,
  TbDoor,
  TbSettings,
  TbPlus,
  TbNotes,
  TbTrash,
  TbLogout2,
} from "react-icons/tb";

import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";

export const Icons = {
  //logo
  Logo: CollectionsBookmarkOutlinedIcon,

  //auth
  ShowPassword: VisibilityOutlinedIcon,
  HidePassword: VisibilityOffOutlinedIcon,
  Logout: LogoutOutlinedIcon,

  //design
  KeyboardRight: ArrowCircleRightOutlinedIcon,

  //vaults
  noVaults: DoNotDisturbAltOutlinedIcon,

  More: TbDots,
  NoNoteOpen: TbNotesOff,
  Vault: TbDoor,
  Settings: TbSettings,
  NewNote: TbPlus,

  Plus: AddCircleOutlinedIcon,

  //crud operations
  Delete: DeleteOutlineOutlinedIcon,
  Edit: EditOutlinedIcon,

  ClearNote: TbNotes,
};
