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
		tmp.sqEff = tmp.elm.theory.ss.squarkEff
		tmp.slEff = tmp.elm.theory.ss.sleptonEff
		tmp.neuEff = tmp.elm.theory.ss.neutralinoEff
		tmp.chEff = tmp.elm.theory.ss.charginoEff
		tmp.hh410 = tmp.elm.bos.hasHiggs("4;1;0")
	}

	// Elementary Layer
	if (!tmp.elm) tmp.elm = {};
	tmp.elm.can =
		player.rockets.gte(LAYER_REQS.elementary[0][1]) &&
		player.collapse.cadavers.gte(LAYER_REQS.elementary[1][1]) &&
		player.inf.endorsements.gte(LAYER_REQS.elementary[2][1]);
	tmp.elm.softcap = new ExpantaNum(4000)
	if (!tmp.elm.gain) tmp.elm.gain = (function () {
		if (!tmp.elm.can) return new ExpantaNum(0);
		let f1 = player.rockets.max(1).log10().div(LAYER_REQS.elementary[0][1].log10()).sqrt();
		let f2 = player.collapse.cadavers.max(1).log10().div(LAYER_REQS.elementary[1][1].log10());
		let f3 = ExpantaNum.pow(2, player.inf.endorsements.div(LAYER_REQS.elementary[2][1]).sub(1));
		let gain = f1.times(f2).times(f3);
		gain = gain.times(tmp.higgs110?tmp.higgs110:1)
		gain = gain.times(tmp.higgs300?tmp.higgs300:1)
		gain = gain.times(tmp.lu4?tmp.lu4:1)
		let exp = new ExpantaNum(1/4)
		if (hasDE(5) && (player.elementary.theory.tree.upgrades[20]||new ExpantaNum(0)).gte(1)) exp = exp.times(2)
		if (gain.gte(tmp.elm.softcap)) gain = gain.pow(exp).times(ExpantaNum.pow(tmp.elm.softcap, ExpantaNum.sub(1, exp)))
		return gain.floor();
	});
	tmp.elm.layer = new Layer("elementary", tmp.elm.can, "multi-res", true, "elm");
	if (!tmp.elm.doGain) tmp.elm.doGain = function (auto=false) {
		// Gains
		if (player.options.elc && !auto) {
			if (!confirm("Are you sure you want to do this? "+((modeActive("easy")||modeActive("hard"))?"You will convert out of this mode because it has ended!":"It will take some time for you to get back here!"))) return "NO";
			if (modeActive("easy")||modeActive("hard")) if (!confirm("THIS WILL SET YOU IN NORMAL MODE AND YOU WILL LOSE YOUR SAVE IN THESE MODES, ARE YOU ABSOLUTELY SURE YOU WANT TO DO THIS????")) return "NO";
			if (modeActive("easy")||modeActive("hard")) if (!confirm("THIS IS YOUR LAST CHANCE!! YOU WILL LOSE ALL YOUR EASY, HARD, OR EXTREME MODE PROGRESS IF YOU CONTINUE!")) return "NO";
		}
		if (player.elementary.theory.active) {
			player.elementary.theory.points = player.elementary.theory.points.plus(tmp.thGain?tmp.thGain:new ExpantaNum(0))
			player.elementary.theory.depth = player.elementary.theory.depth.plus(1)
			player.elementary.theory.active = false
		} else {
			player.bestEP = player.bestEP.max(tmp.elm.layer.gain)
			player.elementary.particles = player.elementary.particles.plus(tmp.elm.layer.gain);
		}
		player.elementary.times = player.elementary.times.plus(getElementariesGained());
		
		// Achievement Rewards
		if (player.inf.derivatives.unlocks.lte(tmp.inf.derv.maxShifts)) tmp.ach[137].grant()
	};
	if (!tmp.elm.onReset) tmp.elm.onReset = function (prev) {
		player.elementary.time = new ExpantaNum(0);
		
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
				g: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.g.upgrades },
				b: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.b.upgrades },
				ar: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.ar.upgrades },
				ag: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.ag.upgrades },
				ab: { amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.ab.upgrades }
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
		if (player.elementary.times.gte(3)) {
			player.pathogens.unl = true
			player.dc.unl = true
		}
		for (let i=0;i<Object.keys(prev.automation.robots).length;i++) robotActives[Object.keys(prev.automation.robots)[i]] = !(!Object.values(prev.automation.robots)[i][2])
		
		// Bugfixes
		infTab = "infinity"
		
		// Modes
		if (modeActive("easy")||modeActive("hard")) player.modes = player.modes.filter(x => x != "easy" && x != "hard" && x != "extreme")
	};

	// Elementary Tab System
	if (!tmp.elm.updateTabs) tmp.elm.updateTabs = function () {
		let tabs = Element.allFromClass("elmtab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(elmTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(ELM_TABS[tabs[i].id]());
		}
	};
	if (!tmp.elm.showTab) tmp.elm.showTab = function (name) {
		if (elmTab == name) return;
		elmTab = name;
		tmp.elm.updateTabs();
	};
	tmp.elm.updateTabs();

	// Fermions
	if (!tmp.elm.ferm) tmp.elm.ferm = {};
	if (!tmp.elm.ferm.transfer1) tmp.elm.ferm.transfer1 = function () {
		if (player.elementary.particles.lt(1)) return;
		player.elementary.particles = player.elementary.particles.sub(1);
		player.elementary.fermions.amount = player.elementary.fermions.amount.plus(1);
	};
	if (!tmp.elm.ferm.transfer) tmp.elm.ferm.transfer = function (ratio) {
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
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.times(tmp.sqEff||1)
	tmp.elm.ferm.quarkRewards = new ExpantaNum(player.elementary.fermions.quarks.amount).max(1).logBase(50).floor();
	if (tmp.elm.ferm.quarkRewards.gte(10)) tmp.elm.ferm.quarkRewards = tmp.elm.ferm.quarkRewards.sqrt().times(Math.sqrt(10))
	if (!tmp.elm.ferm.quarkName) tmp.elm.ferm.quarkName = function (noExp = false) {
		let name = QUARK_NAMES[player.elementary.fermions.quarks.type - 1];
		let stacks = tmp.elm.ferm.quarkRewards
			.sub(player.elementary.fermions.quarks.type)
			.div(QUARK_NAMES.length)
			.plus(1)
			.ceil()
			.max(0);
		return capitalFirst(name) + (noExp ? "" : stacks.gt(1) ? "<sup>" + showNum(stacks) + "</sup>" : "");
	};
	tmp.elm.ferm.quarkEff = function (name) {
		let qks = player.elementary.fermions.quarks.amount.max(0);
		let stacks = tmp.elm.ferm.quarkRewards
			.sub(QUARK_NAMES.indexOf(name) + 1)
			.div(QUARK_NAMES.length)
			.plus(1)
			.ceil()
			.max(0);
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
	if (!tmp.elm.ferm.quarkR) tmp.elm.ferm.quarkR = function (name) {
		if ((name == QUARK_NAMES[player.elementary.fermions.quarks.type - 1]) || ExpantaNum.gte(player.elementary.theory.tree.upgrades[32]||0, 1)) return tmp.elm.ferm.quarkEff(name);
		else return new ExpantaNum(1);
	};
	if (!tmp.elm.ferm.quarkDesc) tmp.elm.ferm.quarkDesc = function (name) {
		let desc = QUARK_DESCS[name] + "     ";
		desc += "Currently: " + showNum(tmp.elm.ferm.quarkEff(name)) + "x";
		return desc;
	};
	if (!tmp.elm.ferm.changeQuark) tmp.elm.ferm.changeQuark = function () {
		player.elementary.fermions.quarks.type = (player.elementary.fermions.quarks.type % 6) + 1;
	};

	// Leptons
	tmp.elm.ferm.leptonGain = player.elementary.fermions.amount
		.times(tmp.inf.pantheon.totalGems.plus(1))
		.div(2.5)
		.times(tmp.elm.ferm.quarkR("top").max(1))
		.max(0);
	if (tmp.glu2) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.glu2.max(1));
	if (tmp.higgs031) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.higgs031.max(1));
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.times(tmp.slEff||1)
	tmp.elm.ferm.leptonRewards = new ExpantaNum(player.elementary.fermions.leptons.amount).max(1).logBase(100).floor();
	if (tmp.elm.ferm.leptonRewards.gte(7)) tmp.elm.ferm.leptonRewards = tmp.elm.ferm.leptonRewards.sqrt().times(Math.sqrt(7))
	if (!tmp.elm.ferm.leptonName) tmp.elm.ferm.leptonName = function (noExp = false) {
		let name = LEPTON_NAMES[player.elementary.fermions.leptons.type - 1];
		let stacks = tmp.elm.ferm.leptonRewards
			.sub(player.elementary.fermions.leptons.type)
			.div(LEPTON_NAMES.length)
			.plus(1)
			.ceil()
			.max(0);
		return capitalFirst(name) + (noExp ? "" : stacks.gt(1) ? "<sup>" + showNum(stacks) + "</sup>" : "");
	};
	tmp.elm.ferm.leptonEff = function (name) {
		let lpts = player.elementary.fermions.leptons.amount;
		let stacks = tmp.elm.ferm.leptonRewards
			.sub(LEPTON_NAMES.indexOf(name) + 1)
			.div(LEPTON_NAMES.length)
			.plus(1)
			.ceil()
			.max(0);
		if (stacks.gte(8)) stacks = stacks.sqrt().times(Math.sqrt(8));
		if (name == "electron")
			return lpts.max(0)
				.plus(1)
				.times(10)
				.slog(10)
				.max(1)
				.pow(ExpantaNum.mul(0.1, stacks.plus(1).log10().plus(1)))
				.sub(1)
				.div(10)
				.max(0)
				.plus(1);
		else if (name == "muon") return lpts.times(ExpantaNum.pow(2.5, stacks)).plus(1).times(10).slog(10).sqrt().max(1);
		else if (name == "tau")
			return ExpantaNum.pow(
				player.inf.knowledge.max(0).plus(1).log10().plus(1).log10().plus(1),
				lpts.max(0).times(ExpantaNum.pow(2.5, stacks)).plus(1).times(10).slog(10).div(5).max(0.2)
			).min(lpts.plus(1));
		else if (name == "netrion")
			return lpts.max(0).times(ExpantaNum.pow(2, stacks)).plus(1).times(10).slog(10).max(1).sub(1).div(100).max(0).plus(1);
		else if (name == "vibrino")
			return lpts.max(0).times(ExpantaNum.pow(1.4, stacks)).plus(1).times(16).slog(16).max(1).sub(1).div(250).max(0).plus(1);
		else if (name == "psi") return lpts.max(0).plus(1).log10().plus(1).pow(stacks.plus(0.5)).max(1);
	};
	if (!tmp.elm.ferm.leptonR) tmp.elm.ferm.leptonR = function (name) {
		if ((name == LEPTON_NAMES[player.elementary.fermions.leptons.type - 1])||ExpantaNum.gte(player.elementary.theory.tree.upgrades[32]||0, 1)) return tmp.elm.ferm.leptonEff(name);
		else return new ExpantaNum(1);
	};
	if (!tmp.elm.ferm.leptonDesc) tmp.elm.ferm.leptonDesc = function (name) {
		let desc = LEPTON_DESCS[name] + "      Currently: ";
		let eff = tmp.elm.ferm.leptonEff(name);
		if (name == "electron" || name == "netrion" || name == "vibrino") desc += "+" + showNum(eff.sub(1).times(100)) + "%";
		else if (name == "muon") desc += "^" + showNum(eff);
		else desc += showNum(eff) + "x";
		return desc;
	};
	if (!tmp.elm.ferm.changeLepton) tmp.elm.ferm.changeLepton = function () {
		player.elementary.fermions.leptons.type = (player.elementary.fermions.leptons.type % 6) + 1;
	};

	// Bosons
	if (!tmp.elm.bos) tmp.elm.bos = {};
	if (!tmp.elm.bos.transfer1) tmp.elm.bos.transfer1 = function () {
		if (player.elementary.particles.lt(1)) return;
		player.elementary.particles = player.elementary.particles.sub(1);
		player.elementary.bosons.amount = player.elementary.bosons.amount.plus(1);
	};
	if (!tmp.elm.bos.transfer) tmp.elm.bos.transfer = function (ratio) {
		if (player.elementary.particles.times(ratio).floor().lt(1)) return;
		let toSub = player.elementary.particles.times(ratio).floor();
		player.elementary.particles = player.elementary.particles.sub(toSub);
		player.elementary.bosons.amount = player.elementary.bosons.amount.plus(toSub);
	};
	if (!tmp.elm.bos.updateGluonTabs) tmp.elm.bos.updateGluonTabs = function () {
		let tabs = Element.allFromClass("gluontab");
		for (let i = 0; i < tabs.length; i++) tabs[i].setDisplay(gluonTab == tabs[i].id);
	};
	if (!tmp.elm.bos.showGluonTab) tmp.elm.bos.showGluonTab = function (name) {
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
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.times(tmp.chEff||1)
	tmp.elm.bos.photonCost = {
		1: ExpantaNum.pow(5, player.elementary.bosons.gauge.photons.upgrades[0].pow(2)).times(25),
		2: ExpantaNum.pow(4, player.elementary.bosons.gauge.photons.upgrades[1].pow(2)).times(40),
		3: ExpantaNum.pow(10, player.elementary.bosons.gauge.photons.upgrades[2]).times(1e4),
		4: ExpantaNum.pow(2, player.elementary.bosons.gauge.photons.upgrades[3].pow(1.1).times(ExpantaNum.pow(1.01, player.elementary.bosons.gauge.photons.upgrades[3]))).times(6e4),
	};
	for (let i=1;i<=4;i++) {
		if (scalingActive("photons", player.elementary.bosons.gauge.photons.upgrades[i-1], "scaled")) {
			let power = getScalingPower("scaled", "photons")
			let exp = ExpantaNum.pow(2, power)
			tmp.elm.bos.photonCost[i] = PH_CST_SCLD[i](exp, getScalingStart("scaled", "photons"))
		}
	}
	if (!tmp.elm.bos.photonEff) tmp.elm.bos.photonEff = function (x) {
		let bought = player.elementary.bosons.gauge.photons.upgrades[x - 1];
		if (player.elementary.times.lt(1)) bought = new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(3, bought);
		if (x == 2) return ExpantaNum.pow(1.5, bought);
		if (x == 3||x == 4) return ExpantaNum.pow(2, bought);
	};
	if (!tmp.elm.bos.buyLU) tmp.elm.bos.buyLU = function (x) {
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
	if (!tmp.elm.bos.updateTabs) tmp.elm.bos.updateTabs = function () {
		let tabs = Element.allFromClass("bostab");
		for (let i = 0; i < tabs.length; i++) tabs[i].setDisplay(bosTab == tabs[i].id);
	};
	if (!tmp.elm.bos.showTab) tmp.elm.bos.showTab = function (name) {
		if (bosTab == name) return;
		bosTab = name;
		tmp.elm.bos.updateTabs();
	};
	tmp.elm.bos.updateTabs();
	if (!tmp.elm.bos.gluonEff) tmp.elm.bos.gluonEff = function (col, x) {
		let bought = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1]||new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(2, bought);
		else if (x==2) return ExpantaNum.pow(1.1, bought);
		else return bought.times(10)
	};
	tmp.elm.bos.rg = gaugeSpeed.div(2.5).times(tmp.elm.bos.gluonEff("ar", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.gg = gaugeSpeed.div(2.6).times(tmp.elm.bos.gluonEff("ag", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.bg = gaugeSpeed.div(2.4).times(tmp.elm.bos.gluonEff("ab", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.arg = gaugeSpeed.div(10).times(tmp.elm.bos.gluonEff("r", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.agg = gaugeSpeed.div(9.8).times(tmp.elm.bos.gluonEff("g", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.abg = gaugeSpeed.div(10.2).times(tmp.elm.bos.gluonEff("b", 1)).times(tmp.elm.bos.photonEff(3).max(1));
	if (!tmp.elm.bos.gluonCost) tmp.elm.bos.gluonCost = function (col, x) {
		let bought = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1]||new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(2, bought.pow(2.5).times(2)).times(100);
		else if (x==2) return ExpantaNum.pow(3, ExpantaNum.pow(3, bought)).times(1e3 / 3);
		else return ExpantaNum.pow(10, bought.pow(2)).times(1e7)
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
	for (let i = 0; i < GLUON_COLOURS.length; i++) {
		tmp.elm.bos.gluon2total = tmp.elm.bos.gluon2total.times(tmp.elm.bos.gluonEff(GLUON_COLOURS[i], 2));
		if (tmp.hh410) tmp.elm.bos[GLUON_COLOURS[i]+"g"] = tmp.elm.bos[GLUON_COLOURS[i]+"g"].times(666)
	}

	// Gravitons
	tmp.elm.bos.gravGain = gaugeSpeed.div(1.75);
	if (player.inf.upgrades.includes("10;9")) tmp.elm.bos.gravGain = tmp.elm.bos.gravGain.times(100)
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.bos.gravGain = tmp.elm.bos.gravGain.times(tmp.neuEff||1)
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
	if (player.elementary.theory.tree.unl) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.times(TREE_UPGS[2].effect(player.elementary.theory.tree.upgrades[2]||0))
	if (!tmp.elm.bos.buyHiggs) tmp.elm.bos.buyHiggs = function(id) {
		let data = HIGGS_UPGS[id]
		if (player.elementary.bosons.scalar.higgs.amount.lt(data.cost) || player.elementary.bosons.scalar.higgs.upgrades.includes(id)) return
		player.elementary.bosons.scalar.higgs.amount = player.elementary.bosons.scalar.higgs.amount.sub(data.cost)
		player.elementary.bosons.scalar.higgs.upgrades.push(id)
		if (id=="0;0;2") for (let i=1;i<=4;i++) tmp.inf.asc.activatePerk(i)
	}
	if (!tmp.elm.bos.hasHiggs) tmp.elm.bos.hasHiggs = function(id) { return player.elementary.bosons.scalar.higgs.upgrades.includes(id) }
	if (!tmp.elm.bos["higgs_1;1;0"]) tmp.elm.bos["higgs_1;1;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("1;1;0")) return new ExpantaNum(1)
		let f1 = player.elementary.fermions.quarks.amount.plus(1).log10().pow(0.2).plus(1)
		let f2 = player.elementary.fermions.leptons.amount.plus(1).log10().pow(0.3).plus(1)
		let f3 = player.elementary.bosons.gauge.photons.amount.plus(1).log10().pow(0.15).plus(1)
		let f4 = player.elementary.bosons.gauge.gravitons.plus(1).log10().pow(0.25).plus(1)
		let f5 = player.elementary.bosons.scalar.higgs.amount.plus(1).log10().pow(0.1).plus(1)
		return f1.times(f2).times(f3).times(f4).times(f5).pow(0.2)
	}
	if (!tmp.elm.bos["higgs_0;1;1"]) tmp.elm.bos["higgs_0;1;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;1;1")) return new ExpantaNum(1)
		let e = player.inf.endorsements.sub(36).max(0)
		if (e.gte(3)) e = e.sqrt().times(Math.sqrt(3))
		return ExpantaNum.pow(7, e).max(1)
	}
	if (!tmp.elm.bos["higgs_3;0;0"]) tmp.elm.bos["higgs_3;0;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("3;0;0")) return new ExpantaNum(1)
		return ExpantaNum.pow(1.1, player.elementary.bosons.scalar.higgs.upgrades.length)
	}
	if (!tmp.elm.bos["higgs_0;2;1"]) tmp.elm.bos["higgs_0;2;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;2;1")) return new ExpantaNum(1)
		return player.elementary.bosons.scalar.higgs.amount.plus(1).times(10).slog(10).pow(0.1).sub(1).times(100)
	}
	if (!tmp.elm.bos["higgs_0;0;4"]) tmp.elm.bos["higgs_0;0;4"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;0;4")) return new ExpantaNum(1)
		let ret = tmp.elm.pa.active?tmp.elm.pa.speedBoost.plus(1):new ExpantaNum(1)
		if (ret.gte(1e3)) ret = ret.pow(0.95).times(Math.pow(1e3, 0.05))
		return ret
	}
	if (!tmp.elm.bos["higgs_1;3;0"]) tmp.elm.bos["higgs_1;3;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("1;3;0")) return new ExpantaNum(1)
		let amt = player.inf.pantheon.angels.plus(player.inf.pantheon.demons)
		let ret = ExpantaNum.pow(10, amt.sqrt()).pow(0.2)
		return ret
	}
	if (!tmp.elm.bos["higgs_0;3;1"]) tmp.elm.bos["higgs_0;3;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;3;1")) return new ExpantaNum(1)
		let ret = player.inf.pantheon.purge.power.plus(1).pow(0.9)
		return ret
	}
	if (!tmp.elm.bos["higgs_0;0;5"]) tmp.elm.bos["higgs_0;0;5"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;0;5")) return new ExpantaNum(0)
		let ret = player.elementary.bosons.scalar.higgs.amount.plus(1).times(10).slog(10).pow(2.5).sub(1).times(18)
		return ret
	}
	
	// Perk Acceleration
	tmp.elm.pa = {}
	tmp.elm.pa.active = tmp.elm.bos.hasHiggs("0;0;2")
	tmp.elm.pa.stateStarts = {
		weakened: new ExpantaNum(12.5e3),
		broken: new ExpantaNum(1e6),
	}
	if (player.elementary.theory.accelerons.unl) tmp.elm.pa.stateStarts.weakened = tmp.elm.pa.stateStarts.weakened.times(getAccelEff())
	tmp.elm.pa.state = ""
	tmp.elm.pa.speedBoost = tmp.inf.asc.perkTimeO.div(10)
	if (tmp.elm.pa.speedBoost.gte(tmp.elm.pa.stateStarts.weakened)) tmp.elm.pa.state = "weakened"
	if (tmp.elm.pa.speedBoost.gte(tmp.elm.pa.stateStarts.broken)) tmp.elm.pa.state = "broken"
	if (tmp.elm.pa.state=="weakened") tmp.elm.pa.speedBoost = tmp.elm.pa.speedBoost.sqrt().times(ExpantaNum.sqrt(tmp.elm.pa.stateStarts.weakened))
	if (tmp.elm.pa.state=="broken") tmp.elm.pa.speedBoost = tmp.elm.pa.speedBoost.cbrt().times(ExpantaNum.pow(tmp.elm.pa.stateStarts.broken, 2/3))
	tmp.elm.pa.boost = tmp.inf.asc.perkTimeO.div(10).pow(0.07)
	if (tmp.inf.upgs.has("10;8")) tmp.elm.pa.boost = tmp.elm.pa.boost.max(tmp.inf.asc.perkTimeO.div(10).pow(0.2))
	if (tmp.elm.pa.boost.gte(6.75)) tmp.elm.pa.boost = tmp.elm.pa.boost.logBase(6.75).plus(5.75)
		
	// Theories
	tmp.elm.theory = {}
	if (!tmp.elm.theory.updateTabs) tmp.elm.theory.updateTabs = function () {
		let tabs = Element.allFromClass("theorytab");
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].setDisplay(thTab == tabs[i].id);
			new Element(tabs[i].id + "tabbtn").setDisplay(TH_TABS[tabs[i].id]());
		}
	};
	if (!tmp.elm.theory.showTab) tmp.elm.theory.showTab = function (name) {
		if (thTab == name) return;
		thTab = name;
		tmp.elm.theory.updateTabs();
	};
	tmp.elm.theory.updateTabs();
	
	// The Theoriverse
	tmp.elm.theory.subbed = new ExpantaNum(0)
	if (player.elementary.theory.tree.unl) tmp.elm.theory.subbed = tmp.elm.theory.subbed.plus(TREE_UPGS[4].effect(player.elementary.theory.tree.upgrades[4]||0))
	tmp.elm.theory.nerf = (player.elementary.theory.depth.minus(tmp.elm.theory.subbed).max(0).eq(0)?new ExpantaNum(0.88):ExpantaNum.pow(0.8, player.elementary.theory.depth.minus(tmp.elm.theory.subbed).max(1).cbrt()))
	if (player.elementary.theory.depth.minus(tmp.elm.theory.subbed).gte(4)) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(player.elementary.theory.depth.minus(tmp.elm.theory.subbed).max(0).sub(3))
	if (HCTVal("tv").gt(-1)) {
		let d = HCTVal("tv")
		tmp.elm.theory.nerf = (d.minus(tmp.elm.theory.subbed).max(0).eq(0)?new ExpantaNum(0.88):ExpantaNum.pow(0.8, d.minus(tmp.elm.theory.subbed).max(1).cbrt()))
		if (d.minus(tmp.elm.theory.subbed).gte(4)) tmp.elm.theory.nerf = tmp.elm.theory.nerf.pow(d.minus(tmp.elm.theory.subbed).max(0).sub(3))
	}
	if (!tmp.elm.theory.start) tmp.elm.theory.start = function() {
		if (!player.elementary.theory.unl) return
		if (HCTVal("tv").gt(-1)) return
		tmp.elm.layer.reset(true)
		player.elementary.theory.active = !player.elementary.theory.active
	}
	tmp.elm.theory.gain = ExpantaNum.pow(2, player.elementary.theory.depth)
	
	// Supersymmetry
	if (!tmp.elm.theory.ss) tmp.elm.theory.ss = {}
	if (!tmp.elm.theory.ss.unl) tmp.elm.theory.ss.unl = function() {
		if (!player.elementary.theory.unl) return
		if (player.elementary.theory.supersymmetry.unl) return
		if (player.elementary.theory.points.lt(1)) return
		player.elementary.theory.points = player.elementary.theory.points.sub(1)
		player.elementary.theory.supersymmetry.unl = true
	}
	for (let i=0;i<4;i++) {
		let type = ["squark", "slepton", "neutralino", "chargino"][i]
		tmp.elm.theory.ss[type+"Gain"] = new ExpantaNum((4-i)/4)
		if (player.elementary.theory.tree.unl) {
			tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].times(TREE_UPGS[1].effect(player.elementary.theory.tree.upgrades[1]||0))
			tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].times(TREE_UPGS[5].effect(player.elementary.theory.tree.upgrades[5]||0))
			tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].times(getStringEff(1))
		}
		tmp.elm.theory.ss[type+"Eff"] = player.elementary.theory.supersymmetry[type+"s"].plus(1)
		if (tmp.elm.theory.ss[type+"Eff"].gte(1e9)) tmp.elm.theory.ss[type+"Eff"] = tmp.elm.theory.ss[type+"Eff"].cbrt().times(1e6)
	}
	if (hasDE(5)) for (let i=2;i>=0;i--) {
		let type = ["squark", "slepton", "neutralino", "chargino"][i]
		let next = ["squark", "slepton", "neutralino", "chargino"][i+1]
		if ((player.elementary.theory.tree.upgrades[i+22]||new ExpantaNum(0)).gte(1)) tmp.elm.theory.ss[type+"Gain"] = tmp.elm.theory.ss[type+"Gain"].times(tmp.elm.theory.ss[next+"Eff"])
	}
	tmp.elm.theory.ss.wavelength = player.elementary.theory.supersymmetry.squarks.times(player.elementary.theory.supersymmetry.sleptons).times(player.elementary.theory.supersymmetry.neutralinos).times(player.elementary.theory.supersymmetry.charginos).pow(1/5)
	tmp.elm.theory.ss.waveEff = tmp.elm.theory.ss.wavelength.plus(1).pow(2.25)
	if (tmp.elm.theory.ss.waveEff.gte(1e13)) tmp.elm.theory.ss.waveEff = tmp.elm.theory.ss.waveEff.pow(1/4).times(Math.pow(1e13, 3/4))
	
	// The Theory Tree
	if (!tmp.elm.theory.tree) tmp.elm.theory.tree = {}
	if (!tmp.elm.theory.tree.unl) tmp.elm.theory.tree.unl = function() {
		if (!player.elementary.theory.unl) return
		if (!player.elementary.theory.supersymmetry.unl) return
		if (player.elementary.theory.tree.unl) return
		if (player.elementary.theory.points.lt(1)) return
		player.elementary.theory.points = player.elementary.theory.points.sub(1)
		player.elementary.theory.tree.unl = true
	}
	tmp.elm.theory.tree.bought = function(i) { return new ExpantaNum(player.elementary.theory.tree.upgrades[i]||0) }
	if (!tmp.elm.theory.tree.buy) tmp.elm.theory.tree.buy = function(x) {
		if (!player.elementary.theory.unl) return
		if (!player.elementary.theory.tree.unl) return
		let bought = tmp.elm.theory.tree.bought(x)
		if (bought.gte(TREE_UPGS[x].cap)) return
		let cost = TREE_UPGS[x].cost(bought).div(tmp.elm.theory.tree.costReduc).round()
		if (player.elementary.theory.points.lt(cost)) return
		player.elementary.theory.points = player.elementary.theory.points.sub(cost)
		player.elementary.theory.tree.spent =player.elementary.theory.tree.spent.plus(cost)
		player.elementary.theory.tree.upgrades[x] = bought.plus(1)
	}
	tmp.elm.theory.tree.costReduc = ach152Eff()
	if (player.elementary.theory.inflatons.unl) tmp.elm.theory.tree.costReduc = tmp.elm.theory.tree.costReduc.times(getInflatonEff1())
	
	// Hadronic Challenges
	if (!tmp.elm.hc) tmp.elm.hc = {}
	tmp.elm.hc.currScore = getProjectedHadronicScore()
	tmp.elm.hc.hadronBulk = new ExpantaNum(1)
	if (player.elementary.theory.inflatons.unl) tmp.elm.hc.hadronBulk = tmp.elm.hc.hadronBulk.plus(getInflatonEff2())
	tmp.elm.hc.hadronGain = player.elementary.hc.unl ? player.elementary.hc.best.pow(1.5).div(10) : new ExpantaNum(0)
	tmp.elm.hc.hadronGain = tmp.elm.hc.hadronGain.times(TREE_UPGS[31].effect(player.elementary.theory.tree.upgrades[31]||0))
	tmp.elm.hc.hadInterval = ExpantaNum.add(1, ExpantaNum.div(9, player.elementary.hc.best.plus(1).log(Math.E).plus(1)).div(200))
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[33]||0, 1)) tmp.elm.hc.hadInterval = tmp.elm.hc.hadInterval.sub(1).div(2).plus(1)
	tmp.elm.hc.hadronEff = player.elementary.hc.hadrons.max(1).logBase(tmp.elm.hc.hadInterval).floor().times(tmp.elm.hc.hadronBulk)
	tmp.elm.hc.next = ExpantaNum.pow(tmp.elm.hc.hadInterval, new ExpantaNum(player.elementary.hc.claimed||0).div(tmp.elm.hc.hadronBulk).plus(1))
	tmp.elm.hc.complPerc = player.distance.log10().div(new ExpantaNum(getHCSelector("goal")).log10()).min(1)
	tmp.elm.hc.infState = getInflatonState()
	tmp.elm.hc.infGain = getInflatonGain()
	claimHadronEff()
	updateHCTabs()
}

