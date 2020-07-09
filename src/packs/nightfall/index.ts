import { registerPack, PackConfig } from "game";

import uploadZoneIcon from "./textures/grid/chits/upload_zone.png";
import creditsIcon from "./textures/grid/chits/credits.png";
import dataItemIcon from "./textures/grid/chits/data_item.png";

import { allyPrograms } from "./programs/allyPrograms";
import { enemyPrograms } from "./programs/enemyPrograms";

import testLevel1 from "./levels/test_1";

export const packId = "nightfall";
const nightfallPackConfig: PackConfig = {
	chits: [
		{
			id: "upload_zone",
			name: "Upload Zone",
			desc: "Upload your programs here",
			icon: uploadZoneIcon,
		},
		{
			id: "credits",
			name: "Credits",
			desc: "Pick this up for extra cash",
			icon: creditsIcon,
		},
		{
			id: "data_item",
			name: "Data Item",
			desc: "Collect this to win the battle",
			icon: dataItemIcon,
		},
	],
	programs: [...allyPrograms, ...enemyPrograms],
	levels: [testLevel1],
};
console.log("test")
registerPack(packId, nightfallPackConfig);

export default () => {};
