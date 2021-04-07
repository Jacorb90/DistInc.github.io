// Infinity
const INF_UNL = new ExpantaNum(Number.MAX_VALUE).times(DISTANCES.uni);
const INF_UPGS = {
	rows: 10,
	cols: 10,
	dispReqs: {
		4: new ExpantaNum(3),
		5: new ExpantaNum(6),
		6: new ExpantaNum(10),
		7: new ExpantaNum(15),
		8: new ExpantaNum(21),
		9: new ExpantaNum(28),
	},
	rowReqs: {
		4: function () {
			return player.inf.endorsements.gte(3);
		},
		5: function () {
			return player.inf.endorsements.gte(6);
		},
		6: function () {
			return player.inf.endorsements.gte(10);
		},
		7: function () {
			return player.inf.endorsements.gte(15);
		},
		8: function () {
			return player.inf.endorsements.gte(21);
		},
		9: function () {
			return player.inf.endorsements.gte(28);
		},
		10: function() {
			return tmp.elm.bos.hasHiggs("4;0;0");
		},
	},
	colReqs: {
		4: function () {
			return player.inf.endorsements.gte(3);
		},
		5: function () {
			return player.inf.endorsements.gte(6);
		},
		6: function () {
			return player.inf.endorsements.gte(10);
		},
		7: function () {
			return player.inf.endorsements.gte(15);
		},
		8: function () {
			return player.inf.endorsements.gte(21);
		},
		9: function () {
			return player.inf.endorsements.gte(28);
		},
		10: function() {
			return tmp.elm.bos.hasHiggs("4;0;0");
		},
	},
	costs: {
		"1;1": new ExpantaNum(40),
		"1;2": new ExpantaNum(200),
		"1;3": new ExpantaNum(3.5e3),
		"1;4": new ExpantaNum(1e4),
		"1;5": new ExpantaNum(1e7),
		"1;6": new ExpantaNum(2.5e10),
		"1;7": new ExpantaNum(5e19),
		"1;8": new ExpantaNum(2e23),
		"1;9": new ExpantaNum(1e35),
		"1;10": new ExpantaNum(1e75),
		"2;1": new ExpantaNum(200),
		"2;2": new ExpantaNum(400),
		"2;3": new ExpantaNum(8e3),
		"2;4": new ExpantaNum(5e4),
		"2;5": new ExpantaNum(1e8),
		"2;6": new ExpantaNum(5e10),
		"2;7": new ExpantaNum(1e21),
		"2;8": new ExpantaNum(2.5e23),
		"2;9": new ExpantaNum(1.2e35),
		"2;10": new ExpantaNum(1e115),
		"3;1": new ExpantaNum(1e3),
		"3;2": new ExpantaNum(8e3),
		"3;3": new ExpantaNum(5e4),
		"3;4": new ExpantaNum(1e5),
		"3;5": new ExpantaNum(2.5e8),
		"3;6": new ExpantaNum(1e11),
		"3;7": new ExpantaNum(4e21),
		"3;8": new ExpantaNum(4e23),
		"3;9": new ExpantaNum(1e39),
		"3;10": new ExpantaNum(1.2e120),
		"4;1": new ExpantaNum(1e4),
		"4;2": new ExpantaNum(5e4),
		"4;3": new ExpantaNum(1e5),
		"4;4": new ExpantaNum(2.5e5),
		"4;5": new ExpantaNum(4e8),
		"4;6": new ExpantaNum(2e11),
		"4;7": new ExpantaNum(7.5e21),
		"4;8": new ExpantaNum(1e24),
		"4;9": new ExpantaNum(2e39),
		"4;10": new ExpantaNum(1.23e123),
		"5;1": new ExpantaNum(1e7),
		"5;2": new ExpantaNum(1e8),
		"5;3": new ExpantaNum(2.5e7),
		"5;4": new ExpantaNum(2.5e8),
		"5;5": new ExpantaNum(1e9),
		"5;6": new ExpantaNum(1e12),
		"5;7": new ExpantaNum(1.5e22),
		"5;8": new ExpantaNum(2.5e24),
		"5;9": new ExpantaNum(2.5e39),
		"5;10": new ExpantaNum(1e138),
		"6;1": new ExpantaNum(2e10),
		"6;2": new ExpantaNum(6e10),
		"6;3": new ExpantaNum(1.8e11),
		"6;4": new ExpantaNum(5.4e11),
		"6;5": new ExpantaNum(1e12),
		"6;6": new ExpantaNum(2e12),
		"6;7": new ExpantaNum(2e22),
		"6;8": new ExpantaNum(6e24),
		"6;9": new ExpantaNum(3e39),
		"6;10": new ExpantaNum(1e142),
		"7;1": new ExpantaNum(1e13),
		"7;2": new ExpantaNum(2e13),
		"7;3": new ExpantaNum(4e13),
		"7;4": new ExpantaNum(5e13),
		"7;5": new ExpantaNum(1e18),
		"7;6": new ExpantaNum(1e20),
		"7;7": new ExpantaNum(5e22),
		"7;8": new ExpantaNum(1e25),
		"7;9": new ExpantaNum(5e43),
		"7;10": new ExpantaNum(1e143),
		"8;1": new ExpantaNum(1.5e26),
		"8;2": new ExpantaNum(2e26),
		"8;3": new ExpantaNum(3.2e26),
		"8;4": new ExpantaNum(4.8e26),
		"8;5": new ExpantaNum(1.2e27),
		"8;6": new ExpantaNum(5e27),
		"8;7": new ExpantaNum(7.5e27),
		"8;8": new ExpantaNum(4e28),
		"8;9": new ExpantaNum(1e44),
		"8;10": new ExpantaNum(1e147),
		"9;1": new ExpantaNum(2.5e30),
		"9;2": new ExpantaNum(3e31),
		"9;3": new ExpantaNum(6.4e31),
		"9;4": new ExpantaNum(2.5e32),
		"9;5": new ExpantaNum(4e32),
		"9;6": new ExpantaNum(3.33e33),
		"9;7": new ExpantaNum(1e34),
		"9;8": new ExpantaNum(1.5e34),
		"9;9": new ExpantaNum(2e44),
		"9;10": new ExpantaNum(1e149),
		"10;1": new ExpantaNum(4e76),
		"10;2": new ExpantaNum(1.5e118),
		"10;3": new ExpantaNum(4e119),
		"10;4": new ExpantaNum(1.22e122),
		"10;5": new ExpantaNum(1e140),
		"10;6": new ExpantaNum(1e141),
		"10;7": new ExpantaNum(1e143),
		"10;8": new ExpantaNum(1.2e143),
		"10;9": new ExpantaNum(1e158),
		"10;10": new ExpantaNum(1.5e161),
	},
	descs: {
		"1;1": "Ranks & Tiers boost Time Speed.",
		"1;2": "Knowledge boosts Rocket gain.",
		"1;3": "Start with the first 2 rows of Time Reversal upgrades on reset.",
		"1;4": "Keep Time Reversal upgrades on reset.",
		"1;5": "Scaled Tier scaling is 20% weaker.",
		"1;6": "Scaled Rank & Tier scaling starts 2 later.",
		"1;7": "Before any other boosts, Knowledge gain is raised to the power of 1.25.",
		"1;8": "Time Reversal Upgrade 11 is stronger based on your Accelerational Energy.",
		"1;9": "inf9;7 is stronger based on your Tier.",
		"1;10": "Hyper Tier scaling is weaker based on your Knowledge.",
		"2;1": "Knowledge boosts the Rocket effect.",
		"2;2": "Time Speed boosts Knowledge gain at a reduced rate.",
		"2;3": "Knowledge & Time Cubes synergize with one another.",
		"2;4": "Gain 1% of Cadaver gain every second.",
		"2;5": "Superscaled Rank scaling is 5% weaker.",
		"2;6": "Superscaled Rocket Fuel scaling starts 5 later.",
		"2;7": "Scaled Tier scaling is weaker based on your Stadium Challenge completions.",
		"2;8": "Base Knowledge gain is boosted by Heavenly Chips & Demonic Souls.",
		"2;9": "Unlock 5 new Pathogen Upgrades.",
		"2;10": "Superscaled Dark Core scaling starts 5 later, triple Base Knowledge gain, & before any other boosts, Knowledge gain is raised to the power of 1.15.",
		"3;1": "Start with all Collapse Milestones on reset.",
		"3;2": "Knowledge & Cadavers synergize with one another.",
		"3;3": "Pathogen Upgrades are 10% stronger.",
		"3;4": "Unlock Auto-Pathogen upgrades.",
		"3;5": "Scaled Rocket Fuel scaling is 25% weaker.",
		"3;6": "Pathogen Upgrades softcap 1 later.",
		"3;7": "Enlightenments boost Ascension Power gain.",
		"3;8": "Pathogen Upgrades 6-10 use better formulas.",
		"3;9": "Ascension Power gain is boosted by your Rocket Fuel.",
		"3;10": "Robot Intervals boost Heavenly Chip gain.",
		"4;1": "Dark Flow is twice as fast.",
		"4;2": "Unlock Auto-Dark Cores.",
		"4;3": "Scaled Rank scaling is 50% weaker.",
		"4;4": "Inf2;1, inf2;2, inf2;3, & inf3;2 are brought back if repealed.",
		"4;5": "Scaled Pathogen Upgrade scaling starts 2 later.",
		"4;6": "Dark Flow is twice as fast.",
		"4;7": "Time Speed boosts Acceleration & Maximum Velocity.",
		"4;8": "Life Essence multiplies Rocket gain.",
		"4;9": "Ranks & Tiers do not reset Derivatives beyond Acceleration.",
		"4;10": "'The Universe Doesnt Exist' reward is stronger based on your Elementaries.",
		"5;1": "Dark Flow is twice as fast.",
		"5;2": "Pathogen Upgrades are 5% stronger.",
		"5;3": "Gain 10% of Life Essence gain every second.",
		"5;4": "Cadavers boost Knowledge gain.",
		"5;5": "Knowledge & Endorsements boost Dark Flow.",
		"5;6": "Perks last longer based on your Knowledge.",
		"5;7": "Superscaled Tier scaling starts later based on your Maximum Velocity.",
		"5;8": "Rockets also boost Accelerational Energy.",
		"5;9": "The Spectral Gem requirement starts earlier.",
		"5;10": "Higgs Bosons & Pathogen gain are synergized.",
		"6;1": "Scaled Rocket Fuel scaling starts 10 later.",
		"6;2": "Superscaled Rank scaling starts 5 later.",
		"6;3": "Pathogen Upgrades are 2.5% stronger.",
		"6;4": "Dark Cores scale 2 later.",
		"6;5": "Knowledge boosts Ascension Power gain.",
		"6;6": "Maximum Velocity boosts Acceleration, and you can activate 2 perks at once.",
		"6;7": "Maximum Velocity is replaced by Velocital Energy.",
		"6;8": "Dark Matter & Dark Energy use better formulas.",
		"6;9": "Multipliers to Derivatives beyond Velocity are raised to the power of 4.",
		"6;10": "The Rocket effect exponent is multiplied by 16.",
		"7;1": "Stadium Challenge completions boost perks & make them last longer.",
		"7;2": "Ascension Power & Dark Flow have synergy.",
		"7;3": "Start Infinities with Dark Circles unlocked.",
		"7;4": "inf2;3 & inf3;2 are stronger based on your Pathogens.",
		"7;5": "The fifth Pathogen Upgrade boosts itself.",
		"7;6": "Dark Flow is increased by 20% for every Dark Core.",
		"7;7": "Unlock Accelerational Energy, which is created based on your Ranks & Tiers, and boosts your Velocital Energy, which in turn boosts your Time Speed.",
		"7;8": "Spectral Gems, Angels, & Demons boost Dark Flow.",
		"7;9": "Hyper Rank scaling is 2% weaker.",
		"7;10": "The W Boson boost to Z Boson gain uses a better formula.",
		"8;1": "The Dark Circle cycle reduction uses a much weaker formula.",
		"8;2": "Accelerational Energy & Purge Power gain are synergized.",
		"8;3": "Heavenly Chip & Demonic Soul gain are boosted by Endorsements.",
		"8;4": "The Time Doesn't Exist reward softcap start is multiplied by your Purge Power ^17.",
		"8;5": "The Cadaver effect softcap is 80% weaker.",
		"8;6": "Scaled Dark Core & Hyper Rank scaling is weaker based on Endorsements.",
		"8;7": "Scaled Pathogen Upgrade scaling is 84% weaker.",
		"8;8": "inf8;1 & inf3;8 are stronger based on your Purge Power.",
		"8;9": "Ascension Power gain is 10x faster.",
		"8;10": "Gauge Force uses a better formula to get its reward.",
		"9;1": "Jerk boosts Accelerational Energy & Knowledge gain.",
		"9;2": "Derivative Shifts & Boosts add to the Rocket effect.",
		"9;3": "Angels & Demons are synergized, and Scaled Endorsement scaling starts 1 later.",
		"9;4": "Derivative Boosts boost Time Speed.",
		"9;5": "Pathogen Upgrades are 1% stronger for every Endorsement you have.",
		"9;6": "Superscaled Rank & Tier scalings are weaker based on your Demonic Souls.",
		"9;7": "Derivative Boosts give a better boost to Derivatives based on your Rank.",
		"9;8": "Rocket gain is multiplied by (n+1)^0.1, where n is your Time Cubes (softcaps at higher values).",
		"9;9": "Knowledge gain is multiplied by (n+1)^0.2, where n is your Ascension Power.",
		"9;10": "Pathogen Upgrades are stronger based on your Scalar Bosons.",
		"10;1": "Superscaled Pathogen Upgrade scaling is weaker based on your Ascension Power, and Distance produces Snap at a reduced rate (unaffected by Time Speed).",
		"10;2": "Velocital Energy boosts your Accelerational Energy at a reduced rate, and inf7;7's boost to Velocital Energy uses a better formula.",
		"10;3": "The Rocket effect also affects Time Speed.",
		"10;4": "Robot Magnitudes boost Demonic Soul gain, and the Purge Power effect exponent is halved.",
		"10;5": "Quarks boost Dark Flow & Pathogen gain.",
		"10;6": "Leptons make Perks last longer.",
		"10;7": "Hyper Rocket Fuel scaling starts 20 later.",
		"10;8": "The Perk Accelerator's boost to Perk Power uses a better formula.",
		"10;9": "Gravitons are gained 100x as fast.",
		"10;10": "Dark Flow & Pathogen gain are increased by 90% for every Rank you have & by 750% for every Tier you have.",
	},
	reqs: {
		"1;2": ["1;1"],
		"1;3": ["1;2"],
		"1;4": ["2;3"],
		"1;5": ["4;4"],
		"1;6": ["5;5"],
		"1;7": ["6;6"],
		"1;8": ["7;7"],
		"1;9": ["9;7"],
		"1;10": ["9;9"],
		"2;1": ["1;1"],
		"2;2": ["1;2", "2;1"],
		"2;3": ["2;2", "1;3"],
		"2;4": ["1;4"],
		"2;5": ["4;4"],
		"2;6": ["5;5"],
		"2;7": ["1;7"],
		"2;8": ["1;8"],
		"2;9": ["1;9"],
		"2;10": ["9;9"],
		"3;1": ["2;1"],
		"3;2": ["2;2", "3;1"],
		"3;3": ["2;3", "3;2"],
		"3;4": ["2;4"],
		"3;5": ["4;4"],
		"3;6": ["5;5"],
		"3;7": ["2;7"],
		"3;8": ["2;8"],
		"3;9": ["2;9"],
		"3;10": ["9;9"],
		"4;1": ["3;2"],
		"4;2": ["4;1"],
		"4;3": ["4;2"],
		"4;4": ["4;3"],
		"4;5": ["4;4"],
		"4;6": ["5;5"],
		"4;7": ["3;7"],
		"4;8": ["3;8"],
		"4;9": ["3;9"],
		"4;10": ["9;9"],
		"5;1": ["4;4"],
		"5;2": ["4;4"],
		"5;3": ["4;4"],
		"5;4": ["4;4"],
		"5;5": ["4;5", "5;4"],
		"5;6": ["4;6"],
		"5;7": ["4;7"],
		"5;8": ["4;8"],
		"5;9": ["4;9"],
		"5;10": ["9;9"],
		"6;1": ["4;4"],
		"6;2": ["4;4"],
		"6;3": ["4;4"],
		"6;4": ["4;4"],
		"6;5": ["4;4"],
		"6;6": ["5;6", "6;5"],
		"6;7": ["5;7"],
		"6;8": ["5;8"],
		"6;9": ["5;9"],
		"6;10": ["9;9"],
		"7;1": ["6;6"],
		"7;2": ["7;1"],
		"7;3": ["7;2"],
		"7;4": ["7;3"],
		"7;5": ["7;4"],
		"7;6": ["7;5"],
		"7;7": ["6;7", "7;6"],
		"7;8": ["6;8"],
		"7;9": ["6;9"],
		"7;10": ["9;9"],
		"8;1": ["7;7"],
		"8;2": ["8;1"],
		"8;3": ["8;2"],
		"8;4": ["8;3"],
		"8;5": ["8;4"],
		"8;6": ["8;5"],
		"8;7": ["8;6"],
		"8;8": ["7;8", "8;7"],
		"8;9": ["7;9"],
		"8;10": ["9;9"],
		"9;1": ["8;8"],
		"9;2": ["9;1"],
		"9;3": ["9;2"],
		"9;4": ["9;3"],
		"9;5": ["9;4"],
		"9;6": ["9;5"],
		"9;7": ["9;6"],
		"9;8": ["9;7"],
		"9;9": ["8;9", "9;8"],
		"9;10": ["9;9"],
		"10;1": ["9;9"],
		"10;2": ["9;9"],
		"10;3": ["9;9"],
		"10;4": ["9;9"],
		"10;5": ["9;9"],
		"10;6": ["9;9"],
		"10;7": ["9;9"],
		"10;8": ["9;9"],
		"10;9": ["9;9"],
		"10;10": ["10;9", "9;10"],
	},
	repeals: {
		"2;2": ["1;2", "2;1"],
		"2;3": ["3;2"],
		"2;4": ["3;2"],
		"3;2": ["2;1"],
		"3;3": ["2;2"],
		"4;2": ["2;3"],
		"5;5": ["4;1", "5;1"]
	},
	repealed: {
		"1;2": ["2;2"],
		"2;1": ["2;2", "3;2"],
		"2;2": ["3;3"],
		"2;3": ["4;2"],
		"3;2": ["2;3", "2;4"],
		"4;1": ["5;5"],
		"5;1": ["5;5"]
	},
	effects: {
		"1;1": function () {
			if (nerfActive("noInf1;1") || extremeStadiumActive("spectra", 5)) return new ExpantaNum(1);
			let total = player.rank.plus(player.tier.pow(2));
			let exp = new ExpantaNum(3);
			if (player.modes.includes("extreme")) exp = exp.times(Math.pow(player.inf.upgrades.length+1, 0.54))
			if (tmp.inf) if (tmp.inf.stadium.completed("spaceon")) exp = exp.times(STADIUM_REWARDS.effects.spaceon());
			let ret = total.plus(1).pow(exp);
			return ret;
		},
		"1;2": function () {
			let exp = player.inf.knowledge.plus(1).slog(2);
			let ret = player.inf.knowledge.plus(1).log10().plus(1).pow(exp);
			return ret;
		},
		"1;8": function () {
			let e = tmp.accEn ? tmp.accEn : new ExpantaNum(0);
			let ret = e.plus(1).pow(0.08);
			if (ret.gte(2)) ret = ret.logBase(2).times(2).min(ret);
			if (ret.gte(14)) ret = ret.sub(4).slog(10).plus(13).min(ret);
			return ret;
		},
		"1;9": function () {
			let ret = player.tier.sqrt().div(2).plus(1);
			if (modeActive("extreme") && player.inf.upgrades.includes("9;9")) ret = ret.pow(1.35)
			return ret;
		},
		"1;10": function() {
			let ret = player.inf.knowledge.plus(1).times(10).slog(10).div(10)
			if (ret.gte(0.9)) ret = ret.div(10).plus(0.89)
			if (ret.gte(0.975)) ret = new ExpantaNum(0.975)
			return ret
		},
		"2;1": function () {
			let ret = player.inf.knowledge.plus(1).slog(10).sqrt();
			if (ret.gte(1.1)) ret = ret.pow(0.001).times(ExpantaNum.pow(1.1, 0.999));
			return ret.max(1);
		},
		"2;2": function () {
			let ret = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1) : new ExpantaNum(1);
			if (modeActive('extreme')) ret = ret.div(2).max(1)
			return ret;
		},
		"2;3": function () {
			let exp = new ExpantaNum(1);
			if (tmp.inf) if (tmp.inf.upgs.has("7;4")) exp = exp.times(INF_UPGS.effects["7;4"]());
			let pow = {
				knowledge: player.tr.cubes.plus(1).slog(10).plus(1).log10().times(exp),
				cubes: player.inf.knowledge.plus(1).slog(2).plus(1).log10().times(exp)
			};
			return {
				knowledge: player.tr.cubes.plus(1).log10().plus(1).log10().plus(1).pow(pow.knowledge),
				cubes: player.inf.knowledge.plus(1).pow(pow.cubes)
			};
		},
		"2;7": function () {
			let ret = ExpantaNum.pow(player.inf.stadium.completions.length+(player.extremeStad?player.extremeStad.length:0), 0.8).div(modeActive("extreme")?10:4);
			if (ret.gte(0.9)) ret = new ExpantaNum(0.9);
			return ret;
		},
		"2;8": function () {
			let v = [player.inf.pantheon.heavenlyChips, player.inf.pantheon.demonicSouls];
			let ret = v[0].plus(1).times(v[1].plus(1)).log10().plus(1);
			return ret;
		},
		"3;2": function () {
			let exp = new ExpantaNum(1);
			if (tmp.inf) if (tmp.inf.upgs.has("7;4")) exp = exp.times(INF_UPGS.effects["7;4"]());
			let pow = {
				knowledge: player.collapse.cadavers.plus(1).slog(2).plus(1).log10().times(exp),
				cadavers: player.inf.knowledge.plus(1).slog(10).plus(1).log10().times(exp)
			};
			return {
				knowledge: player.collapse.cadavers.plus(1).log10().plus(1).log10().plus(1).pow(pow.knowledge),
				cadavers: player.inf.knowledge.plus(1).pow(pow.cadavers)
			};
		},
		"3;7": function () {
			let enl = player.inf.ascension.enlightenments.reduce((x, y) => ExpantaNum.add(x, y));
			let ret = ExpantaNum.pow(1.5, enl.sqrt());
			return ret;
		},
		"3;9": function () {
			let ret = ExpantaNum.pow(1.01, player.rf);
			return ret;
		},
		"3;10": function() {
			if (!tmp.auto) return new ExpantaNum(1)
			let f1 = tmp.auto.rankbot.interval.pow(-1).plus(1).min(Number.MAX_VALUE).cbrt()
			let f2 = tmp.auto.tierbot.interval.pow(-1).plus(1).min(Number.MAX_VALUE).cbrt()
			let f3 = tmp.auto.fuelbot.interval.pow(-1).plus(1).min(Number.MAX_VALUE).sqrt()
			return f1.times(f2).times(f3).cbrt()
		},
		"4;7": function () {
			let speed = tmp.timeSpeed;
			let exp = 0.3
			if (player.modes.includes("extreme")) exp = 0.125
			let ret = speed.pow(exp);
			if (ret.gte("1e1000")) ret = ret.min(ret.log10().pow(1000 / 3));
			return ret;
		},
		"4;10": function() {
			let times = new ExpantaNum(player.elementary.times)
			if (times.gte(50)) times = times.sqrt().times(Math.sqrt(50))
			let exp = new ExpantaNum(5)
			if (player.elementary.theory.tree.unl) exp = exp.plus(TREE_UPGS[3].effect(player.elementary.theory.tree.upgrades[3]||0))
			let ret = times.plus(1).times(2).log10().plus(1).pow(exp)
			return ret
		},
		"5;4": function () {
			let ret = player.collapse.cadavers.plus(1).log10().plus(1).sqrt();
			return ret;
		},
		"5;5": function () {
			let base = player.inf.knowledge.plus(1).log10().plus(1).log10().plus(1);
			let exp = player.inf.endorsements.sqrt();
			if (modeActive("extreme")) exp = exp.times(1.5)
			let ret = base.pow(exp);
			return ret;
		},
		"5;6": function () {
			let base = player.inf.knowledge.div(1e9).plus(1).slog(10).plus(1);
			let exp = player.inf.knowledge.plus(1).log10().plus(1).logBase(13).plus(1);
			let ret = base.pow(exp);
			if (ret.lt(9)) ret = ret.sqrt()
			else ret = ret.div(3)
			return ret;
		},
		"5;7": function () {
			let mv = tmp.maxVel ? tmp.maxVel : new ExpantaNum(0);
			let ret = mv.plus(1).slog(10);
			if (ret.gte(4)) ret = ret.sqrt().times(2);
			return ret;
		},
		"5;10": function() {
			let ret = player.elementary.bosons.scalar.higgs.amount.plus(1).pow(2)
			let ret2 = player.pathogens.amount.plus(1).log10().plus(1)
			return {pth: ret, hb: ret2}
		},
		"6;5": function () {
			let ret = player.inf.knowledge.plus(1).log10().plus(1).logBase(14).pow(3).plus(1);
			return ret;
		},
		"6;6": function () {
			let ret = tmp.maxVel.plus(1).pow(0.075);
			if (modeActive("extreme")) ret = ret.pow(0.1)
			if (modeActive("hikers_dream")) ret = ret.pow(2)
			if (ret.gte("1e1000")) ret = ret.log10().pow(1000 / 3);
			return ret;
		},
		"7;1": function () {
			let base = new ExpantaNum(0.2)
			if (modeActive("extreme")) base = new ExpantaNum(0.08)
			let ret = ExpantaNum.mul(base, player.inf.stadium.completions.length+(player.extremeStad?player.extremeStad.length:0)).add(1);
			return ret;
		},
		"7;2": function () {
			let pow = player.inf.ascension.power;
			let flow = tmp.dc ? tmp.dc.flow : new ExpantaNum(1);
			return {
				power: flow.plus(1).log10().sqrt().plus(1),
				flow: pow.plus(1).log10().sqrt().plus(1)
			};
		},
		"7;4": function () {
			let exp = player.pathogens.amount.plus(1).slog(10);
			let base = player.pathogens.amount.plus(1).log10().plus(1).log10().plus(1);
			let ret = base.pow(exp);
			if (modeActive("extreme")) {
				if (ret.gte(4)) ret = ret.logBase(4).times(4).min(ret);
			} else if (ret.gte(7.5)) ret = ret.logBase(7.5).times(7.5).min(ret);
			return ret;
		},
		"7;5": function () {
			let ret = player.pathogens.upgrades[5].plus(1).sqrt();
			if (modeActive("extreme")) ret = player.pathogens.upgrades[5].plus(1).cbrt();
			return ret;
		},
		"7;6": function () {
			return ExpantaNum.pow(1.2, player.dc.cores);
		},
		"7;7": function () {
			let ret = {
				ae: ExpantaNum.pow(1.025, player.rank.plus(player.tier.pow(2))),
				ve: (tmp.accEn ? tmp.accEn : new ExpantaNum(0)).plus(1).pow(tmp.inf.upgs.has("10;2")?1200:240),
				ts: (tmp.maxVel ? tmp.maxVel : new ExpantaNum(0)).plus(1).pow(0.06)
			};
			if (ret.ve.gte("1e10000")) ret.ve = ret.ve.log10().pow(2500).min(ret.ve);
			if (modeActive("extreme")) {
				ret.ae = ret.ae.sqrt();
				ret.ve = ret.ve.cbrt();
				ret.ts = ret.ts.pow(0.1);
			}
			return ret;
		},
		"7;8": function () {
			let amt = new ExpantaNum(0);
			if (tmp.inf) amt = tmp.inf.pantheon.totalGems;
			let base = 1e25
			if (modeActive("extreme")) base = 1e35
			let ret = ExpantaNum.pow(base, amt.sqrt());
			return ret;
		},
		"8;2": function () {
			let e = tmp.accEn ? tmp.accEn : new Expantanum(0);
			let ret = {
				energy: player.inf.pantheon.purge.power.plus(1).pow(10),
				power: e.plus(2).slog(2)
			};
			return ret;
		},
		"8;3": function () {
			let ret = player.inf.endorsements.plus(1).pow(0.45);
			return ret;
		},
		"8;6": function () {
			let ret = player.inf.endorsements.div(100);
			if (ret.gte(0.5)) ret = ret.pow(2).times(2);
			if (ret.gte(0.9)) ret = new ExpantaNum(0.9);
			return ret;
		},
		"8;8": function () {
			let power = player.inf.pantheon.purge.power
			if (modeActive("extreme")) power = power.pow(2)
			let ret = power.plus(1).times(10).slog(10);
			if (ret.gte(1.1)) ret = ret.sqrt().times(Math.sqrt(1.1));
			if (ret.gte(1.5)) ret = ret.sqrt().times(Math.sqrt(1.5));
			return ret;
		},
		"9;1": function () {
			let jerk = player.inf.derivatives.amts.jerk ? player.inf.derivatives.amts.jerk : new ExpantaNum(0);
			let ret = jerk.plus(1).pow(modeActive("extreme")?0.00001:0.0001);
			if (ret.gte(1e100)) ret = ret.log10().pow(50);
			return ret;
		},
		"9;2": function () {
			let u = player.inf.derivatives.unlocks;
			let ret = u.sqrt().div(2);
			if (ret.gte(10)) ret = ret.log10().times(10).min(ret);
			return ret.times(10);
		},
		"9;3": function () {
			let a = player.inf.pantheon.angels;
			let d = player.inf.pantheon.demons;
			let ret = {
				angels: d.plus(1).logBase(1.5).pow(3).plus(1),
				demons: a.plus(1).logBase(1.5).pow(3).plus(1)
			};
			return ret;
		},
		"9;4": function () {
			let boosts = player.inf.derivatives.unlocks.sub(tmp.inf.derv.maxShifts).max(0);
			let ret = ExpantaNum.pow(tmp.inf.derv.boostMult, boosts);
			return ret;
		},
		"9;6": function () {
			let d = player.inf.pantheon.demonicSouls;
			let ret = d.plus(1).times(10).slog(10).div(10);
			if (ret.gte(0.5)) ret = ret.div(10).plus(0.45);
			if (ret.gte(0.75)) ret = ret.pow(2).div(0.75);
			if (ret.gte(0.9)) ret = ExpantaNum.sub(1, ExpantaNum.div(1, ret.times(10).plus(1)));
			return ret;
		},
		"9;7": function () {
			let power = new ExpantaNum(1);
			if (tmp.inf) if (tmp.inf.upgs.has("1;9")) power = power.times(INF_UPGS.effects["1;9"]());
			let rank = player.rank;
			if (rank.gte(308)) rank = rank.sqrt().times(Math.sqrt(308));
			if (rank.gte(400)) rank = ExpantaNum.pow(10, rank.log10().sqrt()).times(9.75);
			let ret = ExpantaNum.pow(ExpantaNum.add(1, ExpantaNum.mul(0.02, power)), rank.pow(2));
			return ret;
		},
		"9;10": function() {
			let amt = player.elementary.bosons.scalar.amount
			let ret = amt.plus(1).log10().pow(2/9).plus(1)
			if (ret.gte(4)) ret = ret.logBase(2).times(2)
			return ret
		},
		"10;1": function(type) {
			if (type=="pth") {
				let ret = player.inf.ascension.power.plus(1).times(10).slog(10).pow(0.15).div(10)
				if (ret.gte(0.9)) ret = new ExpantaNum(0.9)
				return ret;
			} else if (type=="snp") {
				if (hasMltMilestone(16)) return ExpantaNum.pow(10, player.distance.log10().root(1.15)).max(player.distance.plus(1).log10().plus(1).pow(10))
				else return player.distance.plus(1).log10().plus(1).pow(10)
			}
		},
		"10;2": function() {
			let base = tmp.maxVel.plus(1).log10().plus(1).log10().plus(1)
			let exp = tmp.maxVel.plus(1).times(10).slog(10)
			return base.pow(exp).pow(12)
		},
		"10;4": function() {
			if (!tmp.auto) return new ExpantaNum(1)
			let f1 = tmp.auto.rankbot.magnitude.plus(1).log10().plus(1).sqrt()
			let f2 = tmp.auto.tierbot.magnitude.plus(1).log10().plus(1).sqrt()
			let f3 = tmp.auto.fuelbot.magnitude.plus(1).log10().plus(1).pow(0.75)
			let ret = f1.times(f2).times(f3).cbrt()
			if (tmp.elm) if (tmp.elm.bos.hasHiggs("5;0;0")) ret = ret.pow(1.8)
			return ret
		},
		"10;5": function() {
			let ret = player.elementary.fermions.quarks.amount.plus(1).pow(2.7)
			return ret
		},
		"10;6": function() {
			let ret = player.elementary.fermions.leptons.amount.plus(1).pow(0.05)
			return ret
		},
		"10;10": function() {
			let base1 = new ExpantaNum(1.9)
			let ranks = player.rank.max(1).sub(1)
			let base2 = new ExpantaNum(8.5)
			let tiers = player.tier.max(1).sub(1)
			if (tmp.elm) if (tmp.elm.bos.hasHiggs("5;0;5")) {
				base1 = base1.plus(ranks.plus(1).log10().div(10))
				base2 = base2.plus(tiers.plus(1).log10().div(4))
				if (modeActive("hikers_dream")) {
					base2 = base2.log10().plus(1)
					tiers = tiers.times(tiers)
				}
			}
			if (modeActive("hikers_dream") && tmp.ach) if (tmp.ach[145].has) {
				base1 = base1.log10().plus(1)
				ranks = ranks.times(ranks.div(200).plus(1))
			}
			let ret = ExpantaNum.pow(base1, ranks).times(ExpantaNum.pow(base2, tiers))
			return ret
		},
	}
};
const INF_TABS = {
	infinity: function () {
		return true;
	},
	ascension: function () {
		return player.inf.endorsements.gte(10) && !(mltActive(3) && player.mlt.mlt3selected.length>=1 && !player.mlt.mlt3selected.includes("ascension"));
	},
	stadium: function () {
		return player.inf.endorsements.gte(15) && !(mltActive(3) && player.mlt.mlt3selected.length>=1 && !player.mlt.mlt3selected.includes("stadium"));
	},
	pantheon: function () {
		return player.inf.endorsements.gte(21) && !(mltActive(3) && player.mlt.mlt3selected.length>=1 && !player.mlt.mlt3selected.includes("pantheon"));
	},
	derivatives: function () {
		return player.inf.derivatives.unl && !(mltActive(3) && player.mlt.mlt3selected.length>=1 && !player.mlt.mlt3selected.includes("derivatives"));
	}
};

