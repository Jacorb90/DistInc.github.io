function updateTempFurnace() {
	if (!tmp.fn) tmp.fn = {};
	let adj = new ExpantaNum(1);
	if (player.tr.upgrades.includes(17) && !HCCBA("noTRU") && modeActive("extreme"))
		adj = adj.times(player.tr.cubes.plus(1).times(10).slog(10));
	if (player.tr.upgrades.includes(26) && !HCCBA("noTRU") && modeActive("extreme"))
		adj = adj.times(tmp.dc.flow.max(1).log10().plus(1));
	if (inFC(5)) adj = adj.times(0.725)
	if (extremeStadiumActive("quantron", 2)) adj = adj.times(0.95)
	tmp.fn.bfEff = ExpantaNum.div(1, player.furnace.blueFlame.plus(tmp.fn.enh?tmp.fn.enh.eff:0).times(adj).div(4).plus(1));
	if (tmp.fn.bfEff.lt(0.0098)) tmp.fn.bfEff = tmp.fn.bfEff.sqrt().times(Math.sqrt(0.0098));
	if (inFC(1)) tmp.fn.bfEff = new ExpantaNum(1)
	tmp.fn4base = new ExpantaNum(0.15)
	if (FCComp(5)) tmp.fn4base = tmp.fn4base.plus(ExpantaNum.mul(0.0001, player.furnace.upgrades[0]))
	if (tmp.fn.enh) if (tmp.fn.enh.unl) tmp.fn4base = tmp.fn4base.plus(ExpantaNum.mul(tmp.fn.enh.upg3eff?tmp.fn.enh.upg3eff:0, player.furnace.enhancedUpgrades[2].plus(tmp.fn.enh.upgs[3].extra)))
	if (HCCBA("noTRU")||inAnyFC()) {
		if (player.tr.upgrades.includes(35)&&!HCCBA("noTRU")) tmp.fn4base = tmp.fn4base.plus(1).sqrt().sub(1)
		else tmp.fn4base = new ExpantaNum(0)
	}
	if (extremeStadiumActive("flamis", 4) || extremeStadiumActive("nullum", 5) || extremeStadiumActive("quantron", 3)) tmp.fn4base = new ExpantaNum(0);
	tmp.fn1base = inFC(4)?1:(new ExpantaNum(FCComp(2)?28:3).plus(ExpantaNum.mul(tmp.fn4base, player.furnace.upgrades[3])))
	if (extremeStadiumActive("quantron", 4)) tmp.fn1base = tmp.fn1base.sqrt();
	tmp.fn.gain = ExpantaNum.pow(2, player.rf.min(inFC(5)?1:(1/0))).sub(1).max(player.rf.gt(0)?1:0).times(ExpantaNum.pow(tmp.fn1base, player.furnace.upgrades[0]));
	if (player.tr.upgrades.includes(16) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.fn.gain = tmp.fn.gain.times((inFC(3)||inFC(5))?1:player.tr.cubes.plus(1));
	if (player.tr.upgrades.includes(33) && !HCCBA("noTRU") && (tmp.rockets?tmp.rockets.clPow:false)) tmp.fn.gain = tmp.fn.gain.times(new ExpantaNum(tmp.rockets.clPow.max(1)||1).min(inFC(5)?1:(1/0)))
	if (inFC(2)) tmp.fn.gain = tmp.fn.gain.pow(0.075)
	if (extremeStadiumActive("flamis", 5)) tmp.fn.gain = tmp.fn.gain.pow(0.2)
	tmp.fn.eff = player.furnace.coal.plus(1).log10().pow(0.6).div(5);
	if (tmp.fn.eff.gte(1)) tmp.fn.eff = tmp.fn.eff.log10().plus(1);
	if (tmp.ach[35].has) tmp.fn.eff = tmp.fn.eff.times(2);
	if (player.tr.upgrades.includes(25) && !HCCBA("noTRU")) tmp.fn.eff = tmp.fn.eff.times(2);
	if (player.tr.upgrades.includes(31) && !HCCBA("noTRU")) tmp.fn.eff = tmp.fn.eff.times(1.8);
	if (extremeStadiumActive("spectra", 2)) tmp.fn.eff = new ExpantaNum(0)
	tmp.fn.upgs = {
		1: { base: new ExpantaNum(20) },
		2: { base: new ExpantaNum(100) },
		3: { base: new ExpantaNum(1.5e3) },
		4: { base: new ExpantaNum(1e100) },
		5: { base: new ExpantaNum("1e1000") },
	};
	for (let n = 1; n <= 5; n++) {
		tmp.fn.upgs[n].cost = ExpantaNum.pow(
			tmp.fn.upgs[n].base.div(10),
			player.furnace.upgrades[n - 1].pow(tmp.fn.bfEff.times(2))
		).times(tmp.fn.upgs[n].base);
		tmp.fn.upgs[n].bulk = player.furnace.coal
			.div(tmp.fn.upgs[n].base)
			.logBase(tmp.fn.upgs[n].base.div(10))
			.pow(tmp.fn.bfEff.times(2).pow(-1))
			.plus(1)
			.floor();
		if (scalingActive("fn", player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk), "scaled")) {
			let start = getScalingStart("scaled", "fn")
			let power = getScalingPower("scaled", "fn")
			let exp = ExpantaNum.pow(2, power);
			tmp.fn.upgs[n].cost = ExpantaNum.pow(
				tmp.fn.upgs[n].base.div(10),
				player.furnace.upgrades[n - 1]
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.pow(tmp.fn.bfEff.times(2))
			).times(tmp.fn.upgs[n].base);
			tmp.fn.upgs[n].bulk = player.furnace.coal
				.div(tmp.fn.upgs[n].base)
				.logBase(tmp.fn.upgs[n].base.div(10))
				.pow(tmp.fn.bfEff.times(2).pow(-1))
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.plus(1)
				.floor();
		}
		if (scalingActive("fn", player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk), "superscaled")) {
			let start2 = getScalingStart("superscaled", "fn");
			let power2 = getScalingPower("superscaled", "fn");
			let exp2 = ExpantaNum.pow(3, power2);
			let start = getScalingStart("scaled", "fn");
			let power = getScalingPower("scaled", "fn");
			let exp = ExpantaNum.pow(2, power);
			tmp.fn.upgs[n].cost = ExpantaNum.pow(
				tmp.fn.upgs[n].base.div(10),
				player.furnace.upgrades[n - 1]
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.pow(tmp.fn.bfEff.times(2))
			).times(tmp.fn.upgs[n].base);
			tmp.fn.upgs[n].bulk = player.furnace.coal
				.div(tmp.fn.upgs[n].base)
				.logBase(tmp.fn.upgs[n].base.div(10))
				.pow(tmp.fn.bfEff.times(2).pow(-1))
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.times(start2.pow(exp.sub(1)))
				.pow(exp2.pow(-1))
				.plus(1)
				.floor();
		}
		if (scalingActive("fn", player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk), "hyper")) {
			let start3 = getScalingStart("hyper", "fn");
			let power3 = getScalingPower("hyper", "fn");
			let base3 = ExpantaNum.pow(1.1, power3);
			let start2 = getScalingStart("superscaled", "fn");
			let power2 = getScalingPower("superscaled", "fn");
			let exp2 = ExpantaNum.pow(3, power2);
			let start = getScalingStart("scaled", "fn");
			let power = getScalingPower("scaled", "fn");
			let exp = ExpantaNum.pow(2, power);
			tmp.fn.upgs[n].cost = ExpantaNum.pow(
				tmp.fn.upgs[n].base.div(10),
				ExpantaNum.pow(base3, player.furnace.upgrades[n - 1].sub(start3))
					.times(start3)
					.pow(exp2)
					.div(start2.pow(exp2.sub(1)))
					.pow(exp)
					.div(start.pow(exp.sub(1)))
					.pow(tmp.fn.bfEff.times(2))
			).times(tmp.fn.upgs[n].base);
			tmp.fn.upgs[n].bulk = player.furnace.coal
				.div(tmp.fn.upgs[n].base)
				.logBase(tmp.fn.upgs[n].base.div(10))
				.pow(tmp.fn.bfEff.times(2).pow(-1))
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.times(start2.pow(exp2.sub(1)))
				.pow(exp2.pow(-1))
				.div(start3)
				.max(1)
				.logBase(base3)
				.plus(start3)
				.plus(1)
				.floor();
		}
		if (!tmp.fn.upgs[n].buy) tmp.fn.upgs[n].buy = function () {
			if (player.furnace.coal.lt(tmp.fn.upgs[n].cost)) return;
			player.furnace.coal = player.furnace.coal.sub(tmp.fn.upgs[n].cost);
			player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].plus(1);
		};
		if (!tmp.fn.upgs[n].max) tmp.fn.upgs[n].max = function () {
			if (player.furnace.coal.lt(tmp.fn.upgs[n].cost)) return;
			if (tmp.fn.upgs[n].bulk.floor().lte(player.furnace.upgrades[n - 1])) player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].plus(1);
			player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk.floor());
		};
	}
	tmp.fn.bfBase = inFC(4)?3.618:2
	tmp.fn.bfLB = inFC(4)?160:10
	tmp.fn.bfReq = ExpantaNum.pow(tmp.fn.bfLB, ExpantaNum.pow(tmp.fn.bfBase, player.furnace.blueFlame).sub(1)).times(1e6);
	tmp.fn.bfBulk = player.furnace.coal.div(1e6).max(1).logBase(tmp.fn.bfLB).add(1).logBase(tmp.fn.bfBase).add(1);
	if (scalingActive("bf", player.furnace.blueFlame.max(tmp.fn.bfBulk), "scaled")) {
		let start = getScalingStart("scaled", "bf")
		let power = getScalingPower("scaled", "bf")
		let exp = ExpantaNum.pow(2, power);
		tmp.fn.bfReq = ExpantaNum.pow(tmp.fn.bfLB, ExpantaNum.pow(tmp.fn.bfBase, player.furnace.blueFlame.pow(exp).div(start.pow(exp.sub(1)))).sub(1)).times(1e6);
		tmp.fn.bfBulk = player.furnace.coal.div(1e6).max(1).logBase(tmp.fn.bfLB).add(1).logBase(tmp.fn.bfBase).times(start.pow(exp.sub(1))).pow(exp.pow(-1)).add(1);
	}
	if (!tmp.fn.bfReset) tmp.fn.bfReset = function () {
		if (player.furnace.coal.lt(tmp.fn.bfReq)) return;
		player.furnace.coal = new ExpantaNum(0);
		player.furnace.upgrades = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
		player.furnace.blueFlame = player.furnace.blueFlame.plus(1);
	};
	updateFNTabs();
	if (!tmp.fn.enh) tmp.fn.enh = {}
	tmp.fn.enh.unl = tmp.ach[111].has
	tmp.fn.enh.gain = ExpantaNum.pow(1.1, tmp.fn.enh.unl?player.furnace.blueFlame:0).sub(1).times(ExpantaNum.pow(tmp.fn.enh.upg1eff?tmp.fn.enh.upg1eff:1, player.furnace.enhancedUpgrades[0].plus(tmp.fn.enh.upgs?tmp.fn.enh.upgs[1].extra:0)))
	if (tmp.ach[116].has) tmp.fn.enh.gain = tmp.fn.enh.gain.times(ExpantaNum.pow(1.4, player.inf.pantheon.purge.power))
	if ((tmp.fn.enh.moltBr||new ExpantaNum(0)).gte(1)) tmp.fn.enh.gain = tmp.fn.enh.gain.times(tmp.fn.enh.moltBrEff||1)
	tmp.fn.enh.eff = tmp.fn.enh.unl?(player.furnace.enhancedCoal.plus(1).log10().plus(1).log10().plus(1).log10().times(5)):new ExpantaNum(0)
	tmp.fn.enh.eff2exp = ExpantaNum.mul(player.furnace.enhancedUpgrades[12], tmp.fn.enh.upg13eff?tmp.fn.enh.upg13eff:0).plus(100)
	tmp.fn.enh.eff2 = tmp.fn.enh.unl?player.furnace.enhancedCoal.plus(1).pow(tmp.fn.enh.eff2exp):new ExpantaNum(1)
	if (!tmp.fn.enh.upgs) tmp.fn.enh.upgs = {
		1: { base: new ExpantaNum(100) },
		2: { base: new ExpantaNum(250) },
		3: { base: new ExpantaNum(400) },
		4: { base: new ExpantaNum(1e4) },
		5: { base: new ExpantaNum(1.25e5) },
		6: { base: new ExpantaNum(1.6e6) },
		7: { base: new ExpantaNum(1e9) },
		8: { base: new ExpantaNum(6.25e10) },
		9: { base: new ExpantaNum(6.4e12) },
		10: { base: new ExpantaNum(1e32) },
		11: { base: new ExpantaNum(1e34) },
		12: { base: new ExpantaNum(1e36) },
		13: { base: new ExpantaNum(1e40) },
	};
	tmp.fn.enh.upgs[13].costAdj = new ExpantaNum(0.75)
	for (let n = 1; n <= 13; n++) {
		tmp.fn.enh.upgs[n].cost = ExpantaNum.pow(
			tmp.fn.enh.upgs[n].base.div(10).pow(tmp.fn.enh.upgs[n].costAdj||1),
			player.furnace.enhancedUpgrades[n - 1]
		).times(tmp.fn.enh.upgs[n].base);
		tmp.fn.enh.upgs[n].bulk = player.furnace.enhancedCoal
			.div(tmp.fn.enh.upgs[n].base)
			.logBase(tmp.fn.enh.upgs[n].base.div(10).pow(tmp.fn.enh.upgs[n].costAdj||1))
			.plus(1)
			.floor();
		tmp.fn.enh.upgs[n].extra = (n<=9?((player.furnace.enhancedUpgrades[n+2]||new ExpantaNum(0)).plus(tmp.fn.enh.upgs[n+3]?(tmp.fn.enh.upgs[n+3].extra?tmp.fn.enh.upgs[n+3].extra:0):0)):new ExpantaNum(0)).times((n>6)?2:1)
		if (n<13) tmp.fn.enh.upgs[n].extra = tmp.fn.enh.upgs[n].extra.plus(player.furnace.enhancedUpgrades[12])
		if (scalingActive("efn", player.furnace.enhancedUpgrades[n - 1].max(tmp.fn.enh.upgs[n].bulk), "scaled")) {
			let start = getScalingStart("scaled", "efn")
			let power = getScalingPower("scaled", "efn")
			let exp = ExpantaNum.pow(2, power);
			tmp.fn.enh.upgs[n].cost = ExpantaNum.pow(
				tmp.fn.enh.upgs[n].base.div(10).pow(tmp.fn.enh.upgs[n].costAdj||1),
				player.furnace.enhancedUpgrades[n - 1]
					.pow(exp)
					.div(start.pow(exp.sub(1)))
			).times(tmp.fn.enh.upgs[n].base);
			tmp.fn.enh.upgs[n].bulk = player.furnace.enhancedCoal
				.div(tmp.fn.enh.upgs[n].base)
				.logBase(tmp.fn.enh.upgs[n].base.div(10).pow(tmp.fn.enh.upgs[n].costAdj||1))
				.times(start.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.plus(1)
				.floor();
		}
		if (!tmp.fn.enh.upgs[n].buy) tmp.fn.enh.upgs[n].buy = function () {
			if (player.furnace.enhancedCoal.lt(tmp.fn.enh.upgs[n].cost)) return;
			player.furnace.enhancedCoal = player.furnace.enhancedCoal.sub(tmp.fn.enh.upgs[n].cost);
			player.furnace.enhancedUpgrades[n - 1] = player.furnace.enhancedUpgrades[n - 1].plus(1);
		};
		if (!tmp.fn.enh.upgs[n].max) tmp.fn.enh.upgs[n].max = function () {
			if (player.furnace.enhancedCoal.lt(tmp.fn.enh.upgs[n].cost)) return;
			if (tmp.fn.enh.upgs[n].bulk.floor().lte(player.furnace.enhancedUpgrades[n - 1])) player.furnace.enhancedUpgrades[n - 1] = player.furnace.enhancedUpgrades[n - 1].plus(1);
			player.furnace.enhancedUpgrades[n - 1] = player.furnace.enhancedUpgrades[n - 1].max(tmp.fn.enh.upgs[n].bulk.floor());
		};
	}
	let endMod = player.inf.endorsements.sub(25).max(0)
	if (endMod.gte(3)) endMod = endMod.div(3).plus(2)
	if (endMod.gte(4)) endMod = endMod.sqrt().times(2)
	tmp.fn.enh.upg1eff = ExpantaNum.pow(ExpantaNum.add(3, ExpantaNum.mul(0.1, endMod)), player.furnace.coal.plus(1).log10().plus(1).log10().plus(1).log10().plus(1)).times(ExpantaNum.pow(1.2, endMod))
	tmp.fn.enh.upg2eff = new ExpantaNum(0.9)
	tmp.fn.enh.upg3eff = new ExpantaNum(2.5)
	tmp.fn.enh.upg13eff = ExpantaNum.add(60, endMod.div(3).floor().times(10).min(10))
	tmp.fn.enh.moltBr = player.furnace.enhancedCoal.plus(1).div(1e150).pow(1/150)
	if (player.furnace.enhancedUpgrades[12].gte(6)) tmp.fn.enh.moltBr = tmp.fn.enh.moltBr.times(player.furnace.enhancedUpgrades[12].sub(4).pow(0.6))
	tmp.fn.enh.moltBrEff = ExpantaNum.pow(tmp.fn.enh.moltBr.gte(1)?tmp.fn.enh.moltBr.plus(1):1, 27)
	tmp.fn.enh.moltBrEff2 = ExpantaNum.pow(tmp.fn.enh.moltBr.gte(1)?tmp.fn.enh.moltBr.plus(1):1, 7)
}

