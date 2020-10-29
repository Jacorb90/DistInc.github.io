function updateTempPlasma() {
	if (!tmp.fn.pl) tmp.fn.pl = {}
	tmp.fn.pl.unl = (modeActive("extreme") && tmp.ach[171].has)
	tmp.fn.pl.exp = getPlasmaExp()
	tmp.fn.pl.wfGain = getWhiteFlameGain()
	if (!tmp.fn.pl.boosts) tmp.fn.pl.boosts = {};
	for (let i=1;i<=PLASMA_BOOSTS.upgs;i++) tmp.fn.pl.boosts[i] = player.plasma.boosts.gte(i)?PLASMA_BOOSTS[i].eff(player.plasma[PLASMA_BOOSTS[i].type=="plasmic"?"amount":"whiteFlame"].pow((i<9&&tmp.fn.pl.boosts[9])?tmp.fn.pl.boosts[9]:1)):PLASMA_BOOSTS[i].baseEff;
}

function getPlasmaExp() {
	if (tmp.fn?(!tmp.fn.pl.unl):true) return new ExpantaNum(0);
	let exp = player.elementary.sky.amount.plus(1).log10().plus(1);
	if (tmp.fn.pl.boosts) exp = exp.times(tmp.fn.pl.boosts[2])
	if (player.elementary.entropy.upgrades.includes(24)) exp = exp.times(tmp.elm.entropy.upgEff[24])
	return exp;
}

function getWhiteFlameGain() {
	if (tmp.fn?(!tmp.fn.pl.unl):true) return new ExpantaNum(0);
	let pl = player.plasma.amount.plus(1);
	if (pl.gte(1e125)) pl = pl.log10().div(125).times(1e100).pow(1.25)
	let gain = pl.pow(player.furnace.blueFlame.plus(1).sqrt().div(25)).sub(1);
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

function canBuyPlasmaBoost() {
	return !(!PLASMA_BOOSTS[player.plasma.boosts.toNumber()+1])
}

function buyPlasmaBoost() {
	if (tmp.fn?(!tmp.fn.pl.unl):true) return;
	if (!canBuyPlasmaBoost()) return;
	let cost = getPlasmaBoostReq();
	if (player.plasma.whiteFlame.lt(cost)) return;
	player.plasma.whiteFlame = player.plasma.whiteFlame.sub(cost);
	player.plasma.boosts = player.plasma.boosts.plus(1);
}

const PLASMA_BOOSTS = {
	upgs: 9,
	rows: 3,
	cols: 3,
	1: {
		type: "plasmic",
		desc: "The Extreme mode nerf to Foam gain starts later.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return amt.plus(1).log10().times(tmp.fn.pl.exp).plus(1).pow(3) },
		effD: function(e) { return showNum(e)+"x later" },
	},
	2: {
		type: "gleaming",
		desc: "Boost the Plasma Exponent.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return amt.plus(1).log10().sqrt().div(2).plus(1) },
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
		eff: function(amt) { return amt.plus(1).log10().plus(1).log10().times(250) },
		effD: function(e) { return showNum(e)+" later" },
	},
	5: {
		type: "plasmic",
		desc: "Boost Pion/Spinor gain.",
		baseEff: new ExpantaNum(1),
		eff: function(amt) { return amt.plus(1).root(10) },
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