// Ascension
const BASE_PERK_TIME = new ExpantaNum(12);
const PERK_NAMES = ["godhood", "holy", "sainthood", "glory"];

// The Stadium
const STADIUM_DESCS = {
	spaceon: [
		"You cannot gain Rockets",
		"Time Speed is raised to the power of 0.1",
		"You cannot gain Life Essence",
		"inf1;1 does nothing",
		"The base cost of Ranks is much higher",
		"The base cost of Tiers is much higher"
	],
	solaris: [
		"You cannot gain Cadavers",
		"Scaled Rocket Fuel scaling starts instantly",
		"Scaled Rank scaling starts instantly",
		"Scaled Rank scaling is 500% stronger",
		"The base cost of Tiers is much higher",
		"The base cost of Ranks is much higher"
	],
	infinity: [
		"You cannot Rank or Tier up",
		"Maximum Velocity is raised to the power of 0.1",
		"Rocket Fuel does nothing",
		"Scaled Pathogen Upgrade scaling is 500% stronger",
		"Pathogen Upgrades are 90% weaker",
		"You do not gain Time Cubes"
	],
	eternity: [
		"Time Speed does nothing",
		"Dark Flow is always 0x",
		"Pathogen Upgrades are 90% weaker",
		"Scaled Tier scaling is 500% stronger",
		"You do not gain Time Cubes",
		"Pathogen Upgrades do nothing"
	],
	reality: [
		"All resource gain before Infinity is raised to the power of 0.1",
		"Time Speed does nothing",
		"Maximum Velocity is raised to the power of 0.1",
		"Acceleration is raised to the power of 0.1",
		"You cannot buy Dark Cores",
		"Pathogen Upgrades do nothing"
	],
	drigganiz: [
		"Pathogen Upgrades do nothing & Time Speed is raised to the power of 0.1",
		"Scaled Rank scaling starts instantly",
		"Scaled Tier scaling starts instantly",
		"Scaled Rank & Scaled Tier scalings are 500% stronger",
		"You do not gain Rockets or Cadavers",
		"You cannot buy Dark Cores"
	]
};
const STADIUM_REWARDS = {
	spaceon: "inf1;1 is stronger based on your Rockets.",
	solaris: "Superscaled Rank scaling starts later based on your Cadavers.",
	infinity: "The Rocket Fuel effect is twice as powerful.",
	eternity: "Endorsements & Ascension Power make Ranks boost Time Speed.",
	reality: "Time Cubes are thrice as powerful.",
	drigganiz: "Pathogen Upgrades are 0.75% stronger for every achievement you have.",
	effects: {
		spaceon: function () {
			if (mltRewardActive(1)) return MLT_1_STADIUM_REWARDS.effects.spaceon();
			let mult = tmp.inf.pantheon.chipBoost;
			let ret = player.rockets.plus(1).log10().plus(1).log().pow(2.25).plus(1);
			if (ret.gte(30)) ret = ret.logBase(30).times(30).min(ret);
			ret = ret.times(mult);
			if (player.modes.includes("extreme")) ret = ret.plus(1).log10().plus(1).log10().div(10).plus(1)
			return ret;
		},
		solaris: function () {
			if (mltRewardActive(1)) return MLT_1_STADIUM_REWARDS.effects.solaris();
			let mult = tmp.inf.pantheon.chipBoost;
			let ret = player.collapse.cadavers.plus(1).slog(10).pow(3.25);
			if (ret.gte(15)) ret = ret.logBase(15).times(15).min(ret);
			ret = ret.times(mult);
			return ret;
		},
		eternity: function () {
			if (mltRewardActive(1)) return MLT_1_STADIUM_REWARDS.effects.eternity();
			let mult = tmp.inf.pantheon.chipBoost;
			let base = player.inf.endorsements.plus(1).times(player.inf.ascension.power.plus(1).slog(10).plus(1));
			let exp = player.inf.endorsements.div(15).plus(1).logBase(2).plus(1).pow(7);
			let totalExp = base.pow(exp);
			if (totalExp.gte(Number.MAX_VALUE))
				totalExp = totalExp.log10().times(Number.MAX_VALUE / Math.log10(Number.MAX_VALUE));
			let ret = player.rank.pow(totalExp.log10().div(2));
			ret = ret.pow(mult);
			return ret.max(1);
		},
		drigganiz: function () {
			if (mltRewardActive(1)) return MLT_1_STADIUM_REWARDS.effects.drigganiz();
			let ret = ExpantaNum.mul(0.0075, player.achievements.length);
			return ret;
		}
	},
	disp: {
		spaceon: function () {
			return "^" + showNum(STADIUM_REWARDS.effects.spaceon());
		},
		solaris: function () {
			return "+" + showNum(STADIUM_REWARDS.effects.solaris());
		},
		eternity: function () {
			return "x" + showNum(STADIUM_REWARDS.effects.eternity());
		},
		drigganiz: function () {
			return "+" + showNum(STADIUM_REWARDS.effects.drigganiz().times(100)) + "%";
		}
	}
};
const STADIUM_GOALS = {
	spaceon: [
		new ExpantaNum("1e800").times(DISTANCES.uni),
		new ExpantaNum(1e100).times(DISTANCES.uni),
		new ExpantaNum(1e96).times(DISTANCES.uni),
		new ExpantaNum(1e128).times(DISTANCES.uni),
		new ExpantaNum(1e240).times(DISTANCES.uni),
		new ExpantaNum("1e300").times(DISTANCES.uni)
	],
	solaris: [
		new ExpantaNum(1e20).times(DISTANCES.uni),
		new ExpantaNum("1e365").times(DISTANCES.uni),
		new ExpantaNum("1e450").times(DISTANCES.uni),
		new ExpantaNum("1e500").times(DISTANCES.uni),
		new ExpantaNum(1.11e111).times(DISTANCES.uni),
		new ExpantaNum(1e180).times(DISTANCES.uni)
	],
	infinity: [
		new ExpantaNum("1e1500").times(DISTANCES.uni),
		new ExpantaNum("1e125").times(DISTANCES.uni),
		new ExpantaNum("1e480").times(DISTANCES.uni),
		new ExpantaNum("1e640").times(DISTANCES.uni),
		new ExpantaNum("1e1000").times(DISTANCES.uni),
		new ExpantaNum("1e1200").times(DISTANCES.uni)
	],
	eternity: [
		new ExpantaNum("1e260").times(DISTANCES.uni),
		new ExpantaNum("1e250").times(DISTANCES.uni),
		new ExpantaNum("1e295").times(DISTANCES.uni),
		new ExpantaNum(Number.MAX_VALUE).times(DISTANCES.uni),
		new ExpantaNum("1e350").times(DISTANCES.uni),
		new ExpantaNum("1e375").times(DISTANCES.uni)
	],
	reality: [
		new ExpantaNum(10).times(DISTANCES.uni),
		new ExpantaNum(100).times(DISTANCES.pc),
		new ExpantaNum(3).times(DISTANCES.ly),
		new ExpantaNum(800).times(DISTANCES.Gm),
		new ExpantaNum(250),
		new ExpantaNum(150)
	],
	drigganiz: [
		new ExpantaNum(1e16).times(DISTANCES.uni),
		new ExpantaNum(1e10).times(DISTANCES.uni),
		new ExpantaNum(1e25).times(DISTANCES.uni),
		new ExpantaNum(1e40).times(DISTANCES.uni),
		new ExpantaNum(1e150).times(DISTANCES.uni),
		new ExpantaNum(1e200).times(DISTANCES.uni)
	]
};

