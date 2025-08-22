import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import Setup from "./components/Setup";

export interface GameConfig {
  TotalTime: number;
  TurnTime: number;
  Players: Player[];
}

export interface Player {
  Id: number;
  Name: string;
  Color: string;
}

function App() {
  const [isGameStarted, setGameStartedFlag] = useState(false);
  const [config, setConfig] = useState<GameConfig>({
    TotalTime: 30,
    TurnTime: 1,
    Players: [
      { Id: 1, Name: "爸爸", Color: "red" },
      { Id: 2, Name: "妈妈", Color: "blue" },
      { Id: 3, Name: "甜甜", Color: "green" },
    ],
  });

  const handleStartGame = (config: GameConfig) => {
    setGameStartedFlag(true);
    setConfig(config);
  };

  return (
    <>
      {isGameStarted ? (
        <Game gameConfig={config} />
      ) : (
        <Setup gameConfig={config} onStartGame={handleStartGame} />
      )}
    </>
  );
}

export default App;
