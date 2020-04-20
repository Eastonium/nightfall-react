/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';

import * as Fonts from 'fonts';
import { clearFix } from 'polished';

const _ProgramInfo = ({ program }) => {
	const { name, desc, icon, color, speed, maxSize, currentSize, commands } = program;
	
	const [selectedCommand, setSelectedCommand] = useState(null);
	useEffect(() => {
		setSelectedCommand(null);
	}, [program]);

	return <div css={styles.container}>
		<div css={clearFix()}>
			<img src={icon} alt={name} css={styles.icon} style={{ background: color }} />
			{speed && <>Move: {speed}<br /></>}
			{maxSize && <>Max Size: {maxSize}<br /></>}
			{currentSize && <>Current Size: {currentSize}</>}
		</div>
		<span css={styles.h1}>{name}</span>
		<span css={styles.p}>{desc}</span>
		{commands && <>
			<span css={styles.h2}>Commands</span>
			<div css={styles.commandContainer}>
				{commands.map(command => (
					<button onClick={() => setSelectedCommand(command)}>{command.name}</button>
				))}
			</div>
				{selectedCommand && (
					<span css={styles.p}>
						{selectedCommand.name}:
						<br />
						{selectedCommand.desc || "<Command description not found>"}
					</span>
				)}
		</>}
	</div>;
};
export const ProgramInfo = React.memo(_ProgramInfo);

const styles = {
	container: css`
		width: 120px;
		padding: 4px;
	`,
	icon: css`
		float: left;
		margin: 0 6px 6px 0;
	`,
	h1: css`
		display: block;
		${Fonts.O4b_25}
		margin-bottom: 2px;
	`,
	h2: css`
		display: block;
		${Fonts.O4b_25}
		margin-bottom: 2px;
		text-transform: uppercase;
		color: #CCC;
	`,
	p: css`
		display: block;
		text-transform: uppercase;
		margin: 0;
		margin-bottom: 8px;
	`,
	commandContainer: css`
		margin: 0 -4px 4px;

		button {
			display: block;
			width: 100%;
			line-height: 20px;
			text-transform: uppercase;
			background: #FFF4;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}
	`,
}