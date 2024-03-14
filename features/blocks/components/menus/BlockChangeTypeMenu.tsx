import { Menu, MenuItem, Typography } from "@mui/material";
import { FC } from "react";
import { blockTypeInfos } from "../../types/blockTypeInfos";
import { useBlocksActions } from "../../hooks/useBlockActions";

interface BlockChangeTypeMenuProps {
  id: string;
  currentType: string | null;
  anchorEl: null | SVGSVGElement;
  isOpen: boolean;
  handleClose: () => void;
}

const BlockChangeTypeMenu: FC<BlockChangeTypeMenuProps> = ({
  id,
  currentType,
  anchorEl,
  isOpen,
  handleClose,
}) => {
  const { updateBlockType } = useBlocksActions({ id, order: 0 });

  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
        disablePadding: true,
        dense: true,
      }}
    >
      {Object.values(blockTypeInfos)
        .filter((typeInfo) => typeInfo.type !== currentType)
        .map((typeInfo) => (
          <MenuItem
            key={typeInfo.type}
            onClick={() => {
              updateBlockType(typeInfo.type);
              handleClose();
            }}
            disableRipple
          >
            <Typography>{typeInfo.title}</Typography>
          </MenuItem>
        ))}
    </Menu>
  );
};

export default BlockChangeTypeMenu;
