const AUTO_UNL = new ExpantaNum(1e12);
const ROBOT_REQS = {
	rankbot: new ExpantaNum(10),
	rankCheapbot: new ExpantaNum(30),
	tierbot: new ExpantaNum(50),
	fuelbot: new ExpantaNum(1e6)
};
const ROBOT_COST_INC = {
	interval: {
		rankbot: new ExpantaNum(7),
		rankCheapbot: new ExpantaNum(7.5),
		tierbot: new ExpantaNum(8),
		fuelbot: new ExpantaNum(15)
	},
	magnitude: {
		rankbot: new ExpantaNum(3),
		rankCheapbot: new ExpantaNum(3.5),
		tierbot: new ExpantaNum(4),
		fuelbot: new ExpantaNum(12)
	}
};
const ROBOT_COST_START = {
	interval: {
		rankbot: new ExpantaNum(2),
		rankCheapbot: new ExpantaNum(2),
		tierbot: new ExpantaNum(2),
		fuelbot: new ExpantaNum(1e5)
	},
	magnitude: {
		rankbot: new ExpantaNum(1),
		rankCheapbot: new ExpantaNum(1),
		tierbot: new ExpantaNum(1),
		fuelbot: new ExpantaNum(4e5)
	}
};
const ROBOT_START_INTERVAL = {
	rankbot: new ExpantaNum(4),
	rankCheapbot: new ExpantaNum(4.5),
	tierbot: new ExpantaNum(5),
	fuelbot: new ExpantaNum(3600)
};
const ROBOT_FL = {
	rankbot: "ranks",
	rankCheapbot: "rankCheap",
	tierbot: "tiers",
	fuelbot: "rf"
};
const AUTOMATORS = {
	furnace: function () {
		return player.tr.upgrades.includes(21) && modeActive("extreme");
	},
	pathogens: function () {
		return tmp.inf.upgs.has("3;4")||tmp.elm.bos.hasHiggs("0;0;0");
	},
	cores: function () {
		return tmp.inf.upgs.has("4;2")||tmp.elm.bos.hasHiggs("0;0;0");
	},
	robots: function() {
		return tmp.elm.bos.hasHiggs("1;0;0")
	},
	infinity_upgrades: function() {
		return tmp.elm.bos.hasHiggs("0;1;0")
	},
	endorsements: function() {
		return tmp.elm.bos.hasHiggs("2;0;0")
	},
	perks: function() {
		return tmp.elm.bos.hasHiggs("0;0;2")
	},
	enlightenments: function() {
		return tmp.elm.bos.hasHiggs("0;2;0")
	},
	spectral_gems: function() {
		return tmp.elm.bos.hasHiggs("1;2;0")
	},
	derivative_boosts: function() {
		return tmp.elm.bos.hasHiggs("0;0;3")
	},
	elementaries: function() {
		return tmp.ach[133].has&&player.elementary.times.gt(0)
	},
	photon_upgrades: function() {
		return tmp.ach[166].has
	},
	gluon_upgrades: function() {
		return tmp.ach[166].has
	},
	tree_upgrades: function() {
		return tmp.ach[168].has
	},
	theoriverse: function() {
		return hasMltMilestone(4)
	},
	theoretical_boosters: function() {
		return player.elementary.entropy.upgrades.includes(17)
	},
	foam_unlocks: function() {
		return player.elementary.entropy.upgrades.includes(1)
	},
	entropy: function() {
		return player.elementary.entropy.upgrades.includes(10)
	},
	entropy_upgrades: function() {
		return player.elementary.entropy.upgrades.includes(11)
	},
	pion_field: function() {
		return hasMltMilestone(8)
	},
	spinor_field: function() {
		return hasMltMilestone(9)
	},
	multiverse_runs: function() {
		return tmp.ach[186].has
	},
	magma: function() {
		return hasMltMilestone(1) && modeActive("extreme");
	},
	plasma: function() {
		return hasMltMilestone(8) && modeActive("extreme");
	},
};

const AUTOMATOR_BORDER = {
	furnace: "#c4711d",
	pathogens: "#b6c495",
	cores: "rgb(184, 0, 82)",
	robots: "grey",
	infinity_upgrades: "#fac882",
	endorsements: "#fac882",
	perks: "#ffff5c",
	enlightenments: "#ecf07f",
	spectral_gems: "#ffcc5e",
	derivative_boosts: "#209908",
	elementaries: "#83f7ee",
	photon_upgrades: "#a39c5d",
	gluon_upgrades: "#83f7ee",
	tree_upgrades: "#fcb377",
	theoriverse: "#e66700",
	theoretical_boosters: "#fcb377",
	foam_unlocks: "white",
	entropy: "#dbaca9",
	entropy_upgrades: "#dbaca9",
	pion_field: "#a875d1",
	spinor_field: "#a875d1",
	multiverse_runs: "#837eed",
	magma: "#4d3636",
	plasma: "#49364d",
}

const AUTOMATOR_X = {
	elementaries: 2,
	multiverse_runs: 2,
}

const AUTOMATOR_MODES = {
	elementaries: ["AMOUNT", "TIME"],
	multiverse_runs: ["AMOUNT", "TIME"],
}