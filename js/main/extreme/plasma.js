function updateTempPlasma() {
	if (!tmp.fn.pl) tmp.fn.pl = {}
	tmp.fn.pl.unl = (modeActive("extreme") && tmp.ach[171].has)
	tmp.fn.pl.exp = getPlasmaExp()
	tmp.fn.pl.wfGain = getWhiteFlameGain()
	if (!tmp.fn.pl.boosts) tmp.fn.pl.boosts = {};
	for (let i=1;i<=PLASMA_BOOSTS.upgs();i++) tmp.fn.pl.boosts[i] = player.plasma.boosts.gte(i)?PLASMA_BOOSTS[i].eff(player.plasma[PLASMA_BOOSTS[i].type=="plasmic"?"amount":"whiteFlame"].pow((i<9&&tmp.fn.pl.boosts[9])?tmp.fn.pl.boosts[9]:1)):PLASMA_BOOSTS[i].baseEff;
}

function getPlasmaExp() {
	if (tmp.fn?(!tmp.fn.pl.unl):true) return new ExpantaNum(0);
	let exp = player.elementary.sky.amount.plus(1).log10().plus(1);
	if (hasMltMilestone(13)) exp = exp.plus(player.inf.derivatives.unlocks);
	if (tmp.fn.pl.boosts) exp = exp.times(tmp.fn.pl.boosts[2])
	if (player.elementary.entropy.upgrades.includes(24)) exp = exp.times(tmp.elm.entropy.upgEff[24]);
	if (tmp.fn.pl.boosts) exp = exp.times(tmp.fn.pl.boosts[12]);
	
	let ach178amt = player.elementary.entropy.upgrades.includes(35)?2.5e4:250
	if (modeActive("extreme") && tmp.ach[178].has && exp.lt(ach178amt)) {
		if (exp.lt(ach178amt/3)) exp = exp.times(2);
		else exp = ExpantaNum.sub(ach178amt, ExpantaNum.div(ach178amt/3, ExpantaNum.div(ach178amt, ExpantaNum.sub(ach178amt, exp).times(1.5).max(0.001))))
	}
	return exp;
}

function getWhiteFlameGain() {
	if (tmp.fn?(!tmp.fn.pl.unl):true) return new ExpantaNum(0);
	let pl = player.plasma.amount.plus(1);
	if (pl.gte(1e125)) pl = pl.log10().div(125).times(1e100).pow(1.25)
	let gain = pl.pow(player.furnace.blueFlame.plus(1).sqrt().div(25)).sub(1);
	if (hasMltMilestone(14)) gain = gain.times(10);
	if (hasMltMilestone(17)) gain = gain.times(100);
	if (hasMltMilestone(18)) gain = gain.times(ExpantaNum.pow(20, Math.max(mltMilestonesGotten()-17, 0)));
	if (tmp.ach[191].has) gain = gain.times(5);
	return gain;
}

function getPlasmaBoostType(n, cap=false) {
	n = new ExpantaNum(n).toNumber();
	let type = PLASMA_BOOSTS[n]?PLASMA_BOOSTS[n].type:"???";
	return cap?capitalFirst(type):type;
}

function getPlasmaBoostReq() {
	let bought = player.plasma.boosts;
	let req = ExpantaNum.pow(50, bought.pow(1.25)).times(250)
	return req;
}

function getPlasmaBoostBulk() {
	let amt = player.plasma.whiteFlame;
	let target = amt.div(250).max(1).logBase(50).root(1.25)
	return target.plus(1).floor();
}

function canBuyPlasmaBoost() {
	return !(!PLASMA_BOOSTS[player.plasma.boosts.toNumber()+1])
}

function buyPlasmaBoost(max=false) {
	if (tmp.fn?(!tmp.fn.pl.unl):true) return;
	if (!canBuyPlasmaBoost()) return;
	let cost = getPlasmaBoostReq();
	if (player.plasma.whiteFlame.lt(cost)) return;
	if (max) player.plasma.boosts = player.plasma.boosts.max(getPlasmaBoostBulk());
	else {
		player.plasma.whiteFlame = player.plasma.whiteFlame.sub(cost);
		player.plasma.boosts = player.plasma.boosts.plus(1);
	}
}

