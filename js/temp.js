function updateTemp() {
	// Elements
	tmp.el = {}
	for (i=0;i<TMP_DATA.ELS.length;i++) {
		let id = TMP_DATA.ELS[i]
		tmp.el[id] = new Element(id)
	}
	
	// Acceleration
	tmp.acc = new ExpantaNum(0.1)
	if (player.rank.gt(2)) tmp.acc = tmp.acc.times(ExpantaNum.pow(1.1, player.rank))
	if (player.rank.gt(3)) tmp.acc = tmp.acc.times(2)
	if (player.tier.gte(2) && player.rank.gte(3)) tmp.acc = tmp.acc.times(2)
	if (player.rank.gt(4)) tmp.acc = tmp.acc.times(ExpantaNum.pow(3, player.tier))
	if (player.rank.gt(5)) tmp.acc = tmp.acc.times(ExpantaNum.pow(1.975, player.rank))
	if (player.rank.gt(10)) tmp.acc = tmp.acc.times(2)
	if (player.tier.gte(4)) tmp.acc = tmp.acc.times(3)
	if (player.rank.gt(15)) tmp.acc = tmp.acc.times(4)
	if (player.tier.gte(5)) tmp.acc = tmp.acc.times(5)
	if (player.rank.gt(25)) tmp.acc = tmp.acc.times(10)
	if (player.rank.gt(50)) tmp.acc = tmp.acc.times(15)
	if (player.tier.gte(8)) tmp.acc = tmp.acc.times(10)
	if (player.tier.gte(10)) tmp.acc = tmp.acc.times(15)
	if (player.rank.gt(75)) tmp.acc = tmp.acc.times(25)
	if (player.tier.gte(15)) tmp.acc = tmp.acc.times(25)
	if (tmp.ach) if (tmp.ach[12].has) tmp.acc = tmp.acc.times(1.1)
	if (tmp.ach) if (tmp.ach[23].has) tmp.acc = tmp.acc.times(1.2)
	if (tmp.ach) if (tmp.ach[14].has) tmp.acc = tmp.acc.times(1.5)
	if (tmp.ach) if (tmp.ach[32].has) tmp.acc = tmp.acc.times(1.8)
	if (tmp.ach) if (tmp.ach[35].has) tmp.acc = tmp.acc.times(1.8)
	if (tmp.rockets) tmp.acc = tmp.acc.times(tmp.rockets.accPow)

	// Max Velocity
	tmp.maxVel = new ExpantaNum(1)
	if (player.rank.gt(1)) tmp.maxVel = tmp.maxVel.plus(1)
	if (player.rank.gt(2)) tmp.maxVel = tmp.maxVel.times(ExpantaNum.pow(1.1, player.rank))
	if (player.tier.gte(2) && player.rank.gte(3)) tmp.maxVel = tmp.maxVel.times(5)
	if (player.rank.gt(4)) tmp.maxVel = tmp.maxVel.times(ExpantaNum.pow(3, player.tier))
	if (player.rank.gt(5)) tmp.maxVel = tmp.maxVel.times(ExpantaNum.pow(1.975, player.rank))
	if (player.rank.gt(8)) tmp.maxVel = tmp.maxVel.times(ExpantaNum.pow(1.1, player.rank))
	if (tmp.ach) if (tmp.ach[21].has) tmp.maxVel = tmp.maxVel.times(1.1)
	if (tmp.ach) if (tmp.ach[14].has) tmp.maxVel = tmp.maxVel.times(1.5)
	if (tmp.ach) if (tmp.ach[24].has) tmp.maxVel = tmp.maxVel.times(1.25)
	if (tmp.rockets) tmp.maxVel = tmp.maxVel.times(tmp.rockets.mvPow)
	
	// Ranks
	tmp.ranks = {}
	tmp.ranks.fp = new ExpantaNum(1)
	if (player.tier.gte(1)) tmp.ranks.fp = tmp.ranks.fp.times(1.25)
	if (player.tier.gte(3)) tmp.ranks.fp = tmp.ranks.fp.times(ExpantaNum.pow(1.1, player.tier))
	tmp.ranks.req = new ExpantaNum(10).times(ExpantaNum.pow(2, player.rank.div(tmp.ranks.fp).max(1).sub(1).pow(2)))
	tmp.ranks.bulk = player.distance.div(10).max(1).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).plus(1)
	if (tmp.ranks.bulk.lt(tmp.ranks.fp.plus(1))) tmp.ranks.bulk = tmp.ranks.fp.plus(1)
	tmp.ranks.desc = player.rank.lt(Number.MAX_VALUE)?(RANK_DESCS[player.rank.toNumber()]?RANK_DESCS[player.rank.toNumber()]:DEFAULT_RANK_DESC):DEFAULT_RANK_DESC
	tmp.ranks.canRankUp = player.distance.gte(tmp.ranks.req)
	tmp.ranks.layer = new Layer("rank", tmp.ranks.canRankUp, "semi-forced")

	// Tiers
	tmp.tiers = {}
	tmp.tiers.fp = new ExpantaNum(1)
	tmp.tiers.req = new ExpantaNum(3).plus(player.tier.times(tmp.tiers.fp).pow(2))
	tmp.tiers.bulk = player.rank.sub(3).max(0).sqrt().div(tmp.tiers.fp).add(1)
	tmp.tiers.desc = player.tier.lt(Number.MAX_VALUE)?(TIER_DESCS[player.tier.toNumber()]?TIER_DESCS[player.tier.toNumber()]:DEFAULT_TIER_DESC):DEFAULT_TIER_DESC
	tmp.tiers.canTierUp = player.rank.gte(tmp.tiers.req)
	tmp.tiers.layer = new Layer("tier", tmp.tiers.canTierUp, "semi-forced")
	
	// Rockets
	
	tmp.rockets = {}
	tmp.rockets.canRocket = player.distance.gte(LAYER_REQS["rockets"][1])
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal")
	let r = player.rockets
	if (r.gte(10)) r = r.log10().times(10)
	tmp.rockets.eff = r.plus(1).logBase(3)
	tmp.rockets.accPow = tmp.acc.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	tmp.rockets.mvPow = tmp.maxVel.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	
	// Features
	
	tmp.features = {
		rockets: new Feature({name: "rockets", req: LAYER_REQS["rockets"][1], res: "distance", display: formatDistance, reached: player.rockets.gt(0)}),
		automation: new Feature({name: "automation", req: AUTO_UNL, res: "distance", display: formatDistance, reached: player.automation.unl}),
	}
	tmp.nf = "none"
	for (let i=0;i<Object.keys(tmp.features).length;i++) {
		let feature = Object.values(tmp.features)[i]
		if (!feature.reached) {
			tmp.nf = feature.name
			break;
		}
	}
	
	// Achievements
	tmp.ach = {}
	for (let r=1;r<=ACH_DATA.rows;r++) {
		for (let c=1;c<=ACH_DATA.cols;c++) {
			let id = r*10+c
			tmp.ach[id] = new Achievement({name: id, has: player.achievements.includes(id)})
		}
	}
	if (tmp.selAch===undefined||player.tab!=="achievements") tmp.selAch = 0
	tmp.ga = player.achievements.length
	tmp.ta = ACH_DATA.rows*ACH_DATA.cols
	
	// Rocket Fuel
	
	tmp.rf = {}
	tmp.rf.fp = new ExpantaNum(1)
	tmp.rf.req = new ExpantaNum(25).times(ExpantaNum.pow(5, player.rf.pow(1.1))).round()
	tmp.rf.can = player.rockets.gte(tmp.rf.req)
	tmp.rf.layer = new Layer("rf", tmp.rf.can, "semi-forced")
	tmp.rf.eff = player.rf.plus(1).logBase(2).plus(1).pow(0.2)
	
	// Automation
	
	tmp.auto = {}
	tmp.auto.scrapGain = player.distance.plus(1).pow(2).times(player.velocity.plus(1)).log10().div(100)
	if (player.rank.gt(60)) tmp.auto.scrapGain = tmp.auto.scrapGain.times(2)
	tmp.auto.intGain = player.rank.plus(1).pow(2).times(player.tier.plus(1)).cbrt().div(1000)
	if (player.rank.gt(20)) tmp.auto.intGain = tmp.auto.intGain.times(2)
	if (player.rank.gt(30)) tmp.auto.intGain = tmp.auto.intGain.times(3)
	if (player.tier.gte(12)) tmp.auto.intGain = tmp.auto.intGain.times(3)
	let primes = primesLTE(player.automation.scraps).max(1)
	if (primes.gte(1e9)) primes = primes.log10().times(1e9/9)
	if (player.rank.gt(40)) tmp.auto.intGain = tmp.auto.intGain.times(primes)
	for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) tmp.auto[Object.keys(ROBOT_REQS)[i]] = new Robot(Object.keys(ROBOT_REQS)[i], ROBOT_FL[Object.keys(ROBOT_REQS)[i]])
	
	// Layer Mults
	tmp.lm = {}
	tmp.lm.rockets = new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[34].has) tmp.lm.rockets = tmp.lm.rockets.times(1.1)
	if (tmp.ach) if (tmp.ach[15].has) tmp.lm.rockets = tmp.lm.rockets.times(1.05)
	if (tmp.ach) if (tmp.ach[26].has) tmp.lm.rockets = tmp.lm.rockets.times(1.1)
	if (player.rank.gt(100)) tmp.lm.rockets = tmp.lm.rockets.times(2)
}

