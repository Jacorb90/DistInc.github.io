function saveOptions() {
	localStorage.setItem("dist-inc-options" + betaID, btoa(JSON.stringify(player.options)));
}

function loadOptions() {
	let optData = localStorage.getItem("dist-inc-options" + betaID)
	if (!optData) return;
	let name = player.options.name;
	player.options = JSON.parse(atob(optData));
	player.options.name = name;
}

function getAllSaves() {
	let local = localStorage.getItem("dist-inc-saves" + betaID)
	let all = JSON.parse(atob(local ? local : btoa(JSON.stringify([]))));
	return all
}

function save(sav=player, force=false) {
	if (!showContainer && !force) return;
	localStorage.setItem("dist-inc" + betaID, btoa(JSON.stringify(ENString(sav))));
	let all = getAllSaves();
	if ((all.includes(null) || all[sav.savePos - 1] === undefined || all[sav.savePos - 1].savePos == sav.savePos) && all.length >= sav.savePos) {
		all[sav.savePos - 1] = ENString(sav);
	} else all.push(ENString(sav));
	localStorage.setItem("dist-inc-saves" + betaID, btoa(JSON.stringify(all)));
	if (document.hasFocus()) notifier.success("Game saved!");
}

function setSave(ns, cod=false) {
	saveTimer = 0 // safety thing ;)
	save(cod ? transformToEN(JSON.parse(atob(ns))) : transformToEN(ns));
	reload();
}

function deleteSave(loc) {
	if (!confirm("Are you sure you want to delete this save? You will not be able to undo this!")) return;
	let all = getAllSaves();
	let isCurrent = all[loc].saveID == player.saveID;
	all[loc] = null;
	localStorage.setItem("dist-inc-saves" + betaID, btoa(JSON.stringify(all)));
	if (isCurrent) startModes([]);
	else {
		loads();
		save();
	}
}

function hardReset(force=false) {
	if (!force)
		if (!confirm("Are you sure you want to reset? You will lose all of your progress if you do this!!!"))
			return;
	let s = transformToEN(DEFAULT_START, DEFAULT_START)
	let all = getAllSaves();
	if (player.options.saveImp=="overwrite" || s.saveID==player.saveID) s.savePos = deepCopy(player.savePos)
	else {
		if (all.indexOf(null) > -1) s.savePos = all.indexOf(null) + 1;
		else s.savePos = all.length + 1;
		if (s.savePos > MAX_SAVES) s.savePos = MAX_SAVES;
	}
	setSave(s);
}

function importSave() {
	let prmpt = prompt("Paste your save here.");
	let sav;
	if (prmpt) {
		try {
			sav = JSON.parse(atob(prmpt));
			notifier.info("Save imported");
			let s = transformToEN(sav);
			let all = getAllSaves();
			if (player.options.saveImp=="overwrite" || s.saveID==player.saveID) s.savePos = deepCopy(player.savePos)
			else {
				if (all.indexOf(null) > -1) s.savePos = all.indexOf(null) + 1;
				else s.savePos = all.length + 1;
				if (s.savePos > MAX_SAVES) s.savePos = MAX_SAVES;
			}
			setSave(s);
		} catch (e) {
			notifier.error("Invalid Save");
		}
	}
}

function exportSave() {
	let toExport = btoa(JSON.stringify(ENString(player)));
	notifier.info("Save exported");
	copyToClipboard(toExport);
}

function startModes(modes) {
	let s = transformToEN(DEFAULT_START);
	s.modes = modes;
	if (s.modes.includes("aau")) s.achievements = getAllAchievements();
	let all = getAllSaves();
	if (all.indexOf(null) > -1 && all[all.indexOf(null)] === null) s.savePos = all.indexOf(null) + 1;
	else s.savePos = all.length + 1;
	if (s.savePos > MAX_SAVES) {
		alert("You have too many saves! You need to delete one in order to make a new one!");
		return;
	}
	save(s);
	reload();
}

function setDropdown(dropdown, els, load=false) {
	let html = "";
	for (let i = 0; i < Object.keys(els).length; i++) {
		let el = els[Object.keys(els)[i]];
		html += "<br>";
		if (load) {
			html += "<b>" + el.name + "</b><br>";
			html += el.info + "<br>";
			for (let x = 1; x <= el.buttons; x++)
				html +=
					"<button class='btn tb opt"+"' onclick='" +
					el["onclick" + x] +
					"' "+">" +
					el["txt" + x] +
					"</button> ";
		} else html += "<button class='btn tb opt tt' onclick='" + el.onclick + "'>" + el.txt + "</button>";
		if (load) html += "<br><br>";
	}
	dropdown.setHTML(html + "<br><button class='btn tb opt' style='visibility: hidden;'></button>");
}

