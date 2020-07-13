const TR_UPGS = {
	1: {
		cost: new ExpantaNum(50),
		desc: "Increase Time Cube gain by 10% for each Rank or Tier.",
		current: function () {
			return tmp.tr1;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	2: {
		cost: new ExpantaNum(300),
		desc: "Time goes by (log(n+1)) times faster, where n is your Time Cubes.",
		current: function () {
			return tmp.tr2;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	3: { cost: new ExpantaNum(1000), desc: "The Rank requirement formula is 10% slower." },
	4: {
		cost: new ExpantaNum(2500),
		desc: "Time Cube gain is increased by 33% for every OoM of Rockets (softcaps after a while).",
		current: function () {
			return tmp.tr4;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	5: { cost: new ExpantaNum(15000), desc: "Rocket Fuel is 10% stronger." },
	6: {
		cost: new ExpantaNum(25000),
		desc: "Scrap & Intelligence gain are increased by 10% for every OoM of Time Cubes.",
		current: function () {
			return tmp.tr6;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	7: {
		cost: new ExpantaNum(40000),
		desc: "Time goes by 5% faster for every achievement gotten.",
		current: function () {
			return tmp.tr7;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	8: {
		cost: new ExpantaNum(75000),
		desc: "Rankbot's interval boosts its magnitude.",
		current: function () {
			return tmp.tr8;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	9: {
		cost: new ExpantaNum(1.2e5),
		desc: "Tierbot's interval boosts its magnitude, but not as strongly as the previous upgrade.",
		current: function () {
			return tmp.tr9;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	10: {
		cost: new ExpantaNum(2e5),
		desc: "Rocket gain is increased by 10% for every OoM of Time Cubes (softcaps after a while).",
		current: function () {
			return tmp.tr10;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	11: {
		cost: new ExpantaNum(1e60),
		desc: "Time Cubes and Dark Flow boost each other, and Scaled Rank scaling starts 10 Ranks later.",
		current: function () {
			return tmp.tr11;
		},
		disp: function (g) {
			return "Cubes: " + showNum(g.cg) + "x, Flow: " + showNum(g.dcf) + "x";
		}
	},
	12: {
		cost: new ExpantaNum(1e70),
		desc: "Each component of The Dark Circle boosts Dark Flow, and Scaled Tier scaling starts 2 Tiers later.",
		current: function () {
			return tmp.tr12;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	13: {
		cost: new ExpantaNum(1e105),
		desc: "Each component of The Dark Circle boosts Pathogen Upgrade efficiency.",
		current: function () {
			return tmp.tr13;
		},
		disp: function (x) {
			return "+" + showNum(x.times(100)) + "%";
		}
	},
	14: {
		cost: new ExpantaNum(1e115),
		desc:
			"Tiers do not reset anything, Scaled Tier scaling starts later based on your Dark Cores, and Tiers boost Cadaver gain.",
		current: function () {
			return tmp.tr14;
		},
		disp: function (g) {
			return "Tier scaling: " + showNum(g.ss) + " later, Cadavers: " + showNum(g.cd) + "x";
		}
	},
	15: {
		cost: new ExpantaNum(4.56e123),
		desc:
			"Scaled Rank scaling starts 32 Ranks later, and all effects of The Dark Circle are stronger based on your Dark Cores.",
		current: function () {
			return tmp.tr15;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	16: {
		cost: new ExpantaNum(4),
		desc: "Time Cube gain & Coal gain boost each other.",
		current: function () {
			return { tc: player.furnace.coal.plus(1).log10().sqrt().plus(1), co: player.tr.cubes.plus(1) };
		},
		disp: function (g) {
			return "Cubes: " + showNum(g.tc) + "x, Coal: " + showNum(g.co) + "x";
		}
	},
	17: {
		cost: new ExpantaNum(10),
		desc: "Blue Flame is stronger based on your Time Cubes, and getting Rocket Fuel does not reset anything.",
		current: function () {
			return player.tr.cubes.plus(1).times(10).slog(10);
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	18: {
		cost: new ExpantaNum(500),
		desc: "Time goes by faster based on your Rank Cheapeners.",
		current: function () {
			return ExpantaNum.pow(2, player.rankCheap.sqrt());
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	19: {
		cost: new ExpantaNum(1e5),
		desc: "Rank Cheapener-bot's interval boosts its magnitude.",
		current: function () {
			return tmp.tr19;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	20: {
		cost: new ExpantaNum(1.5e5),
		desc: "Rank Cheapeners also cheapen Tiers, but at a very reduced rate.",
		current: function () {
			return player.rankCheap.plus(1).log10().plus(1).log10().plus(1);
		},
		disp: function (x) {
			return "The tier cost increases " + showNum(x) + "x slower";
		}
	},
	21: { cost: new ExpantaNum(1e13), desc: "Automate The Furnace." },
	22: {
		cost: new ExpantaNum(1e24),
		desc: "Rank Cheapeners are stronger based on your Cadavers (not retroactive).",
		current: function () {
			return player.collapse.cadavers.plus(1).times(10).slog(10).sqrt();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	23: {
		cost: new ExpantaNum(2.5e26),
		desc: "Blue Flame boosts Time Speed.",
		current: function () {
			return ExpantaNum.pow(2.5, player.furnace.blueFlame);
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	24: { cost: new ExpantaNum(1.2e30), desc: "The 'Time Doesnt Exist' achievement effect is 40% stronger." },
	25: { cost: new ExpantaNum(1e34), desc: "Double the Coal effect." },
	26: {
		cost: new ExpantaNum(1e96),
		desc: "Dark Flow boosts Blue Flame.",
		current: function () {
			return tmp.dc.flow.max(1).log10().plus(1);
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	27: {
		cost: new ExpantaNum(1e100),
		desc: "Coal boosts Pathogen Upgrade Power.",
		current: function () {
			return player.furnace.coal.plus(1).times(10).slog(10).sub(1).div(5).max(0);
		},
		disp: function (x) {
			return "+" + showNum(x.times(100)) + "%";
		}
	},
	28: {
		cost: new ExpantaNum(1e136),
		desc: "Coal boosts Rocket gain.",
		current: function () {
			return player.furnace.coal.plus(1).pow(0.15);
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	29: {
		cost: new ExpantaNum(1e150),
		desc: "Dark Fluid & Rockets boost Rocket gain.",
		current: function () {
			return player.rockets.plus(1).logBase(2).pow(player.dc.fluid.plus(1).times(10).slog(10).pow(2));
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	30: {
		cost: new ExpantaNum(1e152),
		desc: "Time Speed is raised to the power of (x+1), where x is based on your Pathogens.",
		current: function () {
			return player.pathogens.amount.plus(1).log10().plus(1).times(10).slog(10).pow(1.7);
		},
		disp: function (x) {
			return "^" + showNum(x);
		}
	}
};
const TR_UPG_AMT = Object.keys(TR_UPGS).length;
