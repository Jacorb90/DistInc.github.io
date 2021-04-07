const MLT_TABS = {
	mltMap: function() {
		return true;
	},
	mltMilestones: function() {
		return true;
	},
	quilts: function() {
		return true;
	},
};

const MULIVERSE_ENERGY_BASE = 2;

const MULTIVERSES = 5;

const MLT_DATA = {
	0: {
		desc: "The normal multiverse you've been accustomed to.",
		req: new ExpantaNum(0),
	},
	1: {
		desc: "You can only unlock 2 of the following: Theory, Hadronic Challenge, Quantum Foam, and Skyrmions <b>(unlock them by opening their tabs)</b>. Normal Stadium Challenge completions are also reset.",
		reward: "Normal Stadium Challenge rewards are much stronger, but their challenge goals are much higher. Distance boosts Skyrmion gain.",
		effect: function() { return player.distance.plus(1).log10().plus(1).logBase(3).plus(1) },
		effectDesc: function(e) { return showNum(e)+"x" },
		req: new ExpantaNum(5),
	},
	2: {
		desc: "Maximum Velocity is forced to be active, Pion & Spinor Fields are 40% weaker, and Time Speed & Maximum Velocity are brought to the 1.3th root.",
		reward: "Every third Derivative Boost gives you an extra Derivative Shift (maxes at 6 shifts).",
		req: new ExpantaNum(20),
	},
	3: {
		desc: "You can only unlock 1 of the following: Ascension, Stadium, Pantheon, and Derivatives <b>(unlock them by opening their tabs)</b>. Quark & Lepton exponents are set to 0, and Entropy is disabled.",
		reward: "There are 5 new Dark Expanders",
		req: new ExpantaNum(100),
	},
	4: {
		desc: "You are always trapped in the Theoriverse at Depth 4.5 (unaffected by any depth reductions), which also affects Pion & Spinor gain.",
		extremeDesc: "You are always trapped in the Theoriverse at Depth 4.25 (unaffected by any depth reductions), which also affects Pion & Spinor gain.",
		reward: "Unlock 3 new Strings.",
		req: new ExpantaNum(400),
	},
	5: {
		desc: "Time Speed is brought to the 3.6th root.",
		extremeDesc: "Time Speed is brought to the 2.7th root.",
		reward: "The Purge Power effect goes below zero, and unlock Phantoms (a new Pantheon section). Heavenly Chip & Demonic Soul effects are much stronger.",
		req: new ExpantaNum(2e3),
	},
}

const MLT_MILESTONE_NUM = 24;

