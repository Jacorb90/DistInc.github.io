function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function ENString(obj) {
	let ret = deepCopy(obj);
	if (ret.elementary === undefined) ret.elementary = deepCopy(DEFAULT_START.elementary);
	if (ret.autoModes === undefined) ret.autoModes = {};
	if (ret.autoTxt === undefined) ret.autoTxt = {};
	ret.distance = new ExpantaNum(ret.distance).toString();
	ret.velocity = new ExpantaNum(ret.velocity).toString();
	ret.rank = new ExpantaNum(ret.rank).toString();
	ret.tier = new ExpantaNum(ret.tier).toString();
	ret.rockets = new ExpantaNum(ret.rockets).toString();
	ret.rf = new ExpantaNum(ret.rf).toString();
	ret.automation.scraps = new ExpantaNum(ret.automation.scraps).toString();
	ret.automation.intelligence = new ExpantaNum(ret.automation.intelligence).toString();
	for (let i = 0; i < Object.values(ret.automation.robots).length; i++)
		for (let j = 0; j <= 1; j++)
			ret.automation.robots[Object.keys(ret.automation.robots)[i]][j] = new ExpantaNum(
				Object.values(ret.automation.robots)[i][j]
			).toString();
	ret.tr.cubes = new ExpantaNum(ret.tr.cubes).toString();
	ret.collapse.cadavers = new ExpantaNum(ret.collapse.cadavers).toString();
	ret.collapse.lifeEssence = new ExpantaNum(ret.collapse.lifeEssence).toString();
	ret.pathogens.amount = new ExpantaNum(ret.pathogens.amount).toString();
	for (let i = 1; i <= Object.keys(ret.pathogens.upgrades).length; i++)
		ret.pathogens.upgrades[i] = new ExpantaNum(ret.pathogens.upgrades[i]).toString();
	ret.dc.matter = new ExpantaNum(ret.dc.matter).toString();
	ret.dc.energy = new ExpantaNum(ret.dc.energy).toString();
	ret.dc.fluid = new ExpantaNum(ret.dc.fluid).toString();
	ret.dc.cores = new ExpantaNum(ret.dc.cores).toString();
	ret.inf.endorsements = new ExpantaNum(ret.inf.endorsements).toString();
	ret.inf.knowledge = new ExpantaNum(ret.inf.knowledge).toString();
	for (let i = 0; i < 4; i++) {
		ret.inf.ascension.time[i] = new ExpantaNum(ret.inf.ascension.time[i]).toString();
		ret.inf.ascension.enlightenments[i] = new ExpantaNum(ret.inf.ascension.enlightenments[i]).toString();
	}
	ret.inf.ascension.power = new ExpantaNum(ret.inf.ascension.power).toString();
	ret.inf.pantheon.gems = new ExpantaNum(ret.inf.pantheon.gems).toString();
	ret.inf.pantheon.angels = new ExpantaNum(ret.inf.pantheon.angels).toString();
	ret.inf.pantheon.demons = new ExpantaNum(ret.inf.pantheon.demons).toString();
	ret.inf.pantheon.heavenlyChips = new ExpantaNum(ret.inf.pantheon.heavenlyChips).toString();
	ret.inf.pantheon.demonicSouls = new ExpantaNum(ret.inf.pantheon.demonicSouls).toString();
	ret.inf.pantheon.hauntingEnergy = new ExpantaNum(ret.inf.pantheon.hauntingEnergy||0).toString();
	ret.inf.pantheon.purge.power = new ExpantaNum(ret.inf.pantheon.purge.power).toString();
	if (Object.keys(ret.inf.derivatives.amts).length > 0)
		for (const key in ret.inf.derivatives.amts)
			ret.inf.derivatives.amts[key] = new ExpantaNum(ret.inf.derivatives.amts[key]).toString();
	ret.inf.derivatives.unlocks = new ExpantaNum(ret.inf.derivatives.unlocks).toString();
	ret.bestDistance = new ExpantaNum(ret.bestDistance).toString()
	ret.inf.bestDist = new ExpantaNum(ret.inf.bestDist).toString()
	ret.bestV = new ExpantaNum(ret.bestV).toString()
	ret.bestA = new ExpantaNum(ret.bestA).toString()
	ret.bestEnd = new ExpantaNum(ret.bestEnd).toString()
	ret.bestEP = new ExpantaNum(ret.bestEP).toString()
	ret.elementary.times = new ExpantaNum(ret.elementary.times).toString();
	ret.elementary.particles = new ExpantaNum(ret.elementary.particles).toString();
	ret.elementary.fermions.amount = new ExpantaNum(ret.elementary.fermions.amount).toString();
	ret.elementary.fermions.quarks.amount = new ExpantaNum(ret.elementary.fermions.quarks.amount).toString();
	ret.elementary.fermions.leptons.amount = new ExpantaNum(ret.elementary.fermions.leptons.amount).toString();
	ret.elementary.bosons.amount = new ExpantaNum(ret.elementary.bosons.amount).toString();
	ret.elementary.bosons.gauge.amount = new ExpantaNum(ret.elementary.bosons.gauge.amount).toString();
	ret.elementary.bosons.gauge.force = new ExpantaNum(ret.elementary.bosons.gauge.force).toString();
	ret.elementary.bosons.gauge.photons.amount = new ExpantaNum(ret.elementary.bosons.gauge.photons.amount).toString();
	for (let i = 0; i < 4; i++)
		ret.elementary.bosons.gauge.photons.upgrades[i] = new ExpantaNum(
			ret.elementary.bosons.gauge.photons.upgrades[i]||0
		).toString();
	ret.elementary.bosons.gauge.w = new ExpantaNum(ret.elementary.bosons.gauge.w).toString();
	ret.elementary.bosons.gauge.z = new ExpantaNum(ret.elementary.bosons.gauge.z).toString();
	ret.elementary.bosons.gauge.gluons.r = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.r.amount).toString(),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.r.upgrades[0]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.r.upgrades[1]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.r.upgrades[2]||0).toString()
		]
	};
	ret.elementary.bosons.gauge.gluons.g = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.g.amount).toString(),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.g.upgrades[0]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.g.upgrades[1]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.g.upgrades[2]||0).toString()
		]
	};
	ret.elementary.bosons.gauge.gluons.b = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.b.amount).toString(),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.b.upgrades[0]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.b.upgrades[1]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.b.upgrades[2]||0).toString()
		]
	};
	ret.elementary.bosons.gauge.gluons.ar = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.ar.amount).toString(),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ar.upgrades[0]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ar.upgrades[1]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ar.upgrades[2]||0).toString()
		]
	};
	ret.elementary.bosons.gauge.gluons.ag = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.ag.amount).toString(),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ag.upgrades[0]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ag.upgrades[1]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ag.upgrades[2]||0).toString()
		]
	};
	ret.elementary.bosons.gauge.gluons.ab = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.ab.amount).toString(),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ab.upgrades[0]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ab.upgrades[1]).toString(),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ab.upgrades[2]||0).toString()
		]
	};
	ret.elementary.bosons.gauge.gravitons = new ExpantaNum(ret.elementary.bosons.gauge.gravitons).toString();
	ret.elementary.bosons.scalar.amount = new ExpantaNum(ret.elementary.bosons.scalar.amount).toString();
	ret.elementary.bosons.scalar.higgs.amount = new ExpantaNum(ret.elementary.bosons.scalar.higgs.amount).toString();
	ret.elementary.theory.points = new ExpantaNum(ret.elementary.theory.points).toString();
	ret.elementary.theory.depth = new ExpantaNum(ret.elementary.theory.depth).toString();
	ret.elementary.theory.bestDepth = new ExpantaNum(ret.elementary.theory.bestDepth).toString();
	ret.elementary.theory.supersymmetry.squarks = new ExpantaNum(ret.elementary.theory.supersymmetry.squarks).toString();
	ret.elementary.theory.supersymmetry.sleptons = new ExpantaNum(ret.elementary.theory.supersymmetry.sleptons).toString();
	ret.elementary.theory.supersymmetry.neutralinos = new ExpantaNum(ret.elementary.theory.supersymmetry.neutralinos).toString();
	ret.elementary.theory.supersymmetry.charginos = new ExpantaNum(ret.elementary.theory.supersymmetry.charginos).toString();
	ret.elementary.theory.tree.spent = new ExpantaNum(ret.elementary.theory.tree.spent).toString();
	if (Object.keys(ret.elementary.theory.tree.upgrades).length>0) for (let i=0;i<Object.keys(ret.elementary.theory.tree.upgrades).length;i++) ret.elementary.theory.tree.upgrades[Object.keys(ret.elementary.theory.tree.upgrades)[i]] = new ExpantaNum(ret.elementary.theory.tree.upgrades[Object.keys(ret.elementary.theory.tree.upgrades)[i]]).toString();
	for (let i=0;i<10;i++) ret.elementary.theory.strings.amounts[i] = new ExpantaNum(ret.elementary.theory.strings.amounts[i]||0).toString();
	ret.elementary.theory.strings.entangled = new ExpantaNum(ret.elementary.theory.strings.entangled).toString();
	ret.elementary.theory.preons.amount = new ExpantaNum(ret.elementary.theory.preons.amount).toString();
	ret.elementary.theory.preons.boosters = new ExpantaNum(ret.elementary.theory.preons.boosters).toString();
	ret.elementary.theory.accelerons.amount = new ExpantaNum(ret.elementary.theory.accelerons.amount).toString();
	ret.elementary.theory.accelerons.expanders = new ExpantaNum(ret.elementary.theory.accelerons.expanders).toString();
	ret.elementary.theory.inflatons.amount = new ExpantaNum(ret.elementary.theory.inflatons.amount).toString();
	ret.elementary.time = new ExpantaNum(ret.elementary.time||0).toString();
	ret.elementary.hc.best = new ExpantaNum(ret.elementary.hc.best).toString();
	ret.elementary.hc.hadrons = new ExpantaNum(ret.elementary.hc.hadrons).toString();
	ret.elementary.hc.claimed = new ExpantaNum(ret.elementary.hc.claimed||0).toString();
	if (Object.keys(ret.autoTxt).length>0) for (let i=0;i<Object.keys(ret.autoTxt).length;i++) ret.autoTxt[Object.keys(ret.autoTxt)[i]] = new ExpantaNum(ret.autoTxt[Object.keys(ret.autoTxt)[i]]).toString();
	for (let i=0;i<5;i++) ret.elementary.foam.amounts[i] = new ExpantaNum(ret.elementary.foam.amounts[i]||0).toString();
	ret.elementary.foam.maxDepth = new ExpantaNum(ret.elementary.foam.maxDepth||1).toString();
	for (let i=0;i<15;i++) ret.elementary.foam.upgrades[i] = new ExpantaNum(ret.elementary.foam.upgrades[i]||0).toString();
	ret.elementary.entropy.bestDepth = new ExpantaNum(ret.elementary.entropy.bestDepth||1).toString();
	ret.elementary.entropy.amount = new ExpantaNum(ret.elementary.entropy.amount||0).toString();
	ret.elementary.entropy.best = new ExpantaNum(ret.elementary.entropy.best||0).toString();
	ret.elementary.sky.amount = new ExpantaNum(ret.elementary.sky.amount||0).toString();
	ret.elementary.sky.pions.amount = new ExpantaNum(ret.elementary.sky.pions.amount||0).toString();
	ret.elementary.sky.spinors.amount = new ExpantaNum(ret.elementary.sky.spinors.amount||0).toString();
	for (let i=0;i<Object.keys(ret.elementary.sky.pions.field).length;i++) ret.elementary.sky.pions.field[Object.keys(ret.elementary.sky.pions.field)[i]] = new ExpantaNum(ret.elementary.sky.pions.field[Object.keys(ret.elementary.sky.pions.field)[i]]||0).toString();
	for (let i=0;i<Object.keys(ret.elementary.sky.spinors.field).length;i++) ret.elementary.sky.spinors.field[Object.keys(ret.elementary.sky.spinors.field)[i]] = new ExpantaNum(ret.elementary.sky.spinors.field[Object.keys(ret.elementary.sky.spinors.field)[i]]||0).toString();
	ret.mlt.times = new ExpantaNum(ret.mlt.times).toString();
	ret.mlt.energy = new ExpantaNum(ret.mlt.energy).toString();
	ret.mlt.bestEnergy = new ExpantaNum(ret.mlt.bestEnergy).toString();
	ret.mlt.totalEnergy = new ExpantaNum(ret.mlt.totalEnergy).toString();
	for (let i=0;i<Object.keys(ret.mlt.quiltUpgs).length;i++) ret.mlt.quiltUpgs[Object.keys(ret.mlt.quiltUpgs)[i]] = new ExpantaNum(ret.mlt.quiltUpgs[Object.keys(ret.mlt.quiltUpgs)[i]]).toString();
	return ret;
}

