const ELM_TABS = {
	fermions: function () {
		return true;
	},
	bosons: function () {
		return player.elementary.times.gte(2)||hasMltMilestone(3);
	},
	theory: function () {
		return player.elementary.theory.unl||(mltActive(1)&&player.mlt.mlt1selected.length<2);
	},
	hc: function () {
		return player.elementary.hc.unl||(mltActive(1)&&player.mlt.mlt1selected.length<2);
	},
	foam: function() {
		return player.elementary.foam.unl||(mltActive(1)&&player.mlt.mlt1selected.length<2);
	},
	sky: function() {
		return player.elementary.sky.unl||(mltActive(1)&&player.mlt.mlt1selected.length<2);
	},
};

const FULL_ELM_NAMES = {
	fermions: "Fermions",
	bosons: "Bosons",
	theory: "Theory",
	hc: "Hadronic Challenge",
	foam: "Quantum Foam",
	sky: "Skyrmions",
}

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

const HIGGS_UPGS_EXTR_DESCS = {
	"0;0;0": {
		desc: {
			extreme: "Always keep TR Upgrades, the Pathogen Upgrade automator, the Dark Core automator, & Furnace Challenge completions. You also start with Automation unlocked.",
			hikers: "Always keep TR Upgrades, the Pathogen Upgrade automator, the Dark Core automator, and all energy upgrades. You also start with Automation unlocked.",
		},
		active: () => modeActive("extreme") ? "extreme" : (modeActive("hikers_dream") ? "hikers" : false),
	},
	"1;0;0": {
		desc: {
			hikers: "Unlock Auto-Robots, and your best motivation is not reset upon elementary.",
		},
		active: () => modeActive("hikers_dream") ? "hikers" : false,
	},
	"0;0;1": {
		desc: {
			hikers: "You start with 10 Endorsements on reset and raise Consistency to the 1.8th power.",
		},
		active: () => modeActive("hikers_dream") ? "hikers" : false,
	},
	"2;0;0": {
		desc: {
			hikers: "Unlock Auto-Endorsements and boost Meta Omnipotence based on the square root of Higgs Upgrades.",
		},
		active: () => modeActive("hikers_dream") ? "hikers" : false,
	},
	"1;2;0": {
		desc: {
			hikers: "Unlock Auto-Spectral Gem Distribution, you keep Purge Power on reset, and super energy multiplies photons gain.",
		},
		active: () => modeActive("hikers_dream") ? "hikers" : false,
	},
	"1;3;0": {
		desc: {
			hikers: "Angels & Demons boost the Gauge Force effect and the second super energy effect.",
		},
		active: () => modeActive("hikers_dream") ? "hikers" : false,
	},
	"0;3;1": {
		desc: {
			hikers: "Purge Power boosts Quark & Lepton gain and passive energy gain is squared.",
		},
		active: () => modeActive("hikers_dream") ? "hikers" : false,
	},
}

