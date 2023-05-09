import { createContext } from "react";

import { INITIAL_GAME_STATE } from "@/engine/constants";
import { Dispatchers, GameState, TypeOrNull } from "@/engine/models";

export const GameStateContext = createContext<GameState>(INITIAL_GAME_STATE);
export const GameStateDispatchersContext =
  createContext<TypeOrNull<Dispatchers>>(null);
