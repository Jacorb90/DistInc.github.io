const ELM_TABS = {
	fermions: function () {
		return true;
	},
	bosons: function () {
		return true;
	},
	theory: function () {
		return player.elementary.theory.unl;
	},
};

const QUARK_NAMES = ["up", "down", "charm", "strange", "top", "bottom"];
const QUARK_DESCS = {
	up: "Rocket gain is stronger.",
	down: "Cadaver gain is stronger.",
	charm: "Knowledge gain is stronger.",
	strange: "Pathogen gain is boosted by your Fermions.",
	top: "Lepton gain is faster.",
	bottom: "Ascension Power gain is faster."
};

const LEPTON_NAMES = ["electron", "muon", "tau", "netrion", "vibrino", "psi"];
const LEPTON_DESCS = {
	electron: "Perks are stronger.",
	muon: "The Cadaver effect is boosted.",
	tau: "Knowledge boosts Knowledge gain.",
	netrion: "Pathogen Upgrades are stronger.",
	vibrino: "Derivative Boosts are stronger.",
	psi: "Quark gain is faster."
};

const PHOTON_UPGS = 4;
const PH_CST_SCLD = {
	1: function(exp, s) { return ExpantaNum.pow(5, player.elementary.bosons.gauge.photons.upgrades[0].pow(exp).div(s.pow(exp.sub(1))).pow(2)).times(25) },
	2: function(exp, s) { return ExpantaNum.pow(4, player.elementary.bosons.gauge.photons.upgrades[1].pow(exp).div(s.pow(exp.sub(1))).pow(2)).times(40) },
	3: function(exp, s) { return ExpantaNum.pow(10, player.elementary.bosons.gauge.photons.upgrades[2].pow(exp).div(s.pow(exp.sub(1)))).times(1e4) },
	4: function(exp, s) { return ExpantaNum.pow(2, player.elementary.bosons.gauge.photons.upgrades[3].pow(exp).div(s.pow(exp.sub(1))).pow(1.1).times(ExpantaNum.pow(1.01, player.elementary.bosons.gauge.photons.upgrades[3]))).times(6e4) },
}

const GLUON_COLOURS = ["r", "g", "b", "ar", "ag", "ab"];

const HIGGS_UPGS = {
	"0;0;0": {
		cost: new ExpantaNum(4e4),
		desc: "Always keep TR Upgrades, the Pathogen Upgrade automator, & the Dark Core automator. You also start with Automation unlocked.",
		unl: function() { return true },
	},
	"1;0;0": {
		cost: new ExpantaNum(1e5),
		desc: "Unlock Auto-Robots.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;0") },
	},
	"0;1;0": {
		cost: new ExpantaNum(1e5),
		desc: "Unlock Auto-Infinity Upgrades, and Infinity Upgrades are never repealed.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;0") },
	},
	"0;0;1": {
		cost: new ExpantaNum(1e5),
		desc: "You start with 10 Endorsements on reset.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;0") },
	},
	"2;0;0": {
		cost: new ExpantaNum(1e7),
		desc: "Unlock Auto-Endorsements.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("1;0;0") },
	},
	"0;2;0": {
		cost: new ExpantaNum(1e7),
		desc: "Unlock Auto-Enlightenments.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;1;0") },
	},
	"1;1;0": {
		cost: new ExpantaNum(1.5e5),
		desc: "Quarks, Leptons, Photons, Gravitons, & Higgs Bosons boost Elementary Particle gain.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;1;0")||player.elementary.bosons.scalar.higgs.upgrades.includes("1;0;0") },
	},
	"1;0;1": {
		cost: new ExpantaNum(1.5e5),
		desc: "Perks last 900% longer.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;1")||player.elementary.bosons.scalar.higgs.upgrades.includes("1;0;0") },
	},
	"0;0;2": {
		cost: new ExpantaNum(1e7),
		desc: "Unlock Auto-Perks & the Perk Accelerator.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;1") },
	},
	"0;1;1": {
		cost: new ExpantaNum(1.5e5),
		desc: "Endorsements beyond 36 boost Higgs Boson gain.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;1;0")||player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;1") },
	},
	"3;0;0": {
		cost: new ExpantaNum(2.5e7),
		desc: "Keep Stadium Challenges on reset, and Elementary Particle gain & Higgs Boson gain are increased by 10% for each Higgs Upgrade bought.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("2;0;0") },
	},
	"0;0;3": {
		cost: new ExpantaNum(5e7),
		desc: "Unlock Auto-Derivative Shifts/Boosts, Auto-Endorsements buy max, and you gain Knowledge 200% faster.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;2") },
	},
	"1;2;0": {
		cost: new ExpantaNum(1e8),
		desc: "Unlock Auto-Spectral Gem Distribution, and you keep Purge Power on reset.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;2;0") },
	},
	"0;2;1": {
		cost: new ExpantaNum(2e8),
		desc: "Derivative Boosts are stronger based on your Higgs Bosons.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;2;0") },
	},
	"4;0;0": {
		cost: new ExpantaNum(2e9),
		desc: "Unlock 1 new row & column of Infinity Upgrades.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("3;0;0") },
	},
	"0;0;4": {
		cost: new ExpantaNum(2e9),
		desc: "Knowledge gain & Ascension Power gain are faster based on the Perk Accelerator's speed.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;3") },
	},
	"1;3;0": {
		cost: new ExpantaNum(1e13),
		desc: "Angels & Demons boost the Gauge Force effect.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("1;2;0") },
	},
	"0;3;1": {
		cost: new ExpantaNum(1e13),
		desc: "Purge Power boosts Quark & Lepton gain.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;2;1") },
	},
}

