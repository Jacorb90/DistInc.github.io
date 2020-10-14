function updateTempMagma() {
	if (!tmp.fn.magma) tmp.fn.magma = {}
	
	tmp.fn.magma.eff = getMagmaEff()
}

function getMagmaEff() {
	if (!modeActive("extreme")) return new ExpantaNum(1);
	let eff = player.magma.amount.sqrt().div(75).plus(1)
	return eff;
}

function getMagmaReq() {
	if (!modeActive("extreme")) return new ExpantaNum(1/0);
	let req = ExpantaNum.pow(10, ExpantaNum.pow(1.25, player.magma.amount.sqrt()).times(200))
	return req;
}

function magmaSearch() {
	if (player.magma.done) return;
	player.magma.amount = player.magma.amount.plus(1);
	player.magma.done = true;
}