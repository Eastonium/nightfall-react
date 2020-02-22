import React, { memo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import MapImage from 'assets/base/textures/maps/map.png';
import { Window } from './window';
import { Button } from './button';

export const Map = memo(function Map() {
	return (
		<div css={styles.map}>
			<Window title="test" titleBarButtonProps={{ children: "log out" }}>
				<Button>test</Button>
			</Window>
		</div>
	)
});
const styles = {
	map: css`
		height: 100%;
		background: url(${MapImage}) no-repeat;
	`,
}