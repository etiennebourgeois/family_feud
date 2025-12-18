import { useGameState } from "../hooks/useGameState";
import { GameBoard } from "../components/GameBoard";

export function GamePage() {
  const { state } = useGameState();

  return <GameBoard state={state} />;
}
