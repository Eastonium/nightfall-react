import React, { useContext } from 'react';

import { PackConfigContext } from 'game';
import { DataBattleContext } from '..';
import { Position } from './position';
import { gridUnitSize, Sector, SectorClipPath, SectorSelectionIndicator, Tile } from './sector';

export const Grid = ({
	cellState, cellStyle, mapObjects, programs,
	selectedProgramPosition, setSelectedProgram,
	...props
}) => {
	const { columns, rows } = useContext(DataBattleContext);

	return (
		<div {...props}>
			<svg width={columns * gridUnitSize} height={rows * gridUnitSize}>
				{[...Array(columns * rows)].map((_, sectorIndex) => {
					const column = sectorIndex % columns;
					const row = Math.floor(sectorIndex / columns);
					return !!+cellState[sectorIndex]
						// TODO: find a better way to check if a program's slug occupies that space
						&& !programs.some(program => program.slug.some(
							pos => pos.column === column && pos.row === row
						))
						&& <Tile key={sectorIndex} {...{ column, row }} />;
				})}
				{mapObjects.map((mapObject, i) => (
					<MapObject key={i} {...{ mapObject, setSelectedProgram }} />
				))}
				<SectorClipPath />
				{programs.map((program, i) => (
					<Program key={i} {...{ program, setSelectedProgram }} />
				))}
				{selectedProgramPosition && <SectorSelectionIndicator
					// The key makes it create a new element each time the selected sector changes
					// This way the the animation resets
					key={selectedProgramPosition.sectorIndex}
					column={selectedProgramPosition.column}
					row={selectedProgramPosition.row}
				/>}
			</svg>
		</div>
	);
};

const MapObject = ({ mapObject, setSelectedProgram }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, objectId] = mapObject.type.split(":");
	const { icon } = packConfig[packId].objects[objectId];
	const { column, row } = mapObject.pos;

	return <image
		x={column * gridUnitSize} y={row * gridUnitSize}
		href={icon}
		onClick={() => setSelectedProgram(mapObject)}
	/>;
};

const Program = ({ program, setSelectedProgram }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, programId] = program.type.split(":");
	const { icon, color } = packConfig[packId].programs[programId];

	return <g onClick={() => setSelectedProgram(program)}>
		{program.slug.sort(Position.compare)
			.map((pos, i, allPos) => {
				const { column, row } = pos;
				const posRight = pos.clone().right();
				const posDown = pos.clone().down();
				return (
					<Sector
						key={i}
						{...{ column, row, color }}
						icon={i === 0 ? icon : null}
						connectRight={posRight && allPos.find(posRight.equals)}
						connectDown={posDown && allPos.find(posDown.equals)}
					/>
				);
			})
		}
	</g>;
};