function changeOpt(name, type) {
	let dropdown = new Element("dropDown");
	if (type != 3 && type != 0)
		dropdown.changeStyle(
			"display",
			dropdown.style.display != "none" && name == ddState ? "none" : "inline-block"
		);
	else dropdown.changeStyle("display", "none");
	let els = {};
	if (type == 0) player.options[name] = !player.options[name]
	else if (type == 1) {
		let max = OPT_CHNG_MAX[name];
		let min = OPT_CHNG_MIN[name];
		for (x = min; x <= max; x++)
			els[x] = {
				txt: x.toString(),
				onclick:
					"player.options[&quot;" +
					name +
					"&quot;] = " +
					x +
					"; this.parentElement.style.display=&quot;none&quot;; saveOptions();"
			};
	} else if (type == 2) {
		let types = OPT_NAMES[name];
		for (x = 0; x < types.length; x++)
			els[types[x]] = {
				txt: capitalFirst(types[x]),
				onclick:
					"player.options[&quot;" +
					name +
					"&quot;] = &quot;" +
					types[x] +
					"&quot;; this.parentElement.style.display=&quot;none&quot;; saveOptions();"
			};
	} else if (type == 3) {
		let old = deepCopy(player.options[name])
		player.options[name] = window.prompt("Change the " + name + ".", player.options[name]);
		if (player.options[name]===null || player.options[name]===undefined) player.options[name] = old
		let d2 = new Element("dropDown2")
		d2.changeStyle("display", "none");
		save();
		saveOptions();
		return;
	}
	if (type>0) {
		setDropdown(dropdown, els);
		ddState = name;
	}
}

function getInfo(sav) {
	let mds = "";
	if (sav.modes.length > 1) mds = sav.modes.reduce((x, y) => capitalFirst(x) + ", " + capitalFirst(y));
	else if (sav.modes.length > 0) mds = capitalFirst(sav.modes[0].replace("_"," "));
	else mds = "None";
	let info = "Modes: " + mds + "<br>";
	if (sav.elementary?(sav.elementary.sky?sav.elementary.sky.unl:false):false) {
		info += "Skyrmions: "+showNum(new ExpantaNum(sav.elementary.sky.amount))+", Pions: "+showNum(new ExpantaNum(sav.elementary.sky.pions.amount))+", Spinors: "+showNum(new ExpantaNum(sav.elementary.sky.spinors.amount))+", "
	} else if (sav.elementary?(sav.elementary.foam?sav.elementary.foam.unl:false):false) {
		info += "Quantum Foam: "+showNum(new ExpantaNum(sav.elementary.foam.amounts[0]))+", "
		if (sav.elementary.entropy?sav.elementary.entropy.unl:false) {
			info += "Entropy: "+showNum(new ExpantaNum(sav.elementary.entropy.amount))+", "
		}
	} else if (sav.elementary?(sav.elementary.hc?sav.elementary.hc.unl:false):false) {
		info += "Best Hadronic Score: "+showNum(new ExpantaNum(sav.elementary.hc.best))+", Hadrons: "+showNum(new ExpantaNum(sav.elementary.hc.hadrons))+", "
	} else if (sav.elementary?(sav.elementary.theory?sav.elementary.theory.unl:false):false) {
		info += "Theory Points: "+showNum(new ExpantaNum(sav.elementary.theory.points))+", Theoriverse Depth: "+showNum(new ExpantaNum(sav.elementary.theory.depth))+", "
	} else if (sav.elementary?new ExpantaNum(sav.elementary.times).gt(0):false)
		info += "Elementaries: "+showNum(new ExpantaNum(sav.elementary.times))+", Fermions: "+showNum(new ExpantaNum(sav.elementary.fermions.amount))+", Bosons: "+showNum(new ExpantaNum(sav.elementary.bosons.amount))+", "
	else if (sav.inf.derivatives.unl)
		info += "Derivative Shifts/Boosts: " + showNum(new ExpantaNum(sav.inf.derivatives.unlocks)) + ", ";
	else if (new ExpantaNum(sav.inf.endorsements).gte(21))
		info +=
			"Total Spectral Gems: " +
			showNum(
				new ExpantaNum(sav.inf.pantheon.gems).plus(sav.inf.pantheon.angels).plus(sav.inf.pantheon.demons)
			) +
			", ";
	else if (new ExpantaNum(sav.inf.endorsements).gte(15))
		info += "Stadium Challenge completions: " + sav.inf.stadium.completions.length + ", ";
	else if (new ExpantaNum(sav.inf.endorsements).gte(10)) {
		let enl = new ExpantaNum(0);
		for (let i = 0; i < sav.inf.ascension.enlightenments.length; i++)
			enl = enl.plus(sav.inf.ascension.enlightenments[i]);
		info +=
			"Ascension Power: " +
			showNum(new ExpantaNum(sav.inf.ascension.power)) +
			", Total Enlightenments: " +
			showNum(enl) +
			", ";
	} else if (sav.inf.unl)
		info +=
			"Knowledge: " +
			showNum(new ExpantaNum(sav.inf.knowledge)) +
			", Endorsements: " +
			showNum(new ExpantaNum(sav.inf.endorsements)) +
			", ";
	else if (sav.dc.unl) info += "Dark Cores: " + showNum(new ExpantaNum(sav.dc.cores)) + ", ";
	else if (sav.pathogens.unl) info += "Pathogens: " + showNum(new ExpantaNum(sav.pathogens.amount)) + ", ";
	else if (sav.collapse.unl)
		info +=
			"Cadavers: " +
			showNum(new ExpantaNum(sav.collapse.cadavers)) +
			", Life Essence: " +
			showNum(new ExpantaNum(sav.collapse.lifeEssence)) +
			", ";
	else if (sav.tr.unl) info += "Time Cubes: " + showNum(new ExpantaNum(sav.tr.cubes)) + ", ";
	else if (sav.automation.unl)
		info +=
			"Scraps: " +
			showNum(new ExpantaNum(sav.automation.scraps)) +
			", Intelligence: " +
			showNum(new ExpantaNum(sav.automation.intelligence)) +
			", ";
	else if (new ExpantaNum(sav.rf).gt(0)) {
		if (sav.modes.includes("extreme"))
			info +=
				"Coal: " +
				showNum(new ExpantaNum(sav.furnace.coal)) +
				", Blue Flame: " +
				showNum(new ExpantaNum(sav.furnace.blueFlame)) +
				", ";
		else info += "Rocket Fuel: " + showNum(new ExpantaNum(sav.rf)) + ", ";
	} else if (new ExpantaNum(sav.rockets).gt(0)) info += "Rockets: " + showNum(new ExpantaNum(sav.rockets)) + ", ";
	else {
		info += "Tier " + showNum(new ExpantaNum(sav.tier)) + ", ";
		if (sav.modes.includes("extreme"))
			info += "Rank Cheapener " + showNum(new ExpantaNum(sav.rankCheap || 0)) + ", ";
		info += "Rank " + showNum(new ExpantaNum(sav.rank)) + ", ";
	}
	info += "Distance: " + formatDistance(new ExpantaNum(sav.distance));
	return info;
}

