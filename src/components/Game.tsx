import { Avatar, Box, Grid, Typography } from "@mui/material";
import type { GameConfig } from "../App";
import { useTimer } from "react-timer-hook";

interface GameProps {
  gameConfig: GameConfig;
}

interface Player {
  Id: number;
  Name: string;
  Color: string;
  RemainTime: number;
}

function Game({ gameConfig }: GameProps) {
  const players: Player[] = gameConfig.Players.map((player) => ({
    Id: player.Id,
    Name: player.Name,
    Color: player.Color,
    RemainTime: gameConfig.TotalTime,
  }));

  const timer = useTimer({
    expiryTimestamp: new Date(Date.now() + gameConfig.TurnTime * 60 * 1000),
    autoStart: false,
  });

  function restartTimer(){
    timer.restart(new Date(Date.now() + gameConfig.TurnTime * 60 * 1000));
    players.forEach((player) => {
      player.RemainTime = gameConfig.TotalTime;
    });
  }

  return (
    <>
      <Grid container direction="column" height={"100%"} onClick={restartTimer}>
        <Grid container spacing={1} direction="column">
          {players.map((player) => (
            <Grid container key={player.Id} spacing={1}>
              <Grid>
                <Avatar sx={{ bgcolor: player.Color }}>
                  {player.Name.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid size="grow">
                <Box sx={{ width: "100%", height: "100%", bgcolor: "gray" }}>
                  <Box
                    sx={{
                      width: `${(player.RemainTime / gameConfig.TotalTime) * 100} %`,
                      height: "100%",
                      bgcolor: player.Color,
                    }}
                  ></Box>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid size="grow" textAlign="center" alignContent="center">
          <Typography fontSize="300px">{timer.seconds}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Game;
