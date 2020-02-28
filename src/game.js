import React from 'react'; // eslint-disable-line no-unused-vars
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Map } from 'components/map';

export const Game = () => (
	<div css={styles.main}>
		<Map />
	</div>
);

const styles = {
	main: css`
		height: 100%;
	`,
};
