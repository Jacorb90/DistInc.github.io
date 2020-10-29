const SCALING_STARTS = {
	scaled: {
		rank: new ExpantaNum(50),
		rankCheap: new ExpantaNum(10),
		tier: new ExpantaNum(8),
		rf: new ExpantaNum(35),
		fn: new ExpantaNum(6),
		bf: new ExpantaNum(15),
		efn: new ExpantaNum(20),
		pathogenUpg: new ExpantaNum(10),
		darkCore: new ExpantaNum(15),
		endorsements: new ExpantaNum(5),
		enlightenments: new ExpantaNum(6),
		spectralGems: new ExpantaNum(5),
		dervBoost: new ExpantaNum(6),
		photons: new ExpantaNum(15),
	},
	superscaled: {
		rank: new ExpantaNum(100),
		rankCheap: new ExpantaNum(20),
		tier: new ExpantaNum(12),
		rf: new ExpantaNum(75),
		fn: new ExpantaNum(15),
		efn: new ExpantaNum(60),
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
		fn: new ExpantaNum(40),
		pathogenUpg: new ExpantaNum(65),
		darkCore: new ExpantaNum(40)
	},
	atomic: { 
		rank: new ExpantaNum(800), 
		tier: new ExpantaNum(40), 
		rf: new ExpantaNum(300),
		fn: new ExpantaNum(35000),
	}
};
const SCALING_RES = {
	rank: function (n = 0) {
		return player.rank;
	},
	rankCheap: function (n = 0) {
		return modeActive("extreme") ? player.rankCheap : new ExpantaNum(0);
	},
	tier: function (n = 0) {
		return player.tier;
	},
	rf: function (n = 0) {
		return player.rf;
	},
	fn: function (n = 0) {
		return modeActive("extreme") ? player.furnace.upgrades[n - 1] : new ExpantaNum(0);
	},
	bf: function(n = 0) {
		return modeActive("extreme") ? player.furnace.blueFlame : new ExpantaNum(0);
	},
	efn: function (n = 0) {
		return modeActive("extreme") ? player.furnace.enhancedUpgrades[n - 1] : new ExpantaNum(0);
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
	photons: function(n = 0) {
		return player.elementary.bosons.gauge.photons.upgrades[n - 1];
	},
};
const MULTI_SCALINGS = ["fn", "pathogenUpg", "enlightenments", "photons"]
const SCALING_AMTS = {
	fn: 5,
	efn: 13,
	pathogenUpg: 15,
	enlightenments: 4,
	photons: 4,
}
const REAL_SCALING_NAMES = {
	rank: "ranks",
	rankCheap: "rank cheapeners",
	tier: "tiers",
	rf: "rocket fuel",
	fn: "furnace upgrades",
	bf: "blue flame",
	efn: "enhanced furnace upgrades",
	pathogenUpg: "pathogen upgrades",
	darkCore: "dark cores",
	endorsements: "endorsements",
	enlightenments: "enlightenments",
	spectralGems: "spectral gems",
	dervBoost: "derivative boosts",
	photons: "photon upgrades",
}