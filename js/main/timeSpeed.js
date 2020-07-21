function updateTempTimeSpeed() {
	tmp.timeSpeed = new ExpantaNum(1);
	if (modeActive("hard")) tmp.timeSpeed = tmp.timeSpeed.times(0.75);
	if (modeActive("easy")) tmp.timeSpeed = tmp.timeSpeed.times(2.5);
	if (modeActive("extreme")) tmp.timeSpeed = tmp.timeSpeed.times(0.7);
	if (player.tr.upgrades.includes(2)) tmp.timeSpeed = tmp.timeSpeed.times(tr2Eff());
	if (player.tr.upgrades.includes(7)) tmp.timeSpeed = tmp.timeSpeed.times(tr7Eff());
	if (player.tr.upgrades.includes(18) && modeActive("extreme"))
		tmp.timeSpeed = tmp.timeSpeed.times(ExpantaNum.pow(2, player.rankCheap.sqrt()));
	if (player.tr.upgrades.includes(23) && modeActive("extreme"))
		tmp.timeSpeed = tmp.timeSpeed.times(ExpantaNum.pow(2.5, player.furnace.blueFlame));
	if (tmp.ach[17].has) tmp.timeSpeed = tmp.timeSpeed.times(1.01);
	if (tmp.ach[27].has) tmp.timeSpeed = tmp.timeSpeed.times(1.1);
	if (tmp.ach[47].has) tmp.timeSpeed = tmp.timeSpeed.times(1.5);
	if (tmp.ach[18].has) tmp.timeSpeed = tmp.timeSpeed.times(1.5);
	if (tmp.ach[52].has) tmp.timeSpeed = tmp.timeSpeed.times(1.2);
	if (tmp.ach[57].has) tmp.timeSpeed = tmp.timeSpeed.times(1.1);
	if (tmp.ach[67].has) tmp.timeSpeed = tmp.timeSpeed.times(1.111);
	if (player.rank.gt(35)) tmp.timeSpeed = tmp.timeSpeed.times(1.5);
	if (player.rank.gt(45)) tmp.timeSpeed = tmp.timeSpeed.times(1.8);
	if (player.rank.gt(70)) tmp.timeSpeed = tmp.timeSpeed.times(1.4);
	if (player.rank.gt(80)) tmp.timeSpeed = tmp.timeSpeed.times(1.5);
	if (player.rank.gt(90)) tmp.timeSpeed = tmp.timeSpeed.times(1.75);
	if (player.rank.gt(125)) tmp.timeSpeed = tmp.timeSpeed.times(1.5);
	if (player.rank.gt(150)) tmp.timeSpeed = tmp.timeSpeed.times(1.55);
	if (player.rank.gt(175)) tmp.timeSpeed = tmp.timeSpeed.times(1.6);
	if (player.rank.gt(200)) tmp.timeSpeed = tmp.timeSpeed.times(1.7);
	if (player.rank.gt(250)) tmp.timeSpeed = tmp.timeSpeed.times(1.8);
	if (player.rank.gt(300)) tmp.timeSpeed = tmp.timeSpeed.times(1.9);
	if (player.rank.gt(500)) tmp.timeSpeed = tmp.timeSpeed.times(1.95);
	if (player.rank.gt(1000)) tmp.timeSpeed = tmp.timeSpeed.times(1.98);
	if (player.rank.gt(10000)) tmp.timeSpeed = tmp.timeSpeed.times(2);
	if (player.tier.gt(6)) tmp.timeSpeed = tmp.timeSpeed.times(1.5);
	if (player.tier.gt(7)) tmp.timeSpeed = tmp.timeSpeed.times(tier7Eff());
	if (player.tier.gt(16)) tmp.timeSpeed = tmp.timeSpeed.times(1.6);
	if (player.tier.gt(18)) tmp.timeSpeed = tmp.timeSpeed.times(1.8);
	if (player.tier.gt(20)) tmp.timeSpeed = tmp.timeSpeed.times(2);
	tmp.timeSpeed = tmp.timeSpeed.times(tmp.collapse.eff);
	if (tmp.collapse.hasMilestone(1)) tmp.timeSpeed = tmp.timeSpeed.times(collapseMile1Eff());
	if (tmp.collapse.hasMilestone(2)) tmp.timeSpeed = tmp.timeSpeed.times(5);
	if (tmp.inf.upgs.has("1;1")) tmp.timeSpeed = tmp.timeSpeed.times(INF_UPGS.effects["1;1"]());
	if (tmp.inf.upgs.has("7;7")) tmp.timeSpeed = tmp.timeSpeed.times(INF_UPGS.effects["7;7"]()["ts"]);
	if (tmp.inf.upgs.has("9;4")) tmp.timeSpeed = tmp.timeSpeed.times(INF_UPGS.effects["9;4"]());
	if (tmp.inf.stadium.completed("eternity")) tmp.timeSpeed = tmp.timeSpeed.times(STADIUM_REWARDS.effects.eternity());
	if (nerfActive("nerfTS")) tmp.timeSpeed = tmp.timeSpeed.pow(0.1);
	if (player.tr.upgrades.includes(30) && modeActive("extreme"))
		tmp.timeSpeed = tmp.timeSpeed.pow(player.pathogens.amount.plus(1).log10().plus(1).times(10).slog(10).pow(1.7));
	if (tmp.rockets) tmp.timeSpeed = tmp.timeSpeed.times(tmp.rockets.tsPow)
	if (modeActive("extreme") && tmp.timeSpeed.gte(Number.MAX_VALUE)) tmp.timeSpeed = tmp.timeSpeed.sqrt().times(Math.sqrt(Number.MAX_VALUE))
}
