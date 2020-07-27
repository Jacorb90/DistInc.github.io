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
	derivative_boosts: function() {
		return tmp.elm.bos.hasHiggs("0;0;3")
	},
	spectral_gems: function() {
		return tmp.elm.bos.hasHiggs("1;2;0")
	},
	elementaries: function() {
		return tmp.ach[133].has&&player.elementary.times.gt(0)
	},
};

const AUTOMATOR_X = {
	elementaries: 2,
}

const AUTOMATOR_MODES = {
	elementaries: ["AMOUNT", "TIME"],
}