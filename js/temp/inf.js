function updateTempInf() {
	tmp.inf = {}
	
	// Infinity Upgrades
	tmp.inf.upgs = {}
	tmp.inf.upgs.reset = function(force=false) {
		if (player.inf.upgrades.length==0) return
		if (!force) if (!confirm("Warning! Doing this will reset your Infinity Upgrades without giving you anything in return! Are you sure you want to do this?")) return
		player.inf.upgrades = []
	}
	tmp.inf.upgs.has = function(id) {
		if (INF_UPGS.repealed[id]) if (INF_UPGS.repealed[id].some(x => tmp.inf.upgs.has(x))) return false
		return player.inf.upgrades.includes(id)
	}	
	tmp.inf.upgs.current = function(id) {
		return showNum(INF_UPGS.effects[id]())+"x"
	}
	tmp.inf.upgs.hover = function(id) {
		tmp.infSelected = id
	}	
	tmp.inf.upgs.canBuy = function(id) {
		let reqData = INF_UPGS.reqs[id]
		if (reqData === undefined) return true
		let can = true
		reqData.map(x => can=(can==true?tmp.inf.upgs.has(x):false))
		return can
	}
	tmp.inf.upgs.desc = function(sel) {
		if (sel===undefined) return ""
		return INF_UPGS.descs[sel]+"<br>"+(!tmp.inf.upgs.has(sel)?("Cost: "+showNum(INF_UPGS.costs[sel])+" knowledge<br>"+(INF_UPGS.reqs[sel]?("Req: inf"+INF_UPGS.reqs[sel].reduce((x,y,i) => x+(i==INF_UPGS.reqs[sel].length?"":", ")+"inf"+y)+"<br>"):"")+(INF_UPGS.repeals[sel]?("Repeals: inf"+INF_UPGS.repeals[sel].reduce((x,y,i) => x+(i==INF_UPGS.repeals[sel].length?"":", ")+"inf"+y)+"<br>"):"")):"")+(INF_UPGS.effects[sel]?("Currently: "+tmp.inf.upgs.current(sel)):"")
	}
	tmp.inf.upgs.buy = function(id) {
		if (!tmp.inf.upgs.canBuy(id)) return
		if (player.inf.upgrades.includes(id)) return
		if (player.inf.knowledge.lt(INF_UPGS.costs[id])) return
		player.inf.knowledge = player.inf.knowledge.sub(INF_UPGS.costs[id])
		player.inf.upgrades.push(id)
	}
	
	// Infinity Reset Layer
	tmp.inf.fp = new ExpantaNum(1)
	tmp.inf.bc = INF_UNL
	tmp.inf.emPow = new ExpantaNum(1)
	tmp.inf.knowledgeGain = ExpantaNum.pow(ExpantaNum.pow(2, tmp.inf.emPow), player.inf.endorsements).times(player.inf.endorsements)
	if (tmp.inf.upgs.has("2;2")) tmp.inf.knowledgeGain = tmp.inf.knowledgeGain.times(INF_UPGS.effects["2;2"]())
	tmp.inf.req = ExpantaNum.pow(tmp.inf.bc, ExpantaNum.pow(ExpantaNum.pow(1.1, tmp.inf.fp), player.inf.endorsements))
	if (player.distance.lt(tmp.inf.bc)) tmp.inf.bulk = new ExpantaNum(0)
	else tmp.inf.bulk = player.distance.plus(1).logBase(tmp.inf.bc).logBase(ExpantaNum.pow(1.1, tmp.inf.fp)).plus(1).floor()
	tmp.inf.can = player.distance.gte(tmp.inf.req)
	tmp.inf.layer = new Layer("inf", tmp.inf.can, "forced", true)
	tmp.inf.forceReset = function() {
		infActive = true
		showHiddenDiv({color: "orange", title: "You have reached <span class='infinity'>Infinity</span>!", body: "The High God <span class='infinity'>Infinity</span> has seen your power, and would like to endorse you.<br><button class='btn inf' onclick='tmp.inf.layer.reset()'>Allow <span class='infinity'>Infinity</span> to endorse you</button>", tab: "inf"})
		player.inf.unl = true
	}
	tmp.inf.doGain = function() { 
		let mag = new ExpantaNum(1)
		let m = player.inf.endorsements.plus(mag).min(tmp.inf.layer.fcBulk).floor()
		player.inf.endorsements = player.inf.endorsements.max(m)
	}
	tmp.inf.onReset = function(prev) {
		closeHiddenDiv()
		infActive = false
		if (tmp.ach[81].has) {
			player.automation.unl = prev.automation.unl
			player.automation.robots = prev.automation.robots
		}
	}
}