function elTick(diff) {
	player.elementary.time = player.elementary.time.plus(diff)
	player.elementary.fermions.quarks.amount = new ExpantaNum(player.elementary.fermions.quarks.amount).plus(
		adjustGen(tmp.elm.ferm.quarkGain, "quarks").times(diff)
	);
	player.elementary.fermions.leptons.amount = new ExpantaNum(player.elementary.fermions.leptons.amount).plus(
		adjustGen(tmp.elm.ferm.leptonGain, "leptons").times(diff)
	);
	player.elementary.bosons.gauge.amount = new ExpantaNum(player.elementary.bosons.gauge.amount).plus(
		adjustGen(tmp.elm.bos.gaugeGain, "gauge").times(diff)
	);
	player.elementary.bosons.gauge.force = new ExpantaNum(player.elementary.bosons.gauge.force).plus(
		adjustGen(tmp.elm.bos.forceGain, "gauge").times(diff)
	);
	player.elementary.bosons.gauge.photons.amount = new ExpantaNum(
		player.elementary.bosons.gauge.photons.amount
	).plus(adjustGen(tmp.elm.bos.photonGain, "gauge").times(diff));
	player.elementary.bosons.gauge.w = new ExpantaNum(player.elementary.bosons.gauge.w).plus(
		adjustGen(tmp.elm.bos.wg, "gauge").times(diff)
	);
	player.elementary.bosons.gauge.z = new ExpantaNum(player.elementary.bosons.gauge.z).plus(
		adjustGen(tmp.elm.bos.zg, "gauge").times(diff)
	);
	for (let i = 0; i < GLUON_COLOURS.length; i++)
		player.elementary.bosons.gauge.gluons[GLUON_COLOURS[i]].amount = new ExpantaNum(
			player.elementary.bosons.gauge.gluons[GLUON_COLOURS[i]].amount
		).plus(adjustGen(tmp.elm.bos[GLUON_COLOURS[i] + "g"], "gauge").times(diff));
	player.elementary.bosons.gauge.gravitons = new ExpantaNum(player.elementary.bosons.gauge.gravitons).plus(
		adjustGen(tmp.elm.bos.gravGain, "gauge").times(diff)
	);
	player.elementary.bosons.scalar.amount = new ExpantaNum(player.elementary.bosons.scalar.amount).plus(
		adjustGen(tmp.elm.bos.scalarGain, "scalar").times(diff)
	);
	player.elementary.bosons.scalar.higgs.amount = new ExpantaNum(player.elementary.bosons.scalar.higgs.amount).plus(
		adjustGen(tmp.elm.bos.higgsGain, "scalar").times(diff)
	);
	if (player.elementary.theory.supersymmetry.unl) {
		for (let i=0;i<4;i++) {
			let type = ["squark", "slepton", "neutralino", "chargino"][i]
			player.elementary.theory.supersymmetry[type+"s"] = player.elementary.theory.supersymmetry[type+"s"].plus(adjustGen(tmp.elm.theory.ss[type+"Gain"], "ss").times(diff))
		}
	}
	if (player.elementary.theory.strings.unl) {
		for (let i=1;i<=TOTAL_STR;i++) {
			player.elementary.theory.strings.amounts[i-1] = player.elementary.theory.strings.amounts[i-1].plus(adjustGen(getStringGain(i), "str").times(diff))
		}
	}
	if (player.elementary.theory.preons.unl) player.elementary.theory.preons.amount = player.elementary.theory.preons.amount.plus(adjustGen(getPreonGain(), "preons").times(diff))
	if (player.elementary.theory.accelerons.unl) player.elementary.theory.accelerons.amount = player.elementary.theory.accelerons.amount.plus(adjustGen(getAccelGain(), "accelerons").times(diff))
	if (player.elementary.theory.inflatons.unl) player.elementary.theory.inflatons.amount = player.elementary.theory.inflatons.amount.plus(adjustGen(tmp.elm.hc.infGain, "inflatons").times(diff))
	if (player.elementary.hc.unl) player.elementary.hc.hadrons = player.elementary.hc.hadrons.plus(adjustGen(tmp.elm.hc.hadronGain, "hc").times(diff))
}

