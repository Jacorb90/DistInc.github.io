const INF_UNL = new ExpantaNum(Number.MAX_VALUE).times(DISTANCES.uni)
const INF_UPGS = {
	rows: 3,
	cols: 3,
	costs: {
		"1;1": new ExpantaNum(40),
		"1;2": new ExpantaNum(200),
		"1;3": new ExpantaNum(3.5e3),
		"2;1": new ExpantaNum(200),
		"2;2": new ExpantaNum(400),
		"2;3": new ExpantaNum(8e3),
		"3;1": new ExpantaNum(1e3),
		"3;2": new ExpantaNum(8e3),
		"3;3": new ExpantaNum(5e4),
	},
	descs: {
		"1;1": "Ranks & Tiers boost Time Speed.",
		"1;2": "Knowledge boosts Rocket gain.",
		"1;3": "Start with the first 2 rows of Time Reversal upgrades on reset.",
		"2;1": "Knowledge boosts the Rocket effect.",
		"2;2": "Time Speed boosts Knowledge gain at a reduced rate.",
		"2;3": "Knowledge & Time Cubes synergize with one another.",
		"3;1": "Start with 10000 Life Essence on reset.",
		"3;2": "Knowledge & Cadavers synergize with one another.",
		"3;3": "Pathogen Upgrades are 10% stronger.",
	},
	reqs: {
		"1;2": ["1;1"],
		"1;3": ["1;2"],
		"2;1": ["1;1"],
		"2;2": ["1;2", "2;1"],
		"2;3": ["2;2", "1;3"],
		"3;1": ["2;1"],
		"3;2": ["2;2", "3;1"],
		"3;3": ["2;3", "3;2"],
	},
	repeals: {
		"2;2": ["1;2", "2;1"],
		"2;3": ["3;2"],
		"3;2": ["2;1"],
		"3;3": ["2;2"],
	},
	repealed: {
		"1;2": ["2;2"],
		"2;1": ["2;2", "3;2"],
		"2;2": ["3;3"],
		"3;2": ["2;3"],
	},
	effects: {
		"1;1": function() {
			let total = player.rank.plus(player.tier.pow(2))
			let ret = total.plus(1).pow(3)
			return ret
		},
		"1;2": function() {
			let exp = player.inf.knowledge.plus(1).slog(2)
			let ret = player.inf.knowledge.plus(1).log10().plus(1).pow(exp)
			return ret
		},
		"2;1": function() {
			let ret = player.inf.knowledge.plus(1).slog(10).sqrt()
			if (ret.gte(1.1)) ret = ret.pow(0.001).times(ExpantaNum.pow(1.1, 0.999))
			return ret.max(1)
		},
		"2;2": function() {
			let ret = tmp.timeSpeed.log10().plus(1)
			return ret
		},
		"2;3": function() {
			let pow = {
				knowledge: player.tr.cubes.plus(1).slog(10).plus(1).log10(),
				cubes: player.inf.knowledge.plus(1).slog(2).plus(1).log10(),
			}
			return {
				knowledge: player.tr.cubes.plus(1).log10().plus(1).log10().plus(1).pow(pow.knowledge),
				cubes: player.inf.knowledge.plus(1).pow(pow.cubes),
			}
		},
		"3;2": function() {
			let pow = {
				knowledge: player.collapse.cadavers.plus(1).slog(2).plus(1).log10(),
				cadavers: player.inf.knowledge.plus(1).slog(10).plus(1).log10(),
			}
			return {
				knowledge: player.collapse.cadavers.plus(1).log10().plus(1).log10().plus(1).pow(pow.knowledge),
				cadavers: player.inf.knowledge.plus(1).pow(pow.cadavers),
			}
		},
	},
}