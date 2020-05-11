function updateTemp() {
	// Elements
	tmp.el = {}
	for (i=0;i<TMP_DATA.ELS.length;i++) {
		let id = TMP_DATA.ELS[i]
		tmp.el[id] = new Element(id)
	}
	
	// Options
	
	tmp.options = {}
	tmp.options.save = function(sav=player) { localStorage.setItem("dist-inc", btoa(JSON.stringify(ENString(sav)))) }
	tmp.options.setSave = function(ns) {
		tmp.options.save(ns)
		reload()
	}
	tmp.options.hardReset = function(force=false) {
		if (!force) if (!confirm("Are you sure you want to reset? You will lose all of your progress if you do this!!!")) return
		tmp.options.setSave(DEFAULT_START)
	}
	tmp.options.import = function() {
		let sav = JSON.parse(atob(prompt("Paste your save here.")))
		tmp.options.setSave(transformToEN(sav))
	}
	tmp.options.export = function() {
		let toExport = btoa(JSON.stringify(ENString(player)))
		copyToClipboard(toExport)
	}
	tmp.options.startModes = function(modes) {
		let s = transformToEN(DEFAULT_START)
		s.modes = modes
		if (s.modes.includes("aau")) s.achievements = getAllAchievements()
		tmp.options.save(s)
		reload()
	}
	tmp.options.setDropdown = function(dropdown, els) {
		let html=""
		for (let i=0;i<Object.keys(els).length;i++) {
			let el = els[Object.keys(els)[i]]
			html+="<br>"
			html+="<button class='btn tb opt' onclick='"+el.onclick+"'>"+el.txt+"</button>"
		}
		dropdown.setHTML(html+"<br><button class='btn tb opt' style='visibility: hidden;'></button>")
	}
	tmp.options.change = function(name) {
		let max = OPT_CHNG_MAX[name]
		let min = OPT_CHNG_MIN[name]
		let dropdown = new Element("dropDown")
		dropdown.changeStyle("display", dropdown.style.display=="block"?"none":"block")
		let els = {}
		for (x=min;x<=max;x++) els[x] = {txt: x.toString(), onclick:("player.options[&quot;"+name+"&quot;] = "+x+"; this.parentElement.style.display=&quot;none&quot;")}
		tmp.options.setDropdown(dropdown, els)
	}
	tmp.options.modes = {}
	tmp.options.modes.select = function(name) {
		if (modesSelected.includes(name)) modesSelected = modesSelected.filter(x => x!=name)
		else modesSelected.push(name)
	}
	tmp.options.modes.confirm = function() {
		if (modesSelected.length==0) tmp.options.startModes([])
		if (modesSelected.length==1) {
			let modeData = MODES[modesSelected[0]]
			if (modeData.balanceCheck) if (!confirm("This mode is "+modeData.balancing+". Are you sure you want to enter this run?")) return
			tmp.options.startModes(modesSelected)
		} else if (modesSelected.length==2) {
			let base = MODES[modesSelected[0]]
			for (let i=1;i<modesSelected.length;i++) {
				let mode = base.combos[modesSelected[i]]
				if (mode.balanceCheck) if (!confirm("This mode combination is "+mode.balancing+". Are you sure you want to enter this mode combination?")) return
				tmp.options.startModes(modesSelected)
			}
		} else {
			if (!confirm("You have selected more than two modes. This may cause an unbalanced or even broken game mode. Are you sure you want to do this?")) return
			tmp.options.startModes(modesSelected)
		}
	}
	
	// Modes
	
	tmp.modes = {}
	for (let i=0;i<Object.keys(MODES).length;i++) tmp.modes[Object.keys(MODES)[i]] = new Mode(Object.keys(MODES)[i])
	
	// Scalings
	
	tmp.scaling = {}
	tmp.scaling.active = function(type, v, scaling) {
		v = new ExpantaNum(v)
		let k = Object.keys(SCALING_STARTS)
		return v.gte(SCALING_STARTS[scaling][type])
	}
	tmp.scaling.getName = function(name, x=0) {
		let mx = Object.keys(SCALING_STARTS).length
		let current = ""
		let amt = new ExpantaNum(0)
		if (name=="rank"||name=="tier"||name=="rf") amt = player[name]
		else if (name=="pathogenUpg") amt = player.pathogens.upgrades[x]
		else return ""
		for (let n=mx-1;n>=0;n--) {
			let scaling = SCALING_STARTS[Object.keys(SCALING_STARTS)[n]]
			if (tmp.scaling.active(name, amt, Object.keys(SCALING_STARTS)[n])) return capitalFirst(Object.keys(SCALING_STARTS)[n])+" "
		}
		return current
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
	tmp.t9 = player.automation.intelligence.plus(1).log10().plus(1).sqrt()
	
	// Achievement Effects 
	
	tmp.ach63sc = new ExpantaNum(1e25)
	tmp.ach63 = tmp.timeSpeed?(tmp.timeSpeed.pow(0.025)):new ExpantaNum(1)
	if (tmp.ach63.gte(tmp.ach63sc)) tmp.ach63 = tmp.ach63.log10().times(tmp.ach63sc.div(tmp.ach63sc.log10()))

	// Time Reversal Upgrade Effects
	
	tmp.tr1 = ExpantaNum.pow(1.1, player.rank.plus(player.tier))
	tmp.tr2e = new ExpantaNum(1)
	if (tmp.pathogens && player.pathogens.unl) tmp.tr2e = tmp.tr2e.times(tmp.pathogens[1].eff)
	tmp.tr2 = ExpantaNum.log10(player.tr.cubes.plus(1)).plus(1).pow(tmp.tr2e)
	let rockets = player.rockets
	if (rockets.gte(1e10)) rockets = rockets.pow(0.1).times(1e9)
	tmp.tr4 = ExpantaNum.pow(1.33, rockets.plus(1).log10())
	tmp.tr6 = ExpantaNum.pow(1.1, player.tr.cubes.plus(1).log10())
	tmp.tr7 = ExpantaNum.pow(1.05, player.achievements.length)
	tmp.tr8 = ExpantaNum.div(4, (tmp.auto?tmp.auto.rankbot.interval.max(1e-10):1)).pow(1/3*(tmp.modes.hard.active?0.5:1)).max(1)
	tmp.tr9 = ExpantaNum.div(5, (tmp.auto?tmp.auto.tierbot.interval.max(1e-10):1)).pow(0.2*(tmp.modes.hard.active?0.5:1)).max(1)
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
		
	// Pathogen Upgrade Effects
	
	tmp.pth5 = (tmp.pathogens && player.pathogens.unl) ? tmp.pathogens[5].eff : new ExpantaNum(1)
	
	// Acceleration
	tmp.acc = new ExpantaNum(0.1)
	if (tmp.modes.hard.active) tmp.acc = tmp.acc.div(3)
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
	if (tmp.modes.hard.active) tmp.maxVel = tmp.maxVel.div(2)
	if (player.rank.gt(2)) tmp.maxVel = tmp.maxVel.times(tmp.r2)
	if (player.tier.gt(1) && player.rank.gte(3)) tmp.maxVel = tmp.maxVel.times(5)
	if (player.rank.gt(4)) tmp.maxVel = tmp.maxVel.times(tmp.r4)
	if (player.rank.gt(5)) tmp.maxVel = tmp.maxVel.times(tmp.r5)
	if (player.rank.gt(8)) tmp.maxVel = tmp.maxVel.times(tmp.r8)
	if (player.rank.gt(14)) tmp.maxVel = tmp.maxVel.times(tmp.r14)
	if (player.rank.gt(55)) tmp.maxVel = tmp.maxVel.times(tmp.r55)
	if (player.tier.gt(9)) tmp.maxVel = tmp.maxVel.times(tmp.t9)
	if (tmp.pathogens && player.pathogens.unl) tmp.maxVel = tmp.maxVel.times(tmp.pathogens[4].eff)
	if (tmp.ach) if (tmp.ach[21].has) tmp.maxVel = tmp.maxVel.times(1.1)
	if (tmp.ach) if (tmp.ach[14].has) tmp.maxVel = tmp.maxVel.times(1.5)
	if (tmp.ach) if (tmp.ach[24].has) tmp.maxVel = tmp.maxVel.times(1.25)
	if (tmp.ach) if (tmp.ach[41].has) tmp.maxVel = tmp.maxVel.times(1.5)
	if (tmp.ach) if (tmp.ach[51].has) tmp.maxVel = tmp.maxVel.times(1.5)
	if (tmp.ach) if (tmp.ach[61].has) tmp.maxVel = tmp.maxVel.times(1.6)
	if (tmp.rockets) tmp.maxVel = tmp.maxVel.times(tmp.rockets.mvPow)
	
	// Ranks
	tmp.ranks = {}
	tmp.ranks.fp = new ExpantaNum(1)
	if (player.tier.gt(0)) tmp.ranks.fp = tmp.ranks.fp.times(1.25)
	if (player.tier.gt(2)) tmp.ranks.fp = tmp.ranks.fp.times(tmp.t3)
	if (tmp.ach) if (tmp.ach[43].has) tmp.ranks.fp = tmp.ranks.fp.times(1.025)
	if (player.tr.upgrades.includes(3)) tmp.ranks.fp = tmp.ranks.fp.times(1.1)
	tmp.ranks.bc = new ExpantaNum(10)
	if (tmp.modes.hard.active && player.rank<3) tmp.ranks.bc = tmp.ranks.bc.times(2)
	tmp.ranks.req = new ExpantaNum(tmp.ranks.bc).times(ExpantaNum.pow(2, player.rank.div(tmp.ranks.fp).max(1).sub(1).pow(2)))
	tmp.ranks.bulk = player.distance.div(tmp.ranks.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).plus(1)
	if (tmp.scaling.active("rank", player.rank.max(tmp.ranks.bulk), "scaled")) {
		tmp.ranks.req = new ExpantaNum(tmp.ranks.bc).times(ExpantaNum.pow(2, (player.rank.pow(2).div(SCALING_STARTS.scaled.rank)).div(tmp.ranks.fp).max(1).sub(1).pow(2)))
		tmp.ranks.bulk = player.distance.div(tmp.ranks.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).times(SCALING_STARTS.scaled.rank).sqrt().plus(1)
	}
	if (tmp.scaling.active("rank", player.rank.max(tmp.ranks.bulk), "superscaled")) {
		tmp.ranks.req = new ExpantaNum(tmp.ranks.bc).times(ExpantaNum.pow(2, ((player.rank.pow(3).div(SCALING_STARTS.superscaled.rank.pow(2))).pow(2).div(SCALING_STARTS.scaled.rank)).div(tmp.ranks.fp).max(1).sub(1).pow(2)))
		tmp.ranks.bulk = player.distance.div(tmp.ranks.bc).max(1).logBase(2).sqrt().plus(1).times(tmp.ranks.fp).times(SCALING_STARTS.scaled.rank).sqrt().times(SCALING_STARTS.superscaled.rank.pow(2)).cbrt().add(1)
	}
	
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
	tmp.tiers.bc = new ExpantaNum(3)
	if (tmp.modes.hard.active && player.tier<2) tmp.tiers.bc = tmp.tiers.bc.plus(1)
	tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(player.tier.div(tmp.tiers.fp).pow(2))
	tmp.tiers.bulk = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp).add(1)
	if (tmp.scaling.active("tier", player.tier.max(tmp.tiers.bulk), "scaled")) {
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus((player.tier.pow(2).div(SCALING_STARTS.scaled.tier)).div(tmp.tiers.fp).pow(2))
		tmp.tiers.bulk = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp).times(SCALING_STARTS.scaled.tier).sqrt().add(1)
	}
	if (tmp.scaling.active("tier", player.tier.max(tmp.tiers.bulk), "superscaled")) {
		tmp.tiers.req = new ExpantaNum(tmp.tiers.bc).plus(((player.tier.pow(3).div(SCALING_STARTS.superscaled.tier.pow(2))).pow(2).div(SCALING_STARTS.scaled.tier)).div(tmp.tiers.fp).pow(2))
		tmp.tiers.bulk = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp).times(SCALING_STARTS.scaled.tier).sqrt().times(SCALING_STARTS.superscaled.tier.pow(2)).cbrt().add(1)
	}
	
	tmp.tiers.desc = player.tier.lt(Number.MAX_VALUE)?(TIER_DESCS[player.tier.toNumber()]?TIER_DESCS[player.tier.toNumber()]:DEFAULT_TIER_DESC):DEFAULT_TIER_DESC
	tmp.tiers.canTierUp = player.rank.gte(tmp.tiers.req)
	tmp.tiers.layer = new Layer("tier", tmp.tiers.canTierUp, "semi-forced")
	tmp.tier = {}
	tmp.tier.onReset = function(prev) {
		if (tmp.collapse) if (tmp.collapse.hasMilestone(11)) player.rank = prev.rank
	}
	
	// Rockets
	
	tmp.rockets = {}
	tmp.rockets.lrm = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.rockets.lrm = tmp.rockets.lrm.times(2)
	tmp.rockets.sc = LAYER_SC["rockets"]
	if (tmp.modes.hard.active) tmp.rockets.sc = new ExpantaNum(1)
	if (tmp.pathogens && player.pathogens.unl) tmp.rockets.sc = tmp.rockets.sc.times(tmp.pathogens[7].eff)
	tmp.rockets.canRocket = player.distance.gte(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm))
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal")
	tmp.rockets.esc = new ExpantaNum(5)
	if (tmp.modes.hard.active) tmp.rockets.esc = tmp.rockets.esc.sub(0.5)
	if (tmp.pathogens && player.pathogens.unl) tmp.rockets.esc = tmp.rockets.esc.plus(tmp.pathogens[8].eff)
	let r = player.rockets
	if (r.gte(10)) r = r.log10().times(10)
	tmp.rockets.eff = r.plus(1).logBase(3).times(tmp.rf ? tmp.rf.eff : 1)
	if (tmp.rockets.eff.gte(tmp.rockets.esc)) tmp.rockets.eff = tmp.rockets.eff.sqrt().times(ExpantaNum.sqrt(tmp.rockets.esc))
	tmp.rockets.accPow = tmp.acc.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	tmp.rockets.mvPow = tmp.maxVel.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	
	// Features
	
	tmp.features = {
		rockets: new Feature({name: "rockets", req: ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm), res: "distance", display: formatDistance, reached: player.rockets.gt(0)||player.rf.gt(0)}),
		automation: new Feature({name: "automation", req: ExpantaNum.mul(AUTO_UNL, (tmp.auto?tmp.auto.lrm:10)), res: "distance", display: formatDistance, reached: player.automation.unl}),
		"time reversal": new Feature({name: "time reversal", req: new ExpantaNum(DISTANCES.ly), res: "distance", display: formatDistance, reached: player.tr.unl}),
		"collapse": new Feature({name: "collapse", req: new ExpantaNum(COLLAPSE_UNL).times(tmp.collapse?tmp.collapse.lrm:1), res: "distance", display: formatDistance, reached: player.collapse.unl}),
		pathogens: new Feature({name: "pathogens", req: new ExpantaNum(PATHOGENS_UNL).times(tmp.pathogens?tmp.pathogens.lrm:1), res: ["collapse", "cadavers"], display: showNum, reached: player.pathogens.unl}),
		dc: new Feature({name: "dark circles", req: new ExpantaNum(DC_UNL), res: "distance", display: formatDistance, reached: player.dc.unl}),
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
	tmp.ta = getAllAchievements().length
	
	// Rocket Fuel
	
	tmp.rf = {}
	tmp.rf.fp = new ExpantaNum(1)
	tmp.rf.req = new ExpantaNum(25).times(ExpantaNum.pow(5, player.rf.div(tmp.rf.fp).pow(1.1))).round()
	tmp.rf.bulk = player.rockets.div(25).max(1).logBase(5).pow(1/1.1).times(tmp.rf.fp).add(1).floor()
	if (tmp.scaling.active("rf", player.rf.max(tmp.rf.bulk), "scaled")) {
		tmp.rf.req = new ExpantaNum(25).times(ExpantaNum.pow(5, (player.rf.pow(2).div(SCALING_STARTS.scaled.rf)).div(tmp.rf.fp).pow(1.1))).round()
		tmp.rf.bulk = player.rockets.div(25).max(1).logBase(5).pow(1/1.1).times(tmp.rf.fp).times(SCALING_STARTS.scaled.rf).sqrt().plus(1).floor()
	}
	if (tmp.scaling.active("rf", player.rf.max(tmp.rf.bulk), "superscaled")) {
		tmp.rf.req = new ExpantaNum(25).times(ExpantaNum.pow(5, ((player.rf.pow(3).div(SCALING_STARTS.superscaled.rf.pow(2))).pow(2).div(SCALING_STARTS.scaled.rf)).div(tmp.rf.fp).pow(1.1))).round()
		tmp.rf.bulk = player.rockets.div(25).max(1).logBase(5).pow(1/1.1).times(tmp.rf.fp).times(SCALING_STARTS.scaled.rf).sqrt().times(SCALING_STARTS.superscaled.rf.pow(2)).cbrt().plus(1).floor()
	}
	tmp.rf.can = player.rockets.gte(tmp.rf.req)
	tmp.rf.layer = new Layer("rf", tmp.rf.can, "semi-forced")
	tmp.rf.pow = new ExpantaNum(1)
	if (player.tr.upgrades.includes(5)) tmp.rf.pow = tmp.rf.pow.times(1.1)
	tmp.rf.eff = player.rf.plus(tmp.freeRF?tmp.freeRF:0).times(tmp.rf.pow).plus(1).logBase(2).plus(1).pow(0.05)
	if (tmp.modes.hard.active) tmp.rf.eff = tmp.rf.eff.sub(0.02)
	tmp.rf.onReset = function(prev) {
		if (tmp.ach[58].has) player.rockets = prev.rockets.div(2).max(10)
		else if (tmp.collapse.hasMilestone(3)) player.rockets = new ExpantaNum(10)
	}
	
	// Automation
	
	tmp.auto = {}
	tmp.auto.lrm = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.auto.lrm = tmp.auto.lrm.times(10)
	tmp.auto.scrapGain = player.distance.plus(1).pow(2).times(player.velocity.plus(1)).log10().div(100)
	if (tmp.modes.hard.active) tmp.auto.scrapGain = tmp.auto.scrapGain.div(2)
	if (player.rank.gt(60)) tmp.auto.scrapGain = tmp.auto.scrapGain.times(2)
	if (tmp.ach[36].has) tmp.auto.scrapGain = tmp.auto.scrapGain.times(1.5)
	if (player.tr.upgrades.includes(6)) tmp.auto.scrapGain = tmp.auto.scrapGain.times(tmp.tr6)
	tmp.auto.intGain = player.rank.plus(1).pow(2).times(player.tier.plus(1)).cbrt().div(1000)
	if (tmp.modes.hard.active) tmp.auto.intGain = tmp.auto.intGain.div(2)
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
	tmp.auto.intMod = new ExpantaNum(1)
	tmp.auto.magMod = new ExpantaNum(1)
	if (tmp.modes.hard.active) {
		tmp.auto.intMod = tmp.auto.intMod.times(2/3)
		tmp.auto.magMod = tmp.auto.magMod.times(2/3)
	}
		
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
	if (tmp.pathogens && player.pathogens.unl) tmp.lm.rockets = tmp.lm.rockets.times(tmp.pathogens[2].eff)
	tmp.lm.collapse = new ExpantaNum(1)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(5)) tmp.lm.collapse = tmp.lm.collapse.times(tmp.ucme5)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(10)) tmp.lm.collapse = tmp.lm.collapse.times(tmp.ucme10)
	if (tmp.ach[38].has) tmp.lm.collapse = tmp.lm.collapse.times(2)
	if (tmp.ach[65].has) tmp.lm.collapse = tmp.lm.collapse.times(1.4)
	if (tmp.collapse) if (tmp.modes.hard.active && (tmp.collapse.layer.gain.gte(10)||(tmp.clghm&&tmp.collapse.layer.gain.gte(5)))) {
		tmp.lm.collapse = tmp.lm.collapse.div(2)
		tmp.clghm = true
	}
	
	// Time Reversal
	
	tmp.tr = {}
	tmp.tr.cg = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.tr.cg = tmp.tr.cg.div(3)
	if (player.tr.upgrades.includes(1)) tmp.tr.cg = tmp.tr.cg.times(tmp.tr1)
	if (player.tr.upgrades.includes(4)) tmp.tr.cg = tmp.tr.cg.times(tmp.tr4)
	if (tmp.ach[55].has) tmp.tr.cg = tmp.tr.cg.times(1.1)
	if (tmp.pathogens && player.pathogens.unl) tmp.tr.cg = tmp.tr.cg.times(tmp.pathogens[3].eff)
	tmp.tr.txt = player.tr.active?"Bring Time back to normal.":"Reverse Time."
	tmp.tr.esc = new ExpantaNum(1e20)
	cubes = player.tr.cubes
	if (cubes.gte(tmp.tr.esc)) cubes = cubes.cbrt().times(Math.pow(tmp.tr.esc, 2/3))
	tmp.tr.eff = cubes.plus(1).log10().plus(1).logBase(2)
	tmp.tr.upg = {}
	for (let i=1;i<=TR_UPG_AMT;i++) tmp.tr.upg[i] = function() { buyTRUpg(i) }
	
	// Universal Collapse
	
	tmp.collapse = {}
	tmp.collapse.sc = new ExpantaNum(LAYER_SC["collapse"])
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sc = tmp.collapse.sc.times(tmp.pathogens[9].eff)
	tmp.collapse.lrm = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.collapse.lrm = tmp.collapse.lrm.div(50)
	tmp.collapse.can = player.distance.gte(ExpantaNum.mul(LAYER_REQS["collapse"][1], tmp.collapse.lrm))
	tmp.collapse.layer = new Layer("collapse", tmp.collapse.can, "normal", true)
	tmp.collapse.eff = ExpantaNum.log10(player.rank.plus(player.tier.times(5)).plus(player.collapse.cadavers).plus(1)).pow(player.collapse.cadavers.plus(1).logBase(2)).plus(player.collapse.cadavers.sqrt())
	tmp.collapse.esc = new ExpantaNum(1e12)
	if (tmp.modes.hard.active) tmp.collapse.esc = tmp.collapse.esc.div(100)
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.esc = tmp.collapse.esc.times(tmp.pathogens[10].eff)
	if (tmp.collapse.eff.gte(tmp.collapse.esc)) tmp.collapse.eff = tmp.collapse.eff.log10().times(tmp.collapse.esc.div(tmp.collapse.esc.log10()))
	tmp.collapse.doGain = function() { player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain) }
	tmp.collapse.sacEff = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.collapse.sacEff = tmp.collapse.sacEff.div(1.4)
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sacEff = tmp.collapse.sacEff.times(tmp.pathogens[6].eff)
	tmp.collapse.sacrifice = function() {
		if (player.collapse.cadavers.eq(0)) return
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(player.collapse.cadavers.times(tmp.collapse.sacEff))
		player.collapse.cadavers = new ExpantaNum(0)
	}
	tmp.collapse.hasMilestone = function(n) { return player.collapse.lifeEssence.gte(ESSENCE_MILESTONES[n].req) }
	tmp.collapse.onReset = function(prev) {
		if (tmp.collapse.hasMilestone(3)) player.rockets = new ExpantaNum(10)
		if (tmp.collapse.hasMilestone(4)) player.rf = new ExpantaNum(1)
		if (tmp.collapse.hasMilestone(7)) player.tr.upgrades = prev.tr.upgrades
	}
	
	// Pathogens
	
	tmp.pathogens = {}
	tmp.pathogens.lrm = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.pathogens.lrm = tmp.pathogens.lrm.div(5)
	tmp.pathogens.st = new ExpantaNum(1.25)
	tmp.pathogens.gainLEpart = player.collapse.lifeEssence.plus(1).log10().plus(1).pow(0.1).sub(1)
	tmp.pathogens.gainPTHpart = player.pathogens.amount.plus(1).log10().plus(1)
	tmp.pathogens.gain = tmp.pathogens.gainLEpart.times(tmp.pathogens.gainPTHpart)
	if (tmp.pathogens.gain.gte(tmp.pathogens.st)) tmp.pathogens.gain = tmp.pathogens.gain.sqrt().times(tmp.pathogens.st.sqrt())
	tmp.pathogens.baseGain = new ExpantaNum(tmp.pathogens.gain)
	if (tmp.ach[63].has) tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.ach63)
	if (tmp.ach[68].has) tmp.pathogens.gain = tmp.pathogens.gain.times(1.01)
	if (tmp.modes.hard.active) tmp.pathogens.gain = tmp.pathogens.gain.div(3)
	tmp.pathogens.gain = tmp.pathogens.gain.times(tmp.pth5)
	tmp.pathogens.upgPow = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.pathogens.upgPow = tmp.pathogens.upgPow.times(0.8)
	tmp.pathogens.sc = {
		1: new ExpantaNum(8),
		2: new ExpantaNum(10),
		3: new ExpantaNum(7),
		4: new ExpantaNum(16),
		5: new ExpantaNum(6),
		6: new ExpantaNum(6),
		7: new ExpantaNum(4),
		8: new ExpantaNum(4),
		9: new ExpantaNum(3),
		10: new ExpantaNum(3),
	}
	for (let i=1;i<=PTH_AMT;i++) {
		if (tmp.modes.hard.active) tmp.pathogens.sc[i] = new ExpantaNum(1)
		let upg = PTH_UPGS[i]
		tmp.pathogens[i] = { cost: upg.start.times(ExpantaNum.pow(upg.inc, player.pathogens.upgrades[i])) }
		tmp.pathogens[i].bulk = player.pathogens.amount.div(upg.start).max(1).logBase(upg.inc).add(1)
		if (tmp.scaling.active("pathogenUpg", player.pathogens.upgrades[i].max(tmp.pathogens[i].bulk), "scaled")) {
			tmp.pathogens[i].cost = upg.start.times(ExpantaNum.pow(upg.inc, (player.pathogens.upgrades[i].pow(3).div(SCALING_STARTS.scaled.pathogenUpg.pow(2)))))
			tmp.pathogens[i].bulk = player.pathogens.amount.div(upg.start).max(1).logBase(upg.inc).times(SCALING_STARTS.scaled.pathogenUpg.pow(2)).cbrt().add(1)
		}
		if (tmp.scaling.active("pathogenUpg", player.pathogens.upgrades[i].max(tmp.pathogens[i].bulk), "superscaled")) {
			tmp.pathogens[i].cost = upg.start.times(ExpantaNum.pow(upg.inc, ((player.pathogens.upgrades[i].pow(5).div(SCALING_STARTS.superscaled.pathogenUpg.pow(4))).pow(3).div(SCALING_STARTS.scaled.pathogenUpg.pow(2)))))
			tmp.pathogens[i].bulk = player.pathogens.amount.div(upg.start).max(1).logBase(upg.inc).times(SCALING_STARTS.scaled.pathogenUpg.pow(2)).cbrt().times(SCALING_STARTS.superscaled.pathogenUpg.pow(4)).pow(0.2).add(1)
		}
		tmp.pathogens[i].buy = function() {
			if (player.pathogens.amount.lt(tmp.pathogens[i].cost)) return
			player.pathogens.amount = player.pathogens.amount.sub(tmp.pathogens[i].cost)
			player.pathogens.upgrades[i] = player.pathogens.upgrades[i].plus(1)
		}
		tmp.pathogens[i].max = function() {
			if (player.pathogens.amount.lt(tmp.pathogens[i].cost)) return
			player.pathogens.amount = player.pathogens.amount.sub(tmp.pathogens[i].cost)
			player.pathogens.upgrades[i] = player.pathogens.upgrades[i].max(tmp.pathogens[i].bulk.floor())
		}
		tmp.pathogens[i].eff = function() {
			let bought = player.pathogens.upgrades[i]
			if (bought.gte(tmp.pathogens.sc[i])) bought = bought.sqrt().times(tmp.pathogens.sc[i].sqrt())
			bought = bought.times(tmp.pathogens.upgPow)
			if (i==1) return player.pathogens.amount.plus(1).log10().plus(1).log10().plus(1).pow(bought.plus(1).logBase(2).plus(bought.gt(0)?1:0))
			else if (i==2) return player.collapse.cadavers.plus(1).pow(0.3).pow(bought.plus(1).logBase(1.3))
			else if (i==3) return player.collapse.cadavers.plus(1).pow(0.4).pow(bought.plus(1).logBase(1.4))
			else if (i==4) return player.pathogens.amount.plus(1).pow(1.5).pow(bought.pow(0.9))
			else if (i==5) return ExpantaNum.pow(3, bought.sqrt())
			else if (i==6) return ExpantaNum.pow(1.4, bought.sqrt())
			else if (i==7) return bought.plus(1).logBase(2).plus(1).pow(5)
			else if (i==8) return bought.plus(1).logBase(2).plus(1).log10()
			else if (i==9) return bought.plus(1).logBase(4).plus(1).pow(1.25)
			else if (i==10) return bought.plus(1).logBase(4).plus(1).sqrt()
			else return undefined
		}()
		tmp.pathogens[i].disp = function() {
			let eff = tmp.pathogens[i].eff
			if (i==1) return "+"+showNum(eff.sub(1).times(100))+"%"
			else if (i==2) return showNum(eff)+"x"
			else if (i==3) return showNum(eff)+"x"
			else if (i==4) return showNum(eff)+"x"
			else if (i==5) return showNum(eff)+"x"
			else if (i==6) return "+"+showNum(eff.sub(1).times(100))+"%"
			else if (i==7) return showNum(eff)+"x later"
			else if (i==8) return showNum(eff)+" later"
			else if (i==9) return showNum(eff)+"x later"
			else if (i==10) return showNum(eff)+"x later"
			else return "???"
		}()
	}
	tmp.pathogens.maxAll = function() {
		for (let i=1;i<=PTH_AMT;i++) tmp.pathogens[i].max()
	}

	// The Dark Circle
	
	tmp.dc = {}
	tmp.dc.dmGain = ExpantaNum.pow(2, player.dc.cores).sub(1)
	tmp.dc.coreCost = ExpantaNum.pow(10, ExpantaNum.pow(10, player.dc.cores.div(10).plus(1))).times(10)
	tmp.dc.buyCore = function() {
		if (player.collapse.cadavers.lt(tmp.dc.coreCost)) return
		if (!player.dc.unl) return
		player.collapse.cadavers = player.collapse.cadavers.sub(tmp.dc.coreCost)
		player.dc.cores = player.dc.cores.plus(1)
	}
	tmp.dc.tick = function(diff) {
		player.dc.matter = player.dc.matter.plus(tmp.dc.dmGain.times(diff))
	}
	
	// Softcaps
	
	tmp.sc = {}
	tmp.sc.rocketGain = tmp.rockets.layer.gain.gte(tmp.rockets.sc)
	tmp.sc.rocketEff = tmp.rockets.eff.gte(tmp.rockets.esc)
	tmp.sc.timeCubeEff = player.tr.cubes.gte(tmp.tr.esc)
	tmp.sc.cadaverGain = tmp.collapse.layer.gain.gte(tmp.collapse.sc)
	tmp.sc.cadaverEff = tmp.collapse.eff.gte(tmp.collapse.esc)
	/* Pathogen Upgrades are not included here due to their amount */
	/* The 'Time Doesnt Exist' reward softcap is not included here because of a display bug :) */
	tmp.sc.pthGain = tmp.pathogens.baseGain.gte(tmp.pathogens.st)
	
	// Miscellaneous
	
	tmp.freeRF = tmp.tr.eff
	tmp.timeSpeed = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.timeSpeed = tmp.timeSpeed.times(0.75)
	if (player.tr.upgrades.includes(2)) tmp.timeSpeed = tmp.timeSpeed.times(tmp.tr2)
	if (player.tr.upgrades.includes(7)) tmp.timeSpeed = tmp.timeSpeed.times(tmp.tr7)
	if (tmp.ach[17].has) tmp.timeSpeed = tmp.timeSpeed.times(1.01)
	if (tmp.ach[27].has) tmp.timeSpeed = tmp.timeSpeed.times(1.1)
	if (tmp.ach[47].has) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (tmp.ach[18].has) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (tmp.ach[52].has) tmp.timeSpeed = tmp.timeSpeed.times(1.2)
	if (tmp.ach[57].has) tmp.timeSpeed = tmp.timeSpeed.times(1.1)
	if (tmp.ach[67].has) tmp.timeSpeed = tmp.timeSpeed.times(1.111)
	if (player.rank.gt(35)) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (player.rank.gt(45)) tmp.timeSpeed = tmp.timeSpeed.times(1.8)
	if (player.rank.gt(70)) tmp.timeSpeed = tmp.timeSpeed.times(1.4)
	if (player.rank.gt(80)) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (player.rank.gt(90)) tmp.timeSpeed = tmp.timeSpeed.times(1.75)
	if (player.rank.gt(125)) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (player.rank.gt(150)) tmp.timeSpeed = tmp.timeSpeed.times(1.55)
	if (player.rank.gt(175)) tmp.timeSpeed = tmp.timeSpeed.times(1.6)
	if (player.rank.gt(200)) tmp.timeSpeed = tmp.timeSpeed.times(1.7)
	if (player.rank.gt(250)) tmp.timeSpeed = tmp.timeSpeed.times(1.8)
	if (player.rank.gt(300)) tmp.timeSpeed = tmp.timeSpeed.times(1.9)
	if (player.rank.gt(500)) tmp.timeSpeed = tmp.timeSpeed.times(1.95)
	if (player.rank.gt(1000)) tmp.timeSpeed = tmp.timeSpeed.times(1.98)
	if (player.rank.gt(10000)) tmp.timeSpeed = tmp.timeSpeed.times(2)
	if (player.tier.gt(6)) tmp.timeSpeed = tmp.timeSpeed.times(1.5)
	if (player.tier.gt(7)) tmp.timeSpeed = tmp.timeSpeed.times(tmp.t7)
	if (player.tier.gt(16)) tmp.timeSpeed = tmp.timeSpeed.times(1.6)
	if (player.tier.gt(18)) tmp.timeSpeed = tmp.timeSpeed.times(1.8)
	if (player.tier.gt(20)) tmp.timeSpeed = tmp.timeSpeed.times(2)
	tmp.timeSpeed = tmp.timeSpeed.times(tmp.collapse.eff)
	if (tmp.collapse.hasMilestone(1)) tmp.timeSpeed = tmp.timeSpeed.times(tmp.ucme1)
	if (tmp.collapse.hasMilestone(2)) tmp.timeSpeed = tmp.timeSpeed.times(5)
	tmp.bc = function() {
		let color = "white"
		if (player.tr.active) color = "#de97de"
		return color
	}()
}

