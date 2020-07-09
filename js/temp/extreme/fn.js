function updateTempFurnace() {
	tmp.fn = {};
	let adj = new ExpantaNum(1);
	if (player.tr.upgrades.includes(17) && tmp.modes.extreme.active)
		adj = adj.times(player.tr.cubes.plus(1).times(10).slog(10));
	if (player.tr.upgrades.includes(26) && tmp.modes.extreme.active)
		adj = adj.times(tmp.dc.flow.max(1).log10().plus(1));
	tmp.fn.bfEff = ExpantaNum.div(1, player.furnace.blueFlame.times(adj).div(4).plus(1));
	tmp.fn.gain = ExpantaNum.pow(2, player.rf).sub(1).times(ExpantaNum.pow(3, player.furnace.upgrades[0]));
	if (player.tr.upgrades.includes(16) && tmp.modes.extreme.active)
		tmp.fn.gain = tmp.fn.gain.times(player.tr.cubes.plus(1));
	tmp.fn.eff = player.furnace.coal.plus(1).log10().pow(0.6).div(5);
	if (tmp.fn.eff.gte(1)) tmp.fn.eff = tmp.fn.eff.log10().plus(1);
	if (tmp.ach[35].has) tmp.fn.eff = tmp.fn.eff.times(2);
	if (player.tr.upgrades.includes(25) && tmp.modes.extreme.active) tmp.fn.eff = tmp.fn.eff.times(2);
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
		if (tmp.scaling.active("fn", player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk), "scaled")) {
			let power = tmp.scalingPower.scaled.fn;
			let exp = ExpantaNum.pow(2, power);
			tmp.fn.upgs[n].cost = ExpantaNum.pow(
				tmp.fn.upgs[n].base.div(10),
				player.furnace.upgrades[n - 1]
					.pow(exp)
					.div(tmp.scalings.scaled.fn.pow(exp.sub(1)))
					.pow(tmp.fn.bfEff.times(2))
			).times(tmp.fn.upgs[n].base);
			tmp.fn.upgs[n].bulk = player.furnace.coal
				.div(tmp.fn.upgs[n].base)
				.logBase(tmp.fn.upgs[n].base.div(10))
				.pow(tmp.fn.bfEff.times(2).pow(-1))
				.times(tmp.scalings.scaled.fn.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.plus(1)
				.floor();
		}
		if (tmp.scaling.active("fn", player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk), "superscaled")) {
			let power2 = tmp.scalingPower.superscaled.fn;
			let exp2 = ExpantaNum.pow(3, power2);
			let power = tmp.scalingPower.scaled.fn;
			let exp = ExpantaNum.pow(2, power);
			tmp.fn.upgs[n].cost = ExpantaNum.pow(
				tmp.fn.upgs[n].base.div(10),
				player.furnace.upgrades[n - 1]
					.pow(exp2)
					.div(tmp.scalings.superscaled.fn.pow(exp2.sub(1)))
					.pow(exp)
					.div(tmp.scalings.scaled.fn.pow(exp.sub(1)))
					.pow(tmp.fn.bfEff.times(2))
			).times(tmp.fn.upgs[n].base);
			tmp.fn.upgs[n].bulk = player.furnace.coal
				.div(tmp.fn.upgs[n].base)
				.logBase(tmp.fn.upgs[n].base.div(10))
				.pow(tmp.fn.bfEff.times(2).pow(-1))
				.times(tmp.scalings.scaled.fn.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.times(tmp.scalings.superscaled.fn)
				.pow(exp2.pow(-1))
				.plus(1)
				.floor();
		}
		if (tmp.scaling.active("fn", player.furnace.upgrades[n - 1].max(tmp.fn.upgs[n].bulk), "hyper")) {
			let power3 = tmp.scalingPower.hyper.fn;
			let base3 = ExpantaNum.pow(1.1, power3);
			let power2 = tmp.scalingPower.superscaled.fn;
			let exp2 = ExpantaNum.pow(3, power2);
			let power = tmp.scalingPower.scaled.fn;
			let exp = ExpantaNum.pow(2, power);
			tmp.fn.upgs[n].cost = ExpantaNum.pow(
				tmp.fn.upgs[n].base.div(10),
				ExpantaNum.pow(base3, player.furnace.upgrades[n - 1].sub(tmp.scalings.hyper.fn))
					.times(tmp.scalings.hyper.fn)
					.pow(exp2)
					.div(tmp.scalings.superscaled.fn.pow(exp2.sub(1)))
					.pow(exp)
					.div(tmp.scalings.scaled.fn.pow(exp.sub(1)))
					.pow(tmp.fn.bfEff.times(2))
			).times(tmp.fn.upgs[n].base);
			tmp.fn.upgs[n].bulk = player.furnace.coal
				.div(tmp.fn.upgs[n].base)
				.logBase(tmp.fn.upgs[n].base.div(10))
				.pow(tmp.fn.bfEff.times(2).pow(-1))
				.times(tmp.scalings.scaled.fn.pow(exp.sub(1)))
				.pow(exp.pow(-1))
				.times(tmp.scalings.superscaled.fn)
				.pow(exp2.pow(-1))
				.div(tmp.scalings.hyper.fn)
				.max(1)
				.logBase(base3)
				.add(tmp.scalings.hyper.fn)
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
	tmp.fn.bfReset = function () {
		if (player.furnace.coal.lt(tmp.fn.bfReq)) return;
		player.furnace.coal = new ExpantaNum(0);
		player.furnace.upgrades = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
		player.furnace.blueFlame = player.furnace.blueFlame.plus(1);
	};
}
