function updateTempMagma() {
	if (!tmp.fn.magma) tmp.fn.magma = {}
	
	tmp.fn.magma.eff = getMagmaEff()
	tmp.fn.magma.eff2 = getMagmaReformEff()
}

function getMagmaEff() {
	if (!modeActive("extreme")) return new ExpantaNum(1);
	let amt = player.magma.amount;
	if (player.elementary.bosons.scalar.higgs.upgrades.includes("1;1;1")) amt = amt.pow(1.6);
	let eff = amt.sqrt().div(75).plus(1)
	return eff;
}

function getMagmaReformEff() {
	if (!modeActive("extreme")) return new ExpantaNum(1);
	let eff = player.magma.ref.pow(2).div(2)
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[35]||0, 1)) eff = eff.times(ExpantaNum.pow(1.4, player.magma.ref))
	if (player.elementary.theory.tree.unl) {
		eff = eff.times(player.elementary.theory.points.plus(1).log10().plus(1).log10().plus(1))
		if (player.elementary.theory.depth.gte(6)) eff = eff.pow(player.elementary.theory.strings.amounts[0].plus(1).log10().plus(1).log10().times(1.2).plus(1))
	}
	return eff.plus(1);
}

function getMagmaReqScaling() {
	let s = 1
	if (player.elementary.bosons.scalar.higgs.upgrades.includes("1;1;1")) s /= 2
	if (tmp.fn.pl) s *= 1-tmp.fn.pl.boosts[10].toNumber();
	return s;
}

function getMagmaReq() {
	if (!modeActive("extreme")) return new ExpantaNum(1/0);
	let req = ExpantaNum.pow(10, ExpantaNum.pow(1.25, player.magma.amount.times(getMagmaReqScaling())).times(200))
	return req;
}

function getMagmaBulk() {
	if (!modeActive("extreme")) return new ExpantaNum(0);
	let req = player.furnace.enhancedCoal.max(1).log10().div(200).max(1).logBase(1.25).div(getMagmaReqScaling())
	return req.plus(1).floor();
}

function magmaSearch(max=false) {
	if (!modeActive("extreme")) return;
	if (player.furnace.enhancedCoal.lt(getMagmaReq())) return;
	if (max) player.magma.amount = player.magma.amount.max(getMagmaBulk());
	else player.magma.amount = player.magma.amount.plus(1);
}

function getMagmaReformReq() {
	if (!modeActive("extreme")) return new ExpantaNum(1/0);
	let r = player.magma.ref;
	if (r.gte(28)) r = ExpantaNum.pow(1.1, r.sub(27)).times(28)
	if (modeActive("extreme+hikers_dream")?hasDE(5):player.elementary.hc.unl) r = r.pow(TREE_UPGS[34].effect(player.elementary.theory.tree.upgrades[34]||0))
	let req = r.times(2).plus(1)
	return req.round();
}

function getMagmaReformReq2() {
	if (!modeActive("extreme")) return new ExpantaNum(1/0);
	let r = player.magma.ref;
	if (r.gte(26)) r = ExpantaNum.pow(1.5, r.sub(25)).times(26)
	if (modeActive("extreme+hikers_dream")?hasDE(5):player.elementary.hc.unl) r = r.pow(TREE_UPGS[36].effect(player.elementary.theory.tree.upgrades[36]||0))
	let req = ExpantaNum.pow(1e20, r.pow(2)).times(1e60)
	return req;
}

function getMagmaReformBulk() {
	if (!modeActive("extreme")) return new ExpantaNum(0);
	let ret1 = player.magma.amount.div(2);
	if (modeActive("extreme+hikers_dream")?hasDE(5):player.elementary.hc.unl) ret1 = ret1.root(TREE_UPGS[34].effect(player.elementary.theory.tree.upgrades[34]||0));
	if (ret1.gte(28)) ret1 = ret1.div(28).logBase(1.1).plus(27);
	let ret2 = player.inf.knowledge.div(1e60).max(1).logBase(1e20).sqrt();
	if (modeActive("extreme+hikers_dream")?hasDE(5):player.elementary.hc.unl) ret2 = ret2.root(TREE_UPGS[36].effect(player.elementary.theory.tree.upgrades[36]||0));
	if (ret2.gte(26)) ret2 = ret2.div(26).logBase(1.5).plus(25);
	
	return ret1.min(ret2).plus(1).floor();
}

function reformMagma(max=false) {
	if (!modeActive("extreme")) return;
	let req = getMagmaReformReq();
	if (player.magma.amount.lt(req)||player.inf.knowledge.lt(getMagmaReformReq2())) return;
	if (max) player.magma.ref = player.magma.ref.max(getMagmaReformBulk());
	else {
		player.magma.amount = player.magma.amount.sub(req);
		player.magma.ref = player.magma.ref.plus(1);
	}
}