import { Icons } from "@/components/Icons";
import HR from "@/components/ui/HR";
import { useNotesInfo } from "@/features/note-infos/hooks/useNotesInfo";
import {
  Box,
  Modal,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import SearchItem from "./SearchItem";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { notes } = useNotesInfo();

  const [searchTitle, setSearchTitle] = useState("");
  const [alignment, setAlignment] = useState<"pinned" | "notPinned" | "all">(
    "all"
  );

  const displayedNotes = notes
    ?.filter((note) => note.title.includes(searchTitle))
    .filter((note) => {
      if (alignment === "pinned") {
        return note.isPinned;
      } else if (alignment === "notPinned") {
        return !note.isPinned;
      } else {
        return true;
      }
    });

  const handleSearchTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTitle(event.target.value);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "pinned" | "notPinned" | "all"
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={3}
        alignItems={"center"}
        sx={{
          backgroundColor: "secondary.main",
          width: "400px",
          height: "500px",
          borderRadius: "12px",
          borderColor: "primary.main",
          borderWidth: "1px",
          borderStyle: "solid",
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
          padding: "18px",
        }}
      >
        <Typography variant="h5">Search</Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <TextField
            label="Search"
            size="small"
            value={searchTitle}
            onChange={handleSearchTextChange}
            sx={{ width: "60%" }}
          />
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            sx={{ width: "40%" }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="pinned">
              <Icons.Pinned />
            </ToggleButton>
            <ToggleButton value="notPinned">
              <Icons.ToPin />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <HR />
        <Box
          flexGrow={1}
          sx={{
            width: "100%",
            overflow: "auto",
          }}
        >
          <Stack spacing={1.5}>
            {(displayedNotes || []).map((note) => (
              <SearchItem key={note.id} note={note} handleClose={onClose} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Modal>
  );
};

export default SearchModal;
