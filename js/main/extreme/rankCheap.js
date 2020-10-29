function getRankCheapEff() {
	if (extremeStadiumActive("flamis")) return new ExpantaNum(1)
	return player.rankCheap
		.times(tmp.rankCheap.manPow)
		.plus(tmp.rankCheap.free)
		.times(tmp.rankCheap.pow)
		.sqrt()
		.plus(1);
}

function getRankCheapEff2() {
	if (extremeStadiumActive("flamis")) return new ExpantaNum(1)
	return ExpantaNum.pow(
		2,
		player.rankCheap.times(tmp.rankCheap.manPow).plus(tmp.rankCheap.free).times(tmp.rankCheap.pow)
	);
}

function updateTempRankCheapCost(){
	tmp.rankCheap.fp = new ExpantaNum(1);
	if (extremeStadiumComplete("spectra")) tmp.rankCheap.fp = tmp.rankCheap.fp.times(EXTREME_STADIUM_DATA.spectra.effect())
	tmp.rankCheap.bc = new ExpantaNum(30);
	tmp.rankCheap.req = new ExpantaNum(tmp.rankCheap.bc).times(
		ExpantaNum.pow(2, player.rankCheap.div(tmp.rankCheap.fp).max(1).sub(1).pow(2))
	);
	tmp.rankCheap.bulk = player.distance
		.div(tmp.rankCheap.bc)
		.logBase(2)
		.sqrt()
		.plus(1)
		.times(tmp.rankCheap.fp)
		.plus(1)
		.round();
	let start = getScalingStart("scaled", "rankCheap");
	let power = getScalingPower("scaled", "rankCheap");
	let exp = ExpantaNum.pow(2, power);
	if (scalingActive("rankCheap", player.rankCheap.max(tmp.rankCheap.bulk), "scaled")) {
		tmp.rankCheap.req = new ExpantaNum(tmp.rankCheap.bc).times(
			ExpantaNum.pow(
				2,
				player.rankCheap
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(tmp.rankCheap.fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.rankCheap.bulk = player.distance
			.div(tmp.rankCheap.bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(tmp.rankCheap.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.plus(1)
			.floor();
	}
	let start2 = getScalingStart("superscaled", "rankCheap");
	let power2 = getScalingPower("superscaled", "rankCheap");
	let exp2 = ExpantaNum.pow(3, power2);
	if (scalingActive("rankCheap", player.rankCheap.max(tmp.rankCheap.bulk), "superscaled")) {
		tmp.rankCheap.req = new ExpantaNum(tmp.rankCheap.bc).times(
			ExpantaNum.pow(
				2,
				player.rankCheap
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(tmp.rankCheap.fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.rankCheap.bulk = player.distance
			.div(tmp.rankCheap.bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(tmp.rankCheap.fp)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.add(1)
			.floor();
	}
	let start3 = getScalingStart("hyper", "rankCheap");
	let power3 = getScalingPower("hyper", "rankCheap");
	let base3 = ExpantaNum.pow(1.01, power3);
	if (scalingActive("rankCheap", player.rankCheap.max(tmp.rankCheap.bulk), "hyper")) {
		tmp.rankCheap.req = new ExpantaNum(tmp.rankCheap.bc).times(
			ExpantaNum.pow(
				2,
				ExpantaNum.pow(base3, player.rankCheap.sub(start3))
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(tmp.rankCheap.fp)
					.sub(1)
					.pow(2)
			)
		);
		tmp.rankCheap.bulk = player.distance
			.div(tmp.rankCheap.bc)
			.max(1)
			.logBase(2)
			.sqrt()
			.plus(1)
			.times(tmp.rankCheap.fp)
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
}

function updateTempRankCheap() {
	if (!tmp.rankCheap) tmp.rankCheap = {};
	tmp.rankCheap.free = new ExpantaNum(0);
	if (tmp.ach[21].has) tmp.rankCheap.free = tmp.rankCheap.free.plus(player.tier);
	if (tmp.ach[34].has) tmp.rankCheap.free = tmp.rankCheap.free.plus(1);
	if (player.rf.gt(0)) tmp.rankCheap.free = tmp.rankCheap.free.plus(player.furnace.upgrades[1].times(tmp.fn ? tmp.fn.upgPow : 1));
	if (extremeStadiumActive("cranius", 2)) tmp.rankCheap.free = tmp.rankCheap.free.div(10).floor();
	updateTempRankCheapCost()
	tmp.rankCheap.can = player.distance.gte(tmp.rankCheap.req);
	tmp.rankCheap.layer = new Layer("rankCheap", tmp.rankCheap.can, "semi-forced");
	tmp.rankCheap.pow = new ExpantaNum(1);
	if (tmp.ach[12].has) tmp.rankCheap.pow = tmp.rankCheap.pow.plus(ExpantaNum.mul(0.5, player.achievements.length));
	if (player.tr.upgrades.includes(22) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.rankCheap.pow = tmp.rankCheap.pow.times(player.collapse.cadavers.plus(1).times(10).slog(10).sqrt());
	tmp.rankCheap.manPow = new ExpantaNum(1);
	if (tmp.fn) if (tmp.fn.enh.unl) tmp.rankCheap.manPow = tmp.rankCheap.manPow.plus(ExpantaNum.mul(tmp.fn.enh.upg2eff, player.furnace.enhancedUpgrades[1].plus(tmp.fn.enh.upgs[2].extra).times(tmp.fn.enh.upgPow)))
	tmp.rankCheap.eff = getRankCheapEff();
	tmp.rankCheap.eff2 = getRankCheapEff2();
	if (!tmp.rankCheap.onReset) tmp.rankCheap.onReset = function(prev) {
		if (tmp.ach[112].has) {
			player.distance = prev.distance;
			player.velocity = prev.velocity;
		}
	};
	if (!tmp.rankCheap.updateOnReset) tmp.rankCheap.updateOnReset = function() { updateTempRankCheapCost(); }
}