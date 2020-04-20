import React, { useState, useMemo, useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Button } from 'components/button';
import { Window } from  'components/window';

import { PackConfigContext } from 'game';
import { ProgramInfo } from './programInfo';
import { Grid } from './grid';
import { Position } from './grid/position';

import spybotImage from 'assets/base/textures/spybots/Snaptrax S45.png';

const columns = 14;
const rows = 11;
export class GridPosition extends Position {
	constructor(pos) {
		super(pos, columns, rows);
	}
};

const cellState = (
	"01110000001110" +
	"11111000011111" +
	"11111000011111" +
	"11111000001111" +
	"11111001111111" +
	"11111111111111" +
	"11111110011111" +
	"11110000011111" +
	"11111000011111" +
	"11111000011111" +
	"01110000001110"
);

const cellStyle = (
	"00000000000000" +
	"00000000000000" +
	"00000000000000" +
	"00000001111111" +
	"11111110000001" +
	"10000000000001" +
	"10000001111111" +
	"11111110000000" +
	"00000000000000" +
	"00000000000000" +
	"00000000000000"
);

const mapObjects = [
	{
		type: "base:data_item",
		pos: [1, 2],
	},
	{
		type: "base:credits",
		pos: [1, 5],
	},
	{
		type: "base:credits",
		pos: [1, 8],
	},
	{
		type: "base:upload_zone",
		pos: [11, 1],
	},
	{
		type: "base:upload_zone",
		pos: [12, 1],
	},
	{
		type: "base:upload_zone",
		pos: [11, 9],
	},
	{
		type: "base:upload_zone",
		pos: [12, 9],
	},
].map(({ type, pos }) => ({ type, pos: new GridPosition(pos) }));

const programs = [
	{
		type: "base:dog_2",
		slug: [[3,1],[3,2],[3,3],[3,4]],
	},
	{
		type: "base:dog_2",
		slug: [[2,2]],
	},
	{
		type: "base:dog_2",
		slug: [[0,3]],
	},
	{
		type: "base:dog_2",
		slug: [[1,4]],
	},
	{
		type: "base:dog_2",
		slug: [[2,5]],
	},
	{
		type: "base:dog_2",
		slug: [[1,7]],
	},
].map(({ type, slug }) => ({ type, slug: slug.map(pos => new GridPosition(pos)) }));

export const DataBattleContext = React.createContext(null);

const _DataBattle = ({ id, ...props }) => {
	const packConfig = useContext(PackConfigContext);

	const [selectedProgram, setSelectedProgram] = useState(null);
	const selectedProgramInfo = useMemo(() => {
		if (!selectedProgram) return null;
		
		const [packId, programId] = selectedProgram.type.split(":");
		if (mapObjects.includes(selectedProgram)) return packConfig[packId].objects[programId];
		if (programs.includes(selectedProgram)) {
			return {
				...packConfig[packId].programs[programId],
				currentSize: selectedProgram.slug.length,
			};
		}

		return null;
	}, [/*mapObjects, programs, */packConfig, selectedProgram]);

	return (
		<Window
			title="databattle in progress"
			titleBarButtonProps={{ children: "log out" }}
			sectioned
			{...props}
		>
			<div css={styles.layoutContainer}>
				<Window title="spybot" sectioned>
					<img src={spybotImage} alt="spybot" style={{ display: "block" }} />
				</Window>
				<Window
					css={styles.programInfoWindow}
					title="program.info"
					sectioned
					postFooter={<Button color="red" fill bold>Undo</Button>}
				>
					{selectedProgramInfo ? <ProgramInfo program={selectedProgramInfo} /> : ''}
				</Window>
				{/* <Button bold wrapperProps={{ css: styles.beginButton }}>Begin Databattle</Button> */}
				<DataBattleContext.Provider value={{ id, columns, rows }}>
					<Grid
						css={styles.grid}
						{...{ cellState, cellStyle, mapObjects, programs, setSelectedProgram }}
						selectedProgramPosition={selectedProgram?.pos ?? selectedProgram?.slug?.[0]}
					/>
				</DataBattleContext.Provider>
			</div>
		</Window>
	);
};
export const DataBattle = React.memo(_DataBattle);

const styles = {
	layoutContainer: css`
		display: grid;
		grid-template: auto 1fr / auto 1fr;
		grid-gap: 4px;
		padding: 4px;
	`,
	programInfoWindow: css`
		grid-row: 2;
	`,
	beginButton: css`
		grid-row: 2;
		grid-column: 2;
		align-self: flex-end;
		justify-self: flex-start;
		z-index: 1;
	`,
	grid: css`
		grid-row: 1 / span 2;
		grid-column: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	`,
};
