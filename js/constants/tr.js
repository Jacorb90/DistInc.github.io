const TR_UPGS = {
	1: { cost: new ExpantaNum(50), desc: "Increase Time Cube gain by 10% for each Rank or Tier." },
	2: { cost: new ExpantaNum(300), desc: "Time goes by (log(n+1)) times faster, where n is your Time Cubes." },
	3: { cost: new ExpantaNum(1000), desc: "The Rank requirement formula is 10% slower." },
	4: {
		cost: new ExpantaNum(2500),
		desc: "Time Cube gain is increased by 33% for every OoM of Rockets (softcaps at 1e+10 Rockets)."
	},
	5: { cost: new ExpantaNum(15000), desc: "Rocket Fuel is 10% stronger." },
	6: {
		cost: new ExpantaNum(25000),
		desc: "Scrap & Intelligence gain are increased by 10% for every OoM of Time Cubes."
	},
	7: { cost: new ExpantaNum(40000), desc: "Time goes by 5% faster for every achievement gotten." },
	8: { cost: new ExpantaNum(75000), desc: "Rankbot's interval boosts its magnitude." },
	9: {
		cost: new ExpantaNum(1.2e5),
		desc: "Tierbot's interval boosts its magnitude, but not as strongly as the previous upgrade."
	},
	10: {
		cost: new ExpantaNum(2e5),
		desc: "Rocket gain is increased by 10% for every OoM of Time Cubes (softcaps at 1e+10 Time Cubes)."
	},
	11: {
		cost: new ExpantaNum(1e60),
		desc: "Time Cubes and Dark Flow boost each other, and Scaled Rank scaling starts 10 Ranks later."
	},
	12: {
		cost: new ExpantaNum(1e70),
		desc: "Each component of The Dark Circle boosts Dark Flow, and Scaled Tier scaling starts 2 Tiers later."
	},
	13: { cost: new ExpantaNum(1e105), desc: "Each component of The Dark Circle boosts Pathogen Upgrade efficiency." },
	14: {
		cost: new ExpantaNum(1e115),
		desc:
			"Tiers do not reset anything, Scaled Tier scaling starts later based on your Dark Cores, and Tiers boost Cadaver gain."
	},
	15: {
		cost: new ExpantaNum(4.56e123),
		desc:
			"Scaled Rank scaling starts 32 Ranks later, and all effects of The Dark Circle are stronger based on your Dark Cores."
	}
};
const TR_UPG_AMT = Object.keys(TR_UPGS).length;