function elmReset(force=false, auto=false) {
	let c = player.rockets.gte(LAYER_REQS.elementary[0][1]) &&
		player.collapse.cadavers.gte(LAYER_REQS.elementary[1][1]) &&
		player.inf.endorsements.gte(LAYER_REQS.elementary[2][1]);
	let L = new Layer("elementary", c, "multi-res", true, "elm");
	L.reset(force, auto)
}

function resetTheoryTree(force=false) {
	if (!force) {
		if (!player.elementary.theory.unl) return
		if (!player.elementary.theory.tree.unl) return
		if (player.elementary.theory.tree.spent.eq(0)) return
		if (!confirm("Are you sure you want to reset your tree to get Theory Points back?")) return
	}
	player.elementary.theory.points = player.elementary.theory.points.plus(player.elementary.theory.tree.spent)
	player.elementary.theory.tree.spent = new ExpantaNum(0)
	player.elementary.theory.tree.upgrades = {}
	elmReset(true)
}

// Strings

function unlockStrings() {
	if (!player.elementary.theory.unl) return
	if (!player.elementary.theory.tree.unl) return
	if (player.elementary.theory.strings.unl) return
	if (player.elementary.theory.points.lt(7)) return
	if (!confirm("Are you sure you want to unlock Strings? You will not be able to get your Theory Points back!")) return
	player.elementary.theory.points = player.elementary.theory.points.sub(7)
	player.elementary.theory.strings.unl = true
}