const MLT_MILESTONES = [
	{
		req: new ExpantaNum(1),
		desc: "Keep Higgs Upgrades on reset (except the ones that are unlocked through a Dark Expander)",
		extremeDesc: "Keep Higgs Upgrades on reset (except the ones that are unlocked through a Dark Expander), and unlock Auto-Magma.",
	}, {
		req: new ExpantaNum(2),
		desc: "Keep Entropy Upgrades on reset (but only the ones that are kept on Skyrmion resets), and start with 1 Elementary",
	}, {
		req: new ExpantaNum(3),
		desc: "Start with Bosons unlocked, and keep Theory Unlocks, Dark Expanders, and all Higgs Upgrades on reset",
		hdDesc: "Start with Bosons unlocked, and keep Theory Unlocks, Dark Expanders, all Higgs Upgrades, and Energy Upgrades on reset",
	}, {
		req: new ExpantaNum(4),
		desc: "Unlock Auto-Theoriverse, but you cannot enter the Theoriverse manually. Foam autobuyers are always unlocked, Reforming Foam resets nothing, and can be done in bulk.",
	}, {
		req: new ExpantaNum(5),
		desc: "Keep your best Hadronic Score on reset",
	}, {
		req: new ExpantaNum(6),
		desc: "Multiversal Quilt II's second effect also affects Pion & Spinor gain.",
	}, {
		req: new ExpantaNum(7),
		desc: "Gain 100% of Elementaries gained on reset every second",
	}, {
		req: new ExpantaNum(8),
		desc: "Unlock Auto-Pion Field",
		extremeDesc: "Unlock Auto-Pion Field & Auto-Plasma Boosts",
	}, {
		req: new ExpantaNum(9),
		desc: "Unlock Auto-Spinor Field",
	}, {
		req: new ExpantaNum(10),
		desc: "Gain 100% of Skyrmions gained on reset every second",
		extremeDesc: "Gain 100% of Skyrmions gained on reset every second, and the Coal effect is squared.",
	}, {
		req: new ExpantaNum(12),
		desc: "Unspent Multiversal Energy reduces base Skyrmion requirements.",
		effect: function() { 
			let e = player.mlt.energy
			if (e.gte(100)) e = ExpantaNum.pow(10, e.log10().times(2).sqrt())
			return e.plus(1).logBase(1.6).plus(1).sqrt().min(1e3);
		},
		effectDesc: function() { return "Distance: "+formatDistance(SKY_REQ[0])+" -> "+formatDistance(getSkyReqData(0, "mlt"))+"<br>Quark Req: "+showNum(SKY_REQ[1])+" -> "+showNum(getSkyReqData(1, "mlt"))+"<br>Lepton Req: "+showNum(SKY_REQ[2])+" -> "+showNum(getSkyReqData(2, "mlt")) },
	}, {
		req: new ExpantaNum(16),
		desc: "Total Multiversal Energy reduces the &Omega; Particle requirement increase.",
		effect: function() { return player.mlt.totalEnergy.plus(1).log10().plus(1).log10().plus(1) },
		effectDesc: function() { return "Currently: "+showNum(2)+" -> "+showNum(ExpantaNum.root(2, tmp.mlt.mil12reward||1)) },
	}, {
		req: new ExpantaNum(25),
		desc: "The Theory Tree Upgrades that boost String effects have their limit increased by 5, and the Graviton effect is raised to the power of 15.",
		extremeDesc: "The Theory Tree Upgrades that boost String effects have their limit increased by 5, the Graviton effect is raised to the power of 15, and increase the base Plasma exponent by your Derivative Boosts.",
	}, {
		req: new ExpantaNum(40),
		desc: "All Quark/Lepton effects are always active, and always gain Purge Power automatically.",
		extremeDesc: "All Quark/Lepton effects are always active, always gain Purge Power automatically, and gain 10x more White Flame.",
	}, {
		req: new ExpantaNum(100),
		desc: "Atomic Rank scaling is weaker based on your Tiers.",
		effect: function() { return ExpantaNum.div(1, player.tier.plus(1).logBase(6).plus(1)) },
		effectDesc: function() { return "Currently: -"+showNum(ExpantaNum.sub(1, tmp.mlt.mil15reward).times(100)||0)+"%" },
	}, {
		req: new ExpantaNum(180),
		desc: "inf10;1 always affects the last Derivative, and its effect uses a better formula.",
	}, {
		req: new ExpantaNum(300),
		desc: "Multiversal Quilt Upgrade effects are increased based on your Distance.",
		extremeDesc: "Multiversal Quilt Upgrade effects are increased based on your Distance, and gain 100x more White Flame.",
		effect: function() { return player.distance.max(1).logBase(DISTANCES.mlt).plus(1).logBase(2).times(0.01) },
		effectDesc: function() { return "Currently: +"+showNum(tmp.mlt.mil17reward.times(100)||0)+"%" },
	}, {
		req: new ExpantaNum(1.25e3),
		desc: "Foam effect exponents are increased by 0.05.",
		extremeDesc: "Foam effect exponents are increased by 0.05, and gain 20x more White Flame for each Multiverse Milestone from this point onward.",
	}, {
		req: new ExpantaNum(1.75e3),
		desc: "The First String's effect also multiplies Acceleron gain.",
		extremeDesc: "All String effects & Supersymmetric Particle effects multiply Acceleron gain.",
	}, {
		req: new ExpantaNum(5e3),
		desc: "Entangled Strings & Quantum Foam boost Pion & Spinor gain, respectively.",
		effect: function() {
			return {
				pion: ExpantaNum.pow(10, player.elementary.theory.strings.entangled.plus(1).log10().root(4)),
				spinor: ExpantaNum.pow(10, player.elementary.foam.amounts[0].plus(1).log10().root(4)),
			}
		},
		effectDesc: function() { return "Pions: "+showNum(tmp.mlt.mil20reward.pion)+"x<br>Spinors: "+showNum(tmp.mlt.mil20reward.spinor)+"x" },
	}, {
		req: new ExpantaNum(1e4),
		desc: "Auto-Foam Unlocks occur every tick instead of every second, and Re-forming Protoversal Foam cost scaling is 20% weaker.",
	}, {
		req: new ExpantaNum(2e5),
		desc: "Foam Size Upgrades cost less based on your total Foam Size Upgrades bought.",
		effect: function() { 
			let total = player.elementary.foam.upgrades.reduce((a,c) => ExpantaNum.add(a, c));
			return ExpantaNum.pow(10, total.plus(1).log10().pow(4));
		},
		effectDesc: function() { return "Currently: /"+showNum(tmp.mlt.mil22reward) },
	}, {
		req: new ExpantaNum(1e6),
		desc: "Hyper Rank scaling starts 250 later if you are in Multiverse Prime.",
	}, {
		req: new ExpantaNum(2.5e7),
		desc: "Entropy Upgrades cost less based on your Total Multiversal Energy.",
		effect: function() { return player.mlt.totalEnergy.plus(1).log10().plus(1).root(5) },
		effectDesc: function() { return "Currently: /"+showNum(tmp.mlt.mil24reward) },
	},
]

