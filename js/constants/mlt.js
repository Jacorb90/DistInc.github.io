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
		desc: "???",
		reward: "???",
		req: new ExpantaNum(1/0),
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

const MLT_MILESTONE_NUM = 2;

const MLT_MILESTONES = [
	{
		req: new ExpantaNum(1),
		desc: "Keep Higgs Upgrades on reset (except the ones that are unlocked through a Dark Expander)",
	}, {
		req: new ExpantaNum(2),
		desc: "Keep Entropy Upgrades on reset (but only the ones that are kept on Skyrmion resets)",
	}, /*{
		req: new ExpantaNum(3),
		desc: "Keep Theory Unlocks, Dark Expanders, and all Higgs Upgrades on reset",
	}, {
		req: new ExpantaNum(4),
		desc: "Unlock Auto-Theoriverse, but you cannot enter the Theoriverse manually",
	}, {
		req: new ExpantaNum(5),
		desc: "Keep your best Hadronic Score on reset",
	}, {
		req: new ExpantaNum(7),
		desc: "Gain 100% of Elementaries gained on reset",
	}, {
		req: new ExpantaNum(8),
		desc: "Unlock Auto-Pion Upgrades",
	}, {
		req: new ExpantaNum(9),
		desc: "Unlock Auto-Spinor Upgrades",
	}, {
		req: new ExpantaNum(10),
		desc: "Unlock Auto-Skyrmions",
	}
	*/
]