const EXTREME_STADIUM_DATA = {
	flamis: {
		descs: [
			"Rank Cheapeners & Furnace Challenge rewards do nothing",
			"Time Reversal Upgrade 30 does nothing",
			"Pathogen Upgrades are half as strong",
			"Furnace Upgrade 4 does nothing",
			"Coal gain is raised to the power of 0.2",
			"You are trapped in Spaceon's Stadium Challenge at its set difficulty.",
		],
		reward: "Superscaled Rank Cheapener scaling is 90% weaker.",
		goals: [
			new ExpantaNum("1e1600").times(DISTANCES.uni),
			new ExpantaNum("1e1750").times(DISTANCES.uni),
			new ExpantaNum("1e1950").times(DISTANCES.uni),
			new ExpantaNum("1e2000").times(DISTANCES.uni),
			new ExpantaNum("1e2500").times(DISTANCES.uni),
			new ExpantaNum("1e2600").times(DISTANCES.uni),
		],
	},
	cranius: {
		descs: [
			"You are trapped in all Furnace Challenges at once",
			"You get 90% less Free Rank Cheapeners",
			"Time Reversal Upgrades do nothing",
			"Pathogen Upgrades are weaker based on your Tier",
			"Rank Cheapeners make Tiers more expensive",
			"You are trapped in Solaris's Stadium Challenge at its set difficulty.",
		],
		reward: "Knowledge gain is boosted by second row Stadium Completions.",
		goals: [
			new ExpantaNum("1e1390").times(DISTANCES.uni),
			new ExpantaNum("1e1500").times(DISTANCES.uni),
			new ExpantaNum("1e1600").times(DISTANCES.uni),
			new ExpantaNum("1e1750").times(DISTANCES.uni),
			new ExpantaNum("1e2000").times(DISTANCES.uni),
			new ExpantaNum("1e2050").times(DISTANCES.uni),
		],
		effect: function() { 
			let x = (player.extremeStad||[]).length
			if (x>=2) x = x*2-2
			let ret = ExpantaNum.pow(4.8, x);
			return ret;
		},
		disp: function() { return showNum(EXTREME_STADIUM_DATA.cranius.effect())+"x" },
	},
	spectra: {
		descs: [
			"The Extreme mode reduction to pre-Infinity resource gain is twice as lethal",
			"Coal does nothing",
			"All Stadium Challenge rewards do nothing",
			"Dark Fluid does nothing",
			"inf1;1 does nothing",
			"You are trapped in Infinity's Stadium Challenge at its set difficulty.",
		],
		reward: "Rank Cheapeners use a weaker cost formula based on their amount.",
		goals: [
			new ExpantaNum("1e3200").times(DISTANCES.uni),
			new ExpantaNum("1e3750").times(DISTANCES.uni),
			new ExpantaNum("1e4000").times(DISTANCES.uni),
			new ExpantaNum("1e4125").times(DISTANCES.uni),
			new ExpantaNum("1e4500").times(DISTANCES.uni),
			new ExpantaNum("1e4650").times(DISTANCES.uni),
		],
		effect: function() { return player.rankCheap.times(tmp.rankCheap.manPow).times(tmp.rankCheap.pow).pow(0.4).plus(1) },
		disp: function() { return showNum(EXTREME_STADIUM_DATA.spectra.effect())+"x weaker" },
	},
	aqualon: {
		descs: [
			"All pre-Infinity resource generation is divided by 9e15",
			"You cannot buy Rocket Fuel",
			"Pathogen Upgrades are weaker based on your Rank",
			"You cannot Tier up",
			"Time Speed is raised to the power of 0.1",
			"You are trapped in Eternity's Stadium Challenge at its set difficulty.",
		],
		reward: "All pre-Infinity resources are generated 3x faster.",
		goals: [
			new ExpantaNum("1e1500").times(DISTANCES.uni),
			new ExpantaNum("1e1625").times(DISTANCES.uni),
			new ExpantaNum("1e1700").times(DISTANCES.uni),
			new ExpantaNum("1e1800").times(DISTANCES.uni),
			new ExpantaNum("1e2000").times(DISTANCES.uni),
			new ExpantaNum("1e2050").times(DISTANCES.uni),
		],
	},
	nullum: {
		descs: [
			"60% of the exponent of your acceleration is nullified (increases by 5% for each difficulty level after 1)",
			"10% of the exponent of your maximum velocity is nullified (increases by 2% for each difficulty level after 2)",
			"20% of your Pathogen Upgrade Power is nullified",
			"25% of the exponent of your Rockets is nullified",
			"Furnace Upgrade 4 does nothing",
			"You are trapped in Reality's Stadium Challenge at its set difficulty.",
		],
		reward: "All perks are 25% stronger.",
		goals: [
			new ExpantaNum("1e2000").times(DISTANCES.uni),
			new ExpantaNum("1e2250").times(DISTANCES.uni),
			new ExpantaNum("1e2325").times(DISTANCES.uni),
			new ExpantaNum("1e2500").times(DISTANCES.uni),
			new ExpantaNum("1e2645").times(DISTANCES.uni),
			new ExpantaNum("1e2650").times(DISTANCES.uni),
		],
	},
	quantron: {
		descs: [
			"Pathogen Upgrades are slightly weaker",
			"Blue Flame is slightly weaker",
			"Furnace Upgrade 4 does nothing",
			"Furnace Upgrade 1 is weaker",
			"Dark Flow is slightly weaker",
			"You are trapped in Drigganiz's Stadium Challenge at its set difficulty.",
		],
		reward: "Pathogen Upgrades are stronger based on your Coal.",
		goals: [
			new ExpantaNum("1e3000").times(DISTANCES.uni),
			new ExpantaNum("1e3100").times(DISTANCES.uni),
			new ExpantaNum("1e2900").times(DISTANCES.uni),
			new ExpantaNum("1e3200").times(DISTANCES.uni),
			new ExpantaNum("1e2800").times(DISTANCES.uni),
			new ExpantaNum("1e720").times(DISTANCES.uni),
		],
		effect: function() { 
			let ret = player.furnace.coal.plus(1).log10().plus(1).log10().div(6.09);
			if (ret.gte(0.75)) ret = ret.div(3).plus(0.75*2/3)
			if (ret.gte(1)) ret = ret.log10().plus(1).min(ret);
			return ret;
		},
		disp: function() { return "+"+showNum(EXTREME_STADIUM_DATA.quantron.effect().times(100))+"%" },
	},
}

