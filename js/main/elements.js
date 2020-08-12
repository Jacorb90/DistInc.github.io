function updateHTML() {
	// Options
	if (player.tab == "options") {
		for (let i = 0; i < Object.keys(MODES).length; i++) {
			tmp.el[Object.keys(MODES)[i] + "Mode"].setClasses({
				btn: true,
				tb: true,
				opt: !modesSelected.includes(Object.keys(MODES)[i]),
				ob: true,
				optSelected: modesSelected.includes(Object.keys(MODES)[i])
			});
			tmp.el[Object.keys(MODES)[i] + "Mode"].setTooltip(MODES[Object.keys(MODES)[i]].desc)
		}
		tmp.el.sf.setTxt("Significant Figures: " + player.options.sf.toString());
		tmp.el.not.setTxt("Notation: " + capitalFirst(player.options.not));
		tmp.el.theme.setTxt("Theme: " + capitalFirst(player.options.theme));
		tmp.el.autoSave.setTxt("Auto-Save: " + (player.options.autoSave ? "ON" : "OFF"));
		tmp.el.newst.setTxt("News Ticker: " + (player.options.newst ? "ON" : "OFF"));
		tmp.el.elc.changeStyle("visibility", (player.elementary.times.gt(0)?"visible":"hidden"))
		tmp.el.elc.setTxt("Elementary Confirmation: "+ (player.options.elc ? "ON" : "OFF"));
		tmp.el.saveImp.setTxt("Imports: "+ capitalFirst(player.options.saveImp));
		tmp.el.hot.setTxt("Hotkeys: "+(player.options.hot?"ON":"OFF"))
		tmp.el.dcPulse.changeStyle("visibility", ((player.dc.unl||player.inf.endorsements.gt(0)||player.elementary.times.gt(0))?"visible":"hidden"))
		tmp.el.dcPulse.setTxt("Dark Circle Pulsing: "+(player.options.dcPulse ? "ON" : "OFF"));
		tmp.el.featPerc.setTxt("Feature Percentage: "+capitalFirst(player.options.featPerc))
		tmp.el.fonts.setTxt("Font: "+capitalFirst(player.options.fonts))
		tmp.el.hideAch.setTxt("Hide Completed Ach Rows: "+(player.options.hideAch ? "ON" : "OFF"))
		tmp.el.visUpd.setTxt("Visual Updates: "+capitalFirst(player.options.visUpd))
		tmp.el.hcc.setTxt("Exit Hadronic Chall Confirmation: "+(player.options.hcc ? "ON" : "OFF"))
		tmp.el.hcc.changeStyle("visibility", (player.elementary.hc.unl)?"visible":"hidden")
	}

	// Main
	if (player.tab == "main") {
		// Pre-Ranks
		tmp.el.distance.setTxt(
			formatDistance(player.distance) +
				" (+" +
				formatDistance(
					adjustGen(player.velocity, "dist").times(nerfActive("noTS") ? 1 : tmp.timeSpeed)
				) +
				"/sec)"
		);
		tmp.el.velocity.setTxt(
			formatDistance(player.velocity) +
				"/s (+" +
				formatDistance(adjustGen(tmp.acc, "vel").times(nerfActive("noTS") ? 1 : tmp.timeSpeed)) +
				"/sec)"
		);
		tmp.el.maxVel.setTxt(formatDistance(tmp.maxVel));
		tmp.el.acceleration.setTxt(formatDistance(tmp.acc));

		// Ranks
		tmp.el.rank.setTxt(showNum(player.rank));
		tmp.el.rankUp.setClasses({ btn: true, locked: !tmp.ranks.canRankUp });
		tmp.el.rankDesc.setTxt(tmp.ranks.desc);
		tmp.el.rankReq.setTxt(formatDistance(tmp.ranks.req));
		tmp.el.rankName.setTxt(getScalingName("rank") + "Rank");

		// Tiers
		tmp.el.tier.setTxt(showNum(player.tier));
		tmp.el.tierUp.setClasses({ btn: true, locked: !tmp.tiers.canTierUp });
		tmp.el.tierDesc.setTxt(tmp.tiers.desc);
		tmp.el.tierReq.setTxt(showNum(tmp.tiers.req.ceil()));
		tmp.el.tierName.setTxt(getScalingName("tier") + "Tier");
		
		// Misc
		tmp.el.mvName.setTxt(nerfActive("maxVelActive") ? "Maximum Velocity:" : "Velocital Energy:");
		tmp.el.accEn.setHTML(tmp.accEn.gt(0) ? " (Accelerational Energy: " + formatDistance(tmp.accEn) + "/s<sup>2</sup>)" : "");
	}

	// Rockets
	if (player.tab == "rockets") {
		// Rockets
		tmp.el.rocketReset.setClasses({ btn: true, locked: !tmp.rockets.canRocket, rckt: tmp.rockets.canRocket });
		tmp.el.rocketGain.setTxt(showNum(tmp.rockets.layer.gain));
		tmp.el.rocketsAmt.setTxt(
			showNum(player.rockets) +
				" rockets" +
				(tmp.ach[95].has && !nerfActive("noRockets")
					? " (+" + showNum(tmp.rockets.layer.gain) + "/sec)"
					: hasCollapseMilestone(9) && !nerfActive("noRockets")
					? " (+" + showNum(tmp.rockets.layer.gain.div(100)) + "/sec)"
					: "")
		);
		tmp.el.rocketsEff.setTxt(showNum(getRocketEffect()));

		// Rocket Fuel
		tmp.el.rf.setTxt(showNum(player.rf) + (getFreeFuel().gt(0) ? " + " + showNum(getFreeFuel()) : ""));
		tmp.el.rfReset.setClasses({ btn: true, locked: !tmp.rf.can, rckt: tmp.rf.can });
		tmp.el.rfReq.setTxt(showNum(tmp.rf.req));
		tmp.el.rfEff.setTxt(showNum(getFuelEff().sub(1).times(100)));
		tmp.el.rfName.setTxt(getScalingName("rf") + "Rocket Fuel");
		tmp.el.rf2.setTxt(showNum(getFuelEff2()));
	}

	// Features
	tmp.el.nextFeature.setTxt(tmp.nf === "none" ? "All Features Unlocked!" : tmp.features[tmp.nf].desc);

	// Achievements
	if (player.tab == "achievements") {
		tmp.el.achDesc.setHTML(tmp.ga + "/" + tmp.ta + "<br>");
		let all = tmp.ga == tmp.ta && !modeActive("aau");
		let rowsActive = Math.floor(tmp.ta/8)
		for (let r = 1; r <= ACH_DATA.rows; r++) {
			let rc = rowComplete(r)
			tmp.el["achR"+r].setDisplay(!(player.options.hideAch&&rc))
			if (rc && player.options.hideAch) rowsActive--
			for (let c = 1; c <= ACH_DATA.cols; c++) {
				let id = r * 10 + c;
				tmp.el["ach" + id].setTxt(id);
				tmp.el["ach" + id].setClasses({
					achCont: true,
					gld: all,
					dgn: player.achievements.includes(id) && ACH_DATA.descs[id] !== undefined && !all,
					blocked: ACH_DATA.descs[id] === undefined
				});
				tmp.el["ach" + id].changeStyle("visibility", (getAllAchievements().includes(id)) ? "visible" : "hidden");
				tmp.el["ach" + id].setAttr("widetooltip", tmp.ach[id].desc)
			}
		}
		tmp.el.achFin.setTxt(rowsActive==0?"All Achievements are completed!":"")
	}

	// Automation
	if (player.tab == "auto") {
		// Robots
		tmp.el.scraps.setTxt(
			showNum(player.automation.scraps) +
				" scraps" +
				(" (+" +
					showNum(
						adjustGen(getScrapGain(), "scraps").times(nerfActive("noTS") ? 1 : tmp.timeSpeed)
					) +
					"/sec)")
		);
		tmp.el.intAmt.setTxt(
			showNum(player.automation.intelligence) +
				" intelligence" +
				(" (+" +
					showNum(
						adjustGen(getIntelligenceGain(), "intel").times(nerfActive("noTS") ? 1 : tmp.timeSpeed)
					) +
					"/sec)")
		);
		for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++) {
			tmp.el[Object.keys(ROBOT_REQS)[i]].setTxt(tmp.auto[Object.keys(ROBOT_REQS)[i]].btnTxt);
			tmp.el[Object.keys(ROBOT_REQS)[i]].setClasses({
				btn: true,
				locked:
					player.automation.scraps.lt(Object.values(ROBOT_REQS)[i]) &&
					!Object.keys(player.automation.robots).includes(Object.keys(ROBOT_REQS)[i]),
				rckt: !(
					player.automation.scraps.lt(Object.values(ROBOT_REQS)[i]) &&
					!Object.keys(player.automation.robots).includes(Object.keys(ROBOT_REQS)[i])
				)
			});
		}
		tmp.el.rankCheapbot.setDisplay(modeActive("extreme"));
		tmp.el.fuelbot.setDisplay(
			hasCollapseMilestone(5) ||
				(player.automation.robots.fuelbot ? player.automation.robots.fuelbot[1].gt(0) : false)
		);
		tmp.el.robotTab.setDisplay(player.automation.open != "none");
		tmp.el.robotName.setTxt(
			capitalFirst(player.automation.open == "rankCheapbot" ? "Rank Cheapener-bot" : player.automation.open)
		);
		tmp.el.robotInterval.setTxt(
			player.automation.open == "none" ? "" : formatTime(tmp.auto[player.automation.open].interval)
		);
		tmp.el.robotMagnitude.setTxt(
			player.automation.open == "none" ? "" : showNum(tmp.auto[player.automation.open].magnitude)
		);
		tmp.el.buyRobotInterval.setHTML(
			player.automation.open == "none"
				? ""
				: "Upgrade Interval<br>Cost: " + showNum(tmp.auto[player.automation.open].intCost) + " intelligence."
		);
		tmp.el.buyRobotMagnitude.setHTML(
			player.automation.open == "none"
				? ""
				: "Upgrade Magnitude<br>Cost: " + showNum(tmp.auto[player.automation.open].magCost) + " intelligence."
		);
		if (player.automation.open != "none") {
			tmp.el.buyRobotInterval.setClasses({
				btn: true,
				locked: player.automation.intelligence.lt(tmp.auto[player.automation.open].intCost),
				rckt: player.automation.intelligence.gte(tmp.auto[player.automation.open].intCost)
			});
			tmp.el.buyRobotMagnitude.setClasses({
				btn: true,
				locked: player.automation.intelligence.lt(tmp.auto[player.automation.open].magCost),
				rckt: player.automation.intelligence.gte(tmp.auto[player.automation.open].magCost)
			});
			tmp.el.robotToggle.setTxt("Currently: "+((!player.automation.robots[player.automation.open][2])?"Active":"Inactive"))
		}
		tmp.el.robotMax.setDisplay(tmp.ach[48].has);

		// Automators
		for (let i = 0; i < Object.keys(AUTOMATORS).length; i++) {
			tmp.el["automatorDiv-" + Object.keys(AUTOMATORS)[i]].setDisplay(Object.values(AUTOMATORS)[i]());
			player.automators[Object.keys(AUTOMATORS)[i]] =
				tmp.el["automator-" + Object.keys(AUTOMATORS)[i]].isChecked() && Object.values(AUTOMATORS)[i]();
			let name = Object.keys(AUTOMATORS)[i]
		}
	}

	// Time Reversal
	if (player.tab == "tr") {
		tmp.el.rt.setTxt(tmp.tr.txt);
		tmp.el.tc.setTxt(
			showNum(player.tr.cubes) +
				" Time Cubes" +
				(" (+" +
					showNum(adjustGen(getTimeCubeGain(), "tc").times(nerfActive("noTS") ? 1 : tmp.timeSpeed)) +
					"/sec)")
		);
		tmp.el.frf.setTxt(showNum(tmp.tr.eff));
		for (let i = 1; i <= TR_UPG_AMT; i++) {
			let upg = TR_UPGS[i];
			let desc = upg.desc;
			if (!tr2Pow().eq(1) && i == 2) desc += "<span class='grossminitxt'>(^" + showNum(tr2Pow()) + ")</span>";
			if (!tr11Pow().eq(1) && i == 11)
				desc += "<span class='grossminitxt'>(^" + showNum(tr11Pow()) + ")</span>";
			tmp.el["tr" + i].setHTML(desc + "<br>Cost: " + showNum(upg.cost) + " Time Cubes.");
			if (upg.current !== undefined && (i > 15 ? modeActive("extreme") : true))
				tmp.el["tr" + i].setTooltip("Currently: " + upg.disp(upg.current()));
			tmp.el["tr" + i].setClasses({
				btn: true,
				locked: !player.tr.upgrades.includes(i) && player.tr.cubes.lt(upg.cost),
				bought: player.tr.upgrades.includes(i),
				rt: !player.tr.upgrades.includes(i) && player.tr.cubes.gte(upg.cost)
			});
		}
		tmp.el.trRow3.setDisplay(player.dc.unl || tmp.inf.upgs.has("1;4"));
		tmp.el.trRow4.setDisplay(modeActive("extreme"));
		tmp.el.trRow5.setDisplay(modeActive("extreme") && player.collapse.unl);
		tmp.el.trRow6.setDisplay(modeActive("extreme") && player.dc.unl);
		tmp.el.trRow7.setDisplay(modeActive("extreme") && player.inf.endorsements.gt(0))
	}

	// Universal Collapse
	if (player.tab == "collapse") {
		tmp.el.collapseReset.setClasses({ btn: true, locked: !tmp.collapse.can, btndd: tmp.collapse.can });
		tmp.el.cadaverGain.setTxt(showNum(tmp.collapse.layer.gain));
		tmp.el.cadavers.setHTML(
			"<span class='dead'>" +
				showNum(player.collapse.cadavers) +
				"</span> cadavers<span class='dead'>" +
				(tmp.ach[96].has && !nerfActive("noCadavers")
					? " (+" + showNum(tmp.collapse.layer.gain) + "/sec)"
					: tmp.inf.upgs.has("2;4") && !nerfActive("noCadavers")
					? " (+" + showNum(tmp.collapse.layer.gain.div(100)) + "/sec)"
					: "") +
				"</span>"
		);
		tmp.el.cadaverEff.setTxt(showNum(getCadaverEff()));
		tmp.el.sacrificeCadavers.setClasses({
			btn: true,
			locked: player.collapse.cadavers.eq(0),
			btndd: player.collapse.cadavers.gt(0)
		});
		tmp.el.lifeEssence.setHTML(
			"<span class='alive'>" +
				showNum(player.collapse.lifeEssence) +
				"</span> life essence<span class='alive'>" +
				(tmp.ach[97].has && !nerfActive("noLifeEssence")
					? " (+" + showNum(player.collapse.cadavers.times(tmp.collapse.sacEff).max(1)) + "/sec)"
					: tmp.inf.upgs.has("5;3") && !nerfActive("noLifeEssence")
					? " (+" + showNum(player.collapse.cadavers.times(tmp.collapse.sacEff).max(1).div(10)) + "/sec)"
					: "")
		);
		for (let i = 1; i <= EM_AMT; i++) {
			let ms = ESSENCE_MILESTONES[i];
			tmp.el["lem" + i].setHTML(ms.desc + "<br>Req: " + showNum(ms.req) + " Life Essence.");
			if (ms.disp !== undefined) tmp.el["lem" + i].setTooltip("Currently: " + ms.disp());
			tmp.el["lem" + i].setClasses({ msCont: true, r: !hasCollapseMilestone(i) });
		}
	}

	// Pathogens
	if (player.tab == "pathogens") {
		tmp.el.pathogensAmt.setHTML(
			"<span class='grosstxt'>" +
				showNum(player.pathogens.amount) +
				"</span> Pathogens<span class='grosstxt'>" +
				(" (+" + showNum(adjustGen(tmp.pathogens.gain, "pathogens")) + "/sec)") +
				"</span>"
		);
		for (let i = 1; i <= PTH_AMT; i++) {
			let hidden = PTH_UPGS[i].unl ? !PTH_UPGS[i].unl() : false;
			tmp.el["pth" + i].setDisplay(!hidden);
			tmp.el["pth" + i].setClasses({
				btn: true,
				locked: player.pathogens.amount.lt(tmp.pathogens[i].cost),
				gross: player.pathogens.amount.gte(tmp.pathogens[i].cost)
			});
			tmp.el["pth" + i].setHTML(
				PTH_UPGS[i].desc +
					"<br>" +
					getScalingName("pathogenUpg", i) +
					"Level: " +
					showNum(player.pathogens.upgrades[i]) +
					(tmp.pathogens.extra(i).gt(0) ? " + " + showNum(tmp.pathogens.extra(i)) : "") +
					"<br>Currently: " +
					tmp.pathogens.disp(i) +
					(player.pathogens.upgrades[i].gte(getPathogenUpgSoftcapStart(i))
						? "<span class='sc'>(softcapped)</span>"
						: "") +
					"<br>Cost: " +
					showNum(tmp.pathogens[i].cost) +
					" Pathogens."
			);
		}
		tmp.el.pthUpgPow.setHTML(
			!tmp.pathogens.upgPow.eq(1) ? ("Upgrade Power: " + showNum(tmp.pathogens.upgPow.times(100)) + "%"+(tmp.pathogens.upgPow.gte(10)?" <span class='sc'>(softcapped)</span>":"")+"<br>") : ""
		);
		
		tmp.el.tdeEff.setHTML(
			tmp.ach[63].has
				? "Time Doesn't Exist multiplier: " +
					showNum(ach63Eff()) +
					"x " +
					(ach63Eff().gte(ach63SC()) ? "<span class='sc'>(softcapped)</span>" : "") +
					"<br><br>"
				: ""
		);
	}

	// Softcaps
	for (let i = 0; i < Object.keys(tmp.sc).length; i++) {
		let name = Object.keys(tmp.sc)[i];
		let reached = Object.values(tmp.sc)[i];
		tmp.el[name + "SC"].setTxt(reached ? "(softcapped)" : "");
		tmp.el[name + "SC"].setClasses({ sc: true });
	}

	// The Dark Circle
	if (player.tab == "dc") {
		tmp.el.darkMatter.setHTML(
			"Dark Matter<br>Amount: " +
				showNum(player.dc.matter) +
				"<br>Gain: +" +
				showNum(adjustGen(tmp.dc.dmGain, "dc").times(tmp.dc.flow)) +
				"/s<br>Effect: You gain " +
				showNum(tmp.dc.dmEff) +
				"x as many Rockets."
		);
		tmp.el.darkEnergy.setHTML(
			"Dark Energy<br>Amount: " +
				showNum(player.dc.energy) +
				"<br>Gain: +" +
				showNum(adjustGen(tmp.dc.deGain, "dc").times(tmp.dc.flow)) +
				"/s<br>Effect: You gain " +
				showNum(tmp.dc.deEff) +
				"x as many Time Cubes."
		);
		tmp.el.darkFluid.setHTML(
			"Dark Fluid<br>Amount: " +
				showNum(player.dc.fluid) +
				"<br>Gain: +" +
				showNum(adjustGen(tmp.dc.dfGain, "dc").times(tmp.dc.flow)) +
				"/s<br>Effect: Scaled Rocket Fuel scaling starts " +
				showNum(tmp.dc.dfEff) +
				" Rocket Fuel later."
		);
		tmp.el.darkCore.setHTML(
			getScalingName("darkCore") +
				"Dark Cores<br>Amount: " +
				showNum(player.dc.cores) +
				"<br>Cost: " +
				showNum(tmp.dc.coreCost) +
				" Cadavers" +
				(tmp.dc.coreEff.gt(0)
					? "<br>Effect: +" + showNum(tmp.dc.coreEff.times(100)) + "% Pathogen Upgrade Power"
					: "")
		);
		tmp.el.darkMatter.setClasses({darkcircle: true, dcAnim: player.options.dcPulse})
		tmp.el.darkEnergy.setClasses({darkcircle: true, dcAnim: player.options.dcPulse})
		tmp.el.darkFluid.setClasses({darkcircle: true, dcAnim: player.options.dcPulse})
		tmp.el.darkCore.setClasses({
			darkcore: true,
			locked: player.collapse.cadavers.lt(tmp.dc.coreCost),
			inactive: tmp.dc.dmGain.eq(0),
			dcAnim: player.options.dcPulse
		});
		tmp.el.arrowToDarkMatter.setHTML(tmp.dc.dmGain.gt(0) ? "&#8593;" : "");
		tmp.el.darkFlow.setTxt(showNum(tmp.dc.flow));
	}

	// Infinity
	if (player.tab == "inf") {
		// Infinity
		tmp.el.endorsementManual.setDisplay(
			player.inf.endorsements.gte(10) && ((tmp.inf.can && !player.automators["endorsements"]) || tmp.inf.stadium.canComplete)
		);
		tmp.el.emInner.setHTML(
			tmp.inf.stadium.canComplete
				? "Complete this Stadium challenge."
				: 'Allow <span class="infinity">Infinity</span> to endorse you.'
		);
		let nextUnl;
		for (let i=0;i<Object.keys(INF_UPGS.dispReqs).length;i++) {
			let key = Object.keys(INF_UPGS.dispReqs)[i]
			if (player.inf.endorsements.lt(INF_UPGS.dispReqs[key])) {
				nextUnl = key
				break;
			}
		}
		tmp.el.nextIUs.setTxt(nextUnl ? ("Next set of Infinity Upgrades at Endorsement "+showNum(INF_UPGS.dispReqs[nextUnl])+".") : "")
		tmp.el.forceInf.setDisplay(player.inf.endorsements.gte(10));
		if (infTab == "infinity") {
			tmp.el.endorsements.setTxt(showNum(player.inf.endorsements));
			tmp.el.knowledgeBase.setTxt(showNum(tmp.inf.knowledgeBase));
			tmp.el.nextEndorsement.setTxt(formatDistance(tmp.inf.req));
			tmp.el.knowledge.setTxt(showNum(player.inf.knowledge));
			tmp.el.knowledgeGain.setTxt(showNum(adjustGen(tmp.inf.knowledgeGain, "knowledge")));
			for (let r = 1; r <= INF_UPGS.rows; r++) {
				for (let c = 1; c <= INF_UPGS.cols; c++) {
					let state = "";
					if (tmp.inf.upgs.repealed(r+";"+c) && !modeActive("easy")) state = "repealed";
					else if (!tmp.inf.upgs.canBuy(r+";"+c)) state = "locked";
					else if (player.inf.upgrades.includes(r+";"+c)) state = "bought";
					else if (player.inf.knowledge.gte(ExpantaNum.mul(INF_UPGS.costs[r+";"+c], tmp.inf.upgCostMult(r+";"+c)))) state = "unbought";
					else state = "locked";
					tmp.el["inf" + (r+";"+c)].setDisplay(tmp.inf.upgs.shown(r+";"+c));
					tmp.el["inf" + (r+";"+c)].setClasses({
						btn: true,
						inf: state == "unbought",
						locked: state == "locked",
						bought: state == "bought",
						repealed: state == "repealed"
					});
				}
			}
			tmp.el.endorsementName.setTxt(getScalingName("endorsements") + " ");
			
			let ach112 = ach112Eff()
			tmp.el.tudeEff.setHTML(
				tmp.ach[112].has ? "The Universe Doesn't Exist multiplier: " + showNum(ach112) + "x"+(ach112.gte(1e160)?" <span class='sc'>(softcapped)</span>":"")+"<br><br>" : ""
			);
		}

		// Ascension
		if (infTab == "ascension") {
			for (let i = 1; i <= 4; i++) {
				tmp.el["perk" + i].setClasses({
					btn: true,
					perk: tmp.inf.asc.perkActive(i),
					inf: !(tmp.inf.asc.perksActive() >= tmp.inf.asc.maxPerks) && !tmp.inf.asc.perkActive(i),
					locked: tmp.inf.asc.perksActive() >= tmp.inf.asc.maxPerks && !tmp.inf.asc.perkActive(i)
				});
				tmp.el["perk" + i].setHTML(
					capitalFirst(PERK_NAMES[i - 1]) +
						" Perk" +
						(tmp.inf.asc.perkActive(i) ? (": " + formatTime(player.inf.ascension.time[i - 1])+(player.automators["perks"]?"":"<br>(click to disable)")) : "")
				);
				tmp.el["perkEff" + i].setTxt(showNum(tmp.inf.asc.perkEff(i)));
				tmp.el["enl" + i].setTxt(showNum(player.inf.ascension.enlightenments[i - 1]));
				tmp.el["enleff" + i].setTxt(showNum(tmp.inf.asc.enlEff(i).times(100)));
				tmp.el["buyEnl" + i].setTxt("Cost: " + showNum(tmp.inf.asc.enlCost(i)) + " Ascension Power");
				tmp.el["buyEnl" + i].setClasses({
					btn: true,
					inf: player.inf.ascension.power.gte(tmp.inf.asc.enlCost(i)),
					locked: player.inf.ascension.power.lt(tmp.inf.asc.enlCost(i))
				});
				let name = getScalingName("enlightenments", i);
				tmp.el["enlScale" + i].setTxt(name == "" ? "" : name + " ");
			}
			tmp.el.perkPower.setTxt("Perk Strength: " + showNum(tmp.inf.asc.perkStrength.times(100)) + "%");
			tmp.el.perkPower.setDisplay(!tmp.inf.asc.perkStrength.eq(1));
			tmp.el.ascPower.setHTML(
				"Ascension Power: <span style='font-size: 25px; color: red;'>" +
					showNum(player.inf.ascension.power) +
					"</span> (+" +
					showNum(adjustGen(tmp.inf.asc.powerGain, "ascension")) +
					"/sec)"
			);
			tmp.el.perkAccel.setHTML(tmp.elm.pa.active?("Your "+(tmp.elm.pa.state==""?"":(capitalFirst(tmp.elm.pa.state)+" "))+"Perk Accelerator is making Perks be used up <span style='font-size: 25px; color: red;'>"+showNum(tmp.elm.pa.speedBoost)+"</span>x as fast, but in return, your Perks are <span style='font-size: 25px; color: red;'>"+showNum(tmp.elm.pa.boost)+"</span>x as strong."):"")
		}

		// The Stadium
		if (infTab == "stadium") {
			for (let i = 0; i < Object.keys(STADIUM_DESCS).length; i++) {
				let name = Object.keys(STADIUM_DESCS)[i];
				tmp.el[name + "Div"].setTooltip(tmp.inf.stadium.tooltip(name));
				tmp.el[name + "Div"].setClasses({
					stadiumChall: true,
					comp: player.inf.stadium.completions.includes(name)
				});
				let active = player.inf.stadium.current == name;
				let trapped = !active && tmp.inf.stadium.active(name) && !modeActive("extreme");
				let comp = player.inf.stadium.completions.includes(name);
				tmp.el[name + "Chall"].setTxt(trapped ? "Trapped" : active ? "Active" : comp ? "Completed" : "Start");
				tmp.el[name + "Chall"].setClasses({
					btn: true,
					bought: trapped || active,
					locked: player.inf.stadium.current != "" && !(trapped || active),
					inf: !(trapped || active || player.inf.stadium.current != "")
				});
				let showCurrent = STADIUM_REWARDS.effects[name] !== undefined;
				tmp.el[name + "Btm"].setHTML(
					"Goal: " +
						formatDistance(tmp.inf.stadium.goal(name)) +
						"<br>Reward: " +
						STADIUM_REWARDS[name] +
						"<br>" +
						(showCurrent ? "Currently: " + STADIUM_REWARDS.disp[name]() : "")
				);
			}
			tmp.el.exitStad.setDisplay(player.inf.stadium.current != "");
			tmp.el.stadiumProg.setTxt(player.inf.stadium.current==""?"":"Progress to Completion: "+showNum(tmp.inf.stadium.progress())+"%")
			tmp.el.extremeStadDesc.setTxt(modeActive("extreme")?" in the same row":"")
			tmp.el.extremeStadium.setDisplay(modeActive("extreme"))
			if (modeActive("extreme")) {
				for (let i=0;i<Object.keys(EXTREME_STADIUM_DATA).length;i++) {
					let name = Object.keys(EXTREME_STADIUM_DATA)[i]
					tmp.el[name+"Div"].setTooltip(extremeStadiumTooltip(name));
					tmp.el[name+"Div"].setClasses({
						stadiumChall: true,
						comp: player.extremeStad.includes(name),
					})
					let active = player.inf.stadium.current == name;
					let trapped = !active && extremeStadiumActive(name);
					let comp = player.extremeStad.includes(name);
					tmp.el[name + "Chall"].setTxt(trapped ? "Trapped" : active ? "Active" : comp ? "Completed" : "Start");
					tmp.el[name + "Chall"].setClasses({
						btn: true,
						bought: trapped || active,
						locked: player.inf.stadium.current != "" && !(trapped || active),
						inf: !(trapped || active || player.inf.stadium.current != "")
					});
					let showCurrent = EXTREME_STADIUM_DATA[name].effect !== undefined;
					tmp.el[name + "Btm"].setHTML(
						"Goal: " +
							formatDistance(extremeStadiumGoal(name)) + // extremeStadiumGoal
							"<br>Reward: " +
							EXTREME_STADIUM_DATA[name].reward +
							"<br>" +
							(showCurrent ? "Currently: " + EXTREME_STADIUM_DATA[name].disp() : "")
					);
				}
			}
			tmp.el.extremeStadReset.setDisplay(modeActive("extreme"));
		}

		// The Pantheon
		if (infTab == "pantheon") {
			tmp.el.spectralGems.setTxt(showNum(player.inf.pantheon.gems));
			tmp.el.nextSpectralGem.setTxt(showNum(tmp.inf.pantheon.next.ceil()));
			let name = getScalingName("spectralGems");
			tmp.el.spectralGemName.setTxt(name == "" ? "" : name + " ");
			tmp.el.respecSpectralGems.setClasses({
				btn: true,
				inf: player.inf.pantheon.angels.plus(player.inf.pantheon.demons).gt(0),
				locked: !player.inf.pantheon.angels.plus(player.inf.pantheon.demons).gt(0)
			});
			tmp.el.angels.setTxt(showNum(player.inf.pantheon.angels));
			tmp.el.demons.setTxt(showNum(player.inf.pantheon.demons));
			tmp.el.transferAngels.setClasses({
				btn: true,
				inf: player.inf.pantheon.gems.gte(1),
				locked: player.inf.pantheon.gems.lt(1)
			});
			tmp.el.transferDemons.setClasses({
				btn: true,
				inf: player.inf.pantheon.gems.gte(1),
				locked: player.inf.pantheon.gems.lt(1)
			});
			tmp.el.chips.setTxt(showNum(player.inf.pantheon.heavenlyChips));
			tmp.el.chipGain.setTxt(
				"(+" + showNum(adjustGen(tmp.inf.pantheon.chipGain, "heavenlyChips")) + "/sec)"
			);
			tmp.el.chipBoost.setTxt(showNum(tmp.inf.pantheon.chipBoost.sub(1).times(100)));
			tmp.el.soulNerf.setTxt(showNum(player.inf.pantheon.demonicSouls.pow(tmp.inf.pantheon.ppe).plus(1)))
			tmp.el.souls.setTxt(showNum(player.inf.pantheon.demonicSouls));
			tmp.el.soulGain.setTxt(
				"(+" + showNum(adjustGen(tmp.inf.pantheon.soulGain, "demonicSouls")) + "/sec)"
			);
			tmp.el.soulBoost.setTxt(showNum(tmp.inf.pantheon.soulBoost.sub(1).times(100)));
			tmp.el.chipNerf.setTxt(showNum(player.inf.pantheon.heavenlyChips.pow(tmp.inf.pantheon.ppe).plus(1)))
			tmp.el.purgeDiv.setDisplay(player.inf.pantheon.purge.unl);
			tmp.el.purgeBtn.setTxt(
				HCCBA("purge")?"Trapped in Purge":(player.inf.pantheon.purge.active
					? "Exit Purge run" +
							(tmp.inf.pantheon.purgeGain.gt(0)
								? " for " + showNum(tmp.inf.pantheon.purgeGain) + " Purge Power."
								: ". You need " +
								  formatDistance(tmp.inf.pantheon.purgeNext) +
								  " to gain more Purge Power.")
					: "Start Purge run")
			);
			tmp.el.purgePower.setTxt(showNum(player.inf.pantheon.purge.power)+(player.inf.pantheon.purge.power.gte(600)?(" (softcapped)"):""));
			tmp.el.purgePowerEff.setTxt(showNum(tmp.inf.pantheon.ppe));
		}

		// Derivatives
		if (infTab == "derivatives") {
			for (let i = 0; i < DERV.length; i++) {
				let name = DERV[i];
				tmp.el["dervDiv" + name].setDisplay(tmp.inf.derv.unlocked(name));
				tmp.el["derv" + name].setTxt(formatDistance(tmp.inf.derv.amt(name)));
				tmp.el["dervgain" + name].setTxt(
					"(+" + formatDistance(adjustGen(tmp.inf.derv.gain(name), "derv")) + "/sec)"
				);
			}
			let dervName = player.inf.derivatives.unlocks.gte(tmp.inf.derv.maxShifts) ? "Boosts" : "Shifts";
			tmp.el.dervUnlock.setHTML(
				getScalingName("dervBoost") +
					" Derivative " +
					dervName +
					" (" +
					showNum(player.inf.derivatives.unlocks) +
					")<br>Cost: " +
					showNum(tmp.inf.derv.unlCost) +
					" Knowledge"
			);
			tmp.el.dervUnlock.setClasses({
				btn: true,
				locked: player.inf.knowledge.lt(tmp.inf.derv.unlCost),
				inf: player.inf.knowledge.gte(tmp.inf.derv.unlCost)
			});
		}
	}

	// Extreme Mode
	tmp.el.rankCheapDiv.setDisplay(modeActive('extreme'));
	if (modeActive("extreme")) {
		// Rank Cheapeners
		tmp.el.rankCheap.setTxt(
			showNum(player.rankCheap) + (tmp.rankCheap.free.eq(0) ? "" : " + " + showNum(tmp.rankCheap.free))
		);
		tmp.el.rankCheapUp.setClasses({ btn: true, locked: !tmp.rankCheap.can });
		tmp.el.rankCheapReq.setTxt(formatDistance(tmp.rankCheap.req));
		tmp.el.rankCheapName.setTxt(getScalingName("rankCheap") + "Rank Cheapener");

		// The Furnace
		if (player.tab=="furnace") {
			if (fnTab=="nfn") {
				tmp.el.coal.setTxt(
					showNum(player.furnace.coal) +
						" Coal" +
						(" (+" +
							showNum(adjustGen(tmp.fn.gain, "fn").times((nerfActive("noTS")||inFC(5)) ? 1 : tmp.timeSpeed)) +
							"/sec)")
				);
				tmp.el.coalEff.setTxt(showNum(tmp.fn.eff));
				for (let i = 1; i <= 5; i++) {
					tmp.el["fnu" + i].setClasses({
						btn: true,
						locked: player.furnace.coal.lt(tmp.fn.upgs[i].cost),
						fn: player.furnace.coal.gte(tmp.fn.upgs[i].cost)
					});
					tmp.el["fnu" + i + "cost"].setTxt(showNum(tmp.fn.upgs[i].cost));
					tmp.el["fnu" + i + "name"].setTxt(getScalingName("fn", i));
					tmp.el["fnu" + i + "lvl"].setTxt(showNum(player.furnace.upgrades[i - 1]));
				}
				tmp.el.fnu4.setDisplay(player.tr.upgrades.includes(31))
				tmp.el.fnu5.setDisplay(FCComp(5))
				tmp.el.bf.setClasses({
					btn: true,
					locked: player.furnace.coal.lt(tmp.fn.bfReq),
					fn: player.furnace.coal.gte(tmp.fn.bfReq)
				});
				tmp.el.bfReq.setTxt(showNum(tmp.fn.bfReq));
				tmp.el.bfAmt.setTxt(showNum(player.furnace.blueFlame)+(tmp.fn.enh.eff.gt(0)?(" + "+showNum(tmp.fn.enh.eff)):""));
				tmp.el.blueFlameName.setTxt(getScalingName("bf"))
				tmp.el.bfEff.setTxt(showNum(ExpantaNum.sub(1, tmp.fn.bfEff).times(100)));
				tmp.el.furnChalls.setDisplay(player.inf.endorsements.gte(10))
				for (let i=1;i<=5;i++) {
					if (i>1) tmp.el["fnc"+i].setDisplay(player.furnChalls.includes(i-1))
					tmp.el["fnc"+i+"goal"].setTxt(showNum(FC_GOAL[i]))
					tmp.el["fns"+i].setTxt((player.activeFC==i)?(FCEnd()?"Complete":"Exit"):(player.furnChalls.includes(i)?"Finished":"Start"))
				}
				tmp.el.fnu1eff.setTxt(showNum(tmp.fn1base))
				tmp.el.fnu4eff.setTxt(showNum(tmp.fn4base))
				tmp.el.fu4dc.setTxt((player.tr.upgrades.includes(35)&&!HCCBA("noTRU"))?"is weaker":"does nothing")
			} 
			if (fnTab=="efn") {
				tmp.el.eCoal.setTxt(
					showNum(player.furnace.enhancedCoal) +
						" Enhanced Coal" +
						(" (+" +
							showNum(adjustGen(tmp.fn.enh.gain, "fn")) +
							"/sec)")
				);
				tmp.el.eCoalEff.setTxt(showNum(tmp.fn.enh.eff));
				tmp.el.eCoalEff2.setTxt(showNum(tmp.fn.enh.eff2))
				for (let i = 1; i <= 13; i++) {
					tmp.el["efnu" + i].setClasses({
						btn: true,
						locked: player.furnace.enhancedCoal.lt(tmp.fn.enh.upgs[i].cost),
						fn: player.furnace.enhancedCoal.gte(tmp.fn.enh.upgs[i].cost)
					});
					tmp.el["efnu" + i + "cost"].setTxt(showNum(tmp.fn.enh.upgs[i].cost));
					tmp.el["efnu" + i + "name"].setTxt(getScalingName("efn", i));
					tmp.el["efnu" + i + "lvl"].setTxt(showNum(player.furnace.enhancedUpgrades[i - 1])+(tmp.fn.enh.upgs[i].extra.gt(0)?(" + "+showNum(tmp.fn.enh.upgs[i].extra)):""));
				}
				tmp.el.efnu1eff.setTxt(showNum(tmp.fn.enh.upg1eff))
				tmp.el.efnu2eff.setTxt(showNum(tmp.fn.enh.upg2eff.times(100)))
				tmp.el.efnu3eff.setTxt(showNum(tmp.fn.enh.upg3eff))
				tmp.el.efnu13eff.setTxt(showNum(tmp.fn.enh.upg13eff))
				tmp.el.moltBr.setDisplay(tmp.fn.enh.moltBr.gte(1))
				tmp.el.moltBrAmt.setTxt(showNum(tmp.fn.enh.moltBr))
				tmp.el.moltBrEff.setTxt(showNum(tmp.fn.enh.moltBrEff))
				tmp.el.moltBrEff2.setTxt(showNum(tmp.fn.enh.moltBrEff2))
			}
		}
	}
	
	// Statistics
	if (player.tab == "statistics") {
		tmp.el.best.setTxt(formatDistance(player.bestDistance))
		tmp.el.bestV.setTxt(formatDistance(player.bestV)+"/s")
		tmp.el.bestA.setHTML(formatDistance(player.bestA)+"/s<sup>2</sup>")
		tmp.el.maxEnd.setTxt(player.bestEnd.eq(0)?"":("Best-Ever Endorsements: "+showNum(player.bestEnd)))
		tmp.el.maxEP.setTxt(player.bestEP.eq(0)?"":("Best-Ever Elementary Point gain in one reset: "+showNum(player.bestEP)))
		let v = false
		for (let i=0;i<Object.keys(SCALING_STARTS).length;i++) {
			let name = Object.keys(SCALING_STARTS)[i]
			let tt = ""
			if (name=="hyper") tt = "Note: Hyper scaling cannot go below 50% strength :)\n"
			for (let r=0;r<Object.keys(SCALING_RES).length;r++) { // NESTED LOOP, REMOVE TO REDUCE LAG
				let func = Object.values(SCALING_RES)[r]
				let key = Object.keys(SCALING_RES)[r]
				let amt = func(1)
				if (MULTI_SCALINGS.includes(key)) for (let i=1;i<=SCALING_AMTS[key];i++) amt = ExpantaNum.max(amt, func(i))
				if (amt.eq(0)||((key=="rankCheap"||key=="fn")&&!modeActive("extreme"))) continue
				if (amt.gte(getScalingStart(name, key))) tt += capitalFirst(REAL_SCALING_NAMES[key])+" ("+showNum(getScalingPower(name, key).times(100))+"%): Starts at "+showNum(getScalingStart(name, key))+"\n"
			}
			let blank = ""
			if (name=="hyper") blank = "Note: Hyper scaling cannot go below 50% strength :)\n"
			tmp.el[name+"Stat"].changeStyle("visibility", tt==blank?"hidden":"visible")
			if (tt!=blank) v = true
			tmp.el[name+"Stat"].setAttr("widetooltip", tt)
		}
		tmp.el.scaleStatDiv.changeStyle("visibility", v?"visible":"hidden")
	}

	// Elementary
	if (player.tab == "elementary") {
		// Elementary
		tmp.el.elmReset.setHTML(
			player.elementary.theory.active?(tmp.elm.can?("Exit The Theoriverse to gain "+showNum(tmp.elm.theory.gain)+" Theory Points."):"Reach the end of this Elementary run to gain Theory Points."):("Reset all previous progress to gain <span class='eltxt'>" +
				showNum(tmp.elm.layer.gain) +
				"</span> Elementary Particles."+(tmp.elm.layer.gain.gte(tmp.elm.softcap)?"<span class='sc'>(softcapped)</span>":""))
		);
		tmp.el.elmReset.setClasses({ btn: true, locked: !tmp.elm.can, elm: (tmp.elm.can&&!player.elementary.theory.active), th: (tmp.elm.can&&player.elementary.theory.active) });
		tmp.el.elmt.setTxt(showNum(player.elementary.times));
		tmp.el.elmp.setTxt(showNum(player.elementary.particles));
		if (elmTab == "fermions") {
			// Fermions
			tmp.el.fermionsamt.setTxt(showNum(player.elementary.fermions.amount));
			tmp.el.transfer1Fermions.setClasses({
				btn: true,
				locked: player.elementary.particles.lte(0),
				elm: player.elementary.particles.gt(0)
			});
			tmp.el.transfer10pFermions.setClasses({
				btn: true,
				locked: player.elementary.particles.lte(10),
				elm: player.elementary.particles.gt(9)
			});
			tmp.el.transfer50pFermions.setClasses({
				btn: true,
				locked: player.elementary.particles.lte(2),
				elm: player.elementary.particles.gt(1)
			});
			tmp.el.transfer100pFermions.setClasses({
				btn: true,
				locked: player.elementary.particles.lte(1),
				elm: player.elementary.particles.gt(0)
			});

			// Quarks
			tmp.el.quarks.setHTML(
				showNum(player.elementary.fermions.quarks.amount) + " " + tmp.elm.ferm.quarkName() + " Quarks"
			);
			tmp.el.quarkGain.setTxt(showNum(adjustGen(tmp.elm.ferm.quarkGain, "quarks")));
			tmp.el.quarkRewards.setTooltip(
				tmp.elm.ferm.quarkName(true) +
					" Quarks: " +
					tmp.elm.ferm.quarkDesc(QUARK_NAMES[player.elementary.fermions.quarks.type - 1])
			);

			// Leptons
			tmp.el.leptons.setHTML(
				showNum(player.elementary.fermions.leptons.amount) + " " + tmp.elm.ferm.leptonName() + " Leptons"
			);
			tmp.el.leptonGain.setTxt(showNum(adjustGen(tmp.elm.ferm.leptonGain, "leptons")));
			tmp.el.leptonRewards.setTooltip(
				tmp.elm.ferm.leptonName(true) +
					" Leptons: " +
					tmp.elm.ferm.leptonDesc(LEPTON_NAMES[player.elementary.fermions.leptons.type - 1])
			);
		}
		if (elmTab == "bosons") {
			// Bosons
			tmp.el.bosonsamt.setTxt(showNum(player.elementary.bosons.amount));
			tmp.el.transfer1Bosons.setClasses({
				btn: true,
				locked: player.elementary.particles.lte(0),
				elm: player.elementary.particles.gt(0)
			});
			tmp.el.transfer10pBosons.setClasses({
				btn: true,
				locked: player.elementary.particles.lte(10),
				elm: player.elementary.particles.gt(9)
			});
			tmp.el.transfer50pBosons.setClasses({
				btn: true,
				locked: player.elementary.particles.lte(2),
				elm: player.elementary.particles.gt(1)
			});
			tmp.el.transfer100pBosons.setClasses({
				btn: true,
				locked: player.elementary.particles.lte(1),
				elm: player.elementary.particles.gt(0)
			});
			if (bosTab == "gauge") {
				// Gauge Bosons
				tmp.el.gaugeAmt.setTxt(showNum(player.elementary.bosons.gauge.amount));
				tmp.el.gaugeGain.setTxt(showNum(adjustGen(tmp.elm.bos.gaugeGain, "gauge")));
				tmp.el.gaugeForce.setTxt(showNum(player.elementary.bosons.gauge.force));
				tmp.el.gaugeForceGain.setTxt(showNum(tmp.elm.bos.forceGain));
				tmp.el.gaugeForceEff.setTxt(showNum(tmp.elm.bos.forceEff));

				// Photons
				tmp.el.photons.setTxt(showNum(player.elementary.bosons.gauge.photons.amount));
				tmp.el.photonGain.setTxt(showNum(adjustGen(tmp.elm.bos.photonGain, "gauge")));
				for (let i = 1; i <= PHOTON_UPGS; i++) {
					tmp.el["photon" + i].setClasses({
						btn: true,
						locked: player.elementary.bosons.gauge.photons.amount.lt(tmp.elm.bos.photonCost[i]),
						light: player.elementary.bosons.gauge.photons.amount.gte(tmp.elm.bos.photonCost[i])
					});
					tmp.el["photonLvl" + i].setTxt(getScalingName("photons", i)+"Level: "+showNum(player.elementary.bosons.gauge.photons.upgrades[i - 1]));
					tmp.el["photonDesc" + i].setTxt(showNum(tmp.elm.bos.photonEff(i)) + "x");
					tmp.el["photonCost" + i].setTxt(showNum(tmp.elm.bos.photonCost[i]));
				}

				// W & Z Bosons
				tmp.el.w.setTxt(showNum(player.elementary.bosons.gauge.w));
				tmp.el.wg.setTxt(showNum(adjustGen(tmp.elm.bos.wg, "gauge")));
				tmp.el.w1.setTxt(showNum(tmp.elm.bos.w1));
				tmp.el.w2.setTxt(showNum(tmp.elm.bos.w2));
				tmp.el.z.setTxt(showNum(player.elementary.bosons.gauge.z));
				tmp.el.zg.setTxt(showNum(adjustGen(tmp.elm.bos.zg, "gauge")));
				tmp.el.z1.setTxt(showNum(tmp.elm.bos.z1));
				tmp.el.z2.setTxt(showNum(tmp.elm.bos.z2));

				// Gluons
				for (let i = 0; i < GLUON_COLOURS.length; i++) {
					let col = GLUON_COLOURS[i];
					let amt = player.elementary.bosons.gauge.gluons[col].amount;
					tmp.el[col + "g"].setTxt(showNum(amt));
					tmp.el[col + "gg"].setTxt(showNum(adjustGen(tmp.elm.bos[col + "g"], "gauge")));
					tmp.el["glu"+col+"3"].setDisplay(hasDE(1))
					for (let x = 1; x <= 3; x++) {
						tmp.el[col + "Upg" + x].setClasses({
							btn: true,
							locked: amt.lt(tmp.elm.bos.gluonCost(col, x)),
							elm: amt.gte(tmp.elm.bos.gluonCost(col, x))
						});
						tmp.el[col + "Lvl" + x].setTxt(
							showNum(player.elementary.bosons.gauge.gluons[col].upgrades[x - 1]||new ExpantaNum(0))
						);
						tmp.el[col + "Eff" + x].setTxt(showNum(tmp.elm.bos.gluonEff(col, x)));
						tmp.el[col + "Cost" + x].setTxt(showNum(tmp.elm.bos.gluonCost(col, x)));
					}
				}

				// Gravitons
				tmp.el.grav.setTxt(showNum(player.elementary.bosons.gauge.gravitons));
				tmp.el.gravGain.setTxt(showNum(adjustGen(tmp.elm.bos.gravGain, "gauge")));
				tmp.el.gravMult.setTxt(showNum(tmp.elm.bos.gravEff));
				tmp.el.gravBoostDiv.setDisplay(hasDE(4))
				tmp.el.gravBoosts.setTxt(showNum(getGravBoosts()));
				tmp.el.gravBoostMult.setTxt(showNum(getGravBoostMult()));
			}
			if (bosTab == "scalar") {
				// Scalar Bosons
				tmp.el.scalarAmt.setTxt(showNum(player.elementary.bosons.scalar.amount));
				tmp.el.scalarGain.setTxt(showNum(adjustGen(tmp.elm.bos.scalarGain, "scalar")));
				tmp.el.higgs.setTxt(showNum(player.elementary.bosons.scalar.higgs.amount))
				tmp.el.higgsGain.setTxt(showNum(adjustGen(tmp.elm.bos.higgsGain, "scalar")))
				for (let i=0;i<Object.keys(HIGGS_UPGS).length;i++) {
					let name = Object.keys(HIGGS_UPGS)[i]
					let data = Object.values(HIGGS_UPGS)[i]
					tmp.el["higgs"+name].setDisplay(data.unl())
					tmp.el["higgs"+name].setClasses({btn: true, higgsL: player.elementary.bosons.scalar.higgs.amount.lt(data.cost)&&!player.elementary.bosons.scalar.higgs.upgrades.includes(name), higgs: player.elementary.bosons.scalar.higgs.amount.gte(data.cost)&&!player.elementary.bosons.scalar.higgs.upgrades.includes(name), higgsB: player.elementary.bosons.scalar.higgs.upgrades.includes(name)})
					tmp.el["higgs"+name].setHTML(data.desc+"<br>Cost: "+showNum(data.cost)+" Higgs Bosons.")
				}
				tmp.el["higgs1;1;0"].setTooltip("Currently: "+showNum(tmp.elm.bos["higgs_1;1;0"](true))+"x")
				tmp.el["higgs0;1;1"].setTooltip("Currently: "+showNum(tmp.elm.bos["higgs_0;1;1"](true))+"x")
				tmp.el["higgs3;0;0"].setTooltip("Currently: "+showNum(tmp.elm.bos["higgs_3;0;0"](true))+"x")
				tmp.el["higgs0;2;1"].setTooltip("Currently: +"+showNum(tmp.elm.bos["higgs_0;2;1"](true))+"%")
				tmp.el["higgs0;0;4"].setTooltip("Currently: "+showNum(tmp.elm.bos["higgs_0;0;4"](true))+"x")
				tmp.el["higgs1;3;0"].setTooltip("Currently: "+showNum(tmp.elm.bos["higgs_1;3;0"](true))+"x")
				tmp.el["higgs0;3;1"].setTooltip("Currently: "+showNum(tmp.elm.bos["higgs_0;3;1"](true))+"x")
				tmp.el["higgs0;0;5"].setTooltip("Currently: "+showNum(tmp.elm.bos["higgs_0;0;5"](true))+" later")
			}
		}
		if (elmTab=="theory") {
			tmp.el.thp.setTxt(showNum(player.elementary.theory.points))
			if (thTab=="tv") {
				tmp.el.theoriverse.setTxt(HCTVal("tv").gt(-1)?"Trapped in the Theoriverse!":player.elementary.theory.active?("Exit The Theoriverse early for no reward."):("Enter The Theoriverse at Depth "+showNum(player.elementary.theory.depth)))
				tmp.el.theoriverse.setTooltip("Entering The Theoriverse does an Elementary reset, and puts you in The Theoriverse, which will make all pre-Elementary resource generation (x^"+showNum(tmp.elm.theory.nerf)+")")
			}
			if (thTab=="ss") {
				tmp.el.ssUnl.setDisplay(!player.elementary.theory.supersymmetry.unl)
				tmp.el.ssDiv.setDisplay(player.elementary.theory.supersymmetry.unl)
				for (let i=0;i<4;i++) {
					let type = ["squark","slepton","neutralino","chargino"][i]
					tmp.el[type+"s"].setTxt(showNum(player.elementary.theory.supersymmetry[type+"s"]))
					tmp.el[type+"Gain"].setTxt(showNum(adjustGen(tmp.elm.theory.ss[type+"Gain"], "ss")))
					tmp.el[type+"Eff"].setTxt(showNum(tmp.elm.theory.ss[type+"Eff"]))
				}
				tmp.el.wavelength.setTxt(formatDistance(tmp.elm.theory.ss.wavelength))
				tmp.el.waveEff.setTxt(showNum(tmp.elm.theory.ss.waveEff))
			}
			if (thTab=="tree") {
				tmp.el.treeUnl.setDisplay(!player.elementary.theory.tree.unl)
				tmp.el.treeDiv.setDisplay(player.elementary.theory.tree.unl)
				for (let i=1;i<=TREE_AMT;i++) {
					let bought = tmp.elm.theory.tree.bought(i)
					tmp.el["tree"+i].changeStyle("visibility", (TREE_UPGS[i].unl?TREE_UPGS[i].unl():true)?"visible":"hidden")
					tmp.el["tree"+i].setTxt(showNum(bought)+"/"+showNum(TREE_UPGS[i].cap))
					tmp.el["tree"+i].setTooltip(TREE_UPGS[i].desc+"\n"+(bought.gte(TREE_UPGS[i].cap)?"":("Cost: "+showNum(TREE_UPGS[i].cost(bought).div(tmp.elm.theory.tree.costReduc).round())+" Theory Points"))+"\nCurrently: "+TREE_UPGS[i].effD(TREE_UPGS[i].effect(ExpantaNum.add(bought, i==7?TREE_UPGS[11].effect(player.elementary.theory.tree.upgrades[11]||0):0))))
					tmp.el["tree"+i].setClasses({tree: true, capped: bought.gte(TREE_UPGS[i].cap), unl: (!(bought.gte(TREE_UPGS[i].cap))&&player.elementary.theory.points.gte(TREE_UPGS[i].cost(bought).div(tmp.elm.theory.tree.costReduc).round())), locked: (!(bought.gte(TREE_UPGS[i].cap))&&!player.elementary.theory.points.gte(TREE_UPGS[i].cost(bought).div(tmp.elm.theory.tree.costReduc).round()))})
				}
				tmp.el.treeRespec.setTxt("Reset your Theory Tree (and Elementary reset) for "+showNum(player.elementary.theory.tree.spent)+" Theory Points back.")
				tmp.el.ach152Eff.setHTML(tmp.ach[152].has?('"Useless Theories" effect: Upgrades are '+showNum(ach152Eff())+'x cheaper.<br><br>'):"")
			}
			if (thTab=="strings") {
				tmp.el.stringsUnl.setDisplay(!player.elementary.theory.strings.unl)
				tmp.el.stringsDiv.setDisplay(player.elementary.theory.strings.unl)
				for (let i=1;i<=TOTAL_STR;i++) {
					if (i>1) tmp.el["str"+i].setDisplay(player.elementary.theory.strings.amounts[i-2].gte(STR_REQS[i])&&(UNL_STR()>=i))
					tmp.el["str"+i+"amt"].setTxt(formatDistance(player.elementary.theory.strings.amounts[i-1]))
					tmp.el["str"+i+"eff"].setTxt(showNum(getStringEff(i)))
					tmp.el["str"+i+"gain"].setTxt(formatDistance(adjustGen(getStringGain(i), "str")))
				}
				let lastStr = player.elementary.theory.strings.amounts.findIndex(x => new ExpantaNum(x).eq(0))+1
				tmp.el.nextStr.setTxt((lastStr<=1||lastStr>UNL_STR())?"":("Next String unlocks when your "+STR_NAMES[lastStr-1]+" String reaches a length of "+formatDistance(STR_REQS[lastStr])))
				tmp.el.entangleDiv.setDisplay(lastStr>=3||lastStr==0||player.elementary.theory.strings.entangled.gt(0))
				tmp.el.entangle.setClasses({btn: true, locked: lastStr<3&&lastStr!=0, th: lastStr>=3||lastStr==0})
				tmp.el.entangle.setTxt("Entangle your Strings (which resets them) to gain "+formatDistance(getEntangleGain())+" of Entangled Strings.")
				tmp.el.entangleAmt.setTxt(formatDistance(player.elementary.theory.strings.entangled))
				tmp.el.entangleEff.setTxt(showNum(getEntangleEff()))
			}
			if (thTab=="preons") {
				tmp.el.preonsUnl.setDisplay(!player.elementary.theory.preons.unl)
				tmp.el.preonsDiv.setDisplay(player.elementary.theory.preons.unl)
				tmp.el.preonAmt.setTxt(showNum(player.elementary.theory.preons.amount))
				tmp.el.preonGain.setTxt(showNum(adjustGen(getPreonGain(), "preons")))
				tmp.el.theoryBoost.setClasses({btn: true, locked: player.elementary.theory.preons.amount.lt(getTBCost()), th: player.elementary.theory.preons.amount.gte(getTBCost())})
				tmp.el.theoryBoost.setHTML("Gain 1 Theoretical Booster (+"+showNum(getTBGain())+" Theory Points)<br>Cost: "+showNum(getTBCost())+" Preons")
				tmp.el.theoryBoosters.setTxt(showNum(player.elementary.theory.preons.boosters))
			}
			if (thTab=="accelerons") {
				tmp.el.acceleronsUnl.setDisplay(!player.elementary.theory.accelerons.unl)
				tmp.el.acceleronsDiv.setDisplay(player.elementary.theory.accelerons.unl)
				tmp.el.accel.setTxt(showNum(player.elementary.theory.accelerons.amount))
				let gain = getAccelGain()
				tmp.el.accelGain.setTxt(showNum(adjustGen(gain, "accelerons")))
				tmp.el.accelerSC.setHTML(gain.gte(1e6)?"<span class='sc'>(softcapped)</span>":"")
				let accEff = getAccelEff()
				tmp.el.accelEff.setHTML("<span class='thp'>"+showNum(accEff)+"</span>x later"+(accEff.gte(2)?" <span class='sc'>(softcapped)</span>":""))
				let next = player.elementary.theory.accelerons.expanders.toNumber()+1
				tmp.el.darkExp.setClasses({btn: true, locked: (player.elementary.theory.accelerons.amount.lt(DARK_EXPANDER_COSTS[next])||next-1>=MAX_DARK_EXPANDERS), th: (!(player.elementary.theory.accelerons.amount.lt(DARK_EXPANDER_COSTS[next])||next-1>=MAX_DARK_EXPANDERS))})
				tmp.el.darkExp.setHTML((next-1>=MAX_DARK_EXPANDERS)?"MAXED":(DARK_EXPANDER_DESCS[next]+"<br>Cost: "+showNum(DARK_EXPANDER_COSTS[next])+" Accelerons"))
				tmp.el.darkExpAmt.setTxt(showNum(player.elementary.theory.accelerons.expanders))
				let past = ""
				if (next>1) Array.from(Array(next-1), (_, i) => i + 1).forEach(n => past += "DE"+n+": "+DARK_EXPANDER_DESCS[n]+"<br>")
				tmp.el.darkExpPast.setHTML(past)
			}
			if (thTab=="inflatons") {
				tmp.el.inflatonsUnl.setDisplay(!player.elementary.theory.inflatons.unl)
				tmp.el.inflatonsDiv.setDisplay(player.elementary.theory.inflatons.unl)
				tmp.el.inflatonAmt.setTxt(showNum(player.elementary.theory.inflatons.amount))
				let state = tmp.elm.hc.infState
				tmp.el.inflatonPerc.setTxt(state>=0?(showNum(state*100)+"% Inflated"):(showNum(state*(-100))+"% Deflated"))
				tmp.el.inflatonGain.setTxt(showNum(adjustGen(tmp.elm.hc.infGain, "inflatons")))
				tmp.el.inflaton1.setTxt(showNum(getInflatonEff1()))
				tmp.el.inflaton2.setTxt(showNum(getInflatonEff2()))
				tmp.el.inflatonSC.setTxt(tmp.elm.hc.infGain.gte(5e4)?"(softcapped)":"")
			}
		}
		if (elmTab=="hc") {
			tmp.el.projHadScore.setTxt(showNum(tmp.elm.hc.currScore))
			tmp.el.startHC.setTxt((!(!player.elementary.hc.active))?(canCompleteHC()?"Complete Hadronic Challenge!":"Exit Hadronic Challenge early for no reward"):"Start Hadronic Challenge")
			tmp.el.bestHadScore.setTxt(showNum(player.elementary.hc.best))
			tmp.el.hadrons.setTxt(showNum(player.elementary.hc.hadrons))
			tmp.el.hadronGain.setTxt(showNum(adjustGen(tmp.elm.hc.hadronGain, "hc")))
			tmp.el.hadronEff.setTxt(showNum(player.elementary.hc.claimed))
			tmp.el.hadronNext.setTxt(showNum(tmp.elm.hc.next))
			tmp.el.hadEffBulk.setTxt(showNum(tmp.elm.hc.hadronBulk))
			for (let i=0;i<6;i++) {
				let x = ""
				for (let j=0;j<6;j++) x += "Difficulty Level "+(j+1)+": "+STADIUM_DESCS[HC_CHALLS[i]][j]+".\n\n"
				tmp.el["hcChall"+HC_CHALLS[i]].setTooltip(x)
				tmp.el["hcSelectorSpan"+HC_CHALLS[i]].changeStyle("visibility", player.elementary.theory.inflatons.unl?"visible":"hidden")
				tmp.el["hcCurrent"+HC_CHALLS[i]].setTxt("Currently: "+showNum(getHCSelector(HC_CHALLS[i])))
			}
			tmp.el["hcCurrenttv"].setTxt("Currently: "+showNum(getHCSelector("tv")))
			tmp.el.hcPerc.setTxt(player.elementary.hc.active?(showNum(tmp.elm.hc.complPerc.times(100))+"% complete"):"")
		}
	}

	// Miscellaneous
	tmp.el.ts.setHTML(
		tmp.timeSpeed.eq(1) || nerfActive("noTS") ? "" : "Time Speed: " + showNum(tmp.timeSpeed) + "x<br>"
	);
	tmp.el.body.changeStyle("background", tmp.bc);
	let root = document.documentElement;
	root.style.setProperty("--plaintxt", player.options.theme == "dark" ? (player.options.fonts!="courier"?"#d9d9d9":"white") : "black");
	root.style.setProperty("--tb", player.options.theme == "dark" ? "#00968f" : "#03fcf0");
	root.style.setProperty("--ach", player.options.theme == "dark" ? "#287d1b" : "#4ceb34");
	root.style.setProperty("--rbt", player.options.theme == "dark" ? "#666666" : "#c9c9c9");
	root.style.setProperty("--threeArrows", player.options.theme == "dark" ? 'url("images/threeArrows2.jpg")' : 'url("images/threeArrows.jpg")');
	root.style.setProperty("--font", '"'+capitalFirst(player.options.fonts)+'"')

	tmp.el.mainContainer.setDisplay(showContainer);
	tmp.el.loading.setDisplay(false)
	tmp.el.footer.setDisplay(player.tab == "options" && player.optionsTab !== "saving");
	tmp.el.newsticker.setDisplay(player.options.newst);
	tmp.el.hotkeys.setAttr("widetooltip", 
		"R -> Rank Reset\n"+
		(modeActive("extreme")?"Shift + C -> Rank Cheapener Reset\n":"")+
		"T -> Tier Reset\n"+
		(TABBTN_SHOWN.rockets()?"Shift + R -> Rocket Reset\n":"")+
		(TABBTN_SHOWN.rockets()?"F -> Rocket Fuel Reset\n":"")+
		((TABBTN_SHOWN.furnace()&&tmp.fn)?"Shift + F -> Blue Flame Reset\n":"")+
		(TABBTN_SHOWN.tr()?"U -> Time Reversal\n":"")+
		(TABBTN_SHOWN.collapse()?"C -> Collapse Reset\n":"")+
		(TABBTN_SHOWN.pathogens()?"P -> Max All Pathogen Upgrades\n":"")+
		(TABBTN_SHOWN.dc()?"D -> Buy Dark Core\n":"")+
		((TABBTN_SHOWN.inf() && player.inf.endorsements.gte(10))?"E -> Get Endorsement\n":"")+
		(INF_TABS.ascension()?"1, 2, 3, 4 -> Toggle Perks\n":"")+
		(INF_TABS.derivatives()?"Shift + P -> Toggle Purge\n":"")+
		(INF_TABS.derivatives()?"Shift + D -> Derivative Shift/Boost\n":"")+
		(TABBTN_SHOWN.elementary()?"Shift + E -> Elementary Reset\n":"")+
		(ELM_TABS.theory()?"Shift + T -> Toggle Theoriverse\n":"")+
		(TH_TABS.strings()?"S -> Entangled String reset":"")
	);
}
