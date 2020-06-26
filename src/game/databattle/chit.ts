import { Position } from "./grid/position";

export interface ChitConfig {
	id: string;
	name: string;
	desc: string;
}
export interface ChitInstanceDefinition {
	type: string;
	pos: [number, number];
}

export class Chit {
	config: ChitConfig;
	pos: Position;
	iconPath: string;

	constructor(config: ChitConfig, pos: Position, iconPath: string) {
		this.config = config;
		this.pos = pos;
		this.iconPath = iconPath;
	}
}
