function updateTempSpecial() {
	// Features
	
	tmp.features = {
		rockets: new Feature({name: "rockets", req: ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm), res: "distance", display: formatDistance, reached: player.rockets.gt(0)||player.rf.gt(0)}),
		automation: new Feature({name: "automation", req: ExpantaNum.mul(AUTO_UNL, (tmp.auto?tmp.auto.lrm:10)), res: "distance", display: formatDistance, reached: player.automation.unl}),
		"time reversal": new Feature({name: "time reversal", req: new ExpantaNum(DISTANCES.ly), res: "distance", display: formatDistance, reached: player.tr.unl}),
		"collapse": new Feature({name: "collapse", req: new ExpantaNum(COLLAPSE_UNL).times(tmp.collapse?tmp.collapse.lrm:1), res: "distance", display: formatDistance, reached: player.collapse.unl}),
		pathogens: new Feature({name: "pathogens", req: new ExpantaNum(PATHOGENS_UNL).times(tmp.pathogens?tmp.pathogens.lrm:1), res: ["collapse", "cadavers"], display: showNum, reached: player.pathogens.unl}),
		dc: new Feature({name: "dc", req: new ExpantaNum(DC_UNL), res: "distance", display: formatDistance, reached: player.dc.unl, displayName: "dark circles"}),
		infinity: new Feature({name: "infinity", req: new ExpantaNum(INF_UNL), res: "distance", display: formatDistance, reached: player.inf.unl}),
		ascension: new Feature({name: "ascension", req: new ExpantaNum(10), res: ["inf", "endorsements"], display: showNum, reached: player.inf.endorsements.gte(10)}),
		stadium: new Feature({name: "stadium", req: new ExpantaNum(15), res: ["inf", "endorsements"], display: showNum, reached: player.inf.endorsements.gte(15), displayName: "the stadium"}),
		pantheon: new Feature({name: "pantheon", req: new ExpantaNum(21), res: ["inf", "endorsements"], display: showNum, reached: player.inf.endorsements.gte(21), displayName: "the pantheon"}),
	}
	tmp.nf = "none"
	for (let i=0;i<Object.keys(tmp.features).length;i++) {
		let feature = Object.values(tmp.features)[i]
		if (!feature.reached) {
			tmp.nf = feature.name
			break;
		}
	}
	
	// Achievements
	
	tmp.ach = {}
	for (let r=1;r<=ACH_DATA.rows;r++) {
		for (let c=1;c<=ACH_DATA.cols;c++) {
			let id = r*10+c
			tmp.ach[id] = new Achievement({name: id, has: player.achievements.includes(id)})
		}
	}
	if (tmp.selAch===undefined||player.tab!=="achievements") tmp.selAch = 0
	tmp.ga = player.achievements.length
	tmp.ta = getAllAchievements().length
}

function updateLayerMults() {
	tmp.lm = {}
	tmp.lm.rockets = new ExpantaNum(1)
	if (tmp.ach[34].has) tmp.lm.rockets = tmp.lm.rockets.times(1.1)
	if (tmp.ach[15].has) tmp.lm.rockets = tmp.lm.rockets.times(1.05)
	if (tmp.ach[26].has) tmp.lm.rockets = tmp.lm.rockets.times(1.1)
	if (tmp.ach[44].has) tmp.lm.rockets = tmp.lm.rockets.times(1.15)
	if (player.rank.gt(100)) tmp.lm.rockets = tmp.lm.rockets.times(2)
	if (player.tr.upgrades.includes(10)) tmp.lm.rockets = tmp.lm.rockets.times(tmp.tr10)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(6)) tmp.lm.rockets = tmp.lm.rockets.times(10)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(8)) tmp.lm.rockets = tmp.lm.rockets.times(tmp.ucme8)
	if (tmp.pathogens && player.pathogens.unl) tmp.lm.rockets = tmp.lm.rockets.times(tmp.pathogens[2].eff)
	if (tmp.dc) if (player.dc.unl) tmp.lm.rockets = tmp.lm.rockets.times(tmp.dc.dmEff)
	if (tmp.inf) if (tmp.inf.upgs.has("1;2")) tmp.lm.rockets = tmp.lm.rockets.times(INF_UPGS.effects["1;2"]())
	if (tmp.inf) if (tmp.inf.upgs.has("4;8")) tmp.lm.rockets = tmp.lm.rockets.times(player.collapse.lifeEssence.max(1))
	tmp.lm.collapse = new ExpantaNum(1)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(5)) tmp.lm.collapse = tmp.lm.collapse.times(tmp.ucme5)
	if (tmp.collapse) if (tmp.collapse.hasMilestone(10)) tmp.lm.collapse = tmp.lm.collapse.times(tmp.ucme10)
	if (tmp.ach[38].has) tmp.lm.collapse = tmp.lm.collapse.times(2)
	if (tmp.ach[65].has) tmp.lm.collapse = tmp.lm.collapse.times(1.4)
	if (player.tr.upgrades.includes(14)) tmp.lm.collapse = tmp.lm.collapse.times(tmp.tr14["cd"])
	if (tmp.inf) if (tmp.inf.upgs.has("3;2")) tmp.lm.collapse = tmp.lm.collapse.times(INF_UPGS.effects["3;2"]()["cadavers"])
	if (tmp.collapse) if (tmp.modes.hard.active && (tmp.collapse.layer.gain.gte(10)||(tmp.clghm&&tmp.collapse.layer.gain.gte(5)))) {
		tmp.lm.collapse = tmp.lm.collapse.div(2)
		tmp.clghm = true
	}
}

function updateTempSC() {
	tmp.sc = {}
	tmp.sc.rocketGain = tmp.rockets.layer.gain.gte(tmp.rockets.sc)
	tmp.sc.rocketEff = tmp.rockets.eff.gte(tmp.rockets.esc)
	tmp.sc.timeCubeEff = player.tr.cubes.gte(tmp.tr.esc)
	tmp.sc.cadaverGain = tmp.collapse.layer.gain.gte(tmp.collapse.sc)
	tmp.sc.cadaverEff = tmp.collapse.eff.gte(tmp.collapse.esc)
	tmp.sc.pthGain = tmp.pathogens.baseGain.gte(tmp.pathogens.st)
}