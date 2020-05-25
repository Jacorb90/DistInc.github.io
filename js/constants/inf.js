// Infinity
const INF_UNL = new ExpantaNum(Number.MAX_VALUE).times(DISTANCES.uni)
const INF_UPGS = {
	rows: 5,
	cols: 5,
	rowReqs: {
		4: function() { return player.inf.endorsements.gte(3) },
		5: function() { return player.inf.endorsements.gte(6) },
	},
	colReqs: {
		4: function() { return player.inf.endorsements.gte(3) },
		5: function() { return player.inf.endorsements.gte(6) },
	},
	costs: {
		"1;1": new ExpantaNum(40),
		"1;2": new ExpantaNum(200),
		"1;3": new ExpantaNum(3.5e3),
		"1;4": new ExpantaNum(1e4),
		"1;5": new ExpantaNum(1e7),
		"2;1": new ExpantaNum(200),
		"2;2": new ExpantaNum(400),
		"2;3": new ExpantaNum(8e3),
		"2;4": new ExpantaNum(5e4),
		"2;5": new ExpantaNum(1e8),
		"3;1": new ExpantaNum(1e3),
		"3;2": new ExpantaNum(8e3),
		"3;3": new ExpantaNum(5e4),
		"3;4": new ExpantaNum(1e5),
		"3;5": new ExpantaNum(2.5e8),
		"4;1": new ExpantaNum(1e4),
		"4;2": new ExpantaNum(5e4),
		"4;3": new ExpantaNum(1e5),
		"4;4": new ExpantaNum(2.5e5),
		"4;5": new ExpantaNum(4e8),
		"5;1": new ExpantaNum(1e7),
		"5;2": new ExpantaNum(1e8),
		"5;3": new ExpantaNum(2.5e7),
		"5;4": new ExpantaNum(2.5e8),
		"5;5": new ExpantaNum(1e9),
	},
	descs: {
		"1;1": "Ranks & Tiers boost Time Speed.",
		"1;2": "Knowledge boosts Rocket gain.",
		"1;3": "Start with the first 2 rows of Time Reversal upgrades on reset.",
		"1;4": "Start with all Time Reversal upgrades on reset.",
		"1;5": "Scaled Tier scaling is 20% weaker.",
		"2;1": "Knowledge boosts the Rocket effect.",
		"2;2": "Time Speed boosts Knowledge gain at a reduced rate.",
		"2;3": "Knowledge & Time Cubes synergize with one another.",
		"2;4": "Gain 1% of Cadaver gain every second.",
		"2;5": "Superscaled Rank scaling is 5% weaker.",
		"3;1": "Start with 10000 Life Essence on reset.",
		"3;2": "Knowledge & Cadavers synergize with one another.",
		"3;3": "Pathogen Upgrades are 10% stronger.",
		"3;4": "Unlock Auto-Pathogen upgrades.",
		"3;5": "Scaled Rocket Fuel scaling is 25% weaker.",
		"4;1": "Dark Flow is twice as fast.", 
		"4;2": "Unlock Auto-Dark Cores.",
		"4;3": "Scaled Rank scaling is 50% weaker.", 
		"4;4": "Inf2;1, inf2;2, inf2;3, & inf3;2 are brought back if repealed.",
		"4;5": "Scaled Pathogen Upgrade scaling starts 2 later.",
		"5;1": "Dark Flow is twice as fast.", 
		"5;2": "Pathogen Upgrades are 5% stronger.", 
		"5;3": "Gain 10% of Life Essence gain every second.", 
		"5;4": "Cadavers boost Knowledge gain.", 
		"5;5": "Knowledge & Endorsements boost Dark Flow.",
	},
	reqs: {
		"1;2": ["1;1"],
		"1;3": ["1;2"],
		"1;4": ["2;3"],
		"1;5": ["4;4"],
		"2;1": ["1;1"],
		"2;2": ["1;2", "2;1"],
		"2;3": ["2;2", "1;3"],
		"2;4": ["1;4"],
		"2;5": ["4;4"],
		"3;1": ["2;1"],
		"3;2": ["2;2", "3;1"],
		"3;3": ["2;3", "3;2"],
		"3;4": ["2;4"],
		"3;5": ["4;4"],
		"4;1": ["3;2"],
		"4;2": ["4;1"],
		"4;3": ["4;2"],
		"4;4": ["4;3"],
		"4;5": ["4;4"],
		"5;1": ["4;4"],
		"5;2": ["4;4"],
		"5;3": ["4;4"],
		"5;4": ["4;4"],
		"5;5": ["4;5", "5;4",],
	},
	repeals: {
		"2;2": ["1;2", "2;1"],
		"2;3": ["3;2"],
		"2;4": ["3;2"],
		"3;2": ["2;1"],
		"3;3": ["2;2"],
		"4;2": ["2;3"],
		"5;5": ["4;1", "5;1"],
	},
	repealed: {
		"1;2": ["2;2"],
		"2;1": ["2;2", "3;2"],
		"2;2": ["3;3"],
		"2;3": ["4;2"],
		"3;2": ["2;3", "2;4"],
		"4;1": ["5;5"],
		"5;1": ["5;5"],
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
			let ret = tmp.timeSpeed?tmp.timeSpeed.log10().plus(1):new ExpantaNum(1)
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
		"5;4": function() {
			let ret = player.collapse.cadavers.plus(1).log10().plus(1).sqrt()
			return ret
		},
		"5;5": function() {
			let base = player.inf.knowledge.plus(1).log10().plus(1).log10().plus(1)
			let exp = player.inf.endorsements.sqrt()
			let ret = base.pow(exp)
			return ret
		},
	},
}
const INF_TABS = {
	infinity: function() { return true },
	ascension: function() { return player.inf.endorsements.gte(10) },
}

// Ascension
const BASE_PERK_TIME = new ExpantaNum(4)