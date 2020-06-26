import React, { useState } from "react";

import { WindowContainer } from "ui/components/window";
import { Map } from "./map";
import { DataBattle } from "./databattle";
import { ChitConfig } from "./databattle/chit";
import { ProgramConfig } from "./databattle/program";

import nightfallPackConfig from "assets/nightfall";

interface GameConfig {
	[key: string]: PackConfig;
}
export interface PackConfig {
	chits?: ChitConfig[];
	programs?: ProgramConfig[];
}

export const GameConfigContext = React.createContext<GameConfig>(null);

interface GameProps {
	packId: string;
}
export const Game = ({ packId }: GameProps) => {
	const [config, setConfig] = useState<GameConfig>({ nightfall: nightfallPackConfig });

	return (
		<GameConfigContext.Provider value={config}>
			<Map />
			<WindowContainer coverScreen>
				<DataBattle id={0} x={40} y={30} />
			</WindowContainer>
		</GameConfigContext.Provider>
	);
};
