// Infinity
const INF_UNL = new ExpantaNum(Number.MAX_VALUE).times(DISTANCES.uni)
const INF_UPGS = {
	rows: 7,
	cols: 6,
	rowReqs: {
		4: function() { return player.inf.endorsements.gte(3) },
		5: function() { return player.inf.endorsements.gte(6) },
		6: function() { return player.inf.endorsements.gte(10) },
		7: function() { return player.inf.endorsements.gte(15) },
	},
	colReqs: {
		4: function() { return player.inf.endorsements.gte(3) },
		5: function() { return player.inf.endorsements.gte(6) },
		6: function() { return player.inf.endorsements.gte(10) },
	},
	costs: {
		"1;1": new ExpantaNum(40),
		"1;2": new ExpantaNum(200),
		"1;3": new ExpantaNum(3.5e3),
		"1;4": new ExpantaNum(1e4),
		"1;5": new ExpantaNum(1e7),
		"1;6": new ExpantaNum(2.5e10),
		"2;1": new ExpantaNum(200),
		"2;2": new ExpantaNum(400),
		"2;3": new ExpantaNum(8e3),
		"2;4": new ExpantaNum(5e4),
		"2;5": new ExpantaNum(1e8),
		"2;6": new ExpantaNum(5e10),
		"3;1": new ExpantaNum(1e3),
		"3;2": new ExpantaNum(8e3),
		"3;3": new ExpantaNum(5e4),
		"3;4": new ExpantaNum(1e5),
		"3;5": new ExpantaNum(2.5e8),
		"3;6": new ExpantaNum(1e11),
		"4;1": new ExpantaNum(1e4),
		"4;2": new ExpantaNum(5e4),
		"4;3": new ExpantaNum(1e5),
		"4;4": new ExpantaNum(2.5e5),
		"4;5": new ExpantaNum(4e8),
		"4;6": new ExpantaNum(2e11),
		"5;1": new ExpantaNum(1e7),
		"5;2": new ExpantaNum(1e8),
		"5;3": new ExpantaNum(2.5e7),
		"5;4": new ExpantaNum(2.5e8),
		"5;5": new ExpantaNum(1e9),
		"5;6": new ExpantaNum(1e12),
		"6;1": new ExpantaNum(2e10),
		"6;2": new ExpantaNum(6e10),
		"6;3": new ExpantaNum(1.8e11),
		"6;4": new ExpantaNum(5.4e11),
		"6;5": new ExpantaNum(1e12),
		"6;6": new ExpantaNum(2e12),
		"7;1": new ExpantaNum(1e13),
		"7;2": new ExpantaNum(2e13),
		"7;3": new ExpantaNum(5e13),
		"7;4": new ExpantaNum(1/0),
		"7;5": new ExpantaNum(1/0),
		"7;6": new ExpantaNum(1/0),
	},
	descs: {
		"1;1": "Ranks & Tiers boost Time Speed.",
		"1;2": "Knowledge boosts Rocket gain.",
		"1;3": "Start with the first 2 rows of Time Reversal upgrades on reset.",
		"1;4": "Start with all Time Reversal upgrades on reset.",
		"1;5": "Scaled Tier scaling is 20% weaker.",
		"1;6": "Scaled Rank & Tier scaling starts 2 later.",
		"2;1": "Knowledge boosts the Rocket effect.",
		"2;2": "Time Speed boosts Knowledge gain at a reduced rate.",
		"2;3": "Knowledge & Time Cubes synergize with one another.",
		"2;4": "Gain 1% of Cadaver gain every second.",
		"2;5": "Superscaled Rank scaling is 5% weaker.",
		"2;6": "Superscaled Rocket Fuel scaling starts 5 later.",
		"3;1": "Start with all Collapse Milestones on reset.",
		"3;2": "Knowledge & Cadavers synergize with one another.",
		"3;3": "Pathogen Upgrades are 10% stronger.",
		"3;4": "Unlock Auto-Pathogen upgrades.",
		"3;5": "Scaled Rocket Fuel scaling is 25% weaker.",
		"3;6": "Pathogen Upgrades softcap 1 later.",
		"4;1": "Dark Flow is twice as fast.", 
		"4;2": "Unlock Auto-Dark Cores.",
		"4;3": "Scaled Rank scaling is 50% weaker.", 
		"4;4": "Inf2;1, inf2;2, inf2;3, & inf3;2 are brought back if repealed.",
		"4;5": "Scaled Pathogen Upgrade scaling starts 2 later.",
		"4;6": "Dark Flow is twice as fast.",
		"5;1": "Dark Flow is twice as fast.", 
		"5;2": "Pathogen Upgrades are 5% stronger.", 
		"5;3": "Gain 10% of Life Essence gain every second.", 
		"5;4": "Cadavers boost Knowledge gain.", 
		"5;5": "Knowledge & Endorsements boost Dark Flow.",
		"5;6": "Perks last longer based on your Knowledge.", 
		"6;1": "Scaled Rocket Fuel scaling starts 10 later.",
		"6;2": "Superscaled Rank scaling starts 5 later.", 
		"6;3": "Pathogen Upgrades are 2.5% stronger.",
		"6;4": "Dark Cores scale 2 later.", 
		"6;5": "Knowledge boosts Ascension Power gain.", 
		"6;6": "Maximum Velocity boosts Acceleration, and you can activate 2 perks at once.",
		"7;1": "Stadium Challenge completions boost perks & make them last longer.",
		"7;2": "Ascension Power & Dark Flow have synergy.",
		"7;3": "Start Infinities with Dark Circles unlocked.",
		"7;4": "???",
		"7;5": "???",
		"7;6": "???",
	},
	reqs: {
		"1;2": ["1;1"],
		"1;3": ["1;2"],
		"1;4": ["2;3"],
		"1;5": ["4;4"],
		"1;6": ["5;5"],
		"2;1": ["1;1"],
		"2;2": ["1;2", "2;1"],
		"2;3": ["2;2", "1;3"],
		"2;4": ["1;4"],
		"2;5": ["4;4"],
		"2;6": ["5;5"],
		"3;1": ["2;1"],
		"3;2": ["2;2", "3;1"],
		"3;3": ["2;3", "3;2"],
		"3;4": ["2;4"],
		"3;5": ["4;4"],
		"3;6": ["5;5"],
		"4;1": ["3;2"],
		"4;2": ["4;1"],
		"4;3": ["4;2"],
		"4;4": ["4;3"],
		"4;5": ["4;4"],
		"4;6": ["5;5"],
		"5;1": ["4;4"],
		"5;2": ["4;4"],
		"5;3": ["4;4"],
		"5;4": ["4;4"],
		"5;5": ["4;5", "5;4",],
		"5;6": ["4;6"],
		"6;1": ["4;4"],
		"6;2": ["4;4"],
		"6;3": ["4;4"],
		"6;4": ["4;4"],
		"6;5": ["4;4"],
		"6;6": ["5;6", "6;5"],
		"7;1": ["6;6"],
		"7;2": ["7;1"],
		"7;3": ["7;2"],
		"7;4": ["7;3"],
		"7;5": ["7;4"],
		"7;6": ["7;5"],
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
			let exp = new ExpantaNum(3)
			if (tmp.inf) if (tmp.inf.stadium.completed("spaceon")) exp = exp.times(STADIUM_REWARDS.effects.spaceon())
			let ret = total.plus(1).pow(exp)
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
		"5;6": function() {
			let base = player.inf.knowledge.div(1e9).plus(1).slog(10).plus(1)
			let exp = player.inf.knowledge.plus(1).log10().plus(1).logBase(13).plus(1)
			let ret = base.pow(exp)
			return ret
		},
		"6;5": function() {
			let ret = player.inf.knowledge.plus(1).log10().plus(1).logBase(14).pow(3).plus(1)
			return ret
		},
		"6;6": function() {
			let ret = tmp.maxVel.plus(1).pow(0.075)
			if (ret.gte("1e1000")) ret = ret.log10().pow(1000/3)
			return ret
		},
		"7;1": function() {
			let ret = ExpantaNum.mul(0.2, player.inf.stadium.completions.length).add(1)
			return ret
		},
		"7;2": function() {
			let pow = player.inf.ascension.power
			let flow = tmp.dc?tmp.dc.flow:new ExpantaNum(1)
			return {
				power: flow.plus(1).log10().sqrt().plus(1),
				flow: pow.plus(1).log10().sqrt().plus(1),
			}
		},
	},
}
const INF_TABS = {
	infinity: function() { return true },
	ascension: function() { return player.inf.endorsements.gte(10) },
	stadium: function() { return player.inf.endorsements.gte(15) },
}

