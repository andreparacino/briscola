import { memo } from "react";

import { SUIT_COLORS } from "@/common/helpers/constants";
import { useClassNames } from "@/common/helpers/hooks";
import { SUIT } from "@/engine/enums";

import styles from "./index.module.scss";

const SuitIndicator = ({
  suit,
  isBottom,
}: {
  suit: SUIT;
  isBottom?: boolean;
}) => {
  const suitIndicatorClassNames = useClassNames([
    styles.SuitIndicator,
    isBottom && styles["SuitIndicator--bottom"],
  ]);
  return (
    <span
      style={{
        color: SUIT_COLORS[suit],
        fontSize: `${(12 * 7) / suit.length}px`,
      }}
      className={suitIndicatorClassNames}
    >
      {suit.toUpperCase()}
    </span>
  );
};

export default memo(SuitIndicator);
