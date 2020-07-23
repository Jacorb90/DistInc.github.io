function updateTempCollapse() {
	tmp.collapse = {};
	tmp.collapse.sc = new ExpantaNum(LAYER_SC["collapse"]);
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sc = tmp.collapse.sc.times(tmp.pathogens[9].eff);
	if (tmp.inf) tmp.collapse.sc = tmp.collapse.sc.times(tmp.inf.asc.perkEff(4));
	tmp.collapse.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.collapse.lrm = tmp.collapse.lrm.div(50);
	if (modeActive("easy")) tmp.collapse.lrm = tmp.collapse.lrm.times(5e16 / 3.5068);
	tmp.collapse.can = player.distance.gte(ExpantaNum.mul(LAYER_REQS["collapse"][1], tmp.collapse.lrm));
	if (nerfActive("noCadavers")) tmp.collapse.can = false;
	tmp.collapse.layer = new Layer("collapse", tmp.collapse.can, "normal", true);
	tmp.collapse.eff = ExpantaNum.log10(player.rank.plus(player.tier.times(5)).plus(player.collapse.cadavers).plus(1))
		.pow(player.collapse.cadavers.plus(1).logBase(2))
		.plus(player.collapse.cadavers.sqrt());
	tmp.collapse.esc = new ExpantaNum(1e12);
	if (modeActive("hard")) tmp.collapse.esc = tmp.collapse.esc.div(100);
	if (modeActive("easy")) tmp.collapse.esc = tmp.collapse.esc.times(80);
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.esc = tmp.collapse.esc.times(tmp.pathogens[10].eff);
	if (tmp.inf) tmp.collapse.esc = tmp.collapse.esc.times(tmp.inf.asc.perkEff(3));
	tmp.collapse.escp = new ExpantaNum(1);
	if (tmp.inf) if (tmp.inf.upgs.has("8;5")) tmp.collapse.escp = tmp.collapse.escp.times(0.2);
	if (tmp.collapse.eff.gte(tmp.collapse.esc) && tmp.collapse.escp.gt(0))
		tmp.collapse.eff = tmp.collapse.eff
			.log10()
			.pow(tmp.collapse.escp.pow(-1))
			.times(tmp.collapse.esc.div(tmp.collapse.esc.log10().pow(tmp.collapse.escp.pow(-1))));
	tmp.collapse.eff = tmp.collapse.eff.pow(
		tmp.elm && player.elementary.times.gt(0) ? tmp.elm.ferm.leptonR("muon").max(1) : 1
	);
	tmp.collapse.doGain = function () {
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain);
	};
	tmp.collapse.sacEff = new ExpantaNum(1);
	if (modeActive("hard")) tmp.collapse.sacEff = tmp.collapse.sacEff.div(1.4);
	if (modeActive("easy")) tmp.collapse.sacEff = tmp.collapse.sacEff.times(1.6);
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sacEff = tmp.collapse.sacEff.times(tmp.pathogens[6].eff);
	tmp.collapse.sacrifice = function () {
		if (player.collapse.cadavers.eq(0) || nerfActive("noLifeEssence")) return;
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(
			player.collapse.cadavers.times(tmp.collapse.sacEff).max(1)
		);
		if (tmp.inf ? !tmp.inf.upgs.has("2;4") : true) player.collapse.cadavers = new ExpantaNum(0);
	};
	tmp.collapse.hasMilestone = function (n) {
		return player.collapse.lifeEssence.gte(ESSENCE_MILESTONES[n].req);
	};
	tmp.collapse.onReset = function (prev) {
		if (tmp.collapse.hasMilestone(3)) player.rockets = new ExpantaNum(10);
		if (tmp.collapse.hasMilestone(4)) player.rf = new ExpantaNum(1);
		if (tmp.collapse.hasMilestone(7)) player.tr.upgrades = prev.tr.upgrades;
		tmp.inf.derv.resetDervs();
	};
}

function collapseMile1Eff() {
	return new ExpantaNum(100).div(player.distance.plus(1).pow(0.06989).plus(1).min(50))
}

function collapseMile5Eff() {
	let eff = player.tr.cubes.plus(1).log10().plus(1).log10().plus(1);
	if (eff.gte(2.5)) eff = eff.logBase(2.5).plus(1.5)
	return eff
}

function collapseMile8Eff() {
	let eff = (tmp.timeSpeed ? tmp.timeSpeed : new ExpantaNum(1)).plus(1).logBase(2).max(1);
	if (eff.gte(50)) eff = eff.times(2).log10().times(25);
	return eff
}

function collapseMile10Eff() {
	let eff = player.collapse.lifeEssence.plus(1).log10().plus(1).sqrt().pow(8);
	if (eff.gte(40)) eff = eff.times(2.5).log10().times(20);
	if (hasDE(5)) if ((player.elementary.theory.tree.upgrades[27]||new ExpantaNum(0)).gte(1)) {
		eff = player.collapse.lifeEssence.plus(1).pow(0.1)
		if (eff.gte(40)) eff = eff.pow(0.2).times(Math.pow(40, 0.8))
	}
	return eff
}

function getCadaverGainMult() {
	let mult = new ExpantaNum(1);
	if (tmp.collapse) if (tmp.collapse.hasMilestone(5)) mult = mult.times(collapseMile5Eff());
	if (tmp.collapse) if (tmp.collapse.hasMilestone(10)) mult = mult.times(collapseMile10Eff());
	if (tmp.ach[38].has) mult = mult.times(2);
	if (tmp.ach[65].has) mult = mult.times(1.4);
	if (tmp.ach[131].has) mult = mult.times(2);
	if (player.tr.upgrades.includes(14)) mult = mult.times(tr14Eff()["cd"]);
	if (tmp.inf) if (tmp.inf.upgs.has("3;2")) mult = mult.times(INF_UPGS.effects["3;2"]()["cadavers"]);
	if (tmp.collapse) if (modeActive("hard") && (tmp.collapse.layer.gain.gte(10) || (tmp.clghm && tmp.collapse.layer.gain.gte(5)))) {
		mult = mult.div(2);
		tmp.clghm = true;
	};
	if (tmp.ach[68].has && modeActive("extreme")) mult = mult.times(5);
	if (tmp.collapse) if (modeActive("easy")) mult = mult.times(3);
	if (tmp.elm) if (player.elementary.times.gt(0)) mult = mult.times(tmp.elm.ferm.quarkR("down").max(1));
	return mult
}