// Ascension
const BASE_PERK_TIME = new ExpantaNum(4)
const PERK_NAMES = ["godhood", "holy", "sainthood", "glory"]

// The Stadium
const STADIUM_DESCS = {
	spaceon: ["You cannot gain Rockets", "Time Speed is raised to the power of 0.1"],
	solaris: ["You cannot gain Cadavers", "Scaled Rocket Fuel scaling starts instantly"],
	infinity: ["You cannot Rank or Tier up", "Maximum Velocity is raised to the power of 0.1"],
	eternity: ["Time Speed does nothing", "Dark Flow is always 0x"],
	reality: ["All resource gain before Infinity is raised to the power of 0.1", "Time Speed does nothing"],
	drigganiz: ["Pathogen Upgrades do nothing & Time Speed is raised to the power of 0.1", "Scaled Rank scaling starts instantly"],
}
const STADIUM_REWARDS = {
	spaceon: "inf1;1 is stronger based on your Rockets.",
	solaris: "Superscaled Rank scaling starts later based on your Cadavers.",
	infinity: "The Rocket Fuel effect is twice as powerful.",
	eternity: "Endorsements & Ascension Power make Ranks boost Time Speed.",
	reality: "Time Cubes are thrice as powerful.",
	drigganiz: "Pathogen Upgrades are 0.75% stronger for every achievement you have.",
	effects: {
		spaceon: function() {
			let ret = player.rockets.plus(1).log10().plus(1).log().pow(2.25).plus(1)
			if (ret.gte(30)) ret = ret.logBase(30).times(30).min(ret)
			return ret
		},
		solaris: function() {
			let ret = player.collapse.cadavers.plus(1).slog(10).pow(3.25)
			if (ret.gte(15)) ret = ret.logBase(15).times(15).min(ret)
			return ret
		},
		eternity: function() {
			let base = player.inf.endorsements.plus(1).times(player.inf.ascension.power.plus(1).slog(10).plus(1))
			let exp = player.inf.endorsements.div(15).plus(1).logBase(2).plus(1).pow(7)
			let totalExp = base.pow(exp)
			if (totalExp.gte(Number.MAX_VALUE)) totalExp = totalExp.log10().times(Number.MAX_VALUE/Math.log10(Number.MAX_VALUE))
			let ret = player.rank.pow(totalExp.log10().div(2))
			return ret.max(1)
		},
		drigganiz: function() {
			let ret = ExpantaNum.mul(0.0075, player.achievements.length)
			return ret
		},
	},
	disp: {
		spaceon: function() { return "^"+showNum(STADIUM_REWARDS.effects.spaceon()) },
		solaris: function() { return "+"+showNum(STADIUM_REWARDS.effects.solaris()) },
		eternity: function() { return "x"+showNum(STADIUM_REWARDS.effects.eternity()) },
		drigganiz: function() { return "+"+showNum(STADIUM_REWARDS.effects.drigganiz().times(100))+"%" },
	},
}
const STADIUM_GOALS = {
	spaceon: [new ExpantaNum("1e800").times(DISTANCES.uni), new ExpantaNum(1e100).times(DISTANCES.uni)],
	solaris: [new ExpantaNum(1e20).times(DISTANCES.uni), new ExpantaNum("1e365").times(DISTANCES.uni)],
	infinity: [new ExpantaNum("1e1500").times(DISTANCES.uni), new ExpantaNum("1e125").times(DISTANCES.uni)],
	eternity: [new ExpantaNum("1e260").times(DISTANCES.uni), new ExpantaNum("1e250").times(DISTANCES.uni)],
	reality: [new ExpantaNum(10).times(DISTANCES.uni), new ExpantaNum(100).times(DISTANCES.pc)],
	drigganiz: [new ExpantaNum(1e16).times(DISTANCES.uni), new ExpantaNum(1e10).times(DISTANCES.uni)],
}