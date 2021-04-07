function updateQuilts() {
	if (!tmp.mlt.quilts) tmp.mlt.quilts = {}
	let upgPower = getQuiltUpgPower()
	for (let i=1;i<=3;i++) {
		if (!tmp.mlt.quilts[i]) tmp.mlt.quilts[i] = {}
		tmp.mlt.quilts[i].upgCost = getQuiltUpgCost(i);
		tmp.mlt.quilts[i].upgPow = upgPower;
		if (i==3) tmp.mlt.quilts[i].scStart = new ExpantaNum(3.75)
		tmp.mlt.quilts[i].upgEff = player.mlt.quiltUpgs[i-1].times(HCCBA("q"+i)?0:1).times(tmp.mlt.quilts[i].upgPow).div(10)
		tmp.mlt.quilts[i].strength = getQuiltStrength(i).plus(tmp.mlt.quilts[i].upgEff);
		tmp.mlt.quilts[i].eff = getQuiltEff(i);
	}
	tmp.mlt.quilts[1].eff2 = getQuilt1Eff2()
	tmp.mlt.quilts[2].eff2 = getQuilt2Eff2()
	tmp.mlt.quilts[3].eff2 = getQuilt3Eff2()
}

function getQuiltUpgPower() {
	let power = new ExpantaNum(modeActive("easy")?1.1:1).div(modeActive("hard")?1.1:1);
	if (hasMltMilestone(17)) power = power.plus(tmp.mlt.mil17reward.times(10))
	return power;
}

function getQuiltStrength(x) {
	if (player.mlt.times.eq(0) || HCCBA("q"+x)) return new ExpantaNum(0);
	let base = new ExpantaNum(0);
	if (x==1) base = player.distance.max(1).logBase(DISTANCES.mlt);
	else if (x==2) base = player.inf.knowledge.max(1).logBase("1e8500");
	else if (x==3) base = player.elementary.particles.max(1).logBase(1e150);
	
	if (modeActive("easy")) base = base.pow(1.01).times(1.2);
	if (modeActive("hard")) base = base.div(1.2);
	
	if (base.gte(4)) base = base.root(1.5).times(1.6);
	
	return base.plus(1).div(2);
}

function getQuiltEff(x) {
	let power = tmp.mlt.quilts[x].strength;
	if (x==1) {
		let exp = ExpantaNum.root(15, power.plus(1).pow(4).sub(4.0625))
		return ExpantaNum.pow(ExpantaNum.pow(10, 1e7), power.lt(1)?power.pow(exp):power)
	} else if (x==2) return power.plus(1).pow(1.1)
	else if (x==3) {
		let eff = power.plus(1).pow(0.9)
		if (eff.gte(tmp.mlt.quilts[3].scStart)) eff = eff.times(tmp.mlt.quilts[3].scStart.pow(2)).cbrt();
		return eff;
	}
}

function getQuilt1Eff2() {
	let power = tmp.mlt.quilts[1].strength;
	if (power.gte(8)) power = ExpantaNum.pow(2, power.logBase(2).times(2).sqrt())
	if (power.gte(2)) power = power.times(4).cbrt();
	return ExpantaNum.pow(1e4, power.pow(2));
}

function getQuilt2Eff2() {
	let power = tmp.mlt.quilts[2].strength;
	return power.plus(1).pow(2);
}

function getQuilt3Eff2() {
	let power = tmp.mlt.quilts[3].strength;
	return ExpantaNum.pow(1e5, power);
}

function getQuiltUpgCost(x) {
	let bought = player.mlt.quiltUpgs[x-1]
	return ExpantaNum.pow(2, bought)
}

function buyQuiltUpg(x) {
	let cost = getQuiltUpgCost(x)
	if (player.mlt.energy.lt(cost)) return;
	player.mlt.energy = player.mlt.energy.sub(cost);
	player.mlt.quiltUpgs[x-1] = player.mlt.quiltUpgs[x-1].plus(1);
}