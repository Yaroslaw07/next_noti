import { Icons } from "@/components/Icons";
import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useBlocksActions } from "../../hooks/useBlockActions";

interface BlockWrapperMenuProps {
  id: string;
  anchorEl: null | SVGSVGElement;
  isOpen: boolean;
  handleChangeTypeOption: () => void;
  handleClose: () => void;
}

const BlockWrapperMenu: FC<BlockWrapperMenuProps> = ({
  id,
  anchorEl,
  handleChangeTypeOption,
  handleClose,
  isOpen: open,
}) => {
  const { deleteBlock } = useBlocksActions({ id, order: 0 });

  const handleDelete = () => {
    deleteBlock();
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
        disablePadding: true,
      }}
      sx={{ marginTop: "8px" }}
    >
      <MenuItem onClick={handleChangeTypeOption} disableRipple>
        <Stack spacing={2} direction={"row"} alignItems={"center"}>
          <Typography>Change Type</Typography>
          <Icons.KeyboardRight sx={{ fontSize: "24px" }} />
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
          <Icons.Delete sx={{ fontSize: "24px" }} />
        </Stack>
      </MenuItem>
    </Menu>
  );
};

export default BlockWrapperMenu;
