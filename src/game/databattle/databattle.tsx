/** @jsx jsx */
import { useState, memo, createContext } from "react";
import { css, jsx } from "@emotion/core";

import { useSelectorWithProps } from "utils";
import { Button } from "ui/components/button";
import { Window, WindowProps } from "ui/components/window";

import { ChitInfo } from "./chitInfo";
import { Grid } from "./grid";

import spybotImage from "packs/nightfall/textures/spybots/Snaptrax S45.png";
import { Chit } from "./chit";
import { Program } from "./program";
import { selectDatabattle } from ".";

export const DataBattleIdContext = createContext<number>(null);

interface DataBattleProps extends WindowProps {
	id: any;
}
const _DataBattle = ({ id, ...props }: DataBattleProps) => {
	const [selectedChit, setSelectedChit] = useState<Chit | Program>(null);

	const { cellVoidState, chits, programs } = useSelectorWithProps(selectDatabattle, id);

	return (
		<Window
			title="databattle in progress"
			titleBarButtonProps={{ children: "log out" }}
			sectioned
			{...props}
		>
			<div css={styles.layoutContainer}>
				<DataBattleIdContext.Provider value={id}>
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
						{selectedChit ? <ChitInfo chit={selectedChit} /> : ""}
					</Window>
					{/* <Button bold wrapperProps={{ css: styles.beginButton }}>Begin Databattle</Button> */}
					<Grid
						css={styles.grid}
						{...{ cellVoidState, chits, programs, selectedChit, setSelectedChit }}
					/>
				</DataBattleIdContext.Provider>
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
