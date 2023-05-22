import { memo } from "react";

import { SUIT_COLORS } from "@/common/helpers/constants";
import { useClassNames } from "@/common/helpers/hooks";
import { SUIT } from "@/engine/enums";

import styles from "./index.module.scss";

interface ValueIndicatorProps {
  value: number;
  isBottom?: boolean;
  suit: SUIT;
}

const ValueIndicator = ({ value, isBottom, suit }: ValueIndicatorProps) => {
  const valueIndicatorClassNames = useClassNames([
    styles.ValueIndicator,
    isBottom && styles["ValueIndicator--bottom"],
  ]);
  return (
    <span
      style={{ color: SUIT_COLORS[suit] }}
      className={valueIndicatorClassNames}
    >
      {value}
    </span>
  );
};

export default memo(ValueIndicator);
