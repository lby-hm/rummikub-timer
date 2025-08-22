import { Avatar, Grid } from "@mui/material";

interface ColorSelectorProps {
  onSelect: (color: string) => void;
}

function ColorSelector({ onSelect }: ColorSelectorProps) {
  const colors = ["red", "blue", "green", "purple", "orange", "pink"];

  return (
    <Grid container spacing={1}>
      {colors.map((color) => (
        <Grid key={color}>
          <Avatar
            sx={{
              bgcolor: color,
            }}
            onClick={() => {
              onSelect(color);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ColorSelector;
