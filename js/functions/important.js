function loadGame() {
	let ls = localStorage.getItem("dist-inc" + betaID);
	loaded = true;
	if (!((ls || "x") == "x")) {
		let data = JSON.parse(atob(ls));
		player = transformToEN(data, DEFAULT_START);
		player.tab = DEFAULT_START.tab;
		player.optionsTab = DEFAULT_START.optionsTab;
	}
	if (player.modes.includes("absurd"))
		if (!confirm("Are you sure you want to continue playing in Absurd Mode?")) {
			player.modes = [];
			player = transformToEN(DEFAULT_START, DEFAULT_START);
		}
	let all = JSON.parse(
		atob(
			localStorage.getItem("dist-inc-saves" + betaID)
				? localStorage.getItem("dist-inc-saves" + betaID)
				: btoa(JSON.stringify([]))
		)
	);
	let c = 1;
	for (let i = 0; i < all.length; i++)
		if (all[i] !== null) {
			if (all[i].saveID == player.saveID && i < MAX_SAVES) c = i + 1;
			if (i >= MAX_SAVES) all[i] = undefined;
		}
	localStorage.setItem("dist-inc-saves" + betaID, btoa(JSON.stringify(all)));
	player.savePos = c;
	modeLoad([]);
	setupHTML();
	interval = setInterval(function () {
		simulateTime();
	}, 50);
}

function simulateTime() {
	let time = nerfOfflineProg(new ExpantaNum(getCurrentTime()).sub(player.time || getCurrentTime()));
	player.time = getCurrentTime();
	gameLoop(time.div(1000));
}

function autoTick(diff) {
	// Normal Automation
	player.automation.scraps = player.automation.scraps
		.plus(tmp.nerfs.adjust(tmp.auto.scrapGain, "scraps").times(diff))
		.max(0);
	player.automation.intelligence = player.automation.intelligence
		.plus(tmp.nerfs.adjust(tmp.auto.intGain, "intel").times(diff))
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

	// Automators
	if (player.automators["furnace"] && tmp.modes.extreme.active) {
		for (let i = 1; i <= 3; i++) tmp.fn.upgs[i].max();
		player.furnace.blueFlame = player.furnace.blueFlame.max(tmp.fn.bfBulk.floor());
	}
	if (player.automators["pathogens"]) tmp.pathogens.maxAll();
	if (player.automators["cores"] && player.collapse.cadavers.gt(tmp.dc.coreCost)) tmp.dc.maxCores();
	if (player.automators["robots"]) {
		if (Object.keys(ROBOT_REQS)[autoRobotTarget]=="rankCheapbot") autoRobotTarget++
		let robot = tmp.auto[Object.keys(ROBOT_REQS)[autoRobotTarget]]
		if (!robot.unl && player.automation.scraps.gte(ROBOT_REQS[robot.name])) robot.btn()
		if (robot.unl) tmp.auto[Object.keys(ROBOT_REQS)[autoRobotTarget]].maxAll(true)
		autoRobotTarget = (autoRobotTarget+1)%Object.keys(ROBOT_REQS).length
	}
	if (player.automators["infinity_upgrades"]) {
		for (let r=1;r<=INF_UPGS.rows;r++) {
			if (r>3) if (!INF_UPGS.rowReqs[r]()) continue
			for (let c=1;c<=INF_UPGS.cols;c++) {
				if (c>3) if (!INF_UPGS.colReqs[c]()) continue
				let id=r+";"+c
				tmp.inf.upgs.buy(id)
			}
		}
	}
}

function showModeDescs(modes) {
	let d = "";
	if (modes.length > 1) {
		for (let i = 0; i < modes.length; i++) {
			let mode = MODES[modes[i]];
			d += mode.desc;
			if (i < modes.length - 1) d += "\n\n\n";
		}
	} else if (modes.length == 1) d = MODES[modes[0]].desc;
	else if (modes.length == 0) d = "Just the main game.";
	alert(d);
}

function modeLoad(resetted) {
	if (player.modes.some(x => Object.keys(MODE_VARS).includes(x))) {
		player.modes
			.filter(x => Object.keys(MODE_VARS).includes(x))
			.forEach(x =>
				(function () {
					let data = MODE_VARS[x];
					for (let i = 0; i < Object.keys(data).length; i++) {
						if (player[Object.keys(data)[i]] === undefined || resetted.includes(Object.keys(data)[i]))
							player[Object.keys(data)[i]] = deepCopy(Object.values(data)[i]);
					}
					player = MODE_EX[x](player);
				})()
			);
	}
}
