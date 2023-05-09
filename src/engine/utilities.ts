import { CardData, PointsControl } from "@/engine/models";

export const shuffleDeck = (deck: CardData[]) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const pickRandomCard = (deck: CardData[]) => {
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck[randomIndex];
};

export const splitCardsArray = (cards: CardData[]) => {
  const middleIndex = Math.floor(cards.length / 2);
  const firstHalf = cards.slice(0, middleIndex);
  const secondHalf = cards.slice(middleIndex);
  return [firstHalf, secondHalf];
};

export const getUpdatedPointsControl = (
  oldPointsControl: PointsControl,
  card: CardData
) => {
  const { suit, score } = card;
  const oldPointsControlSuitData = oldPointsControl[suit];
  return {
    ...oldPointsControl,
    [suit]: {
      ...oldPointsControlSuitData,
      ...(score > 4
        ? {
            heavyCardsPassed: oldPointsControlSuitData.heavyCardsPassed + 1,
          }
        : {
            lightPointsPassed:
              oldPointsControlSuitData.lightPointsPassed + score,
          }),
    },
  };
};

export const getPlayerScoredPoints = (cards: CardData[]) =>
  cards.reduce((acc, card) => acc + card.score, 0);
