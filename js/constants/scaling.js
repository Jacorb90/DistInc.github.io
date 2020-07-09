const SCALING_STARTS = {
	scaled: {
		rank: new ExpantaNum(50),
		rankCheap: new ExpantaNum(10),
		tier: new ExpantaNum(8),
		rf: new ExpantaNum(35),
		fn: new ExpantaNum(6),
		pathogenUpg: new ExpantaNum(10),
		darkCore: new ExpantaNum(15),
		endorsements: new ExpantaNum(5),
		enlightenments: new ExpantaNum(6),
		spectralGems: new ExpantaNum(5),
		dervBoost: new ExpantaNum(6)
	},
	superscaled: {
		rank: new ExpantaNum(100),
		rankCheap: new ExpantaNum(20),
		tier: new ExpantaNum(12),
		rf: new ExpantaNum(75),
		fn: new ExpantaNum(15),
		pathogenUpg: new ExpantaNum(40),
		darkCore: new ExpantaNum(20),
		endorsements: new ExpantaNum(50),
		enlightenments: new ExpantaNum(20),
		spectralGems: new ExpantaNum(16),
		dervBoost: new ExpantaNum(14)
	},
	hyper: {
		rank: new ExpantaNum(160),
		rankCheap: new ExpantaNum(35),
		tier: new ExpantaNum(16),
		rf: new ExpantaNum(120),
		fn: new ExpantaNum(25),
		pathogenUpg: new ExpantaNum(65),
		darkCore: new ExpantaNum(40)
	},
	atomic: { rank: new ExpantaNum(800), tier: new ExpantaNum(40), rf: new ExpantaNum(320) }
};
const SCALING_RES = {
	rank: function (n = 0) {
		return player.rank;
	},
	rankCheap: function (n = 0) {
		return tmp.modes
			? tmp.modes.extreme.active
				? player.rankCheap
				: new ExpantaNum(1 / 0)
			: new ExpantaNum(1 / 0);
	},
	tier: function (n = 0) {
		return player.tier;
	},
	rf: function (n = 0) {
		return player.rf;
	},
	fn: function (n = 0) {
		return tmp.modes
			? tmp.modes.extreme.active
				? player.furnace.upgrades[n - 1]
				: new ExpantaNum(1 / 0)
			: new ExpantaNum(1 / 0);
	},
	pathogenUpg: function (n = 0) {
		return player.pathogens.upgrades[n];
	},
	darkCore: function (n = 0) {
		return player.dc.cores;
	},
	endorsements: function (n = 0) {
		return player.inf.endorsements;
	},
	enlightenments: function (n = 0) {
		return player.inf.ascension.enlightenments[n - 1];
	},
	spectralGems: function (n = 0) {
		return tmp.inf ? tmp.inf.pantheon.totalGems : new ExpantaNum(1 / 0);
	},
	dervBoost: function (n = 0) {
		return player.inf.derivatives.unlocks;
	}
};
