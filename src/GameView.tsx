import Button from "@/components/Button";
import CpuDisplayedHand from "@/components/CpuDisplayedHand";
import GameStats from "@/components/GameStats";
import GameTable from "@/components/GameTable";
import UserDisplayedHand from "@/components/UserDisplayedHand";
import {
  GameStateContext,
  GameStateDispatchersContext,
} from "@/engine/contexts";
import { useGameControl } from "@/engine/hooks";

import styles from "./GameView.module.scss";

export default function GameView() {
  const {
    gameState,
    hasGameOrRoundStarted,
    isRoundOver,
    isGameOver,
    shouldUserPlay,
    dispatchers,
  } = useGameControl();

  return (
    <main className={styles.GameView}>
      <GameStateContext.Provider value={gameState}>
        <GameStateDispatchersContext.Provider value={dispatchers}>
          <CpuDisplayedHand />
          {!hasGameOrRoundStarted ? (
            <Button onClick={dispatchers.startNewGame}>Deal cards</Button>
          ) : isRoundOver || isGameOver ? (
            <GameStats />
          ) : (
            <GameTable />
          )}
          <UserDisplayedHand shouldUserPlay={shouldUserPlay} />
        </GameStateDispatchersContext.Provider>
      </GameStateContext.Provider>
    </main>
  );
}
