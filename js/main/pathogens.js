function updateTempPathogens() {
	tmp.pth13 = tmp.pathogens ? tmp.pathogens[13] : undefined
	
	tmp.pathogens = {};
	tmp.pathogens.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.pathogens.lrm = tmp.pathogens.lrm.div(5);
	if (modeActive("extreme")) tmp.pathogens.lrm = tmp.pathogens.lrm.times(20);
	tmp.pathogens.upgPow = new ExpantaNum(1);
	if (player.tr.upgrades.includes(13)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(tr13Eff().max(0));
	if (modeActive("extreme") && player.tr.upgrades.includes(27))
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(
			player.furnace.coal.plus(1).times(10).slog(10).sub(1).div(5).max(0)
		);
	if (modeActive("hard")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.98);
	if (modeActive("easy")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(1.089);
	if (tmp.dc) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(tmp.dc.coreEff.max(0));
	if (modeActive('extreme')) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.8);
	if (tmp.inf) if (tmp.inf.upgs.has("3;3")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.1);
	if (tmp.inf) if (tmp.inf.upgs.has("5;2")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.05);
	if (tmp.inf) if (tmp.inf.upgs.has("6;3")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.025);
	if (tmp.inf)
		if (tmp.inf.stadium.completed("drigganiz"))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(STADIUM_REWARDS.effects.drigganiz());
	if (tmp.inf)
		if (tmp.inf.upgs.has("9;5"))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(ExpantaNum.mul(0.01, player.inf.endorsements));
	if (tmp.ach) if (tmp.ach[125].has) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(0.05);
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(tmp.elm.ferm.leptonR("netrion"));
	if (tmp.inf) if (tmp.inf.upgs.has("9;10")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(INF_UPGS.effects["9;10"]().sub(1).max(0))
	if (player.elementary.theory.tree.unl) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(TREE_UPGS[13].effect(player.elementary.theory.tree.upgrades[13]||0))
	if (hasDE(5)) if ((player.elementary.theory.tree.upgrades[25]||new ExpantaNum(0)).gte(1)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.plus(1.5)
	if (nerfActive("weakPathogenUpgs")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(10);
	if (nerfActive("noPathogenUpgs")) tmp.pathogens.upgPow = new ExpantaNum(0);
	tmp.pathogens.sc = {
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
	};
	for (let i = 1; i <= PTH_AMT; i++) {
		if (tmp.inf) if (tmp.inf.upgs.has("3;6")) tmp.pathogens.sc[i] = tmp.pathogens.sc[i].plus(1);
		if (modeActive("hard")) {
			tmp.pathogens.sc[i] = modeActive("easy") ? tmp.pathogens.sc[i] : new ExpantaNum(1);
			if (tmp.ach[65].has) tmp.pathogens.sc[i] = tmp.pathogens.sc[i].plus(5);
		}
		if (modeActive("easy")) tmp.pathogens.sc[i] = tmp.pathogens.sc[i].times(1.1).round();
		let upg = PTH_UPGS[i];
		tmp.pathogens[i] = { cost: upg.start.times(ExpantaNum.pow(upg.inc, player.pathogens.upgrades[i])) };
		tmp.pathogens[i].bulk = player.pathogens.amount.div(upg.start).max(1).logBase(upg.inc).add(1);
		if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(tmp.pathogens[i].bulk), "scaled")) {
			let start = getScalingStart("scaled", "pathogenUpg");
			let power = getScalingPower("scaled", "pathogenUpg");
			let exp = ExpantaNum.pow(3, power);
			tmp.pathogens[i].cost = upg.start.times(
				ExpantaNum.pow(
					upg.inc,
					player.pathogens.upgrades[i].pow(exp).div(start.pow(exp.sub(1)))
				)
			);
			tmp.pathogens[i].bulk = player.pathogens.amount
				.div(upg.start)
				.max(1)
				.logBase(upg.inc)
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.add(1);
		}
		if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(tmp.pathogens[i].bulk), "superscaled")) {
			let start2 = getScalingStart("superscaled", "pathogenUpg");
			let power2 = getScalingPower("superscaled", "pathogenUpg");
			let exp2 = ExpantaNum.pow(5, power2);
			let start = getScalingStart("scaled", "pathogenUpg");
			let power = getScalingPower("scaled", "pathogenUpg");
			let exp = ExpantaNum.pow(3, power);
			tmp.pathogens[i].cost = upg.start.times(
				ExpantaNum.pow(
					upg.inc,
					player.pathogens.upgrades[i]
						.pow(exp2)
						.div(start2.pow(exp2.sub(1)))
						.pow(exp)
						.div(start.pow(exp.sub(1)))
				)
			);
			tmp.pathogens[i].bulk = player.pathogens.amount
				.div(upg.start)
				.max(1)
				.logBase(upg.inc)
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.times(start2.pow(exp2.sub(1)))
				.pow(exp2.pow(-1))
				.add(1);
		}
		if (scalingActive("pathogenUpg", player.pathogens.upgrades[i].max(tmp.pathogens[i].bulk), "hyper")) {
			let start3 = getScalingStart("hyper", "pathogenUpg");
			let power3 = getScalingPower("hyper", "pathogenUpg");
			let base3 = ExpantaNum.pow(1.025, power3);
			let start2 = getScalingStart("superscaled", "pathogenUpg");
			let power2 = getScalingPower("superscaled", "pathogenUpg");
			let exp2 = ExpantaNum.pow(5, power2);
			let start = getScalingStart("scaled", "pathogenUpg");
			let power = getScalingPower("scaled", "pathogenUpg");
			let exp = ExpantaNum.pow(3, power);
			tmp.pathogens[i].cost = upg.start.times(
				ExpantaNum.pow(
					upg.inc,
					ExpantaNum.pow(base3, player.pathogens.upgrades[i].sub(start3))
						.times(start3)
						.pow(exp2)
						.div(start2.pow(exp2.sub(1)))
						.pow(exp)
						.div(start.pow(exp.sub(1)))
				)
			);
			tmp.pathogens[i].bulk = player.pathogens.amount
				.div(upg.start)
				.max(1)
				.logBase(upg.inc)
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.times(start2.pow(exp2.sub(1)))
				.pow(exp2.pow(-1))
				.div(start3)
				.max(1)
				.logBase(base3)
				.plus(start3)
				.add(1);
		}
		tmp.pathogens[i].extra = (function () {
			let extra = new ExpantaNum(0);
			if (tmp.inf) extra = extra.plus(tmp.inf.asc.perkEff(2));
			if (i == 5 && tmp.pth13) extra = extra.plus(pathogenUpg13Eff());
			return extra;
		})();
		tmp.pathogens[i].buy = function () {
			if (PTH_UPGS[i].unl ? !PTH_UPGS[i].unl() : false) return;
			if (player.pathogens.amount.lt(tmp.pathogens[i].cost)) return;
			if (!tmp.ach[88].has) player.pathogens.amount = player.pathogens.amount.sub(tmp.pathogens[i].cost);
			player.pathogens.upgrades[i] = player.pathogens.upgrades[i].plus(1);
		};
		tmp.pathogens[i].eff = (function () {
			let fp = new ExpantaNum(1);
			if (tmp.inf) if (tmp.inf.upgs.has("8;8")) fp = fp.times(INF_UPGS.effects["8;8"]());
			let bought = player.pathogens.upgrades[i].plus(tmp.pathogens[i].extra);
			if (bought.gte(tmp.pathogens.sc[i])) bought = bought.sqrt().times(tmp.pathogens.sc[i].sqrt());
			bought = bought.times(tmp.pathogens.upgPow);
			if (PTH_UPGS[i].unl ? !PTH_UPGS[i].unl() : false) bought = new ExpantaNum(0);
			if (i == 1) {
				let ret = player.pathogens.amount
					.plus(1)
					.log10()
					.plus(1)
					.log10()
					.plus(1)
					.pow(
						bought
							.plus(1)
							.logBase(2)
							.plus(bought.gt(0) ? 1 : 0)
					);
				if (ret.gte(2e3) && !(tmp.elm?tmp.elm.bos.hasHiggs("0;1;4"):false)) ret = ret.sqrt().times(Math.sqrt(2e3));
				if (ret.gte(1e4)) ret = ret.log10().times(1e4 / 4);
				if (tmp.elm) if (tmp.elm.bos.hasHiggs("0;1;4")) ret = ret.times(4)
				return ret;
			} else if (i == 2) {
				let ret = player.collapse.cadavers.plus(1).pow(0.3).pow(bought.plus(1).logBase(1.3));
				if (ret.gte("1e100000"))
					ret = ret
						.log10()
						.pow(1e5 / 5)
						.min(ret);
				return ret;
			} else if (i == 3) {
				let ret = player.collapse.cadavers.plus(1).pow(0.4).pow(bought.plus(1).logBase(1.4));
				if (ret.gte("1e100000"))
					ret = ret
						.log10()
						.pow(1e5 / 5)
						.min(ret);
				return ret;
			} else if (i == 4) return player.pathogens.amount.plus(1).pow(1.5).pow(bought.pow(0.9));
			else if (i == 5) {
				let exp = new ExpantaNum(1);
				if (tmp.inf) if (tmp.inf.upgs.has("7;5")) exp = exp.times(INF_UPGS.effects["7;5"]());
				return ExpantaNum.pow(3, bought.sqrt()).pow(exp);
			} else if (tmp.inf ? tmp.inf.upgs.has("3;8") && i >= 6 && i <= 10 : false) {
				if (i == 6)
					return ExpantaNum.pow(1.4, bought.sqrt()).times(
						ExpantaNum.pow(2, bought.pow(ExpantaNum.mul(2.5, fp))).pow(0.2)
					);
				else if (i == 7)
					return bought
						.plus(1)
						.logBase(2)
						.plus(1)
						.pow(5)
						.times(bought.plus(1).pow(bought.plus(1).logBase(2).plus(1)).pow(ExpantaNum.mul(30, fp)));
				else if (i == 8)
					return bought
						.plus(1)
						.logBase(2)
						.plus(1)
						.log10()
						.times(bought.plus(1).logBase(2).plus(1).pow(ExpantaNum.mul(2.75, fp)));
				else if (i == 9)
					return bought
						.plus(1)
						.logBase(4)
						.plus(1)
						.pow(1.25)
						.times(bought.plus(1).pow(bought.plus(1).log10().plus(1)).pow(ExpantaNum.mul(100, fp)));
				else if (i == 10)
					return bought
						.plus(1)
						.logBase(4)
						.plus(1)
						.sqrt()
						.times(bought.plus(1).pow(ExpantaNum.mul(10, fp)));
			} else if (i == 6) return ExpantaNum.pow(1.4, bought.sqrt());
			else if (i == 7) return bought.plus(1).logBase(2).plus(1).pow(5);
			else if (i == 8) return bought.plus(1).logBase(2).plus(1).log10();
			else if (i == 9) return bought.plus(1).logBase(4).plus(1).pow(1.25);
			else if (i == 10) return bought.plus(1).logBase(4).plus(1).sqrt();
			else if (i == 11) return player.pathogens.amount.plus(1).times(10).slog(10).times(bought.sqrt().times(2.5));
			else if (i == 12) return player.rf.plus(1).log10().plus(1).log10().times(bought.cbrt().times(1.5));
			else if (i == 13) return ExpantaNum.mul(2, bought);
			else if (i == 14)
				return ExpantaNum.sub(1, ExpantaNum.div(1, player.dc.cores.plus(1).log10().times(bought).plus(1)));
			else if (i == 15) return ExpantaNum.sub(1, ExpantaNum.div(1, bought.plus(1).log10().plus(1).pow(0.1)));
			return undefined;
		})();
		tmp.pathogens[i].disp = (function () {
			let eff = tmp.pathogens[i].eff;
			if (i == 1) return "+" + showNum(eff.sub(1).times(100)) + "%";
			else if (i == 2) return showNum(eff) + "x";
			else if (i == 3) return showNum(eff) + "x";
			else if (i == 4) return showNum(eff) + "x";
			else if (i == 5) return showNum(eff) + "x";
			else if (i == 6) return "+" + showNum(eff.sub(1).times(100)) + "%";
			else if (i == 7) return showNum(eff) + "x later";
			else if (i == 8) return showNum(eff) + " later";
			else if (i == 9) return showNum(eff) + "x later";
			else if (i == 10) return showNum(eff) + "x later";
			else if (i == 11 || i == 12) return showNum(eff) + " later";
			else if (i == 13) return "+" + showNum(eff) + " Levels";
			else if (i == 14 || i == 15) return showNum(eff.times(100)) + "% weaker";
			else return "???";
		})();
	}
	tmp.pathogens.maxAll = function () {
		for (let i = 1; i <= PTH_AMT; i++) {
			if (PTH_UPGS[i].unl ? !PTH_UPGS[i].unl() : false) continue;
			if (player.pathogens.amount.lt(tmp.pathogens[i].cost)) continue;
			player.pathogens.upgrades[i] = player.pathogens.upgrades[i].max(
				tmp.pathogens[i].bulk.floor().max(player.pathogens.upgrades[i].plus(1))
			);
			if (!tmp.ach[88].has) player.pathogens.amount = player.pathogens.amount.sub(tmp.pathogens[i].cost);
		}
	};
	tmp.pathogens.st = new ExpantaNum(1.25);
	tmp.pathogens.gainLEpart = player.collapse.lifeEssence.plus(1).log10().plus(1).pow(0.1).sub(1);
	tmp.pathogens.gainPTHpart = player.pathogens.amount.plus(1).log10().plus(1);
	tmp.pathogens.gain = tmp.pathogens.gainLEpart.times(tmp.pathogens.gainPTHpart);
	if (tmp.pathogens.gain.gte(tmp.pathogens.st))
		tmp.pathogens.gain = tmp.pathogens.gain.sqrt().times(tmp.pathogens.st.sqrt());
	tmp.pathogens.baseGain = new ExpantaNum(tmp.pathogens.gain);
	if (tmp.ach[63].has) tmp.pathogens.gain = tmp.pathogens.gain.times(ach63Eff());
	if (tmp.ach[68].has) tmp.pathogens.gain = tmp.pathogens.gain.times(2.5);
	let a84 = tmp.dc ? tmp.dc.flow.max(1) : new ExpantaNum(1);
	if (a84.gte(50)) a84 = a84.log10().times(ExpantaNum.div(50, Math.log10(50)));
	if (tmp.ach[84].has) tmp.pathogens.gain = tmp.pathogens.gain.times(a84);
	if (tmp.ach[131].has) tmp.pathogens.gain = tmp.pathogens.gain.times(2);
	if (modeActive("hard")) tmp.pathogens.gain = tmp.pathogens.gain.div(3);
	if (modeActive("easy")) tmp.pathogens.gain = tmp.pathogens.gain.times(2.4);
	tmp.pathogens.gain = tmp.pathogens.gain.times(pathogenUpg5Eff());
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.elm.ferm.quarkR("strange").max(1));
	if (tmp.elm) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.elm.bos.photonEff(1).max(1));
	if (tmp.inf) if (tmp.inf.upgs.has("5;10")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["5;10"]().pth)
	if (tmp.inf) if (tmp.inf.upgs.has("10;5")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["10;5"]())
	if (tmp.inf) if (tmp.inf.upgs.has("10;10")) tmp.pathogens.gain = tmp.pathogens.gain.times(INF_UPGS.effects["10;10"]())
}

function pathogenUpg5Eff() {
	return (tmp.pathogens && player.pathogens.unl) ? tmp.pathogens[5].eff : new ExpantaNum(1);
}

function pathogenUpg13Eff() {
	return (tmp.pathogens && player.pathogens.unl && tmp.pth13) ? tmp.pth13.eff : new ExpantaNum(1);
}