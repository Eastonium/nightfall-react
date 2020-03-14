import React, { useContext, useMemo } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { PackConfigContext } from 'game';
import { GridContext } from '.';

const size = 32;

export const Grid = ({ cellState, objects, programs, ...props }) => {
	const packConfig = useContext(PackConfigContext);
	const { columns, rows } = useContext(GridContext);

	// const objectMap = useMemo(() => (
	// 	objects.reduce((map, object) => {
	// 		const [column, row] = object.pos;
	// 		return Object.assign(map, { [column + row * columns]: object })
	// 	}, [])
	// ), [objects, columns]);

	// const programMap = useMemo(() => (
	// 	programs.reduce((map, program) => (
	// 		program.pos.reduce((map, [column, row]) => (
	// 			Object.assign(map, { [column + row * columns]: program })
	// 		), map)
	// 	), [])
	// ), [programs, columns]);

	return (
		<div {...props}>
			<svg width={columns * size} height={rows * size} css={styles.svg}>
				{[...Array(columns * rows)].map((_, sectorIndex) => {
					const column = sectorIndex % columns;
					const row = Math.floor(sectorIndex / columns);
					return !!+cellState[sectorIndex] && <Tile key={sectorIndex} {...{ column, row }} />;
				})}
				{objects.map((object, i) => {
					const [packId, objectId] = object.type.split(":");
					const { icon } = packConfig[packId].objects[objectId];
					const [column, row] = object.pos;
					return <image key={i} x={column * size} y={row * size} href={icon} />;
				})}
				{programs.map((program, i) => <Program key={i} {...{ program }} />)}
			</svg>
		</div>
	);
}

const Tile = ({ column, row }) => (
	<rect
		x={2 + column * size} y={2 + row * size}
		width={size - 4} height={size - 4}
		fill="none" stroke="#000"
	/>
);

const Program = ({ program }) => {
	const packConfig = useContext(PackConfigContext);
	const { columns, rows } = useContext(GridContext);

	const [packId, programId] = program.type.split(":");
	const { icon, color } = packConfig[packId].programs[programId];
	const [headColumn, headRow] = program.pos[0];

	return <g>
		{program.pos
			.map(([column, row]) => column + row * columns).sort()
			.map((sectorIndex, _, allIndexes) => {
				const column = sectorIndex % columns;
				const row = Math.floor(sectorIndex / columns);
				return (
					<Sector
						key={sectorIndex}
						{...{ column, row, color }}
						connectRight={column + 1 !== columns && allIndexes.includes(sectorIndex + 1)}
						connectDown={row + 1 !== rows && allIndexes.includes(sectorIndex + columns)}
					/>
				);
			})
		}
		<image x={headColumn * size} y={headRow * size} href={icon} />
	</g>;
};

const Sector = ({ column, row, color, connectRight, connectDown }) => (
	<g transform={`translate(${column * size} ${row * size})`}>
		{connectRight && (
			<path css={styles.connector(color)} d={`M${size / 2},${size / 2}h${size}`} />
		)}
		{connectDown && (
			<path css={styles.connector(color)} d={`M${size / 2},${size / 2}v${size}`} />
		)}
		<rect x={2} y={2} width={size - 4} height={size - 4} fill={color} />
	</g>
);

const styles = {
	svg: css``,
	connector: color => css`
		fill: none;
		stroke: ${color};
		stroke-width: 8;
	`,
}