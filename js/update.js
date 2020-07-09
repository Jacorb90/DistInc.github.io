function updateTemp() {
	updateTempOptions();
	updateTempNerfs();
	updateTempScaling();
	updateTempEffects();
	updateTempEarlyGame();
	updateTempRanks();
	updateTempTiers();
	updateTempRockets();
	updateTempSpecial();
	updateTempRF();
	updateTempAuto();
	updateLayerMults();
	updateTempTR();
	updateTempCollapse();
	updateTempPathogens();
	updateTempDC();
	updateTempInf();
	updateTempElementary();
	updateTempSC();
	updateTempMisc();
	updateTempTimeSpeed();

	if (tmp.modes.extreme.active) {
		updateTempRankCheap();
		updateTempFurnace();
	}
}

function setupHTML() {
	// Achievement Table
	let achTable = new Element("achTable");
	let table = "";
	for (let r = 1; r <= ACH_DATA.rows; r++) {
		table += "<tr>";
		for (let c = 1; c <= ACH_DATA.cols; c++) {
			let id = r * 10 + c;
			table += "<td id='ach" + id + "' class='achCont' onmouseover='tmp.ach[" + id + "].select()'>";
			table += "</td>";
		}
		table += "</tr>";
	}
	achTable.setHTML(table);

	// Time Reversal Upgrade Table
	let trTable = new Element("trTable");
	table = "";
	for (let r = 1; r <= Math.ceil(TR_UPG_AMT / 5); r++) {
		table += "<tr id='trRow" + r + "'>";
		for (let c = 1; c <= 5; c++) {
			let id = (r - 1) * 5 + c;
			table +=
				"<td><button id='tr" +
				id +
				"' class='btn locked' onclick='tmp.tr.upg[" +
				id +
				"]()' style='height: 140px;'></button></td>";
			table += "</td>";
		}
		table += "</tr>";
	}
	trTable.setHTML(table);

	// Collapse Milestone Upgrade Table
	let cmTable = new Element("cmTable");
	table = "";
	for (let r = 1; r <= Math.ceil(EM_AMT / 4); r++) {
		table += "<tr>";
		for (let c = 1; c <= 4; c++) {
			let id = (r - 1) * 4 + c;
			table += "<td id='lem" + id + "' class='msCont r'></td>";
		}
		table += "</tr>";
	}
	cmTable.setHTML(table);

	// Pathogen Upgrade Pyramid
	let pthUpgs = new Element("pthUpgs");
	let data = "";
	let pID = 0;
	for (let r = 1; r <= reverseTri(PTH_AMT); r++) {
		data += "<table><tr>";
		for (let c = 1; c <= r; c++) {
			pID++;
			data +=
				"<td><button id='pth" +
				pID +
				"' class='btn locked' onclick='tmp.pathogens[" +
				pID +
				"].buy()' style='height: 150px;'></button></td>";
		}
		data += "</tr></table>";
	}
	pthUpgs.setHTML(data);

	// Infinity Upgrade Table
	let infTable = new Element("infUpgs");
	table = "";
	for (let r = 1; r <= INF_UPGS.rows; r++) {
		table += "<tr>";
		for (let c = 1; c <= INF_UPGS.cols; c++) {
			let id = r + ";" + c;
			table +=
				"<td><button id='inf" +
				id +
				"' class='btn locked' onmouseover='tmp.inf.upgs.hover(&quot;" +
				id +
				"&quot;)' onclick='tmp.inf.upgs.buy(&quot;" +
				id +
				"&quot;)'>inf" +
				id +
				"</button></td>";
		}
		table += "</tr>";
	}
	infTable.setHTML(table);

	// Automators
	let au = new Element("automator");
	autos = "<br>";
	for (let i = 0; i < Object.keys(AUTOMATORS).length; i++) {
		let dp = capitalFirst(Object.keys(AUTOMATORS)[i].replace("_", " "));
		autos +=
			"<div id='automatorDiv-" +
			Object.keys(AUTOMATORS)[i] +
			"'>" +
			(dp.includes("auto") || dp.includes("Auto") ? dp : "Auto-" + dp) +
			": <input id='automator-" +
			Object.keys(AUTOMATORS)[i] +
			"' type='checkbox'></input></div><br>";
	}
	au.setHTML(autos);
	for (let i = 0; i < Object.keys(player.automators).length; i++) {
		let el = new Element("automator-" + Object.keys(player.automators)[i]);
		el.el.checked = Object.values(player.automators)[i];
	}

	// Derivatives
	let dv = new Element("derivs");
	data = "<br>";
	for (let i = 0; i < DERV.length; i++) {
		let name = DERV[i];
		let suffix = i == 0 ? "" : "/s" + (i == 1 ? "" : "<sup>" + i + "</sup>");
		data +=
			"<div id='dervDiv" +
			name +
			"' style='display: none;'><b>" +
			capitalFirst(name) +
			"</b>: <span id='derv" +
			name +
			"'></span>" +
			suffix +
			" <span id='dervgain" +
			name +
			"'></span>" +
			"</div><br>";
	}
	dv.setHTML(data);

	// Gluon Upgrades
	for (let i = 0; i < GLUON_COLOURS.length; i++) {
		let col = GLUON_COLOURS[i];
		let tbl = new Element(col + "_table");
		let data =
			"<tr><td><button id='" +
			col +
			"Upg1' class='btn locked' onclick='tmp.elm.bos.buy(&quot;" +
			col +
			"&quot;, 1)'>Double gain of the anti version of this colour.<br>Level: <span id='" +
			col +
			"Lvl1'></span><br>Currently: <span id='" +
			col +
			"Eff1'></span>x<br>Cost: <span id='" +
			col +
			"Cost1'></span> of these Gluons.</button></td>";
		data +=
			"<tr><td><button id='" +
			col +
			"Upg2' class='btn locked' onclick='tmp.elm.bos.buy(&quot;" +
			col +
			"&quot;, 2)'>Increase Quark & Lepton gain by " +
			showNum(10) +
			"%.<br>Level: <span id='" +
			col +
			"Lvl2'></span><br>Currently: <span id='" +
			col +
			"Eff2'></span>x<br>Cost: <span id='" +
			col +
			"Cost2'></span> of these Gluons.</button></td></tr>";
		tbl.setHTML(data);
	}
}

