import { ProgramConfig } from "game/databattle/program";

export const enemyPrograms: ProgramConfig[] = [
	{
		id: "sentinel_1",
		name: "Sentinel",
		desc: [null, "Corporate data defender"],
		speed: 1,
		maxSize: 3,
		color: [null, "#fc9800"],
		commands: [
			{
				name: "Cut",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "sentinel_2",
		name: "Sentinel 2.0",
		desc: [null, "Improved corporate data defender"],
		speed: 2,
		maxSize: 4,
		color: [null, "#fc9800"],
		commands: [
			{
				name: "Cut",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "sentinel_3",
		name: "Sentinel 3.0",
		desc: [null, "Top of the line in corporate data defense"],
		speed: 2,
		maxSize: 4,
		color: [null, "#fc9800"],
		commands: [
			{
				name: "Taser",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(4);
				},
			},
		],
	},
	{
		id: "watchman_1",
		name: "Watchman",
		desc: [null, "Corporate ranged attack program"],
		speed: 1,
		maxSize: 2,
		color: [null, "#ff258a"],
		commands: [
			{
				name: "Phaser",
				desc: "TODO",
				range: 2,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "watchman_2",
		name: "Watchman X",
		desc: [null, "Improved version of Watchman"],
		speed: 1,
		maxSize: 4,
		color: [null, "#ff258a"],
		commands: [
			{
				name: "Phaser",
				desc: "TODO",
				range: 2,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "watchman_3",
		name: "Watchman SP",
		desc: [null, "Qui custodiet ipsos custodes?"],
		speed: 1,
		maxSize: 4,
		color: [null, "#ff258a"],
		commands: [
			{
				name: "Photon",
				desc: "TODO",
				range: 3,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "dog_1",
		name: "Guard Pup",
		desc: [null, "A speedy little corporate cur"],
		speed: 3,
		maxSize: 2,
		color: [null, "#fcbb00"],
		commands: [
			{
				name: "Byte",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "dog_2",
		name: "Guard Dog",
		desc: [null, "Who let the dogs out?"],
		speed: 3,
		maxSize: 3,
		color: [null, "#fcbb00"],
		commands: [
			{
				name: "Byte",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "dog_3",
		name: "Attack Dog",
		desc: [null, "Ravenous and bloodthirsty corporate canine"],
		speed: 4,
		maxSize: 7,
		color: [null, "#fcbb00"],
		commands: [
			{
				name: "Megabyte",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(3);
				},
			},
		],
	},
	{
		id: "warden_1",
		name: "Warden",
		desc: [null, "Slow and steady corporate attack program"],
		speed: 1,
		maxSize: 5,
		color: [null, "#fc0010"],
		commands: [
			{
				name: "Thump",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(3);
				},
			},
		],
	},
	{
		id: "warden_2",
		name: "Warden+",
		desc: [null, "Get out of its way"],
		speed: 2,
		maxSize: 6,
		color: [null, "#fc0010"],
		commands: [
			{
				name: "Bash",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(5);
				},
			},
		],
	},
	{
		id: "warden_3",
		name: "Warden++",
		desc: [null, "The last word in corporate security"],
		speed: 3,
		maxSize: 7,
		color: [null, "#fc0010"],
		commands: [
			{
				name: "Crash",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(7);
				},
			},
		],
	},
	{
		id: "ping_1",
		name: "Sensor",
		desc: [null, "Immobile program eradicator"],
		speed: 0,
		maxSize: 1,
		color: [null, "#fcf101"],
		commands: [
			{
				name: "Blip",
				desc: "TODO",
				range: 5,
				targets: ["enemy"],
				effect: target => {
					target.harm(1);
				},
			},
		],
	},
	{
		id: "ping_2",
		name: "Radar",
		desc: [null, "Deadly program eradicator"],
		speed: 0,
		maxSize: 1,
		color: [null, "#fcf101"],
		commands: [
			{
				name: "Pong",
				desc: "TODO",
				range: 5,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "ping_3",
		name: "Sonar",
		desc: [null, "Long-range program eradicator"],
		speed: 0,
		maxSize: 1,
		color: [null, "#fcf101"],
		commands: [
			{
				name: "Ping",
				desc: "TODO",
				range: 8,
				targets: ["enemy"],
				effect: target => {
					target.harm(1);
				},
			},
		],
	},
	{
		id: "fire_wall",
		name: "Fire Wall",
		desc: [null, "Keeps unwanted programs out of corporate sectors"],
		speed: 2,
		maxSize: 20,
		color: [null, "#fc6200"],
		commands: [
			{
				name: "Burn",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(1);
				},
			},
		],
	},
	{
		id: "boss",
		name: "Boss",
		desc: [null, "Prepare to be owned"],
		speed: 6,
		maxSize: 25,
		color: [null, "#fc6200"],
		commands: [
			{
				name: "Shutdown",
				desc: "TODO",
				range: 5,
				targets: ["enemy"],
				effect: target => {
					target.harm(5);
				},
			},
		],
	},
];
