import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import ProgramIcon from 'assets/base/textures/grid/programs/guard_dog.png';

const columns = 14;
const rows = 11;
const size = 32;
const cell_state = 
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
	"01110000001110";

const cell_style = 
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

const object_pos = 
	"              " +
	"           uu " +
	" d            " +
	"              " +
	"              " +
	" c            " +
	"              " +
	"              " +
	" c            " +
	"           uu " +
	"              ";
const object_key = {
	d: "data_item",
	c: "credits",
	u: "upload_zone"
}

const program_pos = 
	"              " +
	"   AA         " +
	"  B A         " +
	"C   A         " +
	" D  A         " +
	"  E           " +
	"              " +
	" F            " +
	"             G" +
	"             G" +
	"              ";
const program_keys = {
	A: {
		type: "guard_dog",
		path: [[3,1],[3,2],[3,3],[3,4],[3,5],[3,6]]
	}, B: {
		type: "guard_dog",
		path: [[2,2]]
	}, C: {
		type: "guard_dog",
		path: [[0,3]]
	}, D: {
		type: "guard_dog",
		path: [[1,4]]
	}, E: {
		type: "guard_dog",
		path: [[2,5]]
	}, F: {
		type: "guard_dog",
		path: [[1,7]]
	}, G: {
		type: "guard_dog",
		path: [[13,9],[13,8]]
	}
}

export const Grid = props => (
	<div {...props}>
		<svg width={columns * size} height={rows * size} css={styles.svg}>
			{[...Array(columns)].map((_, column) => [...Array(rows)].map((_, row) => {
				const i = (row * columns) + column;
				return (
					<g key={i} transform={`translate(${column * size} ${row * size})`}>
						{!!+cell_state[i] && <Tile />}
					</g>
				);
			}))}
		</svg>
	</div>
);

const Tile = () => (
	<rect x={2} y={2} width={size - 4} height={size - 4} fill="none" stroke="#000" />
);

const styles = {
	svg: css`
		
		box-shadow: 0 0 0 1px darkorange;
	`,
}