function updateTempPlasma() {
	if (!tmp.fn.pl) tmp.fn.pl = {}
	tmp.fn.pl.unl = (modeActive("extreme") && tmp.ach[171].has)
	tmp.fn.pl.exp = getPlasmaExp()
	tmp.fn.pl.wfGain = getWhiteFlameGain()
	if (!tmp.fn.pl.boosts) tmp.fn.pl.boosts = {};
	for (let i=1;i<=PLASMA_BOOSTS.upgs;i++) tmp.fn.pl.boosts[i] = player.plasma.boosts.gte(i)?PLASMA_BOOSTS[i].eff():PLASMA_BOOSTS[i].baseEff;
}

function getPlasmaExp() {
	if (tmp.fn?(!tmp.fn.pl.unl):true) return new ExpantaNum(0);
	let exp = player.elementary.sky.amount.plus(1).log10().plus(1);
	if (tmp.fn.pl.boosts) exp = exp.times(tmp.fn.pl.boosts[2])
	return exp;
}

function getWhiteFlameGain() {
	if (tmp.fn?(!tmp.fn.pl.unl):true) return new ExpantaNum(0);
	return player.plasma.amount.plus(1).pow(player.furnace.blueFlame.plus(1).sqrt().div(25)).sub(1)
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
	upgs: 3,
	rows: 1,
	cols: 3,
	1: {
		type: "plasmic",
		desc: "The Extreme mode nerf to Foam gain starts later.",
		baseEff: new ExpantaNum(1),
		eff: function() { return player.plasma.amount.plus(1).log10().times(tmp.fn.pl.exp).plus(1).pow(3) },
		effD: function(e) { return showNum(e)+"x later" },
	},
	2: {
		type: "gleaming",
		desc: "Boost the Plasma Exponent.",
		baseEff: new ExpantaNum(1),
		eff: function() { return player.plasma.whiteFlame.plus(1).log10().sqrt().div(2).plus(1) },
		effD: function(e) { return showNum(e)+"x" },
	},
	3: {
		type: "plasmic",
		desc: "All Pion/Spinor Upgrades are stronger.",
		baseEff: new ExpantaNum(1),
		eff: function() { return ExpantaNum.sub(1.5, ExpantaNum.div(1, player.plasma.amount.plus(1).log10().plus(1).log10().plus(1).pow(2))) },
		effD: function(e) { return showNum(e.sub(1).times(100))+"% stronger" },
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
			html += "<div id='plB"+current+"' class='plB "+cd.type+"'>"
			html += cd.desc+"<br><br>"
			html += "Currently: <span id='plB"+current+"Curr'></span><br>"
			html += "</div>"
			current++;
		}
		html += "</div>"
	}
	boosts.setHTML(html);
}