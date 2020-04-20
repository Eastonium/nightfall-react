import React, { useMemo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const ContentSection = props => (
	<div css={styles.contentSection} {...props} />
);

export const WindowContainer = ({ coverScreen, ...props}) => (
	<div css={styles.windowContainer(coverScreen)} {...props} />
);

/* eslint-disable jsx-a11y/alt-text */
export const Window = Object.assign(
	function Window({
		x = 0, y = 0, width, height,
		title, titleBarIcon, titleBarButtonProps, sectioned, children, postFooter,
		...props
	}) {
		const dynamicStyles = useMemo(() => ({
			[x > 0 ? 'top' : 'bottom']: Math.abs(x),
			[y > 0 ? 'left' : 'right']: Math.abs(y),
			width,
			height
		}), [x, y, width, height]);
		return (
			<div css={styles.window} style={dynamicStyles} className="Window" {...props}>
				<div>
					<div css={styles.bar(!!titleBarIcon)}>
						{titleBarIcon && <img {...titleBarIcon} />}
						{title && <div className="title">{title}</div>}
						{titleBarButtonProps && (
							<div css={styles.barButtonContainer}>
								<button {...titleBarButtonProps} />
							</div>
						)}
					</div>
				</div>
				{children != null && <>
					<div css={styles.content}>
						{sectioned
							? React.Children.map(children, child => <ContentSection children={child} />)
							: children}
					</div>
					<div css={styles.footer} />
				</>}
				{postFooter && <div>{postFooter}</div>}
			</div>
		);
	},
	{ Section: ContentSection },
);

const styles = {
	windowContainer: coverScreen => css`
		position: ${coverScreen ? 'fixed' : 'relative'};
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;

		> .Window {
			position: absolute;
		}
	`,
	window: css`
		vertical-align: top;

		display: inline-flex;
		flex-direction: column;
		min-width: 126px;
		border: solid #000;
		border-width: 0 1px;

		pointer-events: all;

		> div {
			border-bottom: 1px solid #000;
		}
	`,
	bar: hasIcon => css`
		flex: 0 0 auto;
		height: 17px;
		border-width: 1px 0 0 1px;
		border-style: solid;
		border-image: linear-gradient(#EEE, #999) 1;
		padding: 0 6px 0 8px;
		background: linear-gradient(#DDD, #777);
		color: #000;

		${hasIcon ? css`padding-left: 0;` : ''}

		> div {
			flex: 0 0 auto;
			display: inline-block;
			height: 15px;
			margin-top: -1px;
			border: 1px solid #DDD;
			border-top: 0;
			border-left-color: #555;
			background: linear-gradient(#282E40, #52597D);
			color: #FFF;
			overflow: hidden;
			white-space: nowrap;

			&.title {
				flex-basis: 90px;
				padding: 3px 30px 0 4px;
			}
		}
	`,
	barButtonContainer: css`
		float: right;
		margin-left: 16px;
		padding: 0 1px;

		button {
			height: 12px;
			border: 1px solid #FFF;
			border-right-color: #777;
			border-bottom-color: #777;
			padding: 0 13px;
			color: #000;
			text-shadow: 1px 1px #FFF;
			text-transform: uppercase;
			background: linear-gradient(#FFF, #BBB);
			box-shadow: 0 0 0 1px #0008;
			cursor: pointer;

			&:hover, &:focus {
				transform: translate(0, 1px);
			}
		}
	`,
	content: css`
		flex: 1 1 auto;
		display: flex;
		background: linear-gradient(#0008, transparent);
	`,
	contentSection: css`
		flex: 1 1 auto;
		margin: 1px;
		border: 1px solid;
		border-image: linear-gradient(to top left, #FFF, #BBB 10%, #444 70%) 1;
		box-shadow: 0 0 0 1px #777;
	`,
	footer: css`
		height: 5px;
		border-top: 2px solid #FFF;
		background: linear-gradient(90deg, #8A8A8A, #000);
	`,
};