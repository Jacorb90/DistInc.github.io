function updateTempCollapse() {
	tmp.collapse = {}
	tmp.collapse.sc = new ExpantaNum(LAYER_SC["collapse"])
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sc = tmp.collapse.sc.times(tmp.pathogens[9].eff)
	if (tmp.inf) tmp.collapse.sc = tmp.collapse.sc.times(tmp.inf.asc.perkEff(4))
	tmp.collapse.lrm = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.collapse.lrm = tmp.collapse.lrm.div(50)
	tmp.collapse.can = player.distance.gte(ExpantaNum.mul(LAYER_REQS["collapse"][1], tmp.collapse.lrm))
	if (tmp.nerfs.active("noCadavers")) tmp.collapse.can = false
	tmp.collapse.layer = new Layer("collapse", tmp.collapse.can, "normal", true)
	tmp.collapse.eff = ExpantaNum.log10(player.rank.plus(player.tier.times(5)).plus(player.collapse.cadavers).plus(1)).pow(player.collapse.cadavers.plus(1).logBase(2)).plus(player.collapse.cadavers.sqrt())
	tmp.collapse.esc = new ExpantaNum(1e12)
	if (tmp.modes.hard.active) tmp.collapse.esc = tmp.collapse.esc.div(100)
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.esc = tmp.collapse.esc.times(tmp.pathogens[10].eff)
	if (tmp.inf) tmp.collapse.esc = tmp.collapse.esc.times(tmp.inf.asc.perkEff(3))
	if (tmp.collapse.eff.gte(tmp.collapse.esc)) tmp.collapse.eff = tmp.collapse.eff.log10().times(tmp.collapse.esc.div(tmp.collapse.esc.log10()))
	tmp.collapse.doGain = function() { player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain) }
	tmp.collapse.sacEff = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.collapse.sacEff = tmp.collapse.sacEff.div(1.4)
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sacEff = tmp.collapse.sacEff.times(tmp.pathogens[6].eff)
	tmp.collapse.sacrifice = function() {
		if (player.collapse.cadavers.eq(0)||tmp.nerfs.active("noLifeEssence")) return
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(player.collapse.cadavers.times(tmp.collapse.sacEff))
		if (tmp.inf?!tmp.inf.upgs.has("2;4"):true) player.collapse.cadavers = new ExpantaNum(0)
	}
	tmp.collapse.hasMilestone = function(n) { return player.collapse.lifeEssence.gte(ESSENCE_MILESTONES[n].req) }
	tmp.collapse.onReset = function(prev) {
		if (tmp.collapse.hasMilestone(3)) player.rockets = new ExpantaNum(10)
		if (tmp.collapse.hasMilestone(4)) player.rf = new ExpantaNum(1)
		if (tmp.collapse.hasMilestone(7)) player.tr.upgrades = prev.tr.upgrades
	}
}