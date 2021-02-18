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
		notBalanced: true,
		desc: "You can only unlock 2 of the following: Theory, Hadronic Challenge, Quantum Foam, and Skyrmions <b>(unlock them by opening their tabs)</b>. Stadium Challenge completions are also reset.",
		reward: "Stadium Challenge rewards are much stronger, but their challenge goals are much higher.",
		req: new ExpantaNum(3),
	},
	2: {
		desc: "???",
		reward: "???",
		req: new ExpantaNum(1/0),
	},
	3: {
		desc: "???",
		reward: "???",
		req: new ExpantaNum(1/0),
	},
	4: {
		desc: "???",
		reward: "???",
		req: new ExpantaNum(1/0),
	},
	5: {
		desc: "???",
		reward: "???",
		req: new ExpantaNum(1/0),
	},
}

const MLT_MILESTONE_NUM = 10;

const MLT_MILESTONES = [
	{
		req: new ExpantaNum(1),
		desc: "Keep Higgs Upgrades on reset (except the ones that are unlocked through a Dark Expander)",
	}, {
		req: new ExpantaNum(2),
		desc: "Keep Entropy Upgrades on reset (but only the ones that are kept on Skyrmion resets), and start with 1 Elementary",
	}, {
		req: new ExpantaNum(3),
		desc: "Start with Bosons unlocked, and keep Theory Unlocks, Dark Expanders, and all Higgs Upgrades on reset",
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
	}, {
		req: new ExpantaNum(9),
		desc: "Unlock Auto-Spinor Field",
	}, {
		req: new ExpantaNum(10),
		desc: "Gain 100% of Skyrmions gained on reset every second",
	}
	
]

const MLT_1_STADIUM_REWARDS = {
	spaceon: "inf1;1 is stronger based on your Rockets & Rocket Fuel.",
	solaris: "Superscaled Rank & Pathogen Upgrade scalings start later based on your Cadavers.",
	infinity: "The Rocket Fuel effect is 10x as powerful.",
	eternity: "Endorsements & Ascension Power make Ranks boost Time Speed.",
	reality: "Time Cubes are 8x as powerful.",
	drigganiz: "Pathogen Upgrades are 1.5% stronger for every achievement you have.",
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
			let ret = player.collapse.cadavers.plus(1).slog(10).pow(3.25);
			if (ret.gte(15)) ret = ret.logBase(15).times(15).min(ret);
			ret = ret.times(mult);
			return ret;
		},
		eternity: function () {
			let mult = tmp.inf.pantheon.chipBoost;
			let base = player.inf.endorsements.plus(1).times(player.inf.ascension.power.plus(1).log10().plus(1).log10().plus(1));
			let exp = player.inf.endorsements.div(10).plus(1).logBase(1.75).plus(1).pow(9);
			let totalExp = base.pow(exp);
			if (totalExp.gte(Number.MAX_VALUE))
				totalExp = totalExp.log10().times(Number.MAX_VALUE / Math.log10(Number.MAX_VALUE));
			let ret = player.rank.pow(totalExp.log10());
			ret = ret.pow(mult);
			return ret.max(1);
		},
		drigganiz: function () {
			let ret = ExpantaNum.mul(0.015, player.achievements.length);
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

const MLT_1_STADIUM_GOAL_EXP = new ExpantaNum(2e5)