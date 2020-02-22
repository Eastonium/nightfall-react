import React, { memo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Color from 'color';

const buttonColors = {
	blue: "#053FF4",
	cyan: "#09C0FD",
	green: "#58A445",
	red: "#F5042F",
}

const getGradientColors = (color, active) => [
	Color(color).desaturate(active ? 0 : 0.65).hex(),
	Color(color).desaturate(active ? 0 : 0.65).darken(0.8).hex(),
];

export const Button = Object.assign(
	memo(function Button({ color = buttonColors.blue, children, ...props }) {
		return <button css={styles.button(color)} {...props}><span {...{ children }} /></button>
	}),
	{ colors: buttonColors },
);
const styles = {
	button: color => css`
		border: 1px solid;
		border-image: linear-gradient(135deg, #BBB, #000) 1;
		padding: 1px;
		box-shadow: inset 0 0 0 1px #444;
		color: #FFF;

		&:enabled {
			cursor: pointer;

			> span {
				background: linear-gradient(165deg, ${getGradientColors(color, false).join(", ")});
			}

			&:hover, &:focus {
				> span {
					background: linear-gradient(165deg, ${getGradientColors(color, true).join(", ")});
				}
			}
		}
	
		> span {
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid;
			border-image: linear-gradient(-45deg, #AAA, #000) 1;
			padding: 1px 12px;
			background: linear-gradient(165deg, #666, #222);
		}
	`,
};