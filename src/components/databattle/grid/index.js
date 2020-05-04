import React, { useContext, useCallback, useMemo } from "react";

import { PackConfigContext } from "game";
import { DataBattleContext } from "..";
import { Position } from "./position";
import { gridUnitSize, Sector, SectorClipPath, SectorSelectionIndicator, Tile } from "./sector";

export const Grid = ({
	cellState,
	cellStyle,
	mapObjects,
	programs,
	setSelectedProgram,
	selectedProgramInfo,
	...props
}) => {
	const { columns, rows } = useContext(DataBattleContext);

	const cellEmptyState = useMemo(() => {
		const cellEmptyState = cellState.slice();
		programs.forEach(program =>
			program.slug.forEach(pos => (cellEmptyState[pos.sectorIndex] = false)),
		);
		return cellEmptyState;
	}, [cellState, programs]);

	const selectedProgramPosition =
		selectedProgramInfo?.instance?.pos ?? selectedProgramInfo?.instance?.slug?.[0];

	return (
		<div {...props}>
			<svg width={columns * gridUnitSize} height={rows * gridUnitSize}>
				{cellEmptyState.map(
					(isEmpty, sectorIndex) =>
						isEmpty && (
							<Tile
								key={sectorIndex}
								column={sectorIndex % columns}
								row={Math.floor(sectorIndex / columns)}
							/>
						),
				)}
				{mapObjects.map((mapObject, i) => (
					<MapObject key={i} {...{ mapObject, setSelectedProgram }} />
				))}
				<SectorClipPath />
				{programs.map((program, i) => (
					<Program key={i} {...{ program, setSelectedProgram }} />
				))}
				{selectedProgramPosition && (
					<SectorSelectionIndicator
						// The key makes it create a new element each time the selected sector changes
						// This way the the animation resets
						key={selectedProgramPosition.sectorIndex}
						column={selectedProgramPosition.column}
						row={selectedProgramPosition.row}
					/>
				)}
			</svg>
		</div>
	);
};

const _MapObject = ({ mapObject, setSelectedProgram }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, objectId] = mapObject.type.split(":");
	const { icon } = packConfig[packId].objects[objectId];
	const { column, row } = mapObject.pos;

	const handleClick = useCallback(() => setSelectedProgram(mapObject), [
		mapObject,
		setSelectedProgram,
	]);

	return (
		<image x={column * gridUnitSize} y={row * gridUnitSize} href={icon} onClick={handleClick} />
	);
};
const MapObject = React.memo(_MapObject);

const _Program = ({ program, setSelectedProgram }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, programId] = program.type.split(":");
	const { icon, color } = packConfig[packId].programs[programId];

	const handleClick = useCallback(() => setSelectedProgram(program), [
		program,
		setSelectedProgram,
	]);

	return (
		<g onClick={handleClick}>
			{program.slug.sort(Position.compare).map((pos, i, allPos) => {
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
			})}
		</g>
	);
};
const Program = React.memo(_Program);
