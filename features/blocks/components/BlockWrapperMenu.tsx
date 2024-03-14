import { Icons } from "@/components/Icons";
import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useBlocksActions } from "../hooks/useBlockActions";

interface BlockWrapperMenuProps {
  id: string;
  type: string;
  anchorEl: null | SVGSVGElement;
  open: boolean;
  handleClose: () => void;
}

const BlockWrapperMenu: FC<BlockWrapperMenuProps> = ({
  id,
  anchorEl,
  handleClose,
  open,
}) => {
  const { deleteBlock } = useBlocksActions({ id, order: 0 });

  const handleDelete = () => {
    deleteBlock();
    handleClose();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
        disablePadding: true,
        dense: true,
      }}
    >
      <MenuItem onClick={handleClose} disableRipple>
        <Stack spacing={2} direction={"row"} alignItems={"center"}>
          <Typography>Change Type</Typography>
          <Icons.KeyboardRight sx={{ fontSize: "20px" }} />
        </Stack>
      </MenuItem>
      <MenuItem onClick={handleDelete} sx={{ width: "100%" }} disableRipple>
        <Stack
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Typography>Delete</Typography>
          <Icons.Delete sx={{ fontSize: "20px" }} />
        </Stack>
      </MenuItem>
    </Menu>
  );
};

export default BlockWrapperMenu;
