import { TypeOrNull } from "@/common/helpers/models";
import { ACTION, PLAYER, SUIT } from "@/engine/enums";

export type CardData = {
  id: number;
  value: number;
  power: number;
  score: number;
  suit: SUIT;
  alias?: string;
};

export type SuitPointsControl = {
  heavyCardsPassed: number;
  lightPointsPassed: number;
};

export type PointsControl = Record<SUIT, SuitPointsControl>;

export type GameState = {
  deck: CardData[];
  briscolaCard: TypeOrNull<CardData>;
  shownCards: CardData[];
  cpuHand: CardData[];
  cpuCollectedCards: CardData[];
  userHand: CardData[];
  userCollectedCards: CardData[];
  pointsControl: PointsControl;
  shouldUserGoFirst: boolean;
  isUserTurn: boolean;
  lastThrownUserCardId: TypeOrNull<number>;
  scoreToBeat: TypeOrNull<number>;
};

export type Action =
  | { type: ACTION.START_NEW_GAME }
  | { type: ACTION.START_NEW_ROUND; scoreToBeat: number }
  | { type: ACTION.GIVE_CARDS; amount: number }
  | { type: ACTION.PLAY_CARD; card: CardData; player: PLAYER }
  | { type: ACTION.EVALUATE_PLAY };

export type Dispatchers = {
  startNewGame: () => void;
  playCard: (card: TypeOrNull<CardData>, player: PLAYER) => void;
  startNewRound: (scoreToBeat: number) => void;
};