function getStringEff(n) {
	if (!player.elementary.theory.unl || !player.elementary.theory.strings.unl) return new ExpantaNum(1)
	let ret = player.elementary.theory.strings.amounts[n-1].plus(1).pow(3/n)
	if (ret.gte(1e6)) ret = ret.pow(1/3).times(ExpantaNum.pow(1e6, 2/3))
	if (n==1 && ret.gte(1e9)) ret = ret.pow(0.1).times(Math.pow(1e9, 0.9))
	let finalExp = new ExpantaNum(1)
	if (hasDE(5) && n==2) finalExp = finalExp.plus(TREE_UPGS[14].effect(player.elementary.theory.tree.upgrades[14]||0))
	if (hasDE(5) && n==3) finalExp = finalExp.plus(TREE_UPGS[15].effect(player.elementary.theory.tree.upgrades[15]||0))
	if (hasDE(5) && n==4) finalExp = finalExp.plus(TREE_UPGS[16].effect(player.elementary.theory.tree.upgrades[16]||0))
	if (hasDE(5) && n==5) finalExp = finalExp.plus(TREE_UPGS[17].effect(player.elementary.theory.tree.upgrades[17]||0))
	if (hasDE(5) && n==6) finalExp = finalExp.plus(TREE_UPGS[18].effect(player.elementary.theory.tree.upgrades[18]||0))
	if (hasDE(5) && n==7) finalExp = finalExp.plus(TREE_UPGS[19].effect(player.elementary.theory.tree.upgrades[19]||0))
	return ret.pow(finalExp)
}

