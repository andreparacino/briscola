import { ALIAS, SUIT } from "@/engine/enums";
import { CardData, GameState, PointsControl } from "@/engine/models";

const { DENARI, SPADE, COPPE, BASTONI } = SUIT;
const { ASSO, DONNA, CAVALLO, RE } = ALIAS;

export const INITIAL_DECK: CardData[] = [
  { id: 1, value: 1, power: 10, score: 11, suit: DENARI, alias: ASSO },
  { id: 2, value: 2, power: 1, score: 0, suit: DENARI },
  { id: 3, value: 3, power: 9, score: 10, suit: DENARI },
  { id: 4, value: 4, power: 2, score: 0, suit: DENARI },
  { id: 5, value: 5, power: 3, score: 0, suit: DENARI },
  { id: 6, value: 6, power: 4, score: 0, suit: DENARI },
  { id: 7, value: 7, power: 5, score: 0, suit: DENARI },
  { id: 8, value: 8, power: 6, score: 2, suit: DENARI, alias: DONNA },
  { id: 9, value: 9, power: 7, score: 3, suit: DENARI, alias: CAVALLO },
  { id: 10, value: 10, power: 8, score: 4, suit: DENARI, alias: RE },
  { id: 11, value: 1, power: 10, score: 11, suit: SPADE, alias: ASSO },
  { id: 12, value: 2, power: 1, score: 0, suit: SPADE },
  { id: 13, value: 3, power: 9, score: 10, suit: SPADE },
  { id: 14, value: 4, power: 2, score: 0, suit: SPADE },
  { id: 15, value: 5, power: 3, score: 0, suit: SPADE },
  { id: 16, value: 6, power: 4, score: 0, suit: SPADE },
  { id: 17, value: 7, power: 5, score: 0, suit: SPADE },
  { id: 18, value: 8, power: 6, score: 2, suit: SPADE, alias: DONNA },
  { id: 19, value: 9, power: 7, score: 3, suit: SPADE, alias: CAVALLO },
  { id: 20, value: 10, power: 8, score: 4, suit: SPADE, alias: RE },
  { id: 21, value: 1, power: 10, score: 11, suit: COPPE, alias: ASSO },
  { id: 22, value: 2, power: 1, score: 0, suit: COPPE },
  { id: 23, value: 3, power: 9, score: 10, suit: COPPE },
  { id: 24, value: 4, power: 2, score: 0, suit: COPPE },
  { id: 25, value: 5, power: 3, score: 0, suit: COPPE },
  { id: 26, value: 6, power: 4, score: 0, suit: COPPE },
  { id: 27, value: 7, power: 5, score: 0, suit: COPPE },
  { id: 28, value: 8, power: 6, score: 2, suit: COPPE, alias: DONNA },
  { id: 29, value: 9, power: 7, score: 3, suit: COPPE, alias: CAVALLO },
  { id: 30, value: 10, power: 8, score: 4, suit: COPPE, alias: RE },
  { id: 31, value: 1, power: 10, score: 11, suit: BASTONI, alias: ASSO },
  { id: 32, value: 2, power: 1, score: 0, suit: BASTONI },
  { id: 33, value: 3, power: 9, score: 10, suit: BASTONI },
  { id: 34, value: 4, power: 2, score: 0, suit: BASTONI },
  { id: 35, value: 5, power: 3, score: 0, suit: BASTONI },
  { id: 36, value: 6, power: 4, score: 0, suit: BASTONI },
  { id: 37, value: 7, power: 5, score: 0, suit: BASTONI },
  { id: 38, value: 8, power: 6, score: 2, suit: BASTONI, alias: DONNA },
  { id: 39, value: 9, power: 7, score: 3, suit: BASTONI, alias: CAVALLO },
  { id: 40, value: 10, power: 8, score: 4, suit: BASTONI, alias: RE },
];

export const INITIAL_POINTS_CONTROL: PointsControl = {
  [DENARI]: { heavyCardsPassed: 0, lightPointsPassed: 0 },
  [SPADE]: { heavyCardsPassed: 0, lightPointsPassed: 0 },
  [COPPE]: { heavyCardsPassed: 0, lightPointsPassed: 0 },
  [BASTONI]: { heavyCardsPassed: 0, lightPointsPassed: 0 },
};

export const INITIAL_GAME_STATE: GameState = {
  deck: INITIAL_DECK,
  briscolaCard: null,
  shownCards: [],
  cpuHand: [],
  cpuCollectedCards: [],
  userHand: [],
  userCollectedCards: [],
  pointsControl: INITIAL_POINTS_CONTROL,
  shouldUserGoFirst: true,
  isUserTurn: true,
  lastThrownUserCardId: null,
  scoreToBeat: null,
};
