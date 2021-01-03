const MODEBALANCES = {
	hard: { // 1
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	aau: { // 2
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	aau_hard: { // 3
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	// 4 - NA (unknown)
	// 5 - NA Hard (unknown)
	// 6 - AAU/NA (unknown)
	// 7 - AAU/NA Hard (unknown)
	absurd: { // 8
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_hard: { // 9
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau: { // 10
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau_hard: { // 11
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	// 12 - Absurd NA (unknown)
	// 13 - Absurd NA Hard (unknown)
	// 14 - Absurd AAU/NA (unknown)
	// 15 - Absurd AAU/NA Hard (unknown)
	easy: { // 16
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	easy_hard: { // 17
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_easy: { // 18
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_easy_hard: { // 19
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 20 - NA Easy (unknown)
	// 21 - NA Easy-Hard (unknown)
	// 22 - AAU/NA Easy (unknown)
	// 23 - AAU/NA Easy-Hard (unknown)
	absurd_easy: { // 24
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_easy_hard: { // 25
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau_easy: { // 26
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	absurd_aau_easy_hard: { // 27
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 28 - Absurd NA Easy (unknown)
	// 29 - Absurd NA Easy-Hard (unknown)
	// 30 - Absurd AAU/NA Easy (unknown)
	// 31 - Absurd AAU/NA Easy-Hard (unknown)
	extreme: { // 32
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_extreme: { // 33
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 34 - NA Extreme (unknown)
	// 35 - AAU/NA Extreme (unknown)
	absurd_extreme: { // 36
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_aau_extreme: { // 37
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 38 - Absurd NA Extreme (unknown)
	// 39 - Absurd AAU/NA Extreme (unknown)
	easy_extreme: { // 40
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_easy_extreme: { // 41
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 42 - NA Easy Extreme (unknown)
	// 43 - AAU/NA Easy Extreme (unknown)
	absurd_easy_extreme: { // 44
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_aau_easy_extreme: { // 45
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 46 - Absurd NA Easy Extreme (unknown)
	// 47 - Absurd AAU/NA Easy Extreme (unknown)
	hikers_dream: { // 48
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	// 49 - Hard Dream (unknown)
	aau_hikers_dream: { // 50
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	// 51 - AAU Hard Dream (unknown)
	// 52 - NA Hiker's Dream (unknown)
	// 53 - NA Hard Dream (unknown)
	// 54 - AAU/NA Hiker's Dream (unknown)
	// 55 - AAU/NA Hard Dream (unknown)
	absurd_hikers_dream: { // 56
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	// 57 - Absurd Hard Dream (unknown)
	absurd_aau_hikers_dream: { // 58
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	// 59 - Absurd AAU Hard Dream (unknown)
	// 60 - Absurd NA Hiker's Dream (unknown)
	// 61 - Absurd NA Hard Dream (unknown)
	// 62 - Absurd AAU/NA Hiker's Dream (unknown)
	// 63 - Absurd AAU/NA Hard Dream (unknown)
	easy_hikers_dream: { // 64
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 65 - Easy-Hard Dream (unknown)
	aau_easy_hikers_dream: { // 66
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 67 - AAU Easy Hard Dream (unknown)
	// 68 - NA Easy Dream (unknown)
	// 69 - NA Easy-Hard Dream (unknown)
	// 70 - AAU/NA Easy Dream (unknown)
	// 71 - AAU/NA Easy-Hard Dream (unknown)
	absurd_easy_hikers_dream: { // 72
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	// 73 - Absurd Easy-Hard Dream (unknown)
	absurd_aau_easy_hikers_dream: { // 74
		balancing: "balanced up to endgame",
		balanceCheck: false,
	},
	// 75 - Absurd AAU Easy-Hard Dream (unknown)
	// 76 - Absurd NA Easy Dream (unknown)
	// 77 - Absurd NA Easy-Hard Dream (unknown)
	// 78 - Absurd AAU/NA Easy Dream (unknown)
	// 79 - Absurd AAU/NA Easy-Hard Dream (unknown)
	extreme_hikers_dream: { // 80
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_extreme_hikers_dream: { // 81
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 82 - NA Extreme Dream (unknown)
	// 83 - AAU/NA Extreme Dream (unknown)
	absurd_extreme_hikers_dream: { // 84
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_aau_extreme_hikers_dream: { // 85
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 86 - Absurd NA Extreme Dream (unknown)
	// 87 - Absurd AAU/NA Extreme Dream (unknown)
	easy_extreme_hikers_dream: { // 88
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	aau_easy_extreme_hikers_dream: { // 89
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 90 - NA Easy Extreme Dream (unknown)
	// 91 - AAU/NA Easy Extreme Dream (unknown)
	absurd_easy_extreme_hikers_dream: { // 92
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	absurd_aau_easy_extreme_hikers_dream: { // 93
		balancing: "balanced up to endgame",
		balanceCheck: false
	},
	// 94 - Absurd NA Easy Extreme Dream (unknown)
	// 95 - Absurd AAU/NA Easy Extreme Dream (unknown)
	"": { // 96
		balancing: "balanced up to endgame",
		balanceCheck: false,
	}
};

const MODES = {
	hard: {
		desc: "The game is harder & slower, with slight compensation to help you slowly grind to the end.",
		dis: ["extreme"]
	},
	aau: {
		desc: "Start with all achievements unlocked.",
	},
	na: {
		desc: "All unnecessary achievements are gone.",
	},
	absurd: {
		desc: "Ehehe... You'll see...",
	},
	easy: {
		desc: "This mode is easier & faster to help you reach the end faster.",
	},
	extreme: {
		desc: "This mode is an extension of Hard Mode that makes it even more difficult, however adds The Furnace (a new feature) to compensate for this.",
		ext: ["hard"]
	},
	hikers_dream: {
		desc: "You have to climb up a hill that gets steeper and steeper as you go (making progress slow down drastically), however there are new buffs to compensate for this steep hill.",
	},
};

const MODE_VARS = {
	extreme: {
		rankCheap: new ExpantaNum(0),
		furnace: {
			coal: new ExpantaNum(0),
			upgrades: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
			blueFlame: new ExpantaNum(0),
			enhancedCoal: new ExpantaNum(0),
			enhancedUpgrades: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
		},
		activeFC: 0,
		furnChalls: [],
		extremeStad: [],
		magma: {
			done: false,
			amount: new ExpantaNum(0),
			ref: new ExpantaNum(0),
		},
		plasma: {
			amount: new ExpantaNum(0),
			whiteFlame: new ExpantaNum(0),
			boosts: new ExpantaNum(0),
		},
	},
	hikers_dream: {
		energy: new ExpantaNum(100),
		spentMotive: new ExpantaNum(0),
		canRefill: true,
		energyUpgs: [],
		geners: new ExpantaNum(1),
		genLvl: new ExpantaNum(0),
		spentMotiveGens: new ExpantaNum(0),
		bestMotive: new ExpantaNum(0),
	},
};

const MODE_EX = {
	extreme: function (source) {
		source.rankCheap = new ExpantaNum(source.rankCheap);
		source.furnace.coal = new ExpantaNum(source.furnace.coal);
		let fu = source.furnace.upgrades;
		source.furnace.upgrades = [
			new ExpantaNum(fu[0]),
			new ExpantaNum(fu[1]),
			new ExpantaNum(fu[2]),
			new ExpantaNum(fu[3]||0),
			new ExpantaNum(fu[4]||0),
		];
		source.furnace.enhancedCoal = new ExpantaNum(source.furnace.enhancedCoal||0);
		let eu = (source.furnace.enhancedUpgrades||[0,0,0,0,0,0,0,0,0,0,0,0,0])
		source.furnace.enhancedUpgrades = [
			new ExpantaNum(eu[0]),
			new ExpantaNum(eu[1]),
			new ExpantaNum(eu[2]),
			new ExpantaNum(eu[3]||0),
			new ExpantaNum(eu[4]||0),
			new ExpantaNum(eu[5]||0),
			new ExpantaNum(eu[6]||0),
			new ExpantaNum(eu[7]||0),
			new ExpantaNum(eu[8]||0),
			new ExpantaNum(eu[9]||0),
			new ExpantaNum(eu[10]||0),
			new ExpantaNum(eu[11]||0),
			new ExpantaNum(eu[12]||0),
		];
		source.furnace.blueFlame = new ExpantaNum(source.furnace.blueFlame);
		if (!source.extremeStad) source.extremeStad = []
		
		let mag = source.magma||{}
		source.magma = {
			done: mag.done||false,
			amount: new ExpantaNum(mag.amount||0),
			ref: new ExpantaNum(mag.ref||0),
		}
		
		let pl = source.plasma||{}
		source.plasma = {
			amount: new ExpantaNum(pl.amount||0),
			whiteFlame: new ExpantaNum(pl.whiteFlame||0),
			boosts: new ExpantaNum(pl.boosts||0),
		}
		
		return source;
	},
	hikers_dream: function(source) {
		source.energy = new ExpantaNum(source.energy)
		if (source.canRefill===undefined) source.canRefill = true;
		source.spentMotive = new ExpantaNum(source.spentMotive||0)
		source.geners = new ExpantaNum(source.geners||1)
		source.genLvl = new ExpantaNum(source.genLvl||0)
		source.spentMotiveGens = new ExpantaNum(source.spentMotiveGens||0)
		source.bestMotive = new ExpantaNum(source.bestMotive||0)
		return source;
	},
};
