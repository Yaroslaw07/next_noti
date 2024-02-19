import {
  CollectionsBookmarkOutlined as CollectionsBookmarkOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  AddCircleOutlined as AddCircleOutlinedIcon,
  ArrowCircleRightOutlined as ArrowCircleRightOutlinedIcon,
  MoreHorizOutlined as MoreHorizOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  ClearOutlined as ClearOutlinedIcon,
  NoteAddOutlined as NoteAddOutlinedIcon,
  DoorFrontOutlined as DoorFrontOutlinedIcon,
  ListOutlined as ListOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  ViewAgendaOutlined as ViewAgendaOutlinedIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  MenuOpenOutlined as MenuOpenOutlinedIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  SaveOutlined as SaveOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  MonitorOutlined as MonitorIconOutlinedIcon,
} from "@mui/icons-material";

import styled from "@emotion/styled";

const StyledIcon = (IconComponent: any, width: number) => {
  return styled(IconComponent)(({ theme }) => ({
    stroke: theme.palette.background.default,
    strokeWidth: width,
  }));
};

export const Icons = {
  //logo
  Logo: StyledIcon(CollectionsBookmarkOutlinedIcon, 0.7),

  //themes
  LightTheme: StyledIcon(LightModeOutlinedIcon, 0.4),
  DarkTheme: StyledIcon(DarkModeOutlinedIcon, 0.4),
  DeviceTheme: StyledIcon(MonitorIconOutlinedIcon, 0.4),

  //auth
  ShowPassword: VisibilityOutlinedIcon,
  HidePassword: VisibilityOffOutlinedIcon,
  Logout: LogoutOutlinedIcon,

  //design
  KeyboardRight: StyledIcon(ArrowCircleRightOutlinedIcon, 0.4),
  Empty: ClearOutlinedIcon,
  Search: SearchOutlinedIcon,
  ArrowDown: KeyboardArrowDownIcon,

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
  Save: SaveOutlinedIcon,
  Delete: DeleteOutlineOutlinedIcon,
  Edit: EditOutlinedIcon,
  Plus: AddCircleOutlinedIcon,
};
