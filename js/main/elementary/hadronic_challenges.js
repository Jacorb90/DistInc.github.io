function updateTempHC() {
	if (!tmp.elm.hc) tmp.elm.hc = {}
	tmp.elm.hc.currScore = getProjectedHadronicScore()
	tmp.elm.hc.mltMode = HCMltMode();
	tmp.elm.hc.hadronBulk = new ExpantaNum(1)
	if (player.elementary.theory.inflatons.unl) tmp.elm.hc.hadronBulk = tmp.elm.hc.hadronBulk.plus(getInflatonEff2())
	tmp.elm.hc.hadronGain = player.elementary.hc.unl ? player.elementary.hc.best.pow(1.5).div(10) : new ExpantaNum(0)
	tmp.elm.hc.hadronGain = tmp.elm.hc.hadronGain.times(TREE_UPGS[31].effect(player.elementary.theory.tree.upgrades[31]||0))
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.hc.hadronGain = tmp.elm.hc.hadronGain.times(tmp.elm.qf.boost7)
	if (modeActive("hikers_dream") && player.energyUpgs.includes(27)) tmp.elm.hc.hadronGain = tmp.elm.hc.hadronGain.times(tmp.hd.enerUpgs[27])
	
	tmp.elm.hc.hadInterval = ExpantaNum.add(1, ExpantaNum.div(9, player.elementary.hc.best.plus(1).log(Math.E).plus(1)).div(200))
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[33]||0, 1)) tmp.elm.hc.hadInterval = tmp.elm.hc.hadInterval.sub(1).div(2).plus(1)
	if (player.elementary.entropy.upgrades.includes(19) && tmp.elm.entropy) tmp.elm.hc.hadInterval = tmp.elm.hc.hadInterval.root(tmp.elm.entropy.upgEff[19])
	if (hasDE(7)) tmp.elm.hc.hadInterval = tmp.elm.hc.hadInterval.root(getAccelEff())

	tmp.elm.hc.hadronEff = player.elementary.hc.hadrons.max(1).logBase(tmp.elm.hc.hadInterval).floor().times(tmp.elm.hc.hadronBulk)
	tmp.elm.hc.next = ExpantaNum.pow(tmp.elm.hc.hadInterval, new ExpantaNum(player.elementary.hc.claimed||0).div(tmp.elm.hc.hadronBulk).plus(1))
	let rg = new ExpantaNum(getHCSelector("goal")).times(DISTANCES.uni);
	if (getHCSelector("goalMlt")) rg = ExpantaNum.pow(DISTANCES.mlt, getHCSelector("goal"));
	tmp.elm.hc.complPerc = player.distance.log10().div(rg.log10()).min(1);
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
	if (getHCSelector("rockets")) score = score.times(1.025).plus(0.025)
	if (getHCSelector("rf")) score = score.times(1.005).plus(0.005)
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
	if (getHCSelector("elm")) score = score.times(1.125).plus(0.125);
	if (getHCSelector("fermbos")) score = score.times(1.075).plus(0.075);
	score = score.times(new ExpantaNum(getHCSelector("tv")).plus(2).pow(0.25)).plus(new ExpantaNum(getHCSelector("tv")).plus(1).div(20))
	if (getHCSelector("sprsym")) score = score.times(1.125).plus(0.05);
	if (getHCSelector("tree")) score = score.times(1.04).plus(0.04);
	score = score.times(ExpantaNum.sub(12, ExpantaNum.mul(11**0.998, ExpantaNum.sub(11, getHCSelector("string")).pow(0.002))));
	if (getHCSelector("preontb")) score = score.times(1.02).plus(0.02);
	if (getHCSelector("aclron")) score = score.times(1.02).plus(0.02);
	score = score.times(ExpantaNum.sub(12, ExpantaNum.mul(11**0.996, ExpantaNum.sub(11, getHCSelector("de")).pow(0.004))));
	if (getHCSelector("infl")) score = score.times(1.02).plus(0.02);
	score = score.times(ExpantaNum.sub(12, ExpantaNum.mul(11**0.999, ExpantaNum.sub(11, getHCSelector("rfrm")).pow(0.001))));
	if (getHCSelector("etrpy")) score = score.times(1.04).plus(0.04);
	if (getHCSelector("sky")) score = score.times(1.05).plus(0.05);
	
	// Multiversal Modifiers
	if (getHCSelector("q1")) score = score.times(1.2).plus(0.6)
	if (getHCSelector("q2")) score = score.times(1.15).plus(0.575)
	if (getHCSelector("q3")) score = score.times(1.175).plus(0.5875)
	for (let i=1;i<=5;i++) if (getHCSelector("mlt"+i)) score = score.times(1.1).plus(0.3);
	
	// Goal Modifier
	let goal = new ExpantaNum(getHCSelector("goal"))
	if (getHCSelector("goalMlt")) goal = ExpantaNum.pow(DISTANCES.mlt, goal);
	if (goal.gte("e1e7")) goal = ExpantaNum.pow("e1e7", goal.log("e1e7").sqrt());
	score = score.times(goal.log10().div(Math.log10(Number.MAX_VALUE)).log10().plus(1))
	
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
	else {
		let minimum = checkFunc(data[1][0]);
		let maximum = checkFunc(data[1][1]);
		if (data[0]=="text"||data[0]=="number"||data[0]=="range") base = minimum
		return new ExpantaNum(player.elementary.hc.selectors[name]||base).max(minimum).min(maximum).toString()
	}
}

