import { Avatar, Grid } from "@mui/material";

interface ColorSelectorProps {
  onSelect: (color: string) => void;
}

function ColorSelector({ onSelect }: ColorSelectorProps) {
  const colors = [
    "MediumTurquoise",
    "MediumVioletRed",
    "Violet",
    "SteelBlue",
    "YellowGreen",
    "Tomato",
    "Salmon",
    "DarkOrange",
    "LightPink",
  ];

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
