function updateTempOptions() {
	tmp.options = {}
	tmp.options.save = function(sav=player, force=false) { 
		if (!showContainer&&!force) return
		localStorage.setItem("dist-inc", btoa(JSON.stringify(ENString(sav))))
		let all = JSON.parse(atob(localStorage.getItem("dist-inc-saves")?localStorage.getItem("dist-inc-saves"):btoa(JSON.stringify([]))))
		if ((all.includes(null) || all[sav.savePos-1]===undefined || all[sav.savePos-1].savePos==sav.savePos)&&all.length>=sav.savePos) all[sav.savePos-1] = ENString(sav)
		else all.push(ENString(sav))
		localStorage.setItem("dist-inc-saves", btoa(JSON.stringify(all)))
		notifier.success("Game saved!")
	}
	tmp.options.setSave = function(ns, cod=false) {
		tmp.options.save(cod?JSON.parse(atob(ns)):ns)
		reload()
		if (reloadFail) {
			notifier.error("Could not open new window.")
			let el = document.createElement("a")
			el.href = "main.html"
			el.click()
			window.location.reload()
		}
	}
	tmp.options.deleteSave = function(loc) {
		if (!confirm("Are you sure you want to delete this save? You will not be able to undo this!")) return
		let all = JSON.parse(atob(localStorage.getItem("dist-inc-saves")?localStorage.getItem("dist-inc-saves"):btoa(JSON.stringify([]))))
		let isCurrent = all[loc].saveID==player.saveID
		all[loc] = null
		localStorage.setItem("dist-inc-saves", btoa(JSON.stringify(all)))
		if (isCurrent) tmp.options.startModes([])
		else {
			tmp.options.loads()
			tmp.options.save()
		}
	}
	tmp.options.hardReset = function(force=false) {
		if (!force) if (!confirm("Are you sure you want to reset? You will lose all of your progress if you do this!!!")) return
		tmp.options.setSave(DEFAULT_START)
	}
	tmp.options.import = function() {
		let prmpt = prompt("Paste your save here.")
		let sav;
		if (prmpt) {
			try {
				sav = JSON.parse(atob(prmpt))
				notifier.info("Save imported")
				let s = transformToEN(sav)
				let all = JSON.parse(atob(localStorage.getItem("dist-inc-saves")?localStorage.getItem("dist-inc-saves"):btoa(JSON.stringify([]))))
				if (all.indexOf(null)>-1) s.savePos = all.indexOf(null)+1
				else s.savePos = all.length+1
				if (s.savePos>MAX_SAVES) {
					alert("This save was not created properly (it has a position greater than the limit!)")
					return
				}
				tmp.options.setSave(s)
			} catch(e) {
				notifier.error("Invalid Save")
			}
		}
	}
	tmp.options.export = function() {
		let toExport = btoa(JSON.stringify(ENString(player)))
		notifier.info("Save exported")
		copyToClipboard(toExport)
	}
	tmp.options.startModes = function(modes) {
		let s = transformToEN(DEFAULT_START)
		s.modes = modes
		if (s.modes.includes("aau")) s.achievements = getAllAchievements()
		let all = JSON.parse(atob(localStorage.getItem("dist-inc-saves")?localStorage.getItem("dist-inc-saves"):btoa(JSON.stringify([]))))
		if (all.indexOf(null)>-1 && all[all.indexOf(null)] === null) s.savePos = all.indexOf(null)+1
		else s.savePos = all.length+1
		if (s.savePos>MAX_SAVES) {
			alert("You have too many saves! You need to delete one in order to make a new one!")
			return
		}
		tmp.options.save(s)
		reload()
	}
	tmp.options.setDropdown = function(dropdown, els, load=false) {
		let html=""
		for (let i=0;i<Object.keys(els).length;i++) {
			let el = els[Object.keys(els)[i]]
			html+="<br>"
			if (load) {
				html+="<b>"+el.name+"</b><br>"
				html+=el.info+"<br>"
				for (let x=1;x<=el.buttons;x++) html+="<button class='btn tb opt' onclick='"+el["onclick"+x]+"'>"+el["txt"+x]+"</button> "
			} else html+="<button class='btn tb opt' onclick='"+el.onclick+"'>"+el.txt+"</button>"
			if (load) html+="<br><br>"
		}
		dropdown.setHTML(html+"<br><button class='btn tb opt' style='visibility: hidden;'></button>")
	}
	tmp.options.change = function(name, type) {
		let dropdown = new Element("dropDown")
		if (type!=3) dropdown.changeStyle("display", (dropdown.style.display!="none"&&name==ddState)?"none":"inline-block")
		else dropdown.changeStyle("display", "none")
		let els = {}
		if (type==0) {
			els["true"] = {txt: "ON", onclick:("player.options[&quot;"+name+"&quot;] = true; this.parentElement.style.display=&quot;none&quot;")}
			els["false"] = {txt: "OFF", onclick:("player.options[&quot;"+name+"&quot;] = false; this.parentElement.style.display=&quot;none&quot;")}
		} if (type==1) {
			let max = OPT_CHNG_MAX[name]
			let min = OPT_CHNG_MIN[name]
			for (x=min;x<=max;x++) els[x] = {txt: x.toString(), onclick:("player.options[&quot;"+name+"&quot;] = "+x+"; this.parentElement.style.display=&quot;none&quot;")}
		} else if (type==2) {
			let types = OPT_NAMES[name]
			for (x=0;x<types.length;x++) els[types[x]] = {txt: capitalFirst(types[x]), onclick:("player.options[&quot;"+name+"&quot;] = &quot;"+types[x]+"&quot;; this.parentElement.style.display=&quot;none&quot;")}
		} else if (type==3) {
			player.options[name] = window.prompt("Change the "+name+".", player.options[name])
			tmp.options.save()
			return
		}
		tmp.options.setDropdown(dropdown, els)
		ddState = name
	}
	tmp.options.getInfo = function(sav) {
		let mds = ""
		if (sav.modes.length>1) mds = sav.modes.reduce((x,y) => capitalFirst(x)+", "+capitalFirst(y))
		else if (sav.modes.length>0) mds = capitalFirst(sav.modes[0])
		else mds = "None"
		let info = "Modes: "+mds+"<br>"
		if (sav.inf.derivatives.unl) info += "Derivative Shifts/Boosts: "+showNum(new ExpantaNum(sav.inf.derivatives.unlocks))+", "
		else if (new ExpantaNum(sav.inf.endorsements).gte(21)) info += "Total Spectral Gems: "+showNum(new ExpantaNum(sav.inf.pantheon.gems).plus(sav.inf.pantheon.angels).plus(sav.inf.pantheon.demons))+", "
		else if (new ExpantaNum(sav.inf.endorsements).gte(15)) info += "Stadium Challenge completions: "+sav.inf.stadium.completions.length+", "
		else if (new ExpantaNum(sav.inf.endorsements).gte(10)) {
			let enl = new ExpantaNum(0)
			for (let i=0;i<sav.inf.ascension.enlightenments.length;i++) enl = enl.plus(sav.inf.ascension.enlightenments[i])
			info += "Ascension Power: "+showNum(new ExpantaNum(sav.inf.ascension.power))+", Total Enlightenments: "+showNum(enl)+", "
		} else if (sav.inf.unl) info += "Knowledge: "+showNum(new ExpantaNum(sav.inf.knowledge))+", Endorsements: "+showNum(new ExpantaNum(sav.inf.endorsements))+", "
		else if (sav.dc.unl) info += "Dark Cores: "+showNum(new ExpantaNum(sav.dc.cores))+", "
		else if (sav.pathogens.unl) info += "Pathogens: "+showNum(new ExpantaNum(sav.pathogens.amount))+", "
		else if (sav.collapse.unl) info += "Cadavers: "+showNum(new ExpantaNum(sav.collapse.cadavers))+", Life Essence: "+showNum(new ExpantaNum(sav.collapse.lifeEssence))+", "
		else if (sav.tr.unl) info += "Time Cubes: "+showNum(new ExpantaNum(sav.tr.cubes))+", "
		else if (sav.automation.unl) info += "Scraps: "+showNum(new ExpantaNum(sav.automation.scraps))+", Intelligence: "+showNum(new ExpantaNum(sav.automation.intelligence))+", "
		else if (new ExpantaNum(sav.rf).gt(0)) {
			if (sav.modes.includes("extreme")) info += "Coal: "+showNum(new ExpantaNum(sav.furnace.coal))+", Blue Flame: "+showNum(new ExpantaNum(sav.furnace.blueFlame))+", "
			else info += "Rocket Fuel: "+showNum(new ExpantaNum(sav.rf))+", "
		} else if (new ExpantaNum(sav.rockets).gt(0)) info += "Rockets: "+showNum(new ExpantaNum(sav.rockets))+", "
		else {
			info += "Tier "+showNum(new ExpantaNum(sav.tier))+", "
			if (sav.modes.includes("extreme")) info += "Rank Cheapener "+showNum(new ExpantaNum(sav.rankCheap||0))+", "
			info += "Rank "+showNum(new ExpantaNum(sav.rank))+", "
		}
		info += "Distance: "+formatDistance(new ExpantaNum(sav.distance))
		return info
	}
	tmp.options.loads = function() {
		let all = JSON.parse(atob(localStorage.getItem("dist-inc-saves")?localStorage.getItem("dist-inc-saves"):btoa(JSON.stringify([]))))
		let dropdown = new Element("dropDown2")
		dropdown.changeStyle("display", dropdown.style.display=="block"?"none":"block")
		let els = {}
		for (let x=0;x<all.length;x++) {
			if (all[x]===undefined || all[x]===null) continue
			let active = player.saveID==all[x].saveID
			let name = (all[x].options.name=="Save #")?("Save #"+(all[x].savePos?all[x].savePos:"???")):all[x].options.name
			els[x] = {name: name+(active?" (Active)":""), info: tmp.options.getInfo(all[x]), onclick1: "tmp.options.setSave(&quot;"+btoa(JSON.stringify(all[x]))+"&quot;, true)", txt1: "Load", onclick2: "tmp.options.deleteSave("+x+")", txt2: "Delete", buttons: 2}
		}
		tmp.options.setDropdown(dropdown, els, true)
	}
	
	tmp.options.modes = {}
	tmp.options.modes.select = function(name) {
		if (modesSelected.includes(name)) {
			modesSelected = modesSelected.filter(x => x!=name)
			if (MODES[name].dis) MODES[name].dis.map(x => function() {
				if (modesSelected.includes(x)) modesSelected = modesSelected.filter(n => n!=x)
			}())
		} else {
			modesSelected.push(name)
			if (MODES[name].ext) MODES[name].ext.map(x => function() {
				if (!modesSelected.includes(x)) modesSelected.push(x)
			}())
		}
	}
	tmp.options.modes.confirm = function() {
		if (modesSelected.length==0) tmp.options.startModes([])
		else if (modesSelected.length==1) {
			let modeData = MODES[modesSelected[0]]
			if (modeData.balanceCheck) if (!confirm("This mode is "+modeData.balancing+". Are you sure you want to enter this run?")) return
			tmp.options.startModes(modesSelected)
		} else if (modesSelected.length==2) {
			let base = MODES[modesSelected[0]]
			for (let i=1;i<modesSelected.length;i++) {
				let mode = base.combos[modesSelected[i]]
				if (mode.balanceCheck) if (!confirm("This mode combination is "+mode.balancing+". Are you sure you want to enter this mode combination?")) return
				tmp.options.startModes(modesSelected)
			}
		} else {
			if (!confirm("You have selected more than two modes. This may cause an unbalanced or even broken game mode. Are you sure you want to do this?")) return
			tmp.options.startModes(modesSelected)
		}
	}
	
	tmp.modes = {}
	for (let i=0;i<Object.keys(MODES).length;i++) tmp.modes[Object.keys(MODES)[i]] = new Mode(Object.keys(MODES)[i])
}