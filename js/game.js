// Variables

var player = transformToEN(DEFAULT_START, DEFAULT_START);
var loaded = false;
var interval;
var autoTimes = {};
for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++) autoTimes[Object.keys(ROBOT_REQS)[i]] = new ExpantaNum(0);
var tmp = {};
var last = getCurrentTime();
var modesSelected = [];
var reloaded = false;
var ddState = "none";
var notifier = new Notifier();
var saveTimer = 0;
var showContainer = true;
var reloadFail = false;
var infActive = false;
var infTab = "infinity";
var elmTab = "fermions";
var bosTab = "gauge";
var gluonTab = "r";
var autoRobotTarget = 0
var betaID = ""; //beta1.5

// Game Loops

function tickWithoutTS(diff) {
	saveTimer += diff.toNumber();
	player.bestEnd = player.bestEnd.max(player.inf.endorsements)
	if (tmp.ach[95].has && !tmp.nerfs.active("noRockets"))
		player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff));
	else if (tmp.collapse.hasMilestone(9) && !tmp.nerfs.active("noRockets"))
		player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff.div(100)));
	if (player.pathogens.unl)
		player.pathogens.amount = player.pathogens.amount.plus(
			tmp.nerfs.adjust(tmp.pathogens.gain, "pathogens").times(diff)
		);
	if (player.dc.unl) tmp.dc.tick(diff);
	if (tmp.ach[97].has && !tmp.nerfs.active("noLifeEssence"))
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(
			player.collapse.cadavers.times(tmp.collapse.sacEff).max(1).times(diff)
		);
	else if (tmp.inf.upgs.has("5;3") && !tmp.nerfs.active("noLifeEssence"))
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(
			player.collapse.cadavers.times(tmp.collapse.sacEff).max(1).times(diff.div(10))
		);
	if (player.inf.unl)
		player.inf.knowledge = player.inf.knowledge.plus(
			tmp.nerfs.adjust(tmp.inf.knowledgeGain, "knowledge").times(diff)
		);
	if (tmp.ach[96].has && !tmp.nerfs.active("noCadavers"))
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain.times(diff));
	else if (tmp.inf.upgs.has("2;4") && !tmp.nerfs.active("noCadavers"))
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain.times(diff.div(100)));
	if (player.inf.endorsements.gte(10)) {
		for (let i = 1; i <= 4; i++)
			if (tmp.inf.asc.perkActive(i))
				player.inf.ascension.time[i - 1] = player.inf.ascension.time[i - 1].sub(diff).max(0);
		if (tmp.inf.asc.anyPerkActive())
			player.inf.ascension.power = player.inf.ascension.power.plus(
				tmp.nerfs.adjust(tmp.inf.asc.powerGain, "ascension").times(diff)
			);
	}
	if (player.inf.endorsements.gte(21)) {
		tmp.inf.pantheon.collect();
		player.inf.pantheon.heavenlyChips = player.inf.pantheon.heavenlyChips.plus(
			diff.times(tmp.nerfs.adjust(tmp.inf.pantheon.chipGain, "heavenlyChips"))
		);
		player.inf.pantheon.demonicSouls = player.inf.pantheon.demonicSouls.plus(
			diff.times(tmp.nerfs.adjust(tmp.inf.pantheon.soulGain, "demonicSouls"))
		);
		if (tmp.inf.pantheon.totalGems.gte(2)) player.inf.pantheon.purge.unl = true;
	}
	if (player.elementary.times.gt(0)) {
		player.elementary.fermions.quarks.amount = new ExpantaNum(player.elementary.fermions.quarks.amount).plus(
			tmp.nerfs.adjust(tmp.elm.ferm.quarkGain, "quarks").times(diff)
		);
		player.elementary.fermions.leptons.amount = new ExpantaNum(player.elementary.fermions.leptons.amount).plus(
			tmp.nerfs.adjust(tmp.elm.ferm.leptonGain, "leptons").times(diff)
		);
		player.elementary.bosons.gauge.amount = new ExpantaNum(player.elementary.bosons.gauge.amount).plus(
			tmp.nerfs.adjust(tmp.elm.bos.gaugeGain, "gauge").times(diff)
		);
		player.elementary.bosons.gauge.force = new ExpantaNum(player.elementary.bosons.gauge.force).plus(
			tmp.nerfs.adjust(tmp.elm.bos.forceGain, "gauge").times(diff)
		);
		player.elementary.bosons.gauge.photons.amount = new ExpantaNum(
			player.elementary.bosons.gauge.photons.amount
		).plus(tmp.nerfs.adjust(tmp.elm.bos.photonGain, "gauge").times(diff));
		player.elementary.bosons.gauge.w = new ExpantaNum(player.elementary.bosons.gauge.w).plus(
			tmp.nerfs.adjust(tmp.elm.bos.wg, "gauge").times(diff)
		);
		player.elementary.bosons.gauge.z = new ExpantaNum(player.elementary.bosons.gauge.z).plus(
			tmp.nerfs.adjust(tmp.elm.bos.zg, "gauge").times(diff)
		);
		for (let i = 0; i < GLUON_COLOURS.length; i++)
			player.elementary.bosons.gauge.gluons[GLUON_COLOURS[i]].amount = new ExpantaNum(
				player.elementary.bosons.gauge.gluons[GLUON_COLOURS[i]].amount
			).plus(tmp.nerfs.adjust(tmp.elm.bos[GLUON_COLOURS[i] + "g"], "gauge").times(diff));
		player.elementary.bosons.gauge.gravitons = new ExpantaNum(player.elementary.bosons.gauge.gravitons).plus(
			tmp.nerfs.adjust(tmp.elm.bos.gravGain, "gauge").times(diff)
		);
		player.elementary.bosons.scalar.amount = new ExpantaNum(player.elementary.bosons.scalar.amount).plus(
			tmp.nerfs.adjust(tmp.elm.bos.scalarGain, "scalar").times(diff)
		);
		player.elementary.bosons.scalar.higgs.amount = new ExpantaNum(player.elementary.bosons.scalar.higgs.amount).plus(
			tmp.nerfs.adjust(tmp.elm.bos.higgsGain, "scalar").times(diff)
		);
	}
}

