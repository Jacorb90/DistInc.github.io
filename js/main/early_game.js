function updateTempEarlyGame() {
	// Acceleration
	tmp.acc = new ExpantaNum(0.1);
	if (modeActive("hard")) tmp.acc = tmp.acc.div(3);
	if (modeActive("easy")) tmp.acc = tmp.acc.times(2);
	if (player.rank.gt(2)) tmp.acc = tmp.acc.times(tmp.r2);
	if (player.rank.gt(3)) tmp.acc = tmp.acc.times(2);
	if (player.tier.gt(1) && player.rank.gte(3)) tmp.acc = tmp.acc.times(2);
	if (player.rank.gt(4)) tmp.acc = tmp.acc.times(tmp.r4);
	if (player.rank.gt(5)) tmp.acc = tmp.acc.times(tmp.r5);
	if (player.rank.gt(10)) tmp.acc = tmp.acc.times(2);
	if (player.tier.gt(3)) tmp.acc = tmp.acc.times(3);
	if (player.rank.gt(14)) tmp.acc = tmp.acc.times(tmp.r14);
	if (player.rank.gt(15)) tmp.acc = tmp.acc.times(4);
	if (player.tier.gt(5)) tmp.acc = tmp.acc.times(5);
	if (player.rank.gt(25)) tmp.acc = tmp.acc.times(10);
	if (player.rank.gt(50)) tmp.acc = tmp.acc.times(15);
	if (player.tier.gt(8)) tmp.acc = tmp.acc.times(10);
	if (player.tier.gt(10)) tmp.acc = tmp.acc.times(15);
	if (player.rank.gt(75)) tmp.acc = tmp.acc.times(25);
	if (player.tier.gt(15)) tmp.acc = tmp.acc.times(25);
	if (tmp.ach) if (tmp.ach[12].has) tmp.acc = tmp.acc.times(1.1);
	if (tmp.ach) if (tmp.ach[23].has) tmp.acc = tmp.acc.times(1.2);
	if (tmp.ach) if (tmp.ach[14].has) tmp.acc = tmp.acc.times(1.5);
	if (tmp.ach) if (tmp.ach[32].has) tmp.acc = tmp.acc.times(1.8);
	if (tmp.ach) if (tmp.ach[35].has) tmp.acc = tmp.acc.times(1.8);
	if (tmp.ach) if (tmp.ach[105].has) tmp.acc = tmp.acc.times(4);
	if (tmp.ach) if (tmp.ach[24].has && modeActive("extreme")) tmp.acc = tmp.acc.times(10);
	if (tmp.maxVel && tmp.inf) if (tmp.inf.upgs.has("6;6")) tmp.acc = tmp.acc.times(INF_UPGS.effects["6;6"]());
	if (tmp.inf && tmp.timeSpeed) if (tmp.inf.upgs.has("4;7")) tmp.acc = tmp.acc.times(INF_UPGS.effects["4;7"]());
	if (tmp.rockets) tmp.acc = tmp.acc.times(tmp.rockets.accPow);
	if (tmp.nerfs.active("nerfAccel")) tmp.acc = tmp.acc.pow(0.1);
	if (tmp.inf && player.inf.derivatives.unl)
		tmp.acc = tmp.acc.times(
			(player.inf.derivatives.amts.acceleration
				? player.inf.derivatives.amts.acceleration
				: new ExpantaNum(0)
			).max(1)
		);
	if (modeActive("extreme") && tmp.acc.gte(Number.MAX_VALUE)) tmp.acc = tmp.acc.pow(0.75).times(ExpantaNum.pow(Number.MAX_VALUE, 0.25))
	if (modeActive("extreme") && tmp.acc.gte("1e40000")) tmp.acc = tmp.acc.sqrt().times(ExpantaNum.sqrt("1e40000"))

	// Max Velocity
	tmp.maxVel = new ExpantaNum(1);
	if (player.rank.gt(1)) tmp.maxVel = tmp.maxVel.plus(1);
	if (modeActive("hard")) tmp.maxVel = tmp.maxVel.div(2);
	if (modeActive("easy")) tmp.maxVel = tmp.maxVel.times(3);
	if (player.rank.gt(2)) tmp.maxVel = tmp.maxVel.times(tmp.r2);
	if (player.tier.gt(1) && player.rank.gte(3)) tmp.maxVel = tmp.maxVel.times(5);
	if (player.rank.gt(4)) tmp.maxVel = tmp.maxVel.times(tmp.r4);
	if (player.rank.gt(5)) tmp.maxVel = tmp.maxVel.times(tmp.r5);
	if (player.rank.gt(8)) tmp.maxVel = tmp.maxVel.times(tmp.r8);
	if (player.rank.gt(14)) tmp.maxVel = tmp.maxVel.times(tmp.r14);
	if (player.rank.gt(55)) tmp.maxVel = tmp.maxVel.times(tmp.r55);
	if (player.tier.gt(9)) tmp.maxVel = tmp.maxVel.times(tmp.t9);
	if (tmp.pathogens && player.pathogens.unl) tmp.maxVel = tmp.maxVel.times(tmp.pathogens[4].eff);
	if (tmp.ach) if (tmp.ach[21].has) tmp.maxVel = tmp.maxVel.times(1.1);
	if (tmp.ach) if (tmp.ach[14].has) tmp.maxVel = tmp.maxVel.times(1.5);
	if (tmp.ach) if (tmp.ach[24].has) tmp.maxVel = tmp.maxVel.times(1.25);
	if (tmp.ach) if (tmp.ach[41].has) tmp.maxVel = tmp.maxVel.times(1.5);
	if (tmp.ach) if (tmp.ach[51].has) tmp.maxVel = tmp.maxVel.times(1.5);
	if (tmp.ach) if (tmp.ach[61].has) tmp.maxVel = tmp.maxVel.times(1.6);
	if (tmp.inf && tmp.timeSpeed) if (tmp.inf.upgs.has("4;7")) tmp.maxVel = tmp.maxVel.times(INF_UPGS.effects["4;7"]());
	if (tmp.inf) if (tmp.inf.upgs.has("7;7")) tmp.maxVel = tmp.maxVel.times(INF_UPGS.effects["7;7"]()["ve"]);
	if (tmp.rockets) tmp.maxVel = tmp.maxVel.times(tmp.rockets.mvPow);
	if (tmp.nerfs.active("nerfMaxVel")) tmp.maxVel = tmp.maxVel.pow(0.1);

	// Accelerational Energy
	tmp.accEn = new ExpantaNum(0);
	if (tmp.inf) if (tmp.inf.upgs.has("7;7")) tmp.accEn = tmp.accEn.plus(1).times(INF_UPGS.effects["7;7"]()["ae"]);
	if (tmp.inf) if (tmp.inf.upgs.has("8;2")) tmp.accEn = tmp.accEn.times(INF_UPGS.effects["8;2"]()["energy"]);
	if (tmp.inf) if (tmp.inf.upgs.has("9;1")) tmp.accEn = tmp.accEn.times(INF_UPGS.effects["9;1"]());
	if (tmp.inf) if (tmp.inf.upgs.has("10;2")) tmp.accEn = tmp.accEn.times(INF_UPGS.effects["10;2"]());
	if (tmp.inf && tmp.rockets) if (tmp.inf.upgs.has("5;8")) tmp.accEn = tmp.accEn.times(tmp.rockets.accEnPow);
}
