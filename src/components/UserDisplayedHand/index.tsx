import { useClassNames } from "@/common/helpers/hooks";
import Card from "@/components/Card";
import { PLAYER } from "@/engine/enums";
import { useDispatchersContext, useGameStateContext } from "@/engine/hooks";

import styles from "./index.module.scss";

const UserDisplayedHand = ({ shouldUserPlay }: { shouldUserPlay: boolean }) => {
  const { userHand: cardsInHand } = useGameStateContext();
  const dispatchers = useDispatchersContext();

  const classNames = useClassNames([
    styles.UserDisplayedHand,
    !shouldUserPlay && styles["UserDisplayedHand--isDisabled"],
  ]);

  return (
    <section className={classNames}>
      {cardsInHand.map(card => (
        <Card
          key={card.id}
          isClickable
          cardData={card}
          handleSelection={() => dispatchers?.playCard(card, PLAYER.USER)}
          className={styles["UserDisplayedHand-card"]}
        />
      ))}
    </section>
  );
};

export default UserDisplayedHand;
