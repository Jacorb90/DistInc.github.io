function loadGame() {
	let ls = localStorage.getItem("dist-inc")
	loaded = true
	if (!((ls||"x")=="x")) {
		let data = JSON.parse(atob(ls))
		player = transformToEN(data, DEFAULT_START)
		player.tab = DEFAULT_START.tab
		player.optionsTab = DEFAULT_START.optionsTab
	}
	if (player.modes.includes("absurd")) if (!confirm("Are you sure you want to continue playing in Absurd Mode?")) {
		player.modes = []
		player = transformToEN(DEFAULT_START, DEFAULT_START)
	}
	setupHTML()
	interval = setInterval(function() {
		simulateTime()
	}, 33)
}

function simulateTime() {
	player.time = getCurrentTime()
	let time = new ExpantaNum(player.time).sub(last).max(1000*1/33)
	gameLoop(time.div(1000))
	last = getCurrentTime()
}

function autoTick(diff) {
	// Normal Automation
	player.automation.scraps = player.automation.scraps.plus(tmp.nerfs.adjust(tmp.auto.scrapGain, "scraps").times(diff)).max(0)
	player.automation.intelligence = player.automation.intelligence.plus(tmp.nerfs.adjust(tmp.auto.intGain, "intel").times(diff)).max(0)
	for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) {
		let name = Object.keys(ROBOT_REQS)[i]
		if (tmp.auto[name].unl) {
			autoTimes[name] = autoTimes[name].plus(diff).max(0)
			if (autoTimes[name].gte(tmp.auto[name].interval)) {
				autoTimes[name] = new ExpantaNum(0)
				tmp.auto[name].act()
			}
		}
	}
	
	// Automators
	if (player.automators["pathogens"]) tmp.pathogens.maxAll()
	if (player.automators["cores"]) tmp.dc.maxCores()
}

function showModeDescs(modes) {
	let d = ""
	if (modes.length>1) {
		for (let i=0;i<modes.length;i++) {
			let mode = MODES[modes[i]]
			d += mode.desc
			if (i<modes.length-1) d += "\n\n\n"
		}
	} else if (modes.length==1) d = MODES[modes[0]].desc
	else if (modes.length==0) d = "Just the main game."
	alert(d)
}