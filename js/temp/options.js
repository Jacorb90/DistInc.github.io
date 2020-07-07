function updateTempOptions() {
	tmp.options = {};
	tmp.options.save = function (sav = player) {
		if (!showContainer) return;
		localStorage.setItem("dist-inc", btoa(JSON.stringify(ENString(sav))));
		notifier.success("Game saved!");
	};
	tmp.options.setSave = function (ns) {
		tmp.options.save(ns);
		reload();
	};
	tmp.options.hardReset = function (force = false) {
		if (!force)
			if (!confirm("Are you sure you want to reset? You will lose all of your progress if you do this!!!"))
				return;
		tmp.options.setSave(DEFAULT_START);
	};
	tmp.options.import = function () {
		let prmpt = prompt("Paste your save here.");
		let sav;
		if (prmpt) {
			try {
				sav = JSON.parse(atob(prmpt));
				notifier.info("Save imported");
				tmp.options.setSave(transformToEN(sav));
			} catch (e) {
				notifier.error("Invalid Save");
			}
		}
	};
	tmp.options.export = function () {
		let toExport = btoa(JSON.stringify(ENString(player)));
		notifier.info("Save exported");
		copyToClipboard(toExport);
	};
	tmp.options.startModes = function (modes) {
		let s = transformToEN(DEFAULT_START);
		s.modes = modes;
		if (s.modes.includes("aau")) s.achievements = getAllAchievements();
		tmp.options.save(s);
		reload();
	};
	tmp.options.setDropdown = function (dropdown, els) {
		let html = "";
		for (let i = 0; i < Object.keys(els).length; i++) {
			let el = els[Object.keys(els)[i]];
			html += "<br>";
			html += "<button class='btn tb opt' onclick='" + el.onclick + "'>" + el.txt + "</button>";
		}
		dropdown.setHTML(html + "<br><button class='btn tb opt' style='visibility: hidden;'></button>");
	};
	tmp.options.change = function (name, type) {
		let dropdown = new Element("dropDown");
		dropdown.changeStyle("display", dropdown.style.display == "block" && name == ddState ? "none" : "block");
		let els = {};
		if (type == 0) {
			els["true"] = {
				txt: "ON",
				onclick:
					"player.options[&quot;" +
					name +
					"&quot;] = true; this.parentElement.style.display=&quot;none&quot;",
			};
			els["false"] = {
				txt: "OFF",
				onclick:
					"player.options[&quot;" +
					name +
					"&quot;] = false; this.parentElement.style.display=&quot;none&quot;",
			};
		}
		if (type == 1) {
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
						"; this.parentElement.style.display=&quot;none&quot;",
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
						"&quot;; this.parentElement.style.display=&quot;none&quot;",
				};
		}
		tmp.options.setDropdown(dropdown, els);
		ddState = name;
	};
	tmp.options.modes = {};
	tmp.options.modes.select = function (name) {
		if (modesSelected.includes(name)) modesSelected = modesSelected.filter(x => x != name);
		else modesSelected.push(name);
	};
	tmp.options.modes.confirm = function () {
		if (modesSelected.length == 0) tmp.options.startModes([]);
		if (modesSelected.length == 1) {
			let modeData = MODES[modesSelected[0]];
			if (modeData.balanceCheck)
				if (!confirm("This mode is " + modeData.balancing + ". Are you sure you want to enter this run?"))
					return;
			tmp.options.startModes(modesSelected);
		} else if (modesSelected.length == 2) {
			let base = MODES[modesSelected[0]];
			for (let i = 1; i < modesSelected.length; i++) {
				let mode = base.combos[modesSelected[i]];
				if (mode.balanceCheck)
					if (
						!confirm(
							"This mode combination is " +
								mode.balancing +
								". Are you sure you want to enter this mode combination?"
						)
					)
						return;
				tmp.options.startModes(modesSelected);
			}
		} else {
			if (
				!confirm(
					"You have selected more than two modes. This may cause an unbalanced or even broken game mode. Are you sure you want to do this?"
				)
			)
				return;
			tmp.options.startModes(modesSelected);
		}
	};

	tmp.modes = {};
	for (let i = 0; i < Object.keys(MODES).length; i++)
		tmp.modes[Object.keys(MODES)[i]] = new Mode(Object.keys(MODES)[i]);
}
