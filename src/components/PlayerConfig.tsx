import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  TextField,
} from "@mui/material";
import type { Player } from "../App";
import ColorSelector from "./ColorSelector";
import { useEffect, useRef, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface PlayerConfigProps {
  player: Player;
  onChange: (player: Player) => void;
  onDelete: () => void;
}

function PlayerConfig({ player, onChange, onDelete }: PlayerConfigProps) {
  const [color, setColor] = useState(player.Color);
  const [name, setName] = useState(player.Name);
  const [isColorSelectorOpen, setColorSeletorOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    setColor(player.Color);
    setName(player.Name);
  }, [player.Color, player.Name]);

  function onSelecteColor(color: string): void {
    setColorSeletorOpen(false);
    setColor(color);
    onChange({ ...player, Color: color });
  }

  function onChangeName(name: string): void {
    setName(name);
    onChange({ ...player, Name: name });
  }

  return (
    <>
      <ListItemButton>
        <IconButton onClick={onDelete}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </ListItemButton>
      <ListItemAvatar>
        <Avatar
          variant="square"
          sx={{ bgcolor: color }}
          ref={anchorRef}
          onClick={() => setColorSeletorOpen(true)}
        />
        <Popover
          open={isColorSelectorOpen}
          onClose={() => setColorSeletorOpen(false)}
          anchorEl={anchorRef.current}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <ColorSelector onSelect={onSelecteColor}></ColorSelector>
        </Popover>
      </ListItemAvatar>
      <ListItemText>
        <TextField
          onChange={(event) => onChangeName(event.target.value)}
          value={name}
          fullWidth
        />
      </ListItemText>
    </>
  );
}

export default PlayerConfig;
