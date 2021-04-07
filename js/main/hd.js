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
	14: new ExpantaNum(5e5),
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
	27: new ExpantaNum(1e120),
	28: new ExpantaNum(1.5e124),
	29: new ExpantaNum(5e215),
	30: new ExpantaNum(1e226),
	31: new ExpantaNum('2e336'),
	32: new ExpantaNum('2e447'),
	33: new ExpantaNum('1e451'),
	34: new ExpantaNum('3e472'),
	35: new ExpantaNum('4e543'),
	36: new ExpantaNum('1e587'),
}

function getEnergyUpgCost(n){
	baseCost = ENERGY_UPG_COSTS[n]
	exCost = ExpantaNum(1)
	if (modeActive("extreme") && n > 13) exCost = exCost.times(10)
	return baseCost.times(exCost)
}

function getEnergyLossExp(){
	return modeActive("extreme") ? -10 : -5
}

function getBaseMotiveScalingStart(){
	let y = ExpantaNum(125)
	if (tmp.ach) if (tmp.ach[77].has) {
		y = y.plus(player.rockets.plus(10).log10()) // may be nerfed
		//prb will be nerfed
	}
	return y
}

function getBaseMotive(){
	let z = player.rank.plus(1).times(player.tier.plus(1).pow(2)).times(tmp.hd.incline.plus((player.energyUpgs.includes(13)&&tmp.hd.enerUpgs) ? tmp.hd.enerUpgs[13] : 0).div(90).plus(1)).times((player.energyUpgs.includes(28)&&tmp.hd.enerUpgs)?tmp.hd.enerUpgs[28]:1)
	let y = getBaseMotiveScalingStart()
	if (tmp.ach) if (z.gt(y) && modeActive("extreme") && !tmp.ach[87].has) return z.div(y).pow(.5).times(y)
	return z
}

function getTotalFurnaceUpgrades(){
	if (!modeActive("extreme")) return new ExpantaNum(0)
	let x = ExpantaNum(0)
	for (let i=0; i<player.furnace.upgrades.length; i++){
		x = x.plus(player.furnace.upgrades[i])
	}
	return x
}

function getOptimizationOneScalingStart(){
	let b = ExpantaNum(100)
	if (tmp.ach) if (tmp.ach[67].has) b = b.times(5)
	let e = ExpantaNum(1.1).pow(getTotalFurnaceUpgrades())
	return b.times(player.achievements.includes(36) ? e : 1)
}

function getOptimizationOneEffect(){
	let op1 = tmp.hd.motive.max(player.energyUpgs.includes(5)?1:0).plus(1).pow(0.75).pow((player.energyUpgs.includes(5)&&tmp.hd.enerUpgs[5]) ? tmp.hd.enerUpgs[5].div(100).plus(1) : 1).pow(tmp.hd.superEnEff2)
	if (modeActive("extreme")){
		if (tmp.ach) if (tmp.ach[66].has) op1 = op1.times(ExpantaNum.pow(player.furnace.coal.plus(10).log10(), 2))
	}
	if (op1.gt(getOptimizationOneScalingStart()) && modeActive("extreme")) {
		e = getOptimizationOneScalingStart().logBase(getOptimizationOneScalingStart().log10().times(5))
		return op1.log10().times(5).pow(e)
	}
	return op1
}

function getTotalPathogenUpgrades(){
	let x = ExpantaNum(0)
	for (var i in player.pathogens.upgrades){
		x = x.plus(player.pathogens.upgrades[i])
	}
	return x
}

function getConfidenceOneScalingStart(){
	let x = ExpantaNum(0)
	if (tmp.ach) x = tmp.ach[65].has ? getTotalPathogenUpgrades().div(3) : ExpantaNum(0)
	if (x.gt(3)) x = x.logBase(3).plus(2)
	if (tmp.ach) x = x.plus(tmp.ach[67].has ? 1 : 0)
	x = x.plus(3) 
	if (tmp.ach) if (tmp.ach[86].has) x = x.pow(2)
	if (tmp.ach) if (tmp.ach[93].has) x = x.pow(2)
	if (tmp.ach) if (tmp.ach[97].has) x = x.times(tmp.hd.enerUpgs[1].plus(1e100).log10())
	if (tmp.ach) if (tmp.ach[102].has) x = x.times(player.inf.endorsements.plus(1))
	return x
}

