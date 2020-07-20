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
var thTab = "tv";
var autoRobotTarget = 0
var betaID = "";

// Game Loops

function tickWithoutTS(diff) {
	saveTimer += diff.toNumber();
	player.bestEnd = player.bestEnd.max(player.inf.endorsements)

	if (tmp.ach[95].has && !tmp.nerfs.active("noRockets"))
		player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff));
	else if (tmp.collapse.hasMilestone(9) && !tmp.nerfs.active("noRockets"))
		player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff.div(100)));

	if (tmp.ach[96].has && !tmp.nerfs.active("noCadavers"))
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain.times(diff));
	else if (tmp.inf.upgs.has("2;4") && !tmp.nerfs.active("noCadavers"))
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain.times(diff.div(100)));
	if (tmp.ach[97].has && !tmp.nerfs.active("noLifeEssence"))
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(
			player.collapse.cadavers.times(tmp.collapse.sacEff).max(1).times(diff)
		);
	else if (tmp.inf.upgs.has("5;3") && !tmp.nerfs.active("noLifeEssence"))
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(
			player.collapse.cadavers.times(tmp.collapse.sacEff).max(1).times(diff.div(10))
		);

	if (player.pathogens.unl)
		player.pathogens.amount = player.pathogens.amount.plus(
			tmp.nerfs.adjust(tmp.pathogens.gain, "pathogens").times(diff)
		);
	
	if (player.dc.unl) tmp.dc.tick(diff);
	if (player.inf.unl) infTick(diff);
	if (player.elementary.times.gt(0)) elTick(diff);
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
	autoTick(diff);
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
