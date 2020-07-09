import { createSlice } from "redux-dogma";
import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { selectSelectorProps } from "utils";

import { Chit } from "./chit";
import { Program } from "./program";
import { LevelDefinition } from "./level";
import { Position } from "./grid/position";
import { findProgramConfig, findChitConfig } from "game/game";

export { DataBattle, DataBattleIdContext } from "./databattle";

type DataBattle = {
	id: number;
	grid: {
		shape: "square"; // | "hexagon";
		width: number;
		height: number;
	};
	cellVoidState: boolean[];
	cellStyle: {
		map: string;
		key: {
			[key: string]: string;
		};
	};
	chits: Chit[];
	programs: Program[];
};
const initialState = (): DataBattle[] => [];

export const databattleSlice = createSlice<DataBattle[]>("databattle", initialState());

/// ACTIONS ///

export const loadLevel = databattleSlice.createAction<LevelDefinition>(
	"loadLevel",
	(draft, { grid, cellVoidState, cellStyle, chits, programs }) => {
		draft.push({
			id: draft.length ? draft[draft.length - 1].id + 1 : 0,
			grid,
			cellVoidState: cellVoidState
				.join("")
				.split("")
				.map(char => char !== " "),
			cellStyle: { ...cellStyle, map: cellStyle.map.join("") },
			chits: chits.map(({ id, pos, ...mods }) => {
				const config = findChitConfig(id);
				if (!config) throw Error(`Could not find chit config for id: ${id}`);

				return new Chit(new Position(pos, grid.width, grid.height), config, mods);
			}),
			programs: programs.map(({ id, slug, ...mods }) => {
				const config = findProgramConfig(id);
				if (!config) throw Error(`Could not find program config for id: ${id}`);

				return new Program(
					slug.map(pos => new Position(pos, grid.width, grid.height)),
					config,
					mods,
				);
			}),
		});
	},
);

/// SELECTORS ///

const sliceSelector = databattleSlice.selectState();

export const selectDatabattleIds = createSelector<any, DataBattle[], number[]>(
	[sliceSelector],
	databattles => databattles.map(databattle => databattle.id),
);
export const selectDatabattle = createCachedSelector<any, number, number, DataBattle[], DataBattle>(
	[selectSelectorProps, sliceSelector],
	(id, databattles) => databattles.find(databattle => databattle.id === id),
)(selectSelectorProps);
