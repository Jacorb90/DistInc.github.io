function updateTempAuto() {
	// Automation

	if (!tmp.auto) tmp.auto = {};
	tmp.auto.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.auto.lrm = tmp.auto.lrm.times(10);
	
	for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++)
		tmp.auto[Object.keys(ROBOT_REQS)[i]] = new Robot(
			Object.keys(ROBOT_REQS)[i],
			ROBOT_FL[Object.keys(ROBOT_REQS)[i]]
		);
	tmp.auto.intMod = new ExpantaNum(1);
	tmp.auto.magMod = new ExpantaNum(1);
	if (modeActive("hard")) {
		tmp.auto.intMod = tmp.auto.intMod.times(2 / 3);
		tmp.auto.magMod = tmp.auto.magMod.times(2 / 3);
	}
	if (modeActive("easy")) {
		tmp.auto.intMod = tmp.auto.intMod.times(2);
		tmp.auto.magMod = tmp.auto.magMod.times(4 / 3);
	}

	// Robots

	if (!tmp.rd) tmp.rd = {};
	if (!tmp.rd.mp) tmp.rd.mp = {};
	for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++) tmp.rd.mp[Object.keys(ROBOT_REQS)[i]] = new ExpantaNum(1);
	if (player.tr.upgrades.includes(8)) tmp.rd.mp.rankbot = tmp.rd.mp.rankbot.times(tr8Eff());
	if (player.tr.upgrades.includes(9)) tmp.rd.mp.tierbot = tmp.rd.mp.tierbot.times(tr9Eff());
	if (player.tr.upgrades.includes(19) && modeActive("extreme"))
		tmp.rd.mp.rankCheapbot = tmp.rd.mp.rankCheapbot.times(tr19Eff());
}

function getScrapGain() {
	let gain = player.distance.plus(1).pow(2).times(player.velocity.plus(1)).log10().div(100);
	if (player.rank.gt(60)) gain = gain.times(2);
	if (tmp.ach[36].has) gain = gain.times(1.5);
	if (player.tr.upgrades.includes(6)) gain = gain.times(tr6Eff());
	if (modeActive("hard")) gain = gain.div(2)
	if (modeActive("easy")) gain = gain.times(3)
	return gain
}

function getIntelligenceGain() {
	let gain = player.rank.plus(1).pow(2).times(player.tier.plus(1)).cbrt().div(1000);
	if (player.rank.gt(20)) gain = gain.times(2);
	if (player.rank.gt(30)) gain = gain.times(3);
	if (player.tier.gt(4)) gain = gain.times(2);
	if (player.tier.gt(12)) gain = gain.times(3);
	if (player.tier.gt(13)) gain = gain.times(4);
	if (tmp.ach[36].has) gain = gain.times(1.5);
	if (tmp.ach[46].has) gain = gain.times(2);
	if (player.rank.gt(111)) gain = gain.times(rank111Eff());
	if (player.rank.gt(40)) gain = gain.times(rank40Eff());
	if (player.tr.upgrades.includes(6)) gain = gain.times(tr6Eff());
	if (modeActive("hard")) gain = gain.div(2)
	if (modeActive("easy")) gain = gain.times(1.6)
	return gain
}

function toggleAutoMode(name) {
	player.autoModes[name] = AUTOMATOR_MODES[name][(AUTOMATOR_MODES[name].indexOf(player.autoModes[name])+1)%AUTOMATOR_MODES[name].length]
	let btn = new Element("autoMode"+name)
	btn.setTxt(player.autoModes[name])
}

function updateAutoTxt(name) {
	let inp = document.getElementById("autoTxt"+name).value
	try {
		player.autoTxt[name] = new ExpantaNum(inp)
	} catch(e) {
		return
	}
}