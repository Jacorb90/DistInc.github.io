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
		tmp.auto.intMod = tmp.auto.intMod.times(5 / 6);
		tmp.auto.magMod = tmp.auto.magMod.times(5 / 6);
	}
	if (modeActive("easy")) {
		tmp.auto.intMod = tmp.auto.intMod.times(2);
		tmp.auto.magMod = tmp.auto.magMod.times(4 / 3);
	}

	// Robots

	if (!tmp.rd) tmp.rd = {};
	if (!tmp.rd.mp) tmp.rd.mp = {};
	for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++) tmp.rd.mp[Object.keys(ROBOT_REQS)[i]] = new ExpantaNum(1);
	if (player.tr.upgrades.includes(8)&&!HCCBA("noTRU")) tmp.rd.mp.rankbot = tmp.rd.mp.rankbot.times(tr8Eff());
	if (player.tr.upgrades.includes(9)&&!HCCBA("noTRU")) tmp.rd.mp.tierbot = tmp.rd.mp.tierbot.times(tr9Eff());
	if (player.tr.upgrades.includes(19) && modeActive("extreme") && !HCCBA("noTRU"))
		tmp.rd.mp.rankCheapbot = tmp.rd.mp.rankCheapbot.times(tr19Eff());
}

function getScrapGain() {
	let gain = player.distance.plus(1).pow(2).times(player.velocity.plus(1)).log10().div(100);
	if (player.rank.gt(60)) gain = gain.times(2);
	if (tmp.ach[36].has) gain = gain.times(1.5);
	if (!HCCBA("noTRU") && player.tr.upgrades.includes(6)) gain = gain.times(tr6Eff());
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
	if (player.tr.upgrades.includes(6) && !HCCBA("noTRU")) gain = gain.times(tr6Eff());
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

function normalAutoTick(diff){
	if (player.automation.unl) {
		player.automation.scraps = player.automation.scraps
			.plus(adjustGen(getScrapGain(), "scraps").times(diff))
			.max(0);
		player.automation.intelligence = player.automation.intelligence
			.plus(adjustGen(getIntelligenceGain(), "intel").times(diff))
			.max(0);
		for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++) {
			let name = Object.keys(ROBOT_REQS)[i];
			if (tmp.auto[name].unl) {
				autoTimes[name] = autoTimes[name].plus(diff).max(0);
				if (autoTimes[name].gte(tmp.auto[name].interval)) {
					autoTimes[name] = new ExpantaNum(0);
					tmp.auto[name].act();
				}
			}
		}
	}
}

function furnaceAutoTick(){
	if (player.automators["furnace"] && modeActive("extreme")) {
		let cap = (FCComp(5)?5:(player.tr.upgrades.includes(31)?4:3))
		for (let i = 1; i <= cap; i++) tmp.fn.upgs[i].max();
		if (player.furnace.coal.gte(tmp.fn.bfReq)) player.furnace.blueFlame = player.furnace.blueFlame.max(tmp.fn.bfBulk.floor());
		for (let i=1;i<=13;i++) tmp.fn.enh.upgs[i].max();
	}
}

function pathogenAutoTick(){
	if (player.automators["pathogens"]) tmp.pathogens.maxAll();
}

function darkCoreAutoTick(){
	if (player.automators["cores"] && player.collapse.cadavers.gt(tmp.dc.coreCost)) tmp.dc.maxCores();
}

function robotAutoTick(){
	if (player.automators["robots"]) {
		if (!modeActive("extreme")) if (Object.keys(ROBOT_REQS)[autoRobotTarget]=="rankCheapbot") autoRobotTarget++
		let robot = tmp.auto[Object.keys(ROBOT_REQS)[autoRobotTarget]]
		if (!robot.unl && player.automation.scraps.gte(ROBOT_REQS[robot.name])) robot.btn()
		if (robot.unl) tmp.auto[Object.keys(ROBOT_REQS)[autoRobotTarget]].maxAll(true)
		autoRobotTarget = (autoRobotTarget+1)%Object.keys(ROBOT_REQS).length
	}
}

function infUpgAutoTick(){
	if (player.automators["infinity_upgrades"]) {
		let applRows = [...Array(INF_UPGS.rows).keys()].map(x => x+1).filter(r => (r>3?INF_UPGS.rowReqs[r]():true))
		let applCols = [...Array(INF_UPGS.cols).keys()].map(x => x+1).filter(c => (c>3?INF_UPGS.colReqs[c]():true))
		applRows.forEach(r => function() {
			applCols.forEach(c => function() {
				tmp.inf.upgs.buy(r+";"+c);
			}())
		}())
	}
}

function endorseAutoTick(){
	if (player.automators["endorsements"] && player.distance.gte(tmp.inf.req)) {
		if (tmp.elm.bos.hasHiggs("0;0;3") || tmp.ach[142].has) tmp.inf.maxEndorse(tmp.ach[142].has)
		else {
			if (tmp.ach[142].has) {
				if (player.distance.gte(tmp.inf.req)) player.inf.endorsements = player.inf.endorsements.plus(1)
			} else tmp.inf.manualReset(true) 
		}
	}
}

