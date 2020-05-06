import React, { useState, useEffect } from "react";

import { WindowContainer } from "ui/components/window";
import { Map } from "./map";
import { DataBattle } from "./databattle";

const loadConfig = async (packId) => {
	const config = await import(`assets/${packId}/config.json`);

	const [programData, chitData] = await Promise.all([
		Promise.all(config.programs.map(file => import(`assets/${packId}/${file}.json`))),
		Promise.all(config.chits.map(file => import(`assets/${packId}/${file}.json`))),
	]);

	const programs = programData.reduce(
		(programs, module: any) => Object.assign(programs, module.default),
		{},
	);
	const programIcons = await Promise.all(
		Object.keys(programs).map(key =>
			import(`assets/${packId}/textures/grid/programs/${key}.png`),
		),
	);
	Object.keys(programs).forEach((key, i) => (programs[key].icon = programIcons[i].default));

	const chits = chitData.reduce(
		(chits, module: any) => Object.assign(chits, module.default),
		{},
	);
	const chitIcons = await Promise.all(
		Object.keys(chits).map(key => import(`assets/${packId}/textures/grid/chits/${key}.png`)),
	);
	Object.keys(chits).forEach((key, i) => (chits[key].icon = chitIcons[i].default));

	return { programs, chits };
};

export const PackConfigContext = React.createContext(null);

export const Game = ({ packId }) => {
	const [config, setConfig] = useState({});

	const packLoaded = !!config[packId];
	useEffect(() => {
		if (packLoaded) return;
		loadConfig(packId).then(loadedConfig => {
			setConfig(config => ({ ...config, [packId]: loadedConfig }));
		});
	}, [packId, packLoaded]);

	if (!packLoaded) return <>Loading...</>;

	return (
		<PackConfigContext.Provider value={config}>
			<Map />
			<WindowContainer coverScreen>
				<DataBattle id={0} x={40} y={30} />
			</WindowContainer>
		</PackConfigContext.Provider>
	);
};