const DE_HIGGS_UPGS = ["5;0;0", "0;0;5", "5;0;5", "4;1;0", "0;1;4", "1;1;1", "3;2;2"]

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
		cost: new ExpantaNum(1e12),
		desc: "Angels & Demons boost the Gauge Force effect.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("1;2;0") },
	},
	"0;3;1": {
		cost: new ExpantaNum(1e12),
		desc: "Purge Power boosts Quark & Lepton gain.",
		unl: function() { return player.elementary.bosons.scalar.higgs.upgrades.includes("0;2;1") },
	},
	"5;0;0": {
		cost: new ExpantaNum(5e20),
		desc: "inf10;4 uses a better formula.",
		unl: function() { return hasDE(3) },
	},
	"0;0;5": {
		cost: new ExpantaNum(5e20),
		desc: "Atomic Rank scaling starts later based on your Higgs Bosons.",
		unl: function() { return hasDE(3) },
	},
	"5;0;5": {
		cost: new ExpantaNum(1e21),
		desc: "inf10;10 uses a better formula.",
		unl: function() { return hasDE(3) },
	},
	"4;1;0": {
		cost: new ExpantaNum(2e20),
		desc: "Gain 666x more Gluons.",
		unl: function() { return hasDE(3) },
	},
	"0;1;4": {
		cost: new ExpantaNum(2e20),
		desc: "The softcap to Pathogen Upgrade 1's effect is nerfed, and Pathogen Upgrade 1's formula is better.",
		unl: function() { return hasDE(3) },
	},
	"6;0;0": {
		cost: new ExpantaNum(5e9),
		desc: "Unlock a new Furnace Challenge.",
		unl: function() { return modeActive("extreme")&&player.elementary.bosons.scalar.higgs.upgrades.includes("1;0;0") },
	},
	"0;0;6": {
		cost: new ExpantaNum(5e9),
		desc: "Both Molten Brick effects use better formulas.",
		unl: function() { return modeActive("extreme")&&player.elementary.bosons.scalar.higgs.upgrades.includes("1;0;0") },
	},
	"6;1;0": {
		cost: new ExpantaNum(1e12),
		desc: "The final Enhanced Furnace Upgrade is stronger based on its level.",
		unl: function() { return modeActive("extreme")&&player.elementary.bosons.scalar.higgs.upgrades.includes("6;0;0") },
	},
	"0;1;6": {
		cost: new ExpantaNum(1e12),
		desc: "Your Molten Bricks are doubled.",
		unl: function() { return modeActive("extreme")&&player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;6") },
	},
	"1;1;1": {
		cost: new ExpantaNum(1.5e24),
		desc: "The Magma Search requirement scales half as fast, and Magma's effect uses a better formula.",
		unl: function() { return hasDE(3) && modeActive("extreme") },
	},
	"2;2;1": {
		cost: new ExpantaNum(1e11),
		desc: "Raise Optimization effect to the power of the number of Higgs Boson upgrades and energy multiples Knowledge gain.",
		unl: function() { return modeActive("hikers_dream") && player.elementary.bosons.scalar.higgs.upgrades.includes("1;2;0") },
	},
	"2;2;2": {
		cost: new ExpantaNum(5e10),
		desc: "Raise Storage to the tenth power and it also boosts Motivation.",
		unl: function() { return modeActive("hikers_dream") && player.elementary.bosons.scalar.higgs.upgrades.includes("0;2;1") },
	},
	"3;2;2": {
		cost: new ExpantaNum(5e22),
		desc: "Square each Omnipotence and Storage",
		unl: function() { return modeActive("hikers_dream") && hasDE(3) },
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
	inflatons: function() {
		return (modeActive("extreme")?player.elementary.foam.unl:player.elementary.hc.unl)&&player.elementary.theory.accelerons.unl
	},
};

const TREE_UPGS = {
	1: {
		cost: function(bought) { return bought.plus(1) },
		target: function(points) { return points.floor() },
		cap: new ExpantaNum(100),
		desc: "Supersymmetric Particles are gained faster based on your Higgs Bosons.",
		effect: function(bought) { 
			let exp = new ExpantaNum(0.1)
			if ((player.elementary.theory.tree.upgrades[26]||new ExpantaNum(0)).gte(1)) exp = new ExpantaNum(0.4)
			let ret = player.elementary.bosons.scalar.higgs.amount.times(new ExpantaNum(bought).pow(2)).plus(1).pow(exp) 
			if (ret.gte(50)) ret = ret.sqrt().times(Math.sqrt(50))
			if (ret.gte(100)) ret = ret.log10().pow(new ExpantaNum(100).logBase(2)).min(ret.cbrt().times(Math.pow(100, 2/3)))
			return ret
		},
		effD: function(e) { return showNum(e)+"x" },
	},
	2: {
		cost: function(bought) { return bought.pow(2).plus(1) },
		target: function(points) { return points.sub(1).sqrt().plus(1).floor() },
		cap: new ExpantaNum(50),
		desc: "Boost Knowledge gain & Higgs Boson gain.",
		effect: function(bought) { return ExpantaNum.pow(100, new ExpantaNum(bought).sqrt()) },
		effD: function(e) { return showNum(e)+"x" },
	},
	3: {
		cost: function(bought) { return bought.pow(3).plus(1) },
		target: function(points) { return points.sub(1).cbrt().plus(1).floor() },
		cap: new ExpantaNum(20),
		desc: "inf4;10 is stronger based on your # of achievements gotten.",
		effect: function(bought) { return ExpantaNum.mul(player.achievements.length, ExpantaNum.mul(0.0001, bought)) },
		effD: function(e) { return "Exponent of effect: "+showNum(5)+" -> "+showNum(e.plus(5)) },
	},
	4: {
		cost: function(bought) { return ExpantaNum.pow(5, bought).times(4) },
		target: function(points) { return points.div(4).max(1).logBase(5).plus(1).floor() },
		cap: new ExpantaNum(10),
		desc: "The Theoriverse's nerf is weakened.",
		effect: function(bought) { return new ExpantaNum(bought).plus(1).times(10).slog(10).sub(1).times(7.6).max(0) },
		effD: function(e) { return "-"+showNum(e)+" Depths" },
	},
	5: {
		cost: function(bought) { return ExpantaNum.pow(2, bought).times(4) },
		target: function(points) { return points.div(4).max(1).logBase(2).plus(1).floor() },
		cap: new ExpantaNum(15),
		desc: "Triple Supersymmetric Particle gain.",
		effect: function(bought) { return ExpantaNum.pow(3, bought) },
		effD: function(e) { return showNum(e)+"x" },
	},
	6: {
		unl: function() { return player.elementary.theory.strings.unl },
		cost: function(bought) { return ExpantaNum.add(bought.times(2), 6) },
		target: function(points) { return points.sub(6).div(2).plus(1).floor() },
		cap: new ExpantaNum(40),
		desc: "Entangled String gain is boosted by your Elementaries.",
		effect: function(bought) { return player.elementary.times.plus(1).pow(new ExpantaNum(bought).pow(0.15).div(5)) },
		effD: function(e) { return showNum(e)+"x" },
	},
	7: {
		unl: function() { return player.elementary.theory.strings.unl },
		cost: function(bought) { return ExpantaNum.add(bought.times(3), 2) },
		target: function(points) { return points.sub(2).div(3).plus(1).floor() },
		cap: new ExpantaNum(5),
		desc: "Scaled Endorsement scaling starts later based on your Primary Strings, and Knowledge gain is boosted in Theoriverse runs.",
		effect: function(bought) { return player.elementary.theory.strings.amounts[0].plus(1).times(10).slog(10).log10().div(5).times(new ExpantaNum(bought).times(75)) },
		effD: function(e) { return "Scaling: "+showNum(e)+" later, Knowledge gain: "+showNum(e.plus(1).pow(10))+"x" },
	},
	8: {
		unl: function() { return player.elementary.theory.preons.unl },
		cost: function(bought) { return ExpantaNum.add(10, bought.pow(2).times(2)) },
		target: function(points) { return points.sub(10).div(2).sqrt().plus(1).floor() },
		cap: new ExpantaNum(16),
		desc: "Superscaled Rocket Fuel scaling is weaker.",
		effect: function(bought) { 
			if (new ExpantaNum(bought).gte(16)) bought = ExpantaNum.sub(20, ExpantaNum.div(20, ExpantaNum.sub(bought, 11)));
			return ExpantaNum.mul(0.05, bought) 
		},
		effD: function(e) { return showNum(e.times(100))+"% weaker" },
	},
	9: {
		unl: function() { return player.elementary.theory.preons.unl },
		cost: function(bought) { return ExpantaNum.add(9, bought.times(3)) },
		target: function(points) { return points.sub(9).div(3).plus(1).floor() },
		cap: new ExpantaNum(90),
		desc: "Preons are gained faster based on your Fermions.",
		effect: function(bought) { return player.elementary.fermions.amount.pow(0.2).times(new ExpantaNum(bought).pow(2)).plus(1) },
		effD: function(e) { return showNum(e)+"x" },
	},
	10: {
		unl: function() { return player.elementary.theory.preons.unl },
		cost: function(bought) { return ExpantaNum.add(14, bought.pow(3).times(7)) },
		target: function(points) { return points.sub(14).div(7).cbrt().plus(1).floor() },
		cap: new ExpantaNum(10),
		desc: "Theoretical Boosters cost less.",
		effect: function(bought) { return ExpantaNum.pow(ExpantaNum.add(bought, 1), 3) },
		effD: function(e) { return showNum(e)+"x cheaper" },
	},
	11: {
		unl: function() { return player.elementary.theory.preons.unl },
		cost: function(bought) { return ExpantaNum.mul(20, bought.div(2).plus(1)) },
		target: function(points) { return points.div(20).sub(1).times(2).plus(1).floor() },
		cap: new ExpantaNum(5),
		desc: "The above upgrade gets extra levels added to its effect based on your Preons.",
		altDesc: "The previous upgrade gets extra levels added to its effect based on your Preons.",
		effect: function(bought) { return player.elementary.theory.preons.amount.plus(1).times(10).slog(10).times(bought) },
		effD: function(e) { return showNum(e)+" extra levels" },
	},
	12: {
		unl: function() { return player.elementary.theory.accelerons.unl },
		cost: function(bought) { return ExpantaNum.mul(100, bought.sqrt().plus(1)).floor() },
		target: function(points) { return points.div(100).sub(1).pow(2).plus(1).floor() },
		cap: new ExpantaNum(12),
		desc: "Accelerons are generated faster based on your Supersymmetric Wave length.",
		effect: function(bought) { return tmp.elm.theory.ss.wavelength.plus(1).pow(0.04).pow(bought) },
		effD: function(e) { return showNum(e)+"x" },
	},
	13: {
		unl: function() { return player.elementary.theory.accelerons.unl },
		cost: function(bought) { return ExpantaNum.mul(5, bought.pow(2).plus(1)).plus(75) },
		target: function(points) { return points.sub(75).div(5).sub(1).sqrt().plus(1).floor() },
		cap: new ExpantaNum(10),
		desc: "Pathogen Upgrades are stronger based on your Bosons.",
		effect: function(bought) { return player.elementary.bosons.amount.plus(1).log10().plus(1).log10().times(ExpantaNum.sqrt(bought)) },
		effD: function(e) { return "+"+showNum(e.times(100))+"%" },
	},
	14: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return ExpantaNum.pow(2, ExpantaNum.pow(2, bought)).times(25) },
		target: function(points) { return points.div(25).max(1).logBase(2).max(1).logBase(2).plus(1).floor() },
		cap: new ExpantaNum(5),
		desc: "The Secondary String effect is stronger.",
		effect: function(bought) { return ExpantaNum.mul(0.1, bought) },
		effD: function(e) { return "^"+showNum(e.plus(1)) },
	},
	15: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return ExpantaNum.pow(2, ExpantaNum.pow(2, bought)).times(25) },
		target: function(points) { return points.div(25).max(1).logBase(2).max(1).logBase(2).plus(1).floor() },
		cap: new ExpantaNum(5),
		desc: "The Tertiary String effect is stronger.",
		effect: function(bought) { return ExpantaNum.mul(0.1, bought) },
		effD: function(e) { return "^"+showNum(e.plus(1)) },
	},
	16: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return ExpantaNum.pow(2, ExpantaNum.pow(2, bought)).times(25) },
		target: function(points) { return points.div(25).max(1).logBase(2).max(1).logBase(2).plus(1).floor() },
		cap: new ExpantaNum(5),
		desc: "The Quaternary String effect is stronger.",
		effect: function(bought) { return ExpantaNum.mul(0.1, bought) },
		effD: function(e) { return "^"+showNum(e.plus(1)) },
	},
	17: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return ExpantaNum.pow(2, ExpantaNum.pow(2, bought)).times(25) },
		target: function(points) { return points.div(25).max(1).logBase(2).max(1).logBase(2).plus(1).floor() },
		cap: new ExpantaNum(5),
		desc: "The Quinary String effect is stronger.",
		effect: function(bought) { return ExpantaNum.mul(0.1, bought) },
		effD: function(e) { return "^"+showNum(e.plus(1)) },
	},
	18: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return ExpantaNum.pow(2, ExpantaNum.pow(2, bought)).times(25) },
		target: function(points) { return points.div(25).max(1).logBase(2).max(1).logBase(2).plus(1).floor() },
		cap: new ExpantaNum(5),
		desc: "The Senary String effect is stronger.",
		effect: function(bought) { return ExpantaNum.mul(0.1, bought) },
		effD: function(e) { return "^"+showNum(e.plus(1)) },
	},
	19: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return ExpantaNum.pow(2, ExpantaNum.pow(2, bought)).times(25) },
		target: function(points) { return points.div(25).max(1).logBase(2).max(1).logBase(2).plus(1).floor() },
		cap: new ExpantaNum(5),
		desc: "The Septenary String effect is stronger.",
		effect: function(bought) { return ExpantaNum.mul(0.1, bought) },
		effD: function(e) { return "^"+showNum(e.plus(1)) },
	},
	20: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return new ExpantaNum(240) },
		cap: new ExpantaNum(1),
		desc: "The EP gain softcap is 50% weaker.",
		effect: function(bought) { return new ExpantaNum(0.5).times(bought) },
		effD: function(e) { return showNum(e.times(100))+"% weaker" },
	},
	21: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return new ExpantaNum(240) },
		cap: new ExpantaNum(1),
		desc: "Each Graviton Boost is twice as strong.",
		effect: function(bought) { return new ExpantaNum(2).times(bought).max(1) },
		effD: function(e) { return showNum(e)+"x" },
	},
	22: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return new ExpantaNum(50) },
		cap: new ExpantaNum(1),
		desc: "Sleptons also boost Squark gain.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	23: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return new ExpantaNum(50) },
		cap: new ExpantaNum(1),
		desc: "Neutralinos also boost Slepton gain.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	24: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return new ExpantaNum(50) },
		cap: new ExpantaNum(1),
		desc: "Charginos also boost Neutralino gain.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	25: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return new ExpantaNum(250) },
		cap: new ExpantaNum(1),
		desc: "Pathogen Upgrades are 150% stronger (additive).",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	26: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return new ExpantaNum(250) },
		cap: new ExpantaNum(1),
		desc: "The topmost Theory Tree Upgrade's effect uses a better formula.",
		altDesc: "The first Supersymmetry Theory Tree Upgrade's effect uses a better formula.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	27: {
		unl: function() { return hasDE(5) },
		cost: function(bought) { return new ExpantaNum(50) },
		cap: new ExpantaNum(1),
		desc: "Collapse Milestone 10 uses a better formula.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	28: {
		unl: function() { return player.elementary.hc.unl },
		cost: function(bought) { return ExpantaNum.mul(400, ExpantaNum.pow(bought, 2).times(1.5).plus(1)).round() },
		target: function(points) { return points.div(400).sub(1).div(1.5).sqrt().plus(1).floor() },
		cap: new ExpantaNum(10),
		desc: "You gain Purge Power outside Purge runs, but at a reduced rate.",
		effect: function(bought) { return ExpantaNum.mul(0.1, bought) },
		effD: function(e) { return showNum(e)+"x" },
	},
	29: {
		unl: function() { return player.elementary.hc.unl },
		cost: function(bought) { return ExpantaNum.pow(bought, 5).plus(25) },
		target: function(points) { return points.sub(25).pow(0.2).plus(1).floor() },
		cap: new ExpantaNum(20),
		desc: "Heavenly Chips & Demonic Souls are generated faster based on your Purge Power.",
		effect: function(bought) { return ExpantaNum.pow(ExpantaNum.mul(0.001, bought).plus(1), player.inf.pantheon.purge.power).times(ExpantaNum.pow(player.inf.pantheon.purge.power.max(1), ExpantaNum.sqrt(bought))) },
		effD: function(e) { return showNum(e)+"x" },
	},
	30: {
		unl: function() { return player.elementary.hc.unl },
		cost: function(bought) { return ExpantaNum.mul(750, ExpantaNum.add(bought, 1)) },
		target: function(points) { return points.div(750).floor() },
		cap: new ExpantaNum(5),
		desc: "Entangled String gain is boosted by your Hadrons.",
		effect: function(bought) { return ExpantaNum.pow(player.elementary.hc.hadrons.plus(1), ExpantaNum.sqrt(bought).div(2)) },
		effD: function(e) { return showNum(e)+"x" },
	},
	31: {
		unl: function() { return player.elementary.hc.unl },
		cost: function(bought) { return ExpantaNum.pow(bought, 2).plus(1).times(1e3) },
		target: function(points) { return points.div(1e3).sub(1).sqrt().plus(1).floor() },
		cap: new ExpantaNum(4),
		desc: "Hadron gain is boosted by your best-ever Endorsements.",
		effect: function(bought) { return ExpantaNum.pow(ExpantaNum.add(1, ExpantaNum.mul(0.05, bought)), player.bestEnd) },
		effD: function(e) { return showNum(e)+"x" },
	},
	32: {
		unl: function() { return player.elementary.hc.unl },
		cost: function(bought) { return new ExpantaNum(100) },
		cap: new ExpantaNum(1),
		desc: "All Quark & Lepton effects are active at once.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	33: {
		unl: function() { return player.elementary.hc.unl },
		cost: function(bought) { return new ExpantaNum(1.5e3) },
		cap: new ExpantaNum(1),
		desc: "The Hadron effect interval occurs twice as often.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	34: {
		unl: function() { return (modeActive("extreme+hikers_dream")?hasDE(5):player.elementary.hc.unl)&&modeActive("extreme") },
		cost: function(bought) { return ExpantaNum.mul(100, ExpantaNum.pow(bought, 2)).plus(50) },
		target: function(points) { return points.sub(50).div(100).sqrt().plus(1).floor() },
		cap: new ExpantaNum(4),
		desc: "The Magma cost of Reforming Magma uses a slower formula.",
		effect: function(bought) { return ExpantaNum.pow(0.9, ExpantaNum.div(bought, 2)) },
		effD: function(e) { return "^"+showNum(e) },
	},
	35: {
		unl: function() { return (modeActive("extreme+hikers_dream")?hasDE(5):player.elementary.hc.unl)&&modeActive("extreme") },
		cost: function(bought) { return new ExpantaNum(150) },
		cap: new ExpantaNum(1),
		desc: "Reformed Magma's effect uses a better formula.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	36: {
		unl: function() { return (modeActive("extreme+hikers_dream")?hasDE(5):player.elementary.hc.unl)&&modeActive("extreme") },
		cost: function(bought) { return ExpantaNum.mul(100, ExpantaNum.pow(bought, 2)).plus(50) },
		target: function(points) { return points.sub(50).div(100).sqrt().plus(1).floor() },
		cap: new ExpantaNum(4),
		desc: "The Knowledge cost of Reforming Magma uses a slower formula.",
		effect: function(bought) { return ExpantaNum.pow(0.75, ExpantaNum.div(bought, 2)) },
		effD: function(e) { return "^"+showNum(e) },
	},
	37: {
		unl: function() { return player.elementary.foam.unl&&modeActive("extreme") },
		cost: function(bought) { return new ExpantaNum(2.3e6) },
		cap: new ExpantaNum(1),
		desc: "The Extreme mode reduction to post-Elementary resource generation is nerfed.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"^0.9 -> ^0.95":"^0.9 -> ^0.9" },
	},
	38: {
		unl: function() { return player.elementary.entropy.unl&&modeActive("extreme") },
		cost: function(bought) { return new ExpantaNum(4e10) },
		cap: new ExpantaNum(1),
		desc: "Base Entropy gain is squared, and the first 5 Foam Boosts are unaffected by the Extreme mode nerf, but only after 45 boosts.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	39: {
		unl: function() { return player.elementary.entropy.unl&&modeActive("extreme") },
		cost: function(bought) { return new ExpantaNum(4e10) },
		cap: new ExpantaNum(1),
		desc: "Entropy gain is increased by 50%.",
		effect: function(bought) { return new ExpantaNum(1).times(bought) },
		effD: function(e) { return e.eq(1)?"Active":"Nothing" },
	},
	40: {
		unl: function() { return hasDE(6) },
		cost: function(bought) { return ExpantaNum.pow(1.1, ExpantaNum.pow(bought, 1.025)).times(1e15) },
		target: function(points) { return points.div(1e15).max(1).logBase(1.1).root(1.025).plus(1).floor() },
		cap: new ExpantaNum(200),
		desc: "The Theoretical Booster cost increases 1% slower.",
		effect: function(bought) { return ExpantaNum.pow(0.99, bought) },
		effD: function(e) { return showNum(e.pow(-1).sub(1).times(100))+"% slower" },
	},
	41: {
		unl: function() { return hasDE(6) },
		cost: function(bought) { return new ExpantaNum(1.2e20) },
		cap: new ExpantaNum(1),
		desc: "Elementaries boost Gauge Speed.",
		effect: function(bought) { 
			let e = player.elementary.times;
			return e.times(bought).plus(1).pow(1.4) 
		},
		effD: function(e) { return showNum(e)+"x" },
	},
	42: {
		unl: function() { return hasDE(6) },
		cost: function(bought) { return new ExpantaNum(1.1e20) },
		cap: new ExpantaNum(1),
		desc: "OoMs of Distance boost Base Knowledge gain & all Foam layers.",
		effect: function(bought) { 
			let log = player.distance.plus(1).log10()
			if (log.gte(1e11)) log = log.log10().times(1e12/12)
			if (log.gte(1e9)) log = ExpantaNum.pow(1e9, log.logBase(1e9).root(10))
			return log.times(bought).plus(1).pow(1.6) 
		},
		effD: function(e) { return showNum(e)+"x" },
	},
}
const TREE_AMT = Object.keys(TREE_UPGS).length
const G_TREE_SECTS = {
	1: function() { return true },
	2: function() { return true },
	3: function() { return true },
	4: function() { return player.elementary.theory.strings.unl },
	5: function() { return player.elementary.theory.preons.unl },
	6: function() { return player.elementary.theory.preons.unl },
	7: function() { return player.elementary.theory.accelerons.unl },
	8: function() { return player.elementary.theory.accelerons.unl },
	9: function() { return hasDE(5) },
	10: function() { return hasDE(5) },
	11: function() { return hasDE(5) },
	12: function() { return player.elementary.hc.unl },
	13: function() { return player.elementary.hc.unl },
	14: function() { return (modeActive("extreme+hikers_dream")?hasDE(5):player.elementary.hc.unl)&&modeActive("extreme") },
	15: function() { return player.elementary.entropy.unl&&modeActive("extreme") },
}

