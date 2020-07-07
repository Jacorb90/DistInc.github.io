const AUTO_UNL = new ExpantaNum(1e12);
const ROBOT_REQS = {
	rankbot: new ExpantaNum(10),
	tierbot: new ExpantaNum(50),
	fuelbot: new ExpantaNum(1e6),
};
const ROBOT_COST_INC = {
	interval: {
		rankbot: new ExpantaNum(7),
		tierbot: new ExpantaNum(8),
		fuelbot: new ExpantaNum(15),
	},
	magnitude: {
		rankbot: new ExpantaNum(3),
		tierbot: new ExpantaNum(4),
		fuelbot: new ExpantaNum(12),
	},
};
const ROBOT_COST_START = {
	interval: {
		rankbot: new ExpantaNum(2),
		tierbot: new ExpantaNum(2),
		fuelbot: new ExpantaNum(1e5),
	},
	magnitude: {
		rankbot: new ExpantaNum(1),
		tierbot: new ExpantaNum(1),
		fuelbot: new ExpantaNum(4e5),
	},
};
const ROBOT_START_INTERVAL = {
	rankbot: new ExpantaNum(4),
	tierbot: new ExpantaNum(5),
	fuelbot: new ExpantaNum(3600),
};
const ROBOT_FL = {
	rankbot: "ranks",
	tierbot: "tiers",
	fuelbot: "rf",
};
const AUTOMATORS = {
	pathogens: function () {
		return tmp.inf.upgs.has("3;4");
	},
	cores: function () {
		return tmp.inf.upgs.has("4;2");
	},
};
