function updateTempDC() {
	tmp.dc = {};
	tmp.dc.lrm = new ExpantaNum(1);
	if (modeActive("extreme")) tmp.dc.lrm = tmp.dc.lrm.times(1e-28);
	tmp.dc.dmGain = ExpantaNum.pow(2, player.dc.cores).sub(1).times(player.dc.fluid.plus(1).log10().plus(1)).max(0);
	tmp.dc.deGain = player.dc.matter.plus(1).log10();
	tmp.dc.dfGain = player.dc.energy.plus(1).log10();
	if (tmp.inf)
		if (tmp.inf.upgs.has("8;1")) {
			let fp = new ExpantaNum(1);
			if (tmp.inf.upgs.has("8;8")) fp = fp.times(INF_UPGS.effects["8;8"]());
			tmp.dc.dmGain = ExpantaNum.pow(2, player.dc.cores)
				.sub(1)
				.times(
					player.dc.fluid
						.plus(1)
						.log10()
						.plus(1)
						.times(player.dc.fluid.plus(1).pow(ExpantaNum.mul(1 / 5, fp)))
				)
				.max(0);
			tmp.dc.deGain = player.dc.matter
				.plus(1)
				.log10()
				.times(player.dc.matter.plus(1).pow(ExpantaNum.mul(1 / 5, fp)));
			tmp.dc.dfGain = player.dc.energy
				.plus(1)
				.log10()
				.times(player.dc.energy.plus(1).pow(ExpantaNum.mul(1 / 5, fp)));
		}
	tmp.dc.allComp = player.dc.matter
		.plus(1)
		.log10()
		.plus(player.dc.energy.plus(1).log10())
		.plus(player.dc.fluid.plus(1).log10())
		.plus(player.dc.cores);
	tmp.dc.flow = new ExpantaNum(1);
	if (tmp.ach[75].has) tmp.dc.flow = tmp.dc.flow.times(1.1);
	if (tmp.ach[83].has) tmp.dc.flow = tmp.dc.flow.times(1.2);
	if (tmp.ach[131].has) tmp.dc.flow = tmp.dc.flow.times(1.5);
	if (player.tr.upgrades.includes(11) && !HCCBA("noTRU")) tmp.dc.flow = tmp.dc.flow.times(tr11Eff()["dcf"]);
	if (player.tr.upgrades.includes(12) && !HCCBA("noTRU")) tmp.dc.flow = tmp.dc.flow.times(tr12Eff());
	if (tmp.inf) {
		if (tmp.inf.upgs.has("4;1")) tmp.dc.flow = tmp.dc.flow.times(2);
		if (tmp.inf.upgs.has("5;1")) tmp.dc.flow = tmp.dc.flow.times(2);
		if (tmp.inf.upgs.has("4;6")) tmp.dc.flow = tmp.dc.flow.times(2);
		if (tmp.inf.upgs.has("5;5")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["5;5"]());
		tmp.dc.flow = tmp.dc.flow.times(tmp.inf.asc.perkEff(1));
		if (tmp.inf.upgs.has("7;2")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["7;2"]()["flow"]);
		if (tmp.inf.upgs.has("7;6")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["7;6"]());
		if (tmp.inf.upgs.has("7;8")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["7;8"]());
		if (tmp.inf.upgs.has("10;5")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["10;5"]());
		if (tmp.inf.upgs.has("10;10")) tmp.dc.flow = tmp.dc.flow.times(INF_UPGS.effects["10;10"]());
	}
	if (tmp.elm) if (player.elementary.times.gt(0)) tmp.dc.flow = tmp.dc.flow.times(tmp.elm.bos.z2.max(1));
	if (extremeStadiumActive("quantron", 5)) tmp.dc.flow = tmp.dc.flow.pow(0.95);
	if (nerfActive("noDarkFlow")) tmp.dc.flow = new ExpantaNum(0);
	tmp.dc.power = new ExpantaNum(1);
	if (player.tr.upgrades.includes(15) && !HCCBA("noTRU")) tmp.dc.power = tmp.dc.power.times(tr15Eff());
	tmp.dc.dmEff = player.dc.matter.times(tmp.dc.flow).plus(1).pow(ExpantaNum.mul(0.1, tmp.dc.power));
	if (tmp.inf)
		if (tmp.inf.upgs.has("6;8"))
			tmp.dc.dmEff = tmp.dc.dmEff.max(
				player.dc.matter
					.times(tmp.dc.flow)
					.plus(1)
					.pow(
						ExpantaNum.mul(
							ExpantaNum.pow(2, player.dc.matter.plus(10).slog(10).sub(1)).div(10),
							tmp.dc.power
						)
					)
					.pow(5)
			);
	tmp.dc.deEff = player.dc.energy.times(tmp.dc.flow).plus(1).pow(ExpantaNum.mul(0.125, tmp.dc.power));
	if (tmp.inf)
		if (tmp.inf.upgs.has("6;8"))
			tmp.dc.deEff = tmp.dc.deEff.max(
				player.dc.energy
					.times(tmp.dc.flow)
					.plus(1)
					.pow(
						ExpantaNum.mul(
							ExpantaNum.pow(2, player.dc.energy.plus(10).slog(10).sub(1)).div(8),
							tmp.dc.power
						)
					)
					.pow(10)
			);
	tmp.dc.dfEff = extremeStadiumActive("spectra", 4)?new ExpantaNum(0):(player.dc.fluid.times(tmp.dc.flow).plus(1).log10().plus(1).log10().times(tmp.dc.power));
	tmp.dc.coreEff =
		player.dc.cores.gte(modeActive("extreme")?21:12)
			? player.dc.cores.pow(7).div(ExpantaNum.pow(modeActive("extreme")?21:12, 6).times(8)).plus(1).log10().plus(1).logBase(modeActive("extreme")?1e3:10)
			: new ExpantaNum(0);
	tmp.dc.coreCost = ExpantaNum.pow(10, ExpantaNum.pow(10, player.dc.cores.div(50).plus(1))).times(
		modeActive("extreme") ? 0.25 : 10
	);
	tmp.dc.bulk = player.collapse.cadavers
		.div(modeActive("extreme") ? 0.25 : 10)
		.max(1)
		.log10()
		.max(1)
		.log10()
		.sub(1)
		.times(50)
		.plus(1);
	let start = getScalingStart("scaled", "darkCore");
	let power = getScalingPower("scaled", "darkCore");
	let exp = ExpantaNum.pow(2, power);
	if (scalingActive("darkCore", player.dc.cores.max(tmp.dc.bulk), "scaled")) {
		tmp.dc.coreCost = ExpantaNum.pow(
			10,
			ExpantaNum.pow(
				10,
				player.dc.cores
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(50)
					.plus(1)
			)
		).times(modeActive("extreme") ? 0.25 : 10);
		tmp.dc.bulk = player.collapse.cadavers
			.div(modeActive("extreme") ? 0.25 : 10)
			.max(1)
			.log10()
			.max(1)
			.log10()
			.sub(1)
			.times(50)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.add(1);
	}
	let start2 = getScalingStart("superscaled", "darkCore");
	let power2 = getScalingPower("superscaled", "darkCore");
	let exp2 = ExpantaNum.pow(3, power2);
	if (scalingActive("darkCore", player.dc.cores.max(tmp.dc.bulk), "superscaled")) {
		tmp.dc.coreCost = ExpantaNum.pow(
			10,
			ExpantaNum.pow(
				10,
				player.dc.cores
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(50)
					.plus(1)
			)
		).times(modeActive("extreme") ? 0.25 : 10);
		tmp.dc.bulk = player.collapse.cadavers
			.div(modeActive("extreme") ? 0.25 : 10)
			.max(1)
			.log10()
			.max(1)
			.log10()
			.sub(1)
			.times(50)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.add(1);
	}
	let start3 = getScalingStart("hyper", "darkCore");
	let power3 = getScalingPower("hyper", "darkCore");
	let base3 = ExpantaNum.pow(1.03, power3);
	if (scalingActive("darkCore", player.dc.cores.max(tmp.dc.bulk), "hyper")) {
		tmp.dc.coreCost = ExpantaNum.pow(
			10,
			ExpantaNum.pow(
				10,
				ExpantaNum.pow(base3, player.dc.cores.sub(start3))
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.div(50)
					.plus(1)
			)
		).times(modeActive("extreme") ? 0.25 : 10);
		tmp.dc.bulk = player.collapse.cadavers
			.div(modeActive("extreme") ? 0.25 : 10)
			.max(1)
			.log10()
			.max(1)
			.log10()
			.sub(1)
			.times(50)
			.times(start.pow(exp.sub(1)))
			.pow(exp.pow(-1))
			.times(start2.pow(exp2.sub(1)))
			.pow(exp2.pow(-1))
			.div(start3)
			.max(1)
			.logBase(base3)
			.add(start3)
			.add(1);
	}
	if (!tmp.dc.buyCore) tmp.dc.buyCore = function () {
		if (player.collapse.cadavers.lt(tmp.dc.coreCost) || nerfActive("noDarkCores")) return;
		if (!player.dc.unl) return;
		if (!tmp.ach[92].has) player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost);
		player.dc.cores = player.dc.cores.plus(1);
	};
	if (!tmp.dc.maxCores) tmp.dc.maxCores = function () {
		if (player.collapse.cadavers.lt(tmp.dc.coreCost) || nerfActive("noDarkCores")) return;
		if (!player.dc.unl) return;
		if (!tmp.ach[92].has) player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost);
		player.dc.cores = player.dc.cores.max(tmp.dc.bulk.floor().max(0)).max(player.dc.cores.plus(1));
	};
	if (!tmp.dc.tick) tmp.dc.tick = function (diff) {
		player.dc.matter = player.dc.matter.plus(adjustGen(tmp.dc.dmGain, "dc").times(diff).times(tmp.dc.flow));
		player.dc.energy = player.dc.energy.plus(adjustGen(tmp.dc.deGain, "dc").times(diff).times(tmp.dc.flow));
		player.dc.fluid = player.dc.fluid.plus(adjustGen(tmp.dc.dfGain, "dc").times(diff).times(tmp.dc.flow));
	};
}
