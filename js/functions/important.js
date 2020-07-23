function loadGame() {
	let ls = localStorage.getItem("dist-inc" + betaID);
	loaded = true;
	if (!((ls || "x") == "x")) {
		let data = JSON.parse(atob(ls));
		player = transformToEN(data, DEFAULT_START);
		player.tab = DEFAULT_START.tab;
		player.optionsTab = DEFAULT_START.optionsTab;
	}
	let all = JSON.parse(
		atob(
			localStorage.getItem("dist-inc-saves" + betaID)
				? localStorage.getItem("dist-inc-saves" + betaID)
				: btoa(JSON.stringify([]))
		)
	);
	if (player.modes.includes("absurd"))
		if (!confirm("Are you sure you want to continue playing in Absurd Mode?")) {
			let s = transformToEN(DEFAULT_START);
			if (all.indexOf(null) > -1) s.savePos = all.indexOf(null) + 1;
			else s.savePos = all.length + 1;
			if (s.savePos > MAX_SAVES) s.savePos = MAX_SAVES;
			player = transformToEN(s)
			player.modes = []
			localStorage.setItem("dist-inc" + betaID, btoa(JSON.stringify(ENString(player))));
			if (
				(all.includes(null) || all[player.savePos - 1] === undefined || all[player.savePos - 1].savePos == player.savePos) &&
				all.length >= player.savePos
			)
				all[player.savePos - 1] = ENString(player);
			else all.push(ENString(player));
			localStorage.setItem("dist-inc-saves" + betaID, btoa(JSON.stringify(all)));
			reload();
		}
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
	let time = nerfOfflineProg(new ExpantaNum(getCurrentTime()).sub(player.time!==undefined?player.time:getCurrentTime()));
	if (time.isNaN()) time = new ExpantaNum(0) 
	player.time = getCurrentTime();
	gameLoop(time.div(1000));
}

function autoTick(diff) {
	// Normal Automation
	if (player.automation.unl) {
		player.automation.scraps = player.automation.scraps
			.plus(adjustGen(getScrapGain(), "scraps").times(diff))
			.max(0);
		player.automation.intelligence = player.automation.intelligence
			.plus(adjustGen(getIntelligenceGain(), "intel").times(diff))
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
	}

	// Automators
	if (player.automators["furnace"] && modeActive("extreme")) {
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
		let applRows = [...Array(INF_UPGS.rows).keys()].map(x => x+1).filter(r => (r>3?INF_UPGS.rowReqs[r]():true))
		let applCols = [...Array(INF_UPGS.cols).keys()].map(x => x+1).filter(c => (c>3?INF_UPGS.colReqs[c]():true))
		applRows.forEach(r => function() {
			applCols.forEach(c => function() {
				tmp.inf.upgs.buy(r+";"+c);
			}())
		}())
	}
	if (player.automators["endorsements"] && player.distance.gte(tmp.inf.req)) {
		if (tmp.elm.bos.hasHiggs("0;0;3") || tmp.ach[142].has) tmp.inf.maxEndorse(tmp.ach[142].has)
		else {
			if (tmp.ach[142].has) {
				if (player.distance.gte(tmp.inf.req)) player.inf.endorsements = player.inf.endorsements.plus(1)
			} else tmp.inf.manualReset(true) 
		}
	}
	if (player.automators["perks"]) for (let i=1;i<=4;i++) if (player.inf.ascension.time[i-1].eq(0)) tmp.inf.asc.activatePerk(i)
	if (player.automators["enlightenments"]) for (let i=1;i<=4;i++) tmp.inf.asc.maxEnl(i)
	if (player.automators["derivative_boosts"]) tmp.inf.derv.maxBoosts()
	if (player.automators["elementaries"]) {
		let mode = player.autoModes["elementaries"]
		let val = new ExpantaNum(player.autoTxt["elementaries"]||0)
		if (mode=="AMOUNT") {
			if (tmp.elm.layer.gain.gte(val)) elmReset()
		} else if (mode=="TIME") {
			if (player.elementary.time.gte(val)) elmReset()
		}
	}
	if (player.automators["spectral_gems"]) { // NEEDS to be last due to RETURNS
		if (player.inf.pantheon.gems.eq(0)) return
		let types = ["angels", "demons"]
		let taken = [player.inf.pantheon.angels, player.inf.pantheon.demons]
		if (taken[0].gt(taken[1])) tmp.inf.pantheon.transfer("demons", taken[0].sub(taken[1]).min(player.inf.pantheon.gems))
		else if (taken[1].gt(taken[0])) tmp.inf.pantheon.transfer("angels", taken[1].sub(taken[0]).min(player.inf.pantheon.gems))
		if (player.inf.pantheon.gems.gt(0)) {
			taken = [player.inf.pantheon.angels, player.inf.pantheon.demons]
			tmp.inf.pantheon.transfer("demons", player.inf.pantheon.gems.div(2).floor())
			tmp.inf.pantheon.transfer("angels", player.inf.pantheon.gems)
		}
	}
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

function checkNaN() {
	if (player.distance.isNaN()) {
		exportSave()
		alert("We have detected a NaN Error in your save! We have exported it to your clipboard (although it may be broken), and will hard reset the game to remove this bug as soon as possible. Please go to the discord (in the options menu) and tell someone about what happened, and hopefully your save can be salvaged. We apologize for this error.")
		hardReset(true)
	}
}