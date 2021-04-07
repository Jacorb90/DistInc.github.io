function calcAcceleration(){
	tmp.acc = new ExpantaNum(0.1);
	if (modeActive("hard")) tmp.acc = tmp.acc.div(3);
	if (modeActive("easy")) tmp.acc = tmp.acc.times(2);
	if (player.rank.gt(2)) tmp.acc = tmp.acc.times(rank2Eff());
	if (player.rank.gt(3)) tmp.acc = tmp.acc.times(2);
	if (player.tier.gt(1) && player.rank.gte(3)) tmp.acc = tmp.acc.times(2);
	if (player.rank.gt(4)) tmp.acc = tmp.acc.times(rank4Eff());
	if (player.rank.gt(5)) tmp.acc = tmp.acc.times(rank5Eff());
	if (player.rank.gt(10)) tmp.acc = tmp.acc.times(2);
	if (player.tier.gt(3)) tmp.acc = tmp.acc.times(3);
	if (player.rank.gt(14)) tmp.acc = tmp.acc.times(rank14Eff());
	if (player.rank.gt(15)) tmp.acc = tmp.acc.times(4);
	if (player.tier.gt(5)) tmp.acc = tmp.acc.times(5);
	if (player.rank.gt(25)) tmp.acc = tmp.acc.times(10);
	if (player.rank.gt(50)) tmp.acc = tmp.acc.times(15);
	if (player.tier.gt(8)) tmp.acc = tmp.acc.times(10);
	if (player.tier.gt(10)) tmp.acc = tmp.acc.times(15);
	if (player.rank.gt(75)) tmp.acc = tmp.acc.times(25);
	if (player.tier.gt(15)) tmp.acc = tmp.acc.times(25);
	if (tmp.ach) if (tmp.ach[12].has) tmp.acc = tmp.acc.times(1.1);
	if (tmp.ach) if (tmp.ach[22].has) tmp.acc = tmp.acc.times(1.05);
	if (tmp.ach) if (tmp.ach[23].has) tmp.acc = tmp.acc.times(1.2);
	if (tmp.ach) if (tmp.ach[14].has) tmp.acc = tmp.acc.times(1.5);
	if (tmp.ach) if (tmp.ach[32].has) tmp.acc = tmp.acc.times(1.8);
	if (tmp.ach) if (tmp.ach[35].has) tmp.acc = tmp.acc.times(1.8);
	if (tmp.ach) if (tmp.ach[105].has) tmp.acc = tmp.acc.times(4);
	if (tmp.ach) if (tmp.ach[24].has && modeActive("extreme")) tmp.acc = tmp.acc.times(ExpantaNum.pow(2, player.achievements.filter(x => x.toString().charAt(x.toString().length-1)==4).length));
	if (tmp.maxVel && tmp.inf) if (tmp.inf.upgs.has("6;6")) tmp.acc = tmp.acc.times(INF_UPGS.effects["6;6"]());
	if (tmp.inf && tmp.timeSpeed) if (tmp.inf.upgs.has("4;7")) tmp.acc = tmp.acc.times(INF_UPGS.effects["4;7"]());
	if (tmp.rockets) tmp.acc = tmp.acc.times(tmp.rockets.accPow);
	if (nerfActive("nerfAccel")) tmp.acc = tmp.acc.pow(0.1);
	if (tmp.inf && player.inf.derivatives.unl)
		tmp.acc = tmp.acc.times(
			(player.inf.derivatives.amts.acceleration
				? player.inf.derivatives.amts.acceleration
				: new ExpantaNum(0)
			).max(1)
		);
	if (modeActive("extreme") && tmp.acc.gte(Number.MAX_VALUE)) tmp.acc = tmp.acc.pow(0.75).times(ExpantaNum.pow(Number.MAX_VALUE, 0.25))
	if (modeActive("extreme") && tmp.acc.gte("1e10000")) tmp.acc = tmp.acc.sqrt().times(ExpantaNum.sqrt("1e10000"))
	if (extremeStadiumActive("nullum")) tmp.acc = ExpantaNum.pow(10, tmp.acc.log10().times(0.4-0.05*(extremeStadDiffLevel("nullum")-1)))
	if (modeActive("hikers_dream") && tmp.hd) tmp.acc = tmp.acc.pow(tmp.hd.inclineRed)
}

