function updateTempAuto() {
	// Automation

	tmp.auto = {};
	tmp.auto.lrm = new ExpantaNum(1);
	if (tmp.modes.hard.active) tmp.auto.lrm = tmp.auto.lrm.times(10);
	tmp.auto.scrapGain = player.distance.plus(1).pow(2).times(player.velocity.plus(1)).log10().div(100);
	if (tmp.modes.hard.active) tmp.auto.scrapGain = tmp.auto.scrapGain.div(2);
	if (player.rank.gt(60)) tmp.auto.scrapGain = tmp.auto.scrapGain.times(2);
	if (tmp.ach[36].has) tmp.auto.scrapGain = tmp.auto.scrapGain.times(1.5);
	if (player.tr.upgrades.includes(6)) tmp.auto.scrapGain = tmp.auto.scrapGain.times(tmp.tr6);
	tmp.auto.intGain = player.rank.plus(1).pow(2).times(player.tier.plus(1)).cbrt().div(1000);
	if (tmp.modes.hard.active) tmp.auto.intGain = tmp.auto.intGain.div(2);
	if (player.rank.gt(20)) tmp.auto.intGain = tmp.auto.intGain.times(2);
	if (player.rank.gt(30)) tmp.auto.intGain = tmp.auto.intGain.times(3);
	if (player.tier.gt(4)) tmp.auto.intGain = tmp.auto.intGain.times(2);
	if (player.tier.gt(12)) tmp.auto.intGain = tmp.auto.intGain.times(3);
	if (player.tier.gt(13)) tmp.auto.intGain = tmp.auto.intGain.times(4);
	if (tmp.ach[36].has) tmp.auto.intGain = tmp.auto.intGain.times(1.5);
	if (tmp.ach[46].has) tmp.auto.intGain = tmp.auto.intGain.times(2);
	if (player.rank.gt(111)) tmp.auto.intGain = tmp.auto.intGain.times(tmp.r111);
	if (player.rank.gt(40)) tmp.auto.intGain = tmp.auto.intGain.times(tmp.r40);
	if (player.tr.upgrades.includes(6)) tmp.auto.intGain = tmp.auto.intGain.times(tmp.tr6);
	for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++)
		tmp.auto[Object.keys(ROBOT_REQS)[i]] = new Robot(
			Object.keys(ROBOT_REQS)[i],
			ROBOT_FL[Object.keys(ROBOT_REQS)[i]]
		);
	tmp.auto.intMod = new ExpantaNum(1);
	tmp.auto.magMod = new ExpantaNum(1);
	if (tmp.modes.hard.active) {
		tmp.auto.intMod = tmp.auto.intMod.times(2 / 3);
		tmp.auto.magMod = tmp.auto.magMod.times(2 / 3);
	}

	// Robots

	tmp.rd = {};
	tmp.rd.mp = {};
	for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++) tmp.rd.mp[Object.keys(ROBOT_REQS)[i]] = new ExpantaNum(1);
	if (player.tr.upgrades.includes(8)) tmp.rd.mp.rankbot = tmp.rd.mp.rankbot.times(tmp.tr8);
	if (player.tr.upgrades.includes(9)) tmp.rd.mp.tierbot = tmp.rd.mp.tierbot.times(tmp.tr9);
}
