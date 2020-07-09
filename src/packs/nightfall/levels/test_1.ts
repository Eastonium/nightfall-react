import { LevelDefinition } from "game/databattle/level";

export default {
	grid: {
		shape: "square",
		width: 14,
		height: 11,
	},
	cellVoidState: [
		" OOO      OOO ",
		"OOOOO    OOOOO",
		"OOOOO    OOOOO",
		"OOOOO     OOOO",
		"OOOOO  OOOOOOO",
		"OOOOOOOOOOOOOO",
		"OOOOOOO  OOOOO",
		"OOOO     OOOOO",
		"OOOOO    OOOOO",
		"OOOOO    OOOOO",
		" OOO      OOO ",
	],
	cellStyle: {
		map: [
			"00000000000000",
			"00000000000000",
			"00000000000000",
			"00000001111111",
			"11111110000001",
			"10000000000001",
			"10000001111111",
			"11111110000000",
			"00000000000000",
			"00000000000000",
			"00000000000000",
		],
		key: {
			"0": "tileA",
			"1": "tileB",
			"": "default",
		},
	},
	chits: [
		{ id: "nightfall:data_item", pos: [1, 2] },
		{ id: "nightfall:credits", pos: [1, 5] },
		{ id: "nightfall:credits", pos: [1, 8] },
		{ id: "nightfall:upload_zone", pos: [11, 1] },
		{ id: "nightfall:upload_zone", pos: [12, 1] },
		{ id: "nightfall:upload_zone", pos: [11, 9] },
		{ id: "nightfall:upload_zone", pos: [12, 9] },
	],
	programs: [
		{
			id: "nightfall:dog_2",
			slug: [
				[3, 1],
				[3, 2],
				[3, 3],
				[3, 4],
			],
		},
		{ id: "nightfall:dog_2", slug: [[2, 2]] },
		{ id: "nightfall:dog_2", slug: [[0, 3]] },
		{ id: "nightfall:dog_2", slug: [[1, 4]] },
		{ id: "nightfall:dog_2", slug: [[2, 5]] },
		{ id: "nightfall:dog_2", slug: [[1, 7]] },
	],
} as LevelDefinition;
