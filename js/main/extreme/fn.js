function updateTempFurnace() {
	tmp.fn = {};
	let adj = new ExpantaNum(1);
	if (player.tr.upgrades.includes(17) && modeActive("extreme"))
		adj = adj.times(player.tr.cubes.plus(1).times(10).slog(10));
	if (player.tr.upgrades.includes(26) && modeActive("extreme"))
		adj = adj.times(tmp.dc.flow.max(1).log10().plus(1));
	tmp.fn.bfEff = ExpantaNum.div(1, player.furnace.blueFlame.times(adj).div(4).plus(1));
	if (inFC(1)) tmp.fn.bfEff = new ExpantaNum(1)
	tmp.fn.gain = ExpantaNum.pow(2, player.rf).sub(1).times(ExpantaNum.pow(inFC(4)?1:ExpantaNum.mul(FCComp(2)?25:3, FCComp(5)?player.furnace.upgrades[0].plus(1).pow(1/3):1), player.furnace.upgrades[0]));
	if (player.tr.upgrades.includes(16) && modeActive("extreme"))
		tmp.fn.gain = tmp.fn.gain.times(inFC(3)?1:player.tr.cubes.plus(1));
	if (inFC(2)) tmp.fn.gain = tmp.fn.gain.pow(0.1)
	tmp.fn.eff = player.furnace.coal.plus(1).log10().pow(0.6).div(5);
	if (tmp.fn.eff.gte(1)) tmp.fn.eff = tmp.fn.eff.log10().plus(1);
	if (tmp.ach[35].has) tmp.fn.eff = tmp.fn.eff.times(2);
	if (player.tr.upgrades.includes(25) && modeActive("extreme")) tmp.fn.eff = tmp.fn.eff.times(2);
	tmp.fn.upgs = {
		1: { base: new ExpantaNum(20) },
		2: { base: new ExpantaNum(100) },
		3: { base: new ExpantaNum(1.5e3) }
	};
	for (let n = 1; n <= 3; n++) {
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
				.times(start2)
				.pow(exp2.pow(-1))
				.div(start3)
				.max(1)
				.logBase(base3)
				.add(start3)
				.plus(1)
				.floor();
		}
		tmp.fn.upgs[n].buy = function () {
			if (player.furnace.coal.lt(tmp.fn.upgs[n].cost)) return;
			player.furnace.coal = player.furnace.coal.sub(tmp.fn.upgs[n].cost);
			player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].plus(1);
		};
		tmp.fn.upgs[n].max = function () {
			if (player.furnace.coal.lt(tmp.fn.upgs[n].cost)) return;
			player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk.floor());
			if (tmp.fn.upgs[n].bulk.floor().lte(player.furnace.upgrades[n - 1]))
				player.furnace.upgrades[n - 1] = player.furnace.upgrades[n - 1].plus(1);
		};
	}
	tmp.fn.bfReq = ExpantaNum.pow(10, ExpantaNum.pow(2, player.furnace.blueFlame).sub(1)).times(1e6);
	tmp.fn.bfBulk = player.furnace.coal.div(1e6).max(1).log10().add(1).logBase(2).add(1);
	if (inFC(4)) {
		tmp.fn.bfReq = ExpantaNum.pow(160, ExpantaNum.pow(2, player.furnace.blueFlame).sub(1)).times(1e6);
		tmp.fn.bfBulk = player.furnace.coal.div(1e6).max(1).logBase(160).add(1).logBase(2).add(1);
	}
	tmp.fn.bfReset = function () {
		if (player.furnace.coal.lt(tmp.fn.bfReq)) return;
		player.furnace.coal = new ExpantaNum(0);
		player.furnace.upgrades = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
		player.furnace.blueFlame = player.furnace.blueFlame.plus(1);
	};
}

function startFurnChall(x) {
	if (!modeActive("extreme")) return
	if (player.activeFC==x) {
		player.activeFC = 0
		if (FCEnd() && !player.furnChalls.includes(x)) player.furnChalls.push(x)
		tmp.collapse.layer.reset(true)
	} else {
		player.activeFC = x
		tmp.collapse.layer.reset(true)
	}
}

function FCEnd() {
	return tmp.collapse.can && player.furnace.blueFlame.gte(10)
}

function inFC(x) {
	if (modeActive("extreme") && (x==2||x==3)) if (inFC(5)) return true
	return modeActive("extreme")?(player.activeFC==x):false
}

function FCComp(x) {
	return modeActive("extreme")?(player.furnChalls.includes(x)):false
}