function startFurnChall(x) {
	if (!modeActive("extreme")) return
	if (player.activeFC==x) {
		if (FCEnd() && !player.furnChalls.includes(x)) player.furnChalls.push(x)
		player.activeFC = 0
		tmp.collapse.layer.reset(true)
	} else {
		player.activeFC = x
		tmp.collapse.layer.reset(true)
	}
}

function FCEnd() {
	return player.furnace.blueFlame.gte(FC_GOAL[player.activeFC])
}

function inAnyFC() { return player.activeFC!=0&&modeActive("extreme") }

function inFC(x) { 
	let active = modeActive("extreme")?(player.activeFC==x):false 
	if (extremeStadiumActive("cranius")) active = true
	return active
}

function FCComp(x) {
	if (extremeStadiumActive("flamis")) return false
	return modeActive("extreme")?(player.furnChalls.includes(x)):false
}

const FC_GOAL = {
	0: new ExpantaNum(0),
	1: new ExpantaNum(11),
	2: new ExpantaNum(10),
	3: new ExpantaNum(10),
	4: new ExpantaNum(6),
	5: new ExpantaNum(12),
}

// Furnace Tabs

const FN_TABBTN_SHOWN = {
	nfn: function() { return true },
	efn: function() { return tmp.ach[111].has },
}

function isFNTabShown(name) {
	return fnTab == name;
}

function getFNTabBtnsShown() {
	let btns = [];
	for (j = 0; j < Object.keys(FN_TABBTN_SHOWN).length; j++)
		if (Object.values(FN_TABBTN_SHOWN)[i]()) btns.push(Object.keys(FN_TABBTN_SHOWN)[i]);
	return btns;
}

function updateFNTabs() {
	var tabs = document.getElementsByClassName("furnaceTab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isFNTabShown(tabs[i].id));
		var elT = new Element(tabs[i].id + "tabbtn");
		elT.changeStyle("visibility", getFNTabBtnsShown().includes(tabs[i].id)?"visible":"hidden");
	}
}

function showFurnaceTab(name) {
	fnTab = name;
}