function getConfidenceOneEffect(){
	let co1 = tmp.hd.incline.plus((player.energyUpgs.includes(13) && tmp.hd.enerUpgs[13]) ? tmp.hd.enerUpgs[13] : 0).div(90).plus(1).pow(3).pow((player.energyUpgs.includes(7)&&tmp.hd.enerUpgs[7]) ? tmp.hd.enerUpgs[7].div(100).plus(1) : 1).pow(tmp.hd.superEnEff2)
	let s = getConfidenceOneScalingStart()
	if (tmp.ach) if (co1.gt(s) && modeActive("extreme") && !tmp.ach[117].has) return co1.div(s).pow(.5).times(s)
	
	return co1
}

function getThrusterBoost() {
	let tb = new ExpantaNum(1);
	if (player.energyUpgs.includes(36) && tmp.hd.enerUpgs) tb = tb.times(tmp.hd.enerUpgs[36].div(100).plus(1))
	return tb;
}

function updateEnergyLoss(){
	tmp.hd.energyLoss = tmp.hd.inclineRed.eq(0)?new ExpantaNum(1/0):tmp.hd.inclineRed.pow(getEnergyLossExp())
	if (player.energyUpgs.includes(2) && tmp.hd.enerUpgs) tmp.hd.energyLoss = tmp.hd.energyLoss.div(tmp.hd.enerUpgs[2])
	if (modeActive("extreme")){
		if (tmp.ach) if (tmp.ach[61].has) tmp.hd.energyLoss = tmp.hd.energyLoss.div(Math.max(player.tr.upgrades.length, 1))
		if (tmp.timeSpeed) if (tmp.timeSpeed.gt(1e20)) tmp.hd.energyLoss = tmp.hd.energyLoss.times(tmp.timeSpeed.log10().div(20))
	} 
}

