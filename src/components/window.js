import React, { useState, useEffect, useMemo, memo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import classNames from 'classnames';

export const Window = memo(function Window({
	size, resizable, children,
	title, titleBarIcon, titleBarButtonProps,
}) {
	const dynamicStyles = useMemo(() => ({
		width: 650,
		// height: 420,
		resize: resizable ? "both" : "none",
	}), [size, resizable]);

	return (
		<div css={styles.window} style={dynamicStyles}>
			<div css={styles.bar} className={classNames({ "has-icon": !!titleBarIcon })}>
				{titleBarIcon && <img {...titleBarIcon} />}{/* eslint-disable-line jsx-a11y/alt-text */}
				{title && <div className="title">{title}</div>}
				<hr />
				{titleBarButtonProps && <div><button {...titleBarButtonProps} /></div>}
			</div>
			{children && <>
				<div css={styles.content} {...{ children }} />
				<hr css={styles.footer} />
			</>}
		</div>
	);
});
const styles = {
	window: css`
		position: relative;
		vertical-align: top;

		top: 100px;
		left: 100px;

		display: flex;
		flex-direction: column;
		min-width: 126px;
		border: 1px solid #000;
		border-top: 0;
	`,
	bar: css`
		flex: 0 0 auto;
		display: flex;
		height: 17px;
		border-top: 1px solid rgba(255,255,255,0.66);
		border-left: 1px solid rgba(255,255,255,0.33);
		padding: 0 6px 0 8px;
		background: linear-gradient(#DFDFDF, #707070);
		color: #000;

		&.has-icon {
			padding-left: 0;
		}
		
		hr {
			flex: 1 0 16px;
			margin: 0;
			border: 0;
			padding: 0;
		}
		
		> div {
			flex: 0 0 auto;
			height: 15px;
			margin-top: -1px;
			border: 1px solid #D6D6D6;
			border-top: 0;
			border-left-color: #000;
			padding: 0 1px 1px 0;
			background: linear-gradient(#52597D, #282E40);
			color: #FFF;
			overflow: hidden;
			white-space: nowrap;
			
			&.title {
				flex-basis: 90px;
				padding: 2px 30px 2px 4px;
			}
		}
		
		button {
			flex: 0 0 auto;
			height: 12px;
			margin: 0 1px 1px;
			border: 1px solid #FFF;
			border-right-color: #787878;
			border-bottom-color: #787878;
			padding: 0 13px;
			box-shadow: 0 0 0 1px #000;
			background: linear-gradient(#FFF, #C6C6C6);
			text-shadow: 1px 1px #FFF;
			text-transform: uppercase;
			cursor: pointer;
		}
	`,
	content: css`
		flex: 1 1 auto;
		border: solid #000;
		border-width: 1px 0;
		padding: 2px;
		background: linear-gradient(rgba(0,0,0,0.5), transparent);
		box-shadow: inset 0 0 0 1px #787878, inset 0 0 0 2px #999;
		`,
	footer: css`
		height: 5px;
		margin: 0;
		border: 0;
		border-top: 2px solid #FFF;
		background: linear-gradient(90deg, #8A8A8A, #000);
	`,
};