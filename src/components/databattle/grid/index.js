import React, { useContext, useCallback } from 'react';
/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';

import { getElementPosition } from 'utils';

import { PackConfigContext } from 'game';
import { GridPosition, GridContext } from '..';
import { Position } from './position';

const size = 32;

export const Grid = ({
	cellState, cellStyle, mapObjects, programs,
	gridFocusPosition, setGridFocusPosition,
	...props
}) => {
	const { columns, rows } = useContext(GridContext);

	const handleSvgClick = useCallback(event => {
		const { x: svgX, y: svgY } = getElementPosition(event.currentTarget);
		const clickedSector = new GridPosition([
			Math.floor((event.clientX - svgX) / size),
			Math.floor((event.clientY - svgY) / size),
		]);
		setGridFocusPosition(clickedSector);
	}, [setGridFocusPosition]);

	return (
		<div {...props}>
			<svg css={styles.svg} width={columns * size} height={rows * size} onClick={handleSvgClick}>
				{[...Array(columns * rows)].map((_, sectorIndex) => {
					const column = sectorIndex % columns;
					const row = Math.floor(sectorIndex / columns);
					return !!+cellState[sectorIndex] && <Tile key={sectorIndex} {...{ column, row }} />;
				})}
				{mapObjects.map((mapObject, i) => <MapObject key={i} {...{ mapObject }} />)}
				{programs.map((program, i) => <Program key={i} {...{ program }} />)}
				{gridFocusPosition && <rect
					// The key makes it create a new element each time the selected sector changes
					// This way the the animation resets
					key={gridFocusPosition.sectorIndex}
					css={styles.focusIndicator}
					x={2 + gridFocusPosition.column * size} y={2 + gridFocusPosition.row * size}
					width={size - 4} height={size - 4}
				/>}
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

const MapObject = ({ mapObject }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, objectId] = mapObject.type.split(":");
	const { icon } = packConfig[packId].objects[objectId];
	const { column, row } = mapObject.pos;

	return <image x={column * size} y={row * size} href={icon} />;
};

const Program = ({ program }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, programId] = program.type.split(":");
	const { icon, color } = packConfig[packId].programs[programId];
	const { column: headColumn, row: headRow } = program.slug[0];

	return <g>
		{program.slug.sort(Position.compare)
			.map((pos, i, allPos) => {
				const { column, row } = pos;
				const posRight = pos.clone().right();
				const posDown = pos.clone().down();
				return (
					<Sector
						key={i}
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
	focusIndicator: css`
		fill: none;
		stroke: #FFF;
		stroke-width: 2;
		animation: 530ms infinite ${keyframes`to { stroke: transparent; }`};
	`,
};