function calcEnergyUpgrades(){
	tmp.hd.tb = getThrusterBoost();
	
	if (!tmp.hd.enerUpgs) tmp.hd.enerUpgs = {}
	
	tmp.hd.enerUpgs[1] = getOptimizationOneEffect()
	if (tmp.hd.enerUpgs[1].gte("1e2500")) tmp.hd.enerUpgs[1] = tmp.hd.enerUpgs[1].logBase("1e2500").pow(825).times("1e2500").min(tmp.hd.enerUpgs[1])
	let exp1 = 1 + (player.elementary.bosons.scalar.higgs.upgrades.includes("2;2;1") ? player.elementary.bosons.scalar.higgs.upgrades.length : 0)
	if (player.energyUpgs.includes(27) && tmp.hd.enerUpgs[27] != undefined) exp1 *= tmp.hd.enerUpgs[27].toNumber()
	tmp.hd.enerUpgs[1] = tmp.hd.enerUpgs[1].pow(exp1)
	
	tmp.hd.enerUpgs[2] = tmp.hd.motive.max(player.energyUpgs.includes(6)?1:0).plus(1).log10().times(2).plus(1).pow((player.energyUpgs.includes(6)&&tmp.hd.enerUpgs[6]) ? tmp.hd.enerUpgs[6].div(100).plus(1) : 1).pow(tmp.hd.superEnEff2)
	if (tmp.ach) if (tmp.ach[85].has && modeActive("extreme+hikers_dream")) tmp.hd.enerUpgs[2] = tmp.hd.enerUpgs[2].pow(2)
	
	tmp.hd.enerUpgs[3] = getConfidenceOneEffect()
	if (tmp.hd.enerUpgs[3].gte(1e24)) tmp.hd.enerUpgs[3] = tmp.hd.enerUpgs[3].log10().pow(1.5).times(1e24/24).min(tmp.hd.enerUpgs[3])
	if (tmp.ach) if (tmp.ach[123].has) tmp.hd.enerUpgs[3] = tmp.hd.enerUpgs[3].times(10)
	
	tmp.hd.enerUpgs[4] = player.rockets.plus(1).times(10).slog(10).times((player.energyUpgs.includes(8)&&tmp.hd.enerUpgs[8]) ? (tmp.hd.enerUpgs[8].div(100).plus(1)) : 1).times(tmp.hd.superEnEff2).pow(tmp.hd.tb)
	if (tmp.hd.enerUpgs[4].gte(32.5)) tmp.hd.enerUpgs[4] = tmp.hd.enerUpgs[4].logBase(2).pow(2.157034).min(tmp.hd.enerUpgs[4])
	
	tmp.hd.enerUpgs[5] = tmp.hd.simEn.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(9)&&tmp.hd.enerUpgs[9])?tmp.hd.enerUpgs[9].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[6] = tmp.hd.simEn.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(10)&&tmp.hd.enerUpgs[10])?tmp.hd.enerUpgs[10].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[7] = tmp.hd.totalMotive.plus(1).times(10).slog(10).sub(1).times(100).times((player.energyUpgs.includes(11)&&tmp.hd.enerUpgs[11])?tmp.hd.enerUpgs[11].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[8] = tmp.hd.incline.plus((player.energyUpgs.includes(13)&&tmp.hd.enerUpgs[13]) ? tmp.hd.enerUpgs[13] : 0).div(90).times(100).times((player.energyUpgs.includes(12)&&tmp.hd.enerUpgs[12])?tmp.hd.enerUpgs[12].div(100).plus(1):1).times(tmp.hd.superEnEff2).pow(tmp.hd.tb)
	
	tmp.hd.enerUpgs[9] = player.tr.cubes.plus(1).log10().plus(1).log10().times(100).times((player.energyUpgs.includes(16)&&tmp.hd.enerUpgs[16])?tmp.hd.enerUpgs[16].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[10] = player.tr.cubes.plus(1).log10().plus(1).log10().pow(0.1).times(10).times((player.energyUpgs.includes(17)&&tmp.hd.enerUpgs[17])?tmp.hd.enerUpgs[17].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[11] = player.tr.cubes.plus(1).log10().plus(1).log10().sqrt().times(50).times((player.energyUpgs.includes(18)&&tmp.hd.enerUpgs[18])?tmp.hd.enerUpgs[18].div(100).plus(1):1).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[12] = player.tr.cubes.plus(1).log10().plus(1).log10().pow(0.2).times(20).times((player.energyUpgs.includes(19)&&tmp.hd.enerUpgs[19])?tmp.hd.enerUpgs[19].div(100).plus(1):1).times(tmp.hd.superEnEff2).pow(tmp.hd.tb)
	if (tmp.ach) if (tmp.hd.enerUpgs[12] && modeActive("extreme+hikers_dream") && tmp.ach[66].has) tmp.hd.enerUpgs[12] = tmp.hd.enerUpgs[12].plus(ExpantaNum.min(40, ExpantaNum.sqrt(tmp.hd.enerUpgs[12]).times(4)))
	
	tmp.hd.enerUpgs[13] = new ExpantaNum(6).times((player.energyUpgs.includes(14)&&tmp.hd.enerUpgs[14]) ? tmp.hd.enerUpgs[14].div(100).plus(1) : 1).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[14] = ExpantaNum.sub(3, ExpantaNum.div(2, player.pathogens.amount.plus(1).log10().plus(1).log10().plus(1))).times((player.energyUpgs.includes(15)&&tmp.hd.enerUpgs[15]) ? tmp.hd.enerUpgs[15].div(100).plus(1) : 1).sub(1).times(100).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[15] = ExpantaNum.sub(1.5, ExpantaNum.div(0.5, player.pathogens.amount.plus(1).log10().plus(1).log10().plus(1).log10().plus(1))).sub(1).times(100).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[16] = player.collapse.cadavers.plus(1).log10().plus(1).log10().times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(100).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[17] = player.collapse.lifeEssence.plus(1).log10().plus(1).log10().pow(0.1).times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(10).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[18] = player.pathogens.amount.plus(1).log10().plus(1).log10().sqrt().times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(50).times(tmp.hd.superEnEff2)
	
	tmp.hd.enerUpgs[19] = player.pathogens.amount.plus(1).log10().plus(1).log10().pow(0.2).times((player.energyUpgs.includes(20)&&tmp.hd.enerUpgs[20]) ? tmp.hd.enerUpgs[20].div(100).plus(1) : 1).times(100).times(tmp.hd.superEnEff2).pow(tmp.hd.tb)
	
	let exp322 = player.elementary.bosons.scalar.higgs.upgrades.includes("2;2;1") ? 2 : 1
	let omniPow = 1
	if (player.energyUpgs.includes(30)&&tmp.hd.enerUpgs[30]) omniPow = tmp.hd.enerUpgs[30].div(100).plus(1)
	if (player.energyUpgs.includes(31)&&tmp.hd.enerUpgs[31]) omniPow = ExpantaNum.mul(omniPow, tmp.hd.enerUpgs[31].div(100).plus(1));
	
	tmp.hd.enerUpgs[20] = tmp.hd.motive.max(player.inf.endorsements.gte(10)?tmp.hd.totalMotive:0).plus(2).log10().times(tmp.hd.simEn.div(4.5).plus(10)).times((player.energyUpgs.includes(21)&&tmp.hd.enerUpgs[21]) ? tmp.hd.enerUpgs[21].div(100).plus(1) : 1).times(tmp.hd.superEnEff2).times(omniPow).times(.01).plus(1).pow(exp322).minus(1).times(100)
	
	tmp.hd.enerUpgs[21] = tmp.hd.superEn.plus(1).log10().plus(1).log10().plus(1).sqrt().sub(1).times(100).times((player.energyUpgs.includes(22)&&tmp.hd.enerUpgs[22]) ? tmp.hd.enerUpgs[22].div(100).plus(1) : 1).times((player.energyUpgs.includes(23)&&tmp.hd.enerUpgs[23]) ? tmp.hd.enerUpgs[23].div(100).plus(1) : 1).times(tmp.hd.superEnEff2).times(omniPow).times(.01).plus(1).pow(exp322).minus(1).times(100)
	
	tmp.hd.enerUpgs[22] = tmp.hd.superEn.plus(1).log10().plus(1).log10().plus(1).sub(1).times(135).times((player.energyUpgs.includes(23)&&tmp.hd.enerUpgs[23]) ? tmp.hd.enerUpgs[23].div(100).plus(1) : 1).times(tmp.hd.superEnEff2).times(omniPow).times(.01).plus(1).pow(exp322).minus(1).times(100)
	
	tmp.hd.enerUpgs[23] = tmp.hd.superEn.plus(1).log10().plus(1).log10().plus(1).sqrt().sub(1).times(105).times(tmp.hd.superEnEff2).times(omniPow).times(.01).plus(1).pow(exp322).minus(1).times(100)
	
	tmp.hd.enerUpgs[24] = player.bestMotive.sqrt().times(tmp.hd.superEnEff2).pow(player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;1") ? 1.8 : 1)
	
	let exp25 = player.elementary.bosons.scalar.higgs.upgrades.includes("2;2;2") ? 10 : 1
	tmp.hd.enerUpgs[25] = player.bestMotive.plus(1).log10().plus(1).log10().plus(1).log10().plus(1).times(tmp.hd.superEnEff2).pow(exp25).pow(exp322)
	
	let mult26 = Math.sqrt(1 + player.elementary.bosons.scalar.higgs.upgrades.length)
	let eff26 = 12 * (player.elementary.bosons.scalar.higgs.upgrades.includes("2;2;1") ? mult26 : 1)
	tmp.hd.enerUpgs[26] = player.bestMotive.plus(1).times(10).slog(10).max(1).sub(1).times(eff26).times(.01).plus(1).pow(exp322).minus(1).times(100)

	tmp.hd.enerUpgs[27] = player.elementary.hc.best.plus(1)
	
	tmp.hd.enerUpgs[28] = player.elementary.hc.hadrons.plus(1)
	
	tmp.hd.enerUpgs[29] = player.energy.plus(1).log10().div(40).plus(1);
	
	tmp.hd.enerUpgs[30] = player.elementary.entropy.best.plus(1).log10().times(555);
	if (player.energyUpgs.includes(31)&&tmp.hd.enerUpgs[31]) tmp.hd.enerUpgs[30] = ExpantaNum.mul(tmp.hd.enerUpgs[30], tmp.hd.enerUpgs[31].div(100).plus(1));
	
	tmp.hd.enerUpgs[31] = player.mlt.totalEnergy.plus(1).log10().plus(1).log10().times(1.5e3);
	
	tmp.hd.enerUpgs[32] = (1-Math.pow(0.75, player.mlt.highestCompleted*(player.mlt.active>0?1.5:1)))*100;
	
	tmp.hd.enerUpgs[33] = ExpantaNum.sub(1, ExpantaNum.div(1, player.energy.plus(1).log10().plus(1).log10().plus(1).log10().times(2).plus(1))).times(100);
	
	tmp.hd.enerUpgs[34] = player.rank.plus(1).root(10);
	
	tmp.hd.enerUpgs[35] = player.energy.plus(1).log10().plus(1).log10().div(2.5).plus(1);
	
	tmp.hd.enerUpgs[36] = player.distance.plus(1).log10().plus(1).log10().plus(1).log10().cbrt().times(40)
	if (tmp.ach && tmp.ach[197].has && !modeActive("extreme")) tmp.hd.enerUpgs[36] = tmp.hd.enerUpgs[36].times(1.125);
}

function updateMotive(){
	tmp.hd.totalMotive = getBaseMotive()
	if (player.energyUpgs.includes(3) && tmp.hd.enerUpgs) tmp.hd.totalMotive = tmp.hd.totalMotive.times(tmp.hd.enerUpgs[3])
	if (player.inf.endorsements.gte(10)) tmp.hd.totalMotive = tmp.hd.totalMotive.times(tmp.hd.superEnEff)
	if (player.elementary.bosons.scalar.higgs.upgrades.includes("2;2;2") && tmp.hd.enerUpgs != undefined) tmp.hd.totalMotive = tmp.hd.totalMotive.times(tmp.hd.enerUpgs[25] || 1)
	tmp.hd.motive = tmp.hd.totalMotive.sub(player.spentMotive).sub(player.spentMotiveGens).max(0);
	if (player.energyUpgs.includes(24)) tmp.hd.motive = tmp.hd.motive.max(tmp.hd.enerUpgs ? tmp.hd.enerUpgs[24] : 0)

}

function updateTempHikersDream() {
	if (!tmp.hd) tmp.hd = {}
	
	tmp.hd.superEn = player.genLvl.pow(2).times(player.geners).floor()
	tmp.hd.superEnEff = tmp.hd.superEn.plus(1).pow(player.geners).log10().plus(1).log10().plus(1).pow(2).times(player.geners)
	if (player.energyUpgs.includes(29)&&tmp.hd.enerUpgs) {
		tmp.hd.superEn = tmp.hd.superEn.pow(tmp.hd.enerUpgs[29]).floor();
		tmp.hd.superEnEff = tmp.hd.superEnEff.pow(tmp.hd.enerUpgs[29]);
	}
	tmp.hd.superEnEff2 = tmp.hd.superEn.times(player.geners.sub(1)).plus(1).times(10).slog(10).max(1).log10().times(1.6).plus(player.inf.endorsements.gt(25)?0.011:0).plus(1).times((tmp.hd.enerUpgs&&player.energyUpgs.includes(26)) ? tmp.hd.enerUpgs[26].div(100).plus(1) : 1)
	if (player.elementary.bosons.scalar.higgs.upgrades.includes("1;3;0") && tmp.elm != undefined) tmp.hd.superEnEff2 = tmp.hd.superEnEff2.times(tmp.elm.bos["higgs_1;3;0"]())
	
	if (tmp.hd.futureSec?tmp.hd.futureSec.length>0:false) {
		tmp.hd.secant = tmp.hd.futureSec[0]
		tmp.hd.futureSec.shift();
	} else tmp.hd.secant = baseSecant(player.distance)
	if (tmp.hd.futureIncl?tmp.hd.futureIncl.length>0:false) {
		tmp.hd.incline = tmp.hd.futureIncl[0]
		tmp.hd.futureIncl.shift();
	} else tmp.hd.incline = baseIncline(player.distance)
	tmp.hd.inclinePow = new ExpantaNum(1)
	if (player.energyUpgs.includes(4) && tmp.hd.enerUpgs) tmp.hd.inclinePow = tmp.hd.inclinePow.times(tmp.hd.enerUpgs[4])
	let incl = tmp.hd.incline
	if (incl.gte(89.95)) incl = ExpantaNum.sub(90, ExpantaNum.div(90, ExpantaNum.div(90, ExpantaNum.sub(90, incl)).pow(2).div(1800)))
	if (incl.gte(89.999)) {
		let sec = tmp.hd.secant;
		if (sec.gte(1e6)) sec = ExpantaNum.pow(1.002, sec.sub(1e6)).times(sec);
		if (sec.gte(20)) sec = sec.pow(2).div(20)
		tmp.hd.inclineRed = sec.times(90).root(tmp.hd.inclinePow.times(-1))
	} else tmp.hd.inclineRed = ExpantaNum.sub(90, incl).div(90).root(tmp.hd.inclinePow)
	updateEnergyLoss()
	
	updateMotive()
		
	tmp.hd.enEff = player.energy.div(100)
	if (player.energyUpgs.includes(1) && tmp.hd.enerUpgs) tmp.hd.enEff = tmp.hd.enEff.times(tmp.hd.enerUpgs[1])
	if (((player.elementary.theory.active&&player.elementary.theory.depth.gte(20))||HCTVal("tv").gte(20)) && tmp.elm) tmp.hd.enEff = tmp.hd.enEff.pow(tmp.elm.theory.nerf)
	if (player.energyUpgs.includes(33)) tmp.hd.enEff = tmp.hd.enEff.pow(20);

	tmp.hd.simEn = player.energy.min(getEnergyLim()).max(tmp.hd.superEn)
	if (tmp.hd.simEn.gt(100)) tmp.hd.simEn = tmp.hd.simEn.log10().times(50)

	calcEnergyUpgrades()
	
	tmp.hd.energyGen = ExpantaNum.pow(2, player.genLvl.times(player.energy.plus(1).logBase(1.004).sqrt()).sqrt()).sub(1).times(player.geners)
	if (player.genLvl.gte(1)) tmp.hd.energyGen = tmp.hd.energyGen.max(1)
	if (player.elementary.bosons.scalar.higgs.upgrades.includes("0;3;1")) tmp.hd.energyGen = tmp.hd.energyGen.pow(2)
	if (tmp.ach) if (tmp.ach[143].has) tmp.hd.energyGen = tmp.hd.energyGen.times(1e7)
}

function quickReset() {
	player.canRefill = true
	tmp.ranks.layer.reset(true)
}

function refillEnergy() {
	if (!tmp.ach) return
	if (modeActive('hard') && player.energy.neq(0) && !tmp.ach[85].has) return
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
	let cost = getEnergyUpgCost(x)
	if (tmp.hd.motive.lt(cost)) return
	player.spentMotive = player.spentMotive.plus(cost)
	player.energyUpgs.push(x)
}

function isEnergyUpgShown(x) {
	if (player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;0") && x <= 26) return true
	//change to the max upgrades if you ever add upgrades
	if (x<=3) return true;
	else if (x<=8) return player.rf.gte(1) || player.automation.unl || player.collapse.unl||player.inf.unl
	else if (x<=13) return player.tr.unl || player.collapse.unl || player.inf.unl
	else if (x<=20) return (player.pathogens.unl && !modeActive("extreme")) || player.inf.unl 
	else if (x<=23) return player.inf.endorsements.gte(10)
	else if (x<=25) return player.inf.endorsements.gte(15)
	else if (x<=26) return player.inf.endorsements.gte(28)
	else if (x<=28) return player.achievements.includes(154)
	else if (x<=30) return player.achievements.includes(171)
	else if (x<=35) return player.achievements.includes(181) || player.mlt.totalEnergy.gt(0);
	else if (x<=36) return (player.achievements.includes(181) || player.mlt.totalEnergy.gt(0)) && !modeActive("extreme");
	
	return false;
}

function baseIncline(d) {
	if (d.gte(4.4e26)) d = d.pow(2).div(4.4e26)
	if (d.gte("4.4e2026")) d = d.pow(5).div(ExpantaNum.pow("4.4e2026", 4))
	if (player.energyUpgs.includes(32)&&tmp.hd.enerUpgs&&tmp.hd.enerUpgs[32]) d = d.pow(1-tmp.hd.enerUpgs[32]/100);
	if (player.energyUpgs.includes(34)&&tmp.hd.enerUpgs&&tmp.hd.enerUpgs[34]) d = d.root(tmp.hd.enerUpgs[34])
	let incl = d.gte(1e3) ? ExpantaNum.sub(90, ExpantaNum.div(90, d.div(1e3).log10().div(10).plus(1))) : new ExpantaNum(0)
	return incl.max(0)
}

function baseSecant(d) {
	if (d.gte(4.4e26)) d = d.pow(2).div(4.4e26)
	if (d.gte("4.4e2026")) d = d.pow(5).div(ExpantaNum.pow("4.4e2026", 4))
	if (player.energyUpgs.includes(32)&&tmp.hd.enerUpgs&&tmp.hd.enerUpgs[32]) d = d.pow(1-tmp.hd.enerUpgs[32]/100);
	if (player.energyUpgs.includes(34)&&tmp.hd.enerUpgs&&tmp.hd.enerUpgs[34]) d = d.root(tmp.hd.enerUpgs[34])
	let incl = d.gte(1e3) ? d.div(1e3).log10().div(10).plus(1).div(90) : new ExpantaNum(0)
	return incl.max(0)
}

function calcInclines() {
	if (!tmp.hd) tmp.hd = {}
	let d = player.distance
	let baseV = adjustGen(player.velocity, "dist").times(tmp.hd.enEff?tmp.hd.enEff:(1/0)).times(nerfActive("noTS") ? 1 : tmp.timeSpeed)
	let v = new ExpantaNum(baseV)
	let maxError = 1.001
	let incl = baseIncline(d)
	let sec = baseSecant(d)
	let newIncl = new ExpantaNum(90)
	let newSecant = new ExpantaNum(1/0)
	let reduc;
	let a = tmp.acc||new ExpantaNum(1/0)
	let iter = 0
	tmp.hd.futureIncl = []
	tmp.hd.futureSec = []
	while (newIncl.div(incl).gt(maxError)&&newSecant.div(sec).gt(maxError)&&iter<25) {
		incl = baseIncline(d)
		sec = baseSecant(d)
		reduc = ExpantaNum.sub(90, incl).div(90)
		v = v.plus(a.pow(reduc).div(50))
		d = player.distance.plus(adjustGen(v, "dist").times(tmp.hd.enEff?tmp.hd.enEff:player.energy).times(nerfActive("noTS") ? 1 : tmp.timeSpeed).div(50))
		newIncl = baseIncline(d)
		newSecant = baseSecant(d)
		iter++
		tmp.hd.futureIncl.push(newIncl)
		tmp.hd.futureSec.push(newSecant)
	}
}

// Energy Tabs

const EN_TABBTN_SHOWN = {
	mainEN: function() { return true },
	generator: function() { return player.inf.endorsements.gte(10) || player.elementary.bosons.scalar.higgs.upgrades.includes("1;0;0") },
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
	if (modeActive("extreme+hikers_dream") && g.gte(11)) g = g.sub(11).div(2).plus(11);
	if (player.energyUpgs.includes(33)&&tmp.hd.enerUpgs[33]) g = g.times(ExpantaNum.sub(1, tmp.hd.enerUpgs[33].div(100)));
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
	let scaleStart = modeActive("extreme+hikers_dream")?6:5
	let scalePower = modeActive("extreme+hikers_dream")?0.5:1
	if (g.gte(scaleStart)) g = ExpantaNum.pow((1+scalePower/5), g.sub(scaleStart)).times(g)
	if (player.energyUpgs.includes(33)&&tmp.hd.enerUpgs[33]) g = g.times(ExpantaNum.sub(1, tmp.hd.enerUpgs[33].div(100)));
	let cost = ExpantaNum.pow(2, g.plus(1).pow(modeActive("extreme+hikers_dream")?2.75:3)).times(5e29)
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
