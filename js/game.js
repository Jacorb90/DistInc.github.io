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
	if (tmp.collapse.hasMilestone(9)) player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff.div(100)))
	if (player.pathogens.unl) player.pathogens.amount = player.pathogens.amount.plus(tmp.pathogens.gain.times(diff))
	if (player.dc.unl) tmp.dc.tick(diff)
	if (player.inf.unl) player.inf.knowledge = player.inf.knowledge.plus(tmp.inf.knowledgeGain.times(diff))
	if (tmp.inf.upgs.has("5;3")) player.collapse.lifeEssence = player.collapse.lifeEssence.plus(player.collapse.cadavers.times(tmp.collapse.sacEff).times(diff.div(10)))
	if (tmp.inf.upgs.has("2;4")) player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain.times(diff.div(100)))
}

function tickWithTR(diff) {
	player.velocity = player.velocity.plus(tmp.acc.times(diff)).min(tmp.maxVel).max(0)
	player.distance = player.distance.plus(player.velocity.times(diff)).max(0)
	if (player.automation.unl) autoTick(diff)
}

function tickWithTS(diff) {
	if (player.tr.active) player.tr.cubes = player.tr.cubes.plus(tmp.tr.cg.times(diff))
	else if (tmp.ach[72].has && player.tr.unl) player.tr.cubes = player.tr.cubes.plus(tmp.tr.cg.times(diff.div(2)))
	tickWithTR(diff.times(player.tr.active?(-1):1))
}

function gameLoop(diff) {
	updateBeforeTick()
	if (showContainer) {
		tickWithoutTS(diff)
		tickWithTS(diff.times(tmp.timeSpeed))
	}
	updateAfterTick()
}