function updateElements() {
	// Main
	tmp.el.distance.setTxt(formatDistance(player.distance))
	tmp.el.velocity.setTxt(formatDistance(player.velocity))
	tmp.el.maxVel.setTxt(formatDistance(tmp.maxVel))
	tmp.el.acceleration.setTxt(formatDistance(tmp.acc))
	
	// Ranks
	tmp.el.rank.setTxt(showNum(player.rank))
	tmp.el.rankUp.setClasses({btn: true, locked: !tmp.ranks.canRankUp})
	tmp.el.rankDesc.setTxt(tmp.ranks.desc)
	tmp.el.rankReq.setTxt(formatDistance(tmp.ranks.req))
	
	// Tiers
	tmp.el.tier.setTxt(showNum(player.tier))
	tmp.el.tierUp.setClasses({btn: true, locked: !tmp.tiers.canTierUp})
	tmp.el.tierDesc.setTxt(tmp.tiers.desc)
	tmp.el.tierReq.setTxt(showNum(tmp.tiers.req))
	
	// Rockets
	tmp.el.rocketReset.setClasses({btn: true, locked: !tmp.rockets.canRocket})
	tmp.el.rocketGain.setTxt(showNum(tmp.rockets.layer.gain))
	tmp.el.rocketsAmt.setTxt(showNum(player.rockets))
	tmp.el.rocketsEff.setTxt(showNum(tmp.rockets.eff))
	
	// Features
	tmp.el.nextFeature.setTxt((tmp.nf === "none") ? "" : (tmp.features[tmp.nf].desc))
	
	// Achievements
	tmp.el.achDesc.setHTML(tmp.ga+"/"+tmp.ta+"<br>"+(tmp.selAch==0?"":tmp.ach[tmp.selAch].desc))
	for (let r=1;r<=ACH_DATA.rows;r++) {
		for (let c=1;c<=ACH_DATA.cols;c++) {
			let id = r*10+c
			tmp.el["ach"+id].setClasses({achCont: true, dgn: (player.achievements.includes(id)&&ACH_DATA.descs[id]!==undefined), blocked: ACH_DATA.descs[id]===undefined})
		}
	}
	
	// Rocket Fuel
	tmp.el.rf.setTxt(showNum(player.rf))
	tmp.el.rfReset.setClasses({btn: true, locked: !tmp.rf.can})
	tmp.el.rfReq.setTxt(showNum(tmp.rf.req))
	tmp.el.rfEff.setTxt(showNum(tmp.rf.eff.sub(1).times(100)))
	
	// Automation
	tmp.el.scraps.setTxt(showNum(player.automation.scraps))
	tmp.el.intAmt.setTxt(showNum(player.automation.intelligence))
	for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) {
		tmp.el[Object.keys(ROBOT_REQS)[i]].setTxt(tmp.auto[Object.keys(ROBOT_REQS)[i]].btnTxt)
		tmp.el[Object.keys(ROBOT_REQS)[i]].setClasses({btn: true, locked: (player.automation.scraps.lt(Object.values(ROBOT_REQS)[i])&&!Object.keys(player.automation.robots).includes(Object.keys(ROBOT_REQS)[i]))})
	}
	tmp.el.robotTab.setDisplay(player.automation.open!="none")
	tmp.el.robotName.setTxt(capitalFirst(player.automation.open))
	tmp.el.robotInterval.setTxt(player.automation.open=="none"?"":formatTime(tmp.auto[player.automation.open].interval))
	tmp.el.robotMagnitude.setTxt(player.automation.open=="none"?"":showNum(tmp.auto[player.automation.open].magnitude))
	tmp.el.buyRobotInterval.setHTML(player.automation.open=="none"?"":("Upgrade Interval<br>Cost: "+showNum(tmp.auto[player.automation.open].intCost)+" intelligence."))
	tmp.el.buyRobotMagnitude.setHTML(player.automation.open=="none"?"":("Upgrade Magnitude<br>Cost: "+showNum(tmp.auto[player.automation.open].magCost)+" intelligence."))
	if (player.automation.open != "none") {
		tmp.el.buyRobotInterval.setClasses({btn: true, locked: (player.automation.intelligence.lt(tmp.auto[player.automation.open].intCost))})
		tmp.el.buyRobotMagnitude.setClasses({btn: true, locked: (player.automation.intelligence.lt(tmp.auto[player.automation.open].magCost))})
	}
}