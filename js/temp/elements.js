function updateHTML() {
	// Element Setup
	tmp.el = {}
	for (i=0;i<TMP_DATA.ELS.length;i++) {
		let id = TMP_DATA.ELS[i]
		tmp.el[id] = new Element(id)
	}
	
	// Options
	for (let i=0;i<Object.keys(MODES).length;i++) tmp.el[Object.keys(MODES)[i]+"Mode"].setClasses({btn: true, tb: true, opt: (!modesSelected.includes(Object.keys(MODES)[i])), optSelected: modesSelected.includes(Object.keys(MODES)[i])})
	tmp.el.sf.setTxt("Significant Figures: "+player.options.sf.toString())
	tmp.el.not.setTxt("Notation: "+capitalFirst(player.options.not))
	tmp.el.autoSave.setTxt("Auto-Save: "+(player.options.autoSave?"ON":"OFF"))
	
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
	tmp.el.rankName.setTxt((tmp.scaling.getName("rank"))+"Rank")
	
	// Tiers
	tmp.el.tier.setTxt(showNum(player.tier))
	tmp.el.tierUp.setClasses({btn: true, locked: !tmp.tiers.canTierUp})
	tmp.el.tierDesc.setTxt(tmp.tiers.desc)
	tmp.el.tierReq.setTxt(showNum(tmp.tiers.req))
	tmp.el.tierName.setTxt((tmp.scaling.getName("tier"))+"Tier")
	
	// Rockets
	tmp.el.rocketReset.setClasses({btn: true, locked: !tmp.rockets.canRocket, rckt: tmp.rockets.canRocket})
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
			tmp.el["ach"+id].changeStyle("visibility", (getAllAchievements().includes(id)?"visible":"hidden"))
		}
	}
	
	// Rocket Fuel
	tmp.el.rf.setTxt(showNum(player.rf)+(tmp.freeRF.gt(0)?(" + "+showNum(tmp.freeRF)):""))
	tmp.el.rfReset.setClasses({btn: true, locked: !tmp.rf.can, rckt: tmp.rf.can})
	tmp.el.rfReq.setTxt(showNum(tmp.rf.req))
	tmp.el.rfEff.setTxt(showNum(tmp.rf.eff.sub(1).times(100)))
	tmp.el.rfName.setTxt((tmp.scaling.getName("rf"))+"Rocket Fuel")
	
	// Automation
	tmp.el.scraps.setTxt(showNum(player.automation.scraps))
	tmp.el.intAmt.setTxt(showNum(player.automation.intelligence))
	for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) {
		tmp.el[Object.keys(ROBOT_REQS)[i]].setTxt(tmp.auto[Object.keys(ROBOT_REQS)[i]].btnTxt)
		tmp.el[Object.keys(ROBOT_REQS)[i]].setClasses({btn: true, locked: (player.automation.scraps.lt(Object.values(ROBOT_REQS)[i])&&!Object.keys(player.automation.robots).includes(Object.keys(ROBOT_REQS)[i])), rckt: (!(player.automation.scraps.lt(Object.values(ROBOT_REQS)[i])&&!Object.keys(player.automation.robots).includes(Object.keys(ROBOT_REQS)[i])))})
	}
	tmp.el.fuelbot.setDisplay(tmp.collapse.hasMilestone(5))
	tmp.el.robotTab.setDisplay(player.automation.open!="none")
	tmp.el.robotName.setTxt(capitalFirst(player.automation.open))
	tmp.el.robotInterval.setTxt(player.automation.open=="none"?"":formatTime(tmp.auto[player.automation.open].interval))
	tmp.el.robotMagnitude.setTxt(player.automation.open=="none"?"":showNum(tmp.auto[player.automation.open].magnitude))
	tmp.el.buyRobotInterval.setHTML(player.automation.open=="none"?"":("Upgrade Interval<br>Cost: "+showNum(tmp.auto[player.automation.open].intCost)+" intelligence."))
	tmp.el.buyRobotMagnitude.setHTML(player.automation.open=="none"?"":("Upgrade Magnitude<br>Cost: "+showNum(tmp.auto[player.automation.open].magCost)+" intelligence."))
	if (player.automation.open != "none") {
		tmp.el.buyRobotInterval.setClasses({btn: true, locked: (player.automation.intelligence.lt(tmp.auto[player.automation.open].intCost)), rckt: player.automation.intelligence.gte(tmp.auto[player.automation.open].intCost)})
		tmp.el.buyRobotMagnitude.setClasses({btn: true, locked: (player.automation.intelligence.lt(tmp.auto[player.automation.open].magCost)), rckt: player.automation.intelligence.gte(tmp.auto[player.automation.open].magCost)})
	}
	tmp.el.robotMax.setDisplay(tmp.ach[48].has)
	
	// Time Reversal
	tmp.el.rt.setTxt(tmp.tr.txt)
	tmp.el.tc.setTxt(showNum(player.tr.cubes))
	tmp.el.frf.setTxt(showNum(tmp.tr.eff))
	for (let i=1;i<=TR_UPG_AMT;i++) {
		let upg = TR_UPGS[i]
		let desc = upg.desc
		if (!tmp.tr2e.eq(1)&&i==2) desc+="<span class='grossminitxt'>(^"+showNum(tmp.tr2e)+")</span>"
		tmp.el["tr"+i].setHTML(desc+"<br>Cost: "+showNum(upg.cost)+" Time Cubes.")
		tmp.el["tr"+i].setClasses({btn: true, locked: (!player.tr.upgrades.includes(i)&&player.tr.cubes.lt(upg.cost)), bought: player.tr.upgrades.includes(i), rt: (!player.tr.upgrades.includes(i)&&player.tr.cubes.gte(upg.cost))})
	}
	tmp.el.trRow3.changeStyle("display", player.dc.unl)
	
	// Universal Collapse
	tmp.el.collapseReset.setClasses({btn: true, locked: !tmp.collapse.can, btndd: tmp.collapse.can})
	tmp.el.cadaverGain.setTxt(showNum(tmp.collapse.layer.gain))
	tmp.el.cadavers.setTxt(showNum(player.collapse.cadavers))
	tmp.el.cadaverEff.setTxt(showNum(tmp.collapse.eff))
	tmp.el.sacrificeCadavers.setClasses({btn: true, locked: player.collapse.cadavers.eq(0), btndd: player.collapse.cadavers.gt(0)})
	tmp.el.lifeEssence.setTxt(showNum(player.collapse.lifeEssence))
	for (let i=1;i<=EM_AMT;i++) {
		let ms = ESSENCE_MILESTONES[i]
		tmp.el["lem"+i].setHTML(ms.desc+"<br>Req: "+showNum(ms.req)+" Life Essence.")
		tmp.el["lem"+i].setClasses({msCont: true, r: !tmp.collapse.hasMilestone(i)})
	}
	
	// Pathogens
	tmp.el.pathogensAmt.setTxt(showNum(player.pathogens.amount))
	for (let i=1;i<=PTH_AMT;i++) {
		tmp.el["pth"+i].setClasses({btn: true, locked: player.pathogens.amount.lt(tmp.pathogens[i].cost), gross: player.pathogens.amount.gte(tmp.pathogens[i].cost)})
		tmp.el["pth"+i].setHTML(PTH_UPGS[i].desc+"<br>"+(tmp.scaling.getName("pathogenUpg", i))+"Level: "+showNum(player.pathogens.upgrades[i])+"<br>Currently: "+tmp.pathogens[i].disp+(player.pathogens.upgrades[i].gte(tmp.pathogens.sc[i])?("<span class='sc'>(softcapped)</span>"):"")+"<br>Cost: "+showNum(tmp.pathogens[i].cost)+" Pathogens.")
	}
	tmp.el.pthUpgPow.setHTML((!tmp.pathogens.upgPow.eq(1))?("Upgrade Power: "+showNum(tmp.pathogens.upgPow.times(100))+"%<br>"):"")
	
	// Softcaps
	for (let i=0;i<Object.keys(tmp.sc).length;i++) {
		let name = Object.keys(tmp.sc)[i]
		let reached = Object.values(tmp.sc)[i]
		tmp.el[name+"SC"].setTxt(reached?("(softcapped)"):"")
		tmp.el[name+"SC"].setClasses({sc: true})
	}
	
	// The Dark Circle
	tmp.el.darkMatter.setHTML("Dark Matter<br>Amount: "+showNum(player.dc.matter)+"<br>Effect: You gain "+showNum(tmp.dc.dmEff)+"x as many Rockets.")
	tmp.el.darkEnergy.setHTML("Dark Energy<br>Amount: "+showNum(player.dc.energy)+"<br>Effect: You gain "+showNum(tmp.dc.deEff)+"x as many Time Cubes.")
	tmp.el.darkFluid.setHTML("Dark Fluid<br>Amount: "+showNum(player.dc.fluid)+"<br>Effect: Scaled Rocket Fuel scaling starts "+showNum(tmp.dc.dfEff)+" Rocket Fuel later.")
	tmp.el.darkCore.setHTML(tmp.scaling.getName("darkCore")+"Dark Cores<br>Amount: "+showNum(player.dc.cores)+"<br>Cost: "+showNum(tmp.dc.coreCost)+" Cadavers"+(tmp.dc.coreEff.gt(0)?("<br>Effect: +"+showNum(tmp.dc.coreEff.times(100))+"% Pathogen Upgrade Power"):""))
	tmp.el.darkCore.setClasses({darkcore: true, locked: player.collapse.cadavers.lt(tmp.dc.coreCost), inactive: tmp.dc.dmGain.eq(0)})
	tmp.el.arrowToDarkMatter.setHTML(tmp.dc.dmGain.gt(0)?"&#8593;":"")
	tmp.el.darkFlow.setTxt(showNum(tmp.dc.flow))
	
	// Miscellaneous
	tmp.el.ts.setHTML(tmp.timeSpeed.eq(1)?"":("Time Speed: "+showNum(tmp.timeSpeed)+"x<br>"))
	tmp.el.body.changeStyle("background", tmp.bc)
	tmp.el.tdeEff.setHTML(tmp.ach[63].has?("Time Doesn't Exist multiplier: "+showNum(tmp.ach63)+"x "+(tmp.ach63.gte(tmp.ach63sc)?("<span class='sc'>(softcapped)</span>"):"")+"<br><br>"):"")
}