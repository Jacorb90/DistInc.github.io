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
	player.velocity = player.velocity.plus(tmp.acc.times(diff)).min(tmp.maxVel)
	player.distance = player.distance.plus(player.velocity.times(diff))
	if (player.distance.gte(AUTO_UNL)) player.automation.unl = true
	if (player.automation.unl) autoTick(diff)
	updateTabs()
	updateAchievements()
}