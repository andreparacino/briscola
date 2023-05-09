import { ACTION } from "@/engine/enums";
import {
  handleEvaluatePlay,
  handleGiveCards,
  handlePlayCard,
  handleStartNewGame,
  handleStartNewRound,
} from "@/engine/handlers";
import { Action, GameState } from "@/engine/models";

const {
  GIVE_CARDS,
  START_NEW_GAME,
  PLAY_CARD,
  EVALUATE_PLAY,
  START_NEW_ROUND,
} = ACTION;

export const gameStateReducer = (
  state: GameState,
  action: Action
): GameState => {
  const { cpuHand, userHand, shouldUserGoFirst } = state;
  switch (action.type) {
    case START_NEW_GAME: {
      return handleStartNewGame();
    }
    case START_NEW_ROUND: {
      return handleStartNewRound({
        oldState: state,
        scoreToBeat: action.scoreToBeat,
        shouldUserGoFirst,
      });
    }
    case GIVE_CARDS: {
      return handleGiveCards({
        oldState: state,
        amount: action.amount,
        cpuHand,
        userHand,
      });
    }
    case PLAY_CARD: {
      return handlePlayCard({
        oldState: state,
        player: action.player,
        cardId: action.card.id,
      });
    }
    case EVALUATE_PLAY: {
      return handleEvaluatePlay(state);
    }
    default:
      throw new Error("Invalid action type");
  }
};