const UNL_STR = function() { 
	if (mltRewardActive(4)) return 10;
	else if (hasDE(2)) return 7
	else return 5 
}
const TOTAL_STR = 10
const STR_REQS = {
	1: new ExpantaNum(0),
	2: new ExpantaNum(0.5),
	3: new ExpantaNum(100),
	4: new ExpantaNum(1e4),
	5: new ExpantaNum(1e7),
	6: new ExpantaNum(1e14),
	7: new ExpantaNum(DISTANCES.pc),
	8: new ExpantaNum(DISTANCES.uni).times("1e800"),
	9: new ExpantaNum(DISTANCES.uni).times("1e2650"),
	10: new ExpantaNum(DISTANCES.uni).times("1e3000"),
}
const STR_NAMES = {
	1: "Primary",
	2: "Secondary",
	3: "Tertiary",
	4: "Quaternary",
	5: "Quinary",
	6: "Senary",
	7: "Septenary",
	8: "Octonary",
	9: "Nonary",
	10: "Dekanary",
}

const MAX_DARK_EXPANDERS = 5
const MAX_DARK_EXPANDERS_MLT_3 = 10
const DARK_EXPANDER_COSTS = {
	1: new ExpantaNum(40),
	2: new ExpantaNum(250),
	3: new ExpantaNum(600),
	4: new ExpantaNum(2e3),
	5: new ExpantaNum(4e3),
	6: new ExpantaNum("1.1111111111111111111111e1111"),
	7: new ExpantaNum("1e39000"),
	8: new ExpantaNum("1e46500"),
	9: new ExpantaNum("1e81725"),
	10: new ExpantaNum("1e108000"),
}
const EXTREME_DE_COSTS = {
	9: new ExpantaNum("1e68500"),
	10: new ExpantaNum("1e80500"), 
}
const HD_DE_COSTS = {
	7: new ExpantaNum("1e38750"),
	8: new ExpantaNum("1e44350"),
}
const DARK_EXPANDER_DESCS = {
	1: "Unlock a third Gluon Upgrade.",
	2: "Unlock two more Strings.",
	3: "Unlock new Higgs Upgrades.",
	4: "Unlock Graviton Boosts.",
	5: "Unlock new Theory Tree Upgrades, and the Theoretical Boost formula is much slower.",
	6: "Unlock new Theory Tree Upgrades, and the Graviton Boost requirement increases half as fast when below 60.",
	7: "Accelerons now reduce the Hadron effect interval.",
	8: "The Primary String effect is squared.",
	9: "The Purge Power effect is divided by 1.01 for every Theoretical Booster, and Octonary, Nonary, & Dekanary String effects are squared.",
	10: "Unlock 2 new rows of Entropy Upgrades.",
}

