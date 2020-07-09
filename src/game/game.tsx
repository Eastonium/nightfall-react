import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { WindowContainer } from "ui/components/window";
import { Map } from "./map";
import { DataBattle, loadLevel, selectDatabattleIds } from "./databattle";
import { ChitConfig } from "./databattle/chit";
import { ProgramConfig } from "./databattle/program";
import { LevelDefinition } from "./databattle/level";

export interface PackConfig {
	chits?: ChitConfig[];
	programs?: ProgramConfig[];
	levels?: LevelDefinition[];
}

const GameConfig: { [key: string]: PackConfig } = {};
export const registerPack = (packId: string, packConfig: PackConfig) => {
	GameConfig[packId] = packConfig;
};
export const findChitConfig = (id: string) => {
	const [packId, chitId] = id.split(":");
	return GameConfig[packId]?.chits?.find(chit => chit.id === chitId);
};
export const findProgramConfig = (id: string) => {
	const [packId, programId] = id.split(":");
	return GameConfig[packId]?.programs?.find(program => program.id === programId);
};

export const Game = () => {
	useEffect(() => {
		GameConfig.nightfall.levels.forEach(level => loadLevel(level));
	}, []);

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
