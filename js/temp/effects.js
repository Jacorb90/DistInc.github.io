function updateTempEffects() {
	// Rank Effects

	tmp.r2 = ExpantaNum.pow(1.1, player.rank);
	tmp.r4 = ExpantaNum.pow(3, player.tier);
	tmp.r5 = ExpantaNum.pow(1.975, player.rank);
	tmp.r8 = ExpantaNum.pow(1.1, player.rank);
	tmp.r14 = ExpantaNum.pow(player.rf.plus(1), 1.6);
	tmp.r40 = primesLTE(player.automation.scraps).max(1);
	if (tmp.r40.gte(1e9)) tmp.r40 = tmp.r40.log10().times(1e9 / 9);
	tmp.r55 = ExpantaNum.pow(2, player.rank);
	tmp.r111 = ExpantaNum.pow(2, player.rank);

	// Tier Effects

	let tier = player.tier;
	if (tier.gte(10)) tier = tier.log10().times(10);
	tmp.t3 = ExpantaNum.pow(1.1, tier);
	tmp.t7 = ExpantaNum.pow(1.1, player.rf);
	tmp.t9 = player.automation.intelligence.plus(1).log10().plus(1).sqrt();

	// Achievement Effects

	tmp.ach63sc = new ExpantaNum(1e25);
	if (tmp.inf)
		if (tmp.inf.upgs.has("8;4")) tmp.ach63sc = tmp.ach63sc.times(player.inf.pantheon.purge.power.plus(1).pow(17));
	tmp.ach63pow = new ExpantaNum(1);
	if (tmp.ach) if (tmp.ach[74].has) tmp.ach63pow = tmp.ach63pow.times(1.75);
	if (tmp.modes.easy.active) tmp.ach63pow = tmp.ach63pow.times(2);
	if (player.tr.upgrades.includes(24) && tmp.modes.extreme.active) tmp.ach63pow = tmp.ach63pow.times(1.4);
	tmp.ach63 = tmp.timeSpeed ? tmp.timeSpeed.pow(0.025).pow(tmp.ach63pow) : new ExpantaNum(1);
	if (tmp.ach63.gte(tmp.ach63sc)) tmp.ach63 = tmp.ach63.log10().times(tmp.ach63sc.div(tmp.ach63sc.log10()));
	tmp.ach112pow = new ExpantaNum(1);
	tmp.ach112 = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1).log10().plus(1).pow(0.1) : new ExpantaNum(1);
	if (tmp.ach)
		if (tmp.ach[123].has)
			tmp.ach112 = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1).pow(0.02).max(tmp.ach112) : new ExpantaNum(1);

	// Time Reversal Upgrade Effects

	tmp.tr1 = ExpantaNum.pow(1.1, player.rank.plus(player.tier));
	tmp.tr2e = new ExpantaNum(1);
	if (tmp.pathogens && player.pathogens.unl) tmp.tr2e = tmp.tr2e.times(tmp.pathogens[1].eff);
	tmp.tr2 = ExpantaNum.log10(player.tr.cubes.plus(1)).plus(1).pow(tmp.tr2e);
	let rockets = player.rockets;
	if (rockets.gte(1e10)) rockets = rockets.pow(0.1).times(1e9);
	tmp.tr4 = ExpantaNum.pow(1.33, rockets.plus(1).log10());
	tmp.tr6 = ExpantaNum.pow(1.1, player.tr.cubes.plus(1).log10());
	tmp.tr7 = ExpantaNum.pow(1.05, player.achievements.length);
	let tr89mod = 1;
	if (tmp.modes.hard.active) tr89mod /= 2;
	if (tmp.modes.easy.active) tr89mod *= 3;
	tmp.tr8 = ExpantaNum.div(4, tmp.auto ? tmp.auto.rankbot.interval.max(1e-10) : 1)
		.pow((1 / 3) * tr89mod)
		.max(1);
	tmp.tr9 = ExpantaNum.div(5, tmp.auto ? tmp.auto.tierbot.interval.max(1e-10) : 1)
		.pow(0.2 * tr89mod)
		.max(1);
	let cubes = player.tr.cubes;
	if (cubes.gte(1e10)) cubes = cubes.pow(0.1).times(1e9);
	tmp.tr10 = ExpantaNum.pow(1.1, cubes.plus(1).log10());
	tmp.tr11pow = new ExpantaNum(1);
	if (tmp.inf) if (tmp.inf.upgs.has("1;8")) tmp.tr11pow = tmp.tr11pow.times(INF_UPGS.effects["1;8"]());
	tmp.tr11 = {
		cg: tmp.dc
			? tmp.dc.flow.pow(tmp.dc.flow.plus(1).slog(2).times(10).plus(1)).pow(tmp.tr11pow)
			: new ExpantaNum(1),
		dcf: player.tr.cubes.plus(1).log10().div(75).plus(1).pow(tmp.tr11pow)
	};
	tmp.tr12 = tmp.dc ? tmp.dc.allComp.plus(1).sqrt() : new ExpantaNum(1);
	tmp.tr13 = tmp.dc ? tmp.dc.allComp.plus(1).slog(2).pow(0.1).sub(1) : new ExpantaNum(0);
	tmp.tr14 = {
		cd: player.tier.plus(1).pow(1.25),
		ss: player.dc.cores.plus(1).log10().plus(1).log10().times(7.5)
	};
	tmp.tr15 = ExpantaNum.pow(1.2, player.dc.cores);
	if (tmp.tr15.gte(10)) tmp.tr15 = tmp.tr15.log10().times(10);
	if (tmp.modes.extreme.active) {
		tmp.tr19 = ExpantaNum.pow(4.5, tmp.auto ? tmp.auto.rankCheapbot.interval.max(1e-10) : 1)
			.pow(0.3 * tr89mod)
			.max(1);
		if (showNum(tmp.tr19) === undefined || !tmp.tr19.isFinite()) tmp.tr19 = new ExpantaNum(1);
	}

	// Universal Collapse Milestone Effects

	tmp.ucme1 = new ExpantaNum(100).div(player.distance.plus(1).pow(0.06989).plus(1).min(50));
	tmp.ucme5 = player.tr.cubes.plus(1).log10().plus(1).log10().plus(1);
	if (tmp.ucme5.gte(2.5)) tmp.ucme5 = tmp.ucme5.logBase(2.5).plus(1.5);
	tmp.ucme8 = (tmp.timeSpeed ? tmp.timeSpeed : new ExpantaNum(1)).plus(1).logBase(2).max(1);
	if (tmp.ucme8.gte(50)) tmp.ucme8 = tmp.ucme8.times(2).log10().times(25);
	tmp.ucme10 = player.collapse.lifeEssence.plus(1).log10().plus(1).sqrt().pow(8);
	if (tmp.ucme10.gte(40)) tmp.ucme10 = tmp.ucme10.times(2.5).log10().times(20);

	// Pathogen Upgrade Effects

	tmp.pth5 = tmp.pathogens && player.pathogens.unl ? tmp.pathogens[5].eff : new ExpantaNum(1);
	tmp.pth13 = tmp.pathogens && player.pathogens.unl ? tmp.pathogens[13].eff : new ExpantaNum(1);
}
