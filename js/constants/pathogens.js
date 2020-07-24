const PATHOGENS_UNL = new ExpantaNum(2.5e5);
const PTH_UPGS = {
	1: {
		start: new ExpantaNum(5),
		inc: new ExpantaNum(3.5),
		desc: "Time Reversal Upgrade 2 is boosted by your Pathogens."
	},
	2: { start: new ExpantaNum(100), inc: new ExpantaNum(10), desc: "Rocket gain is boosted by your Cadavers." },
	3: { start: new ExpantaNum(100), inc: new ExpantaNum(10), desc: "Time Cube gain is boosted by your Cadavers." },
	4: { start: new ExpantaNum(800), inc: new ExpantaNum(4), desc: "Maximum Velocity is boosted by your Pathogens." },
	5: { start: new ExpantaNum(300), inc: new ExpantaNum(10 / 3), desc: "Boost Pathogen gain." },
	6: {
		start: new ExpantaNum(800),
		inc: new ExpantaNum(12),
		desc: "The transfer from Cadavers to Life Essence is more efficient."
	},
	7: { start: new ExpantaNum(3000), inc: new ExpantaNum(30), desc: "The rocket gain softcap starts later." },
	8: { start: new ExpantaNum(4000), inc: new ExpantaNum(40), desc: "The rocket effect softcap starts later." },
	9: { start: new ExpantaNum(6000), inc: new ExpantaNum(60), desc: "The cadaver gain softcap starts later." },
	10: { start: new ExpantaNum(8000), inc: new ExpantaNum(80), desc: "The cadaver effect softcap starts later." },
	11: {
		start: new ExpantaNum(1e75),
		inc: new ExpantaNum(1e5),
		desc: "Superscaled Rocket Fuel scaling starts later based on your Pathogens.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	},
	12: {
		start: new ExpantaNum(1e80),
		inc: new ExpantaNum(1e3),
		desc: "Scaled Dark Core scaling starts later based on your Rocket Fuel.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	},
	13: {
		start: new ExpantaNum(1e80),
		inc: new ExpantaNum(10),
		desc: "Pathogen Upgrade 5 gets 2 extra Levels.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	},
	14: {
		start: new ExpantaNum(1e85),
		inc: new ExpantaNum(1e5),
		desc: "Scaled & Superscaled Rank scalings are weaker based on your Dark Cores.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	},
	15: {
		start: new ExpantaNum(1e85),
		inc: new ExpantaNum(1e15),
		desc: "Scaled Endorsement scaling is slightly weaker.",
		unl: function () {
			return tmp.inf ? tmp.inf.upgs.has("2;9") : false;
		}
	}
};
const PTH_AMT = Object.keys(PTH_UPGS).length;

const PTH_UPG_SCS = {
	1: new ExpantaNum(8),
	2: new ExpantaNum(10),
	3: new ExpantaNum(7),
	4: new ExpantaNum(16),
	5: new ExpantaNum(6),
	6: new ExpantaNum(6),
	7: new ExpantaNum(4),
	8: new ExpantaNum(4),
	9: new ExpantaNum(3),
	10: new ExpantaNum(3),
	11: new ExpantaNum(5),
	12: new ExpantaNum(4),
	13: new ExpantaNum(10),
	14: new ExpantaNum(4),
	15: new ExpantaNum(5)
}