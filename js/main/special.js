function loadTempFeatures() {
	tmp.features = {
		rockets: new Feature({
			name: "rockets",
			req: function() { return ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm) },
			res: "distance",
			display: formatDistance,
			reached: function() { return player.rockets.gt(0) || player.rf.gt(0) },
			progress: function () {
				if (player.options.featPerc=="logarithm") {
					return player.distance
						.max(1)
						.log10()
						.div(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm).log10());
				} else return player.distance.div(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm))
			}
		}),
		automation: new Feature({
			name: "automation",
			req: function() { return ExpantaNum.mul(AUTO_UNL, tmp.auto ? tmp.auto.lrm : 10) },
			res: "distance",
			display: formatDistance,
			reached: function() { return player.automation.unl },
			progress: function () {
				if (player.options.featPerc=="logarithm") {
					return player.distance
						.max(1)
						.log10()
						.div(ExpantaNum.mul(AUTO_UNL, tmp.auto ? tmp.auto.lrm : 10).log10());
				} else return player.distance.div(ExpantaNum.mul(AUTO_UNL, tmp.auto ? tmp.auto.lrm : 10))
			}
		}),
		"time reversal": new Feature({
			name: "time reversal",
			req: function() { return new ExpantaNum(DISTANCES.ly) },
			res: "distance",
			display: formatDistance,
			reached: function() { return player.tr.unl },
			progress: function () {
				if (player.options.featPerc=="logarithm") {
					return player.distance.max(1).log10().div(new ExpantaNum(DISTANCES.ly).log10());
				} else return ExpantaNum.div(DISTANCES.ly, player.distance).pow(-1)
			}
		}),
		collapse: new Feature({
			name: "collapse",
			req: function() { return new ExpantaNum(COLLAPSE_UNL).times(tmp.collapse ? tmp.collapse.lrm : 1) },
			res: "distance",
			display: formatDistance,
			reached: function() { return player.collapse.unl },
			progress: function () {
				if (player.options.featPerc=="logarithm") {
					return player.distance
						.max(1)
						.log10()
						.div(new ExpantaNum(COLLAPSE_UNL).times(tmp.collapse ? tmp.collapse.lrm : 1).log10());
				} else return player.distance.div(new ExpantaNum(COLLAPSE_UNL).times(tmp.collapse ? tmp.collapse.lrm : 1))
			}
		}),
		pathogens: new Feature({
			name: "pathogens",
			req: function() { return new ExpantaNum(PATHOGENS_UNL).times(tmp.pathogens ? tmp.pathogens.lrm : 1) },
			res: ["collapse", "cadavers"],
			display: showNum,
			reached: function() { return player.pathogens.unl },
			progress: function () {
				if (player.options.featPerc=="logarithm") {
					return player.collapse.cadavers
						.max(1)
						.log10()
						.div(new ExpantaNum(PATHOGENS_UNL).times(tmp.pathogens ? tmp.pathogens.lrm : 1).log10().max(1));
				} else return player.collapse.cadavers.div(new ExpantaNum(PATHOGENS_UNL).times(tmp.pathogens ? tmp.pathogens.lrm : 1))
			}
		}),
		dc: new Feature({
			name: "dc",
			req: function() { return new ExpantaNum(DC_UNL).mul(tmp.dc ? tmp.dc.lrm : 1) },
			res: "distance",
			display: formatDistance,
			reached: function() { return player.dc.unl },
			displayName: "dark circles",
			progress: function () {
				if (player.options.featPerc=="logarithm") {
					return player.distance
						.max(1)
						.log10()
						.div(new ExpantaNum(DC_UNL).mul(tmp.dc ? tmp.dc.lrm : 1).log10());
				} else return player.distance.div(new ExpantaNum(DC_UNL).mul(tmp.dc ? tmp.dc.lrm : 1))
			}
		}),
		infinity: new Feature({
			name: "infinity",
			req: function() { return new ExpantaNum(INF_UNL) },
			res: "distance",
			display: formatDistance,
			reached: function() { return player.inf.unl },
			progress: function () {
				if (player.options.featPerc=="logarithm") return player.distance.max(1).log10().div(new ExpantaNum(INF_UNL).log10());
				else return player.distance.div(INF_UNL)
			}
		}),
		ascension: new Feature({
			name: "ascension",
			req: function() { return new ExpantaNum(10) },
			res: ["inf", "endorsements"],
			display: showNum,
			reached: function() { return player.inf.endorsements.gte(10) },
			progress: function () {
				return player.inf.endorsements.div(10);
			}
		}),
		stadium: new Feature({
			name: "stadium",
			req: function() { return new ExpantaNum(15) },
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
			req: function() { return new ExpantaNum(21) },
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
			req: function() { return ExpantaNum.mul(DISTANCES.uni, "1e90000") },
			res: "distance",
			display: formatDistance,
			reached: function() { return player.inf.derivatives.unl },
			progress: function () {
				if (player.options.featPerc=="logarithm") return player.distance.max(1).log10().div(ExpantaNum.mul(DISTANCES.uni, "1e90000").log10());
				else return player.distance.div(ExpantaNum.mul(DISTANCES.uni, "1e90000"))
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
			reached: function() { return false },
			progress: function () {
				if (player.options.featPerc=="logarithm") {
					return player.rockets
						.max(1)
						.log10()
						.div(LAYER_REQS.elementary[0][1].log10())
						.min(1)
						.times(player.collapse.cadavers.max(1).log10().div(LAYER_REQS.elementary[1][1].log10()).min(1))
						.times(player.inf.endorsements.div(LAYER_REQS.elementary[2][1]).min(1));
				} else {
					return player.rockets
						.div(LAYER_REQS.elementary[0][1])
						.min(1)
						.times(player.collapse.cadavers.div(LAYER_REQS.elementary[1][1]).min(1))
						.times(player.inf.endorsements.div(LAYER_REQS.elementary[2][1]).min(1));
				}
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
				return ((player.options.featPerc=="logarithm")?player.distance.plus(1).logBase(THEORY_REQ[0]):player.distance.div(THEORY_REQ[0])).min(1).times(((player.options.featPerc=="logarithm")?player.bestEP.plus(1).logBase(THEORY_REQ[1]):player.bestEP.div(THEORY_REQ[1])).min(1))
			},
			spec: [false, false],
		}),
		"hadronic challenge": new Feature({
			name: "hadronic challenge",
			res_amt: 2,
			req: [
				new ExpantaNum(HC_REQ[0]),
				new ExpantaNum(HC_REQ[1]),
			],
			res: ["distance", ["inf", "endorsements"]],
			display: [formatDistance, showNum],
			reached: function() { return player.elementary.hc.unl },
			progress: function () {
				if (player.options.featPerc=="logarithm") return player.distance.plus(1).logBase(HC_REQ[0]).min(1).times(player.inf.endorsements.div(HC_REQ[1]).min(1))
				else return player.distance.div(HC_REQ[0]).min(1).times(player.inf.endorsements.div(HC_REQ[1]).min(1))
			},
			spec: [false, true],
		}),
		"quantum foam": new Feature({
			name: "quantum foam",
			req: function() { return new ExpantaNum(FOAM_REQ) },
			res: "distance",
			display: formatDistance,
			reached: function() { return player.elementary.foam.unl },
			progress: function () {
				if (player.options.featPerc=="logarithm") return player.distance.max(1).log10().div(ExpantaNum.mul(DISTANCES.uni, FOAM_REQ).log10());
				else return player.distance.div(ExpantaNum.mul(DISTANCES.uni, FOAM_REQ))
			}
		}),
		skyrmions: new Feature({
			name: "skyrmions",
			res_amt: 3,
			req: [
				new ExpantaNum(getSkyReqData(0)),
				new ExpantaNum(getSkyReqData(1)),
				new ExpantaNum(getSkyReqData(2))
			],
			res: ["distance", function() { return player.elementary.fermions.quarks.amount }, function() { return player.elementary.fermions.leptons.amount }],
			resName: ["distance", "quarks", "leptons"],
			display: [formatDistance, showNum, showNum],
			reached: function() { return false },
			progress: function () {
				if (player.options.featPerc=="logarithm") {
					return player.distance
						.max(1)
						.log10()
						.div(new ExpantaNum(getSkyReqData(0)).log10())
						.min(1)
						.times(player.elementary.fermions.quarks.amount.max(1).log10().div(new ExpantaNum(getSkyReqData(1)).log10()).min(1))
						.times(player.elementary.fermions.leptons.amount.max(1).log10().div(new ExpantaNum(getSkyReqData(2)).log10()).min(1));
				} else {
					return player.distance
						.div(getSkyReqData(0))
						.min(1)
						.times(player.elementary.fermions.quarks.amount.div(getSkyReqData(1)).min(1))
						.times(player.elementary.fermions.leptons.amount.div(getSkyReqData(2)).min(1));
				}
			},
			spec: [false, true, true],
			superSpec: [false, true, true],
		}),
		multiverse: new Feature({
			name: "multiverse",
			req: function() { return new ExpantaNum(DISTANCES.mlt) },
			res: "distance",
			display: formatDistance,
			reached: function() { return false },
			progress: function() {
				if (player.options.featPerc=="logarithm") {
					return player.distance.max(1).log10().div(ExpantaNum.log10(DISTANCES.mlt)).min(1);
				} else {
					return player.distance.div(DISTANCES.mlt).min(1);
				}
			},
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
			if (mltActive(1) && (feature.name=="theory"||feature.name=="hadronic challenge"||feature.name=="quantum foam"||feature.name=="skyrmions")) continue;
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
	
	// Misc
	if (tmp.nf=="skyrmions") {
		tmp.features.skyrmions.req = [
			new ExpantaNum(getSkyReqData(0)),
			new ExpantaNum(getSkyReqData(1)),
			new ExpantaNum(getSkyReqData(2))
		]
	}
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
