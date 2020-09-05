const ENERGY_UPG_COSTS = {
	1: new ExpantaNum(70),
	2: new ExpantaNum(100),
	3: new ExpantaNum(200),
	4: new ExpantaNum(300),
	5: new ExpantaNum(140),
	6: new ExpantaNum(200),
	7: new ExpantaNum(300),
	8: new ExpantaNum(2500),
	9: new ExpantaNum(2800),
	10: new ExpantaNum(4000),
	11: new ExpantaNum(6000),
	12: new ExpantaNum(10000),
	13: new ExpantaNum(5000),
	14: new ExpantaNum(500000),
	15: new ExpantaNum(1e6),
	16: new ExpantaNum(56000),
	17: new ExpantaNum(80000),
	18: new ExpantaNum(120000),
	19: new ExpantaNum(250000),
	20: new ExpantaNum(1.75e6),
	21: new ExpantaNum(4e10),
	22: new ExpantaNum(4e12),
	23: new ExpantaNum(2.5e14),
	24: new ExpantaNum(4e16),
	25: new ExpantaNum(1e25),
	26: new ExpantaNum(2.975e33),
}

function getEnergyLossExp(){
	return modeActive("extreme") ? -10 : -5
}

function getBaseMotive(){
	x = player.rank.plus(1).times(player.tier.plus(1).pow(2)).times(tmp.hd.incline.plus((player.energyUpgs.includes(13)&&tmp.hd.enerUpgs) ? tmp.hd.enerUpgs[13] : 0).div(90).plus(1))
	if (x.gt(125) && modeActive("extreme")) return x.div(125).pow(.5).times(125)
	return x
}

function getTotalFurnaceUpgrades(){
	x = ExpantaNum(0)
	for (let i=0; i<player.furnace.upgrades.length; i++){
		x = x.plus(player.furnace.upgrades[i])
	}
	return x
}

function getOptimizationOneScalingStart(){
	e = ExpantaNum(1.1).pow(getTotalFurnaceUpgrades())
	return ExpantaNum(100).times(player.achievements.includes(36)?e:1)
}

function getOptimizationOneEffect(){
	op1 = tmp.hd.motive.max(player.energyUpgs.includes(5)?1:0).plus(1).pow(0.75).pow((player.energyUpgs.includes(5)&&tmp.hd.enerUpgs[5]) ? tmp.hd.enerUpgs[5].div(100).plus(1) : 1).pow(tmp.hd.superEnEff2)
	if (op1.gt(getOptimizationOneScalingStart()) && modeActive("extreme")) {
		e = getOptimizationOneScalingStart().logBase(getOptimizationOneScalingStart().log10().times(5))
		return op1.log10().times(5).pow(e)
	}
	return op1
}

function getConfidenceOneEffect(){
	co1 = tmp.hd.incline.plus((player.energyUpgs.includes(13)&&tmp.hd.enerUpgs[13]) ? tmp.hd.enerUpgs[13] : 0).div(90).plus(1).pow(3).pow((player.energyUpgs.includes(7)&&tmp.hd.enerUpgs[7]) ? tmp.hd.enerUpgs[7].div(100).plus(1) : 1).pow(tmp.hd.superEnEff2)
	if (co1 > 3 && modeActive("extreme")) return co1.div(3).pow(.5).times(3)
	return co1
}