const PLASMA_BOOSTS = {
	upgs() { return 12 },
	rows: 4,
	cols: 3,
	1: {
		type: "plasmic",
		desc: "The Extreme mode nerf to Foam gain starts later.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { 
			let eff = amt.plus(1).log10().times(tmp.fn.pl.exp).plus(1).pow(3);
			if (tmp.fn.pl.boosts[11]) eff = eff.pow(tmp.fn.pl.boosts[11]);
			return eff;
		},
		effD: function(e) { return showNum(e)+"x later" },
	},
	2: {
		type: "gleaming",
		desc: "Boost the Plasma Exponent.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { 
			let eff = amt.plus(1).log10().sqrt().div(2).plus(1);
			if (tmp.fn.pl.boosts[11]) eff = eff.times(tmp.fn.pl.boosts[11]);
			return eff;
		},
		effD: function(e) { return showNum(e)+"x" },
	},
	3: {
		type: "plasmic",
		desc: "All Pion/Spinor Upgrades are stronger.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return ExpantaNum.sub(1.5, ExpantaNum.div(1, amt.plus(1).log10().plus(1).log10().plus(1).pow(2))) },
		effD: function(e) { return showNum(e.sub(1).times(100))+"% stronger" },
	},
	4: {
		type: "gleaming",
		desc: "Make all Rank Cheapener cost scalings start later.",
		baseEff: new ExpantaNum(0),
		eff: function(amt) { 
			let eff = amt.plus(1).log10().plus(1).log10().times(250);
			if (tmp.fn.pl.boosts[11]) eff = eff.times(tmp.fn.pl.boosts[11]);
			return eff;
		},
		effD: function(e) { return showNum(e)+" later" },
	},
	5: {
		type: "plasmic",
		desc: "Boost Pion/Spinor gain.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { 
			let mult = amt.plus(1).root(10);
			if (mult.gte(1e250)) mult = ExpantaNum.pow(1e250, mult.logBase(1e250).sqrt());
			return mult;
		},
		effD: function(e) { return showNum(e)+"x" },
	},
	6: {
		type: "gleaming",
		desc: "Multiply the Derivative Boost Base.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return amt.plus(1).pow(1e4) },
		effD: function(e) { return showNum(e)+"x" },
	},
	7: {
		type: "plasmic",
		desc: "EFU1 & EFU3 use stronger multipliers.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return amt.plus(1).root(200) },
		effD: function(e) { return showNum(e)+"x" },
	},
	8: {
		type: "gleaming",
		desc: "EFU13's first effect & Skyrmion gain are buffed.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return amt.plus(1).log10().plus(1).log10().plus(1).sqrt() },
		effD: function(e) { return showNum(e)+"x" },
	},
	9: {
		type: "plasmic",
		desc: "All previous Plasmic & Gleaming Boosts use their respective resource more effectively.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return amt.plus(1).times(10).slog(10).div(1.75).plus(1) },
		effD: function(e) { return "+"+showNum(e.sub(1).times(100))+"%" },
	},
	10: {
		type: "gleaming",
		desc: "The Magma cost increases slower.",
		baseEff: new ExpantaNum(0),
		eff: function(amt) { return ExpantaNum.sub(0.95, ExpantaNum.div(0.95, amt.plus(1).log10().plus(1).log10().div(2).plus(1))) },
		effD: function(e) { return showNum(e.times(100))+"% slower" },
	},
	11: {
		type: "plasmic",
		desc: "The first Plasmic Boost and the first two Gleaming Boosts are stronger based on your Best Entropy.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return amt.plus(1).log10().times(player.elementary.entropy.best.plus(1)).plus(1).log10().div(10).plus(1) },
		effD: function(e) { return showNum(e.sub(1).times(100))+"% stronger" },
	},
	12: {
		type: "gleaming",
		desc: "Multiversal Energy boosts the Plasma exponent.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return player.mlt.energy.times(amt.plus(1).log10()).plus(1).log10().cbrt().plus(1) },
		effD: function(e) { return showNum(e)+"x" },
	},
}

function setupPlasmaBoosts() {
	let boosts = new Element("plasmaBoosts");
	let html = "";
	let data = PLASMA_BOOSTS;
	let current = 1;
	for (let r=1;r<=data.rows;r++) {
		html += "<div class='flexRow'>"
		for (let c=1;c<=data.cols;c++) {
			let cd = data[current];
			if (!cd) continue;
			html += "<div id='plB"+current+"' class='plB "+cd.type+"'><span class='plBCont'>"
			html += cd.desc+"<br><br>"
			html += "Currently: <span id='plB"+current+"Curr'></span>"
			html += "</span></div>"
			current++;
		}
		html += "</div>"
	}
	boosts.setHTML(html);
}