import { createContext } from "react";

import { TypeOrNull } from "@/common/helpers/models";
import { INITIAL_GAME_STATE } from "@/engine/constants";
import { Dispatchers, GameState } from "@/engine/models";

export const GameStateContext = createContext<GameState>(INITIAL_GAME_STATE);
export const GameStateDispatchersContext =
  createContext<TypeOrNull<Dispatchers>>(null);
