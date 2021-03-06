import { createSlice } from "redux-dogma";

import { databattleSlice } from "./databattle";

export const gameSlice = createSlice("game").addSlice(databattleSlice);

export { findChitConfig, findProgramConfig, Game } from "./game";
export type { PackConfig } from "./game";