function transformToEN(obj, sc = DEFAULT_START) {
	let ret = deepCopy(obj);
	for (const key in sc) if (ret[key] === undefined) ret[key] = deepCopy(sc[key]);
	for (const key in sc.options) if (ret.options[key] === undefined) ret.options[key] = deepCopy(sc.options[key]);
	if (ret.version === undefined || !ret.inf.ascension) {
		ret.inf.ascension = deepCopy(sc.inf.ascension);
		ret.version = 1.0;
	}
	if (ret.version < 1.1 || !ret.inf.stadium) ret.inf.stadium = deepCopy(sc.inf.stadium);
	if (ret.version < 1.2 || !ret.inf.pantheon) ret.inf.pantheon = deepCopy(sc.inf.pantheon);
	if (ret.version < 1.3 || !ret.inf.derivatives) ret.inf.derivatives = deepCopy(sc.inf.derivatives);
	if (ret.version < 1.5 || !ret.elementary) ret.elementary = deepCopy(sc.elementary);
	if (ret.version < 1.6 || !ret.elementary.theory) ret.elementary.theory = deepCopy(sc.elementary.theory);
	if (ret.version < 1.7 || !ret.elementary.hc) ret.elementary.hc = deepCopy(sc.elementary.hc);
	if (ret.version < 1.8 || !ret.elementary.foam) ret.elementary.foam = deepCopy(sc.elementary.foam);
	if (ret.version < 1.8 || !ret.elementary.foam.amounts) ret.elementary.foam.amounts = deepCopy(sc.elementary.foam.amounts);
	if (ret.version < 1.8 || !ret.elementary.entropy) ret.elementary.entropy = deepCopy(sc.elementary.entropy);
	if (ret.version < 1.9 || !ret.elementary.sky) ret.elementary.sky = deepCopy(sc.elementary.sky);
	if (ret.version < 2.0 || !ret.mlt) ret.mlt = deepCopy(sc.mlt);
	if (ret.version < sc.version) onVersionChange();
	if (ret.elementary.theory.tree.spent === undefined) ret.elementary.theory.tree.spent = deepCopy(sc.elementary.theory.tree.spent)
	if (ret.elementary.theory.inflatons === undefined) ret.elementary.theory.inflatons = deepCopy(sc.elementary.theory.inflatons)
	if (ret.autoModes === undefined) ret.autoModes = {};
	if (ret.autoTxt === undefined) ret.autoTxt = {};
	if (ret.options.tabsHidden === undefined) ret.options.tabsHidden = []; // just in case
	if (ret.mlt.highestUnlocked === undefined) {
		ret.mlt.highestUnlocked = 0;
		if (ret.mlt.highestCompleted>=1 || ret.mlt.active==1) ret.mlt.highestUnlocked = 1;
	}
	if (ret.mlt.mlt1selected === undefined) ret.mlt.mlt1selected = [];
	if (ret.mlt.mlt3selected === undefined) ret.mlt.mlt3selected = [];
	ret.distance = new ExpantaNum(ret.distance);
	ret.velocity = new ExpantaNum(ret.velocity);
	ret.rank = new ExpantaNum(ret.rank);
	ret.tier = new ExpantaNum(ret.tier);
	ret.rockets = new ExpantaNum(ret.rockets);
	ret.rf = new ExpantaNum(ret.rf);
	ret.automation.scraps = new ExpantaNum(ret.automation.scraps);
	ret.automation.intelligence = new ExpantaNum(ret.automation.intelligence);
	for (let i = 0; i < Object.values(ret.automation.robots).length; i++)
		for (let j = 0; j <= 1; j++)
			ret.automation.robots[Object.keys(ret.automation.robots)[i]][j] = new ExpantaNum(
				Object.values(ret.automation.robots)[i][j]
			);
	ret.tr.cubes = new ExpantaNum(ret.tr.cubes);
	ret.collapse.cadavers = new ExpantaNum(ret.collapse.cadavers);
	ret.collapse.lifeEssence = new ExpantaNum(ret.collapse.lifeEssence);
	ret.pathogens.amount = new ExpantaNum(ret.pathogens.amount);
	for (let i = 1; i <= Object.keys(sc.pathogens.upgrades).length; i++)
		ret.pathogens.upgrades[i] = new ExpantaNum(ret.pathogens.upgrades[i] || 0);
	ret.dc.matter = new ExpantaNum(ret.dc.matter);
	ret.dc.energy = new ExpantaNum(ret.dc.energy);
	ret.dc.fluid = new ExpantaNum(ret.dc.fluid);
	ret.dc.cores = new ExpantaNum(ret.dc.cores);
	ret.inf.endorsements = new ExpantaNum(ret.inf.endorsements);
	ret.inf.knowledge = new ExpantaNum(ret.inf.knowledge);
	for (let i = 0; i < 4; i++) {
		ret.inf.ascension.time[i] = new ExpantaNum(ret.inf.ascension.time[i]);
		ret.inf.ascension.enlightenments[i] = new ExpantaNum(ret.inf.ascension.enlightenments[i]);
	}
	ret.inf.ascension.power = new ExpantaNum(ret.inf.ascension.power);
	ret.inf.pantheon.gems = new ExpantaNum(ret.inf.pantheon.gems);
	ret.inf.pantheon.angels = new ExpantaNum(ret.inf.pantheon.angels);
	ret.inf.pantheon.demons = new ExpantaNum(ret.inf.pantheon.demons);
	ret.inf.pantheon.heavenlyChips = new ExpantaNum(ret.inf.pantheon.heavenlyChips);
	ret.inf.pantheon.demonicSouls = new ExpantaNum(ret.inf.pantheon.demonicSouls);
	ret.inf.pantheon.hauntingEnergy = new ExpantaNum(ret.inf.pantheon.hauntingEnergy||0);
	ret.inf.pantheon.purge.power = new ExpantaNum(ret.inf.pantheon.purge.power);
	if (Object.keys(ret.inf.derivatives.amts).length > 0)
		for (const key in ret.inf.derivatives.amts)
			ret.inf.derivatives.amts[key] = new ExpantaNum(ret.inf.derivatives.amts[key]);
	ret.inf.derivatives.unlocks = new ExpantaNum(ret.inf.derivatives.unlocks);
	ret.inf.bestDist = new ExpantaNum(ret.inf.bestDist);
	ret.bestDistance = new ExpantaNum(ret.bestDistance)
	ret.bestV = new ExpantaNum(ret.bestV)
	ret.bestA = new ExpantaNum(ret.bestA)
	ret.bestEnd = new ExpantaNum(ret.bestEnd)
	ret.bestEP = new ExpantaNum(ret.bestEP)
	ret.elementary.times = new ExpantaNum(ret.elementary.times);
	ret.elementary.particles = new ExpantaNum(ret.elementary.particles);
	ret.elementary.fermions.amount = new ExpantaNum(ret.elementary.fermions.amount);
	ret.elementary.fermions.quarks.amount = new ExpantaNum(ret.elementary.fermions.quarks.amount);
	ret.elementary.fermions.leptons.amount = new ExpantaNum(ret.elementary.fermions.leptons.amount);
	ret.elementary.bosons.amount = new ExpantaNum(ret.elementary.bosons.amount);
	ret.elementary.bosons.gauge.amount = new ExpantaNum(ret.elementary.bosons.gauge.amount);
	ret.elementary.bosons.gauge.force = new ExpantaNum(ret.elementary.bosons.gauge.force);
	ret.elementary.bosons.gauge.photons.amount = new ExpantaNum(ret.elementary.bosons.gauge.photons.amount);
	for (let i = 0; i < 4; i++)
		ret.elementary.bosons.gauge.photons.upgrades[i] = new ExpantaNum(
			ret.elementary.bosons.gauge.photons.upgrades[i]||0
		);
	ret.elementary.bosons.gauge.w = new ExpantaNum(ret.elementary.bosons.gauge.w);
	ret.elementary.bosons.gauge.z = new ExpantaNum(ret.elementary.bosons.gauge.z);
	ret.elementary.bosons.gauge.gluons.r = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.r.amount),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.r.upgrades[0]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.r.upgrades[1]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.r.upgrades[2]||0)
		]
	};
	ret.elementary.bosons.gauge.gluons.g = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.g.amount),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.g.upgrades[0]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.g.upgrades[1]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.g.upgrades[2]||0)
		]
	};
	ret.elementary.bosons.gauge.gluons.b = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.b.amount),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.b.upgrades[0]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.b.upgrades[1]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.b.upgrades[2]||0)
		]
	};
	ret.elementary.bosons.gauge.gluons.ar = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.ar.amount),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ar.upgrades[0]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ar.upgrades[1]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ar.upgrades[2]||0)
		]
	};
	ret.elementary.bosons.gauge.gluons.ag = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.ag.amount),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ag.upgrades[0]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ag.upgrades[1]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ag.upgrades[2]||0)
		]
	};
	ret.elementary.bosons.gauge.gluons.ab = {
		amount: new ExpantaNum(ret.elementary.bosons.gauge.gluons.ab.amount),
		upgrades: [
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ab.upgrades[0]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ab.upgrades[1]),
			new ExpantaNum(ret.elementary.bosons.gauge.gluons.ab.upgrades[2]||0)
		]
	};
	ret.elementary.bosons.gauge.gravitons = new ExpantaNum(ret.elementary.bosons.gauge.gravitons);
	ret.elementary.bosons.scalar.amount = new ExpantaNum(ret.elementary.bosons.scalar.amount);
	ret.elementary.bosons.scalar.higgs.amount = new ExpantaNum(ret.elementary.bosons.scalar.higgs.amount);
	ret.elementary.theory.points = new ExpantaNum(ret.elementary.theory.points);
	ret.elementary.theory.depth = new ExpantaNum(ret.elementary.theory.depth);
	ret.elementary.theory.bestDepth = new ExpantaNum(ret.elementary.theory.bestDepth).max(ret.elementary.theory.depth);
	ret.elementary.theory.supersymmetry.squarks = new ExpantaNum(ret.elementary.theory.supersymmetry.squarks);
	ret.elementary.theory.supersymmetry.sleptons = new ExpantaNum(ret.elementary.theory.supersymmetry.sleptons);
	ret.elementary.theory.supersymmetry.neutralinos = new ExpantaNum(ret.elementary.theory.supersymmetry.neutralinos);
	ret.elementary.theory.supersymmetry.charginos = new ExpantaNum(ret.elementary.theory.supersymmetry.charginos);
	ret.elementary.theory.tree.spent = new ExpantaNum(ret.elementary.theory.tree.spent);
	if (Object.keys(ret.elementary.theory.tree.upgrades).length>0) for (let i=0;i<Object.keys(ret.elementary.theory.tree.upgrades).length;i++) ret.elementary.theory.tree.upgrades[Object.keys(ret.elementary.theory.tree.upgrades)[i]] = new ExpantaNum(ret.elementary.theory.tree.upgrades[Object.keys(ret.elementary.theory.tree.upgrades)[i]]);
	for (let i=0;i<10;i++) ret.elementary.theory.strings.amounts[i] = new ExpantaNum(ret.elementary.theory.strings.amounts[i]||0);
	ret.elementary.theory.strings.entangled = new ExpantaNum(ret.elementary.theory.strings.entangled);
	ret.elementary.theory.preons.amount = new ExpantaNum(ret.elementary.theory.preons.amount);
	ret.elementary.theory.preons.boosters = new ExpantaNum(ret.elementary.theory.preons.boosters);
	ret.elementary.theory.accelerons.amount = new ExpantaNum(ret.elementary.theory.accelerons.amount);
	ret.elementary.theory.accelerons.expanders = new ExpantaNum(ret.elementary.theory.accelerons.expanders);
	ret.elementary.theory.inflatons.amount = new ExpantaNum(ret.elementary.theory.inflatons.amount);
	ret.elementary.time = new ExpantaNum(ret.elementary.time||0);
	ret.elementary.hc.best = new ExpantaNum(ret.elementary.hc.best);
	ret.elementary.hc.hadrons = new ExpantaNum(ret.elementary.hc.hadrons);
	ret.elementary.hc.claimed = new ExpantaNum(ret.elementary.hc.claimed||0);
	if (Object.keys(ret.autoTxt).length>0) for (let i=0;i<Object.keys(ret.autoTxt).length;i++) ret.autoTxt[Object.keys(ret.autoTxt)[i]] = new ExpantaNum(ret.autoTxt[Object.keys(ret.autoTxt)[i]])
	for (let i=0;i<5;i++) ret.elementary.foam.amounts[i] = new ExpantaNum(ret.elementary.foam.amounts[i]||0);
	ret.elementary.foam.maxDepth = new ExpantaNum(ret.elementary.foam.maxDepth||1);
	for (let i=0;i<15;i++) ret.elementary.foam.upgrades[i] = new ExpantaNum(ret.elementary.foam.upgrades[i]||0);
	ret.elementary.entropy.bestDepth = new ExpantaNum(ret.elementary.entropy.bestDepth||1);
	ret.elementary.entropy.amount = new ExpantaNum(ret.elementary.entropy.amount||0);
	ret.elementary.entropy.best = new ExpantaNum(ret.elementary.entropy.best||0);
	ret.elementary.sky.amount = new ExpantaNum(ret.elementary.sky.amount||0);
	ret.elementary.sky.pions.amount = new ExpantaNum(ret.elementary.sky.pions.amount||0);
	ret.elementary.sky.spinors.amount = new ExpantaNum(ret.elementary.sky.spinors.amount||0);
	for (let i=0;i<Object.keys(ret.elementary.sky.pions.field).length;i++) ret.elementary.sky.pions.field[Object.keys(ret.elementary.sky.pions.field)[i]] = new ExpantaNum(ret.elementary.sky.pions.field[Object.keys(ret.elementary.sky.pions.field)[i]]||0);
	for (let i=0;i<Object.keys(ret.elementary.sky.spinors.field).length;i++) ret.elementary.sky.spinors.field[Object.keys(ret.elementary.sky.spinors.field)[i]] = new ExpantaNum(ret.elementary.sky.spinors.field[Object.keys(ret.elementary.sky.spinors.field)[i]]||0);
	ret.mlt.times = new ExpantaNum(ret.mlt.times);
	ret.mlt.energy = new ExpantaNum(ret.mlt.energy);
	ret.mlt.bestEnergy = new ExpantaNum(ret.mlt.bestEnergy);
	ret.mlt.totalEnergy = new ExpantaNum(ret.mlt.totalEnergy);
	for (let i=0;i<Object.keys(ret.mlt.quiltUpgs).length;i++) ret.mlt.quiltUpgs[Object.keys(ret.mlt.quiltUpgs)[i]] = new ExpantaNum(ret.mlt.quiltUpgs[Object.keys(ret.mlt.quiltUpgs)[i]]);
	ret.version = Math.max(ret.version, sc.version);
	return ret;
}