function loads() {
	let all = getAllSaves();
	let dropdown = new Element("dropDown2");
	dropdown.changeStyle("display", dropdown.style.display == "block" ? "none" : "block");
	let els = {};
	for (let x = 0; x < all.length; x++) {
		if (all[x] === undefined || all[x] === null) continue;
		let active = player.saveID == all[x].saveID && player.savePos == all[x].savePos;
		let name =
			all[x].options.name == "Save #"
				? "Save #" + (all[x].savePos ? all[x].savePos : "???")
				: all[x].options.name;
		els[x] = {
			name: name + (active ? " (Active)" : ""),
			info: getInfo(all[x]),
			onclick1: "setSave(&quot;" + btoa(JSON.stringify(all[x])) + "&quot;, true)",
			txt1: "Load",
			onclick2: "deleteSave(" + x + ")",
			txt2: "Delete",
			buttons: 2
		};
	}
	setDropdown(dropdown, els, true);
}

function exportAll() {
	save()
	let all = getAllSaves();
	copyToClipboard(btoa(JSON.stringify(all)));
	notifier.info("All saves exported");
}

function importAll() {
	let input = prompt("Paste your saves here.");
	if (input) {
		if (!confirm("Are you sure you want to import all saves? This will overwrite any saves currently in your game!")) return
		try {
			saves = JSON.parse(atob(input));
			notifier.info("Saves imported");
			localStorage.setItem("dist-inc-saves"+betaID, input)
			let s = transformToEN(saves[saves.findIndex(x => x!=null)]);
			setSave(s);
		} catch (e) {
			notifier.error("Invalid Saves");
		}
	}
}

function selectMode(name) {
	if (modesSelected.includes(name)) {
		modesSelected = modesSelected.filter(x => x != name);
		if (MODES[name].dis)
			MODES[name].dis.map(x =>
				(function () {
					if (modesSelected.includes(x)) modesSelected = modesSelected.filter(n => n != x);
				})()
			);
	} else {
		modesSelected.push(name);
		if (MODES[name].ext)
			MODES[name].ext.map(x =>
				(function () {
					if (!modesSelected.includes(x)) modesSelected.push(x);
				})()
			);
	}
}

function confirmModes() {
	if (modesSelected.length == 0) startModes([]);
	else if (modesSelected.length == 1) {
		let modeData = MODEBALANCES[modesSelected[0]];
		if (modeData) {
			if (modeData.balanceCheck)
				if (!confirm("This mode is " + modeData.balancing + ". Are you sure you want to enter this run?"))
					return;
		} else if (!confirm("You have selected an unbalanced mode. Are you sure you want to enter this run?")) return;
		startModes(modesSelected);
	} else if (modesSelected.length == 2) startModes(modesSelected);
	else {
		let modeData = MODEBALANCES[calcModeAndBalanceName(modesSelected).balanceName]
		if (modeData) {
			if (modeData.balanceCheck) {
				if (!confirm("This mode combination is " + modeData.balancing + ". Are you sure you want to enter this run?"))
					return;
			}
		} else if (
			!confirm(
				"You have selected an unbalanced mode combination. Are you sure you want to enter this run?"
			)
		)
			return;
		startModes(modesSelected);
	}
}

function modeActive(name) {
	if (name[0] == "!") return !modeActive(name.slice(1))
	let l = name.split("+")
	for (let i = 0; i < l.length; i++) {
		if (!player.modes.includes(l[i])) return false
	}
	return true
}