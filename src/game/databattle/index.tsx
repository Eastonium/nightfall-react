/** @jsx jsx */
import { useState, useMemo, useContext, memo, createContext } from "react";
import { css, jsx } from "@emotion/core";

import { Button } from "ui/components/button";
import { Window } from "ui/components/window";

import { PackConfigContext } from "..";
import { ChitInfo } from "./components/chitInfo";
import { Grid } from "./grid";
import { Position } from "./grid/position";

import spybotImage from "assets/nightfall/textures/spybots/Snaptrax S45.png";

import { Program } from "./program";

const columns = 14;
const rows = 11;
export class GridPosition extends Position {
	constructor(pos) {
		super(pos, columns, rows);
	}
}

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
)
	.split("")
	.map(e => !!+e);

const cellStyle =
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
	"00000000000000";

const chits = [
	{
		type: "nightfall:data_item",
		pos: [1, 2],
	},
	{
		type: "nightfall:credits",
		pos: [1, 5],
	},
	{
		type: "nightfall:credits",
		pos: [1, 8],
	},
	{
		type: "nightfall:upload_zone",
		pos: [11, 1],
	},
	{
		type: "nightfall:upload_zone",
		pos: [12, 1],
	},
	{
		type: "nightfall:upload_zone",
		pos: [11, 9],
	},
	{
		type: "nightfall:upload_zone",
		pos: [12, 9],
	},
].map(({ type, pos }) => ({ type, pos: new GridPosition(pos) }));

const programs = [
	{
		type: "nightfall:dog_2",
		slug: [
			[3, 1],
			[3, 2],
			[3, 3],
			[3, 4],
		],
	},
	{
		type: "nightfall:dog_2",
		slug: [[2, 2]],
	},
	{
		type: "nightfall:dog_2",
		slug: [[0, 3]],
	},
	{
		type: "nightfall:dog_2",
		slug: [[1, 4]],
	},
	{
		type: "nightfall:dog_2",
		slug: [[2, 5]],
	},
	{
		type: "nightfall:dog_2",
		slug: [[1, 7]],
	},
].map(({ type, slug }) => ({ type, slug: slug.map(pos => new GridPosition(pos)) }));

export const DataBattleContext = createContext(null);

const _DataBattle = ({ id, ...props }) => {
	const packConfig = useContext(PackConfigContext);

	const cellEmptyState = useMemo(
		() => {
			const cellEmptyState = cellState.slice();
			programs.forEach(program =>
				program.slug.forEach(pos => (cellEmptyState[pos.sectorIndex] = false)),
			);
			return cellEmptyState;
		},
		[
			/*cellState, programs*/
		],
	);

	const [selectedChit, setSelectedChit] = useState(null);
	const selectedChitInfo = useMemo(() => {
		if (!selectedChit) return null;

		const [packId, chitId] = selectedChit.type.split(":");
		if (chits.includes(selectedChit))
			return { instance: selectedChit, ...packConfig[packId].chits[chitId] };
		if (programs.includes(selectedChit))
			return { instance: selectedChit, ...packConfig[packId].programs[chitId] };

		return null;
	}, [/*chits, programs, */ packConfig, selectedChit]);

	return (
		<Window
			title="databattle in progress"
			titleBarButtonProps={{ children: "log out" }}
			sectioned
			{...props}
		>
			<div css={styles.layoutContainer}>
				<DataBattleContext.Provider value={{ id, columns, rows }}>
					<Window title="spybot" sectioned>
						<img src={spybotImage} alt="spybot" css={{ display: "block" }} />
					</Window>
					<Window
						css={styles.chitInfoWindow}
						title="program.info"
						sectioned
						postFooter={
							<Button color="red" fill bold>
								Undo
							</Button>
						}
					>
						{selectedChitInfo ? <ChitInfo program={selectedChitInfo} /> : ""}
					</Window>
					{/* <Button bold wrapperProps={{ css: styles.beginButton }}>Begin Databattle</Button> */}
					<Grid
						css={styles.grid}
						{...{ cellEmptyState, chits, programs }}
						{...{ setSelectedChit, selectedChitInfo }}
					/>
				</DataBattleContext.Provider>
			</div>
		</Window>
	);
};
export const DataBattle = memo(_DataBattle);

const styles = {
	layoutContainer: css`
		display: grid;
		grid-template: auto 1fr / auto 1fr;
		grid-gap: 4px;
		padding: 4px;
	`,
	chitInfoWindow: css`
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
