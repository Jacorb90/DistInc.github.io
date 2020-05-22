function updateTempInf() {
	tmp.inf = {}
	tmp.inf.fp = new ExpantaNum(1)
	tmp.inf.bc = INF_UNL
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