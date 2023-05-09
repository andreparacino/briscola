import { evaluateWinningCard } from "@/engine/algorithms";
import {
  INITIAL_DECK,
  INITIAL_GAME_STATE,
  INITIAL_POINTS_CONTROL,
} from "@/engine/constants";
import { PLAYER } from "@/engine/enums";
import { CardData, GameState } from "@/engine/models";
import {
  getUpdatedPointsControl,
  shuffleDeck,
  splitCardsArray,
} from "@/engine/utilities";

const { USER } = PLAYER;

export const handleStartNewGame = (): GameState => {
  const shuffledDeck = shuffleDeck(INITIAL_DECK);

  return {
    ...INITIAL_GAME_STATE,
    deck: shuffledDeck,
    briscolaCard: shuffledDeck.at(-1) || null,
  };
};

export const handleStartNewRound = ({
  oldState,
  scoreToBeat,
  shouldUserGoFirst,
}: {
  oldState: GameState;
  scoreToBeat: number;
  shouldUserGoFirst: boolean;
}): GameState => {
  const shuffledDeck = shuffleDeck(INITIAL_DECK);

  return {
    ...oldState,
    deck: shuffledDeck,
    cpuCollectedCards: [],
    userCollectedCards: [],
    pointsControl: INITIAL_POINTS_CONTROL,
    lastThrownUserCardId: null,
    briscolaCard: shuffledDeck.at(-1) || null,
    scoreToBeat: scoreToBeat,
    shouldUserGoFirst: !shouldUserGoFirst,
    isUserTurn: !shouldUserGoFirst,
  };
};

export const handleGiveCards = ({
  oldState,
  amount,
  cpuHand,
  userHand,
}: {
  oldState: GameState;
  amount: number | undefined;
  cpuHand: CardData[];
  userHand: CardData[];
}): GameState => {
  const copiedDeck = [...oldState.deck];
  const pickedCards = copiedDeck.splice(0, amount);
  const dividedCards = splitCardsArray(pickedCards);

  return {
    ...oldState,
    deck: copiedDeck,
    cpuHand: [...cpuHand, ...dividedCards[0]],
    userHand: [...userHand, ...dividedCards[1]],
  };
};

export const handlePlayCard = ({
  oldState,
  player,
  cardId,
}: {
  oldState: GameState;
  player: PLAYER;
  cardId: number;
}): GameState => {
  const { userHand, cpuHand, shownCards, pointsControl, isUserTurn } = oldState;
  const didUserPlay = player === USER;
  const copiedHand = [...(didUserPlay ? userHand : cpuHand)];
  const cardIndex = copiedHand.findIndex(card => card.id === cardId);
  const chosenCard = copiedHand.splice(cardIndex, 1)[0];

  return {
    ...oldState,
    ...(didUserPlay
      ? { lastThrownUserCardId: chosenCard.id, userHand: copiedHand }
      : { cpuHand: copiedHand }),
    ...(chosenCard.power && {
      pointsControl: getUpdatedPointsControl(pointsControl, chosenCard),
    }),
    shownCards: [...shownCards, chosenCard],
    isUserTurn: !isUserTurn,
  };
};

export const handleEvaluatePlay = (oldState: GameState): GameState => {
  const {
    shownCards,
    userCollectedCards,
    cpuCollectedCards,
    briscolaCard,
    lastThrownUserCardId,
  } = oldState;
  const firstPlayedCard = shownCards[0];
  const lastPlayedCard = shownCards[1];
  const winningCard = evaluateWinningCard({
    firstPlayedCard,
    lastPlayedCard,
    briscolaSuit: briscolaCard?.suit,
  });
  const didUserWin = winningCard.id === lastThrownUserCardId;
  console.log(
    `${didUserWin ? "User" : "CPU"} takes with ${
      winningCard.alias || winningCard.value
    } di ${winningCard.suit}!`
  );

  return {
    ...oldState,
    shownCards: [],
    isUserTurn: didUserWin,
    ...(didUserWin
      ? { userCollectedCards: [...userCollectedCards, ...shownCards] }
      : { cpuCollectedCards: [...cpuCollectedCards, ...shownCards] }),
  };
};
