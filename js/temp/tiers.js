function updateTempTiers() {
	tmp.tiers = {}
	tmp.tiers.fp = new ExpantaNum(1)
	tmp.tiers.bc = new ExpantaNum(3)
	if (tmp.modes.hard.active && player.tier<2) tmp.tiers.bc = tmp.tiers.bc.plus(1)
	if (tmp.inf) if (tmp.inf.stadium.active("solaris", 5)||tmp.inf.stadium.active("spaceon", 6)) tmp.tiers.bc = tmp.tiers.bc.plus(25)
	tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(player.tier.div(tmp.tiers.fp).pow(2))
	tmp.tiers.bulk = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp).add(1)
	if (tmp.scaling.active("tier", player.tier.max(tmp.tiers.bulk), "scaled")) {
		let power = tmp.scalingPower.scaled.tier
		let exp = ExpantaNum.pow(2, power)
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus((player.tier.pow(exp).div(tmp.scalings.scaled.tier.pow(exp.sub(1)))).div(tmp.tiers.fp).pow(2))
		tmp.tiers.bulk = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp).times(tmp.scalings.scaled.tier.pow(exp.sub(1))).pow(exp.pow(-1)).add(1)
	}
	if (tmp.scaling.active("tier", player.tier.max(tmp.tiers.bulk), "superscaled")) {
		let power2 = tmp.scalingPower.superscaled.tier
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.tier
		let exp = ExpantaNum.pow(2, power)
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(((player.tier.pow(exp2).div(tmp.scalings.superscaled.tier.pow(exp2.sub(1)))).pow(exp).div(tmp.scalings.scaled.tier.pow(exp.sub(1)))).div(tmp.tiers.fp).pow(2))
		tmp.tiers.bulk = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp).times(tmp.scalings.scaled.tier.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.tier.pow(exp2.sub(1))).pow(exp2.pow(-1)).add(1)
	}
	if (tmp.scaling.active("tier", player.tier.max(tmp.tiers.bulk), "hyper")) {
		let power3 = tmp.scalingPower.hyper.tier
		let base3 = ExpantaNum.pow(1.01, power3)
		let power2 = tmp.scalingPower.superscaled.tier
		let exp2 = ExpantaNum.pow(3, power2)
		let power = tmp.scalingPower.scaled.tier
		let exp = ExpantaNum.pow(2, power)
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(((ExpantaNum.pow(base3, player.tier.sub(tmp.scalings.hyper.tier)).times(tmp.scalings.hyper.tier).pow(exp2).div(tmp.scalings.superscaled.tier.pow(exp2.sub(1)))).pow(exp).div(tmp.scalings.scaled.tier.pow(exp.sub(1)))).div(tmp.tiers.fp).pow(2))
		tmp.tiers.bulk = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp).times(tmp.scalings.scaled.tier.pow(exp.sub(1))).pow(exp.pow(-1)).times(tmp.scalings.superscaled.tier.pow(exp2.sub(1))).pow(exp2.pow(-1)).div(tmp.scalings.hyper.tier).max(1).logBase(base3).add(tmp.scalings.hyper.tier).add(1)
	}
	
	tmp.tiers.desc = player.tier.lt(Number.MAX_VALUE)?(TIER_DESCS[player.tier.toNumber()]?TIER_DESCS[player.tier.toNumber()]:DEFAULT_TIER_DESC):DEFAULT_TIER_DESC
	tmp.tiers.canTierUp = player.rank.gte(tmp.tiers.req)
	if (tmp.nerfs.active("noTier")) tmp.tiers.canTierUp = false
	tmp.tiers.layer = new Layer("tier", tmp.tiers.canTierUp, "semi-forced")
	tmp.tier = {}
	tmp.tier.onReset = function(prev) {
		if (tmp.collapse) if (tmp.collapse.hasMilestone(11)) player.rank = prev.rank
		if (player.tr.upgrades.includes(14)) {
			player.distance = prev.distance
			player.velocity = prev.velocity 
		}
	}
}