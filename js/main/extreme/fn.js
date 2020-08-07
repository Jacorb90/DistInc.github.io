function updateTempFurnace() {
	if (!tmp.fn) tmp.fn = {};
	let adj = new ExpantaNum(1);
	if (player.tr.upgrades.includes(17) && !HCCBA("noTRU") && modeActive("extreme"))
		adj = adj.times(player.tr.cubes.plus(1).times(10).slog(10));
	if (player.tr.upgrades.includes(26) && !HCCBA("noTRU") && modeActive("extreme"))
		adj = adj.times(tmp.dc.flow.max(1).log10().plus(1));
	tmp.fn.bfEff = ExpantaNum.div(1, player.furnace.blueFlame.times(adj).div(4).plus(1));
	if (inFC(1)) tmp.fn.bfEff = new ExpantaNum(1)
	tmp.fn4base = new ExpantaNum(0.15)
	if (FCComp(5)) tmp.fn4base = tmp.fn4base.plus(ExpantaNum.mul(0.0001, player.furnace.upgrades[0]))
	if (HCCBA("noTRU")||inAnyFC()) {
		if (player.tr.upgrades.includes(35)&&!HCCBA("noTRU")) tmp.fn4base = tmp.fn4base.plus(1).sqrt().sub(1)
		else tmp.fn4base = new ExpantaNum(0)
	}
	tmp.fn1base = inFC(4)?1:(new ExpantaNum(FCComp(2)?28:3).plus(ExpantaNum.mul(tmp.fn4base, player.furnace.upgrades[3])))
	tmp.fn.gain = ExpantaNum.pow(2, player.rf.min(inFC(5)?1:(1/0))).sub(1).max(player.rf.gt(0)?1:0).times(ExpantaNum.pow(tmp.fn1base, player.furnace.upgrades[0]));
	if (player.tr.upgrades.includes(16) && !HCCBA("noTRU") && modeActive("extreme"))
		tmp.fn.gain = tmp.fn.gain.times((inFC(3)||inFC(5))?1:player.tr.cubes.plus(1));
	if (player.tr.upgrades.includes(33) && !HCCBA("noTRU") && (tmp.rockets?tmp.rockets.clPow:false)) tmp.fn.gain = tmp.fn.gain.times(new ExpantaNum(tmp.rockets.clPow.max(1)||1).min(inFC(5)?1:(1/0)))
	if (inFC(2)) tmp.fn.gain = tmp.fn.gain.pow(0.075)
	tmp.fn.eff = player.furnace.coal.plus(1).log10().pow(0.6).div(5);
	if (tmp.fn.eff.gte(1)) tmp.fn.eff = tmp.fn.eff.log10().plus(1);
	if (tmp.ach[35].has) tmp.fn.eff = tmp.fn.eff.times(2);
	if (player.tr.upgrades.includes(25) && !HCCBA("noTRU")) tmp.fn.eff = tmp.fn.eff.times(2);
	if (player.tr.upgrades.includes(31) && !HCCBA("noTRU")) tmp.fn.eff = tmp.fn.eff.times(1.8);
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
	tmp.fn.bfReq = ExpantaNum.pow(10, ExpantaNum.pow(2, player.furnace.blueFlame).sub(1)).times(1e6);
	tmp.fn.bfBulk = player.furnace.coal.div(1e6).max(1).log10().add(1).logBase(2).add(1);
	if (inFC(4)) {
		let base = 3.618
		tmp.fn.bfReq = ExpantaNum.pow(160, ExpantaNum.pow(base, player.furnace.blueFlame).sub(4)).times(1e6);
		tmp.fn.bfBulk = player.furnace.coal.div(1e6).max(1).logBase(160).add(4).logBase(base).add(1);
	}
	if (!tmp.fn.bfReset) tmp.fn.bfReset = function () {
		if (player.furnace.coal.lt(tmp.fn.bfReq)) return;
		player.furnace.coal = new ExpantaNum(0);
		player.furnace.upgrades = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
		player.furnace.blueFlame = player.furnace.blueFlame.plus(1);
	};
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
	return tmp.collapse.can && player.furnace.blueFlame.gte(FC_GOAL[player.activeFC])
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