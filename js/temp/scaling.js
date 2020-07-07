function updateTempScaling() {
	tmp.scaling = {};
	tmp.scaling.active = function (type, v, scaling) {
		v = new ExpantaNum(v);
		let sd = tmp.scalings ? tmp.scalings : SCALING_STARTS;
		return v.gte(sd[scaling][type]);
	};
	tmp.scaling.getName = function (name, x = 0) {
		let mx = Object.keys(SCALING_STARTS).length;
		let current = "";
		let amt = SCALING_RES[name](x);
		for (let n = mx - 1; n >= 0; n--) {
			let scaling = SCALING_STARTS[Object.keys(SCALING_STARTS)[n]];
			if (tmp.scaling.active(name, amt, Object.keys(SCALING_STARTS)[n]))
				return capitalFirst(Object.keys(SCALING_STARTS)[n]) + " ";
		}
		return current;
	};

	tmp.scalings = {};
	tmp.scalingPower = {};
	for (let t = 0; t < Object.keys(SCALING_STARTS).length; t++) {
		let name = Object.keys(SCALING_STARTS)[t];
		tmp.scalings[name] = {};
		tmp.scalingPower[name] = {};
		for (let p = 0; p < Object.keys(SCALING_STARTS[name]).length; p++) {
			let name2 = Object.keys(SCALING_STARTS[name])[p];
			tmp.scalings[name][name2] = new ExpantaNum(deepCopy(SCALING_STARTS[name][name2]));
			tmp.scalingPower[name][name2] = new ExpantaNum(1);
		}
	}

	// Scaling Starts
	if (player.tr.upgrades.includes(11)) tmp.scalings.scaled.rank = tmp.scalings.scaled.rank.plus(10);
	if (player.tr.upgrades.includes(15)) tmp.scalings.scaled.rank = tmp.scalings.scaled.rank.plus(32);
	if (player.tr.upgrades.includes(12)) tmp.scalings.scaled.tier = tmp.scalings.scaled.tier.plus(2);
	if (player.tr.upgrades.includes(14) && tmp.tr14)
		tmp.scalings.scaled.tier = tmp.scalings.scaled.tier.plus(tmp.tr14["ss"]);
	if (player.dc.unl && tmp.dc) tmp.scalings.scaled.rf = tmp.scalings.scaled.rf.plus(tmp.dc.dfEff);
	if (tmp.pathogens) {
		tmp.scalings.superscaled.rf = tmp.scalings.superscaled.rf.plus(tmp.pathogens[11].eff);
		tmp.scalings.scaled.darkCore = tmp.scalings.scaled.darkCore.plus(tmp.pathogens[12].eff);
	}
	if (tmp.inf) {
		if (tmp.inf.upgs.has("4;5")) tmp.scalings.scaled.pathogenUpg = tmp.scalings.scaled.pathogenUpg.plus(2);
		if (tmp.inf.upgs.has("1;6")) {
			tmp.scalings.scaled.rank = tmp.scalings.scaled.rank.plus(2);
			tmp.scalings.scaled.tier = tmp.scalings.scaled.tier.plus(2);
		}
		if (tmp.inf.upgs.has("2;6")) tmp.scalings.superscaled.rf = tmp.scalings.superscaled.rf.plus(5);
		if (tmp.inf.upgs.has("6;1")) tmp.scalings.scaled.rf = tmp.scalings.scaled.rf.plus(10);
		if (tmp.inf.upgs.has("6;2")) tmp.scalings.superscaled.rank = tmp.scalings.superscaled.rank.plus(5);
		if (tmp.inf.upgs.has("6;4")) tmp.scalings.scaled.darkCore = tmp.scalings.scaled.darkCore.plus(2);
		if (tmp.inf.stadium.completed("solaris"))
			tmp.scalings.superscaled.rank = tmp.scalings.superscaled.rank.plus(STADIUM_REWARDS.effects.solaris());
		if (tmp.inf.upgs.has("5;7"))
			tmp.scalings.superscaled.tier = tmp.scalings.superscaled.tier.plus(INF_UPGS.effects["5;7"]());
		if (tmp.inf.upgs.has("9;3")) tmp.scalings.scaled.endorsements = tmp.scalings.scaled.endorsements.plus(1);
	}
	if (tmp.nerfs.active("scaledRank")) tmp.scalings.scaled.rank = new ExpantaNum(1);
	if (tmp.nerfs.active("scaledTier")) tmp.scalings.scaled.tier = new ExpantaNum(1);
	if (tmp.nerfs.active("scaledRF")) tmp.scalings.scaled.rf = new ExpantaNum(1);

	// Scaling Start Bugfix

	for (let t = 0; t < Object.keys(SCALING_STARTS).length; t++) {
		let name = Object.keys(SCALING_STARTS)[t];
		let next = Object.keys(SCALING_STARTS)[t + 1];
		for (let p = 0; p < Object.keys(SCALING_STARTS[name]).length; p++) {
			let name2 = Object.keys(SCALING_STARTS[name])[p];
			if (next !== undefined)
				if (tmp.scalings[next][name2] !== undefined)
					tmp.scalings[name][name2] = ExpantaNum.min(tmp.scalings[name][name2], tmp.scalings[next][name2]);
		}
	}

	// Scaling Strengths
	if (tmp.pathogens) {
		tmp.scalingPower.scaled.rank = tmp.scalingPower.scaled.rank.times(ExpantaNum.sub(1, tmp.pathogens[14].eff));
		tmp.scalingPower.superscaled.rank = tmp.scalingPower.superscaled.rank.times(
			ExpantaNum.sub(1, tmp.pathogens[14].eff)
		);
		tmp.scalingPower.scaled.endorsements = tmp.scalingPower.scaled.endorsements.times(
			ExpantaNum.sub(1, tmp.pathogens[15].eff)
		);
	}
	if (tmp.inf) {
		if (tmp.inf.upgs.has("4;3")) tmp.scalingPower.scaled.rank = tmp.scalingPower.scaled.rank.times(0.5);
		if (tmp.inf.stadium.active("solaris", 4)) tmp.scalingPower.scaled.rank = tmp.scalingPower.scaled.rank.times(6);
		if (tmp.inf.stadium.active("drigganiz", 4))
			tmp.scalingPower.scaled.rank = tmp.scalingPower.scaled.rank.times(6);
		if (tmp.inf.upgs.has("2;5")) tmp.scalingPower.superscaled.rank = tmp.scalingPower.superscaled.rank.times(0.95);
		if (tmp.inf.upgs.has("9;6"))
			tmp.scalingPower.superscaled.rank = tmp.scalingPower.superscaled.rank.times(
				ExpantaNum.sub(1, INF_UPGS.effects["9;6"]())
			);
		if (tmp.inf.upgs.has("8;6"))
			tmp.scalingPower.hyper.rank = tmp.scalingPower.hyper.rank.times(
				ExpantaNum.sub(1, INF_UPGS.effects["8;6"]())
			);
		if (tmp.inf.upgs.has("7;9")) tmp.scalingPower.hyper.rank = tmp.scalingPower.hyper.rank.times(0.98);
		if (tmp.inf.upgs.has("1;5")) tmp.scalingPower.scaled.tier = tmp.scalingPower.scaled.tier.times(0.8);
		if (tmp.inf.upgs.has("2;7"))
			tmp.scalingPower.scaled.tier = tmp.scalingPower.scaled.tier.times(
				ExpantaNum.sub(1, INF_UPGS.effects["2;7"]())
			);
		if (tmp.inf.stadium.active("eternity", 4)) tmp.scalingPower.scaled.tier = tmp.scalingPower.scaled.tier.times(6);
		if (tmp.inf.stadium.active("drigganiz", 4))
			tmp.scalingPower.scaled.tier = tmp.scalingPower.scaled.tier.times(6);
		if (tmp.inf.upgs.has("9;6"))
			tmp.scalingPower.superscaled.tier = tmp.scalingPower.superscaled.tier.times(
				ExpantaNum.sub(1, INF_UPGS.effects["9;6"]())
			);
		if (tmp.inf.upgs.has("3;5")) tmp.scalingPower.scaled.rf = tmp.scalingPower.scaled.rf.times(0.75);
		if (tmp.inf.stadium.active("infinity", 4))
			tmp.scalingPower.scaled.pathogenUpg = tmp.scalingPower.scaled.pathogenUpg.times(6);
		if (tmp.inf.upgs.has("8;7"))
			tmp.scalingPower.scaled.pathogenUpg = tmp.scalingPower.scaled.pathogenUpg.times(0.16);
		if (tmp.inf.upgs.has("8;6"))
			tmp.scalingPower.scaled.darkCore = tmp.scalingPower.scaled.darkCore.times(
				ExpantaNum.sub(1, INF_UPGS.effects["8;6"]())
			);
	}
}