function getStringGain(n) {
	if (!player.elementary.theory.strings.unl) return new ExpantaNum(0)
	if (n>1) if (!(player.elementary.theory.strings.amounts[n-2].gte(STR_REQS[n])&&(UNL_STR()>=n))) return new ExpantaNum(0)
	let gain = new ExpantaNum(0.02).times(1/Math.sqrt(n))
	if (n<TOTAL_STR) gain = gain.times(getStringEff(n+1))
	gain = gain.times(getEntangleEff())
	if (tmp.ach[144].has) gain = gain.times(1.25)
	if (tmp.ach[157].has) gain = gain.times(2)
	return gain
}

function getEntangleGain() {
	let base = new ExpantaNum(1)
	player.elementary.theory.strings.amounts.forEach(x => function() { base = base.times(ExpantaNum.add(x, 1)) }())
	let gain = base.pow(1/7).sqrt()
	if (gain.gte(1e7)) gain = gain.cbrt().times(Math.pow(1e7, 2/3))
	if (gain.gte(1e9)) {
		let exp = gain.plus(1).log10().sqrt().div(Math.sqrt(8)/4)
		if (exp.gte(1e300)) exp = new ExpantaNum(1e300)
		gain = gain.pow(exp.pow(-1)).times(ExpantaNum.pow(1e9, ExpantaNum.sub(1, exp.pow(-1))))
	}
	gain = gain.times(TREE_UPGS[6].effect(player.elementary.theory.tree.upgrades[6]||0))
	gain = gain.times(TREE_UPGS[30].effect(player.elementary.theory.tree.upgrades[30]||0))
	return gain
}

