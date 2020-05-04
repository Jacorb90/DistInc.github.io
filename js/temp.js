function updateTemp() {
	// Elements
	tmp.el = {}
	for (i=0;i<TMP_DATA.ELS.length;i++) {
		let id = TMP_DATA.ELS[i]
		tmp.el[id] = new Element(id)
	}
	
	// Rank Effects
	
	tmp.r2 = ExpantaNum.pow(1.1, player.rank)
	tmp.r4 = ExpantaNum.pow(3, player.tier)
	tmp.r5 = ExpantaNum.pow(1.975, player.rank)
	tmp.r8 = ExpantaNum.pow(1.1, player.rank)
	tmp.r14 = ExpantaNum.pow(player.rf.plus(1), 1.6)
	tmp.r40 = primesLTE(player.automation.scraps).max(1)
	if (tmp.r40.gte(1e9)) tmp.r40 = tmp.r40.log10().times(1e9/9)
	tmp.r55 = ExpantaNum.pow(2, player.rank)
	tmp.r111 = ExpantaNum.pow(2, player.rank)
	
	// Tier Effects
	
	let tier = player.tier
	if (tier.gte(10)) tier = tier.log10().times(10)
	tmp.t3 = ExpantaNum.pow(1.1, tier)
	tmp.t7 = ExpantaNum.pow(1.1, player.rf)

	// Time Reversal Upgrade Effects
	
	tmp.tr1 = ExpantaNum.pow(1.1, player.rank.plus(player.tier))
	tmp.tr2 = ExpantaNum.log10(player.tr.cubes.plus(1)).plus(1)
	let rockets = player.rockets
	if (rockets.gte(1e10)) rockets = rockets.pow(0.1).times(1e9)
	tmp.tr4 = ExpantaNum.pow(1.33, rockets.plus(1).log10())
	tmp.tr6 = ExpantaNum.pow(1.1, player.tr.cubes.plus(1).log10())
	tmp.tr7 = ExpantaNum.pow(1.05, player.achievements.length)
	tmp.tr8 = ExpantaNum.div(4, (tmp.auto?tmp.auto.rankbot.interval.max(1e-10):1)).cbrt().max(1)
	tmp.tr9 = ExpantaNum.div(5, (tmp.auto?tmp.auto.tierbot.interval.max(1e-10):1)).pow(0.2).max(1)
	let cubes = player.tr.cubes
	if (cubes.gte(1e10)) cubes = cubes.pow(0.1).times(1e9)
	tmp.tr10 = ExpantaNum.pow(1.1, cubes.plus(1).log10())
	
	// Universal Collapse Milestone Effects
	
	tmp.ucme1 = new ExpantaNum(100).div(player.distance.plus(1).pow(0.06989).plus(1).min(50))
	tmp.ucme5 = player.tr.cubes.plus(1).log10().plus(1).log10().plus(1)
	if (tmp.ucme5.gte(2.5)) tmp.ucme5 = tmp.ucme5.logBase(2.5).plus(1.5)
	tmp.ucme8 = (tmp.timeSpeed?tmp.timeSpeed:new ExpantaNum(1)).plus(1).logBase(2).max(1)
	if (tmp.ucme8.gte(50)) tmp.ucme8 = tmp.ucme8.times(2).log10().times(25)
	tmp.ucme10 = player.collapse.lifeEssence.plus(1).log10().plus(1).sqrt().pow(8)
	if (tmp.ucme10.gte(40)) tmp.ucme10 = tmp.ucme10.times(2.5).log10().times(20)
	
	// Acceleration
	tmp.acc = new ExpantaNum(0.1)
	if (player.rank.gt(2)) tmp.acc = tmp.acc.times(tmp.r2)
	if (player.rank.gt(3)) tmp.acc = tmp.acc.times(2)
	if (player.tier.gt(1) && player.rank.gte(3)) tmp.acc = tmp.acc.times(2)
	if (player.rank.gt(4)) tmp.acc = tmp.acc.times(tmp.r4)
	if (player.rank.gt(5)) tmp.acc = tmp.acc.times(tmp.r5)
	if (player.rank.gt(10)) tmp.acc = tmp.acc.times(2)
	if (player.tier.gt(3)) tmp.acc = tmp.acc.times(3)
	if (player.rank.gt(14)) tmp.acc = tmp.acc.times(tmp.r14)
	if (player.rank.gt(15)) tmp.acc = tmp.acc.times(4)
	if (player.tier.gt(5)) tmp.acc = tmp.acc.times(5)
	if (player.rank.gt(25)) tmp.acc = tmp.acc.times(10)
	if (player.rank.gt(50)) tmp.acc = tmp.acc.times(15)
	if (player.tier.gt(8)) tmp.acc = tmp.acc.times(10)
	if (player.tier.gt(10)) tmp.acc = tmp.acc.times(15)
	if (player.rank.gt(75)) tmp.acc = tmp.acc.times(25)
	if (player.tier.gt(15)) tmp.acc = tmp.acc.times(25)
	if (tmp.ach) if (tmp.ach[12].has) tmp.acc = tmp.acc.times(1.1)
	if (tmp.ach) if (tmp.ach[23].has) tmp.acc = tmp.acc.times(1.2)
	if (tmp.ach) if (tmp.ach[14].has) tmp.acc = tmp.acc.times(1.5)
	if (tmp.ach) if (tmp.ach[32].has) tmp.acc = tmp.acc.times(1.8)
	if (tmp.ach) if (tmp.ach[35].has) tmp.acc = tmp.acc.times(1.8)
	if (tmp.rockets) tmp.acc = tmp.acc.times(tmp.rockets.accPow)

	// Max Velocity
	tmp.maxVel = new ExpantaNum(1)
	if (player.rank.gt(1)) tmp.maxVel = tmp.maxVel.plus(1)
	if (player.rank.gt(2)) tmp.maxVel = tmp.maxVel.times(tmp.r2)
	if (player.tier.gt(1) && player.rank.gte(3)) tmp.maxVel = tmp.maxVel.times(5)
	if (player.rank.gt(4)) tmp.maxVel = tmp.maxVel.times(tmp.r4)
	if (player.rank.gt(5)) tmp.maxVel = tmp.maxVel.times(tmp.r5)
	if (player.rank.gt(8)) tmp.maxVel = tmp.maxVel.times(tmp.r8)
	if (player.rank.gt(14)) tmp.maxVel = tmp.maxVel.times(tmp.r14)
	if (player.rank.gt(55)) tmp.maxVel = tmp.maxVel.times(tmp.r55)
	if (tmp.ach) if (tmp.ach[21].has) tmp.maxVel = tmp.maxVel.times(1.1)
	if (tmp.ach) if (tmp.ach[14].has) tmp.maxVel = tmp.maxVel.times(1.5)
	if (tmp.ach) if (tmp.ach[24].has) tmp.maxVel = tmp.maxVel.times(1.25)
	if (tmp.ach) if (tmp.ach[41].has) tmp.maxVel = tmp.maxVel.times(1.5)
	if (tmp.ach) if (tmp.ach[51].has) tmp.maxVel = tmp.maxVel.times(1.5)
	if (tmp.rockets) tmp.maxVel = tmp.maxVel.times(tmp.rockets.mvPow)
	
	// Ranks
	tmp.ranks = {}
	tmp.ranks.fp = new ExpantaNum(1)
	if (player.tier.gt(0)) tmp.ranks.fp = tmp.ranks.fp.times(1.25)
	if (player.tier.gt(2)) tmp.ranks.fp = tmp.ranks.fp.times(tmp.t3)
	if (tmp.ach) if (tmp.ach[43].has) tmp.ranks.fp = tmp.ranks.fp.times(1.025)
	if (player.tr.upgrades.includes(3)) tmp.ranks.fp = tmp.ranks.fp.times(1.1)
	tmp.ranks.req = new ExpantaNum(10).times(ExpantaNum.pow(2, player.rank.div(tmp.ranks.fp).max(1).sub(1).pow(2)))
	tmp.ranks.bulk = player.distance.div(10).max(1).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).plus(1)
	if (tmp.ranks.bulk.lt(tmp.ranks.fp.plus(1))) tmp.ranks.bulk = tmp.ranks.fp.plus(1)
	tmp.ranks.desc = player.rank.lt(Number.MAX_VALUE)?(RANK_DESCS[player.rank.toNumber()]?RANK_DESCS[player.rank.toNumber()]:DEFAULT_RANK_DESC):DEFAULT_RANK_DESC
	tmp.ranks.canRankUp = player.distance.gte(tmp.ranks.req)
	tmp.ranks.layer = new Layer("rank", tmp.ranks.canRankUp, "semi-forced")
	tmp.rank = {}
	tmp.rank.onReset = function(prev) {
		if (tmp.collapse) if (tmp.collapse.hasMilestone(12)) {
			player.distance = prev.distance
			player.velocity = prev.velocity
		}
	}

	// Tiers
	tmp.tiers = {}
	tmp.tiers.fp = new ExpantaNum(1)
	tmp.tiers.req = new ExpantaNum(3).plus(player.tier.times(tmp.tiers.fp).pow(2))
	tmp.tiers.bulk = player.rank.sub(3).max(0).sqrt().div(tmp.tiers.fp).add(1)
	tmp.tiers.desc = player.tier.lt(Number.MAX_VALUE)?(TIER_DESCS[player.tier.toNumber()]?TIER_DESCS[player.tier.toNumber()]:DEFAULT_TIER_DESC):DEFAULT_TIER_DESC
	tmp.tiers.canTierUp = player.rank.gte(tmp.tiers.req)
	tmp.tiers.layer = new Layer("tier", tmp.tiers.canTierUp, "semi-forced")
	tmp.tier = {}
	tmp.tier.onReset = function(prev) {
		if (tmp.collapse) if (tmp.collapse.hasMilestone(11)) player.rank = prev.rank
	}
	
	// Rockets
	
	tmp.rockets = {}
	tmp.rockets.canRocket = player.distance.gte(LAYER_REQS["rockets"][1])
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal")
	let r = player.rockets
	if (r.gte(10)) r = r.log10().times(10)
	tmp.rockets.eff = r.plus(1).logBase(3).times(tmp.rf ? tmp.rf.eff : 1)
	tmp.rockets.accPow = tmp.acc.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	tmp.rockets.mvPow = tmp.maxVel.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	
	// Features
	
	tmp.features = {
		rockets: new Feature({name: "rockets", req: LAYER_REQS["rockets"][1], res: "distance", display: formatDistance, reached: player.rockets.gt(0)||player.rf.gt(0)}),
		automation: new Feature({name: "automation", req: AUTO_UNL, res: "distance", display: formatDistance, reached: player.automation.unl}),
		"time reversal": new Feature({name: "time reversal", req: new ExpantaNum(DISTANCES.ly), res: "distance", display: formatDistance, reached: player.tr.unl}),
		"collapse": new Feature({name: "collapse", req: new ExpantaNum(COLLAPSE_UNL), res: "distance", display: formatDistance, reached: player.collapse.unl}),
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
	tmp.rf.req = new ExpantaNum(25).times(ExpantaNum.pow(5, player.rf.div(tmp.rf.fp).pow(1.1))).round()
	tmp.rf.bulk = player.rockets.div(25).max(1).logBase(5).pow(1/1.1).times(tmp.rf.fp).add(1).floor()
	tmp.rf.can = player.rockets.gte(tmp.rf.req)
	tmp.rf.layer = new Layer("rf", tmp.rf.can, "semi-forced")
	tmp.rf.pow = new ExpantaNum(1)
	if (player.tr.upgrades.includes(5)) tmp.rf.pow = tmp.rf.pow.times(1.1)
	tmp.rf.eff = player.rf.plus(tmp.freeRF?tmp.freeRF:0).times(tmp.rf.pow).plus(1).logBase(2).plus(1).pow(0.05)
	tmp.rf.onReset = function(prev) {
		if (tmp.ach[58].has) player.rockets = prev.rockets.div(2).max(10)
		else if (tmp.collapse.hasMilestone(3)) player.rockets = new ExpantaNum(10)
	}
	
	// Automation
	
	tmp.auto = {}
	tmp.auto.scrapGain = player.distance.plus(1).pow(2).times(player.velocity.plus(1)).log10().div(100)
	if (player.rank.gt(60)) tmp.auto.scrapGain = tmp.auto.scrapGain.times(2)
	if (tmp.ach[36].has) tmp.auto.scrapGain = tmp.auto.scrapGain.times(1.5)
	if (player.tr.upgrades.includes(6)) tmp.auto.scrapGain = tmp.auto.scrapGain.times(tmp.tr6)
	tmp.auto.intGain = player.rank.plus(1).pow(2).times(player.tier.plus(1)).cbrt().div(1000)
	if (player.rank.gt(20)) tmp.auto.intGain = tmp.auto.intGain.times(2)
	if (player.rank.gt(30)) tmp.auto.intGain = tmp.auto.intGain.times(3)
	if (player.tier.gt(4)) tmp.auto.intGain = tmp.auto.intGain.times(2)
	if (player.tier.gt(12)) tmp.auto.intGain = tmp.auto.intGain.times(3)
	if (player.tier.gt(13)) tmp.auto.intGain = tmp.auto.intGain.times(4)
	if (tmp.ach[36].has) tmp.auto.intGain = tmp.auto.intGain.times(1.5)
	if (tmp.ach[46].has) tmp.auto.intGain = tmp.auto.intGain.times(2)
	if (player.rank.gt(111)) tmp.auto.intGain = tmp.auto.intGain.times(tmp.r111)
	if (player.rank.gt(40)) tmp.auto.intGain = tmp.auto.intGain.times(tmp.r40)
	if (player.tr.upgrades.includes(6)) tmp.auto.intGain = tmp.auto.intGain.times(tmp.tr6)
	for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) tmp.auto[Object.keys(ROBOT_REQS)[i]] = new Robot(Object.keys(ROBOT_REQS)[i], ROBOT_FL[Object.keys(ROBOT_REQS)[i]])
		
	// Robots
	
	tmp.rd = {}
	tmp.rd.mp = {}
	for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) tmp.rd.mp[Object.keys(ROBOT_REQS)[i]] = new ExpantaNum(1)
	if (player.tr.upgrades.includes(8)) tmp.rd.mp.rankbot = tmp.rd.mp.rankbot.times(tmp.tr8)
	if (player.tr.upgrades.includes(9)) tmp.rd.mp.tierbot = tmp.rd.mp.tierbot.times(tmp.tr9)
	
	// Layer Mults
	tmp.lm = {}
	tmp.lm.rockets = new ExpantaNum(1)
	if (tmp.ach[34].has) tmp.lm.rockets = tmp.lm.rockets.times(1.1)
	if (tmp.ach[15].has) tmp.lm.rockets = tmp.lm.rockets.times(1.05)
	if (tmp.ach[26].has) tmp.lm.rockets = tmp.lm.rockets.times(1.1)
	if (tmp.ach[44].has) tmp.lm.rockets = tmp.lm.rockets.times(1.15)
	if (player.rank.gt(100)) tmp.lm.rockets = tmp.lm.rockets.times(2)
	if (player.tr.upgrades.includes(10)) tmp.lm.rockets = tmp.lm.rockets.times(tmp.tr10)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(6)) tmp.lm.rockets = tmp.lm.rockets.times(10)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(8)) tmp.lm.rockets = tmp.lm.rockets.times(tmp.ucme8)
	tmp.lm.collapse = new ExpantaNum(1)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(5)) tmp.lm.collapse = tmp.lm.collapse.times(tmp.ucme5)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(10)) tmp.lm.collapse = tmp.lm.collapse.times(tmp.ucme10)
	if (tmp.ach[38].has) tmp.lm.collapse = tmp.lm.collapse.times(2)
	
	// Time Reversal
	
	tmp.tr = {}
	tmp.tr.cg = new ExpantaNum(1)
	if (player.tr.upgrades.includes(1)) tmp.tr.cg = tmp.tr.cg.times(tmp.tr1)
	if (player.tr.upgrades.includes(4)) tmp.tr.cg = tmp.tr.cg.times(tmp.tr4)
	if (tmp.ach[55].has) tmp.tr.cg = tmp.tr.cg.times(1.1)
	tmp.tr.txt = player.tr.active?"Bring Time back to normal.":"Reverse Time."
	tmp.tr.eff = player.tr.cubes.plus(1).log10().plus(1).logBase(2)
	tmp.tr.upg = {}
	for (let i=1;i<=TR_UPG_AMT;i++) tmp.tr.upg[i] = function() { buyTRUpg(i) }
	
	// Universal Collapse
	
	tmp.collapse = {}
	tmp.collapse.can = player.distance.gte(LAYER_REQS["collapse"][1])
	tmp.collapse.layer = new Layer("collapse", tmp.collapse.can, "normal", true)
	tmp.collapse.eff = ExpantaNum.log10(player.rank.plus(player.tier.times(5)).plus(player.collapse.cadavers).plus(1)).pow(player.collapse.cadavers.plus(1).logBase(2)).plus(player.collapse.cadavers.sqrt())
	if (tmp.collapse.eff.gte(1e12)) tmp.collapse.eff = tmp.collapse.eff.log10().times(1e12/12)
	tmp.collapse.doGain = function() { player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain) }
	tmp.collapse.sacrifice = function() {
		if (player.collapse.cadavers.eq(0)) return
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(player.collapse.cadavers)
		player.collapse.cadavers = new ExpantaNum(0)
	}
	tmp.collapse.hasMilestone = function(n) { return player.collapse.lifeEssence.gte(ESSENCE_MILESTONES[n].req) }
	tmp.collapse.onReset = function(prev) {
		if (tmp.collapse.hasMilestone(3)) player.rockets = new ExpantaNum(10)
		if (tmp.collapse.hasMilestone(4)) player.rf = new ExpantaNum(1)
		if (tmp.collapse.hasMilestone(7)) player.tr.upgrades = prev.tr.upgrades
	}
	
	// Miscellaneous
	
	tmp.freeRF = tmp.tr.eff
	tmp.timeSpeed = new ExpantaNum(1)
	if (player.tr.upgrades.includes(2)) tmp.timeSpeed = tmp.timeSpeed.times(tmp.tr2)
	if (player.tr.upgrades.includes(7)) tmp.timeSpeed = tmp.timeSpeed.times(tmp.tr7)
	if (tmp.ach[17].has) tmp.timeSpeed = tmp.timeSpeed.times(1.01)
	if (tmp.ach[27].has) tmp.timeSpeed = tmp.timeSpeed.times(1.1)
	if (tmp.ach[47].has) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (tmp.ach[18].has) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (tmp.ach[52].has) tmp.timeSpeed = tmp.timeSpeed.times(1.2)
	if (tmp.ach[57].has) tmp.timeSpeed = tmp.timeSpeed.times(1.1)
	if (player.rank.gt(35)) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (player.rank.gt(80)) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (player.rank.gt(90)) tmp.timeSpeed = tmp.timeSpeed.times(1.75)
	if (player.tier.gt(6)) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (player.tier.gt(7)) tmp.timeSpeed = tmp.timeSpeed.times(tmp.t7)
	tmp.timeSpeed = tmp.timeSpeed.times(tmp.collapse.eff)
	if (tmp.collapse.hasMilestone(1)) tmp.timeSpeed = tmp.timeSpeed.times(tmp.ucme1)
	if (tmp.collapse.hasMilestone(2)) tmp.timeSpeed = tmp.timeSpeed.times(5)
}

