function updateTempHC() {
	if (!tmp.elm.hc) tmp.elm.hc = {}
	tmp.elm.hc.currScore = getProjectedHadronicScore()
	tmp.elm.hc.hadronBulk = new ExpantaNum(1)
	if (player.elementary.theory.inflatons.unl) tmp.elm.hc.hadronBulk = tmp.elm.hc.hadronBulk.plus(getInflatonEff2())
	tmp.elm.hc.hadronGain = player.elementary.hc.unl ? player.elementary.hc.best.pow(1.5).div(10) : new ExpantaNum(0)
	tmp.elm.hc.hadronGain = tmp.elm.hc.hadronGain.times(TREE_UPGS[31].effect(player.elementary.theory.tree.upgrades[31]||0))
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.hc.hadronGain = tmp.elm.hc.hadronGain.times(tmp.elm.qf.boost7)
	if (modeActive("hikers_dream") && player.energyUpgs.includes(27)) tmp.elm.hc.hadronGain = tmp.elm.hc.hadronGain.times(tmp.hd.enerUpgs[27])
	
	tmp.elm.hc.hadInterval = ExpantaNum.add(1, ExpantaNum.div(9, player.elementary.hc.best.plus(1).log(Math.E).plus(1)).div(200))
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[33]||0, 1)) tmp.elm.hc.hadInterval = tmp.elm.hc.hadInterval.sub(1).div(2).plus(1)
	if (player.elementary.entropy.upgrades.includes(19) && tmp.elm.entropy) tmp.elm.hc.hadInterval = tmp.elm.hc.hadInterval.root(tmp.elm.entropy.upgEff[19])

	tmp.elm.hc.hadronEff = player.elementary.hc.hadrons.max(1).logBase(tmp.elm.hc.hadInterval).floor().times(tmp.elm.hc.hadronBulk)
	tmp.elm.hc.next = ExpantaNum.pow(tmp.elm.hc.hadInterval, new ExpantaNum(player.elementary.hc.claimed||0).div(tmp.elm.hc.hadronBulk).plus(1))
	tmp.elm.hc.complPerc = player.distance.log10().div(new ExpantaNum(getHCSelector("goal")).times(4.4e26).log10()).min(1)
	tmp.elm.hc.infState = getInflatonState()
	tmp.elm.hc.infGain = getInflatonGain()
	claimHadronEff()
	updateHCTabs()
}

function clearHCData() {
	if (!confirm("Are you sure you want to reset your Hadronic Challenge inputs?")) return;
	updateHCSelectorInputs(true);
}

// Hadronic Challenge
function getProjectedHadronicScore() {
	let score = new ExpantaNum(0)
	
	// Pre-Collapse Modifiers
	if (getHCSelector("noTRU")) score = score.times(1.08).plus(0.08)
	
	// Collapse Modifiers
	if (getHCSelector("noCad")) score = score.times(1.05).plus(0.05)
	if (getHCSelector("noPU")) score = score.times(1.1).plus(0.1)
	if (getHCSelector("noDC")) score = score.times(1.04).plus(0.04)
	
	// Infinity Modifiers
	if (getHCSelector("noIU")) score = score.times(1.1).plus(0.1)
	let challMod = modeActive("extreme")?72:36
	score = score.plus(new ExpantaNum(getHCSelector("spaceon")).div(challMod))
	score = score.plus(new ExpantaNum(getHCSelector("solaris")).div(challMod))
	score = score.plus(new ExpantaNum(getHCSelector("infinity")).div(challMod))
	score = score.plus(new ExpantaNum(getHCSelector("eternity")).div(challMod))
	score = score.plus(new ExpantaNum(getHCSelector("reality")).div(challMod))
	score = score.plus(new ExpantaNum(getHCSelector("drigganiz")).div(challMod))
	if (modeActive("extreme")) {
		score = score.plus(new ExpantaNum(getHCSelector("flamis")).div(challMod))
		score = score.plus(new ExpantaNum(getHCSelector("cranius")).div(challMod))
		score = score.plus(new ExpantaNum(getHCSelector("spectra")).div(challMod))
		score = score.plus(new ExpantaNum(getHCSelector("aqualon")).div(challMod))
		score = score.plus(new ExpantaNum(getHCSelector("nullum")).div(challMod))
		score = score.plus(new ExpantaNum(getHCSelector("quantron")).div(challMod))
	}
	if (getHCSelector("noGems")) score = score.times(1.01).plus(0.01)
	if (getHCSelector("purge")) score = score.times(3).plus(2)
	if (getHCSelector("noDS")) score = score.times(1.03).plus(0.03)
	if (getHCSelector("noDB")) score = score.times(1.03).plus(0.03)
		
	// Elementary Modifiers
	score = score.times(new ExpantaNum(getHCSelector("tv")).plus(2).pow(0.25)).plus(new ExpantaNum(getHCSelector("tv")).plus(1).div(20))
	
	// Goal Modifier
	score = score.times(new ExpantaNum(getHCSelector("goal")).log10().div(Math.log10(Number.MAX_VALUE)).log10().plus(1))
	
	if (modeActive("easy")) score = score.pow(1.025)
	return score
}

