import React from 'react'; // eslint-disable-line no-unused-vars
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Map } from 'components/map';
import { WindowContainer } from  'components/window';
import { Databattle } from 'components/databattle';

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