const ach198check = function() { return tmp.ach?tmp.ach[198].has:false };
const HC_REQ = [new ExpantaNum("e2e7").times(DISTANCES.uni), new ExpantaNum(64)]
const HC_DATA = {
	goal: ["text", [function() { return getHCSelector("goalMlt")?new ExpantaNum(1):Number.MAX_VALUE }, function() { return (tmp.ach?tmp.ach[198].has:false)?(getHCSelector("goalMlt")?player.bestDistance.max(1).log(DISTANCES.mlt).div(ExpantaNum.log(DISTANCES.mlt)).max(1):player.bestDistance.min("e1e9")):"e1e7" }], "main", true], // Index 0: Type, Index 1: Min/Max, Index 2: Tab, Index 3: Unlocked
	goalMlt: ["checkbox", undefined, "main", ach198check],
	rockets: ["checkbox", undefined, "pre", ach198check],
	rf: ["checkbox", undefined, "pre", ach198check],
	noTRU: ["checkbox", undefined, "pre", true],
	noCad: ["checkbox", undefined, "col", true],
	noPU: ["checkbox", undefined, "col", true],
	noDC: ["checkbox", undefined, "col", true],
	noIU: ["checkbox", undefined, "inf", true],
	spaceon: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl }],
	solaris: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl }],
	infinity: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl }],
	eternity: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl }],
	reality: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl }],
	drigganiz: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl }],
	flamis: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl&&modeActive("extreme") }],
	cranius: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl&&modeActive("extreme") }],
	spectra: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl&&modeActive("extreme") }],
	aqualon: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl&&modeActive("extreme") }],
	nullum: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl&&modeActive("extreme") }],
	quantron: ["range", [0, 6], "inf", function() { return player.elementary.theory.inflatons.unl&&modeActive("extreme") }],
	noGems: ["checkbox", undefined, "inf", true],
	purge: ["checkbox", undefined, "inf", true],
	noDS: ["checkbox", undefined, "inf", true],
	noDB: ["checkbox", undefined, "inf", true],
	elm: ["checkbox", undefined, "elm", ach198check],
	fermbos: ["checkbox", undefined, "elm", ach198check],
	tv: ["range", [-1, function() { return (tmp.ach?tmp.ach[198].has:false)?player.elementary.theory.bestDepth.min(100).toNumber():10}], "elm", true],
	sprsym: ["checkbox", undefined, "elm", ach198check],
	tree: ["checkbox", undefined, "elm", ach198check],
	string: ["range", [0, function() { return UNL_STR() }], "elm", ach198check],
	preontb: ["checkbox", undefined, "elm", ach198check],
	aclron: ["checkbox", undefined, "elm", ach198check],
	de: ["range", [0, function() { return mltCompleted(3)?MAX_DARK_EXPANDERS_MLT_3:MAX_DARK_EXPANDERS}], "elm", ach198check],
	infl: ["checkbox", undefined, "elm", ach198check],
	rfrm: ["range", [0, 5], "elm", ach198check],
	etrpy: ["checkbox", undefined, "elm", ach198check],
	sky: ["checkbox", undefined, "elm", ach198check],
	q1: ["checkbox", undefined, "mlt", ach198check],
	q2: ["checkbox", undefined, "mlt", ach198check],
	q3: ["checkbox", undefined, "mlt", ach198check],
	mlt1: ["checkbox", undefined, "mlt", ach198check],
	mlt2: ["checkbox", undefined, "mlt", ach198check],
	mlt3: ["checkbox", undefined, "mlt", ach198check],
	mlt4: ["checkbox", undefined, "mlt", ach198check],
	mlt5: ["checkbox", undefined, "mlt", ach198check],
}
const HC_TITLE = {
	goal: "Challenge goal (in uni)",
	goalMlt: "Challenge goal in mlt",
	rockets: "You cannot gain Rockets", 
	rf: "You cannot gain Rocket Fuel",
	noTRU: "Time Reversal Upgrades do nothing",
	noCad: "You do not gain Cadavers",
	noPU: "Pathogen Upgrades do nothing",
	noDC: "You cannot buy Dark Cores",
	noIU: "You cannot buy Infinity Upgrades",
	spaceon: "Trapped in Spaceon's Challenge (disabled: 0)",
	solaris: "Trapped in Solaris' Challenge (disabled: 0)",
	infinity: "Trapped in Infinity's Challenge (disabled: 0)",
	eternity: "Trapped in Eternity's Challenge (disabled: 0)",
	reality: "Trapped in Reality's Challenge (disabled: 0)",
	drigganiz: "Trapped in Drigganiz's Challenge (disabled: 0)",
	flamis: "Trapped in Flamis's Challenge (disabled: 0)",
	cranius: "Trapped in Cranius's Challenge (disabled: 0)",
	spectra: "Trapped in Spectra's Challenge (disabled: 0)",
	aqualon: "Trapped in Aqualon's Challenge (disabled: 0)",
	nullum: "Trapped in Nullum's Challenge (disabled: 0)",
	quantron: "Trapped in Quantron's Challenge (disabled: 0)",
	noGems: "You cannot gain Spectral Gems",
	purge: "Trapped in Purge",
	noDS: "Derivative Shifts do nothing",
	noDB: "Derivative Boosts do nothing",
	elm: "You cannot gain Elementaries or Elementary Particles (both are reset on start)",
	fermbos: "You cannot gain Fermions or Bosons (both are reset on start)",
	tv: "Trapped in Theoriverse Depth (disabled: -1)",
	sprsym: "Supersymmetric Particles & Wave do nothing",
	tree: "You cannot purchase Theory Tree Upgrades (they are respecced on start)",
	string: "The last X strings do nothing (disabled: 0)",
	preontb: "You cannot gain Preons or Theoretical Boosters (both are reset on start)",
	aclron: "You cannot gain Accelerons (they are reset on start)",
	de: "The last X Dark Expanders do nothing (disabled: 0)",
	infl: "You cannot gain Inflatons (they are reset on start)",
	rfrm: "You can only reform up to the (5-x)th foam (disabled: 0, they are reset on start)",
	etrpy: "You cannot gain Entropy (they are reset on start, along with their upgrades)",
	sky: "You cannot gain Skyrmions, Pions, or Spinors (all are reset on start)",
	q1: "Multiversal Quilt 1 is disabled",
	q2: "Multiversal Quilt 2 is disabled",
	q3: "Multiversal Quilt 3 is disabled",
	mlt1: "Trapped in Multiverse 1 (HC is always unlocked)",
	mlt2: "Trapped in Multiverse 2",
	mlt3: "Trapped in Multiverse 3",
	mlt4: "Trapped in Multiverse 4 (stacks with Theoriverse selector)",
	mlt5: "Trapped in Multiverse 5",
}
const HC_CHALLS = ["spaceon","solaris","infinity","eternity","reality","drigganiz"]
const HC_EXTREME_CHALLS = ["flamis","cranius","spectra","aqualon","nullum","quantron"]
const DYNAMIC_RANGE_HC_SELECTORS = Object.keys(HC_DATA).filter(a => ((HC_DATA[a][1]!==undefined)?(isFunc(HC_DATA[a][1][0])||isFunc(HC_DATA[a][1][1])):false));
const DYNAMIC_UNLOCK_HC_SELECTORS = Object.keys(HC_DATA).filter(a => HC_DATA[a][3] !== true);