const THEORY_REQ = [new ExpantaNum("1e4000000").times(DISTANCES.uni), new ExpantaNum(1000)]

const TH_TABS = {
	tv: function () {
		return true;
	},
	ss: function () {
		return true
	},
	tree: function() {
		return player.elementary.theory.supersymmetry.unl
	},
	strings: function() {
		return player.elementary.theory.tree.unl
	},
	preons: function() {
		return player.elementary.theory.strings.unl
	},
	accelerons: function() {
		return player.elementary.theory.preons.unl
	},
};

const TREE_UPGS = {
	1: {
		cost: function(bought) { return bought.plus(1) },
		cap: new ExpantaNum(100),
		desc: "Supersymmetric Particles are gained faster based on your Higgs Bosons.",
		effect: function(bought) { 
			let ret = player.elementary.bosons.scalar.higgs.amount.times(new ExpantaNum(bought).pow(2)).plus(1).pow(0.1) 
			if (ret.gte(50)) ret = ret.sqrt().times(Math.sqrt(50))
			if (ret.gte(100)) ret = ret.log10().pow(new ExpantaNum(100).logBase(2)).min(ret.cbrt().times(Math.pow(100, 2/3)))
			return ret
		},
		effD: function(e) { return showNum(e)+"x" },
	},
	2: {
		cost: function(bought) { return bought.pow(2).plus(1) },
		cap: new ExpantaNum(50),
		desc: "Boost Knowledge gain & Higgs Boson gain.",
		effect: function(bought) { return ExpantaNum.pow(100, new ExpantaNum(bought).sqrt()) },
		effD: function(e) { return showNum(e)+"x" },
	},
	3: {
		cost: function(bought) { return bought.pow(3).plus(1) },
		cap: new ExpantaNum(20),
		desc: "inf4;10 is stronger based on your # of achievements gotten.",
		effect: function(bought) { return ExpantaNum.mul(player.achievements.length, ExpantaNum.mul(0.0001, bought)) },
		effD: function(e) { return "Exponent of effect: "+showNum(5)+" -> "+showNum(e.plus(5)) },
	},
	4: {
		cost: function(bought) { return ExpantaNum.pow(5, bought).times(4) },
		cap: new ExpantaNum(10),
		desc: "The Theoriverse's nerf is weakened.",
		effect: function(bought) { return new ExpantaNum(bought).plus(1).times(10).slog(10).sub(1).times(7.6).max(0) },
		effD: function(e) { return "-"+showNum(e)+" Depths" },
	},
	5: {
		cost: function(bought) { return ExpantaNum.pow(2, bought).times(4) },
		cap: new ExpantaNum(80),
		desc: "Triple Supersymmetric Particle gain.",
		effect: function(bought) { return ExpantaNum.pow(3, bought) },
		effD: function(e) { return showNum(e)+"x" },
	},
	6: {
		unl: function() { return player.elementary.theory.strings.unl },
		cost: function(bought) { return ExpantaNum.add(bought.times(2), 6) },
		cap: new ExpantaNum(40),
		desc: "Entangled String gain is boosted by your Elementaries.",
		effect: function(bought) { return player.elementary.times.plus(1).pow(new ExpantaNum(bought).pow(0.15).div(5)) },
		effD: function(e) { return showNum(e)+"x" },
	},
	7: {
		unl: function() { return player.elementary.theory.strings.unl },
		cost: function(bought) { return ExpantaNum.add(bought.times(3), 2) },
		cap: new ExpantaNum(5),
		desc: "Scaled Endorsement scaling starts later based on your Primary Strings, and Knowledge gain is boosted in Theoriverse runs.",
		effect: function(bought) { return player.elementary.theory.strings.amounts[0].plus(1).times(10).slog(10).log10().div(5).times(new ExpantaNum(bought).times(75)) },
		effD: function(e) { return "Scaling: "+showNum(e)+" later, Knowledge gain: "+showNum(e.plus(1).pow(10))+"x" },
	},
	8: {
		unl: function() { return player.elementary.theory.preons.unl },
		cost: function(bought) { return ExpantaNum.add(10, bought.pow(2).times(2)) },
		cap: new ExpantaNum(16),
		desc: "Superscaled Rocket Fuel scaling is 5% weaker (non-compounding).",
		effect: function(bought) { return ExpantaNum.mul(0.05, bought) },
		effD: function(e) { return showNum(e.times(100))+"% weaker" },
	},
	9: {
		unl: function() { return player.elementary.theory.preons.unl },
		cost: function(bought) { return ExpantaNum.add(9, bought.times(3)) },
		cap: new ExpantaNum(90),
		desc: "Preons are gained faster based on your Fermions.",
		effect: function(bought) { return player.elementary.fermions.amount.pow(0.2).times(new ExpantaNum(bought).pow(2)).plus(1) },
		effD: function(e) { return showNum(e)+"x" },
	},
	10: {
		unl: function() { return player.elementary.theory.preons.unl },
		cost: function(bought) { return ExpantaNum.add(14, bought.pow(3).times(7)) },
		cap: new ExpantaNum(35),
		desc: "Theoretical Boosters cost less.",
		effect: function(bought) { return ExpantaNum.pow(ExpantaNum.add(bought, 1), 3) },
		effD: function(e) { return showNum(e)+"x cheaper" },
	},
	11: {
		unl: function() { return player.elementary.theory.preons.unl },
		cost: function(bought) { return ExpantaNum.mul(20, bought.div(2).plus(1)) },
		cap: new ExpantaNum(5),
		desc: "The above upgrade gets extra levels added to its effect based on your Preons.",
		effect: function(bought) { return player.elementary.theory.preons.amount.plus(1).times(10).slog(10).times(bought) },
		effD: function(e) { return showNum(e)+" extra levels" },
	},
	12: {
		unl: function() { return player.elementary.theory.accelerons.unl },
		cost: function(bought) { return ExpantaNum.mul(100, bought.sqrt().plus(1)) },
		cap: new ExpantaNum(12),
		desc: "Accelerons are generated faster based on your Supersymmetric Wave length.",
		effect: function(bought) { return tmp.elm.theory.ss.wavelength.plus(1).pow(0.04).pow(bought) },
		effD: function(e) { return showNum(e)+"x" },
	},
	13: {
		unl: function() { return player.elementary.theory.accelerons.unl },
		cost: function(bought) { return ExpantaNum.mul(5, bought.pow(2).plus(1)).plus(75) },
		cap: new ExpantaNum(25),
		desc: "Pathogen Upgrades are stronger based on your Bosons.",
		effect: function(bought) { return player.elementary.bosons.amount.plus(1).log10().plus(1).log10().times(ExpantaNum.sqrt(bought)) },
		effD: function(e) { return "+"+showNum(e.times(100))+"%" },
	},
}
const TREE_AMT = Object.keys(TREE_UPGS).length

const UNL_STR = function() { return 5 }
const TOTAL_STR = 5
const STR_REQS = {
	1: new ExpantaNum(0),
	2: new ExpantaNum(0.5),
	3: new ExpantaNum(100),
	4: new ExpantaNum(1e4),
	5: new ExpantaNum(1e7),
}
const STR_NAMES = {
	1: "Primary",
	2: "Secondary",
	3: "Tertiary",
	4: "Quaternary",
	5: "Quinary",
	6: "Senary",
	7: "Septenary"
}

const MAX_DARK_EXPANDERS = 1
const DARK_EXPANDER_COSTS = {
	1: new ExpantaNum(40),
}
const DARK_EXPANDER_DESCS = {
	1: "Unlock a third Gluon Upgrade.",
}