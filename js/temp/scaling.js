function updateTempScaling() {
	tmp.scaling = {}
	tmp.scaling.active = function(type, v, scaling) {
		v = new ExpantaNum(v)
		let k = Object.keys(SCALING_STARTS)
		return v.gte(SCALING_STARTS[scaling][type])
	}
	tmp.scaling.getName = function(name, x=0) {
		let mx = Object.keys(SCALING_STARTS).length
		let current = ""
		let amt = SCALING_RES[name](x)
		for (let n=mx-1;n>=0;n--) {
			let scaling = SCALING_STARTS[Object.keys(SCALING_STARTS)[n]]
			if (tmp.scaling.active(name, amt, Object.keys(SCALING_STARTS)[n])) return capitalFirst(Object.keys(SCALING_STARTS)[n])+" "
		}
		return current
	}
	
	tmp.scalings = {}
	tmp.scalingPower = {}
	for (let t=0;t<Object.keys(SCALING_STARTS).length;t++) {
		let name = Object.keys(SCALING_STARTS)[t]
		tmp.scalings[name] = {}
		tmp.scalingPower[name] = {}
		for (let p=0;p<Object.keys(SCALING_STARTS[name]).length;p++) {
			let name2 = Object.keys(SCALING_STARTS[name])[p]
			tmp.scalings[name][name2] = new ExpantaNum(deepCopy(SCALING_STARTS[name][name2]))
			tmp.scalingPower[name][name2] = new ExpantaNum(1)
		}
	}
	
	// Scaling Starts
	if (player.tr.upgrades.includes(11)) tmp.scalings.scaled.rank = tmp.scalings.scaled.rank.plus(10)
	if (player.tr.upgrades.includes(15)) tmp.scalings.scaled.rank = tmp.scalings.scaled.rank.plus(32)
	if (player.tr.upgrades.includes(12)) tmp.scalings.scaled.tier = tmp.scalings.scaled.tier.plus(2)
	if (player.tr.upgrades.includes(14) && tmp.tr14) tmp.scalings.scaled.tier = tmp.scalings.scaled.tier.plus(tmp.tr14["ss"])
	if (player.dc.unl && tmp.dc) tmp.scalings.scaled.rf = tmp.scalings.scaled.rf.plus(tmp.dc.dfEff)
	if (tmp.inf) if (tmp.inf.upgs.has("4;5")) tmp.scalings.scaled.pathogenUpg = tmp.scalings.scaled.pathogenUpg.plus(2)
		
	// Scaling Strengths
	if (tmp.inf) {
		if (tmp.inf.upgs.has("4;3")) tmp.scalingPower.scaled.rank = tmp.scalingPower.scaled.rank.times(0.5)
		if (tmp.inf.upgs.has("2;5")) tmp.scalingPower.superscaled.rank = tmp.scalingPower.superscaled.rank.times(0.95)
		if (tmp.inf.upgs.has("1;5")) tmp.scalingPower.scaled.tier = tmp.scalingPower.scaled.tier.times(0.8)
		if (tmp.inf.upgs.has("3;5")) tmp.scalingPower.scaled.rf = tmp.scalingPower.scaled.rf.times(0.75)
	}
}