const MLT_1_STADIUM_REWARDS = {
	spaceon: "inf1;1 is stronger based on your Rockets & Rocket Fuel.",
	solaris: "Superscaled Rank & Pathogen Upgrade scalings start later based on your Cadavers.",
	infinity: "The Rocket Fuel effect is 10x as powerful, and uses a better formula.",
	eternity: "Endorsements & Ascension Power make Ranks boost Time Speed.",
	reality: "Rockets, Time Cubes, & Dark Cores are 8x as powerful.",
	drigganiz: "Pathogen Upgrades are stronger based on your achievements gotten.",
	effects: {
		spaceon: function () {
			let mult = tmp.inf.pantheon.chipBoost;
			let ret = player.rockets.plus(1).log10().plus(1).log().pow(2.25).plus(1);
			if (ret.gte(30)) ret = ret.logBase(30).times(30).min(ret);
			ret = ret.times(mult);
			if (player.modes.includes("extreme")) ret = ret.plus(1).log10().plus(1).log10().div(10).plus(1)
			return ret.times(player.rf.times(10).plus(1));
		},
		solaris: function () {
			let mult = tmp.inf.pantheon.chipBoost;
			let ret = player.collapse.cadavers.plus(1).log10().plus(1).log10().pow(3.25);
			if (ret.gte(15)) ret = ret.logBase(15).times(15).min(ret);
			ret = ret.times(mult);
			return ret;
		},
		eternity: function () {
			let mult = tmp.inf.pantheon.chipBoost;
			let base = player.inf.endorsements.plus(1).times(player.inf.ascension.power.plus(1).log10().plus(1).sqrt());
			let exp = player.inf.endorsements.div(10).plus(1).logBase(1.75).plus(1).pow(9);
			let totalExp = base.pow(exp);
			if (totalExp.gte("1e50000"))
				totalExp = totalExp.log10().times(ExpantaNum.div("1e50000", ExpantaNum.log10("1e50000")));
			let ret = player.rank.pow(totalExp.logBase(2));
			ret = ret.pow(mult);
			return ret.times(ExpantaNum.pow(10, 1e6)).max(1);
		},
		drigganiz: function () {
			let ret = ExpantaNum.mul(0.015+0.0001*player.achievements.length, player.achievements.length);
			return ret;
		}
	},
	disp: {
		spaceon: function () {
			return "^" + showNum(STADIUM_REWARDS.effects.spaceon());
		},
		solaris: function () {
			return "+" + showNum(STADIUM_REWARDS.effects.solaris());
		},
		eternity: function () {
			return "x" + showNum(STADIUM_REWARDS.effects.eternity());
		},
		drigganiz: function () {
			return "+" + showNum(STADIUM_REWARDS.effects.drigganiz().times(100)) + "%";
		}
	}
}

const MLT_1_ETERNITY_GOAL_EXP = new ExpantaNum(8e3)
const MLT_1_STADIUM_GOAL_EXP = new ExpantaNum(1.5e5)