import React, { memo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import MapImage from 'assets/base/textures/maps/map.png';
import { Window } from './window';
import { Button, MetalButton } from './button';

export const Map = memo(function Map() {
	return (
		<div css={styles.map}>
			<Window
				title="test AV"
				titleBarButtonProps={{ children: "log out" }}
				postFooter={<MetalButton>Test start</MetalButton>}
			>
				<Button>test V</Button>
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