function calcMaxVelocity(){
	tmp.maxVel = new ExpantaNum(1);
	if (player.rank.gt(1)) tmp.maxVel = tmp.maxVel.plus(1);
	if (modeActive("hard")) tmp.maxVel = tmp.maxVel.div(2);
	if (modeActive("easy")) tmp.maxVel = tmp.maxVel.times(3);
	if (player.rank.gt(2)) tmp.maxVel = tmp.maxVel.times(rank2Eff());
	if (player.tier.gt(1) && player.rank.gte(3)) tmp.maxVel = tmp.maxVel.times(5);
	if (player.rank.gt(4)) tmp.maxVel = tmp.maxVel.times(rank4Eff());
	if (player.rank.gt(5)) tmp.maxVel = tmp.maxVel.times(rank5Eff());
	if (player.rank.gt(8)) tmp.maxVel = tmp.maxVel.times(rank8Eff());
	if (player.rank.gt(14)) tmp.maxVel = tmp.maxVel.times(rank14Eff());
	if (player.rank.gt(55)) tmp.maxVel = tmp.maxVel.times(rank55Eff());
	if (player.tier.gt(9)) tmp.maxVel = tmp.maxVel.times(tier9Eff());
	if (tmp.pathogens && player.pathogens.unl) tmp.maxVel = tmp.maxVel.times(tmp.pathogens[4].eff());
	if (tmp.ach) if (tmp.ach[21].has) tmp.maxVel = tmp.maxVel.times(1.1);
	if (tmp.ach) if (tmp.ach[14].has) tmp.maxVel = tmp.maxVel.times(1.5);
	if (tmp.ach) if (tmp.ach[24].has) tmp.maxVel = tmp.maxVel.times(1.25);
	if (tmp.ach) if (tmp.ach[41].has) tmp.maxVel = tmp.maxVel.times(1.5);
	if (tmp.ach) if (tmp.ach[51].has) tmp.maxVel = tmp.maxVel.times(1.5);
	if (tmp.ach) if (tmp.ach[61].has) tmp.maxVel = tmp.maxVel.times(1.6);
	if (tmp.inf && tmp.timeSpeed) if (tmp.inf.upgs.has("4;7")) tmp.maxVel = tmp.maxVel.times(INF_UPGS.effects["4;7"]());
	if (tmp.inf) if (tmp.inf.upgs.has("7;7")) tmp.maxVel = tmp.maxVel.times(INF_UPGS.effects["7;7"]()["ve"]);
	if (tmp.rockets) tmp.maxVel = tmp.maxVel.times(tmp.rockets.mvPow);
	if (nerfActive("nerfMaxVel")) tmp.maxVel = tmp.maxVel.pow(0.1);
	if (extremeStadiumActive("nullum", 2)) tmp.maxVel = ExpantaNum.pow(10, tmp.maxVel.log10().times(0.9-0.02*(extremeStadDiffLevel("nullum")-2)))
	if (modeActive("hikers_dream") && tmp.hd) tmp.maxVel = tmp.maxVel.pow(tmp.hd.inclineRed)
	if (mltActive(2)) tmp.maxVel = tmp.maxVel.root(1.3);
}

function calcAccelerationEnergy(){
	tmp.accEn = new ExpantaNum(0);
	if (tmp.inf) if (tmp.inf.upgs.has("7;7")) tmp.accEn = tmp.accEn.plus(1).times(INF_UPGS.effects["7;7"]()["ae"]);
	if (tmp.inf) if (tmp.inf.upgs.has("8;2")) tmp.accEn = tmp.accEn.times(INF_UPGS.effects["8;2"]()["energy"]);
	if (tmp.inf) if (tmp.inf.upgs.has("9;1")) tmp.accEn = tmp.accEn.times(INF_UPGS.effects["9;1"]());
	if (tmp.inf) if (tmp.inf.upgs.has("10;2")) tmp.accEn = tmp.accEn.times(INF_UPGS.effects["10;2"]());
	if (tmp.inf && tmp.rockets) if (tmp.inf.upgs.has("5;8")) tmp.accEn = tmp.accEn.times(tmp.rockets.accEnPow);
}

function updateTempEarlyGame() {
	calcAcceleration()
	calcMaxVelocity()
	calcAccelerationEnergy()
}
