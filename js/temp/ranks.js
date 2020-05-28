function updateTempRanks() {
	tmp.ranks = {}
	tmp.ranks.fp = new ExpantaNum(1)
	if (player.tier.gt(0)) tmp.ranks.fp = tmp.ranks.fp.times(1.25)
	if (player.tier.gt(2)) tmp.ranks.fp = tmp.ranks.fp.times(tmp.t3)
	if (tmp.ach) if (tmp.ach[43].has) tmp.ranks.fp = tmp.ranks.fp.times(1.025)
	if (player.tr.upgrades.includes(3)) tmp.ranks.fp = tmp.ranks.fp.times(1.1)
	tmp.ranks.bc = new ExpantaNum(10)
	if (tmp.modes.hard.active && player.rank<3) tmp.ranks.bc = tmp.ranks.bc.times(2)
	tmp.ranks.req = new ExpantaNum(tmp.ranks.bc).times(ExpantaNum.pow(2, player.rank.div(tmp.ranks.fp).max(1).sub(1).pow(2)))
	tmp.ranks.bulk = player.distance.div(tmp.ranks.bc).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).plus(1)
	if (tmp.scaling.active("rank", player.rank.max(tmp.ranks.bulk), "scaled")) {
		let power = tmp.scalingPower.scaled.rank
		let exp = ExpantaNum.pow(2, power)
		tmp.ranks.req = new ExpantaNum(tmp.ranks.bc).times(ExpantaNum.pow(2, (player.rank.pow(exp).div(tmp.scalings.scaled.rank.pow(exp.sub(1)))).div(tmp.ranks.fp).sub(1).pow(2)))
		tmp.ranks.bulk = player.distance.div(tmp.ranks.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).times(tmp.scalings.scaled.rank.pow(exp.sub(1))).pow(exp.pow(-1)).plus(1)
	}
	if (tmp.scaling.active("rank", player.rank.max(tmp.ranks.bulk), "superscaled")) {
		let power2 = tmp.scalingPower.superscaled.rank
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.rank
		let exp = ExpantaNum.pow(2, power)
		tmp.ranks.req = new ExpantaNum(tmp.ranks.bc).times(ExpantaNum.pow(2, ((player.rank.pow(exp2).div(tmp.scalings.superscaled.rank.pow(exp2.sub(1)))).pow(exp).div(tmp.scalings.scaled.rank.pow(exp.sub(1)))).div(tmp.ranks.fp).sub(1).pow(2)))
		tmp.ranks.bulk = player.distance.div(tmp.ranks.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).times(tmp.scalings.scaled.rank.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.rank.pow(exp2.sub(1))).pow(exp2.pow(-1)).add(1)
	}
	
	if (tmp.scaling.active("rank", player.rank.max(tmp.ranks.bulk), "hyper")) {
		let power3 = tmp.scalingPower.hyper.rank
		let base3 = ExpantaNum.pow(1.01, power3)
		let power2 = tmp.scalingPower.superscaled.rank
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.rank
		let exp = ExpantaNum.pow(2, power)
		tmp.ranks.req = new ExpantaNum(tmp.ranks.bc).times(ExpantaNum.pow(2, ((ExpantaNum.pow(base3, player.rank.sub(tmp.scalings.hyper.rank)).times(tmp.scalings.hyper.rank).pow(exp2).div(tmp.scalings.superscaled.rank.pow(exp2.sub(1)))).pow(exp).div(tmp.scalings.scaled.rank.pow(exp.sub(1)))).div(tmp.ranks.fp).sub(1).pow(2)))
		tmp.ranks.bulk = player.distance.div(tmp.ranks.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).times(tmp.scalings.scaled.rank.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.rank.pow(exp2.sub(1))).pow(exp2.pow(-1)).div(tmp.scalings.hyper.rank).max(1).logBase(base3).add(tmp.scalings.hyper.rank).add(1)
	}
	
	if (tmp.ranks.bulk.lt(tmp.ranks.fp.plus(1))) tmp.ranks.bulk = tmp.ranks.bulk.max(tmp.ranks.fp.plus(1))
	tmp.ranks.desc = player.rank.lt(Number.MAX_VALUE)?(RANK_DESCS[player.rank.toNumber()]?RANK_DESCS[player.rank.toNumber()]:DEFAULT_RANK_DESC):DEFAULT_RANK_DESC
	tmp.ranks.canRankUp = player.distance.gte(tmp.ranks.req)
	if (tmp.nerfs.active("noRank")) tmp.ranks.canRankUp = false
	tmp.ranks.layer = new Layer("rank", tmp.ranks.canRankUp, "semi-forced")
	tmp.rank = {}
	tmp.rank.onReset = function(prev) {
		if (tmp.collapse) if (tmp.collapse.hasMilestone(12)) {
			player.distance = prev.distance
			player.velocity = prev.velocity
		}
	}
}