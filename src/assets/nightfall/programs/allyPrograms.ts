import { ProgramConfig } from "game/databattle/program";

export const allyPrograms: ProgramConfig[] = [
	{
		id: "hack_1",
		name: "Hack",
		desc: "Basic attack program",
		speed: 2,
		maxSize: 4,
		color: "#00c7ff",
		commands: [
			{
				name: "Slice",
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
		id: "hack_2",
		name: "Hack 2.0",
		desc: "Improved Hack: Larger size and better attacks",
		speed: 3,
		maxSize: 4,
		color: "#00c7ff",
		commands: [
			{
				name: "Slice",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
			{
				name: "Dice",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				usable: self => self.slug.length >= 3,
				effect: target => {
					target.harm(3);
				},
			},
		],
	},
	{
		id: "hack_3",
		name: "Hack 3.0",
		desc: "The top of the Hack series",
		speed: 4,
		maxSize: 4,
		color: "#00c7ff",
		commands: [
			{
				name: "Slice",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
			{
				name: "Mutilate",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				usable: self => self.slug.length >= 4,
				effect: target => {
					target.harm(4);
				},
			},
		],
	},
	{
		id: "slingshot",
		name: "Slingshot",
		desc: "Basic ranged attack program",
		speed: 2,
		maxSize: 2,
		color: "#00daa5",
		commands: [
			{
				name: "Stone",
				desc: "TODO",
				range: 3,
				targets: ["enemy"],
				effect: target => {
					target.harm(1);
				},
			},
		],
	},
	{
		id: "seeker_1",
		name: "Seeker",
		desc: "Solid distance attack program",
		speed: 3,
		maxSize: 3,
		color: "#00daa5",
		commands: [
			{
				name: "Peek",
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
		id: "seeker_2",
		name: "Seeker 2.0",
		desc: "Bigger and better than seeker",
		speed: 3,
		maxSize: 4,
		color: "#00daa5",
		commands: [
			{
				name: "Poke",
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
		id: "seeker_3",
		name: "Seeker 3.0",
		desc: "Seeker with extra deletion power",
		speed: 4,
		maxSize: 5,
		color: "#00daa5",
		commands: [
			{
				name: "Poke",
				desc: "TODO",
				range: 3,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
			{
				name: "Seek and Destroy",
				desc: "TODO",
				range: 2,
				targets: ["enemy"],
				usable: self => self.slug.length >= 5,
				effect: (target, self) => {
					target.harm(5);
					self.harm(2);
				},
			},
		],
	},
	{
		id: "bug_1",
		name: "Bug",
		desc: "Fast, cheap, and out of control",
		speed: 5,
		maxSize: 1,
		color: "#84fc00",
		commands: [
			{
				name: "Glitch",
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
		id: "bug_2",
		name: "MandelBug",
		desc: ["It's not a bug, it's a feature", "Tiny but packs a big sting"],
		speed: 5,
		maxSize: 1,
		color: ["#84fc00", "#fc00f9"],
		commands: [
			{
				name: "Fractal Glitch",
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
		id: "bug_3",
		name: "HeisenBug",
		desc: "They can't kill what they can't catch",
		speed: 5,
		maxSize: 1,
		color: "#84fc00",
		commands: [
			{
				name: "Quantum Glitch",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.harm(6);
				},
			},
		],
	},
	{
		id: "data_doctor_1",
		name: "Data Doctor",
		desc: "Helps your programs grow",
		speed: 4,
		maxSize: 5,
		color: "#0132fa",
		commands: [
			{
				name: "Grow",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				effect: target => {
					target.heal(2);
				},
			},
		],
	},
	{
		id: "medic",
		name: "Medic",
		desc: "Grows your programs from a distance",
		speed: 3,
		maxSize: 3,
		color: "#0132fa",
		commands: [
			{
				name: "Hypo",
				desc: "TODO",
				range: 3,
				targets: ["enemy", "ally"],
				effect: target => {
					target.heal(2);
				},
			},
		],
	},
	{
		id: "data_doctor_2",
		name: "Data Doctor Pro",
		desc: "Twice the expansion power of the data doctor",
		speed: 5,
		maxSize: 8,
		color: "#0132fa",
		commands: [
			{
				name: "Megagrow",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				effect: target => {
					target.heal(4);
				},
			},
			{
				name: "Surgery",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				effect: target => {
					target.grow(1);
				},
			},
		],
	},
	{
		id: "bit_man",
		name: "Bit-Man",
		desc: "Makes sectors of the grid appear or disappear",
		speed: 3,
		maxSize: 3,
		color: "#b4ff00",
		commands: [
			{
				name: "Zero",
				desc: "TODO",
				range: 1,
				targets: ["vacant"],
				effect: (_target, _self, tile) => (tile.void = true),
			},
			{
				name: "One",
				desc: "TODO",
				range: 1,
				targets: ["void"],
				effect: (_target, _self, tile) => (tile.void = false),
			},
		],
	},
	{
		id: "clog_1",
		name: "Clog.01",
		desc: "Slows down hostile programs",
		speed: 2,
		maxSize: 4,
		color: "#00fdc7",
		commands: [
			{
				name: "Lag",
				desc: "TODO",
				range: 3,
				targets: ["enemy", "ally"],
				effect: target => {
					target.slow(1);
				},
			},
		],
	},
	{
		id: "clog_2",
		name: "Clog.02",
		desc: "Twice as effective as version.01",
		speed: 2,
		maxSize: 4,
		color: "#00fdc7",
		commands: [
			{
				name: "Chug",
				desc: "TODO",
				range: 3,
				targets: ["enemy", "ally"],
				effect: target => {
					target.slow(2);
				},
			},
		],
	},
	{
		id: "clog_3",
		name: "Clog.03",
		desc: "Brings hostile programs to a halt",
		speed: 2,
		maxSize: 4,
		color: "#00fdc7",
		commands: [
			{
				name: "Chug",
				desc: "TODO",
				range: 3,
				targets: ["enemy", "ally"],
				usable: self => self.slug.length >= 1,
				effect: (target, self) => {
					target.slow(2);
				},
			},
			{
				name: "Hang",
				desc: "TODO",
				range: 3,
				targets: ["enemy", "ally"],
				usable: self => self.slug.length >= 4,
				effect: target => {
					target.stop();
				},
			},
		],
	},
	{
		id: "golem_1",
		name: "Golem.mud",
		desc: "Slow and steady attack program",
		speed: 1,
		maxSize: 5,
		color: "#03fcf8",
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
		id: "golem_2",
		name: "Golem.clay",
		desc: "Clay is stronger than mud",
		speed: 2,
		maxSize: 6,
		color: "#03fcf8",
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
		id: "golem_3",
		name: "Golem.stone",
		desc: "Nothing can stand in its way",
		speed: 3,
		maxSize: 7,
		color: "#03fcf8",
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
		id: "spider_1",
		name: "Wolf Spider",
		desc: "Speedy and creepy little program",
		speed: 3,
		maxSize: 3,
		color: "#14ea00",
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
		id: "spider_2",
		name: "Black Widow",
		desc: "Speedier and creepier",
		speed: 4,
		maxSize: 3,
		color: "#14ea00",
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
			{
				name: "Paralyze",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.slow(3);
				},
			},
		],
	},
	{
		id: "spider_3",
		name: "Tarantula",
		desc: "Fast, with a venomous bite",
		speed: 5,
		maxSize: 3,
		color: "#14ea00",
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
			{
				name: "Paralyze",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				effect: target => {
					target.slow(3);
				},
			},
		],
	},
	{
		id: "tower_1",
		name: "Tower",
		desc: "Immobile long-range program",
		speed: 0,
		maxSize: 1,
		color: "#01fc95",
		commands: [
			{
				name: "Spot",
				desc: "TODO",
				range: 3,
				targets: ["enemy"],
				effect: target => {
					target.harm(3);
				},
			},
		],
	},
	{
		id: "tower_2",
		name: "Mobile Tower",
		desc: "Slow-moving, long-range program",
		speed: 1,
		maxSize: 1,
		color: "#01fc95",
		commands: [
			{
				name: "Spot",
				desc: "TODO",
				range: 3,
				targets: ["enemy"],
				effect: target => {
					target.harm(3);
				},
			},
		],
	},
	{
		id: "turbo_1",
		name: "Turbo",
		desc: "Speeds up your programs",
		speed: 3,
		maxSize: 3,
		color: "#0090fc",
		commands: [
			{
				name: "Boost",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				effect: (target, self) => {
					target.accelerate(1);
					self.harm(1);
				},
			},
		],
	},
	{
		id: "turbo_2",
		name: "Turbo Deluxe",
		desc: "Slow and steady is for losers",
		speed: 4,
		maxSize: 4,
		color: "#0090fc",
		commands: [
			{
				name: "Megaboost",
				desc: "TODO",
				range: 2,
				targets: ["enemy", "ally"],
				usable: self => self.slug.length >= 3,
				effect: (target, self) => {
					target.accelerate(2);
					self.harm(2);
				},
			},
		],
	},
	{
		id: "bomb_1",
		name: "BuzzBomb",
		desc: "Fast and annoying",
		speed: 8,
		maxSize: 2,
		color: "#0090fc",
		commands: [
			{
				name: "Sting",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				effect: target => {
					target.harm(1);
				},
			},
			{
				name: "Kamikazee",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				effect: (target, self) => {
					target.harm(5);
					self.terminate();
				},
			},
		],
	},
	{
		id: "bomb_2",
		name: "LogicBomb",
		desc: "Self-destructing attack program",
		speed: 3,
		maxSize: 6,
		color: "#0090fc",
		commands: [
			{
				name: "Selfdestruct",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				usable: self => self.slug.length >= 6,
				effect: (target, self) => {
					target.harm(10);
					self.terminate();
				},
			},
		],
	},
	{
		id: "fiddle",
		name: "Fiddle",
		desc: "Twiddle and Tweak the power of your programs",
		speed: 3,
		maxSize: 3,
		color: "#0090fc",
		commands: [
			{
				name: "Tweak",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				effect: (target, self) => {
					target.accelerate(1);
					self.harm(1);
				},
			},
			{
				name: "Twiddle",
				desc: "TODO",
				range: 1,
				targets: ["enemy", "ally"],
				effect: (target, self) => {
					target.grow(1);
					self.harm(1);
				},
			},
		],
	},
	{
		id: "satellite_1",
		name: "Satellite",
		desc: "Sort-rang hard-hitting program",
		speed: 1,
		maxSize: 1,
		color: "#00fccb",
		commands: [
			{
				name: "Scramble",
				desc: "TODO",
				range: 2,
				targets: ["enemy"],
				effect: target => {
					target.harm(4);
				},
			},
		],
	},
	{
		id: "satellite_2",
		name: "Laser Satellite",
		desc: "Long-range hard-hitting program",
		speed: 2,
		maxSize: 1,
		color: "#00fccb",
		commands: [
			{
				name: "Megascramble",
				desc: "TODO",
				range: 3,
				targets: ["enemy"],
				effect: target => {
					target.harm(4);
				},
			},
		],
	},
	{
		id: "fling_1",
		name: "Ballista",
		desc: "Extreme-range attack program",
		speed: 1,
		maxSize: 2,
		color: "#00daa5",
		commands: [
			{
				name: "Fling",
				desc: "TODO",
				range: 4,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "fling_2",
		name: "Catapult",
		desc: "Extreme-range mobile attacker",
		speed: 2,
		maxSize: 3,
		color: "#00daa5",
		commands: [
			{
				name: "Fling",
				desc: "TODO",
				range: 4,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
		],
	},
	{
		id: "memory_hog",
		name: "Memory Hog",
		desc: "Massive memory-filling bloatware",
		speed: 5,
		maxSize: 30,
		color: "#b6fb00",
		commands: [],
	},
	{
		id: "wizard",
		name: "Wizard",
		desc: "Pay no attention to the man behind the curtain",
		speed: 3,
		maxSize: 4,
		color: "#01fc95",
		commands: [
			{
				name: "Scorch",
				desc: "TODO",
				range: 3,
				targets: ["enemy"],
				effect: target => {
					target.harm(2);
				},
			},
			{
				name: "Stretch",
				desc: "TODO",
				range: 2,
				targets: ["enemy", "ally"],
				effect: target => {
					target.grow(1);
				},
			},
		],
	},
	{
		id: "sumo",
		name: "Sumo",
		desc: "A massive and slow-moving powerhouse",
		speed: 2,
		maxSize: 12,
		color: ["#b6fc01", "#cd7ffd"],
		commands: [
			{
				name: "Dataslam",
				desc: "TODO",
				range: 1,
				targets: ["enemy"],
				usable: self => self.slug.length >= 6,
				effect: target => {
					target.harm(8);
				},
			},
		],
	},
	{
		id: "guru",
		name: "Guru",
		desc: "Multipurpose software for the l33tist of the l33t",
		speed: 2,
		maxSize: 3,
		color: "#04facb",
		commands: [
			{
				name: "Fire",
				desc: "TODO",
				range: 2,
				targets: ["enemy"],
				effect: target => {
					target.harm(4);
				},
			},
			{
				name: "Ice",
				desc: "TODO",
				range: 2,
				targets: ["enemy"],
				effect: target => {
					target.slow(3);
				},
			},
		],
	},
];
