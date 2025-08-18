import { Avatar, Popover } from "@mui/material";
import { useState } from "react";
import ColorSelector from "./ColorSelector";

interface PlayerAvatarProps {
  color: string;
}

function PlayerAvatar({ color }: PlayerAvatarProps) {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      <Avatar
        variant="square"
        onClick={(event) => {
          setPopoverAnchor(event.currentTarget);
        }}
        sx={{
          bgcolor: color,
        }}
      />
      <Popover
        open={popoverAnchor !== null}
        anchorEl={popoverAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => {
          setPopoverAnchor(null);
        }}
      >
        <ColorSelector
          onSelect={(color) => {
            color = color;
            setPopoverAnchor(null);
          }}
        ></ColorSelector>
      </Popover>
    </>
  );
}

export default PlayerAvatar;
