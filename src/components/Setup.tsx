import type { GameConfig, Player } from "../App";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import PlayerConfig from "./PlayerConfig";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface SetupProps {
  gameConfig: GameConfig;
  onStartGame: (config: GameConfig) => void;
}

function Setup({ gameConfig, onStartGame }: SetupProps) {
  const [config, setConfig] = useState<GameConfig>(gameConfig);

  function handleChangePlayer(player: Player, index: number) {
    let players = [...config.Players];
    players[index] = player;
    setConfig({ ...config, Players: players });
  }

  function handleDeletePlayer(index: number) {
    let players = [...config.Players];
    players.splice(index, 1);
    setConfig({ ...config, Players: players });
  }

  function handleAddPlayer() {
    const lastId = config.Players[config.Players.length - 1].Id;
    const newPlayer: Player = {
      Id: lastId + 1,
      Name: `玩家 ${lastId + 1}`,
      Color: "gray",
    };

    setConfig({ ...config, Players: [...config.Players, newPlayer] });
  }

  return (
    <>
      <Grid container spacing={2} direction={"column"} height={"100%"}>
        <Grid container spacing={2}>
          <Grid size="grow">
            <FormControl fullWidth>
              <InputLabel id="total-time-label">每位玩家总时间</InputLabel>
              <Select
                labelId="total-time-label"
                value={config.TotalTime}
                label="每位玩家总时间"
                onChange={(event) => {
                  setConfig({
                    ...config,
                    TotalTime: event.target.value as number,
                  });
                }}
              >
                <MenuItem value={10 * 60}>10分钟</MenuItem>
                <MenuItem value={20 * 60}>20分钟</MenuItem>
                <MenuItem value={30 * 60}>30分钟</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size="grow">
            <FormControl fullWidth>
              <InputLabel id="turn-time-label">每回合时间</InputLabel>
              <Select
                labelId="turn-time-label"
                value={config.TurnTime}
                label="一回合时间"
                onChange={(event) => {
                  setConfig({
                    ...config,
                    TurnTime: event.target.value as number,
                  });
                }}
              >
                <MenuItem value={30}>30秒</MenuItem>
                <MenuItem value={60}>1分钟</MenuItem>
                <MenuItem value={120}>2分钟</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid size="grow">
          <List>
            {config.Players.map((player, index) => (
              <ListItem key={player.Id}>
                <PlayerConfig
                  player={player}
                  onChange={(player) => handleChangePlayer(player, index)}
                  onDelete={() => handleDeletePlayer(index)}
                ></PlayerConfig>
              </ListItem>
            ))}
            {config.Players.length < 6 && (
              <ListItem onClick={handleAddPlayer}>
                <ListItemButton>
                  <IconButton>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onStartGame(config)}
          >
            开始游戏
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Setup;