function getEntangleEff() {
	let eff = player.elementary.theory.strings.entangled.plus(1).pow(1.5)
	return eff
}

function entangleStrings() {
	let lastStr = player.elementary.theory.strings.amounts.findIndex(x => new ExpantaNum(x).eq(0))+1
	if (lastStr<3&&lastStr!=0) return
	player.elementary.theory.strings.entangled = player.elementary.theory.strings.entangled.plus(getEntangleGain())
	player.elementary.theory.strings.amounts = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)]
}

// Preons

function unlockPreons() {
	if (!player.elementary.theory.unl) return
	if (!player.elementary.theory.strings.unl) return
	if (player.elementary.theory.preons.unl) return
	if (player.elementary.theory.points.lt(10)) return
	if (!confirm("Are you sure you want to unlock Preons? You will not be able to get your Theory Points back!")) return
	player.elementary.theory.points = player.elementary.theory.points.sub(10)
	player.elementary.theory.preons.unl = true
}

function getPreonGain() {
	if (!player.elementary.theory.preons.unl) return new ExpantaNum(0)
	let gain = player.elementary.theory.strings.amounts[0].plus(1).log10().div(10)
	gain = gain.times(TREE_UPGS[9].effect(player.elementary.theory.tree.upgrades[9]||0))
	return gain
}

function getTBCost() {
	let b = new ExpantaNum(player.elementary.theory.preons.boosters)
	if (b.gte(4)) b = b.pow(2).div(4)
	let base = new ExpantaNum(2)
	if (hasDE(5)) base = base.pow(0.1)
	let cost = new ExpantaNum(20).times(ExpantaNum.pow(base, b))
	cost = cost.div(TREE_UPGS[10].effect(player.elementary.theory.tree.upgrades[10]||0))
	return cost
}