const FOAM_REQ = new ExpantaNum("1e42000000")
const FOAM_TABS = {
	foamBoosts: function() { return true },
	qf1: function() { return true },
	entropy: function() { return player.elementary.entropy.unl },
}
const FOAM_BOOST_COSTS = {
	1: {
		1: {
			start: new ExpantaNum(10),
			base: new ExpantaNum(2.5),
			exp: new ExpantaNum(1.2),
		},
		2: {
			start: new ExpantaNum(30),
			base: new ExpantaNum(3),
			exp: new ExpantaNum(1.25),
		},
		3: {
			start: new ExpantaNum(75),
			base: new ExpantaNum(3.5),
			exp: new ExpantaNum(1.3),
		},
	},
	2: {
		1: {
			start: new ExpantaNum(40),
			base: new ExpantaNum(4),
			exp: new ExpantaNum(1.35),
		},
		2: {
			start: new ExpantaNum(250),
			base: new ExpantaNum(4.5),
			exp: new ExpantaNum(1.4),
		},
		3: {
			start: new ExpantaNum(500),
			base: new ExpantaNum(5),
			exp: new ExpantaNum(1.45),
		},
	},
	3: {
		1: {
			start: new ExpantaNum(100),
			base: new ExpantaNum(5.5),
			exp: new ExpantaNum(1.5),
		},
		2: {
			start: new ExpantaNum(400),
			base: new ExpantaNum(6),
			exp: new ExpantaNum(1.55),
		},
		3: {
			start: new ExpantaNum(1e3),
			base: new ExpantaNum(6.5),
			exp: new ExpantaNum(1.6),
		},
	},
	4: {
		1: {
			start: new ExpantaNum(200),
			base: new ExpantaNum(7),
			exp: new ExpantaNum(1.65),
		},
		2: {
			start: new ExpantaNum(750),
			base: new ExpantaNum(7.5),
			exp: new ExpantaNum(1.7),
		},
		3: {
			start: new ExpantaNum(1.2e3),
			base: new ExpantaNum(8),
			exp: new ExpantaNum(1.75),
		},
	},
	5: {
		1: {
			start: new ExpantaNum(250),
			base: new ExpantaNum(8.5),
			exp: new ExpantaNum(1.8),
		},
		2: {
			start: new ExpantaNum(1e3),
			base: new ExpantaNum(9),
			exp: new ExpantaNum(1.85),
		},
		3: {
			start: new ExpantaNum(5e3),
			base: new ExpantaNum(9.5),
			exp: new ExpantaNum(1.9),
		},
	},
}
const QF_NEXTLAYER_COST = {
	1: new ExpantaNum(1e4),
	2: new ExpantaNum(5e3),
	3: new ExpantaNum(1e4),
	4: new ExpantaNum(1.75e3),
	5: new ExpantaNum(1e6),
}
const QFB17_TARGETS = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12]
const ENTROPY_UPGS = 35
const ENTROPY_UPG_COSTS = {
	1: new ExpantaNum(4),
	2: new ExpantaNum(10),
	3: new ExpantaNum(25),
	4: new ExpantaNum(100),
	21: new ExpantaNum(104),
	
	5: new ExpantaNum(135),
	6: new ExpantaNum(150),
	7: new ExpantaNum(215),
	8: new ExpantaNum(235),
	22: new ExpantaNum(525),
	
	9: new ExpantaNum(550),
	10: new ExpantaNum(700),
	11: new ExpantaNum(1500),
	12: new ExpantaNum(1750),
	23: new ExpantaNum(6000),
	
	13: new ExpantaNum(1800),
	14: new ExpantaNum(2350),
	15: new ExpantaNum(2425),
	16: new ExpantaNum(2475),
	24: new ExpantaNum(9000),
	
	17: new ExpantaNum(11111),
	18: new ExpantaNum(12e3),
	19: new ExpantaNum(17500),
	20: new ExpantaNum(18250),
	25: new ExpantaNum(30000),
	
	26: new ExpantaNum(250000),
	27: new ExpantaNum(282500),
	28: new ExpantaNum(420000),
	29: new ExpantaNum(482500),
	34: new ExpantaNum(5e8),
	
	30: new ExpantaNum(580000),
	31: new ExpantaNum(1.03e6),
	32: new ExpantaNum(1.125e6),
	33: new ExpantaNum(1.133e6),
	35: new ExpantaNum(7.75e8),
}
const ENTROPY_UPG_EFFS = {
	2: function() { return ExpantaNum.pow(1.5, player.elementary.theory.depth) },
	3: function() { return ExpantaNum.pow(1.0015, player.rf) },
	4: function() { return (tmp.elm?tmp.elm.entropy.omega:false)?(tmp.elm.entropy.omega.times(2)):new ExpantaNum(0) },
	5: function() { return ExpantaNum.pow(1.03, player.elementary.theory.preons.boosters) },
	7: function() { return player.elementary.hc.hadrons.plus(1).times(10).slog(10).times(modeActive("extreme")?75:25) },
	8: function() { return player.elementary.theory.accelerons.amount.plus(1).times(player.elementary.theory.inflatons.amount.plus(1)).log10().plus(1).log10().plus(1).sqrt() },
	9: function() { return player.elementary.sky.amount.plus(1).logBase(2).times(3).plus(1) },
	14: function() { return player.elementary.entropy.best.plus(1).log10().sqrt().div(6).plus(1) },
	19: function() { return player.elementary.hc.hadrons.plus(1).log10().plus(1).log10().plus(1).pow(10) },
	21: function() { return modeActive("extreme")?player.magma.amount.cbrt().times(75):new ExpantaNum(0) },
	24: function() { return player.elementary.entropy.best.plus(1).root(14) },
	26: function() { return ExpantaNum.pow(10, player.elementary.entropy.amount.plus(1).log10().root(4)) },
	27: function() { return player.elementary.entropy.best.plus(1).log10().plus(1) },
	28: function() { return player.elementary.hc.claimed.plus(1) },
	29: function() { return (tmp.elm?tmp.elm.entropy.omega:false)?(tmp.elm.entropy.omega.plus(1)):new ExpantaNum(1) },
	30: function() { return player.elementary.foam.amounts[0].plus(1).log10().pow(.8) },
	31: function() { return ExpantaNum.pow(player.elementary.entropy.upgrades.length+1, Math.sqrt(player.elementary.entropy.upgrades.length*2)) },
}
const ENTROPY_UPG_AUTO_ORDER = [1,2,3,4,21,
								5,6,7,8,22,
								9,10,11,12,
								13,14,15,16,
								23,24,
								17,18,19,20,25,
								26,27,28,29,
								30,31,32,33,
								34,35];

