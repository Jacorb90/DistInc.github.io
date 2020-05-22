const INF_UNL = new ExpantaNum(Number.MAX_VALUE).times(DISTANCES.uni)
const INF_UPGS = {
	rows: 2,
	cols: 2,
	costs: {
		"1;1": new ExpantaNum(40),
		"1;2": new ExpantaNum(200),
		"2;1": new ExpantaNum(200),
		"2;2": new ExpantaNum(400),
	},
	descs: {
		"1;1": "Ranks & Tiers boost Time Speed.",
		"1;2": "Knowledge boosts Rocket gain.",
		"2;1": "Knowledge boosts the Rocket effect.",
		"2;2": "Time Speed boosts Knowledge gain at a reduced rate.",
	},
	reqs: {
		"1;2": ["1;1"],
		"2;1": ["1;1"],
		"2;2": ["1;2", "2;1"],
	},
	repeals: {
		"2;2": ["1;2", "2;1"]
	},
	repealed: {
		"1;2": ["2;2"],
		"2;1": ["2;2"],
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
			let ret = player.inf.knowledge.plus(1).slog(5)
			return ret.max(1)
		},
		"2;2": function() {
			let ret = tmp.timeSpeed.log10().plus(1)
			return ret
		}
	},
}