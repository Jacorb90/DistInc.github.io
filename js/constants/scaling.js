const SCALING_STARTS = {
	scaled: {
		rank: new ExpantaNum(50),
		tier: new ExpantaNum(8),
		rf: new ExpantaNum(35),
		pathogenUpg: new ExpantaNum(10),
		darkCore: new ExpantaNum(15),
		endorsements: new ExpantaNum(5),
		enlightenments: new ExpantaNum(6),
		spectralGems: new ExpantaNum(5),
		dervBoost: new ExpantaNum(10),
	},
	superscaled: {
		rank: new ExpantaNum(100),
		tier: new ExpantaNum(12),
		rf: new ExpantaNum(75),
		pathogenUpg: new ExpantaNum(40),
		darkCore: new ExpantaNum(20),
	},
	hyper: { rank: new ExpantaNum(160), tier: new ExpantaNum(16), rf: new ExpantaNum(120) },
};
const SCALING_RES = {
	rank: function (n = 0) {
		return player.rank;
	},
	tier: function (n = 0) {
		return player.tier;
	},
	rf: function (n = 0) {
		return player.rf;
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
	},
};
