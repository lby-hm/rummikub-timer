import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import type { GameConfig } from "../App";
import { useTimer } from "react-timer-hook";
import { useState } from "react";
import clickSound from "../assets/sound/click.mp3";

interface GameProps {
  gameConfig: GameConfig;
}

function Game({ gameConfig }: GameProps) {
  const totalTime = gameConfig.TotalTime;
  const turnTime = gameConfig.TurnTime;
  const players = gameConfig.Players;

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-1);

  const [playerRemainTime, setPlayerRemainTime] = useState<number[]>(
    players.map(() => totalTime)
  );

  const timer = useTimer({
    expiryTimestamp: new Date(Date.now() + turnTime * 1000),
    autoStart: false,
    interval: 100,
    onExpire: () => {
      timer.pause();
    },
  });

  function restartTimer() {
    const audio = new Audio(clickSound);
    audio.play();

    setPlayerRemainTime((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[currentPlayerIndex] = Math.max(
        0,
        newTimes[currentPlayerIndex] - (turnTime - timer.totalSeconds)
      );
      return newTimes;
    });

    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);

    const nextTurnTime = Math.min(turnTime, playerRemainTime[nextPlayerIndex]);
    timer.restart(new Date(Date.now() + nextTurnTime * 1000));
  }

  function getRealtimeRemainTime(index: number): number {
    if (timer.isRunning && index === currentPlayerIndex) {
      const currentTurnTime = Math.min(turnTime, playerRemainTime[index]);
      return Math.max(
        0,
        playerRemainTime[index] - (currentTurnTime - timer.totalSeconds)
      );
    } else {
      return playerRemainTime[index];
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) {
      return `${secs}秒`;
    } else {
      return `${mins}分${secs}秒`;
    }
  }

  return (
    <>
      <Grid
        container
        direction="column"
        height={"100%"}
        onClick={restartTimer}
        sx={{ bgcolor: timer.totalSeconds === 0 ? "red" : "white" }}
      >
        <Grid>
          <List>
            {players.map((player, index) => (
              <ListItem
                key={player.Id}
                sx={{
                  border:
                    index === currentPlayerIndex
                      ? `2px solid ${player.Color}`
                      : "none",
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: player.Color }}>
                    {player.Name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText sx={{ bgcolor: "gray" }}>
                  <Box
                    sx={{
                      bgcolor: player.Color,
                      width: `${(getRealtimeRemainTime(index) / totalTime) * 100}%`,
                      height: "100%",
                    }}
                  >
                    <Typography sx={{ color: "white" }} padding={1}>
                      {formatTime(getRealtimeRemainTime(index))}
                    </Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid size="grow" textAlign="center" alignContent="center">
          <Typography
            fontSize="160px"
            color={
              currentPlayerIndex >= 0
                ? players[currentPlayerIndex].Color
                : "black"
            }
          >
            {timer.totalSeconds}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Game;
