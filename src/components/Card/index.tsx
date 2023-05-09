import { useCallback } from "react";

import { SUIT_COLORS } from "@/common/helpers/constants";
import { useClassNames } from "@/common/helpers/hooks";
import { SUIT } from "@/engine/enums";
import { CardData } from "@/engine/models";

import styles from "./index.module.scss";

interface CardProps {
  cardData?: CardData;
  handleSelection?: () => void;
  className?: string;
  isClickable?: boolean;
}

const Card = ({
  cardData,
  handleSelection,
  className,
  isClickable,
}: CardProps) => {
  const classNames = useClassNames([
    styles.Card,
    className,
    isClickable && styles["Card--clickable"],
    !cardData && styles["Card--hidden"],
  ]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) =>
      isClickable &&
      handleSelection &&
      (e.key === "Enter" || e.code === "Space") &&
      handleSelection(),
    [handleSelection, isClickable]
  );

  if (!cardData) return <div className={classNames} />;
  return (
    <div
      role={isClickable ? "button" : undefined}
      className={classNames}
      tabIndex={isClickable ? 0 : -1}
      onClick={handleSelection}
      onKeyDown={handleKeyDown}
    >
      <ValueIndicator value={cardData.value} suit={cardData.suit} />
      <SuitIndicator suit={cardData.suit} />
      <span
        className={styles["Card-centerValue"]}
        style={{ color: SUIT_COLORS[cardData.suit] }}
      >
        {cardData.alias?.toUpperCase() || cardData.value}
      </span>
      <SuitIndicator isBottom suit={cardData.suit} />
      <ValueIndicator isBottom value={cardData.value} suit={cardData.suit} />
    </div>
  );
};

const ValueIndicator = ({
  value,
  isBottom,
  suit,
}: {
  value: number;
  isBottom?: boolean;
  suit: SUIT;
}) => {
  const valueIndicatorClassNames = useClassNames([
    styles["Card-valueIndicator"],
    isBottom && styles["Card-valueIndicator--bottom"],
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

const SuitIndicator = ({
  suit,
  isBottom,
}: {
  suit: SUIT;
  isBottom?: boolean;
}) => {
  const suitIndicatorClassNames = useClassNames([
    styles["Card-suitIndicator"],
    isBottom && styles["Card-suitIndicator--bottom"],
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

export default Card;
