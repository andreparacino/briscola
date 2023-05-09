import { useMemo } from "react";

import Card from "@/components/Card";
import { useGameStateContext } from "@/engine/hooks";

import styles from "./index.module.scss";

const GameTable = () => {
  const { deck, briscolaCard, shownCards } = useGameStateContext();

  const isLastHand = useMemo(() => deck.length === 0, [deck.length]);

  return (
    <section className={styles.GameTable}>
      {!isLastHand && (
        <div className={styles["GameTable-deck"]}>
          <Card className={styles["GameTable-deckPile"]} />
          {briscolaCard && (
            <Card
              cardData={briscolaCard}
              className={styles["GameTable-deckBriscola"]}
            />
          )}
          <span className={styles["GameTable-deckCounter"]}>{deck.length}</span>
        </div>
      )}
      <div className={styles["GameTable-playingCards"]}>
        {shownCards.map(card => (
          <Card key={card.id} cardData={card} />
        ))}
      </div>
    </section>
  );
};

export default GameTable;
