function updateTempTR() {
	tmp.tr = {}
	tmp.tr.cg = new ExpantaNum(1)
	if (tmp.modes.hard.active) tmp.tr.cg = tmp.tr.cg.div(3)
	if (player.tr.upgrades.includes(1)) tmp.tr.cg = tmp.tr.cg.times(tmp.tr1)
	if (player.tr.upgrades.includes(4)) tmp.tr.cg = tmp.tr.cg.times(tmp.tr4)
	if (tmp.ach[55].has) tmp.tr.cg = tmp.tr.cg.times(1.1)
	if (tmp.pathogens && player.pathogens.unl) tmp.tr.cg = tmp.tr.cg.times(tmp.pathogens[3].eff)
	if (tmp.dc) if (player.dc.unl) tmp.tr.cg = tmp.tr.cg.times(tmp.dc.deEff)
	if (tmp.dc) if (player.tr.upgrades.includes(11)) tmp.tr.cg = tmp.tr.cg.times(tmp.tr11["cg"])
	if (tmp.inf) if (tmp.inf.upgs.has("2;3")) tmp.tr.cg = tmp.tr.cg.times(INF_UPGS.effects["2;3"]()["cubes"])
	tmp.tr.txt = player.tr.active?"Bring Time back to normal.":"Reverse Time."
	tmp.tr.esc = new ExpantaNum(1e20)
	cubes = player.tr.cubes
	if (cubes.gte(tmp.tr.esc)) cubes = cubes.cbrt().times(Math.pow(tmp.tr.esc, 2/3))
	tmp.tr.eff = cubes.plus(1).log10().plus(1).logBase(2)
	if (tmp.inf) if (tmp.inf.stadium.completed("reality")) tmp.tr.eff = tmp.tr.eff.times(3)
	tmp.tr.upg = {}
	for (let i=1;i<=TR_UPG_AMT;i++) tmp.tr.upg[i] = function() { buyTRUpg(i) }
}