function getTBGain() {
	let ret = player.elementary.theory.preons.boosters.plus(1)
	return ret
}

function theoryBoost() {
	if (!player.elementary.theory.unl) return
	if (!player.elementary.theory.preons.unl) return
	if (player.elementary.theory.preons.amount.lt(getTBCost())) return
	player.elementary.theory.preons.amount = player.elementary.theory.preons.amount.sub(getTBCost())
	player.elementary.theory.points = player.elementary.theory.points.plus(getTBGain())
	player.elementary.theory.preons.boosters = player.elementary.theory.preons.boosters.plus(1)
}

// Accelerons

function unlockAccelerons() {
	if (!player.elementary.theory.unl) return
	if (!player.elementary.theory.preons.unl) return
	if (player.elementary.theory.accelerons.unl) return
	if (player.elementary.theory.points.lt(84)) return
	if (!confirm("Are you sure you want to unlock Accelerons? You won't be able to get your Theory Points back!")) return
	player.elementary.theory.points = player.elementary.theory.points.sub(84)
	player.elementary.theory.accelerons.unl = true
}

function getAccelGain() {
	if (!player.elementary.theory.accelerons.unl) return new ExpantaNum(0)
	let gain = tmp.acc.plus(1).log10().div(1e6).sqrt()
	gain = gain.times(TREE_UPGS[12].effect(player.elementary.theory.tree.upgrades[12]||0))
	if (gain.gte(1e6)) gain = gain.cbrt().times(Math.pow(1e6, 2/3))
	return gain
}

function getAccelEff() {
	if (!player.elementary.theory.accelerons.unl) return new ExpantaNum(1)
	let eff = player.elementary.theory.accelerons.amount.plus(1).pow(0.04)
	if (eff.gte(2)) eff = eff.logBase(2).plus(1)
	return eff
}

function darkExpand() {
	if (!player.elementary.theory.accelerons.unl) return
	if (player.elementary.theory.accelerons.expanders.gte(MAX_DARK_EXPANDERS)) return
	if (player.elementary.theory.accelerons.amount.lt(DARK_EXPANDER_COSTS[player.elementary.theory.accelerons.expanders.plus(1).toNumber()])) return
	player.elementary.theory.accelerons.amount = player.elementary.theory.accelerons.amount.sub(DARK_EXPANDER_COSTS[player.elementary.theory.accelerons.expanders.plus(1).toNumber()])
	player.elementary.theory.accelerons.expanders = player.elementary.theory.accelerons.expanders.plus(1)
}

function hasDE(n) { return player.elementary.theory.accelerons.expanders.gte(n)&&player.elementary.theory.accelerons.unl }

function buyGluon3(col) {
	if (!hasDE(1)) return
	if (player.elementary.bosons.gauge.gluons[col].amount.lt(tmp.elm.bos.gluonCost(col, 3))) return
	player.elementary.bosons.gauge.gluons[col].amount = player.elementary.bosons.gauge.gluons[col].amount.sub(tmp.elm.bos.gluonCost(col, 3))
	player.elementary.bosons.gauge.gluons[col].upgrades[2] = (player.elementary.bosons.gauge.gluons[col].upgrades[2]||new ExpantaNum(0)).plus(1)
	player.elementary.theory.points = player.elementary.theory.points.plus(10)
}

function getGravBoosts() {
	if (!hasDE(4)) return new ExpantaNum(0)
	let g = player.elementary.bosons.gauge.gravitons
	return g.plus(1).log10().sqrt().floor()
}

function getGravBoostBase() {
	let base = new ExpantaNum(2)
	if (hasDE(5)&&(player.elementary.theory.tree.upgrades[21]||new ExpantaNum(0)).gte(1)) base = base.pow(2)
	return base
}

function getGravBoostMult() {
	if (!hasDE(4)) return new ExpantaNum(1)
	let b = getGravBoosts()
	return ExpantaNum.pow(getGravBoostBase(), b)
}

function getElementariesGained() {
	let e = new ExpantaNum(1)
	if (hasDE(4)) e = e.times(getGravBoostMult())
	return e.max(1).floor()
}

// Tree Export/Import functions

function exportTree() {
	let upgs = player.elementary.theory.tree.upgrades
	let parsedUpgs = {}
	for (let i=0;i<Object.keys(upgs).length;i++) {
		let key = Object.keys(upgs)[i]
		parsedUpgs[key] = upgs[key].toString();
	}
	let tree = JSON.stringify(parsedUpgs)
	notifier.info("Tree exported!")
	copyToClipboard(tree)
}

function importTree() {
	let input = prompt("Paste your exported Theory Tree here.")
	try {
		let upgs = JSON.parse(input)
		let plyr = player.elementary.theory.tree.upgrades
		for (let i=0;i<Object.keys(upgs).length;i++) {
			let key = Object.keys(upgs)[i]
			upgs[key] = new ExpantaNum(upgs[key])
			if (upgs[key].lte(plyr[key])) continue
			else {
				let costs = Array.from({length: Math.min(upgs[key].toNumber(), TREE_UPGS[key].cap.toNumber())}, (v,i) => TREE_UPGS[key].cost(new ExpantaNum(i)).div(tmp.elm.theory.tree.costReduc).round())
				let totalCost = costs.reduce((x,y) => ExpantaNum.add(x, y))
				if (player.elementary.theory.points.gte(totalCost)) {
					player.elementary.theory.points = player.elementary.theory.points.sub(totalCost)
					player.elementary.theory.tree.spent = player.elementary.theory.tree.spent.plus(totalCost)
					player.elementary.theory.tree.upgrades[key] = ExpantaNum.min(upgs[key], TREE_UPGS[key].cap)
				} else notifier.warn("You could not afford some of your requested Tree upgrades!")
			}
		}
	} catch(e) {
		notifier.error("Invalid tree")
	}
}

// Hadronic Challenge

function getProjectedHadronicScore() {
	let score = new ExpantaNum(0)
	
	// Pre-Collapse Modifiers
	if (getHCSelector("noTRU")) score = score.times(1.08).plus(0.08)
	
	// Collapse Modifiers
	if (getHCSelector("noCad")) score = score.times(1.05).plus(0.05)
	if (getHCSelector("noPU")) score = score.times(1.1).plus(0.1)
	if (getHCSelector("noDC")) score = score.times(1.04).plus(0.04)
	
	// Infinity Modifiers
	if (getHCSelector("noIU")) score = score.times(1.1).plus(0.1)
	score = score.plus(new ExpantaNum(getHCSelector("spaceon")).div(36))
	score = score.plus(new ExpantaNum(getHCSelector("solaris")).div(36))
	score = score.plus(new ExpantaNum(getHCSelector("infinity")).div(36))
	score = score.plus(new ExpantaNum(getHCSelector("eternity")).div(36))
	score = score.plus(new ExpantaNum(getHCSelector("reality")).div(36))
	score = score.plus(new ExpantaNum(getHCSelector("drigganiz")).div(36))
	if (getHCSelector("noGems")) score = score.times(1.01).plus(0.01)
	if (getHCSelector("purge")) score = score.times(3).plus(2)
	if (getHCSelector("noDS")) score = score.times(1.03).plus(0.03)
	if (getHCSelector("noDB")) score = score.times(1.03).plus(0.03)
		
	// Elementary Modifiers
	score = score.times(new ExpantaNum(getHCSelector("tv")).plus(2).pow(0.25)).plus(new ExpantaNum(getHCSelector("tv")).plus(1).div(20))
	
	// Goal Modifier
	score = score.times(new ExpantaNum(getHCSelector("goal")).log10().div(Math.log10(Number.MAX_VALUE)).log10().plus(1))
	
	return score
}

