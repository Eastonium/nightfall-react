import React from 'react'; // eslint-disable-line no-unused-vars
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Map } from 'components/map';
import { WindowContainer } from  'components/window';
import { Databattle } from 'components/databattle';

import Configuration from 'assets/base/config.json';
const load = async () => {
	const programs = (await Promise.all(
		Configuration.programs.map(file => import(`assets/base/${file}.json`))
	)).reduce((programs, module) => Object.assign(programs, module.default), {});

	const icons = (await Promise.all(
		Object.keys(programs)
			.map(programKey => import(`assets/base/textures/grid/programs/${programKey}.png`))
	));
	Object.keys(programs).forEach((programKey, i) => programs[programKey].icon = icons[i].default);
	
	console.log(programs);
};
load();

export const Game = () => (
	<div css={styles.main}>
		<Map />
		<WindowContainer coverScreen>
			<Databattle x={40} y={30} />
		</WindowContainer>
	</div>
);

const styles = {
	main: css`
		height: 100%;
	`,
};
