function updateTempTiers() {
	if (!tmp.tiers) tmp.tiers = {};
	tmp.tiers.fp = getTierFP();
	tmp.tiers.bc = getTierBaseCost();
	tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(player.tier.div(tmp.tiers.fp).pow(2));
	tmp.tiers.bulk = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp).add(1).round();
	if (scalingActive("tier", player.tier.max(tmp.tiers.bulk), "scaled")) {
		let start = getScalingStart("scaled", "tier");
		let power = getScalingPower("scaled", "tier");
		let exp = ExpantaNum.pow(2, power);
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(
			player.tier
				.pow(exp)
				.div(start.pow(exp.sub(1)))
				.div(tmp.tiers.fp)
				.pow(2)
		);
		tmp.tiers.bulk = player.rank
			.sub(tmp.tiers.bc)
			.max(0)
			.sqrt()
			.times(tmp.tiers.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.add(1)
			.floor();
	}
	if (scalingActive("tier", player.tier.max(tmp.tiers.bulk), "superscaled")) {
		let start2 = getScalingStart("superscaled", "tier");
		let power2 = getScalingPower("superscaled", "tier");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "tier");
		let power = getScalingPower("scaled", "tier");
		let exp = ExpantaNum.pow(2, power);
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(
			player.tier
				.pow(exp2)
				.div(start2.pow(exp2.sub(1)))
				.pow(exp)
				.div(start.pow(exp.sub(1)))
				.div(tmp.tiers.fp)
				.pow(2)
		);
		tmp.tiers.bulk = player.rank
			.sub(tmp.tiers.bc)
			.max(0)
			.sqrt()
			.times(tmp.tiers.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.add(1)
			.floor();
	}
	if (scalingActive("tier", player.tier.max(tmp.tiers.bulk), "hyper")) {
		let start3 = getScalingStart("hyper", "tier");
		let power3 = getScalingPower("hyper", "tier");
		let base3 = ExpantaNum.pow(1.01, power3);
		let start2 = getScalingStart("superscaled", "tier");
		let power2 = getScalingPower("superscaled", "tier");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "tier");
		let power = getScalingPower("scaled", "tier");
		let exp = ExpantaNum.pow(2, power);
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(
			ExpantaNum.pow(base3, player.tier.sub(start3))
				.times(start3)
				.pow(exp2)
				.div(start2.pow(exp2.sub(1)))
				.pow(exp)
				.div(start.pow(exp.sub(1)))
				.div(tmp.tiers.fp)
				.pow(2)
		);
		tmp.tiers.bulk = player.rank
			.sub(tmp.tiers.bc)
			.max(0)
			.sqrt()
			.times(tmp.tiers.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.add(start3)
			.add(1)
			.floor();
	}
	if (scalingActive("tier", player.tier.max(tmp.tiers.bulk), "atomic")) {
		let start4 = getScalingStart("atomic", "tier");
		let power4 = getScalingPower("atomic", "tier");
		let exp4 = ExpantaNum.pow(4, power4);
		let start3 = getScalingStart("hyper", "tier");
		let power3 = getScalingPower("hyper", "tier");
		let base3 = ExpantaNum.pow(1.01, power3);
		let start2 = getScalingStart("superscaled", "tier");
		let power2 = getScalingPower("superscaled", "tier");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "tier");
		let power = getScalingPower("scaled", "tier");
		let exp = ExpantaNum.pow(2, power);
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(
			ExpantaNum.pow(
				base3,
				player.tier
					.pow(exp4)
					.div(start4.pow(exp4.sub(1)))
					.sub(start3)
			)
				.times(start3)
				.pow(exp2)
				.div(start2.pow(exp2.sub(1)))
				.pow(exp)
				.div(start.pow(exp.sub(1)))
				.div(tmp.tiers.fp)
				.pow(2)
		);
		tmp.tiers.bulk = player.rank
			.sub(tmp.tiers.bc)
			.max(0)
			.sqrt()
			.times(tmp.tiers.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.add(start3)
			.times(start4.pow(exp4.sub(1)))
			.pow(exp4.pow(-1))
			.add(1)
			.floor();
	}

	tmp.tiers.desc = player.tier.lt(Number.MAX_VALUE)
		? TIER_DESCS[player.tier.toNumber()]
			? TIER_DESCS[player.tier.toNumber()]
			: DEFAULT_TIER_DESC
		: DEFAULT_TIER_DESC;
	tmp.tiers.canTierUp = player.rank.gte(tmp.tiers.req);
	if (nerfActive("noTier")) tmp.tiers.canTierUp = false;
	tmp.tiers.layer = new Layer("tier", tmp.tiers.canTierUp, "semi-forced");
	if (!tmp.tier) tmp.tier = {};
	if (!tmp.tier.onReset) tmp.tier.onReset = function (prev) {
		if (modeActive('extreme')) if (tmp.ach[22].has) player.rankCheap = new ExpantaNum(1)
		if (hasCollapseMilestone(11)) {
			player.rank = prev.rank;
		}
		if (player.tr.upgrades.includes(14) && !HCCBA("noTRU")) {
			player.distance = prev.distance;
			player.velocity = prev.velocity;
		}
		if (!tmp.inf.upgs.has("4;9")) tmp.inf.derv.resetDervs();
	};
	if (!tmp.tier.updateOnReset) tmp.tier.updateOnReset = function() { updateTempTiers(); }
}

function getTierFP() {
	let fp = new ExpantaNum(1)
	if (player.elementary.sky.unl && tmp.elm && !scalingActive("tier", player.tier, "scaled")) fp = fp.sub(tmp.elm.sky.pionEff[10]).pow(-1)
	if (player.tr.upgrades.includes(20) && !HCCBA("noTRU") && modeActive("extreme")) fp = fp.times(player.rankCheap.plus(1).log10().plus(1).log10().plus(1));
	if (extremeStadiumActive("cranius", 5)) fp = fp.div(player.rankCheap.plus(1))
	if (tmp.ach) if (tmp.ach[194].has) fp = fp.times(1.0069);
	return fp
}

function getTierBaseCost() {
	let bc = new ExpantaNum(3)
	if (modeActive("extreme") && player.tier < 2) bc = bc.plus(1);
	if (modeActive("easy") && player.tier < 2) bc = bc.sub(1);
	if (tmp.inf) if (tmp.inf.stadium.active("solaris", 5) || tmp.inf.stadium.active("spaceon", 6)) bc = bc.plus(25);
	return bc
}

function tier2Eff() {
	let tier = player.tier;
	if (tier.gte(10)) tier = tier.log10().times(10);
	return ExpantaNum.pow(1.1, tier);
}

function tier7Eff() {
	return ExpantaNum.pow(1.1, player.rf)
}

function tier9Eff() {
	return player.automation.intelligence.plus(1).log10().plus(1).sqrt();
}