const SKY_REQ = [
	"4.4e108000026",
	"1e575",
	"1e550"
]
const SKY_TABS = {
	skyrmions() { return true },
	pions() { return true },
	spinors() { return true },
}
const KEEP_ENTUPGS_SKY = [1, 10, 11, 12, 13, 16, 17, 20]
const SKY_FIELD_UPGS_REQS = [1, 5, 20, 100, 750, 2500, 4000]
const SKY_FIELDS = {
	upgs: 13,
	placements: [[8],[10,2,3,11],[6,1,7],[12,4,5,13],[9]],
	1: {
		req: 1,
		pionDesc: "All Rank/Tier scalings start later based on your Pions.",
		spinorDesc: "Add to all Foam Boosts based on your Spinors.",
		baseCost: new ExpantaNum(100),
		costMult: new ExpantaNum(5),
		pionEff(bought) { return player.elementary.sky.pions.amount.plus(1).log10().div(5).pow(0.8).times(25).times(ExpantaNum.sqrt(bought)) },
		spinorEff(bought) { return player.elementary.sky.spinors.amount.plus(1).log10().plus(1).log10().times(ExpantaNum.pow(bought, 1/4)) },
		desc(eff) { return "+"+showNum(eff) },
	},
	2: {
		req: 5,
		pionDesc: "Pathogen Upgrades are stronger (unaffected by softcap).",
		spinorDesc: "Graviton Boosts are stronger.",
		baseCost: new ExpantaNum(1e4),
		costMult: new ExpantaNum(20),
		pionEff(bought) { return ExpantaNum.mul(ExpantaNum.sqrt(bought), 0.15).plus(1).pow(0.8) },
		spinorEff(bought) { return ExpantaNum.mul(ExpantaNum.sqrt(bought), 0.4).plus(1).pow(0.9) },
		desc(eff) { return showNum(eff.sub(1).times(100))+"% stronger" },
	},
	3: {
		req: 5,
		pionDesc: "Skyrmions boost Purge Power gain.",
		spinorDesc: "Skyrmions boost Entropy gain.",
		baseCost: new ExpantaNum(1e4),
		costMult: new ExpantaNum(100),
		pionEff(bought) { return player.elementary.sky.amount.plus(1).log10().plus(1).log10().times(ExpantaNum.sqrt(bought)).sqrt().plus(1) },
		spinorEff(bought) { return player.elementary.sky.amount.plus(1).log10().times(ExpantaNum.sqrt(bought)).plus(1).sqrt() },
		desc(eff) { return showNum(eff)+"x" },
	},
	4: {
		req: 20,
		pionDesc: "The Cadaver effect is stronger.",
		spinorDesc: "The Skyrmion effect is stronger.",
		baseCost: new ExpantaNum(1e5),
		costMult: new ExpantaNum(10),
		pionEff(bought) { return ExpantaNum.mul(ExpantaNum.sqrt(bought), .2).plus(1) },
		spinorEff(bought) { return ExpantaNum.mul(ExpantaNum.pow(bought, .4), .25).plus(1) },
		desc(eff) { return showNum(eff.sub(1).times(100))+"% stronger" },
	},
	5: {
		req: 20,
		pionDesc: "Skyrmions boost Dark Flow.",
		spinorDesc: "Skyrmions boost Supersymmetric Particle gain.",
		baseCost: new ExpantaNum(1e5),
		costMult: new ExpantaNum(10),
		pionEff(bought) {
			let base = player.elementary.sky.amount.plus(1).pow(bought);
			if (base.gte(1e60)) base = ExpantaNum.pow(10, base.log10().times(60).sqrt())
			return base.pow(400) 
		},
		spinorEff(bought) { 
			let base = player.elementary.sky.amount.plus(1).pow(bought)
			if (base.gte(1e60)) base = ExpantaNum.pow(10, base.log10().times(60).sqrt())
			return base.pow(10) 
		},
		desc(eff) { return showNum(eff)+"x" },
	},
	6: {
		req: 100,
		pionDesc: "Ranks boost Pion & Spinor gain.",
		spinorDesc: "Elementary Particles boost Pion & Spinor gain.",
		baseCost: new ExpantaNum(1e6),
		costMult: new ExpantaNum(1e3),
		pionEff(bought) { return player.rank.max(1).pow(bought) },
		spinorEff(bought) { return player.elementary.particles.plus(1).log10().times(50).plus(1).pow(bought) },
		desc(eff) { return showNum(eff)+"x" },
	},
	7: {
		req: 100,
		pionDesc: "Derivative Boosts are stronger based on their amount.",
		spinorDesc: "&Omega; Particles are stronger based on their amount.",
		baseCost: new ExpantaNum(1e6),
		costMult: new ExpantaNum(15),
		pionEff(bought) { return player.inf.derivatives.unlocks.div(10).times(bought).plus(1).sqrt() },
		spinorEff(bought) { return tmp.elm.entropy.omega.div(10).times(bought).plus(1).sqrt() },
		desc(eff) { return showNum(eff.sub(1).times(100))+"% stronger" },
	},
	8: {
		req: 750,
		pionDesc: "All Spinor Upgrades are cheaper.",
		spinorDesc: "All Pion Upgrades are cheaper.",
		baseCost: new ExpantaNum(1e20),
		costMult: new ExpantaNum(1e5),
		pionEff(bought) { return ExpantaNum.pow(100, bought) },
		spinorEff(bought) { return ExpantaNum.pow(100, bought) },
		desc(eff) { return showNum(eff)+"x cheaper" },
	},
	9: {
		req: 750,
		pionDesc: 'The "Time Doesnt Exist" effect is raised to an exponent.',
		spinorDesc: "The Entropy effect is raised to an exponent.",
		baseCost: new ExpantaNum(1e24),
		costMult: new ExpantaNum(1e6),
		pionEff(bought) { return ExpantaNum.add(bought, 1).log10().times(10).plus(1) },
		spinorEff(bought) { return ExpantaNum.add(bought, 1).log10().times(2).plus(1) },
		desc(eff) { return "^"+showNum(eff) },
	},
	10: {
		req: 2500,
		pionDesc: "Tiers use a weaker cost formula, but only if they're not scaled in any way.",
		spinorDesc: "Entropy uses a weaker requirement formula.",
		baseCost: new ExpantaNum(1e38),
		costMult: new ExpantaNum(1e5),
		pionEff(bought) { return ExpantaNum.sub(.8, ExpantaNum.div(.8, ExpantaNum.add(ExpantaNum.mul(bought, 2), 1).log10().div(2).plus(1))) },
		spinorEff(bought) { return ExpantaNum.sub(.75, ExpantaNum.div(.75, ExpantaNum.add(ExpantaNum.mul(bought, 2), 1).log10().plus(1))) },
		desc(eff) { return showNum(eff.times(100))+"% weaker" },
	},
	11: {
		req: 2500,
		pionDesc: "Pathogen Upgrade 1's effect is multiplied.",
		spinorDesc: "Gauge Speed is raised to an exponent.",
		baseCost: new ExpantaNum(1e38),
		costMult: new ExpantaNum(1e5),
		pionEff(bought) { return ExpantaNum.add(ExpantaNum.mul(bought, 2), 1).log10().times(5).plus(1) },
		spinorEff(bought) { return ExpantaNum.add(ExpantaNum.mul(bought, 2), 1).log10().times(2).plus(1) },
		desc(eff) { return showNum(eff) },
	},
	12: {
		req: 4000,
		pionDesc: "The Cadaver effect is raised to an exponent.",
		spinorDesc: "The Skyrmion effect is multiplied.",
		baseCost: new ExpantaNum(1e43),
		costMult: new ExpantaNum(1e12),
		pionEff(bought) { 
			if (bought.gte(3)) bought = bought.logBase(3).plus(2);
			return ExpantaNum.add(ExpantaNum.cbrt(bought), 1).pow(11) 
		},
		spinorEff(bought) { 
			if (bought.gte(2)) bought = bought.logBase(2).plus(1).root(5)
			return ExpantaNum.add(bought, 1).pow(1.65) 
		},
		desc(eff) { return showNum(eff) },
	},
	13: {
		req: 4000,
		pionDesc: "The Perk Accelerator is stronger based on your Inflatons.",
		spinorDesc: "The second Inflaton effect is stronger based on your Ascension Power.",
		baseCost: new ExpantaNum(1e43),
		costMult: new ExpantaNum(1e12),
		pionEff(bought) { return player.elementary.theory.inflatons.amount.plus(1).log10().div(1e3).sqrt().times(bought).plus(1).root(5) },
		spinorEff(bought) { return player.inf.ascension.power.plus(1).log10().div(1e3).sqrt().times(bought).plus(1).sqrt() },
		desc(eff) { return showNum(eff.sub(1).times(100))+"% stronger" },
	},
}
const GREEK_LETTERS = [null, "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigmaf", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"];