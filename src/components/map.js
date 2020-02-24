import React, { memo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import MapImage from 'assets/base/textures/maps/map.png';
import { Window } from './window';
import { Button, MetalButton } from './button';

export const Map = memo(function Map() {
	return (
		<div css={styles.map}>
			<Button bold>Continue with Databattle</Button>
			<br />
			<Window
				title="databattle.result"
				// titleBarButtonProps={{ children: "log out" }}
				postFooter={<Button>start</Button>}
			>
				<Window.Section>
					<br />
					<br />
					<br />
				</Window.Section>
				{/* <Button bold fill>Continue with Databattle</Button> */}
				<Button bold fill color={Button.colors.cyan}>Log Out</Button>
				<Button bold fill color={Button.colors.green}>Log Out</Button>
				<Button bold fill color={Button.colors.red}>Log Out</Button>
			</Window>
		</div>
	)
});
const styles = {
	map: css`
		height: 100%;
		background: url(${MapImage}) no-repeat;
	`,
}