function updateSkyrmionTabs() {
	if (!tmp.elm.sky.updateTabs) tmp.elm.sky.updateTabs = function () {
		let tabs = Element.allFromClass("skyTab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(skyTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(SKY_TABS[tabs[i].id]());
		}
	};
	if (!tmp.elm.sky.showTab) tmp.elm.sky.showTab = function (name) {
		if (skyTab == name) return;
		skyTab = name;
		tmp.elm.sky.updateTabs();
	};
	tmp.elm.sky.updateTabs();
}

function updateSkyrmionMain() {
	tmp.elm.sky.gain = getSkyGain();
	tmp.elm.sky.eff = getSkyEff();
	tmp.elm.sky.upgPow = getSkyUpgPow();
}

function updatePions() {
	tmp.elm.sky.pionGain = getPionGain();
	if (!tmp.elm.sky.pionEff) tmp.elm.sky.pionEff = {}
	for (let i=1;i<=SKY_FIELDS.upgs;i++) tmp.elm.sky.pionEff[i] = SKY_FIELDS[i].pionEff(ExpantaNum.mul(player.elementary.sky.pions.field[i]||0, tmp.elm.sky.upgPow))
}

function updateSpinors() {
	tmp.elm.sky.spinorGain = getSpinorGain();
	if (!tmp.elm.sky.spinorEff) tmp.elm.sky.spinorEff = {}
	for (let i=1;i<=SKY_FIELDS.upgs;i++) tmp.elm.sky.spinorEff[i] = SKY_FIELDS[i].spinorEff(ExpantaNum.mul(player.elementary.sky.spinors.field[i]||0, tmp.elm.sky.upgPow))
}

function updateTempSkyrmions() {
	if (!tmp.elm.sky) tmp.elm.sky = {}
	
	updateSkyrmionTabs();
	updateSkyrmionMain();
	updatePions();
	updateSpinors();
}

// Skyrmions
function canSkyReset() {
	if (!player.elementary.sky.unl) return false;
	if (player.distance.lt(SKY_REQ[0])) return false;
	if (player.elementary.fermions.quarks.amount.lt(SKY_REQ[1])) return false;
	if (player.elementary.fermions.leptons.amount.lt(SKY_REQ[2])) return false;
	return true;
}

function getSkyGain() {
	if (!canSkyReset()) return false;
	let gain = player.elementary.fermions.quarks.amount.max(1).logBase(SKY_REQ[1]).times(player.elementary.fermions.leptons.amount.max(1).logBase(SKY_REQ[2])).pow(2);
	if (player.elementary.entropy.upgrades.includes(14)) gain = gain.times(tmp.elm.entropy.upgEff[14])
	if (tmp.fn) if (tmp.fn.pl) if (tmp.fn.pl.unl) gain = gain.times(tmp.fn.pl.boosts[8])
	return gain.floor();
}

function skyrmionReset(force=false) {
	if (!force) {
		if (!canSkyReset()) return;
		player.elementary.sky.amount = player.elementary.sky.amount.plus(getSkyGain().max(0));
	};
	
	player.inf.pantheon.purge.power = new ExpantaNum(0);
	player.elementary.particles = new ExpantaNum(0);
	player.elementary.fermions.amount = new ExpantaNum(0);
	player.elementary.bosons.amount = new ExpantaNum(0);
	player.elementary.bosons.gauge.photons.upgrades = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
	for (let i=0;i<Object.keys(player.elementary.bosons.gauge.gluons).length;i++) player.elementary.bosons.gauge.gluons[Object.keys(player.elementary.bosons.gauge.gluons)[i]].upgrades = [new ExpantaNum(0), new ExpantaNum(0)];
	player.elementary.theory.supersymmetry.squarks = new ExpantaNum(0);
	player.elementary.theory.supersymmetry.sleptons = new ExpantaNum(0);
	player.elementary.theory.supersymmetry.neutralinos = new ExpantaNum(0);
	player.elementary.theory.supersymmetry.charginos = new ExpantaNum(0);
	player.elementary.theory.tree.upgrades = {};
	player.elementary.theory.points = player.elementary.theory.points.plus(player.elementary.theory.tree.spent)
	player.elementary.theory.tree.spent = new ExpantaNum(0);
	player.elementary.theory.strings.amounts = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
	player.elementary.theory.strings.entangled = new ExpantaNum(0);
	player.elementary.theory.preons.amount = new ExpantaNum(0);
	if (player.elementary.entropy.upgrades.includes(17)) player.elementary.theory.preons.boosters = new ExpantaNum(0)
	player.elementary.theory.accelerons.amount = new ExpantaNum(0);
	player.elementary.theory.inflatons.amount = new ExpantaNum(0);
	player.elementary.hc.hadrons = new ExpantaNum(0);
	player.elementary.entropy.amount = new ExpantaNum(0);
	player.elementary.entropy.best = new ExpantaNum(0);
	player.elementary.entropy.upgrades = player.elementary.entropy.upgrades.filter(x => KEEP_ENTUPGS_SKY.includes(x))
	
	if (modeActive("extreme")) {
		player.plasma.amount = new ExpantaNum(0);
		player.plasma.whiteFlame = new ExpantaNum(0);
	}
	
	forceEntropyReset(true);
	tmp.elm.layer.reset(true);
	
	updateTempInf();
	updateTempElementary();
}