function primesLTE(x) {
	x = new ExpantaNum(x).round();
	if (x.lte(1)) return new ExpantaNum(0);
	if (x.lte(11))
		return ExpantaNum.mul(2.7135e-158, ExpantaNum.pow(2.116e14, x))
			.sub(x.pow(2).times(0.053030303))
			.plus(x.times(1.02576))
			.sub(0.9)
			.round();
	let ret = x.div(x.ln());
	return ret.round();
}

function copyToClipboard(str) {
	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	el.setSelectionRange(0, 99999);
	document.execCommand("copy");
	document.body.removeChild(el);
}

function reload() {
	reloaded = true;
	let el = document.createElement("a");
	el.href = "main.html";
	el.click();
	window.location.reload();
}

function getCurrentTime() {
	return Date.now();
}

function getAllAchievements() {
	let a = [];
	for (let r = 1; r <= ACH_DATA.rows; r++) for (let c = 1; c <= ACH_DATA.cols; c++) a.push(r * 10 + c);
	if (modeActive("na")) a = a.filter(x => Object.keys(ACH_DATA.rewards).includes(x.toString()));
	return a;
}

function reverseTri(n) {
	return Math.ceil(0.5 * (Math.sqrt(8 * n + 1) - 1));
}

async function showHiddenDiv(data) {
	if (!showContainer) closeHiddenDiv();

	showTab(data.tab);
	showContainer = false;
	let reset = document.createElement("div");
	reset.style.width = "1%";
	reset.style.height = "1%";
	reset.innerHTML =
		"<br><b>" +
		data.title +
		"</b><br><br><span id='resetContainerBody' style='display: none'>" +
		data.body +
		"</span>";
	reset.style["background-color"] = data.color;
	reset.id = "reset";
	reset.className = "hiddenDiv";

	let resetContainer = document.createElement("div");
	resetContainer.style["text-align"] = "center";
	resetContainer.style.position = "absolute";
	resetContainer.style.width = "100%";
	resetContainer.style.height = "100%";
	resetContainer.id = "resetContainer";
	resetContainer.appendChild(reset);
	document.body.appendChild(resetContainer);

	await sleep(3);
	if (document.getElementById("resetContainerBody")) document.getElementById("resetContainerBody").style.display = "";
}

async function closeHiddenDiv(fast=false) {
	let element = document.getElementById("resetContainer");
	if (!element) return;
	document.getElementById("resetContainerBody").style.display = "none";
	document.getElementById("reset").className = "hiddenDivShrink";
	if (!fast) await sleep(1.4);
	if (!element.parentNode) return;
	element.parentNode.removeChild(element);
	showContainer = true;
	updateTemp();
}

function sleep(s) {
	return new Promise(resolve => setTimeout(resolve, s * 1000));
}

function nerfOfflineProg(time) {
	time = new ExpantaNum(time).div(1000);
	if (time.gt(60)) time = time.pow(3/4).times(Math.pow(60, 1/4));
	return time.times(1000).max(0);
}
