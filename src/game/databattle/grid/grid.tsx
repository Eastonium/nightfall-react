import React, { useContext, useCallback, Dispatch, SetStateAction } from "react";
import { useSelectorWithProps } from "utils";

import { DataBattleIdContext, selectDatabattle } from "../index";
import { Position } from "./position";
import {
	gridUnitSize,
	Segment,
	SegmentClipPath,
	CellSelectionIndicator,
	Tile,
} from "./segment";
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
	const databattleId = useContext(DataBattleIdContext);
	const { grid: { width, height } } = useSelectorWithProps(selectDatabattle, databattleId);

	const selectedChitPosition =
		selectedChit instanceof IProgram ? selectedChit.slug[0] : selectedChit?.pos;

	return (
		<div {...props}>
			<svg width={width * gridUnitSize} height={height * gridUnitSize}>
				{cellVoidState.map(
					(isEmpty, sectorIndex) =>
						isEmpty && (
							<Tile
								key={sectorIndex}
								column={sectorIndex % width}
								row={Math.floor(sectorIndex / width)}
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
			href={chit.icon}
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
						color={program.color}
						icon={i === 0 ? program.icon : null}
						connectRight={posRight && allPos.find(posRight.equals) != null}
						connectDown={posDown && allPos.find(posDown.equals) != null}
					/>
				);
			})}
		</g>
	);
};
const Program = React.memo(_Program);
