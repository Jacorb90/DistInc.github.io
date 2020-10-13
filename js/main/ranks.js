function updateTempRanks() {
	if (!tmp.ranks) tmp.ranks = {};
	let fp = getRankFP()
	let bc = getRankBaseCost()
	tmp.ranks.req = new ExpantaNum(bc).times(
		ExpantaNum.pow(2, player.rank.div(fp).max(1).sub(1).pow(2))
	);
	tmp.ranks.bulk = player.distance.div(bc).max(1).logBase(2).sqrt().plus(1).times(fp).plus(1).round();
	if (scalingActive("rank", player.rank.max(tmp.ranks.bulk), "scaled")) {
		let start = getScalingStart("scaled", "rank");
		let power = getScalingPower("scaled", "rank");
		let exp = ExpantaNum.pow(2, power);
		tmp.ranks.req = new ExpantaNum(bc).times(
			ExpantaNum.pow(
				2,
				player.rank
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.ranks.bulk = player.distance
			.div(bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.plus(1)
			.floor();
	}
	if (scalingActive("rank", player.rank.max(tmp.ranks.bulk), "superscaled")) {
		let start2 = getScalingStart("superscaled", "rank");
		let power2 = getScalingPower("superscaled", "rank");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rank");
		let power = getScalingPower("scaled", "rank");
		let exp = ExpantaNum.pow(2, power);
		tmp.ranks.req = new ExpantaNum(bc).times(
			ExpantaNum.pow(
				2,
				player.rank
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.ranks.bulk = player.distance
			.div(bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.add(1)
			.floor();
	}
	if (scalingActive("rank", player.rank.max(tmp.ranks.bulk), "hyper")) {
		let start3 = getScalingStart("hyper", "rank");
		let power3 = getScalingPower("hyper", "rank");
		let base3 = ExpantaNum.pow(1.01, power3);
		let start2 = getScalingStart("superscaled", "rank");
		let power2 = getScalingPower("superscaled", "rank");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rank");
		let power = getScalingPower("scaled", "rank");
		let exp = ExpantaNum.pow(2, power);
		tmp.ranks.req = new ExpantaNum(bc).times(
			ExpantaNum.pow(
				2,
				ExpantaNum.pow(base3, player.rank.sub(start3))
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.ranks.bulk = player.distance
			.div(bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(fp)
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
	if (scalingActive("rank", player.rank.max(tmp.ranks.bulk), "atomic")) {
		let start4 = getScalingStart("atomic", "rank");
		let power4 = getScalingPower("atomic", "rank");
		let exp4 = ExpantaNum.pow(4, power4);
		let start3 = getScalingStart("hyper", "rank");
		let power3 = getScalingPower("hyper", "rank");
		let base3 = ExpantaNum.pow(1.01, power3);
		let start2 = getScalingStart("superscaled", "rank");
		let power2 = getScalingPower("superscaled", "rank");
		let exp2 = ExpantaNum.pow(3, power2);
		let start = getScalingStart("scaled", "rank");
		let power = getScalingPower("scaled", "rank");
		let exp = ExpantaNum.pow(2, power);
		tmp.ranks.req = new ExpantaNum(bc).times(
			ExpantaNum.pow(
				2,
				ExpantaNum.pow(
					base3,
					player.rank
						.pow(exp4)
						.div(start4.pow(exp4.sub(1)))
						.sub(start3)
				)
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.ranks.bulk = player.distance
			.div(bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(fp)
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

	tmp.ranks.desc = player.rank.lt(Number.MAX_VALUE)
		? RANK_DESCS[player.rank.toNumber()]
			? RANK_DESCS[player.rank.toNumber()]
			: DEFAULT_RANK_DESC
		: DEFAULT_RANK_DESC;
	tmp.ranks.canRankUp = player.distance.gte(tmp.ranks.req);
	if (nerfActive("noRank")) tmp.ranks.canRankUp = false;
	tmp.ranks.layer = new Layer("rank", tmp.ranks.canRankUp, "semi-forced");
	if (!tmp.rank) tmp.rank = {};
	if (!tmp.rank.onReset) tmp.rank.onReset = function (prev) {
		if (tmp.collapse)
			if (hasCollapseMilestone(12)) {
				player.distance = prev.distance;
				player.velocity = prev.velocity;
			}
		if (!tmp.inf.upgs.has("4;9")) tmp.inf.derv.resetDervs();
	};
	if (!tmp.rank.updateOnReset) tmp.rank.updateOnReset = function() { updateTempRanks(); }
}

function getRankFP() {
	let fp = new ExpantaNum(1);
	if (player.tier.gt(0)) fp = fp.times(1.25)
	if (player.tier.gt(2)) fp = fp.times(tier2Eff())
	if (tmp.ach) if (tmp.ach[43].has) fp = fp.times(1.025)
	if (player.tr.upgrades.includes(3) && !HCCBA("noTRU")) fp = fp.times(1.1)
	if (tmp.rankCheap && modeActive("extreme")) fp = fp.times(getRankCheapEff())
	return fp
}

function getRankBaseCost() {
	let bc = new ExpantaNum(10)
	if (modeActive("extreme") && player.rank < 3) bc = bc.times(2)
	if (modeActive("easy") && player.rank < 3) bc = bc.div(3)
	if (tmp.inf) if (tmp.inf.stadium.active("spaceon", 5) || tmp.inf.stadium.active("solaris", 6)) bc = bc.times(10)
	if (tmp.rankCheap && modeActive("extreme")) bc = bc.div(tmp.rankCheap.eff2).max(1e-100)
	return bc
}

function rank2Eff() {
	return ExpantaNum.pow(1.1, player.rank);
}

function rank4Eff() {
	return ExpantaNum.pow(3, player.tier);
}

function rank5Eff() {
	return ExpantaNum.pow(1.975, player.rank);
}

function rank8Eff() {
	return ExpantaNum.pow(1.1, player.rank);
}

function rank14Eff() {
	return ExpantaNum.pow(player.rf.plus(1), 1.6);
}

function rank40Eff() {
	let eff = primesLTE(player.automation.scraps).max(1);
	if (eff.gte(1e9)) eff = eff.log10().times(1e9/9)
	return eff;
}

function rank55Eff() {
	return ExpantaNum.pow(2, player.rank)
}

function rank111Eff() {
	return ExpantaNum.pow(2, player.rank)
}