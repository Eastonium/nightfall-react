import React, { useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { ConfigContext } from 'game';

const columns = 14;
const rows = 11;
const size = 32;
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

const objects = [
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
];
const objectMap = objects.reduce((map, object) => {
	const [column, row] = object.pos;
	return Object.assign(map, { [column + row * columns]: object })
}, []);

const programs = [
	{
		type: "base:dog_2",
		pos: [[3,1],[3,2],[3,3],[3,4]],
	},
	{
		type: "base:dog_2",
		pos: [[2,2]],
	},
	{
		type: "base:dog_2",
		pos: [[0,3]],
	},
	{
		type: "base:dog_2",
		pos: [[1,4]],
	},
	{
		type: "base:dog_2",
		pos: [[2,5]],
	},
	{
		type: "base:dog_2",
		pos: [[1,7]],
	},
];
const programMap = programs.reduce((map, program) => (
	program.pos.reduce((map, [column, row]) => (
		Object.assign(map, { [column + row * columns]: program })
	), map)
), []);

export const Grid = props => {
	const config = useContext(ConfigContext);

	return (
		<div {...props}>
			<svg width={columns * size} height={rows * size} css={styles.svg}>
				{[...Array(columns * rows)].map((_, i) => {
					const column = i % columns;
					const row = (i - column) / columns;
					return +cellState[i] ? <Tile key={i} {...{ row, column }} /> : null;
				})}
				{objects.map((object, i) => {
					const [packId, objectId] = object.type.split(":");
					const { icon } = config[packId].objects[objectId];
					const [column, row] = object.pos;
					return <image key={i} x={column * size} y={row * size} href={icon} />;
				})}
				{programs.map((program, i) => <Program key={i} {...{ program }} />)}
			</svg>
		</div>
	);
}

const Tile = ({ row, column }) => (
	<rect
		x={2 + column * size} y={2 + row * size}
		width={size - 4} height={size - 4}
		fill="none" stroke="#000"
	/>
);

const Program = ({ program }) => {
	const config = useContext(ConfigContext);

	const [packId, programId] = program.type.split(":");
	const { icon, color } = config[packId].programs[programId];
	const [headColumn, headRow] = program.pos[0];

	return <g>
		{program.pos
			.map(([column, row]) => column + row * columns).sort()
			.map(i => {
				const column = i % columns;
				const row = (i - column) / columns;
				return (<g key={i} transform={`translate(${column * size} ${row * size})`}>
					{column + 1 !== columns && programMap[i + 1] === program && (
						<path
							css={styles.connector(color)}
							d={`M${size / 2},${size / 2}h${size}`}
						/>
					)}
					{row + 1 !== rows && programMap[i + columns] === program && (
						<path
							css={styles.connector(color)}
							d={`M${size / 2},${size / 2}v${size}`}
						/>
					)}
					<rect x={2} y={2} width={size - 4} height={size - 4} fill={color} />
				</g>);
			})
		}
		<image x={headColumn * size} y={headRow * size} href={icon} />
	</g>;
};

const styles = {
	svg: css``,
	connector: color => css`
		fill: none;
		stroke: ${color};
		stroke-width: 8;
	`,
}