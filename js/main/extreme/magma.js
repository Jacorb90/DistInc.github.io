function updateTempMagma() {
	if (!tmp.fn.magma) tmp.fn.magma = {}
	
	tmp.fn.magma.eff = getMagmaEff()
	tmp.fn.magma.eff2 = getMagmaReformEff()
}

function getMagmaEff() {
	if (!modeActive("extreme")) return new ExpantaNum(1);
	let eff = player.magma.amount.sqrt().div(75).plus(1)
	return eff;
}

function getMagmaReformEff() {
	if (!modeActive("extreme")) return new ExpantaNum(1);
	let eff = player.magma.ref.pow(2).div(2).plus(1)
	return eff;
}

function getMagmaReq() {
	if (!modeActive("extreme")) return new ExpantaNum(1/0);
	let req = ExpantaNum.pow(10, ExpantaNum.pow(1.25, player.magma.amount).times(200))
	return req;
}

function magmaSearch() {
	if (!modeActive("extreme")) return;
	if (player.furnace.enhancedCoal.lt(getMagmaReq())) return;
	player.magma.amount = player.magma.amount.plus(1);
}

function getMagmaReformReq() {
	if (!modeActive("extreme")) return new ExpantaNum(1/0);
	let req = player.magma.ref.times(2).plus(1)
	return req;
}

function getMagmaReformReq2() {
	if (!modeActive("extreme")) return new ExpantaNum(1/0);
	let req = ExpantaNum.pow(1e20, player.magma.ref.pow(2)).times(1e60)
	return req;
}

function reformMagma() {
	if (!modeActive("extreme")) return;
	let req = getMagmaReformReq();
	if (player.magma.amount.lt(req)||player.inf.knowledge.lt(getMagmaReformReq2())) return;
	player.magma.amount = player.magma.amount.sub(req);
	player.magma.ref = player.magma.ref.plus(1);
}