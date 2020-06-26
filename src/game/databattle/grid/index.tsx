import React, { useContext, useCallback, Dispatch, SetStateAction } from "react";

import { DataBattleContext } from "../index";
import { Position } from "./position";
import {
	gridUnitSize,
	Segment,
	SegmentClipPath,
	CellSelectionIndicator,
	Tile,
} from "./components/segment";
import { Chit as IChit } from "../chit";
import { Program as IProgram } from "../program";

interface GridProps extends React.HTMLProps<HTMLDivElement> {
	cellVoidState: boolean[];
	chits: IChit[];
	programs: IProgram[];
	selectedChit: IChit | IProgram;
	setSelectedChit: Dispatch<SetStateAction<IChit | IProgram>>;
}
export const Grid = ({
	cellVoidState,
	chits,
	programs,
	selectedChit,
	setSelectedChit,
	...props
}: GridProps) => {
	const { columns, rows } = useContext(DataBattleContext);

	const selectedChitPosition =
		selectedChit instanceof IProgram ? selectedChit.slug[0] : selectedChit.pos;

	return (
		<div {...props}>
			<svg width={columns * gridUnitSize} height={rows * gridUnitSize}>
				{cellVoidState.map(
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

interface ChitProps {
	chit: IChit;
	setSelectedChit: Dispatch<SetStateAction<IChit>>;
}
const _Chit = ({ chit, setSelectedChit }: ChitProps) => {
	const { column, row } = chit.pos;

	const handleClick = useCallback(() => setSelectedChit(chit), [chit, setSelectedChit]);

	return (
		<image
			x={column * gridUnitSize}
			y={row * gridUnitSize}
			href={chit.iconPath}
			onClick={handleClick}
		/>
	);
};
const Chit = React.memo(_Chit);

interface ProgramProps {
	program: IProgram;
	setSelectedChit: Dispatch<SetStateAction<IProgram>>;
}
const _Program = ({ program, setSelectedChit }: ProgramProps) => {
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
						{...{ column, row }}
						color={program.config.color}
						iconPath={i === 0 ? program.iconPath : null}
						connectRight={posRight && allPos.find(posRight.equals) != null}
						connectDown={posDown && allPos.find(posDown.equals) != null}
					/>
				);
			})}
		</g>
	);
};
const Program = React.memo(_Program);
