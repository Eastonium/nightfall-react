/** @jsx jsx */
import { memo } from "react";
import { css, jsx } from "@emotion/core";

import MapImage from "assets/nightfall/textures/maps/map.png";

const _Map = () => <div css={styles.map}></div>;
export const Map = memo(_Map);

const styles = {
	map: css`
		height: 100%;
		background: url(${MapImage}) no-repeat;
	`,
};
