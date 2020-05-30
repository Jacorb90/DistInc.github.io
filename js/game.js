// Variables

var player = transformToEN(DEFAULT_START, DEFAULT_START)
var loaded = false
var interval;
var autoTimes = {}
for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) autoTimes[Object.keys(ROBOT_REQS)[i]] = new ExpantaNum(0);
var tmp = {}
var last = getCurrentTime()
var modesSelected = []
var reloaded = false
var ddState = "none"
var notifier = new Notifier();
var saveTimer = 0
var showContainer = true
var infActive = false
var infTab = "infinity"

// Game Loops

function tickWithoutTS(diff) {
	saveTimer += diff.toNumber()
	if (tmp.ach[95].has && !tmp.nerfs.active("noRockets")) player.rockets = player.rockets.plus(tmp.nerfs.adjust(tmp.rockets.layer.gain, "rockets").times(diff))
	else if (tmp.collapse.hasMilestone(9) && !tmp.nerfs.active("noRockets")) player.rockets = player.rockets.plus(tmp.nerfs.adjust(tmp.rockets.layer.gain, "rockets").times(diff.div(100)))
	if (player.pathogens.unl) player.pathogens.amount = player.pathogens.amount.plus(tmp.nerfs.adjust(tmp.pathogens.gain, "pathogens").times(diff))
	if (player.dc.unl) tmp.dc.tick(diff)
	if (player.inf.unl) player.inf.knowledge = player.inf.knowledge.plus(tmp.nerfs.adjust(tmp.inf.knowledgeGain, "knowledge").times(diff))
	if (tmp.ach[97].has && !tmp.nerfs.active("noLifeEssence")) player.collapse.lifeEssence = player.collapse.lifeEssence.plus(tmp.nerfs.adjust(player.collapse.cadavers.times(tmp.collapse.sacEff), "lifeEssence").times(diff))
	else if (tmp.inf.upgs.has("5;3") && !tmp.nerfs.active("noLifeEssence")) player.collapse.lifeEssence = player.collapse.lifeEssence.plus(tmp.nerfs.adjust(player.collapse.cadavers.times(tmp.collapse.sacEff), "lifeEssence").times(diff.div(10)))
	if (tmp.ach[96].has && !tmp.nerfs.active("noCadavers")) player.collapse.cadavers = player.collapse.cadavers.plus(tmp.nerfs.adjust(tmp.collapse.layer.gain, "cadavers").times(diff))
	else if (tmp.inf.upgs.has("2;4") && !tmp.nerfs.active("noCadavers")) player.collapse.cadavers = player.collapse.cadavers.plus(tmp.nerfs.adjust(tmp.collapse.layer.gain, "cadavers").times(diff.div(100)))
	if (player.inf.endorsements.gte(10)) {
		for (let i=1;i<=4;i++) if (tmp.inf.asc.perkActive(i)) player.inf.ascension.time[i-1] = player.inf.ascension.time[i-1].sub(diff).max(0)
		if (tmp.inf.asc.anyPerkActive()) player.inf.ascension.power = player.inf.ascension.power.plus(tmp.nerfs.adjust(tmp.inf.asc.powerGain, "ascension").times(diff))
	}
}

function tickWithTR(diff) {
	player.velocity = player.velocity.plus(tmp.nerfs.adjust(tmp.acc, "vel").times(diff)).min(tmp.maxVel).max(0)
	player.distance = player.distance.plus(tmp.nerfs.adjust(player.velocity, "dist").times(diff)).max(0)
	if (player.automation.unl) autoTick(diff)
}

function tickWithTS(diff) {
	if (player.tr.active) player.tr.cubes = player.tr.cubes.plus(tmp.nerfs.adjust(tmp.tr.cg, "tc").times(diff))
	else if (tmp.ach[72].has && player.tr.unl) player.tr.cubes = player.tr.cubes.plus(tmp.nerfs.adjust(tmp.tr.cg, "tc").times(diff.div(2)))
	tickWithTR(diff.times(player.tr.active?(-1):1))
}

function gameLoop(diff) {
	updateBeforeTick()
	if (showContainer) {
		tickWithoutTS(diff)
		tickWithTS(diff.times(tmp.nerfs.active("noTS")?1:tmp.timeSpeed))
	}
	updateAfterTick()
}