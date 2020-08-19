function updateTempHikersDream() {
	if (!tmp.hd) tmp.hd = {}
	tmp.hd.incline = player.distance.gte(1e3) ? ExpantaNum.sub(90, ExpantaNum.div(90, player.distance.div(1e3).log10().div(10).plus(1))) : new ExpantaNum(0)
	tmp.hd.inclineRed = ExpantaNum.sub(90, tmp.hd.incline).div(90)
	tmp.hd.energyLoss = tmp.hd.inclineRed.pow(-5)
}

function quickReset() {
	tmp.ranks.layer.reset(true)
}