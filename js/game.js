// Variables

var player = transformToEN(DEFAULT_START, DEFAULT_START)
var loaded = false
var interval;
var autoTimes = {rankbot: new ExpantaNum(0), tierbot: new ExpantaNum(0)}
var tmp = {}

// Achievements

function updateAchievements() {
	if (player.distance.gte(100)) tmp.ach[11].grant()
	if (player.rank.gt(1)) tmp.ach[12].grant()
	if (player.tier.gte(1)) tmp.ach[13].grant()
	if (player.rockets.gt(0)) tmp.ach[14].grant()
	if (player.rf.gt(0)) tmp.ach[15].grant()
	if (player.automation.unl) tmp.ach[16].grant()
	
	if (player.distance.gte(5e5)) tmp.ach[21].grant()
	if (player.rank.gte(8)) tmp.ach[22].grant()
	if (player.tier.gte(3)) tmp.ach[23].grant()
	if (player.rockets.gte(2)) tmp.ach[24].grant()
	if (player.rf.gte(2)) tmp.ach[25].grant()
	if (Object.keys(player.automation.robots).includes("rankbot")) tmp.ach[26].grant()
		
	if (player.distance.gte(1e12)) tmp.ach[31].grant()
	if (player.rank.gte(12)) tmp.ach[32].grant()
	if (player.tier.gte(4)) tmp.ach[33].grant()
	if (player.rockets.gte(10)) tmp.ach[34].grant()
	if (player.rf.gte(3)) tmp.ach[35].grant()
	if (Object.keys(player.automation.robots).includes("tierbot")) tmp.ach[36].grant()
}

// Saving/Loading

function save() { localStorage.setItem("dist-inc", btoa(JSON.stringify(ENString(player)))) }

function load() {
	let ls = localStorage.getItem("dist-inc")
	loaded = true
	if (!((ls||"x")=="x")) {
		let data = JSON.parse(atob(ls))
		player = transformToEN(data, DEFAULT_START)
	}
	interval = setInterval(function() {
		gameLoop(new ExpantaNum(1/33))
	}, 33)
}

// Game Loop

function gameLoop(diff) {
	updateTemp()
	updateElements()
	player.velocity = player.velocity.plus(tmp.acc.times(diff)).min(tmp.maxVel)
	player.distance = player.distance.plus(player.velocity.times(diff))
	if (player.distance.gte(AUTO_UNL)) player.automation.unl = true
	if (player.automation.unl) {
		player.automation.scraps = player.automation.scraps.plus(tmp.auto.scrapGain.times(diff))
		player.automation.intelligence = player.automation.intelligence.plus(tmp.auto.intGain.times(diff))
		for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) {
			let name = Object.keys(ROBOT_REQS)[i]
			if (tmp.auto[name].unl) {
				autoTimes[name] = autoTimes[name].plus(diff)
				if (autoTimes[name].gte(tmp.auto[name].interval)) {
					autoTimes[name] = new ExpantaNum(0)
					tmp.auto[name].act()
				}
			}
		}
	}
	updateTabs()
	updateAchievements()
}