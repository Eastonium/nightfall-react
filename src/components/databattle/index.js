import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Window } from  'components/window';
import { Grid } from './grid';

import spybotImage from 'assets/base/textures/spybots/Snaptrax S45.png';
import { Button } from 'components/button';

export const Databattle = React.memo(function DataBattle(props) {
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
					{' '}
				</Window>
				{/* <Button bold wrapperProps={{ css: styles.beginButton }}>Begin Databattle</Button> */}
				<Grid css={styles.grid} />
			</div>
		</Window>
	);
});

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
