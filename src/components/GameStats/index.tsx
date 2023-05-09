import Button from "@/components/Button";
import { useDispatchersContext, useGameStats } from "@/engine/hooks";

import styles from "./index.module.scss";

const GameStats = () => {
  const dispatchers = useDispatchersContext();

  const {
    userScoredPoints,
    cpuScoredPoints,
    isGameOver,
    isDraw,
    didUserWinRound,
    didUserWinGame,
  } = useGameStats();

  return (
    <section className={styles.GameStats}>
      {isGameOver ? (
        <h2>{didUserWinGame ? "User won the game!" : "CPU won the game :("}</h2>
      ) : (
        <h2>
          {isDraw
            ? "Draw!"
            : didUserWinRound
            ? "User won the round!"
            : "CPU won the round :("}
        </h2>
      )}
      <span>Points scored by user: {userScoredPoints}</span>
      <span>Points scored by CPU: {cpuScoredPoints}</span>
      {!isGameOver && (
        <span>
          You will have to score {cpuScoredPoints + 1} points in the next round
          to win the game!
        </span>
      )}
      {!isGameOver ? (
        <Button onClick={() => dispatchers?.startNewRound(cpuScoredPoints)}>
          Next round
        </Button>
      ) : (
        <Button onClick={() => dispatchers?.startNewGame}>Next game</Button>
      )}
    </section>
  );
};

export default GameStats;
