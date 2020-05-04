// Variables

var player = transformToEN(DEFAULT_START, DEFAULT_START)
var loaded = false
var interval;
var autoTimes = {}
for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) autoTimes[Object.keys(ROBOT_REQS)[i]] = new ExpantaNum(0);
var tmp = {}

// Game Loop

function gameLoop(diff) {
	updateTemp()
	updateHTML()
	if (tmp.collapse.hasMilestone(9)) player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff.div(100)))
	diff = diff.times(tmp.timeSpeed)
	if (player.tr.active) {
		player.tr.cubes = player.tr.cubes.plus(tmp.tr.cg.times(diff))
		diff = diff.times(-1)
	}
	player.velocity = player.velocity.plus(tmp.acc.times(diff)).min(tmp.maxVel).max(0)
	player.distance = player.distance.plus(player.velocity.times(diff)).max(0)
	if (player.distance.gte(AUTO_UNL)) player.automation.unl = true
	if (player.automation.unl) autoTick(diff)
	if (player.distance.gte(DISTANCES.ly)) player.tr.unl = true
	if (player.distance.gte(COLLAPSE_UNL)) player.collapse.unl = true
	updateTabs()
	updateAchievements()
}