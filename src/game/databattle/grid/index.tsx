import React, { useContext, useCallback, useMemo } from "react";

import { PackConfigContext } from "game/index";
import { DataBattleContext } from "../index";
import { Position } from "./position";
import {
	gridUnitSize,
	Segment,
	SegmentClipPath,
	CellSelectionIndicator,
	Tile,
} from "./components/segment";

interface GridProps extends React.HTMLProps<HTMLDivElement> {
	cellEmptyState: boolean[];
	chits: any[];
	programs: any[];
	setSelectedChit: unknown;
	selectedChitInfo: any;
}

export const Grid = ({
	cellEmptyState,
	chits,
	programs,
	setSelectedChit,
	selectedChitInfo,
	...props
}: GridProps) => {
	const { columns, rows } = useContext(DataBattleContext);

	const cellTrueEmptyState = useMemo(() => {
		const cellTrueEmptyState = cellEmptyState.slice();
		chits.forEach(chit => (cellTrueEmptyState[chit.pos.sectorIndex] = false));
		return cellTrueEmptyState;
	}, [chits, cellEmptyState]);

	const selectedChitPosition =
		selectedChitInfo?.instance?.pos ?? selectedChitInfo?.instance?.slug?.[0];

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
				{chits.map((chit, i) => (
					<Chit key={i} {...{ chit, setSelectedChit }} />
				))}
				<SegmentClipPath />
				{programs.map((program, i) => (
					<Program key={i} {...{ program, setSelectedChit }} />
				))}

				{selectedChitPosition && (
					<CellSelectionIndicator
						// The key makes it create a new element each time the selected sector changes
						// This way the the animation resets
						key={selectedChitPosition.sectorIndex}
						column={selectedChitPosition.column}
						row={selectedChitPosition.row}
					/>
				)}
			</svg>
		</div>
	);
};

const _Chit = ({ chit, setSelectedChit }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, chitId] = chit.type.split(":");
	const { icon } = packConfig[packId].chits[chitId];
	const { column, row } = chit.pos;

	const handleClick = useCallback(() => setSelectedChit(chit), [chit, setSelectedChit]);

	return (
		<image x={column * gridUnitSize} y={row * gridUnitSize} href={icon} onClick={handleClick} />
	);
};
const Chit = React.memo(_Chit);

const _Program = ({ program, setSelectedChit }) => {
	const packConfig = useContext(PackConfigContext);

	const [packId, chitId] = program.type.split(":");
	const { icon, color } = packConfig[packId].programs[chitId];

	const handleClick = useCallback(() => setSelectedChit(program), [program, setSelectedChit]);

	return (
		<g onClick={handleClick}>
			{program.slug.sort(Position.compare).map((pos, i, allPos) => {
				const { column, row } = pos;
				const posRight = pos.clone().right();
				const posDown = pos.clone().down();
				return (
					<Segment
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