function perksAutoTick(){
	if (player.automators["perks"]) for (let i=1;i<=4;i++) if (player.inf.ascension.time[i-1].eq(0)) tmp.inf.asc.activatePerk(i)
}

function enlightenmentAutoTick(){
	if (player.automators["enlightenments"]) for (let i=1;i<=4;i++) tmp.inf.asc.maxEnl(i)
}

function derivAutoTick(){
	if (player.automators["derivative_boosts"]) tmp.inf.derv.maxBoosts()
}

function elemenAutoTick(){
	if (player.automators["elementaries"]) {
		let mode = player.autoModes["elementaries"]
		let val = new ExpantaNum(player.autoTxt["elementaries"]||0)
		if (mode=="AMOUNT") {
			if (tmp.elm.layer.gain.gte(val)) elmReset(false, true)
		} else if (mode=="TIME") {
			if (player.elementary.time.gte(val)) elmReset(false, true)
		}
	}
}

function spectralGemAutoTick(){
	if (player.automators["spectral_gems"]) {
		if (!player.inf.pantheon.gems.eq(0)) {
			let types = ["angels", "demons"]
			let taken = [player.inf.pantheon.angels, player.inf.pantheon.demons]
			if (taken[0].gt(taken[1])) tmp.inf.pantheon.transfer("demons", taken[0].sub(taken[1]).min(player.inf.pantheon.gems))
			else if (taken[1].gt(taken[0])) tmp.inf.pantheon.transfer("angels", taken[1].sub(taken[0]).min(player.inf.pantheon.gems))
			if (player.inf.pantheon.gems.gt(0)) {
				taken = [player.inf.pantheon.angels, player.inf.pantheon.demons]
				tmp.inf.pantheon.transfer("demons", player.inf.pantheon.gems.div(2).floor())
				tmp.inf.pantheon.transfer("angels", player.inf.pantheon.gems)
			}
		}
	}
}

function photonsAutoTick(){
	if (player.automators["photon_upgrades"]) for (let i=1;i<=4;i++) {
		tmp.elm.bos.buyLU(i, true)
		tmp.elm.bos.buyLU(i)
	}
}

function gluonAutoTick(){
	if (player.automators["gluon_upgrades"]) for (let i = 0; i < GLUON_COLOURS.length; i++) {
		let col = GLUON_COLOURS[i];
		for (let x=1;x<=2;x++) tmp.elm.bos.buy(col, x, true)
		if (hasDE(1)) buyGluon3(col, true)
	}
}

function theoryTreeAutoTick(){
	if (player.automators["tree_upgrades"]) {
		if (player.elementary.theory.tree.unl) {
			tmp.elm.theory.tree.buy(ttaid, true)
			tmp.elm.theory.tree.buy(ttaid)
			ttaid = (ttaid%(Object.keys(TREE_UPGS).length))+1
		}
	}
}

function theoryBoosterAutoTick() {
	if (player.automators["theoretical_boosters"] && player.elementary.entropy.upgrades.includes(17)) theoryBoost(true)
}

function entropyAutoTick(){
	if (player.automators["entropy"] && player.elementary.entropy.unl) {
		player.elementary.entropy.amount = player.elementary.entropy.amount.plus(tmp.elm.entropy.gain)
		player.elementary.entropy.best = player.elementary.entropy.best.max(player.elementary.entropy.amount)
	}
}

function entropyUpgAutoTick(){
	if (player.automators["entropy_upgrades"] && player.elementary.entropy.unl) {
		let toBuy = Array.from({length: ENTROPY_UPGS}, (v, i) => i+1).filter(x => !player.elementary.entropy.upgrades.includes(x)&&entropyUpgShown(x));
		if (toBuy.length==0) return;
		let nextUpg = toBuy.reduce((a,c) => ENTROPY_UPG_AUTO_ORDER[Math.min(ENTROPY_UPG_AUTO_ORDER.indexOf(a),ENTROPY_UPG_AUTO_ORDER.indexOf(c))]);
		buyEntropyUpg(nextUpg)
	}
}

function energyAutoTick(){
	if (!modeActive("hikers_dream")) return
	if (tmp.ach) if (tmp.ach[141].has) {
		buyGen()
		newGen()
	}
}

function autoTick(diff) {
	normalAutoTick(diff)
	furnaceAutoTick()
	pathogenAutoTick()
	darkCoreAutoTick()
	robotAutoTick()
	infUpgAutoTick()
	endorseAutoTick()
	perksAutoTick()
	enlightenmentAutoTick()
	derivAutoTick()
	elemenAutoTick()
	spectralGemAutoTick()
	photonsAutoTick()
	gluonAutoTick()
	theoryTreeAutoTick()
	theoryBoosterAutoTick()
	entropyAutoTick()
	entropyUpgAutoTick()
	 energyAutoTick()
}

function autoPerSec() {
	if (player.automators["foam_unlocks"]) {
		if (player.elementary.foam.maxDepth.lt(5)) qfUnl(player.elementary.foam.maxDepth.toNumber())
		else refoam();
	}
}

function toggleRobot(name) {
	player.automation.robots[name][2] = !player.automation.robots[name][2]
}