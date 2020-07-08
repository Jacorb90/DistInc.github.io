function updateTempRF() {
	tmp.rf = {}
	tmp.rf.bc = new ExpantaNum(25)
	if (tmp.modes.extreme.active) tmp.rf.bc = new ExpantaNum(8)
	tmp.rf.fp = new ExpantaNum(1)
	tmp.rf.req = tmp.rf.bc.times(ExpantaNum.pow(5, player.rf.div(tmp.rf.fp).pow(1.1))).round()
	tmp.rf.bulk = player.rockets.div(tmp.rf.bc).max(1).logBase(5).pow(1/1.1).times(tmp.rf.fp).add(1).floor()
	if (tmp.scaling.active("rf", player.rf.max(tmp.rf.bulk), "scaled")) {
		let power = tmp.scalingPower.scaled.rf
		let exp = ExpantaNum.pow(2, power)
		tmp.rf.req = tmp.rf.bc.times(ExpantaNum.pow(5, (player.rf.pow(exp).div(tmp.scalings.scaled.rf.pow(exp.sub(1)))).div(tmp.rf.fp).pow(1.1))).round()
		tmp.rf.bulk = player.rockets.div(tmp.rf.bc).max(1).logBase(5).pow(1/1.1).times(tmp.rf.fp).times(tmp.scalings.scaled.rf.pow(exp.sub(1))).pow(exp.pow(-1)).plus(1).floor()
	}
	if (tmp.scaling.active("rf", player.rf.max(tmp.rf.bulk), "superscaled")) {
		let power2 = tmp.scalingPower.superscaled.rf
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.rf
		let exp = ExpantaNum.pow(2, power)
		tmp.rf.req = tmp.rf.bc.times(ExpantaNum.pow(5, ((player.rf.pow(exp2).div(tmp.scalings.superscaled.rf.pow(exp2.sub(1)))).pow(exp).div(tmp.scalings.scaled.rf.pow(exp.sub(1)))).div(tmp.rf.fp).pow(1.1))).round()
		tmp.rf.bulk = player.rockets.div(tmp.rf.bc).max(1).logBase(5).pow(1/1.1).times(tmp.rf.fp).times(tmp.scalings.scaled.rf.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.rf.pow(exp2.sub(1))).pow(exp2.pow(-1)).plus(1).floor()
	}
	if (tmp.scaling.active("rf", player.rf.max(tmp.rf.bulk), "hyper")) {
		let power3 = tmp.scalingPower.hyper.rf
		let base3 = ExpantaNum.pow(1.01, power3)
		let power2 = tmp.scalingPower.superscaled.rf
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.rf
		let exp = ExpantaNum.pow(2, power)
		tmp.rf.req = tmp.rf.bc.times(ExpantaNum.pow(5, ((ExpantaNum.pow(base3, player.rf.sub(tmp.scalings.hyper.rf)).times(tmp.scalings.hyper.rf).pow(exp2).div(tmp.scalings.superscaled.rf.pow(exp2.sub(1)))).pow(exp).div(tmp.scalings.scaled.rf.pow(exp.sub(1)))).div(tmp.rf.fp).pow(1.1))).round()
		tmp.rf.bulk = player.rockets.div(tmp.rf.bc).max(1).logBase(5).pow(1/1.1).times(tmp.rf.fp).times(tmp.scalings.scaled.rf.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.rf.pow(exp2.sub(1))).pow(exp2.pow(-1)).div(tmp.scalings.hyper.rf).max(1).logBase(base3).add(tmp.scalings.hyper.rf).plus(1).floor()
	}
	tmp.rf.can = player.rockets.gte(tmp.rf.req)
	tmp.rf.layer = new Layer("rf", tmp.rf.can, "semi-forced")
	tmp.rf.pow = new ExpantaNum(1)
	if (player.tr.upgrades.includes(5)) tmp.rf.pow = tmp.rf.pow.times(1.1)
	let rf = player.rf
	if (tmp.modes.extreme.active && rf.gte(10)) rf = rf.log10().times(10)
	tmp.rf.eff = rf.plus(tmp.freeRF?tmp.freeRF:0).times(tmp.rf.pow).plus(1).logBase(2).plus(1).pow(0.05)
	if (tmp.modes.hard.active) tmp.rf.eff = tmp.rf.eff.sub(0.02)
	if (tmp.modes.easy.active) tmp.rf.eff = tmp.rf.eff.plus(0.012)
	if (tmp.inf) if (tmp.inf.stadium.completed("infinity")) tmp.rf.eff = tmp.rf.eff.sub(1).times(2).add(1)
	if (tmp.nerfs.active("noRF")) tmp.rf.eff = new ExpantaNum(1)
	tmp.rf.onReset = function(prev) {
		if (player.tr.upgrades.includes(17) && tmp.modes.extreme.active) player.rockets = new ExpantaNum(prev.rockets)
		else if (tmp.ach[58].has) player.rockets = prev.rockets.div(2).max(10)
		else if (tmp.collapse.hasMilestone(3)) player.rockets = new ExpantaNum(10)
	}
	tmp.rf.eff2 = player.rf.sqrt().div(2)
	if (tmp.rf.eff2.gt(player.rockets.plus(1).times(10))) tmp.rf.eff2 = player.rockets.plus(1).times(10)
	if (tmp.nerfs.active("noRF")) tmp.rf.eff2 = new ExpantaNum(0)
}