function updateHTML() {
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
	tmp.el.rf.setTxt(showNum(player.rf)+(tmp.freeRF.gt(0)?(" + "+showNum(tmp.freeRF)):""))
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
	tmp.el.fuelbot.setDisplay(tmp.collapse.hasMilestone(5))
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
	tmp.el.robotMax.setDisplay(tmp.ach[48].has)
	
	// Time Reversal
	tmp.el.rt.setTxt(tmp.tr.txt)
	tmp.el.tc.setTxt(showNum(player.tr.cubes))
	tmp.el.frf.setTxt(showNum(tmp.tr.eff))
	for (let i=1;i<=TR_UPG_AMT;i++) {
		let upg = TR_UPGS[i]
		tmp.el["tr"+i].setHTML(upg.desc+"<br>Cost: "+showNum(upg.cost)+" Time Cubes.")
		tmp.el["tr"+i].setClasses({btn: true, locked: (!player.tr.upgrades.includes(i)&&player.tr.cubes.lt(upg.cost)), bought: player.tr.upgrades.includes(i)})
	}
	
	// Universal Collapse
	tmp.el.collapseReset.setClasses({btn: true, locked: !tmp.collapse.can})
	tmp.el.cadaverGain.setTxt(showNum(tmp.collapse.layer.gain))
	tmp.el.cadavers.setTxt(showNum(player.collapse.cadavers))
	tmp.el.cadaverEff.setTxt(showNum(tmp.collapse.eff))
	tmp.el.sacrificeCadavers.setClasses({btn: true, locked: player.collapse.cadavers.eq(0)})
	tmp.el.lifeEssence.setTxt(showNum(player.collapse.lifeEssence))
	for (let i=1;i<=EM_AMT;i++) {
		let ms = ESSENCE_MILESTONES[i]
		tmp.el["lem"+i].setHTML(ms.desc+"<br>Req: "+showNum(ms.req)+" Life Essence.")
		tmp.el["lem"+i].setClasses({msCont: true, r: !tmp.collapse.hasMilestone(i)})
	}
	
	// Miscellaneous
	tmp.el.ts.setHTML(tmp.timeSpeed.eq(1)?"":("Time Speed: "+showNum(tmp.timeSpeed)+"x<br>"))
}