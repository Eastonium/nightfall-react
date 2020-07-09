import { ChitInstanceDefinition } from "./chit";
import { ProgramInstanceDefinition } from "./program";

export interface LevelDefinition {
	grid: {
		shape: "square";// | "hexagon";
		width: number;
		height: number;
	};
	cellVoidState: string[];
	cellStyle: {
		map: string[];
		key: {
			[key: string]: string;
		}
	};
	chits: ChitInstanceDefinition[];
	programs: ProgramInstanceDefinition[];
}