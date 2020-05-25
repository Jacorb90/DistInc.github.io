function updateTempInf() {
	if (tmp.inf) tmp.forceInfReset = function() { tmp.inf.layer.reset(true) }
	
	// Unrepealed Infinity Upgrades
	tmp.infUr = []
	if (tmp.inf) if (tmp.inf.upgs.has("4;4")) {
		tmp.infUr.push("2;1")
		tmp.infUr.push("2;2")
		tmp.infUr.push("2;3")
		tmp.infUr.push("3;2")
	}
	
	tmp.inf = {}
	
	// Infinity Upgrades
	tmp.inf.upgs = {}
	tmp.inf.upgs.repealed = function(id) {
		let rep = INF_UPGS.repealed[id]?INF_UPGS.repealed[id].some(x => player.inf.upgrades.includes(x)):false
		if (tmp.infUr.includes(id)) rep = false
		return rep
	}
	tmp.inf.upgs.shown = function(id) {
		let r = parseInt(id.split(";")[0])
		let c = parseInt(id.split(";")[1])
		if (INF_UPGS.rowReqs[r]) if (!INF_UPGS.rowReqs[r]()) return false
		if (INF_UPGS.colReqs[c]) if (!INF_UPGS.colReqs[c]()) return false
		return true
	}
	tmp.inf.upgs.reset = function(force=false) {
		if (player.inf.upgrades.length==0) return
		if (!force) if (!confirm("Warning! Doing this will reset your Infinity Upgrades without giving you anything in return, and will force an Infinity reset! Are you sure you want to do this?")) return
		player.inf.upgrades = []
		tmp.forceInfReset()
	}
	tmp.inf.upgs.has = function(id) {
		if (tmp.inf.upgs.repealed(id)) return false
		return player.inf.upgrades.includes(id)
	}	
	tmp.inf.upgs.current = function(id) {
		if (id=="2;3") return "Time Cubes: "+showNum(INF_UPGS.effects[id]()["cubes"])+"x, Knowledge: "+showNum(INF_UPGS.effects[id]()["knowledge"])+"x"
		else if (id=="3;2") return "Cadavers: "+showNum(INF_UPGS.effects[id]()["cadavers"])+"x, Knowledge: "+showNum(INF_UPGS.effects[id]()["knowledge"])+"x"
		return showNum(INF_UPGS.effects[id]())+"x"
	}
	tmp.inf.upgs.hover = function(id) {
		tmp.infSelected = id
	}	
	tmp.inf.upgs.canBuy = function(id) {
		let reqData = INF_UPGS.reqs[id]
		if (reqData === undefined) return true
		let can = true
		reqData.map(x => can=(can==true?player.inf.upgrades.includes(x):false))
		return can
	}
	tmp.inf.upgs.desc = function(sel) {
		if (sel===undefined) return ""
		return INF_UPGS.descs[sel]+"<br>"+(!tmp.inf.upgs.has(sel)?("Cost: "+showNum(INF_UPGS.costs[sel])+" knowledge<br>"+(INF_UPGS.reqs[sel]?("Req: inf"+INF_UPGS.reqs[sel].reduce((x,y,i) => x+(i==INF_UPGS.reqs[sel].length?"":", ")+"inf"+y)+"<br>"):"")+(INF_UPGS.repeals[sel]?("Repeals: inf"+INF_UPGS.repeals[sel].reduce((x,y,i) => x+(i==INF_UPGS.repeals[sel].length?"":", ")+"inf"+y)+"<br>"):"")):"")+(INF_UPGS.effects[sel]?("Currently: "+tmp.inf.upgs.current(sel)):"")
	}
	tmp.inf.upgs.buy = function(id) {
		if (!tmp.inf.upgs.canBuy(id)) return
		if (!tmp.inf.upgs.shown(id)) return
		if (player.inf.upgrades.includes(id)) return
		if (player.inf.knowledge.lt(INF_UPGS.costs[id])) return
		player.inf.knowledge = player.inf.knowledge.sub(INF_UPGS.costs[id])
		player.inf.upgrades.push(id)
	}
	
	// Infinity Reset Layer
	tmp.inf.fp = new ExpantaNum(1)
	tmp.inf.bc = INF_UNL
	tmp.inf.emPow = new ExpantaNum(1)
	tmp.inf.knowledgeBase = ExpantaNum.pow(ExpantaNum.pow(2, tmp.inf.emPow), player.inf.endorsements).times(player.inf.endorsements)
	tmp.inf.knowledgeGain = new ExpantaNum(deepCopy(tmp.inf.knowledgeBase))
	if (tmp.inf.upgs.has("2;2")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["2;2"]())
	if (tmp.inf.upgs.has("2;3")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["2;3"]()["knowledge"])
	if (tmp.inf.upgs.has("3;2")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["3;2"]()["knowledge"])
	if (tmp.inf.upgs.has("5;4")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["5;4"]())
	tmp.inf.req = ExpantaNum.pow(tmp.inf.bc, ExpantaNum.pow(ExpantaNum.pow(1.1, tmp.inf.fp), player.inf.endorsements))
	if (player.distance.lt(tmp.inf.bc)) tmp.inf.bulk = new ExpantaNum(0)
	else tmp.inf.bulk = player.distance.plus(1).logBase(tmp.inf.bc).logBase(ExpantaNum.pow(1.1, tmp.inf.fp)).plus(1).floor()
	if (tmp.scaling.active("endorsements", player.inf.endorsements.max(tmp.inf.bulk), "scaled")) {
		let power = tmp.scalingPower.scaled.endorsements
		let exp = ExpantaNum.pow(1.5, power)
		tmp.inf.req = ExpantaNum.pow(tmp.inf.bc, ExpantaNum.pow(ExpantaNum.pow(1.1, tmp.inf.fp), player.inf.endorsements.pow(exp).div(tmp.scalings.scaled.endorsements.pow(exp.sub(1)))))
		if (tmp.inf.bulk.gt(0)) tmp.inf.bulk = player.distance.plus(1).logBase(tmp.inf.bc).logBase(ExpantaNum.pow(1.1, tmp.inf.fp)).times(tmp.scalings.scaled.endorsements.pow(exp.sub(1))).pow(exp.pow(-1)).plus(1).floor()
	}
	tmp.inf.can = player.distance.gte(tmp.inf.req)
	tmp.inf.layer = new Layer("inf", tmp.inf.can, "forced", true)
	tmp.inf.forceReset = function() {
		infActive = true
		let amActive = player.inf.endorsements.eq(9)
		let message = "The High God <span class='infinity'>Infinity</span> has seen your power, and would like to endorse you.<br><button class='btn inf' onclick='tmp.inf.layer.reset()'>Allow <span class='infinity'>Infinity</span> to endorse you</button>"
		if (amActive) message = "The High God <span class='infinity'>Infinity</span> has amired your prowess, and would like to give you the ability to ascend this world and become a High God yourself.<br><button class='btn inf' onclick='tmp.inf.layer.reset()'>Allow <span class='infinity'>Infinity</span> to endorse you and turn you into a High God</button>"
		showHiddenDiv({color: "orange", title: "You have reached <span class='infinity'>Infinity</span>!", body: message, tab: "inf"})
		player.inf.unl = true
	}
	tmp.inf.doGain = function() { 
		let mag = new ExpantaNum(1)
		let m = player.inf.endorsements.plus(mag).min(tmp.inf.layer.fcBulk).floor()
		player.inf.endorsements = player.inf.endorsements.max(m)
	}
	tmp.inf.onReset = function(prev) {
		infActive = true
		if (!showContainer) closeHiddenDiv()
		if (tmp.ach[81].has) {
			player.automation.unl = prev.automation.unl
			player.automation.robots = prev.automation.robots
		}
		if (tmp.inf.upgs.has("1;4")) player.tr.upgrades = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
		else if (tmp.inf.upgs.has("1;3")) player.tr.upgrades = [1,2,3,4,5,6,7,8,9,10]
		if (tmp.inf.upgs.has("3;1")) {
			player.collapse.unl = true
			player.collapse.lifeEssence = new ExpantaNum(10000)
		}
		infActive = false
	}
	tmp.inf.updateTabs = function() {
		let tabs = Element.allFromClass("inftab")
		for (let i=0;i<tabs.length;i++) {
			tabs[i].setDisplay(infTab==tabs[i].id)
			new Element(tabs[i].id+"tabbtn").setDisplay(INF_TABS[tabs[i].id]())
		}
	}
	tmp.inf.showTab = function(name) {
		if (infTab==name) return
		infTab = name
		tmp.inf.updateTabs()
	}
	tmp.inf.updateTabs()
	
	// Ascension
	tmp.inf.asc = {}
	tmp.inf.asc.perkTime = new ExpantaNum(BASE_PERK_TIME)
	tmp.inf.asc.powerGain = new ExpantaNum(1)
	tmp.inf.asc.perkStrength = new ExpantaNum(1)
	tmp.inf.asc.perkPower = [null, tmp.inf.asc.perkStrength, tmp.inf.asc.perkStrength, tmp.inf.asc.perkStrength, tmp.inf.asc.perkStrength]
	tmp.inf.asc.perkActive = function(n) { return player.inf.ascension.time[n-1].gt(0) }
	tmp.inf.asc.anyPerkActive = function() { return player.inf.ascension.time.some(x => new ExpantaNum(x).gt(0)) }
	tmp.inf.asc.activatePerk = function(n) {
		if (player.inf.endorsements.lt(10)) return
		if (tmp.inf.asc.perkActive(n)) {
			player.inf.ascension.time[n-1] = new ExpantaNum(0)
			return
		}
		if (tmp.inf.asc.anyPerkActive()) return
		player.inf.ascension.time[n-1] = new ExpantaNum(tmp.inf.asc.perkTime)
	}
	tmp.inf.asc.perkEff = function(n) {
		let base = new ExpantaNum([null, 1, 0, 1, 1][n])
		if (!tmp.inf.asc.perkActive(n)||player.inf.endorsements.lt(10)) return base
		let pow = tmp.inf.asc.perkPower[n]
		if (n==1) return ExpantaNum.pow(10, pow)
		else if (n==2) return pow
		else if (n==3) return ExpantaNum.pow(1e15, pow)
		else if (n==4) return ExpantaNum.pow(1e10, pow)
		return undefined
	}
}