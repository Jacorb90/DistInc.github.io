function getRocketSoftcapStart() {
	let sc = new ExpantaNum(LAYER_SC["rockets"]);
	if (modeActive("hard")) sc = new ExpantaNum(1)
	if (modeActive("easy")) sc = sc.times(1.1).round();
	if (tmp.pathogens && player.pathogens.unl) sc = sc.times(tmp.pathogens[7].eff)
	return sc
}

function getRocketEffectSoftcapStart() {
	let sc = new ExpantaNum(5);
	if (modeActive("hard")) sc = sc.sub(0.5);
	if (modeActive("easy")) sc = sc.plus(0.5);
	if (tmp.pathogens && player.pathogens.unl) sc = sc.plus(tmp.pathogens[8].eff);
	return sc
}

function getRocketEffect() {
	let r = player.rockets;
	if (r.gte(10)) r = r.log10().times(10);
	if (tmp.rf && player.rf.gt(0)) r = r.plus(tmp.rf.eff2);
	let eff = r.plus(1).logBase(3).times(tmp.rf ? tmp.rf.eff : 1);
	if (modeActive("easy")) eff = eff.times(2).plus(1);
	if (eff.gte(getRocketEffectSoftcapStart())) eff = eff.sqrt().times(ExpantaNum.sqrt(getRocketEffectSoftcapStart()));
	if (tmp.fn && modeActive("extreme")) if (player.rf.gt(0)) eff = eff.plus(tmp.fn.eff);
	if (tmp.inf) if (tmp.inf.upgs.has("2;1")) eff = eff.times(INF_UPGS.effects["2;1"]());
	if (tmp.inf) if (tmp.inf.upgs.has("9;2")) eff = eff.plus(INF_UPGS.effects["9;2"]());
	if (tmp.inf) if (tmp.inf.upgs.has("6;10")) eff = eff.times(16)
	return eff;
}

function updateTempRockets() {
	tmp.rockets = {};
	tmp.rockets.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.rockets.lrm = tmp.rockets.lrm.times(2);
	if (modeActive("extreme")) tmp.rockets.lrm = tmp.rockets.lrm.div(100);
	tmp.rockets.sc = getRocketSoftcapStart();
	tmp.rockets.canRocket = player.distance.gte(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm));
	if (nerfActive("noRockets")) tmp.rockets.canRocket = false;
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal");
	tmp.rockets.accPow = tmp.acc.plus(1).log10().pow(getRocketEffect()).plus(player.rockets).max(1);
	tmp.rockets.mvPow = tmp.maxVel.plus(1).log10().pow(getRocketEffect()).plus(player.rockets).max(1);
	tmp.rockets.accEnPow = tmp.accEn.plus(1).log10().pow(getRocketEffect()).plus(1);
	tmp.rockets.tsPow = tmp.inf?(tmp.inf.upgs.has("10;3")?(tmp.timeSpeed.plus(1).log10().pow(getRocketEffect()).plus(1)):new ExpantaNum(1)):new ExpantaNum(1)
	tmp.rockets.onReset = function (prev) {
		tmp.inf.derv.resetDervs();
	};
}
