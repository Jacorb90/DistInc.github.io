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
}

function updateTempHikersDream() {
	if (!tmp.hd) tmp.hd = {}
	if (tmp.hd.futureIncl?tmp.hd.futureIncl.length>0:false) {
		tmp.hd.incline = tmp.hd.futureIncl[0]
		tmp.hd.futureIncl.shift();
	} else tmp.hd.incline = baseIncline(player.distance)
	tmp.hd.inclinePow = new ExpantaNum(1)
	if (player.energyUpgs.includes(4) && tmp.hd.enerUpgs) tmp.hd.inclinePow = tmp.hd.inclinePow.times(tmp.hd.enerUpgs[4])
	tmp.hd.inclineRed = ExpantaNum.sub(90, tmp.hd.incline).div(90).root(tmp.hd.inclinePow)
	tmp.hd.energyLoss = tmp.hd.inclineRed.pow(-5)
	if (player.energyUpgs.includes(2) && tmp.hd.enerUpgs) tmp.hd.energyLoss = tmp.hd.energyLoss.div(tmp.hd.enerUpgs[2])
	tmp.hd.totalMotive = player.rank.plus(1).times(player.tier.plus(1).pow(2)).times(tmp.hd.incline.plus((player.energyUpgs.includes(13)&&tmp.hd.enerUpgs) ? tmp.hd.enerUpgs[13] : 0).div(90).plus(1))
	if (player.energyUpgs.includes(3) && tmp.hd.enerUpgs) tmp.hd.totalMotive = tmp.hd.totalMotive.times(tmp.hd.enerUpgs[3])
	tmp.hd.motive = tmp.hd.totalMotive.sub(player.spentMotive).max(0);
	tmp.hd.enEff = player.energy.div(100)
	if (player.energyUpgs.includes(1) && tmp.hd.enerUpgs) tmp.hd.enEff = tmp.hd.enEff.times(tmp.hd.enerUpgs[1])
	
	if (!tmp.hd.enerUpgs) tmp.hd.enerUpgs = {}
	tmp.hd.enerUpgs[1] = tmp.hd.motive.max(player.energyUpgs.includes(5)?1:0).plus(1).pow(0.75).pow((player.energyUpgs.includes(5)&&tmp.hd.enerUpgs[5]) ? tmp.hd.enerUpgs[5].div(100).plus(1) : 1)
	tmp.hd.enerUpgs[2] = tmp.hd.motive.max(player.energyUpgs.includes(6)?1:0).plus(1).log10().times(2).plus(1).pow((player.energyUpgs.includes(6)&&tmp.hd.enerUpgs[6]) ? tmp.hd.enerUpgs[6].div(100).plus(1) : 1)
	tmp.hd.enerUpgs[3] = tmp.hd.incline.plus((player.energyUpgs.includes(13)&&tmp.hd.enerUpgs[13]) ? tmp.hd.enerUpgs[13] : 0).div(90).plus(1).pow(3).pow((player.energyUpgs.includes(7)&&tmp.hd.enerUpgs[7]) ? tmp.hd.enerUpgs[7].div(100).plus(1) : 1)
	tmp.hd.enerUpgs[4] = player.rockets.plus(1).times(10).slog(10).times((player.energyUpgs.includes(8)&&tmp.hd.enerUpgs[8]) ? (tmp.hd.enerUpgs[8].div(100).plus(1)) : 1)
	tmp.hd.enerUpgs[5] = player.energy.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(9)&&tmp.hd.enerUpgs[9])?tmp.hd.enerUpgs[9].div(100).plus(1):1)
	tmp.hd.enerUpgs[6] = player.energy.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(10)&&tmp.hd.enerUpgs[10])?tmp.hd.enerUpgs[10].div(100).plus(1):1)
	tmp.hd.enerUpgs[7] = tmp.hd.totalMotive.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(11)&&tmp.hd.enerUpgs[11])?tmp.hd.enerUpgs[11].div(100).plus(1):1)
	tmp.hd.enerUpgs[8] = tmp.hd.incline.plus((player.energyUpgs.includes(13)&&tmp.hd.enerUpgs[13]) ? tmp.hd.enerUpgs[13] : 0).div(90).times(100).times((player.energyUpgs.includes(12)&&tmp.hd.enerUpgs[12])?tmp.hd.enerUpgs[12].div(100).plus(1):1)
	tmp.hd.enerUpgs[9] = player.tr.cubes.plus(1).log10().plus(1).log10().times(100).times((player.energyUpgs.includes(16)&&tmp.hd.enerUpgs[16])?tmp.hd.enerUpgs[16].div(100).plus(1):1)
	tmp.hd.enerUpgs[10] = player.tr.cubes.plus(1).log10().plus(1).log10().pow(0.1).times(10).times((player.energyUpgs.includes(17)&&tmp.hd.enerUpgs[17])?tmp.hd.enerUpgs[17].div(100).plus(1):1)
	tmp.hd.enerUpgs[11] = player.tr.cubes.plus(1).log10().plus(1).log10().sqrt().times(50).times((player.energyUpgs.includes(18)&&tmp.hd.enerUpgs[18])?tmp.hd.enerUpgs[18].div(100).plus(1):1)
	tmp.hd.enerUpgs[12] = player.tr.cubes.plus(1).log10().plus(1).log10().pow(0.2).times(20).times((player.energyUpgs.includes(19)&&tmp.hd.enerUpgs[19])?tmp.hd.enerUpgs[19].div(100).plus(1):1)
	tmp.hd.enerUpgs[13] = new ExpantaNum(6).times((player.energyUpgs.includes(14)&&tmp.hd.enerUpgs[14]) ? tmp.hd.enerUpgs[14].div(100).plus(1) : 1)
	tmp.hd.enerUpgs[14] = ExpantaNum.sub(3, ExpantaNum.div(2, player.pathogens.amount.plus(1).log10().plus(1).log10().plus(1))).times((player.energyUpgs.includes(15)&&tmp.hd.enerUpgs[15]) ? tmp.hd.enerUpgs[15].div(100).plus(1) : 1).sub(1).times(100)
	tmp.hd.enerUpgs[15] = ExpantaNum.sub(1.5, ExpantaNum.div(0.5, player.pathogens.amount.plus(1).log10().plus(1).log10().plus(1).log10().plus(1))).sub(1).times(100)
	tmp.hd.enerUpgs[16] = player.collapse.cadavers.plus(1).log10().plus(1).log10().times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(100)
	tmp.hd.enerUpgs[17] = player.collapse.lifeEssence.plus(1).log10().plus(1).log10().pow(0.1).times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(10)
	tmp.hd.enerUpgs[18] = player.pathogens.amount.plus(1).log10().plus(1).log10().sqrt().times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(50)
	tmp.hd.enerUpgs[19] = player.pathogens.amount.plus(1).log10().plus(1).log10().pow(0.2).times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(100)
	tmp.hd.enerUpgs[20] = tmp.hd.motive.plus(2).log10().times(player.energy.div(4.5).plus(10))
}

function quickReset() {
	tmp.ranks.layer.reset(true)
}

function refillEnergy() {
	if (!player.canRefill) return
	player.energy = new ExpantaNum(100)
	player.canRefill = false
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
	
	return false;
}

function baseIncline(d) {
	if (d.gte(4.4e26)) d = d.pow(2).div(4.4e26)
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
	while (newIncl.div(incl).gt(maxError)&&iter<10) {
		incl = baseIncline(d)
		reduc = ExpantaNum.sub(90, incl).div(90)
		v = v.plus(a.pow(reduc).div(50))
		d = player.distance.plus(adjustGen(v, "dist").times(tmp.hd.enEff?tmp.hd.enEff:player.energy).times(nerfActive("noTS") ? 1 : tmp.timeSpeed).div(50))
		newIncl = baseIncline(d)
		iter++
		tmp.hd.futureIncl.push(newIncl)
	}
}