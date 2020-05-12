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

// Game Loop

function gameLoop(diff) {
	updateTemp()
	updateHTML()
	if (tmp.collapse.hasMilestone(9)) player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff.div(100)))
	if (player.pathogens.unl) player.pathogens.amount = player.pathogens.amount.plus(tmp.pathogens.gain.times(diff))
	if (player.dc.unl) tmp.dc.tick(diff)
	diff = diff.times(tmp.timeSpeed)
	if (player.tr.active) {
		player.tr.cubes = player.tr.cubes.plus(tmp.tr.cg.times(diff))
		diff = diff.times(-1)
	} else if (tmp.ach[72].has) player.tr.cubes = player.tr.cubes.plus(tmp.tr.cg.times(diff.div(2)))
	player.velocity = player.velocity.plus(tmp.acc.times(diff)).min(tmp.maxVel).max(0)
	player.distance = player.distance.plus(player.velocity.times(diff)).max(0)
	if (player.distance.gte(ExpantaNum.mul(AUTO_UNL, tmp.auto.lrm))) player.automation.unl = true
	if (player.automation.unl) autoTick(diff)
	if (player.distance.gte(DISTANCES.ly)) player.tr.unl = true
	if (player.distance.gte(ExpantaNum.mul(COLLAPSE_UNL, tmp.collapse.lrm))) player.collapse.unl = true
	if (player.collapse.cadavers.gte(ExpantaNum.mul(PATHOGENS_UNL, tmp.pathogens.lrm))) player.pathogens.unl = true
	if (player.distance.gte(DC_UNL)) player.dc.unl = true
	if (tmp.modes.absurd.active && !reloaded) {
		gameWindow.resizeTo(Math.random()*400, Math.random()*400)
		gameWindow.moveTo(Math.random()*1000, Math.random()*200)
	}
	updateTabs()
	if (player.tab=="options") updateOptionsTabs()
	updateAchievements()
}