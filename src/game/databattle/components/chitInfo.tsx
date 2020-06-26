/** @jsx jsx */
import { useState, useEffect, useMemo, Fragment, memo } from "react";
import { css, jsx } from "@emotion/core";

import Fonts from "ui/fonts";
import { Segment, gridUnitSize } from "../grid/components/segment";
import { Chit } from "../chit";
import { Program } from "../program";

interface ChitInfo {
	chit: Chit | Program;
}
const _ChitInfo = ({ chit }: ChitInfo) => {
	const programCommands = chit instanceof Program ? chit.config.commands : null;
	const [selectedCommand, setSelectedCommand] = useState(null);
	const selectCommandPerIndex = useMemo(
		() => programCommands?.map(command => () => setSelectedCommand(command)),
		[programCommands, setSelectedCommand],
	);
	useEffect(() => {
		setSelectedCommand(null);
	}, [chit]);

	return (
		<div css={styles.container}>
			<div css={styles.basicInfoContainer}>
				{chit instanceof Program ? (
					<Fragment>
						<svg css={styles.icon}>
							<Segment iconPath={chit.iconPath} color={chit.config.color} />
						</svg>
						<span>Move: {chit.config.speed}</span>
						<span>Max Size: {chit.config.maxSize}</span>
						<span>Current Size: {chit.slug.length}</span>
					</Fragment>
				) : (
					<img src={chit.iconPath} alt={chit.config.name} css={styles.icon} />
				)}
			</div>
			<span css={styles.h1}>{chit.config.name}</span>
			<span css={styles.p}>{chit.config.desc}</span>
			{chit instanceof Program && (
				<Fragment>
					<span css={styles.h2}>Commands</span>
					<div css={styles.commandContainer}>
						{programCommands.map((command, i) => (
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
				</Fragment>
			)}
		</div>
	);
};
export const ChitInfo = memo(_ChitInfo);

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
