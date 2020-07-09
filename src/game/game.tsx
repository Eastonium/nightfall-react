import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { WindowContainer } from "ui/components/window";
import { Map } from "./map";
import { DataBattle, loadLevel, selectDatabattleIds } from "./databattle";
import { ChitConfig } from "./databattle/chit";
import { ProgramConfig } from "./databattle/program";
import { LevelDefinition } from "./databattle/level";

import nightfallPackConfig from 'packs/nightfall';

export interface PackConfig {
	id: string;
	chits?: ChitConfig[];
	programs?: ProgramConfig[];
	levels?: LevelDefinition[];
}

const gameConfig: { [key: string]: PackConfig } = { ...nightfallPackConfig };
// export const registerPack = (packId: string, packConfig: PackConfig) => {
// 	gameConfig[packId] = packConfig;
// };
export const findChitConfig = (id: string) => {
	const [packId, chitId] = id.split(":");
	return gameConfig[packId]?.chits?.find(chit => chit.id === chitId);
};
export const findProgramConfig = (id: string) => {
	const [packId, programId] = id.split(":");
	return gameConfig[packId]?.programs?.find(program => program.id === programId);
};

export const Game = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		gameConfig.nightfall.levels.forEach(level => dispatch(loadLevel(level)));
	}, [dispatch]);

	const databattleIds = useSelector(selectDatabattleIds);

	return (
		<>
			<Map />
			<WindowContainer coverScreen>
				{databattleIds.map((id, i) => (
					<DataBattle id={id} x={30 + 10 * i} y={30 + 10 * 1} />
				))}
			</WindowContainer>
		</>
	);
};
