function updateTempDC() {
	tmp.dc = {}
	tmp.dc.dmGain = ExpantaNum.pow(2, player.dc.cores).sub(1).times(player.dc.fluid.plus(1).log10().plus(1)).max(0)
	tmp.dc.deGain = player.dc.matter.plus(1).log10()
	tmp.dc.dfGain = player.dc.energy.plus(1).log10()
	tmp.dc.allComp = player.dc.matter.plus(1).log10().plus(player.dc.energy.plus(1).log10()).plus(player.dc.fluid.plus(1).log10()).plus(player.dc.cores)
	tmp.dc.flow = new ExpantaNum(1)
	if (tmp.ach[75].has) tmp.dc.flow = tmp.dc.flow.times(1.1)
	if (tmp.ach[83].has) tmp.dc.flow = tmp.dc.flow.times(1.2)
	if (player.tr.upgrades.includes(11)) tmp.dc.flow = tmp.dc.flow.times(tmp.tr11["dcf"])
	if (player.tr.upgrades.includes(12)) tmp.dc.flow = tmp.dc.flow.times(tmp.tr12)
	if (tmp.inf) if (tmp.inf.upgs.has("4;1")) tmp.dc.flow = tmp.dc.flow.times(2)
	if (tmp.inf) if (tmp.inf.upgs.has("5;1")) tmp.dc.flow = tmp.dc.flow.times(2)
	if (tmp.inf) if (tmp.inf.upgs.has("4;6")) tmp.dc.flow = tmp.dc.flow.times(2)
	if (tmp.inf) if (tmp.inf.upgs.has("5;5")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["5;5"]())
	if (tmp.inf) tmp.dc.flow = tmp.dc.flow.times(tmp.inf.asc.perkEff(1))
	tmp.dc.power = new ExpantaNum(1)
	if (player.tr.upgrades.includes(15)) tmp.dc.power = tmp.dc.power.times(tmp.tr15)
	tmp.dc.dmEff = player.dc.matter.times(tmp.dc.flow).plus(1).pow(ExpantaNum.mul(0.1, tmp.dc.power))
	tmp.dc.deEff = player.dc.energy.times(tmp.dc.flow).plus(1).pow(ExpantaNum.mul(0.125, tmp.dc.power))
	tmp.dc.dfEff = player.dc.fluid.times(tmp.dc.flow).plus(1).log10().plus(1).log10().times(tmp.dc.power)
	tmp.dc.coreEff = player.dc.cores.gte(12)?(player.dc.cores.pow(7).div(ExpantaNum.pow(12, 6).times(8)).plus(1).log10().plus(1).log10()):new ExpantaNum(0)
	tmp.dc.coreCost = ExpantaNum.pow(10, ExpantaNum.pow(10, player.dc.cores.div(50).plus(1))).times(10)
	tmp.dc.bulk = player.collapse.cadavers.div(10).max(1).log10().max(1).log10().sub(1).times(50).plus(1)
	if (tmp.scaling.active("darkCore", player.dc.cores.max(tmp.dc.bulk), "scaled")) {
		let power = tmp.scalingPower.scaled.darkCore
		let exp = ExpantaNum.pow(2, power)
		tmp.dc.coreCost = ExpantaNum.pow(10, ExpantaNum.pow(10, player.dc.cores.pow(exp).div(tmp.scalings.scaled.darkCore.pow(exp.sub(1))).div(50).plus(1))).times(10)
		tmp.dc.bulk = player.collapse.cadavers.div(10).max(1).log10().max(1).log10().sub(1).times(50).times(tmp.scalings.scaled.darkCore.pow(exp.sub(1))).pow(exp.pow(-1)).add(1)
	}
	if (tmp.scaling.active("darkCore", player.dc.cores.max(tmp.dc.bulk), "superscaled")) {
		let power2 = tmp.scalingPower.superscaled.darkCore
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.darkCore
		let exp = ExpantaNum.pow(2, power)
		tmp.dc.coreCost = ExpantaNum.pow(10, ExpantaNum.pow(10, player.dc.cores.pow(exp2).div(tmp.scalings.superscaled.darkCore.pow(exp2.sub(1))).pow(exp).div(tmp.scalings.scaled.darkCore.pow(exp.sub(1))).div(50).plus(1))).times(10)
		tmp.dc.bulk = player.collapse.cadavers.div(10).max(1).log10().max(1).log10().sub(1).times(50).times(tmp.scalings.scaled.darkCore.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.darkCore.pow(exp2.sub(1))).pow(exp2.pow(-1)).add(1)
	}
	tmp.dc.buyCore = function() {
		if (player.collapse.cadavers.lt(tmp.dc.coreCost)) return
		if (!player.dc.unl) return
		if (!tmp.ach[92].has) player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost)
		player.dc.cores = player.dc.cores.plus(1)
	}
	tmp.dc.maxCores = function() {
		if (player.collapse.cadavers.lt(tmp.dc.coreCost)) return
		if (!player.dc.unl) return
		if (!tmp.ach[92].has) player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost)
		player.dc.cores = player.dc.cores.max(tmp.dc.bulk.floor().max(0))
	}
	tmp.dc.tick = function(diff) {
		player.dc.matter = player.dc.matter.plus(tmp.nerfs.adjust(tmp.dc.dmGain, "dc").times(diff).times(tmp.dc.flow))
		player.dc.energy = player.dc.energy.plus(tmp.nerfs.adjust(tmp.dc.deGain, "dc").times(diff).times(tmp.dc.flow))
		player.dc.fluid = player.dc.fluid.plus(tmp.nerfs.adjust(tmp.dc.dfGain, "dc").times(diff).times(tmp.dc.flow))
	}
}