/** @jsx jsx */
import React, { useState, useEffect, useMemo } from "react";
import { css, jsx } from "@emotion/core";

import Fonts from "fonts";
import { Sector, gridUnitSize } from "./grid/sector";

const _ProgramInfo = ({ program }) => {
	const { name, desc, icon, color, speed, maxSize, currentSize, commands } = program;

	const [selectedCommand, setSelectedCommand] = useState(null);
	const selectCommandPerIndex = useMemo(
		() => commands?.map(command => () => setSelectedCommand(command)),
		[commands, setSelectedCommand],
	);
	useEffect(() => {
		setSelectedCommand(null);
	}, [program]);

	return (
		<div css={styles.container}>
			<div css={styles.basicInfoContainer}>
				{commands ? (
					<svg css={styles.icon}>
						<Sector {...{ icon, color }} />
					</svg>
				) : (
					<img src={icon} alt={name} css={styles.icon} style={{ background: color }} />
				)}
				{speed && <span>Move: {speed}</span>}
				{maxSize && <span>Max Size: {maxSize}</span>}
				{currentSize && <span>Current Size: {currentSize}</span>}
			</div>
			<span css={styles.h1}>{name}</span>
			<span css={styles.p}>{desc}</span>
			{commands && (
				<>
					<span css={styles.h2}>Commands</span>
					<div css={styles.commandContainer}>
						{commands.map((command, i) => (
							<button key={i} onClick={selectCommandPerIndex[i]}>
								{command.name}
							</button>
						))}
					</div>
					{selectedCommand && (
						<span css={styles.p}>
							{selectedCommand.name}:
							<br />
							{selectedCommand.desc || "<Command description not found>"}
						</span>
					)}
				</>
			)}
		</div>
	);
};
export const ProgramInfo = React.memo(_ProgramInfo);

const styles = {
	container: css`
		width: 120px;
		padding: 4px;
	`,
	basicInfoContainer: css`
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		height: ${gridUnitSize}px;
		margin-bottom: 6px;
	`,
	icon: css`
		width: ${gridUnitSize}px;
		height: ${gridUnitSize}px;
		margin-right: 6px;
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
		color: #ccc;
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
			background: #fff4;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}
	`,
};