function updateHCSelector(name) {
	let data = HC_DATA[name]
	let change = false;
	let type = data[0]
	let el = new Element("hcSelector"+name)
	if (type=="checkbox") {
		if (el.el.checked != player.elementary.hc.selectors[name]) change = true;
		player.elementary.hc.selectors[name] = el.el.checked
	} else if (type=="text"||type=="number"||type=="range") {
		let val = el.el.value||0
		try {
			let num = new ExpantaNum(val)
			if (type=="number"||type=="range") num = num.round()
			let minimum = checkFunc(data[1][0])
			let maximum = checkFunc(data[1][1])
			if (num.lt(minimum) || num.isNaN()) num = new ExpantaNum(minimum)
			if (num.gt(maximum)) num = new ExpantaNum(maximum)
			if (num.eq(el.el.value)) change = true;
			player.elementary.hc.selectors[name] = num
			el.el.value = disp(num, 8, 3, 10)
		} catch(e) {
			notifier.warn("Improper Hadronic Challenge input")
			console.log(e)
			return;
		}
	}
	if (change && name=="goalMlt" && (tmp.ach?tmp.ach[198].has:false)) { // Adjustment for conversion between mlt & uni
		let el2 = new Element("hcSelectorgoal");
		if (player.elementary.hc.selectors["goalMlt"]) {
			player.elementary.hc.selectors.goal = new ExpantaNum(1);
			el2.el.value = disp(new ExpantaNum(1), 8, 3, 10);
		} else {
			player.elementary.hc.selectors.goal = new ExpantaNum("e1e9");
			el2.el.value = disp(new ExpantaNum("e1e9"), 8, 3, 10);
		}
	} 
}

function canCompleteHC() {
	let realGoal = ExpantaNum.mul(getHCSelector("goal"), DISTANCES.uni);
	if (getHCSelector("goalMlt")) realGoal = ExpantaNum.pow(DISTANCES.mlt, getHCSelector("goal"))
	return (!(!player.elementary.hc.active)) && player.distance.gte(realGoal);
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

function HCMltMode() { return Object.keys(HC_DATA).filter(a => HC_DATA[a][2]=="mlt").some(a => getHCSelector(a)) }

function startHC() {
	if (!player.elementary.hc.unl) return
	let mltMode = tmp.elm.hc.mltMode;
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
	if (mltMode) mltReset(true, true, true);
	else elmReset(true);
	if (getHCSelector("elm")) {
		player.elementary.particles = new ExpantaNum(0);
		player.elementary.times = new ExpantaNum(0);
	}
	if (getHCSelector("fermbos")) {
		player.elementary.fermions.amount = new ExpantaNum(0);
		player.elementary.bosons.amount = new ExpantaNum(0);
	}
	if (getHCSelector("tree") && !mltMode) resetTheoryTree(true, true);
	if (getHCSelector("preontb") && !mltMode) {
		player.elementary.theory.preons.amount = new ExpantaNum(0);
		player.elementary.theory.preons.boosters = new ExpantaNum(0);
	}
	if (getHCSelector("aclron") && !mltMode) player.elementary.theory.accelerons.amount = new ExpantaNum(0);
	if (getHCSelector("infl") && !mltMode) player.elementary.theory.inflatons.amount = new ExpantaNum(0);
	if ((getHCSelector("rfrm")!="0") && !mltMode) player.elementary.foam.maxDepth = new ExpantaNum(1);
	if (getHCSelector("etrpy") && !mltMode) {
		player.elementary.entropy.amount = new ExpantaNum(0);
		player.elementary.entropy.best = new ExpantaNum(0);
		player.elementary.entropy.upgrades = [];
	}
	if (getHCSelector("sky") && !mltMode) {
		player.elementary.sky.amount = new ExpantaNum(0);
		player.elementary.sky.pions.amount = new ExpantaNum(0);
		player.elementary.sky.spinors.amount = new ExpantaNum(0);
	}
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
		for (let d in data) if (checkFunc(HC_DATA[d][3])) player.elementary.hc.selectors[d] = data[d];
		updateHCSelectorInputs()
	} catch(e) {
		notifier.warn("Invalid Hadronic Challenge data!")
	}
}