function updateBeforeTick() {
	updateTemp();
	updateHTML();
}

function updateAfterTick() {
	updateUnlocks();
	if (player.options.autoSave && saveTimer >= AUTOSAVE_TIME) {
		tmp.options.save();
		saveTimer = 0;
	}
	if (tmp.modes.absurd.active && !reloaded) {
		gameWindow.resizeTo(Math.random() * 400, Math.random() * 400);
		gameWindow.moveTo(Math.random() * 1000, Math.random() * 200);
		const bufhiesibvfib = document.body.querySelectorAll("*");
		for (const i in bufhiesibvfib)
			if (bufhiesibvfib[i].style !== undefined) {
				let t = `rotate(${Math.random() * 360}deg) `;
				t += "skew(" + Math.random() * 360 + "deg) ";
				t += "scale(" + (Math.random() * 3) ** 2 / 8 + ") ";
				bufhiesibvfib[i].style.transform = t;
			}
	}
	updateTabs();
	if (player.tab == "options") updateOptionsTabs();
	updateAchievements();
	updateNews();
}

function updateUnlocks() {
	if (player.distance.gte(ExpantaNum.mul(AUTO_UNL, tmp.auto.lrm))) player.automation.unl = true;
	if (player.distance.gte(DISTANCES.ly)) player.tr.unl = true;
	if (player.distance.gte(ExpantaNum.mul(COLLAPSE_UNL, tmp.collapse.lrm))) player.collapse.unl = true;
	if (player.collapse.cadavers.gte(ExpantaNum.mul(PATHOGENS_UNL, tmp.pathogens.lrm))) player.pathogens.unl = true;
	if (player.distance.gte(ExpantaNum.mul(DC_UNL, tmp.dc.lrm))) player.dc.unl = true;
	if (tmp.inf.can && !infActive && player.inf.endorsements.lt(10)) tmp.inf.forceReset();
	if (player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e90000"))) player.inf.derivatives.unl = true;
}