function getSkyPow() {
	let pow = new ExpantaNum(1)
	if (player.elementary.sky.unl && tmp.elm.sky.spinorEff) pow = pow.times(tmp.elm.sky.spinorEff[4])
	if (player.elementary.sky.unl && tmp.elm.sky.spinorEff) pow = pow.times(tmp.elm.sky.spinorEff[12])
	return pow;
}

function getSkyEff() {
	if (!player.elementary.sky.unl) return new ExpantaNum(0);
	let eff = player.elementary.sky.amount.plus(1).logBase(2).sqrt().times(2.5).times(getSkyPow()).plus(1)
	return eff;
}

function getSkyUpgPow() {
	if (!player.elementary.sky.unl) return new ExpantaNum(0);
	let pow = new ExpantaNum(1)
	if (modeActive("extreme")) pow = pow.div(2);
	if (tmp.fn) if (tmp.fn.pl.unl) pow = pow.times(tmp.fn.pl.boosts[3])
	return pow;
}

function getQuarkStacks(x) {
	let stacks = new ExpantaNum(x)
			.sub(player.elementary.fermions.quarks.type)
			.div(QUARK_NAMES.length)
			.plus(1)
			.ceil()
			.max(0);
	if (player.elementary.sky.unl && tmp.elm.sky) stacks = stacks.times(tmp.elm.sky.eff);
	return stacks;
}

function getLeptonStacks(x) {
	let stacks = new ExpantaNum(x)
			.sub(player.elementary.fermions.leptons.type)
			.div(LEPTON_NAMES.length)
			.plus(1)
			.ceil()
			.max(0);
	if (player.elementary.sky.unl && tmp.elm.sky) stacks = stacks.times(tmp.elm.sky.eff);
	return stacks;
}

function getPionGain() {
	let gain = player.elementary.sky.amount.pow(2).times(5)
	if (player.elementary.sky.unl && tmp.elm.sky.pionEff) gain = gain.times(tmp.elm.sky.pionEff[6])
	if (player.elementary.sky.unl && tmp.elm.sky.spinorEff) gain = gain.times(tmp.elm.sky.spinorEff[6])
	if (modeActive("extreme") && tmp.fn) if (tmp.fn.pl.unl) gain = gain.times(tmp.fn.pl.boosts[5])
	if (modeActive("easy")) gain = gain.times(4)
	return gain;
}

function getSpinorGain() {
	let gain = player.elementary.sky.amount.pow(2).times(5)
	if (player.elementary.sky.unl && tmp.elm.sky.pionEff) gain = gain.times(tmp.elm.sky.pionEff[6])
	if (player.elementary.sky.unl && tmp.elm.sky.spinorEff) gain = gain.times(tmp.elm.sky.spinorEff[6])
	if (modeActive("extreme") && tmp.fn) if (tmp.fn.pl.unl) gain = gain.times(tmp.fn.pl.boosts[5])
	if (modeActive("easy")) gain = gain.times(4)
	return gain;
}

function setupSkyField(type) {
	let field = new Element(type+"Field")
	let data = SKY_FIELDS;
	let html = ""
	for (let i=0;i<data.placements.length;i++) {
		html += "<table><tr>"
		for (let j=0;j<data.placements[i].length;j++) {
			let id = data.placements[i][j]
			html += "<td class='hexContainer'><div id='"+type+"Upg"+id+"' class='hexBtn' onmouseover='"+type+"Sel = "+id+";' onclick='buySkyUpg(&quot;"+type+"&quot;, "+id+")'>&"+GREEK_LETTERS[id]+";</div></td>"
		}
		html += "</tr></table>"
	}
	field.setHTML(html)
}

