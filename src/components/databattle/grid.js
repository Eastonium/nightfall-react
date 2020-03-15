import React, { useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { PackConfigContext } from 'game';
import { GridContext } from '.';

const size = 32;

export const Grid = ({ cellState, objects, programs, ...props }) => {
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
				{objects.map((object, i) => <MapObject key={i} {...{ object }} />)}
				{programs.map((program, i) => <Program key={i} {...{ program }} />)}
			</svg>
		</div>
	);
};

const Tile = ({ column, row }) => (
	<rect
		x={2 + column * size} y={2 + row * size}
		width={size - 4} height={size - 4}
		fill="none" stroke="#000"
	/>
);

const MapObject = ({ object }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, objectId] = object.type.split(":");
	const { icon } = packConfig[packId].objects[objectId];
	const { column, row } = object.pos;

	return <image x={column * size} y={row * size} href={icon} />;
};

const Program = ({ program }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, programId] = program.type.split(":");
	const { icon, color } = packConfig[packId].programs[programId];
	const { column: headColumn, row: headRow } = program.pos[0];

	return <g>
		{program.pos.sort((posA, posB) => posA.sectorIndex - posB.sectorIndex)
			.map((pos, _, allPos) => {
				const { sectorIndex, column, row } = pos;
				const posRight = pos.right();
				const posDown = pos.down();
				return (
					<Sector
						key={sectorIndex}
						{...{ column, row, color }}
						connectRight={posRight && allPos.find(posRight.equals)}
						connectDown={posDown && allPos.find(posDown.equals)}
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
};