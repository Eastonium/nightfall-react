import React, { memo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import MapImage from 'assets/base/textures/maps/map.png';

export const Map = memo(function Map() {
	return (
		<div css={styles.map}>
			
		</div>
	)
});
const styles = {
	map: css`
		height: 100%;
		background: url(${MapImage}) no-repeat;
	`,
}