function isHCTabShown(name) {
	return hcTab == name;
}

function updateHCTabs() {
	var tabs = document.getElementsByClassName("hcTab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isHCTabShown(tabs[i].id));
	}
	new Element("furnacetabbtn").setDisplay(player.modes.includes("extreme"))
}

function showHCTab(name) {
	hcTab = name;
}

function getHCSelector(name) {
	let base;
	let data = HC_DATA[name]
	if (data[0]=="checkbox") return !(!player.elementary.hc.selectors[name])
	else if (data[0]=="text"||data[0]=="number"||data[0]=="range") base = data[1][0]
	return new ExpantaNum(player.elementary.hc.selectors[name]||base).max(data[1][0]).min(data[1][1]).toString()
}

function updateHCSelector(name) {
	let data = HC_DATA[name]
	let type = data[0]
	let el = new Element("hcSelector"+name)
	if (type=="checkbox") player.elementary.hc.selectors[name] = el.el.checked
	else if (type=="text"||type=="number"||type=="range") {
		let val = el.el.value||0
		try {
			let num = new ExpantaNum(val)
			if (type=="number"||type=="range") num = num.round()
			if (num.lt(data[1][0]) || num.isNaN()) num = new ExpantaNum(data[1][0])
			if (num.gt(data[1][1])) num = new ExpantaNum(data[1][1])
			player.elementary.hc.selectors[name] = num
			el.el.value = disp(num, 8, 3, 10)
		} catch(e) {
			notifier.warn("Improper Hadronic Challenge input")
			console.log(e)
		}
	}
}

function canCompleteHC() {
	return (!(!player.elementary.hc.active)) && player.distance.gte(ExpantaNum.mul(getHCSelector("goal"), DISTANCES.uni))
}

function updateHCSelectorInputs(reset=false) {
	let len = Object.keys(HC_DATA).length
	for (let i=0;i<len;i++) {
		let name = Object.keys(HC_DATA)[i]
		let data = HC_DATA[name]
		let el = new Element("hcSelector"+name)
		el.el.disabled = !(!player.elementary.hc.active)
		if (data[0]=="checkbox") el.el.checked = reset?false:getHCSelector(name)
		if (data[0]=="text"||data[0]=="number"||data[0]=="range") el.el.value = reset?(name=="tv"?"-1":"0"):new ExpantaNum(getHCSelector(name)).toString()
		updateHCSelector(name)
	}
}

function startHC() {
	if (!player.elementary.hc.unl) return
	if (player.elementary.hc.active) {
		if (canCompleteHC()) player.elementary.hc.best = player.elementary.hc.best.max(getProjectedHadronicScore())
		else if (player.options.hcc) if (!confirm("Are you sure you want to exit the challenge early?")) return
	} else if (getProjectedHadronicScore().lte(0)) {
		alert("You cannot start a Hadronic Challenge with a Projected Hadronic Score of 0!")
		return
	} else if (player.elementary.theory.active) {
		alert("You cannot start a Hadronic Challenge while in a Theoriverse run!")
		return
	}
	player.elementary.hc.active = !player.elementary.hc.active
	elmReset(true)
	updateHCSelectorInputs()
}

function HCCBA(name) {
	if (name=="noTRU" && extremeStadiumActive("cranius", 3)) return true
	return player.elementary.hc.active && getHCSelector(name)
}

function HCTVal(name) {
	return !player.elementary.hc.active?new ExpantaNum(HC_DATA[name][1][0]):new ExpantaNum(getHCSelector(name))
}

function claimHadronEff() {
	let diff = tmp.elm.hc.hadronEff.sub(player.elementary.hc.claimed||0).floor()
	if (diff.gte(1)) {
		player.elementary.theory.points = player.elementary.theory.points.plus(diff)
		player.elementary.hc.claimed = player.elementary.hc.claimed.plus(diff)
	}
}

function exportHC() {
	let data = btoa(JSON.stringify(player.elementary.hc.selectors))
	notifier.info("Hadronic Challenge data exported!")
	copyToClipboard(data)
}

function importHC() {
	if (player.elementary.hc.active) {
		notifier.warn("You cannot import a Hadronic Challenge while in one!")
		return;
	}
	let toImport = prompt("Paste Hadronic Challenge data here.")
	try {
		let data = JSON.parse(atob(toImport))
		player.elementary.hc.selectors = data
		updateHCSelectorInputs()
	} catch(e) {
		notifier.warn("Invalid Hadronic Challenge data!")
	}
}