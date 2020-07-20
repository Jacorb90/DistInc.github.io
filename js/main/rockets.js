function updateTempRockets() {
	tmp.rockets = {};
	tmp.rockets.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.rockets.lrm = tmp.rockets.lrm.times(2);
	if (modeActive("extreme")) tmp.rockets.lrm = tmp.rockets.lrm.div(100);
	tmp.rockets.sc = LAYER_SC["rockets"];
	if (modeActive("hard")) tmp.rockets.sc = new ExpantaNum(1);
	if (modeActive("easy")) tmp.rockets.sc = ExpantaNum.mul(LAYER_SC["rockets"], 1.1).round();
	if (tmp.pathogens && player.pathogens.unl) tmp.rockets.sc = tmp.rockets.sc.times(tmp.pathogens[7].eff);
	tmp.rockets.canRocket = player.distance.gte(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm));
	if (tmp.nerfs.active("noRockets")) tmp.rockets.canRocket = false;
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal");
	tmp.rockets.esc = new ExpantaNum(5);
	if (modeActive("hard")) tmp.rockets.esc = tmp.rockets.esc.sub(0.5);
	if (modeActive("easy")) tmp.rockets.esc = tmp.rockets.esc.plus(0.5);
	if (tmp.pathogens && player.pathogens.unl) tmp.rockets.esc = tmp.rockets.esc.plus(tmp.pathogens[8].eff);
	let r = player.rockets;
	if (r.gte(10)) r = r.log10().times(10);
	if (tmp.rf && player.rf.gt(0)) r = r.plus(tmp.rf.eff2);
	tmp.rockets.eff = r
		.plus(1)
		.logBase(3)
		.times(tmp.rf ? tmp.rf.eff : 1);
	if (modeActive("easy")) tmp.rockets.eff = tmp.rockets.eff.times(2).plus(1);
	if (tmp.rockets.eff.gte(tmp.rockets.esc))
		tmp.rockets.eff = tmp.rockets.eff.sqrt().times(ExpantaNum.sqrt(tmp.rockets.esc));
	if (tmp.fn && modeActive("extreme")) if (player.rf.gt(0)) tmp.rockets.eff = tmp.rockets.eff.plus(tmp.fn.eff);
	if (tmp.inf) if (tmp.inf.upgs.has("2;1")) tmp.rockets.eff = tmp.rockets.eff.times(INF_UPGS.effects["2;1"]());
	if (tmp.inf) if (tmp.inf.upgs.has("9;2")) tmp.rockets.eff = tmp.rockets.eff.plus(INF_UPGS.effects["9;2"]());
	if (tmp.inf) if (tmp.inf.upgs.has("6;10")) tmp.rockets.eff = tmp.rockets.eff.times(16)
	tmp.rockets.accPow = tmp.acc.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets).max(1);
	tmp.rockets.mvPow = tmp.maxVel.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets).max(1);
	tmp.rockets.accEnPow = tmp.accEn.plus(1).log10().pow(tmp.rockets.eff).plus(1);
	tmp.rockets.tsPow = tmp.inf?(tmp.inf.upgs.has("10;3")?(tmp.timeSpeed.plus(1).log10().pow(tmp.rockets.eff).plus(1)):new ExpantaNum(1)):new ExpantaNum(1)
	tmp.rockets.onReset = function (prev) {
		tmp.inf.derv.resetDervs();
	};
}
