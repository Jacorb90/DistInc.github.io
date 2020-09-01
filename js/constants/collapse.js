const COLLAPSE_UNL = new ExpantaNum(50 * DISTANCES.Mpc);
const ESSENCE_MILESTONES = {
	1: {
		req: new ExpantaNum(1),
		desc: "Time goes by 100x faster, but this gets weaker the further you go (minimum 2x, at 50Mpc).",
		disp: function () {
			return showNum(collapseMile1Eff()) + "x";
		}
	},
	2: { 
		req: new ExpantaNum(2),
		desc: "Time goes by faster.",
		disp: function() {
			return showNum(modeActive("extreme")?2:5)+"x"
		},
	},
	3: { req: new ExpantaNum(3), desc: "Start with 10 Rockets on reset." },
	4: { req: new ExpantaNum(5), desc: "Start with 1 Rocket Fuel on reset." },
	5: {
		req: new ExpantaNum(10),
		desc: "Unlock Fuelbot, and Cadaver gain is boosted by Time Cubes.",
		disp: function () {
			return showNum(collapseMile5Eff()) + "x";
		}
	},
	6: { req: new ExpantaNum(15), desc: "Gain 10x more Rockets." },
	7: { req: new ExpantaNum(25), desc: "Keep Time Reversal upgrades on reset." },
	8: {
		req: new ExpantaNum(50),
		desc: "Time Speed multiplies Rocket gain at a reduced rate.",
		disp: function () {
			return showNum(collapseMile8Eff()) + "x";
		}
	},
	9: {
		req: new ExpantaNum(75),
		desc: "Gain 1% of Rocket gain every second (unaffected by Time Speed)."
	},
	10: {
		req: new ExpantaNum(100),
		desc: "Life Essence boosts Cadaver gain.",
		disp: function () {
			return showNum(collapseMile10Eff()) + "x";
		}
	},
	11: { req: new ExpantaNum(1000), desc: "Tiers do not reset Ranks." },
	12: { req: new ExpantaNum(10000), desc: "Ranks do not reset anything." }
};
const EM_AMT = Object.keys(ESSENCE_MILESTONES).length;
