function updateTempRankCheap() {
	tmp.rankCheap = {}
	tmp.rankCheap.free = new ExpantaNum(0)
	if (tmp.ach[21].has) tmp.rankCheap.free = tmp.rankCheap.free.plus(player.tier)
	if (tmp.ach[34].has) tmp.rankCheap.free = tmp.rankCheap.free.plus(1)
	if (player.rf.gt(0)) tmp.rankCheap.free = tmp.rankCheap.free.plus(player.furnace.upgrades[1])
	tmp.rankCheap.fp = new ExpantaNum(1)
	tmp.rankCheap.bc = new ExpantaNum(30)
	tmp.rankCheap.req = new ExpantaNum(tmp.rankCheap.bc).times(ExpantaNum.pow(2, player.rankCheap.div(tmp.rankCheap.fp).max(1).sub(1).pow(2)))
	tmp.rankCheap.bulk = player.distance.div(tmp.rankCheap.bc).logBase(2).sqrt().plus(1).times(tmp.rankCheap.fp).plus(1).round()
	if (tmp.scaling.active("rankCheap", player.rankCheap.max(tmp.rankCheap.bulk), "scaled")) {
		let power = tmp.scalingPower.scaled.rankCheap
		let exp = ExpantaNum.pow(2, power)
		tmp.rankCheap.req = new ExpantaNum(tmp.rankCheap.bc).times(ExpantaNum.pow(2, (player.rankCheap.pow(exp).div(tmp.scalings.scaled.rankCheap.pow(exp.sub(1)))).div(tmp.rankCheap.fp).sub(1).pow(2)))
		tmp.rankCheap.bulk = player.distance.div(tmp.rankCheap.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.rankCheap.fp).times(tmp.scalings.scaled.rankCheap.pow(exp.sub(1))).pow(exp.pow(-1)).plus(1).floor()
	}
	if (tmp.scaling.active("rankCheap", player.rankCheap.max(tmp.rankCheap.bulk), "superscaled")) {
		let power2 = tmp.scalingPower.superscaled.rankCheap
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.rankCheap
		let exp = ExpantaNum.pow(2, power)
		tmp.rankCheap.req = new ExpantaNum(tmp.rankCheap.bc).times(ExpantaNum.pow(2, ((player.rankCheap.pow(exp2).div(tmp.scalings.superscaled.rankCheap.pow(exp2.sub(1)))).pow(exp).div(tmp.scalings.scaled.rankCheap.pow(exp.sub(1)))).div(tmp.rankCheap.fp).sub(1).pow(2)))
		tmp.rankCheap.bulk = player.distance.div(tmp.rankCheap.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.rankCheap.fp).times(tmp.scalings.scaled.rankCheap.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.rankCheap.pow(exp2.sub(1))).pow(exp2.pow(-1)).add(1).floor()
	}
	if (tmp.scaling.active("rankCheap", player.rankCheap.max(tmp.rankCheap.bulk), "hyper")) {
		let power3 = tmp.scalingPower.hyper.rankCheap
		let base3 = ExpantaNum.pow(1.01, power3)
		let power2 = tmp.scalingPower.superscaled.rankCheap
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.rankCheap
		let exp = ExpantaNum.pow(2, power)
		tmp.rankCheap.req = new ExpantaNum(tmp.rankCheap.bc).times(ExpantaNum.pow(2, ((ExpantaNum.pow(base3, player.rankCheap.sub(tmp.scalings.hyper.rankCheap)).times(tmp.scalings.hyper.rankCheap).pow(exp2).div(tmp.scalings.superscaled.rankCheap.pow(exp2.sub(1)))).pow(exp).div(tmp.scalings.scaled.rankCheap.pow(exp.sub(1)))).div(tmp.rankCheap.fp).sub(1).pow(2)))
		tmp.rankCheap.bulk = player.distance.div(tmp.rankCheap.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.rankCheap.fp).times(tmp.scalings.scaled.rankCheap.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.rankCheap.pow(exp2.sub(1))).pow(exp2.pow(-1)).div(tmp.scalings.hyper.rankCheap).max(1).logBase(base3).add(tmp.scalings.hyper.rankCheap).add(1).floor()
	}
	if (tmp.rankCheap.bulk.lt(tmp.rankCheap.fp.plus(1))) tmp.rankCheap.bulk = tmp.rankCheap.bulk.max(tmp.rankCheap.fp.plus(1))
	tmp.rankCheap.can = player.distance.gte(tmp.rankCheap.req)
	tmp.rankCheap.layer = new Layer("rankCheap", tmp.rankCheap.can, "semi-forced")
	tmp.rankCheap.pow = new ExpantaNum(1)
	if (tmp.ach[12].has) tmp.rankCheap.pow = tmp.rankCheap.pow.plus(ExpantaNum.mul(0.5, player.achievements.length))
	if (player.tr.upgrades.includes(22) && tmp.modes.extreme.active) tmp.rankCheap.pow = tmp.rankCheap.pow.times(player.collapse.cadavers.plus(1).times(10).slog(10).sqrt())
	tmp.rankCheap.manPow = new ExpantaNum(1)
	tmp.rankCheap.eff = player.rankCheap.times(tmp.rankCheap.manPow).plus(tmp.rankCheap.free).times(tmp.rankCheap.pow).sqrt().plus(1)
	tmp.rankCheap.eff2 = ExpantaNum.pow(2, player.rankCheap.times(tmp.rankCheap.manPow).plus(tmp.rankCheap.free).times(tmp.rankCheap.pow))
}