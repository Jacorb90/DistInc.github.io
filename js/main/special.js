function updateTempSpecial() {
	// Features

	tmp.features = {
		rockets: new Feature({
			name: "rockets",
			req: ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm),
			res: "distance",
			display: formatDistance,
			reached: player.rockets.gt(0) || player.rf.gt(0),
			progress: function () {
				return player.distance
					.max(1)
					.log10()
					.div(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm).log10());
			}
		}),
		automation: new Feature({
			name: "automation",
			req: ExpantaNum.mul(AUTO_UNL, tmp.auto ? tmp.auto.lrm : 10),
			res: "distance",
			display: formatDistance,
			reached: player.automation.unl,
			progress: function () {
				return player.distance
					.max(1)
					.log10()
					.div(ExpantaNum.mul(AUTO_UNL, tmp.auto ? tmp.auto.lrm : 10).log10());
			}
		}),
		"time reversal": new Feature({
			name: "time reversal",
			req: new ExpantaNum(DISTANCES.ly),
			res: "distance",
			display: formatDistance,
			reached: player.tr.unl,
			progress: function () {
				return player.distance.max(1).log10().div(new ExpantaNum(DISTANCES.ly).log10());
			}
		}),
		collapse: new Feature({
			name: "collapse",
			req: new ExpantaNum(COLLAPSE_UNL).times(tmp.collapse ? tmp.collapse.lrm : 1),
			res: "distance",
			display: formatDistance,
			reached: player.collapse.unl,
			progress: function () {
				return player.distance
					.max(1)
					.log10()
					.div(new ExpantaNum(COLLAPSE_UNL).times(tmp.collapse ? tmp.collapse.lrm : 1).log10());
			}
		}),
		pathogens: new Feature({
			name: "pathogens",
			req: new ExpantaNum(PATHOGENS_UNL).times(tmp.pathogens ? tmp.pathogens.lrm : 1),
			res: ["collapse", "cadavers"],
			display: showNum,
			reached: player.pathogens.unl,
			progress: function () {
				return player.collapse.cadavers.div(
					new ExpantaNum(PATHOGENS_UNL).times(tmp.pathogens ? tmp.pathogens.lrm : 1)
				);
			}
		}),
		dc: new Feature({
			name: "dc",
			req: new ExpantaNum(DC_UNL).mul(tmp.dc ? tmp.dc.lrm : 1),
			res: "distance",
			display: formatDistance,
			reached: player.dc.unl,
			displayName: "dark circles",
			progress: function () {
				return player.distance
					.max(1)
					.log10()
					.div(new ExpantaNum(DC_UNL).mul(tmp.dc ? tmp.dc.lrm : 1).log10());
			}
		}),
		infinity: new Feature({
			name: "infinity",
			req: new ExpantaNum(INF_UNL),
			res: "distance",
			display: formatDistance,
			reached: player.inf.unl,
			progress: function () {
				return player.distance.max(1).log10().div(new ExpantaNum(INF_UNL).log10());
			}
		}),
		ascension: new Feature({
			name: "ascension",
			req: new ExpantaNum(10),
			res: ["inf", "endorsements"],
			display: showNum,
			reached: player.inf.endorsements.gte(10),
			progress: function () {
				return player.inf.endorsements.div(10);
			}
		}),
		stadium: new Feature({
			name: "stadium",
			req: new ExpantaNum(15),
			res: ["inf", "endorsements"],
			display: showNum,
			reached: player.inf.endorsements.gte(15),
			displayName: "the stadium",
			progress: function () {
				return player.inf.endorsements.div(15);
			}
		}),
		pantheon: new Feature({
			name: "pantheon",
			req: new ExpantaNum(21),
			res: ["inf", "endorsements"],
			display: showNum,
			reached: player.inf.endorsements.gte(21),
			displayName: "the pantheon",
			progress: function () {
				return player.inf.endorsements.div(21);
			}
		}),
		derivatives: new Feature({
			name: "derivatives",
			req: ExpantaNum.mul(DISTANCES.uni, "1e90000"),
			res: "distance",
			display: formatDistance,
			reached: player.inf.derivatives.unl,
			progress: function () {
				return player.distance.max(1).log10().div(ExpantaNum.mul(DISTANCES.uni, "1e90000").log10());
			}
		}),
		elementary: new Feature({
			name: "elementary",
			res_amt: 3,
			req: [
				new ExpantaNum(LAYER_REQS.elementary[0][1]),
				new ExpantaNum(LAYER_REQS.elementary[1][1]),
				new ExpantaNum(LAYER_REQS.elementary[2][1])
			],
			res: ["rockets", ["collapse", "cadavers"], ["inf", "endorsements"]],
			display: [showNum, showNum, showNum],
			reached: player.elementary.times.gt(0),
			progress: function () {
				return player.rockets
					.max(1)
					.log10()
					.div(LAYER_REQS.elementary[0][1].log10())
					.min(1)
					.times(player.collapse.cadavers.max(1).log10().div(LAYER_REQS.elementary[1][1].log10()).min(1))
					.times(player.inf.endorsements.div(LAYER_REQS.elementary[2][1]).min(1));
			},
			spec: [false, true, true]
		}),
		theory: new Feature({
			name: "theory",
			res_amt: 2,
			req: [
				new ExpantaNum(THEORY_REQ[0]),
				new ExpantaNum(THEORY_REQ[1]),
			],
			specRes: [false, "EP in one run"],
			res: ["distance", "bestEP"],
			display: [formatDistance, showNum],
			reached: deepCopy(player.elementary.theory.unl),
			progress: function () {
				return player.distance.plus(1).logBase(THEORY_REQ[0]).min(1).times(player.bestEP.div(THEORY_REQ[1]).min(1))
			},
			spec: [false, false],
		}),
	};
	tmp.nf = "none";
	for (let i = 0; i < Object.keys(tmp.features).length; i++) {
		let feature = Object.values(tmp.features)[i];
		if (!(feature.name=="theory"&&player.elementary.theory.unl)) if (!feature.reached) {
			tmp.nf = feature.name;
			break;
		}
	}

	// Achievements

	tmp.ach = {};
	for (let r = 1; r <= ACH_DATA.rows; r++) {
		for (let c = 1; c <= ACH_DATA.cols; c++) {
			let id = r * 10 + c;
			tmp.ach[id] = new Achievement({ name: id, has: player.achievements.includes(id) });
		}
	}
	if (tmp.selAch === undefined || player.tab !== "achievements") tmp.selAch = 0;
	tmp.ga = player.achievements.length;
	tmp.ta = getAllAchievements().length;
}

