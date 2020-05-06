/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { desaturate, darken } from "polished";

import * as Fonts from "ui/fonts";

const buttonColors = {
	blue: "#1348E7",
	cyan: "#0088CC",
	green: "#3cd515",
	red: "#F5042F",
};

const getGradientColors = (color, active) => {
	if (!active) color = desaturate(0.5, color);
	return [color, darken(0.8, color)];
};

const _Button = ({
	bold = false,
	color = buttonColors.blue,
	big = false,
	fill = false,
	children,
	wrapperProps = {},
	...props
}) => (
	<div css={styles.buttonWrapper(fill)} {...wrapperProps}>
		<button css={styles.primaryButton(bold, color, big)} {...props}>
			<span>{children}</span>
		</button>
	</div>
);
export const Button = Object.assign(_Button, { colors: buttonColors });

export const MetalButton = ({ dark, small, fill, wrapperProps, ...props }) => (
	<div css={styles.buttonWrapper(fill)} {...wrapperProps}>
		<button css={styles.metalButton(dark, small)} {...props} />
	</div>
);

const styles = {
	buttonWrapper: fill => css`
		display: ${fill ? "" : "inline-"}block;
	`,
	primaryButton: (bold, color, big) => css`
		${bold ? Fonts.O4b_25 : ""}
		width: 100%;
		border: 1px solid;
		border-image: linear-gradient(to bottom right, #fff, #aaa 10%, #222 85%) 1;
		padding: 1px;
		box-shadow: inset 0 0 0 1px #666;
		color: #fff;
		text-transform: ${bold ? "lowercase" : "uppercase"};

		> span {
			display: flex;
			justify-content: center;
			align-items: center;
			height: ${big ? 24 : 16}px;
			border: 1px solid;
			border-image: linear-gradient(to top left, #eee, #999 10%, #111 85%) 1;
			padding: 0 12px;
			background: linear-gradient(
				to bottom right,
				${getGradientColors(color, false).join(", ")}
			);
		}

		&:enabled {
			cursor: pointer;

			&:hover,
			&:focus {
				> span {
					background: linear-gradient(
						to bottom right,
						${getGradientColors(color, true).join(", ")}
					);
				}
			}
		}
		&:disabled > span {
			background: linear-gradient(to bottom right, #666, #222);
		}
	`,
	metalButton: (dark, small) => css`
		position: relative;
		${Fonts.Abstract};
		${small ? "font-size: 8px;" : ""}
		width: 100%;
		height: ${small ? "12px" : "20px"};
		padding: ${small ? "0 8px 1px 7px" : "0 10px 1px 9px"};
		border-width: 1px 0 0 1px;
		border-style: solid;
		border-image: linear-gradient(${dark ? "#68719C , #31384e" : "#EEE, #999"}) 1;
		${dark ? "color: #E0E2EB;" : "text-shadow: 0px 1px #FFFB;"}
		background: linear-gradient(${dark ? "#52597D, #282E40" : "#DDD, #777"});

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-width: 0 1px 1px 0;
			border-style: solid;
			border-image: linear-gradient(${dark ? "#444B69, #212635" : "#BBB, #555"}) 1;
		}

		&:enabled {
			cursor: pointer;

			&:hover, &:focus {
				border-image: linear-gradient(${dark ? "#334ED1 , #14286C" : "#FFF, #CDE1FE, #669EFF"}) 1;
				${dark ? "color: #e0e2eb;" : "text-shadow: 0px 1px #FFFB;"}
				background: linear-gradient(${dark ? "#273DAA, #102156" : "#ECFCFC, #76ABFC, #2674FF"});

				&::after {
					border-image: linear-gradient(${dark ? "#20348D, #0D1C49" : "#7BEAEA, #1E76FA, #0054E6"}) 1;
				}
			}
		}
		&:disabled {
			color: ${dark ? "#282E40" : "#777"};
			text-shadow: 0px 1px #FFF${dark ? 1 : 3};
		}
	`,
};
