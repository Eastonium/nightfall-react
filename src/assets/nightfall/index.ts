import { PackConfig } from "game";

import { allyPrograms } from "./programs/allyPrograms";
import { enemyPrograms } from "./programs/enemyPrograms";

const nightfallPackConfig: PackConfig = {
	chits: [
		{
			id: "upload_zone",
			name: "Upload Zone",
			desc: "Upload your programs here",
		},
		{
			id: "credits",
			name: "Credits",
			desc: "Pick this up for extra cash",
		},
		{
			id: "data_item",
			name: "Data Item",
			desc: "Collect this to win the battle",
		},
	],
	programs: [...allyPrograms, ...enemyPrograms],
};
export default nightfallPackConfig;