function updateLayerMults() {
	tmp.lm = {};
	tmp.lm.rockets = new ExpantaNum(1);
	if (tmp.ach[34].has) tmp.lm.rockets = tmp.lm.rockets.times(1.1);
	if (tmp.ach[15].has) tmp.lm.rockets = tmp.lm.rockets.times(1.05);
	if (tmp.ach[26].has) tmp.lm.rockets = tmp.lm.rockets.times(1.1);
	if (tmp.ach[44].has) tmp.lm.rockets = tmp.lm.rockets.times(1.15);
	if (tmp.ach[76].has) tmp.lm.rockets = tmp.lm.rockets.times(1.02);
	if (tmp.ach[131].has) tmp.lm.rockets = tmp.lm.rockets.times(2);
	if (modeActive("extreme") && player.rf.gt(0))
		tmp.lm.rockets = tmp.lm.rockets.times(ExpantaNum.pow(2, player.furnace.upgrades[2]));
	if (player.rank.gt(100)) tmp.lm.rockets = tmp.lm.rockets.times(2);
	if (player.tr.upgrades.includes(10)) tmp.lm.rockets = tmp.lm.rockets.times(tr10Eff().max(1));
	if (player.tr.upgrades.includes(28) && modeActive("extreme"))
		tmp.lm.rockets = tmp.lm.rockets.times(player.furnace.coal.plus(1).pow(0.15));
	if (player.tr.upgrades.includes(29) && modeActive("extreme"))
		tmp.lm.rockets = tmp.lm.rockets.times(
			player.rockets.plus(1).logBase(2).pow(player.dc.fluid.plus(1).times(10).slog(10).pow(2).max(1))
		);
	if (tmp.collapse) if (tmp.collapse.hasMilestone(6)) tmp.lm.rockets = tmp.lm.rockets.times(10);
	if (tmp.collapse) if (tmp.collapse.hasMilestone(8)) tmp.lm.rockets = tmp.lm.rockets.times(collapseMile8Eff().max(1));
	if (tmp.pathogens && player.pathogens.unl) tmp.lm.rockets = tmp.lm.rockets.times(tmp.pathogens[2].eff.max(1));
	if (tmp.dc) if (player.dc.unl) tmp.lm.rockets = tmp.lm.rockets.times(tmp.dc.dmEff.max(1));
	if (tmp.inf) if (tmp.inf.upgs.has("1;2")) tmp.lm.rockets = tmp.lm.rockets.times(INF_UPGS.effects["1;2"]().max(1));
	if (tmp.inf) if (tmp.inf.upgs.has("4;8")) tmp.lm.rockets = tmp.lm.rockets.times(player.collapse.lifeEssence.max(1));
	if (tmp.inf)
		if (tmp.inf.upgs.has("9;8")) {
			let c = player.tr.cubes.max(1).pow(0.1);
			if (c.gte("1e100000")) c = c.log10().pow(20000);
			tmp.lm.rockets = tmp.lm.rockets.times(c.max(1));
		}
	if (tmp.elm)
		if (player.elementary.times.gt(0)) tmp.lm.rockets = tmp.lm.rockets.times(tmp.elm.ferm.quarkR("up").max(1));
	if (tmp.lm.rockets.eq(0)) tmp.lm.rockets = new ExpantaNum(1)
	tmp.lm.collapse = new ExpantaNum(1);
	if (tmp.collapse) if (tmp.collapse.hasMilestone(5)) tmp.lm.collapse = tmp.lm.collapse.times(collapseMile5Eff());
	if (tmp.collapse) if (tmp.collapse.hasMilestone(10)) tmp.lm.collapse = tmp.lm.collapse.times(collapseMile10Eff());
	if (tmp.ach[38].has) tmp.lm.collapse = tmp.lm.collapse.times(2);
	if (tmp.ach[65].has) tmp.lm.collapse = tmp.lm.collapse.times(1.4);
	if (tmp.ach[131].has) tmp.lm.collapse = tmp.lm.collapse.times(2);
	if (player.tr.upgrades.includes(14)) tmp.lm.collapse = tmp.lm.collapse.times(tr14Eff()["cd"]);
	if (tmp.inf)
		if (tmp.inf.upgs.has("3;2")) tmp.lm.collapse = tmp.lm.collapse.times(INF_UPGS.effects["3;2"]()["cadavers"]);
	if (tmp.collapse)
		if (
			modeActive("hard") &&
			(tmp.collapse.layer.gain.gte(10) || (tmp.clghm && tmp.collapse.layer.gain.gte(5)))
		) {
			tmp.lm.collapse = tmp.lm.collapse.div(2);
			tmp.clghm = true;
		}
	if (tmp.ach[68].has && modeActive("extreme")) tmp.lm.collapse = tmp.lm.collapse.times(5);
	if (tmp.collapse) if (modeActive("easy")) tmp.lm.collapse = tmp.lm.collapse.times(3);
	if (tmp.elm)
		if (player.elementary.times.gt(0)) tmp.lm.collapse = tmp.lm.collapse.times(tmp.elm.ferm.quarkR("down").max(1));
}

function updateTempSC() {
	tmp.sc = {};
	tmp.sc.rocketGain = tmp.rockets.layer.gain.gte(tmp.rockets.sc);
	tmp.sc.rocketEff = tmp.rockets.eff.gte(tmp.rockets.esc);
	tmp.sc.timeCubeEff = player.tr.cubes.gte(tmp.tr.esc);
	tmp.sc.cadaverGain = tmp.collapse.layer.gain.gte(tmp.collapse.sc);
	tmp.sc.cadaverEff = tmp.collapse.eff.gte(tmp.collapse.esc);
	tmp.sc.pthGain = tmp.pathogens.baseGain.gte(tmp.pathogens.st);
}
