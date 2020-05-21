const LAYER_RESETS = {
	rank: ["distance", "velocity"],
	tier: ["distance", "velocity", "rank"],
	rockets: ["distance", "velocity", "rank", "tier"],
	rf: ["rockets"],
	collapse: ["distance", "velocity", "rank", "tier", "rockets", "rf", "tr"],
}

const LAYER_REQS = {
	rank: ["distance", 10],
	tier: ["rank", 3],
	rockets: ["distance", 5e7],
	rf: ["rockets", 25],
	collapse: ["distance", 50*DISTANCES.Mpc],
}

const LAYER_FP = {
	rank: 1,
	tier: 1,
	rockets: 0.4,
	rf: 1,
	collapse: 0.1,
}

const LAYER_SC = {
	rank: new ExpantaNum(1/0),
	tier: new ExpantaNum(1/0),
	rockets: new ExpantaNum(1e5),
	rf: new ExpantaNum(1/0),
	collapse: new ExpantaNum(100),
}