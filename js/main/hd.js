const ENERGY_UPG_COSTS = {
	1: new ExpantaNum(70),
	2: new ExpantaNum(100),
	3: new ExpantaNum(200),
}

function updateTempHikersDream() {
	if (!tmp.hd) tmp.hd = {}
	tmp.hd.incline = player.distance.gte(1e3) ? ExpantaNum.sub(90, ExpantaNum.div(90, player.distance.div(1e3).log10().div(10).plus(1))) : new ExpantaNum(0)
	tmp.hd.inclineRed = ExpantaNum.sub(90, tmp.hd.incline).div(90)
	tmp.hd.energyLoss = tmp.hd.inclineRed.pow(-5)
	if (player.energyUpgs.includes(2) && tmp.hd.enerUpgs) tmp.hd.energyLoss = tmp.hd.energyLoss.div(tmp.hd.enerUpgs[2])
	tmp.hd.totalMotive = player.rank.plus(1).times(player.tier.plus(1).pow(2)).times(tmp.hd.incline.div(90).plus(1))
	if (player.energyUpgs.includes(3) && tmp.hd.enerUpgs) tmp.hd.totalMotive = tmp.hd.totalMotive.times(tmp.hd.enerUpgs[3])
	tmp.hd.motive = tmp.hd.totalMotive.sub(player.spentMotive).max(0);
	tmp.hd.enEff = player.energy.div(100)
	if (player.energyUpgs.includes(1) && tmp.hd.enerUpgs) tmp.hd.enEff = tmp.hd.enEff.times(tmp.hd.enerUpgs[1])
	
	if (!tmp.hd.enerUpgs) tmp.hd.enerUpgs = {}
	tmp.hd.enerUpgs[1] = tmp.hd.motive.plus(1).pow(0.75)
	tmp.hd.enerUpgs[2] = tmp.hd.motive.plus(1).log10().times(2).plus(1)
	tmp.hd.enerUpgs[3] = tmp.hd.incline.div(90).plus(1).pow(3)
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