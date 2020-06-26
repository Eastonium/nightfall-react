import { Position } from "./grid/position";

type Target = "void" | "vacant" | "enemy" | "ally" | "self";

export interface Command {
	name: string;
	desc: string;
	range: number;
	targets: Target[];
	usable?: (self: Program) => boolean;
	effect: (target: Program, self: Program, tile: any) => void;
}

export interface ProgramConfig {
	id: string;
	name: string;
	desc: string | string[]; // To allow different descriptions per team
	speed: number;
	maxSize: number;
	color: string | string[]; // To allow different colors per team
	commands: Command[];
}

export interface ProgramInstanceDefinition {
	type: string;
	slug: [number, number][];
}

export class Program {
	// all these should probably be private fields
	config: ProgramConfig;
	type: string;
	slug: Position[];
	iconPath: string;

	// todo ill probably end up using a thing.value() thing.value(newValue) thing.value(currentValue => newValue) format instead of this oddly named garbage
	harm;
	heal;
	grow;
	shrink;
	slow;
	stop;
	accelerate;
	terminate;
}