function getFieldUpgCostIncExp() {
	let exp = 1
	if (player.elementary.entropy.upgrades.includes(16)) exp /= 4;
	if (player.elementary.entropy.upgrades.includes(20)) exp = 0;
	return exp;
}

function getFieldUpgCost(type, id) {
	let data = SKY_FIELDS[id];
	let otherType = ["pions","spinors"].filter(x => x!=type)[0]
	let bought = ExpantaNum.pow(ExpantaNum.add(player.elementary.sky[type].field[id]||0, ExpantaNum.mul(player.elementary.sky[otherType].field[id]||0, getFieldUpgCostIncExp())), 2)
	let cost = ExpantaNum.pow(data.costMult, bought).times(data.baseCost);
	if (type=="pions") if (player.elementary.sky.unl && tmp.elm.sky.spinorEff) cost = cost.div(tmp.elm.sky.spinorEff[8])
	if (type=="spinors") if (player.elementary.sky.unl && tmp.elm.sky.pionEff) cost = cost.div(tmp.elm.sky.pionEff[8])
	return cost;
}

function getFieldUpgTarg(type, id) {
	if (!player.elementary.entropy.upgrades.includes(20)) return new ExpantaNum(0)
	let data = SKY_FIELDS[id];
	let targ = player.elementary.sky[type].amount;
	if (type=="pions") if (player.elementary.sky.unl && tmp.elm.sky.spinorEff) targ = targ.times(tmp.elm.sky.spinorEff[8])
	if (type=="spinors") if (player.elementary.sky.unl && tmp.elm.sky.pionEff) targ = targ.times(tmp.elm.sky.pionEff[8])
	targ = targ.div(data.baseCost).max(1).logBase(data.costMult).sqrt();
	return targ.plus(1).floor();
}

function buySkyUpg(type, id) {
	if (!player.elementary.sky.unl) return;
	if (player.elementary.sky.amount.lt(SKY_FIELDS[id].req)) return;
	let cost = getFieldUpgCost(type+"s", id)
	if (player.elementary.sky[type+"s"].amount.lt(cost)) return;
	player.elementary.sky[type+"s"].amount = player.elementary.sky[type+"s"].amount.sub(cost)
	player.elementary.sky[type+"s"].field[id] = ExpantaNum.add(player.elementary.sky[type+"s"].field[id]||0, 1)
}

function respecBothFields() {
	if ((Object.keys(player.elementary.sky.pions.field).length+Object.keys(player.elementary.sky.spinors.field).length)==0) return;
	if (!confirm("Are you sure you want to reset both fields? This will also force a Skyrmion reset!")) return;
	player.elementary.sky.pions.field = {}
	player.elementary.sky.spinors.field = {}
	skyrmionReset(true)
}

function respecField(type) {
	if (Object.keys(player.elementary.sky[type].field).length==0) return;
	if (!confirm("Are you sure you want to reset this field? This will also force a Skyrmion reset!")) return;
	player.elementary.sky[type].field = {}
	skyrmionReset(true)
}

function maxField(type, lims={}) {
	let limDefault = ((Object.keys(lims).length==0)?(1/0):0)
	if (!player.elementary.entropy.upgrades.includes(20) && (Object.keys(lims).length==0)) return;
	for (let i=1;i<=SKY_FIELDS.upgs;i++) {
		if (player.elementary.sky.amount.lt(SKY_FIELDS[i].req)) continue;
		let cost = getFieldUpgCost(type, i)
		if (player.elementary.sky[type].amount.lt(cost)) continue;
		let targ = getFieldUpgTarg(type, i).min(lims[i]||limDefault)
		let bulk = targ.sub(player.elementary.sky[type].field[i]||0)
		if (bulk.lt(1)) continue;
		player.elementary.sky[type].field[i] = ExpantaNum.add(ExpantaNum.max(player.elementary.sky[type].field[i]||0, 0), bulk).max(0)
	}
}

function exportField(type) {
	let data = JSON.stringify(player.elementary.sky.pions.field);
	notifier.info("Field exported!")
	copyToClipboard(data)
}

function importField(type) {
	let input = prompt("Paste your exported field data here.")
	try {
		let data = JSON.parse(input)
		if (Object.keys(data).length==0) return;
		for (let i=0;i<Object.keys(data).length;i++) {
			let key = Object.keys(data)[i]
			data[key] = new ExpantaNum(data[key]).round();
		}
		maxField(type, data)
	} catch(e) {
		notifier.error("Invalid field")
	}
}