/** @jsx jsx */
import { useContext, memo } from "react";
import { css, jsx, keyframes } from "@emotion/core";
import { shade } from "polished";

import { DataBattleContext } from "game/databattle";

export const gridUnitSize = 32;
const depth = 3;
const shapeSize = 27;
const shapeOffset = Math.floor((gridUnitSize - shapeSize - depth) / 2);
const iconOffset = Math.floor(-depth / 2);
const connectorOffset = shapeSize / 2 + shapeOffset;
const connectorWidth = 7;

const _Segment = ({
	column = 0,
	row = 0,
	icon,
	color,
	connectRight = false,
	connectDown = false,
}) => {
	const { id: dataBattleId } = useContext(DataBattleContext);
	const shadeColor = shade(0.5, color);
	return (
		<g transform={`translate(${column * gridUnitSize} ${row * gridUnitSize})`}>
			{connectRight && (
				<path
					fill="none"
					stroke={shadeColor}
					strokeWidth={connectorWidth}
					d={`M${connectorOffset},${connectorOffset + depth}h${gridUnitSize}`}
				/>
			)}
			{connectDown && (
				<path
					fill="none"
					stroke={shadeColor}
					strokeWidth={connectorWidth}
					d={`M${connectorOffset + depth},${connectorOffset}v${gridUnitSize}`}
				/>
			)}
			<path
				d={`M${
					shapeOffset + shapeSize
				},${shapeOffset}l${depth},${depth}v${shapeSize}h${-shapeSize}l${-depth},${-depth}`}
				fill={shadeColor}
			/>

			{connectRight && (
				<path
					fill="none"
					stroke={color}
					strokeWidth={connectorWidth}
					d={`M${connectorOffset},${connectorOffset}h${gridUnitSize}`}
				/>
			)}
			{connectDown && (
				<path
					fill="none"
					stroke={color}
					strokeWidth={connectorWidth}
					d={`M${connectorOffset},${connectorOffset}v${gridUnitSize}`}
				/>
			)}
			<g clipPath={`url(#segment-clipPath-${dataBattleId})`}>
				<rect x={0} y={0} width={gridUnitSize} height={gridUnitSize} fill={color} />
				<image href={icon} x={iconOffset} y={iconOffset} />
			</g>
		</g>
	);
};
export const Segment = memo(_Segment);

const _SegmentClipPath = () => {
	const { id: dataBattleId } = useContext(DataBattleContext);
	return (
		<clipPath id={`segment-clipPath-${dataBattleId}`}>
			<rect x={shapeOffset} y={shapeOffset} width={shapeSize} height={shapeSize} />
		</clipPath>
	);
};
export const SegmentClipPath = memo(_SegmentClipPath);

const _CellSelectionIndicator = ({ column, row }) => (
	<rect
		css={styles.selectionIndicator}
		transform={`translate(${column * gridUnitSize} ${row * gridUnitSize})`}
		// x={shapeOffset} y={shapeOffset} width={shapeSize} height={shapeSize} //
		x={1}
		y={1}
		width={gridUnitSize - 2}
		height={gridUnitSize - 2} //
	/>
);
export const CellSelectionIndicator = memo(_CellSelectionIndicator);

const _Tile = ({ column, row }) => (
	<rect
		transform={`translate(${column * gridUnitSize} ${row * gridUnitSize})`}
		x={2}
		y={2}
		width={gridUnitSize - 4}
		height={gridUnitSize - 4}
		fill="#0006"
	/>
);
export const Tile = memo(_Tile);

const styles = {
	selectionIndicator: css`
		fill: none;
		stroke: #fff;
		stroke-width: 2;
		animation: 530ms infinite ${keyframes`to { stroke: transparent; }`};
	`,
};
