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

export const Icons = {
  Logo: CollectionsBookmarkOutlinedIcon,

  More: TbDots,
  NoNoteOpen: TbNotesOff,
  Vault: TbDoor,
  Settings: TbSettings,
  NewNote: TbPlus,
  DeleteNote: TbTrash,
  ClearNote: TbNotes,
  Logout: TbLogout2,

  ShowPassword: VisibilityOutlinedIcon,
  HidePassword: VisibilityOffOutlinedIcon,
};
