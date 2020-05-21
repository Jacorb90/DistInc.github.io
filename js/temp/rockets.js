function updateTempRockets() {
	tmp.rockets = {}
	tmp.rockets.lrm = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.rockets.lrm = tmp.rockets.lrm.times(2)
	tmp.rockets.sc = LAYER_SC["rockets"]
	if (tmp.modes.hard.active) tmp.rockets.sc = new ExpantaNum(1)
	if (tmp.pathogens && player.pathogens.unl) tmp.rockets.sc = tmp.rockets.sc.times(tmp.pathogens[7].eff)
	tmp.rockets.canRocket = player.distance.gte(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm))
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal")
	tmp.rockets.esc = new ExpantaNum(5)
	if (tmp.modes.hard.active) tmp.rockets.esc = tmp.rockets.esc.sub(0.5)
	if (tmp.pathogens && player.pathogens.unl) tmp.rockets.esc = tmp.rockets.esc.plus(tmp.pathogens[8].eff)
	let r = player.rockets
	if (r.gte(10)) r = r.log10().times(10)
	tmp.rockets.eff = r.plus(1).logBase(3).times(tmp.rf ? tmp.rf.eff : 1)
	if (tmp.rockets.eff.gte(tmp.rockets.esc)) tmp.rockets.eff = tmp.rockets.eff.sqrt().times(ExpantaNum.sqrt(tmp.rockets.esc))
	tmp.rockets.accPow = tmp.acc.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	tmp.rockets.mvPow = tmp.maxVel.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
}