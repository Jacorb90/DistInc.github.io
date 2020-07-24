function loadTempFeatures() {
	tmp.features = {
		rockets: new Feature({
			name: "rockets",
			req: ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm),
			res: "distance",
			display: formatDistance,
			reached: function() { return player.rockets.gt(0) || player.rf.gt(0) },
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
			reached: function() { return player.automation.unl },
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
			reached: function() { return player.tr.unl },
			progress: function () {
				return player.distance.max(1).log10().div(new ExpantaNum(DISTANCES.ly).log10());
			}
		}),
		collapse: new Feature({
			name: "collapse",
			req: new ExpantaNum(COLLAPSE_UNL).times(tmp.collapse ? tmp.collapse.lrm : 1),
			res: "distance",
			display: formatDistance,
			reached: function() { return player.collapse.unl },
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
			reached: function() { return player.pathogens.unl },
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
			reached: function() { return player.dc.unl },
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
			reached: function() { return player.inf.unl },
			progress: function () {
				return player.distance.max(1).log10().div(new ExpantaNum(INF_UNL).log10());
			}
		}),
		ascension: new Feature({
			name: "ascension",
			req: new ExpantaNum(10),
			res: ["inf", "endorsements"],
			display: showNum,
			reached: function() { return player.inf.endorsements.gte(10) },
			progress: function () {
				return player.inf.endorsements.div(10);
			}
		}),
		stadium: new Feature({
			name: "stadium",
			req: new ExpantaNum(15),
			res: ["inf", "endorsements"],
			display: showNum,
			reached: function() { return player.inf.endorsements.gte(15) },
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
			reached: function() { return player.inf.endorsements.gte(21) },
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
			reached: function() { return player.inf.derivatives.unl },
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
			reached: function() { return player.elementary.times.gt(0) },
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
			reached: function() { return player.elementary.theory.unl },
			progress: function () {
				return player.distance.plus(1).logBase(THEORY_REQ[0]).min(1).times(player.bestEP.div(THEORY_REQ[1]).min(1))
			},
			spec: [false, false],
		}),
	};
}

function updateTempSpecial() {
	if (!tmp.features) loadTempFeatures();
	
	// Next Feature
	tmp.nf = "none";
	for (let i = 0; i < Object.keys(tmp.features).length; i++) {
		let feature = Object.values(tmp.features)[i];
		if (!(feature.name=="theory"&&player.elementary.theory.unl)) if (!feature.reached) {
			tmp.nf = feature.name;
			break;
		}
	}
	
	// Achievements
	if (!tmp.ach) {
		tmp.ach = {};
		for (let r = 1; r <= ACH_DATA.rows; r++) {
			for (let c = 1; c <= ACH_DATA.cols; c++) {
				let id = r * 10 + c;
				tmp.ach[id] = new Achievement(id);
			}
		}
	}
	if (tmp.selAch === undefined || player.tab !== "achievements") tmp.selAch = 0;
	tmp.ga = player.achievements.length;
	tmp.ta = getAllAchievements().length;
}

function updateLayerMults() {
	tmp.lm = {};
	tmp.lm.rockets = getRocketGainMult();
	tmp.lm.collapse = getCadaverGainMult();
}

function updateTempSC() {
	tmp.sc = {};
	tmp.sc.rocketEff = getRocketEffect().gte(getRocketEffectSoftcapStart());
	tmp.sc.timeCubeEff = player.tr.cubes.gte(tmp.tr.esc);
	tmp.sc.cadaverGain = tmp.collapse.layer.gain.gte(tmp.collapse.sc);
	tmp.sc.cadaverEff = getCadaverEff().gte(getCadaverEffSoftcapStart());
	tmp.sc.pthGain = tmp.pathogens.baseGain.gte(tmp.pathogens.st);
}