function setupHTML() {
	// Achievement Table
	let achTable = new Element("achTable")
	let table = ""
	for (let r=1;r<=ACH_DATA.rows;r++) {
		table+="<tr>"
		for (let c=1;c<=ACH_DATA.cols;c++) {
			let id = r*10+c
			table+="<td id='ach"+id+"' class='achCont' onmouseover='tmp.ach["+id+"].select()'>"
			table+="</td>"
		}
		table+="</tr>"
	}
	achTable.setHTML(table)
}

function updateHTML() {
	// Options
	
	for (let i=0;i<Object.keys(MODES).length;i++) tmp.el[Object.keys(MODES)[i]+"Mode"].setClasses({btn: true, tb: true, opt: (!modesSelected.includes(Object.keys(MODES)[i])), optSelected: modesSelected.includes(Object.keys(MODES)[i])})
	tmp.el.sf.setTxt("Significant Figures: "+player.options.sf.toString())
	
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
	tmp.el.darkMatter.setHTML("Dark Matter<br>Amount: "+showNum(player.dc.matter)+"<br>Effect: Nothing (yet)")
	tmp.el.darkEnergy.setHTML("Dark Energy<br>Amount: "+showNum(player.dc.energy)+"<br>Effect: Nothing (yet)")
	tmp.el.darkFluid.setHTML("Dark Fluid<br>Amount: "+showNum(player.dc.fluid)+"<br>Effect: Nothing (yet)")
	tmp.el.darkCore.setHTML("Dark Cores<br>Amount: "+showNum(player.dc.cores)+"<br>Cost: "+showNum(tmp.dc.coreCost)+" Cadavers")
	tmp.el.darkCore.setClasses({darkcore: true, locked: player.collapse.cadavers.lt(tmp.dc.coreCost), inactive: tmp.dc.dmGain.eq(0)})
	tmp.el.arrowToDarkMatter.setHTML(tmp.dc.dmGain.gt(0)?"&#8593;":"")
	
	// Miscellaneous
	tmp.el.ts.setHTML(tmp.timeSpeed.eq(1)?"":("Time Speed: "+showNum(tmp.timeSpeed)+"x<br>"))
	tmp.el.body.changeStyle("background", tmp.bc)
	tmp.el.tdeEff.setHTML(tmp.ach[63].has?("Time Doesn't Exist multiplier: "+showNum(tmp.ach63)+"x "+(tmp.ach63.gte(tmp.ach63sc)?("<span class='sc'>(softcapped)</span>"):"")+"<br><br>"):"")
}