function updateTempHikersDream() {
	if (!tmp.hd) tmp.hd = {}
	
	tmp.hd.superEn = player.genLvl.pow(2).times(player.geners).floor()
	tmp.hd.superEnEff = tmp.hd.superEn.plus(1).pow(player.geners).log10().plus(1).log10().plus(1).pow(2).times(player.geners)
	tmp.hd.superEnEff2 = tmp.hd.superEn.times(player.geners.sub(1)).plus(1).times(10).slog(10).max(1).log10().times(1.6).plus(player.inf.endorsements.gt(25)?0.011:0).plus(1).times((tmp.hd.enerUpgs&&player.energyUpgs.includes(26)) ? tmp.hd.enerUpgs[26].div(100).plus(1) : 1)
	
	if (tmp.hd.futureIncl?tmp.hd.futureIncl.length>0:false) {
		tmp.hd.incline = tmp.hd.futureIncl[0]
		tmp.hd.futureIncl.shift();
	} else tmp.hd.incline = baseIncline(player.distance)
	tmp.hd.inclinePow = new ExpantaNum(1)
	if (player.energyUpgs.includes(4) && tmp.hd.enerUpgs) tmp.hd.inclinePow = tmp.hd.inclinePow.times(tmp.hd.enerUpgs[4])
	let incl = tmp.hd.incline
	if (incl.gte(89.95)) incl = ExpantaNum.sub(90, ExpantaNum.div(90, ExpantaNum.div(90, ExpantaNum.sub(90, incl)).pow(2).div(1800)))
	tmp.hd.inclineRed = ExpantaNum.sub(90, incl).div(90).root(tmp.hd.inclinePow)
	tmp.hd.energyLoss = tmp.hd.inclineRed.pow(getEnergyLossExp())
	if (player.energyUpgs.includes(2) && tmp.hd.enerUpgs) tmp.hd.energyLoss = tmp.hd.energyLoss.div(tmp.hd.enerUpgs[2])
	
	tmp.hd.totalMotive = getBaseMotive()
	if (player.energyUpgs.includes(3) && tmp.hd.enerUpgs) tmp.hd.totalMotive = tmp.hd.totalMotive.times(tmp.hd.enerUpgs[3])
	if (player.inf.endorsements.gte(10)) tmp.hd.totalMotive = tmp.hd.totalMotive.times(tmp.hd.superEnEff)
	tmp.hd.motive = tmp.hd.totalMotive.sub(player.spentMotive).sub(player.spentMotiveGens).max(0);
	if (player.energyUpgs.includes(24)) tmp.hd.motive = tmp.hd.motive.max(tmp.hd.enerUpgs ? tmp.hd.enerUpgs[24] : 0)
	tmp.hd.enEff = player.energy.div(100)
	if (player.energyUpgs.includes(1) && tmp.hd.enerUpgs) tmp.hd.enEff = tmp.hd.enEff.times(tmp.hd.enerUpgs[1])

	tmp.hd.simEn = player.energy.min(getEnergyLim()).max(tmp.hd.superEn)
	if (tmp.hd.simEn.gt(100)) tmp.hd.simEn = tmp.hd.simEn.log10().times(50)
	if (!tmp.hd.enerUpgs) tmp.hd.enerUpgs = {}
	tmp.hd.enerUpgs[1] = getOptimizationOneEffect()
	if (tmp.hd.enerUpgs[1].gte("1e2500")) tmp.hd.enerUpgs[1] = tmp.hd.enerUpgs[1].logBase("1e2500").pow(825).times("1e2500").min(tmp.hd.enerUpgs[1])
	tmp.hd.enerUpgs[2] = tmp.hd.motive.max(player.energyUpgs.includes(6)?1:0).plus(1).log10().times(2).plus(1).pow((player.energyUpgs.includes(6)&&tmp.hd.enerUpgs[6]) ? tmp.hd.enerUpgs[6].div(100).plus(1) : 1).pow(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[3] = getConfidenceOneEffect()
	if (tmp.hd.enerUpgs[3].gte(1e24)) tmp.hd.enerUpgs[3] = tmp.hd.enerUpgs[3].log10().pow(1.5).times(1e24/24).min(tmp.hd.enerUpgs[3])
	tmp.hd.enerUpgs[4] = player.rockets.plus(1).times(10).slog(10).times((player.energyUpgs.includes(8)&&tmp.hd.enerUpgs[8]) ? (tmp.hd.enerUpgs[8].div(100).plus(1)) : 1).times(tmp.hd.superEnEff2)
	if (tmp.hd.enerUpgs[4].gte(32.5)) tmp.hd.enerUpgs[4] = tmp.hd.enerUpgs[4].logBase(2).pow(2.157034).min(tmp.hd.enerUpgs[4])
	tmp.hd.enerUpgs[5] = tmp.hd.simEn.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(9)&&tmp.hd.enerUpgs[9])?tmp.hd.enerUpgs[9].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[6] = tmp.hd.simEn.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(10)&&tmp.hd.enerUpgs[10])?tmp.hd.enerUpgs[10].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[7] = tmp.hd.totalMotive.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(11)&&tmp.hd.enerUpgs[11])?tmp.hd.enerUpgs[11].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[8] = tmp.hd.incline.plus((player.energyUpgs.includes(13)&&tmp.hd.enerUpgs[13]) ? tmp.hd.enerUpgs[13] : 0).div(90).times(100).times((player.energyUpgs.includes(12)&&tmp.hd.enerUpgs[12])?tmp.hd.enerUpgs[12].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[9] = player.tr.cubes.plus(1).log10().plus(1).log10().times(100).times((player.energyUpgs.includes(16)&&tmp.hd.enerUpgs[16])?tmp.hd.enerUpgs[16].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[10] = player.tr.cubes.plus(1).log10().plus(1).log10().pow(0.1).times(10).times((player.energyUpgs.includes(17)&&tmp.hd.enerUpgs[17])?tmp.hd.enerUpgs[17].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[11] = player.tr.cubes.plus(1).log10().plus(1).log10().sqrt().times(50).times((player.energyUpgs.includes(18)&&tmp.hd.enerUpgs[18])?tmp.hd.enerUpgs[18].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[12] = player.tr.cubes.plus(1).log10().plus(1).log10().pow(0.2).times(20).times((player.energyUpgs.includes(19)&&tmp.hd.enerUpgs[19])?tmp.hd.enerUpgs[19].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[13] = new ExpantaNum(6).times((player.energyUpgs.includes(14)&&tmp.hd.enerUpgs[14]) ? tmp.hd.enerUpgs[14].div(100).plus(1) : 1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[14] = ExpantaNum.sub(3, ExpantaNum.div(2, player.pathogens.amount.plus(1).log10().plus(1).log10().plus(1))).times((player.energyUpgs.includes(15)&&tmp.hd.enerUpgs[15]) ? tmp.hd.enerUpgs[15].div(100).plus(1) : 1).sub(1).times(100).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[15] = ExpantaNum.sub(1.5, ExpantaNum.div(0.5, player.pathogens.amount.plus(1).log10().plus(1).log10().plus(1).log10().plus(1))).sub(1).times(100).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[16] = player.collapse.cadavers.plus(1).log10().plus(1).log10().times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(100).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[17] = player.collapse.lifeEssence.plus(1).log10().plus(1).log10().pow(0.1).times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(10).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[18] = player.pathogens.amount.plus(1).log10().plus(1).log10().sqrt().times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(50).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[19] = player.pathogens.amount.plus(1).log10().plus(1).log10().pow(0.2).times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(100).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[20] = tmp.hd.motive.max(player.inf.endorsements.gte(10)?tmp.hd.totalMotive:0).plus(2).log10().times(tmp.hd.simEn.div(4.5).plus(10)).times((player.energyUpgs.includes(21)&&tmp.hd.enerUpgs[21]) ? tmp.hd.enerUpgs[21].div(100).plus(1) : 1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[21] = tmp.hd.superEn.plus(1).log10().plus(1).log10().plus(1).sqrt().sub(1).times(100).times((player.energyUpgs.includes(22)&&tmp.hd.enerUpgs[22]) ? tmp.hd.enerUpgs[22].div(100).plus(1) : 1).times((player.energyUpgs.includes(23)&&tmp.hd.enerUpgs[23]) ? tmp.hd.enerUpgs[23].div(100).plus(1) : 1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[22] = tmp.hd.superEn.plus(1).log10().plus(1).log10().plus(1).sub(1).times(135).times((player.energyUpgs.includes(23)&&tmp.hd.enerUpgs[23]) ? tmp.hd.enerUpgs[23].div(100).plus(1) : 1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[23] = tmp.hd.superEn.plus(1).log10().plus(1).log10().plus(1).sqrt().sub(1).times(105).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[24] = player.bestMotive.sqrt().times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[25] = player.bestMotive.plus(1).log10().plus(1).log10().plus(1).log10().plus(1).times(tmp.hd.superEnEff2)
	tmp.hd.enerUpgs[26] = player.bestMotive.plus(1).times(10).slog(10).max(1).sub(1).times(12)
	
	tmp.hd.energyGen = ExpantaNum.pow(2, player.genLvl.times(player.energy.plus(1).logBase(1.004).sqrt()).sqrt()).sub(1).times(player.geners)
}

function quickReset() {
	tmp.ranks.layer.reset(true)
}

function refillEnergy() {
	if (modeActive('hard') && player.energy.neq(0)) return
	if (!player.canRefill) return
	player.energy = new ExpantaNum(100)
	player.canRefill = modeActive('hard')
}

function respecEnergyUpgs() {
	if (player.energyUpgs.length==0) return
	if (!confirm("Are you sure you want to respec your Energy Upgrades to get your Motive back? This will also perform a Quick Reset.")) return
	player.spentMotive = new ExpantaNum(0);
	player.energyUpgs = [];
	quickReset();
}

function buyEnergyUpg(x) {
	if (player.energyUpgs.includes(x)) return
	let cost = ENERGY_UPG_COSTS[x]
	if (tmp.hd.motive.lt(cost)) return
	player.spentMotive = player.spentMotive.plus(cost)
	player.energyUpgs.push(x)
}

function isEnergyUpgShown(x) {
	if (x<=3) return true;
	else if (x<=8) return player.rf.gte(1)||player.automation.unl||player.collapse.unl||player.inf.unl
	else if (x<=13) return player.tr.unl||player.collapse.unl||player.inf.unl
	else if (x<=20) return player.pathogens.unl||player.inf.unl
	else if (x<=23) return player.inf.endorsements.gte(10)
	else if (x<=25) return player.inf.endorsements.gte(15)
	else if (x<=26) return player.inf.endorsements.gte(28)
	
	return false;
}

function baseIncline(d) {
	if (d.gte(4.4e26)) d = d.pow(2).div(4.4e26)
	if (d.gte("4.4e2026")) d = d.pow(5).div(ExpantaNum.pow("4.4e2026", 4))
	let incl = d.gte(1e3) ? ExpantaNum.sub(90, ExpantaNum.div(90, d.div(1e3).log10().div(10).plus(1))) : new ExpantaNum(0)
	return incl.max(0)
}

function calcInclines() {
	if (!tmp.hd) tmp.hd = {}
	let d = player.distance
	let baseV = adjustGen(player.velocity, "dist").times(tmp.hd.enEff?tmp.hd.enEff:(1/0)).times(nerfActive("noTS") ? 1 : tmp.timeSpeed)
	let v = new ExpantaNum(baseV)
	let maxError = 1.001
	let incl = baseIncline(d)
	let newIncl = new ExpantaNum(90)
	let reduc;
	let a = tmp.acc||new ExpantaNum(1/0)
	let iter = 0
	tmp.hd.futureIncl = []
	while (newIncl.div(incl).gt(maxError)&&iter<25) {
		incl = baseIncline(d)
		reduc = ExpantaNum.sub(90, incl).div(90)
		v = v.plus(a.pow(reduc).div(50))
		d = player.distance.plus(adjustGen(v, "dist").times(tmp.hd.enEff?tmp.hd.enEff:player.energy).times(nerfActive("noTS") ? 1 : tmp.timeSpeed).div(50))
		newIncl = baseIncline(d)
		iter++
		tmp.hd.futureIncl.push(newIncl)
	}
}

// Energy Tabs

const EN_TABBTN_SHOWN = {
	mainEN: function() { return true },
	generator: function() { return player.inf.endorsements.gte(10) },
}

function isENTabShown(name) {
	return enTab == name;
}

function getENTabBtnsShown() {
	let btns = [];
	for (j = 0; j < Object.keys(EN_TABBTN_SHOWN).length; j++)
		if (Object.values(EN_TABBTN_SHOWN)[i]()) btns.push(Object.keys(EN_TABBTN_SHOWN)[i]);
	return btns;
}

function updateENTabs() {
	var tabs = document.getElementsByClassName("enTab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isENTabShown(tabs[i].id));
		var elT = new Element(tabs[i].id + "tabbtn");
		elT.changeStyle("visibility", getENTabBtnsShown().includes(tabs[i].id)?"visible":"hidden");
	}
}

function showENTab(name) {
	enTab = name;
}

// The Generator

function getEnergyLim() {
	let lim = new ExpantaNum(100)
	if (player.inf.endorsements.gte(10)) {
		let lvl = player.genLvl
		if (lvl.gte(6)) lvl = lvl.times(6).sqrt()
		if (lvl.gte(3)) lvl = lvl.times(1.1).sub(0.3)
		lim = lim.times(ExpantaNum.pow(5, lvl.pow(0.75))).times(player.geners.pow(2))
	}
	if (player.energyUpgs.includes(25)) lim = lim.times(tmp.hd.enerUpgs ? tmp.hd.enerUpgs[25] : 1).max(1)
	return lim
}

function getGenCost() {
	let g = player.genLvl.div(player.geners.pow(0.2))
	if (g.gte(5)) g = ExpantaNum.pow(1.2, g.sub(5)).times(g)
	let cost = ExpantaNum.pow(8, ExpantaNum.pow(2, g.pow(0.75)).sub(1)).times(2.5e9)
	return cost
}

function buyGen() {
	if (!modeActive("hikers_dream")) return
	if (player.inf.endorsements.lt(10)) return
	let cost = getGenCost()
	if (tmp.hd.motive.lt(cost)) return
	player.spentMotiveGens = player.spentMotiveGens.plus(cost)
	player.genLvl = player.genLvl.plus(1)
}

function respecGens() {
	if (player.genLvl.plus(player.geners).eq(1)) return
	if (!confirm("Are you sure you want to respec The Generators to get your Motive back? This will also perform a Quick Reset.")) return
	player.spentMotiveGens = new ExpantaNum(0);
	player.genLvl = new ExpantaNum(0);
	player.geners = new ExpantaNum(1);
	quickReset();
}

function getNewGenCost() {
	let g = player.geners.sub(1)
	if (g.gte(5)) g = ExpantaNum.pow(1.2, g.sub(5)).times(g)
	let cost = ExpantaNum.pow(2, g.plus(1).pow(3)).times(5e29)
	return cost
}

function newGen() {
	if (!modeActive("hikers_dream")) return
	if (player.inf.endorsements.lt(21)) return
	let cost = getNewGenCost()
	if (tmp.hd.motive.lt(cost)) return
	player.spentMotiveGens = player.spentMotiveGens.plus(cost)
	player.geners = player.geners.plus(1)
}
