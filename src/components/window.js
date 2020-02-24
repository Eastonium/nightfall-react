import React, { useState, useEffect, useMemo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import classNames from 'classnames';

export const Window = ({
	size, resizable, children, postFooter,
	title, titleBarIcon, titleBarButtonProps,
}) => {
	const dynamicStyles = useMemo(() => ({
		// width: 650,
		// height: 420,
		resize: resizable ? "both" : "none",
	}), [size, resizable]);

	return (
		<div css={styles.window} style={dynamicStyles}>
			<div>
				<div css={styles.bar} className={classNames({ "has-icon": !!titleBarIcon })}>
					{titleBarIcon && <img {...titleBarIcon} />}{/* eslint-disable-line jsx-a11y/alt-text */}
					{title && <div className="title">{title}</div>}
					{titleBarButtonProps && (
						<div css={styles.barButtonContainer}>
							<button {...titleBarButtonProps} />
						</div>
					)}
				</div>
			</div>
			{children && <>
				<div css={styles.content} {...{ children }} />
				<div css={styles.footer} />
			</>}
			{postFooter && <div>{postFooter}</div>}
		</div>
	);
};

const styles = {
	window: css`
		position: relative;
		vertical-align: top;

		top: 50px;
		left: 50px;

		display: inline-flex;
		flex-direction: column;
		min-width: 126px;
		border: solid #000;
		border-width: 0 1px;

		> div {
			border-bottom: 1px solid #000;
		}
	`,
	bar: css`
		flex: 0 0 auto;
		height: 17px;
		border-width: 1px 0 0 1px;
		border-style: solid;
		border-image: linear-gradient(#EEE, #999) 1;
		padding: 0 6px 0 8px;
		background: linear-gradient(#DDD, #777);
		color: #000;

		&.has-icon {
			padding-left: 0;
		}
		
		> div {
			flex: 0 0 auto;
			display: inline-block;
			height: 15px;
			margin-top: -1px;
			border: 1px solid #DDD;
			border-top: 0;
			border-left-color: #555;
			background: linear-gradient(#52597D, #282E40);
			color: #FFF;
			overflow: hidden;
			white-space: nowrap;
			
			&.title {
				flex-basis: 90px;
				padding: 4px 30px 0 4px;
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
			padding: 1px 13px;
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
		padding: 2px;
		background: linear-gradient(#0008, transparent);
		box-shadow: inset 0 0 0 1px #777, inset 0 0 0 2px #999;
		`,
	footer: css`
		height: 5px;
		border-top: 2px solid #FFF;
		background: linear-gradient(90deg, #8A8A8A, #000);
	`,
};