// Derivatives

const DERV = ["distance", "velocity", "acceleration", "jerk", "snap"];
const DERV_INCR = ["acceleration", "jerk", "snap"];
const DERV_MLT_2 = ["distance", "velocity", "acceleration", "jerk", "snap", "crackle", "pop", "lock", "drop", "shot", "put"];
const DERV_INCR_MLT_2 = ["acceleration", "jerk", "snap", "crackle", "pop", "lock", "drop", "shot", "put"];

// More Extreme Stuff

const EXTREME_INF_UPG_COST_MODS = {
	"1;8": new ExpantaNum(2e4),
	"2;8": new ExpantaNum(2.1e4),
	"3;8": new ExpantaNum(2.2e4),
	"4;8": new ExpantaNum(2.3e4),
	"5;8": new ExpantaNum(2.4e4),
	"6;8": new ExpantaNum(2.5e4),
	"7;8": new ExpantaNum(2.6e4),
	"8;1": new ExpantaNum(2e4),
	"8;2": new ExpantaNum(2.1e4),
	"8;3": new ExpantaNum(2.2e4),
	"8;4": new ExpantaNum(2.3e4),
	"8;5": new ExpantaNum(2.4e4),
	"8;6": new ExpantaNum(1e4),
	"8;7": new ExpantaNum(1e4),
	"8;8": new ExpantaNum(1e4),
	"9;1": new ExpantaNum(3e4),
	"9;2": new ExpantaNum(3e4),
	"9;3": new ExpantaNum(3e4),
	"9;4": new ExpantaNum(3e4),
	"9;5": new ExpantaNum(3e4),
	"9;6": new ExpantaNum(2.4e4),
	"9;7": new ExpantaNum(1e4),
	"9;8": new ExpantaNum(1e4),
	"1;9": new ExpantaNum(3e3),
	"2;9": new ExpantaNum(3e3),
	"1;10": new ExpantaNum(1e-15),
	"2;10": new ExpantaNum(2e-14),
	"3;10": new ExpantaNum(3e-13),
	"4;10": new ExpantaNum(4e-12),
	"5;10": new ExpantaNum(5e-11),
	"6;10": new ExpantaNum(6e-10),
	"7;10": new ExpantaNum(7e-9),
	"8;10": new ExpantaNum(8e-8),
	"9;10": new ExpantaNum(9e-7),
	"10;1": new ExpantaNum(1e-15),
	"10;2": new ExpantaNum(2e-14),
	"10;3": new ExpantaNum(3e-13),
	"10;4": new ExpantaNum(4e-12),
	"10;5": new ExpantaNum(5e-11),
	"10;6": new ExpantaNum(6e-10),
	"10;7": new ExpantaNum(7e-9),
	"10;8": new ExpantaNum(8e-8),
	"10;9": new ExpantaNum(9e-7),
	"10;10": new ExpantaNum(1e-5),
}