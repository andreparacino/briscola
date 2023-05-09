import { useClassNames } from "@/common/helpers/hooks";
import Card from "@/components/Card";
import { useCpuBrain, useGameStateContext } from "@/engine/hooks";

import styles from "./index.module.scss";

const CpuDisplayedHand = () => {
  const { cpuHand: cardsInHand } = useGameStateContext();
  const { isThinking } = useCpuBrain();

  const classNames = useClassNames([
    styles.CpuDisplayedHand,
    isThinking && styles["CpuDisplayedHand--isThinking"],
  ]);

  return (
    <section className={classNames}>
      {cardsInHand.map(card => (
        <Card key={card.id} className={styles["CpuDisplayedHand-card"]} />
      ))}
    </section>
  );
};

export default CpuDisplayedHand;
