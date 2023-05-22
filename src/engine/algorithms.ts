import { TypeOrNull, TypeOrUndefined } from "@/common/helpers/models";
import { SUIT } from "@/engine/enums";
import { CardData, PointsControl } from "@/engine/models";
import { getUpdatedPointsControl } from "@/engine/utilities";

export const evaluateWinningCard = ({
  firstPlayedCard,
  lastPlayedCard,
  briscolaSuit,
}: {
  firstPlayedCard: CardData;
  lastPlayedCard: CardData;
  briscolaSuit: TypeOrUndefined<SUIT>;
}) => {
  const firstCardIsBriscola = firstPlayedCard.suit === briscolaSuit;
  const lastCardIsBriscola = lastPlayedCard.suit === briscolaSuit;

  if (firstCardIsBriscola && !lastCardIsBriscola) return firstPlayedCard;
  if (!firstCardIsBriscola && lastCardIsBriscola) return lastPlayedCard;
  if (firstPlayedCard.suit === lastPlayedCard.suit)
    return firstPlayedCard.power > lastPlayedCard.power
      ? firstPlayedCard
      : lastPlayedCard;
  return firstPlayedCard;
};

export const evaluateResponseCard = (
  cardsInHand: CardData[],
  cardToBeat: CardData,
  briscolaSuit: TypeOrUndefined<SUIT>
) => {
  const winningCards = cardsInHand.map(card =>
    evaluateWinningCard({
      firstPlayedCard: cardToBeat,
      lastPlayedCard: card,
      briscolaSuit,
    })
  );
  const cpuCardsIds = cardsInHand.map(card => card.id);
  const cpuWinningCards = winningCards.filter(card =>
    cpuCardsIds.includes(card.id)
  );
  const cpuBriscolaWinningCards = cpuWinningCards.filter(
    card => card.suit === briscolaSuit
  );
  const cpuNonBriscolaWinningCards = cpuWinningCards.filter(
    card => card.suit !== briscolaSuit
  );

  const leastPowerfulNonBriscolaCard = cardsInHand
    .filter(card => card.suit !== briscolaSuit)
    .sort((a, b) => a.power - b.power)[0];
  const leastPowerfulBriscolaCard = cpuBriscolaWinningCards.sort(
    (a, b) => a.power - b.power
  )[0];

  if (cpuNonBriscolaWinningCards.length)
    return cpuNonBriscolaWinningCards.reduce((max, current) =>
      max.power > current.power ? max : current
    );
  if (cpuBriscolaWinningCards.length)
    return cardToBeat.score <= 3 &&
      (leastPowerfulNonBriscolaCard?.score || 0) <= 3
      ? leastPowerfulNonBriscolaCard
      : leastPowerfulBriscolaCard;
  return leastPowerfulNonBriscolaCard || leastPowerfulBriscolaCard;
};

export const evaluateFirstCard = (
  cardsInHand: CardData[],
  pointsControl: PointsControl,
  briscolaSuit: TypeOrUndefined<SUIT>
) => {
  let newPointsControl: TypeOrNull<PointsControl> = null;
  for (const card of cardsInHand) {
    newPointsControl = getUpdatedPointsControl(pointsControl, card);
  }
  if (!newPointsControl) throw new Error("Engine's fucked up");

  const sortedPointsControl = Object.entries(newPointsControl)
    .map(([suit, { heavyCardsPassed, lightPointsPassed }]) => ({
      suit,
      heavyCardsPassed,
      lightPointsPassed,
    }))
    .sort((a, b) => {
      if (b.heavyCardsPassed !== a.heavyCardsPassed)
        return b.heavyCardsPassed - a.heavyCardsPassed;
      if (a.suit === briscolaSuit) return 1;
      if (b.suit === briscolaSuit) return -1;
      return b.lightPointsPassed - a.lightPointsPassed;
    });

  for (const { suit } of sortedPointsControl) {
    const potentialCards = cardsInHand
      .filter(card => card.suit === suit)
      .sort((a, b) => a.score - b.score);
    if (potentialCards.length) return potentialCards[0];
  }
};
