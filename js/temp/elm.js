function updateTempElementary() {
	if (tmp.elm) {
		tmp.psiEff = tmp.elm.ferm.leptonR("psi");
		tmp.z1 = tmp.elm.bos.z1;
		tmp.glu2 = tmp.elm.bos.gluon2total;
		tmp.gravEff = tmp.elm.bos.gravEff;
		tmp.higgs110 = tmp.elm.bos["higgs_1;1;0"]()
		tmp.higgs011 = tmp.elm.bos["higgs_0;1;1"]()
		tmp.higgs300 = tmp.elm.bos["higgs_3;0;0"]()
		tmp.higgs130 = tmp.elm.bos["higgs_1;3;0"]()
		tmp.higgs031 = tmp.elm.bos["higgs_0;3;1"]()
		tmp.inf510 = tmp.inf.upgs.has("5;10")
		tmp.lu3 = tmp.elm.bos.photonEff(3)
		tmp.lu4 = tmp.elm.bos.photonEff(4)
		tmp.thGain = tmp.elm.theory.gain
	}

	// Elementary Layer
	tmp.elm = {};
	tmp.elm.can =
		player.rockets.gte(LAYER_REQS.elementary[0][1]) &&
		player.collapse.cadavers.gte(LAYER_REQS.elementary[1][1]) &&
		player.inf.endorsements.gte(LAYER_REQS.elementary[2][1]);
	tmp.elm.softcap = new ExpantaNum(4000)
	tmp.elm.gain = (function () {
		if (!tmp.elm.can) return new ExpantaNum(0);
		let f1 = player.rockets.max(1).log10().div(LAYER_REQS.elementary[0][1].log10()).sqrt();
		let f2 = player.collapse.cadavers.max(1).log10().div(LAYER_REQS.elementary[1][1].log10());
		let f3 = ExpantaNum.pow(2, player.inf.endorsements.div(LAYER_REQS.elementary[2][1]).sub(1));
		let gain = f1.times(f2).times(f3);
		gain = gain.times(tmp.higgs110?tmp.higgs110:1)
		gain = gain.times(tmp.higgs300?tmp.higgs300:1)
		gain = gain.times(tmp.lu4?tmp.lu4:1)
		if (gain.gte(tmp.elm.softcap)) gain = gain.pow(1/4).times(ExpantaNum.pow(tmp.elm.softcap, 3/4))
		return gain.floor();
	})();
	tmp.elm.layer = new Layer("elementary", tmp.elm.can, "multi-res", true, "elm");
	tmp.elm.doGain = function () {
		// Gains
		if (player.options.elc) if (!confirm("Are you sure you want to do this? It will take some time for you to get back here!")) return "NO";
		if (player.elementary.theory.points) {
			player.elementary.theory.points = player.elementary.theory.points.plus(tmp.thGain?tmp.thGain:new ExpantaNum(0))
			player.elementary.theory.depth = player.elementary.theory.depth.plus(1)
			player.elementary.theory.active = false
		} else {
			player.bestEP = player.bestEP.max(tmp.elm.layer.gain)
			player.elementary.particles = player.elementary.particles.plus(tmp.elm.layer.gain);
		}
		player.elementary.times = player.elementary.times.plus(1);
		
		// Achievement Rewards
		if (player.inf.derivatives.unlocks.lte(tmp.inf.derv.maxShifts)) tmp.ach[137].grant()
	};
	tmp.elm.onReset = function (prev) {
		// Reset Quarks, Leptons, & Gauge Boson sub-resources
		player.elementary.fermions.quarks.amount = new ExpantaNum(0);
		player.elementary.fermions.leptons.amount = new ExpantaNum(0);
		player.elementary.bosons.gauge = {
			amount: new ExpantaNum(0),
			force: new ExpantaNum(0),
			photons: {
				amount: new ExpantaNum(0),
				upgrades: player.elementary.bosons.gauge.photons.upgrades
			},
			w: new ExpantaNum(0),
			z: new ExpantaNum(0),
			gluons: {
				r: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades },
				g: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades },
				b: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades },
				ar: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades },
				ag: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades },
				ab: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades }
			},
			gravitons: new ExpantaNum(0)
		};
		player.elementary.bosons.scalar.amount = new ExpantaNum(0);
		player.elementary.bosons.scalar.higgs.amount = new ExpantaNum(0);
		
		// Keep stuff on Elementary reset
		if (tmp.elm.bos.hasHiggs("0;0;0")) {
			player.tr.upgrades = prev.tr.upgrades
			player.automation.unl = true
		}
		if (tmp.elm.bos.hasHiggs("0;0;1")) {
			player.inf.endorsements = new ExpantaNum(10)
			player.inf.unl = true
		}
		if (tmp.elm.bos.hasHiggs("3;0;0")) player.inf.stadium.completions = prev.inf.stadium.completions
		if (tmp.elm.bos.hasHiggs("1;2;0")) player.inf.pantheon.purge.power = prev.inf.pantheon.purge.power
		
		// Bugfixes
		infTab = "infinity"
	};

	// Elementary Tab System
	tmp.elm.updateTabs = function () {
		let tabs = Element.allFromClass("elmtab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(elmTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(ELM_TABS[tabs[i].id]());
		}
	};
	tmp.elm.showTab = function (name) {
		if (elmTab == name) return;
		elmTab = name;
		tmp.elm.updateTabs();
	};
	tmp.elm.updateTabs();

	// Fermions
	tmp.elm.ferm = {};
	tmp.elm.ferm.transfer1 = function () {
		if (player.elementary.particles.lt(1)) return;
		player.elementary.particles = player.elementary.particles.sub(1);
		player.elementary.fermions.amount = player.elementary.fermions.amount.plus(1);
	};
	tmp.elm.ferm.transfer = function (ratio) {
		if (player.elementary.particles.times(ratio).floor().lt(1)) return;
		let toSub = player.elementary.particles.times(ratio).floor();
		player.elementary.particles = player.elementary.particles.sub(toSub);
		player.elementary.fermions.amount = player.elementary.fermions.amount.plus(toSub);
	};
	// Quarks
	tmp.elm.ferm.quarkGain = player.elementary.fermions.amount
		.times(player.inf.endorsements.plus(1).sqrt())
		.times((tmp.psiEff ? tmp.psiEff : new ExpantaNum(0)).max(1));
	if (tmp.glu2) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(tmp.glu2.max(1));
	if (tmp.higgs031) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(tmp.higgs031)
	tmp.elm.ferm.quarkRewards = new ExpantaNum(player.elementary.fermions.quarks.amount).max(1).logBase(50).floor();
	if (tmp.elm.ferm.quarkRewards.gte(10)) tmp.elm.ferm.quarkRewards = tmp.elm.ferm.quarkRewards.sqrt().times(Math.sqrt(10))
	tmp.elm.ferm.quarkName = function (noExp = false) {
		let name = QUARK_NAMES[player.elementary.fermions.quarks.type - 1];
		let stacks = tmp.elm.ferm.quarkRewards
			.sub(player.elementary.fermions.quarks.type)
			.div(QUARK_NAMES.length)
			.plus(1)
			.ceil();
		return capitalFirst(name) + (noExp ? "" : stacks.gt(1) ? "<sup>" + stacks + "</sup>" : "");
	};
	tmp.elm.ferm.quarkEff = function (name) {
		let qks = player.elementary.fermions.quarks.amount;
		let stacks = tmp.elm.ferm.quarkRewards
			.sub(QUARK_NAMES.indexOf(name) + 1)
			.div(QUARK_NAMES.length)
			.plus(1)
			.ceil();
		if (stacks.gte(8)) stacks = stacks.sqrt().times(Math.sqrt(8));
		if (name == "up") return qks.plus(1).pow(ExpantaNum.mul(5, stacks));
		else if (name == "down") return qks.plus(1).pow(ExpantaNum.mul(Math.sqrt(2), stacks.sqrt()));
		else if (name == "charm") return qks.plus(1).pow(ExpantaNum.mul(0.1, stacks.cbrt()));
		else if (name == "strange")
			return player.elementary.fermions.amount
				.plus(1)
				.times(qks.plus(1).sqrt().log10().plus(1))
				.pow(ExpantaNum.mul(0.2, stacks.sqrt()))
				.times(qks.eq(0) ? 0 : 1)
				.plus(1);
		else if (name == "top")
			return ExpantaNum.pow(ExpantaNum.mul(2, qks.plus(1).log10().div(100).plus(1)), stacks.pow(0.8))
				.times(qks.eq(0) ? 0 : 1)
				.plus(1);
		else if (name == "bottom")
			return ExpantaNum.pow(ExpantaNum.mul(0.4, qks.plus(1).log10()).plus(1), stacks.plus(1));
	};
	tmp.elm.ferm.quarkR = function (name) {
		if (name == QUARK_NAMES[player.elementary.fermions.quarks.type - 1]) return tmp.elm.ferm.quarkEff(name);
		else return new ExpantaNum(1);
	};
	tmp.elm.ferm.quarkDesc = function (name) {
		let desc = QUARK_DESCS[name] + "     ";
		desc += "Currently: " + showNum(tmp.elm.ferm.quarkEff(name)) + "x";
		return desc;
	};
	tmp.elm.ferm.changeQuark = function () {
		player.elementary.fermions.quarks.type = (player.elementary.fermions.quarks.type % 6) + 1;
	};

	// Leptons
	tmp.elm.ferm.leptonGain = player.elementary.fermions.amount
		.times(tmp.inf.pantheon.totalGems.plus(1))
		.div(2.5)
		.times(tmp.elm.ferm.quarkR("top").max(1));
	if (tmp.glu2) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.glu2.max(1));
	if (tmp.higgs031) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.higgs031)
	tmp.elm.ferm.leptonRewards = new ExpantaNum(player.elementary.fermions.leptons.amount).max(1).logBase(100).floor();
	if (tmp.elm.ferm.leptonRewards.gte(7)) tmp.elm.ferm.leptonRewards = tmp.elm.ferm.leptonRewards.sqrt().times(Math.sqrt(7))
	tmp.elm.ferm.leptonName = function (noExp = false) {
		let name = LEPTON_NAMES[player.elementary.fermions.leptons.type - 1];
		let stacks = tmp.elm.ferm.leptonRewards
			.sub(player.elementary.fermions.leptons.type)
			.div(LEPTON_NAMES.length)
			.plus(1)
			.ceil();
		return capitalFirst(name) + (noExp ? "" : stacks.gt(1) ? "<sup>" + stacks + "</sup>" : "");
	};
	tmp.elm.ferm.leptonEff = function (name) {
		let lpts = player.elementary.fermions.leptons.amount;
		let stacks = tmp.elm.ferm.leptonRewards
			.sub(LEPTON_NAMES.indexOf(name) + 1)
			.div(LEPTON_NAMES.length)
			.plus(1)
			.ceil();
		if (stacks.gte(8)) stacks = stacks.sqrt().times(Math.sqrt(8));
		if (name == "electron")
			return lpts
				.plus(1)
				.times(10)
				.slog(10)
				.pow(ExpantaNum.mul(0.1, stacks.plus(1).log10().plus(1)))
				.sub(1)
				.div(10)
				.max(0);
		else if (name == "muon") return lpts.times(ExpantaNum.pow(2.5, stacks)).plus(1).times(10).slog(10).sqrt();
		else if (name == "tau")
			return ExpantaNum.pow(
				player.inf.knowledge.plus(1).log10().plus(1).log10().plus(1),
				lpts.times(ExpantaNum.pow(2.5, stacks)).plus(1).times(10).slog(10).div(5)
			);
		else if (name == "netrion")
			return lpts.times(ExpantaNum.pow(2, stacks)).plus(1).times(10).slog(10).sub(1).div(100).max(0);
		else if (name == "vibrino")
			return lpts.times(ExpantaNum.pow(1.4, stacks)).plus(1).times(16).slog(16).sub(1).div(250).max(0);
		else if (name == "psi") return lpts.plus(1).log10().plus(1).pow(stacks.plus(0.5));
	};
	tmp.elm.ferm.leptonR = function (name) {
		if (name == LEPTON_NAMES[player.elementary.fermions.leptons.type - 1]) return tmp.elm.ferm.leptonEff(name);
		else return new ExpantaNum(1);
	};
	tmp.elm.ferm.leptonDesc = function (name) {
		let desc = LEPTON_DESCS[name] + "      Currently: ";
		let eff = tmp.elm.ferm.leptonEff(name);
		if (name == "electron" || name == "netrion" || name == "vibrino") desc += "+" + showNum(eff.times(100)) + "%";
		else if (name == "muon") desc += "^" + showNum(eff);
		else desc += showNum(eff) + "x";
		return desc;
	};
	tmp.elm.ferm.changeLepton = function () {
		player.elementary.fermions.leptons.type = (player.elementary.fermions.leptons.type % 6) + 1;
	};

	// Bosons
	tmp.elm.bos = {};
	tmp.elm.bos.transfer1 = function () {
		if (player.elementary.particles.lt(1)) return;
		player.elementary.particles = player.elementary.particles.sub(1);
		player.elementary.bosons.amount = player.elementary.bosons.amount.plus(1);
	};
	tmp.elm.bos.transfer = function (ratio) {
		if (player.elementary.particles.times(ratio).floor().lt(1)) return;
		let toSub = player.elementary.particles.times(ratio).floor();
		player.elementary.particles = player.elementary.particles.sub(toSub);
		player.elementary.bosons.amount = player.elementary.bosons.amount.plus(toSub);
	};
	tmp.elm.bos.updateGluonTabs = function () {
		let tabs = Element.allFromClass("gluontab");
		for (let i = 0; i < tabs.length; i++) tabs[i].setDisplay(gluonTab == tabs[i].id);
	};
	tmp.elm.bos.showGluonTab = function (name) {
		if (gluonTab == name) return;
		gluonTab = name;
		tmp.elm.bos.updateGluonTabs();
	};
	tmp.elm.bos.updateGluonTabs();

	// Gauge Bosons
	tmp.elm.bos.gaugeGain = player.elementary.bosons.amount.times(player.inf.ascension.power.plus(1).log10().plus(1));
	tmp.elm.bos.forceGain = player.elementary.bosons.gauge.amount.pow(0.75);
	if (tmp.gravEff) tmp.elm.bos.forceGain = tmp.elm.bos.forceGain.times(tmp.gravEff);
	tmp.elm.bos.forceEff = player.elementary.bosons.gauge.force.div(10).plus(1).logBase(2).pow(0.2);
	if (player.inf.upgrades.includes("8;10")) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(player.elementary.bosons.gauge.force.plus(1).pow(0.08))
	if (tmp.ach[132].has) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(2)
	tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.times(tmp.higgs130?tmp.higgs130.max(1):1)
	let gaugeSpeed = new ExpantaNum(tmp.elm.bos.forceEff);

	// Photons
	tmp.elm.bos.photonGain = gaugeSpeed;
	if (tmp.lu3) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.times(tmp.lu3.max(1))
	tmp.elm.bos.photonCost = {
		1: ExpantaNum.pow(5, player.elementary.bosons.gauge.photons.upgrades[0].pow(2)).times(25),
		2: ExpantaNum.pow(4, player.elementary.bosons.gauge.photons.upgrades[1].pow(2)).times(40),
		3: ExpantaNum.pow(10, player.elementary.bosons.gauge.photons.upgrades[2]).times(1e4),
		4: ExpantaNum.pow(2, player.elementary.bosons.gauge.photons.upgrades[3].pow(1.1).times(ExpantaNum.pow(1.01, player.elementary.bosons.gauge.photons.upgrades[3]))).times(6e4),
	};
	tmp.elm.bos.photonEff = function (x) {
		let bought = player.elementary.bosons.gauge.photons.upgrades[x - 1];
		if (player.elementary.times.lt(1)) bought = new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(3, bought);
		if (x == 2) return ExpantaNum.pow(1.5, bought);
		if (x == 3||x == 4) return ExpantaNum.pow(2, bought);
	};
	tmp.elm.bos.buyLU = function (x) {
		if (new ExpantaNum(player.elementary.bosons.gauge.photons.amount).lt(tmp.elm.bos.photonCost[x])) return;
		player.elementary.bosons.gauge.photons.amount = new ExpantaNum(
			player.elementary.bosons.gauge.photons.amount
		).sub(tmp.elm.bos.photonCost[x]);
		player.elementary.bosons.gauge.photons.upgrades[x - 1] = new ExpantaNum(
			player.elementary.bosons.gauge.photons.upgrades[x - 1]
		).plus(1);
	};

	// W & Z Bosons
	tmp.elm.bos.wg = gaugeSpeed.times(0.4).times(tmp.z1 || 1);
	tmp.elm.bos.w1 = player.elementary.bosons.gauge.w.plus(1).log10().div(10).plus(1);
	if (player.inf.upgrades.includes("7;10")) tmp.elm.bos.w1 = player.elementary.bosons.gauge.w.plus(1).pow(0.25).max(tmp.elm.bos.w1)
	tmp.elm.bos.w2 = player.elementary.bosons.gauge.w.plus(1).log10().sqrt().plus(1);
	tmp.elm.bos.zg = gaugeSpeed.times(0.1).times(tmp.elm.bos.w1);
	tmp.elm.bos.z1 = player.elementary.bosons.gauge.z.plus(1).pow(0.04);
	if (tmp.elm.bos.z1.gte(1.4)) tmp.elm.bos.z1 = tmp.elm.bos.z1.logBase(1.4).times(1.4).min(tmp.elm.bos.z1)
	tmp.elm.bos.z2 = player.elementary.bosons.gauge.z.plus(1).pow(2);

	// Gluons
	tmp.elm.bos.updateTabs = function () {
		let tabs = Element.allFromClass("bostab");
		for (let i = 0; i < tabs.length; i++) tabs[i].setDisplay(bosTab == tabs[i].id);
	};
	tmp.elm.bos.showTab = function (name) {
		if (bosTab == name) return;
		bosTab = name;
		tmp.elm.bos.updateTabs();
	};
	tmp.elm.bos.updateTabs();
	tmp.elm.bos.gluonEff = function (col, x) {
		let bought = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1];
		if (x == 1) return ExpantaNum.pow(2, bought);
		else return ExpantaNum.pow(1.1, bought);
	};
	tmp.elm.bos.rg = gaugeSpeed.div(2.5).times(tmp.elm.bos.gluonEff("ar", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.gg = gaugeSpeed.div(2.6).times(tmp.elm.bos.gluonEff("ag", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.bg = gaugeSpeed.div(2.4).times(tmp.elm.bos.gluonEff("ab", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.arg = gaugeSpeed.div(10).times(tmp.elm.bos.gluonEff("r", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.agg = gaugeSpeed.div(9.8).times(tmp.elm.bos.gluonEff("g", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.abg = gaugeSpeed.div(10.2).times(tmp.elm.bos.gluonEff("b", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.gluonCost = function (col, x) {
		let bought = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1];
		if (x == 1) return ExpantaNum.pow(2, bought.pow(2.5).times(2)).times(100);
		else return ExpantaNum.pow(3, ExpantaNum.pow(3, bought)).times(1e3 / 3);
	};
	tmp.elm.bos.buy = function (col, x) {
		let amt = player.elementary.bosons.gauge.gluons[col].amount;
		if (amt.lt(tmp.elm.bos.gluonCost(col, x))) return;
		player.elementary.bosons.gauge.gluons[col].amount = amt.sub(tmp.elm.bos.gluonCost(col, x));
		player.elementary.bosons.gauge.gluons[col].upgrades[x - 1] = player.elementary.bosons.gauge.gluons[
			col
		].upgrades[x - 1].plus(1);
	};
	tmp.elm.bos.gluon2total = new ExpantaNum(1);
	for (let i = 0; i < GLUON_COLOURS.length; i++)
		tmp.elm.bos.gluon2total = tmp.elm.bos.gluon2total.times(tmp.elm.bos.gluonEff(GLUON_COLOURS[i], 2));

	// Gravitons
	tmp.elm.bos.gravGain = gaugeSpeed.div(1.75);
	if (player.inf.upgrades.includes("10;9")) tmp.elm.bos.gravGain = tmp.elm.bos.gravGain.times(100)
	tmp.elm.bos.gravEff = player.elementary.bosons.gauge.gravitons
		.times(player.elementary.times.plus(1))
		.plus(1)
		.log10()
		.div(10)
		.plus(1)
		.pow(2.25);

	// Scalar Bosons
	tmp.elm.bos.scalarGain = player.elementary.bosons.amount.sqrt().times(0.6);
	tmp.elm.bos.higgsGain = player.elementary.bosons.scalar.amount.div(10).pow(0.95).times(ExpantaNum.pow(2, Math.sqrt(player.elementary.bosons.scalar.higgs.upgrades.length)))
	tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(tmp.higgs011?new ExpantaNum(tmp.higgs011).max(1):1).times(tmp.higgs300?new ExpantaNum(tmp.higgs300).max(1):1)
	if (tmp.inf510) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(INF_UPGS.effects["5;10"]().hb);
	tmp.elm.bos.buyHiggs = function(id) {
		let data = HIGGS_UPGS[id]
		if (player.elementary.bosons.scalar.higgs.amount.lt(data.cost) || player.elementary.bosons.scalar.higgs.upgrades.includes(id)) return
		player.elementary.bosons.scalar.higgs.amount = player.elementary.bosons.scalar.higgs.amount.sub(data.cost)
		player.elementary.bosons.scalar.higgs.upgrades.push(id)
		if (id=="0;0;2") for (let i=1;i<=4;i++) tmp.inf.asc.activatePerk(i)
	}
	tmp.elm.bos.hasHiggs = function(id) { return player.elementary.bosons.scalar.higgs.upgrades.includes(id) }
	tmp.elm.bos["higgs_1;1;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("1;1;0")) return new ExpantaNum(1)
		let f1 = player.elementary.fermions.quarks.amount.plus(1).log10().pow(0.2).plus(1)
		let f2 = player.elementary.fermions.leptons.amount.plus(1).log10().pow(0.3).plus(1)
		let f3 = player.elementary.bosons.gauge.photons.amount.plus(1).log10().pow(0.15).plus(1)
		let f4 = player.elementary.bosons.gauge.gravitons.plus(1).log10().pow(0.25).plus(1)
		let f5 = player.elementary.bosons.scalar.higgs.amount.plus(1).log10().pow(0.1).plus(1)
		return f1.times(f2).times(f3).times(f4).times(f5).pow(0.2)
	}
	tmp.elm.bos["higgs_0;1;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;1;1")) return new ExpantaNum(1)
		let e = player.inf.endorsements.sub(36).max(0)
		if (e.gte(3)) e = e.sqrt().times(Math.sqrt(3))
		return ExpantaNum.pow(7, e).max(1)
	}
	tmp.elm.bos["higgs_3;0;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("3;0;0")) return new ExpantaNum(1)
		return ExpantaNum.pow(1.1, player.elementary.bosons.scalar.higgs.upgrades.length)
	}
	tmp.elm.bos["higgs_0;2;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;2;1")) return new ExpantaNum(1)
		return player.elementary.bosons.scalar.higgs.amount.plus(1).times(10).slog(10).pow(0.1).sub(1).times(100)
	}
	tmp.elm.bos["higgs_0;0;4"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;0;4")) return new ExpantaNum(1)
		let ret = tmp.elm.pa.active?tmp.elm.pa.speedBoost.plus(1):new ExpantaNum(1)
		if (ret.gte(1e3)) ret = ret.pow(0.95).times(Math.pow(1e3, 0.05))
		return ret
	}
	tmp.elm.bos["higgs_1;3;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("1;3;0")) return new ExpantaNum(1)
		let amt = player.inf.pantheon.angels.plus(player.inf.pantheon.demons)
		let ret = ExpantaNum.pow(10, amt.sqrt()).pow(0.2)
		return ret
	}
	tmp.elm.bos["higgs_0;3;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;3;1")) return new ExpantaNum(1)
		let ret = player.inf.pantheon.purge.power.plus(1).pow(0.9)
		return ret
	}
	
	// Perk Acceleration
	tmp.elm.pa = {}
	tmp.elm.pa.active = tmp.elm.bos.hasHiggs("0;0;2")
	tmp.elm.pa.stateStarts = {
		weakened: new ExpantaNum(3600*24),
		broken: new ExpantaNum(3600*24*365.24),
	}
	tmp.elm.pa.state = ""
	if (tmp.inf.asc.perkTimeO.gte(tmp.elm.pa.stateStarts.weakened)) tmp.elm.pa.state = "weakened"
	if (tmp.inf.asc.perkTimeO.gte(tmp.elm.pa.stateStarts.broken)) tmp.elm.pa.state = "broken"
	tmp.elm.pa.speedBoost = tmp.inf.asc.perkTimeO.div(10)
	if (tmp.elm.pa.state=="weakened") tmp.elm.pa.speedBoost = tmp.elm.pa.speedBoost.sqrt().times(ExpantaNum.sqrt(tmp.elm.pa.stateStarts.weakened))
	if (tmp.elm.pa.state=="broken") tmp.elm.pa.speedBoost = tmp.elm.pa.speedBoost.cbrt().times(ExpantaNum.pow(tmp.elm.pa.stateStarts.broken, 2/3))
	tmp.elm.pa.boost = tmp.inf.asc.perkTimeO.div(10).pow(0.07)
	if (tmp.inf.upgs.has("10;8")) tmp.elm.pa.boost = tmp.elm.pa.boost.max(tmp.inf.asc.perkTimeO.div(10).pow(0.2))
		
	// Theories
	tmp.elm.theory = {}
	tmp.elm.theory.updateTabs = function () {
		let tabs = Element.allFromClass("theorytab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(thTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(TH_TABS[tabs[i].id]());
		}
	};
	tmp.elm.theory.showTab = function (name) {
		if (thTab == name) return;
		thTab = name;
		tmp.elm.theory.updateTabs();
	};
	tmp.elm.theory.updateTabs();
	
	// The Theoriverse
	tmp.elm.theory.nerf = ExpantaNum.pow(0.88, player.elementary.theory.depth.plus(1))
	tmp.elm.theory.start = function() {
		if (!player.elementary.theory.unl) return
		tmp.elm.layer.reset(true)
		player.elementary.theory.active = !player.elementary.theory.active
	}
	tmp.elm.theory.gain = ExpantaNum.pow(2, player.elementary.theory.depth)
}
