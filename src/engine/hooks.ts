import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

import { BUFFERING_TIME } from "@/common/helpers/enums";
import { evaluateFirstCard, evaluateResponseCard } from "@/engine/algorithms";
import { INITIAL_GAME_STATE } from "@/engine/constants";
import {
  GameStateContext,
  GameStateDispatchersContext,
} from "@/engine/contexts";
import { ACTION, PLAYER } from "@/engine/enums";
import { CardData, Dispatchers, GameState, TypeOrNull } from "@/engine/models";
import { gameStateReducer } from "@/engine/reducers";
import { getPlayerScoredPoints } from "@/engine/utilities";

const {
  GIVE_CARDS,
  START_NEW_GAME,
  PLAY_CARD,
  EVALUATE_PLAY,
  START_NEW_ROUND,
} = ACTION;

export const useGameStateContext = (): GameState =>
  useContext(GameStateContext);
export const useDispatchersContext = (): TypeOrNull<Dispatchers> =>
  useContext(GameStateDispatchersContext);

export const useGameControl = () => {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    INITIAL_GAME_STATE
  );
  const { deck, shownCards, cpuHand, userHand, isUserTurn, scoreToBeat } =
    gameState;
  const hasGameOrRoundStarted = useMemo(() => deck.length < 40, [deck.length]);
  const isRoundOver = useMemo(
    () => deck.length === 0 && cpuHand.length === 0 && userHand.length === 0,
    [cpuHand.length, deck.length, userHand.length]
  );
  const isGameOver = useMemo(
    () => isRoundOver && scoreToBeat,
    [isRoundOver, scoreToBeat]
  );
  const shouldUserPlay = useMemo(
    () => hasGameOrRoundStarted && isUserTurn && shownCards.length < 2,
    [hasGameOrRoundStarted, isUserTurn, shownCards.length]
  );

  const giveCards = useCallback((amount = 2) => {
    dispatch({ type: GIVE_CARDS, amount });
  }, []);

  const startNewGame = useCallback(() => {
    dispatch({ type: START_NEW_GAME });
    giveCards(6);
  }, [giveCards]);

  const evaluatePlay = useCallback(() => {
    dispatch({ type: EVALUATE_PLAY });
  }, []);

  const playCard = useCallback((card: TypeOrNull<CardData>, player: PLAYER) => {
    if (!card) throw new Error("No card can be played");
    dispatch({ type: PLAY_CARD, card, player });
  }, []);

  const startNewRound = useCallback(
    (scoreToBeat: number) => {
      dispatch({ type: START_NEW_ROUND, scoreToBeat });
      giveCards(6);
    },
    [giveCards]
  );

  useEffect(() => {
    if (shownCards.length < 2) return;
    const evaluatePlayTimeout = setTimeout(() => {
      evaluatePlay();
      giveCards();
    }, BUFFERING_TIME.ENGINE_EVALUATION);

    return () => {
      clearTimeout(evaluatePlayTimeout);
    };
  }, [evaluatePlay, giveCards, shownCards.length]);

  return {
    gameState,
    hasGameOrRoundStarted,
    isRoundOver,
    isGameOver,
    shouldUserPlay,
    dispatchers: { startNewGame, playCard, startNewRound },
  };
};

export const useCpuBrain = () => {
  const {
    cpuHand: cardsInHand,
    isUserTurn,
    briscolaCard,
    shownCards,
    deck,
    pointsControl,
  } = useGameStateContext();
  const dispatchers = useDispatchersContext();

  const timeoutRef = useRef<TypeOrNull<ReturnType<typeof setTimeout>>>(null);

  const isThinking = useMemo(
    () => !isUserTurn && shownCards.length < 2 && cardsInHand.length !== 0,
    [cardsInHand.length, isUserTurn, shownCards.length]
  );
  const shouldMakeAMove = useMemo(
    () =>
      !isUserTurn &&
      (deck.length ? cardsInHand.length === 3 : cardsInHand.length !== 0),
    [deck.length, cardsInHand.length, isUserTurn]
  );
  const makeAMove = useCallback(
    () =>
      (timeoutRef.current = setTimeout(() => {
        if (shownCards.length)
          dispatchers?.playCard(
            evaluateResponseCard(
              cardsInHand,
              shownCards[0],
              briscolaCard?.suit
            ),
            PLAYER.CPU
          );
        else
          dispatchers?.playCard(
            evaluateFirstCard(cardsInHand, pointsControl, briscolaCard?.suit) ||
              null,
            PLAYER.CPU
          );
      }, BUFFERING_TIME.CPU_MOVE)),
    [briscolaCard?.suit, cardsInHand, dispatchers, pointsControl, shownCards]
  );

  useEffect(() => {
    if (!shouldMakeAMove) return;

    makeAMove();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shouldMakeAMove, makeAMove]);

  return {
    isThinking,
  };
};

export const useGameStats = () => {
  const { cpuCollectedCards, userCollectedCards, scoreToBeat } =
    useGameStateContext();

  const cpuScoredPoints = useMemo(
    () => getPlayerScoredPoints(cpuCollectedCards),
    [cpuCollectedCards]
  );
  const userScoredPoints = useMemo(
    () => getPlayerScoredPoints(userCollectedCards),
    [userCollectedCards]
  );

  const isDraw = useMemo(
    () => cpuScoredPoints === userScoredPoints,
    [cpuScoredPoints, userScoredPoints]
  );
  const didUserWinRound = useMemo(
    () => userScoredPoints > cpuScoredPoints,
    [cpuScoredPoints, userScoredPoints]
  );
  const didUserWinGame = useMemo(
    () => userScoredPoints > (scoreToBeat || 0),
    [scoreToBeat, userScoredPoints]
  );

  const isGameOver = useMemo(() => !!scoreToBeat, [scoreToBeat]);

  return {
    cpuScoredPoints,
    userScoredPoints,
    isDraw,
    didUserWinRound,
    didUserWinGame,
    isGameOver,
  };
};