function isHCTabShown(name) {
	return hcTab == name;
}

function updateHCTabs() {
	var tabs = document.getElementsByClassName("hcTab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isHCTabShown(tabs[i].id));
	}
	new Element("furnacetabbtn").setDisplay(player.modes.includes("extreme"))
}

function showHCTab(name) {
	hcTab = name;
}

function getHCSelector(name) {
	let base;
	let data = HC_DATA[name]
	if (data[0]=="checkbox") return !(!player.elementary.hc.selectors[name])
	else if (data[0]=="text"||data[0]=="number"||data[0]=="range") base = new ExpantaNum(data[1][0]).toString()
	return player.elementary.hc.selectors[name]||base
}

function updateHCSelector(name) {
	let data = HC_DATA[name]
	let type = data[0]
	let el = new Element("hcSelector"+name)
	if (type=="checkbox") player.elementary.hc.selectors[name] = el.el.checked
	else if (type=="text"||type=="number"||type=="range") {
		let val = el.el.value||0
		try {
			let num = new ExpantaNum(val)
			if (type=="number"||type=="range") num = num.round()
			if (num.lt(data[1][0]) || num.isNaN()) num = new ExpantaNum(data[1][0])
			if (num.gt(data[1][1])) num = new ExpantaNum(data[1][1])
			player.elementary.hc.selectors[name] = num
			el.el.value = disp(num, 8, 3, 10)
		} catch(e) {
			notifier.warn("Improper Hadronic Challenge input")
			console.log(e)
		}
	}
}

function canCompleteHC() {
	return (!(!player.elementary.hc.active)) && player.distance.gte(ExpantaNum.mul(getHCSelector("goal"), DISTANCES.uni))
}

function updateHCSelectorInputs() {
	let len = Object.keys(HC_DATA).length
	for (let i=0;i<len;i++) {
		let name = Object.keys(HC_DATA)[i]
		let data = HC_DATA[name]
		let el = new Element("hcSelector"+name)
		el.el.disabled = !(!player.elementary.hc.active)
		if (data[0]=="checkbox") el.el.checked = getHCSelector(name)
		if (data[0]=="text"||data[0]=="number"||data[0]=="range") el.el.value = new ExpantaNum(getHCSelector(name)).toString()
		updateHCSelector(name)
	}
}

function startHC() {
	if (!player.elementary.hc.unl) return
	if (player.elementary.hc.active) {
		if (canCompleteHC()) player.elementary.hc.best = player.elementary.hc.best.max(getProjectedHadronicScore())
		else if (player.options.hcc) if (!confirm("Are you sure you want to exit the challenge early?")) return
	} else if (getProjectedHadronicScore().lte(0)) {
		alert("You cannot start a Hadronic Challenge with a Projected Hadronic Score of 0!")
		return
	} else if (player.elementary.theory.active) {
		alert("You cannot start a Hadronic Challenge while in a Theoriverse run!")
		return
	}
	player.elementary.hc.active = !player.elementary.hc.active
	elmReset(true)
	updateHCSelectorInputs()
}

function HCCBA(name) {
	if (name=="noTRU" && extremeStadiumActive("cranius", 3)) return true
	return player.elementary.hc.active && getHCSelector(name)
}

function HCTVal(name) {
	return !player.elementary.hc.active?new ExpantaNum(HC_DATA[name][1][0]):new ExpantaNum(getHCSelector(name))
}

function claimHadronEff() {
	let diff = tmp.elm.hc.hadronEff.sub(player.elementary.hc.claimed||0).floor()
	if (diff.gte(1)) {
		player.elementary.theory.points = player.elementary.theory.points.plus(diff)
		player.elementary.hc.claimed = player.elementary.hc.claimed.plus(diff)
	}
}

function exportHC() {
	let data = btoa(JSON.stringify(player.elementary.hc.selectors))
	notifier.info("Hadronic Challenge data exported!")
	copyToClipboard(data)
}

function importHC() {
	if (player.elementary.hc.active) {
		notifier.warn("You cannot import a Hadronic Challenge while in one!")
		return;
	}
	let toImport = prompt("Paste Hadronic Challenge data here.")
	try {
		let data = JSON.parse(atob(toImport))
		player.elementary.hc.selectors = data
		updateHCSelectorInputs()
	} catch(e) {
		notifier.warn("Invalid Hadronic Challenge data!")
	}
}

// Inflatons

function unlockInflatons() {
	if (!player.elementary.theory.unl) return
	if (!(player.elementary.hc.unl&&player.elementary.theory.accelerons.unl)) return
	if (player.elementary.theory.inflatons.unl) return
	if (player.elementary.theory.points.lt(1600)) return
	if (!confirm("Are you sure you want to unlock Inflatons? You won't be able to get your Theory Points back!")) return
	player.elementary.theory.points = player.elementary.theory.points.sub(1600)
	player.elementary.theory.inflatons.unl = true
}

function getInflatonState() {
	let x = player.elementary.theory.inflatons.amount.plus(1).log10()
	if (x.gte(5.5)) x = x.sqrt().times(Math.sqrt(5.5)).plus(5.5).div(2)
	if (x.gte(1e6)) return 1
	return -1*Math.cos(x.toNumber())
}

function getInflatonGain() {
	let gain = player.elementary.theory.inflatons.amount.plus(1).pow(0.6)
	gain = gain.times(player.elementary.theory.inflatons.amount.plus(1).pow((tmp.elm.hc.infState+1)/6))
	if (gain.gte(5e4)) gain = gain.times(5e4).sqrt()
	return gain
}

function getInflatonEff1() {
	let eff = player.elementary.theory.inflatons.amount.plus(1).log10().sqrt().plus(1)
	return eff
}

function getInflatonEff2() {
	let amt = player.elementary.theory.inflatons.amount
	let eff = new ExpantaNum(0)
	if (amt.gte(1e3)) eff = eff.plus(1)
	if (amt.gte(1e4)) eff = eff.plus(1)
	if (amt.gte(1e5)) eff = eff.plus(1)
	if (amt.gte(1e6)) eff = eff.plus(1)
	eff = eff.plus(amt.plus(1).log10().plus(1).log10())
	return eff.floor()
}