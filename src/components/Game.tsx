import type { GameConfig } from "../App";
import Statistic from "./Statistic";
import Timer from "./Timer";

interface GameProps {
  gameConfig: GameConfig;
}

function Game({ gameConfig }: GameProps) {
  return (
    <>
      <Statistic></Statistic>
      <Timer></Timer>
    </>
  );
}

export default Game;