function tickWithTR(diff) {
	player.velocity = player.velocity
		.plus(tmp.nerfs.adjust(tmp.acc, "vel").times(diff))
		.min(tmp.nerfs.active("maxVelActive") ? tmp.maxVel : 1 / 0)
		.max(0);
	player.distance = player.distance.plus(tmp.nerfs.adjust(player.velocity, "dist").times(diff)).max(0);
	player.bestDistance = player.bestDistance.max(player.distance)
	player.bestV = player.bestV.max(player.velocity)
	player.bestA = player.bestA.max(tmp.acc)
	if (player.automation.unl) autoTick(diff);
	if (tmp.modes.extreme.active) {
		if (player.rf.gt(0)) {
			player.furnace.coal = player.furnace.coal.plus(tmp.nerfs.adjust(tmp.fn.gain, "fn").times(diff)).max(0);
		}
	}
}

function tickWithTS(diff) {
	if (player.tr.active && !tmp.nerfs.active("noTimeCubes"))
		player.tr.cubes = player.tr.cubes.plus(tmp.nerfs.adjust(tmp.tr.cg, "tc").times(diff));
	else if (tmp.ach[72].has && player.tr.unl && !tmp.nerfs.active("noTimeCubes"))
		player.tr.cubes = player.tr.cubes.plus(tmp.nerfs.adjust(tmp.tr.cg, "tc").times(diff.div(2)));
	if (player.inf.derivatives.unl) tmp.inf.derv.tick(diff);
	tickWithTR(diff.times(player.tr.active ? -1 : 1));
}

function gameLoop(diff) {
	updateBeforeTick();
	if (showContainer) {
		tickWithoutTS(diff);
		tickWithTS(diff.times(tmp.nerfs.active("noTS") ? 1 : tmp.timeSpeed));
	}
	updateAfterTick();
}
