import React, { useState, useEffect } from 'react';

import { Map } from 'components/map';
import { WindowContainer } from  'components/window';
import { Databattle } from 'components/databattle';

const loadConfig = async packId => {
	const config = await import(`assets/${packId}/config.json`);

	const [programData, objectData] = await Promise.all([
		Promise.all(config.programs.map(file => import(`assets/${packId}/${file}.json`))),
		Promise.all(config.objects.map(file => import(`assets/${packId}/${file}.json`))),
	]);

	const programs = programData
		.reduce((programs, module) => Object.assign(programs, module.default), {});
	const programIcons = await Promise.all(
		Object.keys(programs)
			.map(key => import(`assets/${packId}/textures/grid/programs/${key}.png`))
	);
	Object.keys(programs).forEach((key, i) => programs[key].icon = programIcons[i].default);

	const objects = objectData
		.reduce((objects, module) => Object.assign(objects, module.default), {});
	const objectIcons = await Promise.all(
		Object.keys(objects)
			.map(key => import(`assets/${packId}/textures/grid/objects/${key}.png`))
	);
	Object.keys(objects).forEach((key, i) => objects[key].icon = objectIcons[i].default);
	
	return { programs, objects };
};

export const ConfigContext = React.createContext(null);

export const Game = ({ packId }) => {
	const [config, setConfig] = useState({});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (config[packId]) return;
		loadConfig(packId).then(loadedConfig => {
			setConfig({ ...config, [packId]: loadedConfig });
			setLoading(false);
		});
	}, [packId, config]);

	if (loading) return "Loading...";
	return (
		<ConfigContext.Provider value={config}>
			<Map />
			<WindowContainer coverScreen>
				<Databattle x={40} y={30} />
			</WindowContainer>
		</ConfigContext.Provider>
	);
}