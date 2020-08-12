const LAYER_RESETS = {
	rank: ["distance", "velocity"],
	rankCheap: ["distance", "velocity"],
	tier: ["distance", "velocity", "rank"],
	rockets: ["distance", "velocity", "rank", "tier"],
	rf: ["rockets"],
	collapse: ["distance", "velocity", "rank", "tier", "rockets", "rf", "tr"],
	inf: ["distance", "velocity", "rank", "tier", "rockets", "rf", "tr", "automation", "collapse", "pathogens", "dc"],
	elementary: [
		"distance",
		"velocity",
		"rank",
		"tier",
		"rockets",
		"rf",
		"tr",
		"automation",
		"collapse",
		"pathogens",
		"dc",
		"inf"
	]
};

const LAYER_RESETS_EXTRA = {
	rank: [],
	rankCheap: [],
	tier: ["rankCheap"],
	rockets: ["rankCheap"],
	rf: [],
	collapse: ["rankCheap", "furnace"],
	inf: ["rankCheap", "furnace", "activeFC"],
	elementary: ["rankCheap", "furnace", "activeFC", "furnChalls", "extremeStad"]
};

const LAYER_REQS = {
	rank: ["distance", 10],
	tier: ["rank", 3],
	rockets: ["distance", 5e7],
	rf: ["rockets", 25],
	collapse: ["distance", 50 * DISTANCES.Mpc],
	inf: ["distance", new ExpantaNum(Number.MAX_VALUE).times(DISTANCES.uni)],
	elementary: [
		["rockets", new ExpantaNum("1e300000")],
		["cadavers", new ExpantaNum("1e30000")],
		["endorsements", 36]
	]
};

const LAYER_FP = {
	rank: 1,
	tier: 1,
	rockets: 0.4,
	rf: 1,
	collapse: 0.1,
	inf: 1,
	elementary: 1
};

const LAYER_SC = {
	rank: new ExpantaNum(1 / 0),
	tier: new ExpantaNum(1 / 0),
	rockets: new ExpantaNum(1e5),
	rf: new ExpantaNum(1 / 0),
	collapse: new ExpantaNum(100),
	inf: new ExpantaNum(1 / 0),
	elementary: new ExpantaNum(1 / 0)
};
