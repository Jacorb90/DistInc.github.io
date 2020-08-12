function updateAchievements() {
	if (player.distance.gte(100)) tmp.ach[11].grant();
	if (player.rank.gt(1)) tmp.ach[12].grant();
	if (player.tier.gte(1)) tmp.ach[13].grant();
	if (player.rockets.gt(0)) tmp.ach[14].grant();
	if (player.rf.gt(0)) tmp.ach[15].grant();
	if (player.automation.unl) tmp.ach[16].grant();
	if (player.tr.unl) tmp.ach[17].grant();
	if (player.collapse.cadavers.gt(0)) tmp.ach[18].grant();

	if (player.distance.gte(modeActive("extreme") ? 3e4 : 5e5)) tmp.ach[21].grant();
	if (player.rank.gte(modeActive("extreme") ? 6 : 8)) tmp.ach[22].grant();
	if (player.tier.gte(3)) tmp.ach[23].grant();
	if (player.rockets.gte(2)) tmp.ach[24].grant();
	if (player.rf.gte(2)) tmp.ach[25].grant();
	if (Object.keys(player.automation.robots).includes("rankbot")) tmp.ach[26].grant();
	if (player.tr.cubes.gte(1000)) tmp.ach[27].grant();
	if (player.collapse.cadavers.gte(66)) tmp.ach[28].grant();

	if (player.distance.gte(1e12)) tmp.ach[31].grant();
	if (player.rank.gte(12)) tmp.ach[32].grant();
	if (player.tier.gte(4)) tmp.ach[33].grant();
	if (player.rockets.gte(10)) tmp.ach[34].grant();
	if (player.rf.gte(3)) tmp.ach[35].grant();
	if (Object.keys(player.automation.robots).includes("tierbot")) tmp.ach[36].grant();
	if (player.tr.upgrades.length >= 5) tmp.ach[37].grant();
	if (hasCollapseMilestone(12)) tmp.ach[38].grant();

	if (player.distance.gte(10 * DISTANCES.pc)) tmp.ach[41].grant();
	if (player.rank.gte(20)) tmp.ach[42].grant();
	if (player.tier.gte(5)) tmp.ach[43].grant();
	if (player.rockets.gte(1e5)) tmp.ach[44].grant();
	if (player.rf.gte(6)) tmp.ach[45].grant();
	if (player.automation.scraps.gte(5000)) tmp.ach[46].grant();
	if (player.tr.upgrades.length >= 10) tmp.ach[47].grant();
	if (player.automation.intelligence.gte(1e10)) tmp.ach[48].grant();

	if (player.distance.gte(DISTANCES.uni)) tmp.ach[51].grant();
	if (player.rockets.gte(1e8)) tmp.ach[52].grant();
	if (player.rf.gte(10)) tmp.ach[53].grant();
	if (player.tr.cubes.gte(1e7)) tmp.ach[54].grant();
	if (tmp.timeSpeed.gte(1e5)) tmp.ach[55].grant();
	if (Object.keys(player.automation.robots).includes("fuelbot")) tmp.ach[56].grant();
	if (player.tr.cubes.gte(9e15)) tmp.ach[57].grant();
	if (player.distance.gte(2.22e22 * DISTANCES.uni)) tmp.ach[58].grant();

	if (player.pathogens.unl) tmp.ach[61].grant();
	if (player.collapse.lifeEssence.gte(1e6)) tmp.ach[62].grant();
	if (player.tr.cubes.gte(1e28)) tmp.ach[63].grant();
	if (player.rank.gte(50)) tmp.ach[64].grant();
	if (player.collapse.cadavers.gte(5e7)) tmp.ach[65].grant();
	if (tmp.auto.fuelbot.interval.lte(120)) tmp.ach[66].grant();
	if (player.distance.gte(1e80 * DISTANCES.uni)) tmp.ach[67].grant();
	let bool = true;
	let antiBool = true;
	for (let i = 1; i <= PTH_AMT; i++)
		if (player.pathogens.upgrades[i].eq(0)) {
			if (i <= 10) bool = false;
		} else antiBool = false;
	if (bool) tmp.ach[68].grant();

	if (player.dc.unl) tmp.ach[71].grant();
	if (player.dc.matter.gte(50)) tmp.ach[72].grant();
	if (player.distance.gte(ExpantaNum.mul(1e140, DISTANCES.uni))) tmp.ach[73].grant();
	if (player.rockets.gte(1e60)) tmp.ach[74].grant();
	if (player.dc.cores.gte(5)) tmp.ach[75].grant();
	if (player.rockets.gte(1e100)) tmp.ach[76].grant();
	if (player.automation.scraps.gte(1e80)) tmp.ach[77].grant();
	if (player.rf.gte(75)) tmp.ach[78].grant();

	if (player.inf.unl) tmp.ach[81].grant();
	if (player.inf.knowledge.gte(9000.1)) tmp.ach[82].grant();
	if (player.inf.endorsements.gte(3)) tmp.ach[83].grant();
	if (tmp.auto.fuelbot.magnitude.gt(100)) tmp.ach[84].grant();
	if (player.automation.intelligence.gte(1.79e308)) tmp.ach[85].grant();
	if (player.distance.gte("4.4e1026")) tmp.ach[86].grant();
	if (player.inf.knowledge.gte(25e9)) tmp.ach[87].grant();
	if (player.inf.endorsements.gte(10)) tmp.ach[88].grant();

	if (tmp.dc.flow.gte(8e3)) tmp.ach[91].grant();
	if (player.collapse.cadavers.gte(1e80)) tmp.ach[92].grant();
	if (player.inf.ascension.power.gte(666)) tmp.ach[93].grant();
	if (player.inf.endorsements.gte(14)) tmp.ach[94].grant();
	if (player.inf.ascension.enlightenments.every(x => new ExpantaNum(x).gte(1))) tmp.ach[95].grant();
	if (tmp.auto.rankbot.magnitude.gt(1e33)) tmp.ach[96].grant();
	if (player.distance.gte("4.4e416") && antiBool) tmp.ach[97].grant();
	if (player.distance.gte("4.4e786") && player.dc.cores.eq(0)) tmp.ach[98].grant();

	if (player.inf.stadium.completions.length > 0) tmp.ach[101].grant();
	if (player.inf.ascension.enlightenments.every(x => new ExpantaNum(x).gte(2))) tmp.ach[102].grant();
	if (player.dc.matter.gte(1e18)) tmp.ach[103].grant();
	if (player.inf.stadium.completions.length >= 3) tmp.ach[104].grant();
	if (tmp.timeSpeed.gte(new ExpantaNum("2.22e2222"))) tmp.ach[105].grant();
	if (player.inf.endorsements.gte(20)) tmp.ach[106].grant();
	if (player.inf.stadium.completions.length >= 6) tmp.ach[107].grant();
	if (!nerfActive("maxVelActive")) tmp.ach[108].grant();

	if (tmp.auto.fuelbot.interval.lt(1)) tmp.ach[111].grant();
	if (tmp.acc.gte("2.2e10022")) tmp.ach[112].grant();
	if (tmp.pathogens.upgPow.gte(2.5)) tmp.ach[113].grant();
	if (tmp.accEn.gte(4.4e26)) tmp.ach[114].grant();
	if (player.inf.pantheon.purge.power.gt(0)) tmp.ach[115].grant();
	if (player.inf.endorsements.gte(25)) tmp.ach[116].grant();
	if (player.collapse.cadavers.gte("1e3000")) tmp.ach[117].grant();
	if (player.distance.gte("1e33600") && tmp.inf.stadium.active("eternity")) tmp.ach[118].grant();

	if (player.distance.gte(2.5e4) && tmp.inf.stadium.active("reality", 6)) tmp.ach[121].grant();
	if (player.inf.derivatives.unlocks.gte(2)) tmp.ach[122].grant();
	if (player.inf.ascension.power.gte(2.5e5)) tmp.ach[123].grant();
	if (player.inf.pantheon.purge.power.gte(modeActive("extreme")?9:30)) tmp.ach[124].grant();
	if (player.distance.gte(1e4) && tmp.inf.stadium.active("reality", 6) && player.inf.pantheon.purge.active)
		tmp.ach[125].grant();
	if (tmp.auto.rankbot.magnitude.gte(1e200)) tmp.ach[126].grant();
	if (player.tr.cubes.gte("1e100000") && antiBool && player.dc.cores.eq(0)) tmp.ach[127].grant();
	if (tmp.acc.gte("5.55e5555") && player.inf.pantheon.purge.active) tmp.ach[128].grant();

	if (player.elementary.times.gt(0)) tmp.ach[131].grant();
	if (player.distance.gte(1e15)&&player.inf.pantheon.purge.active&&!player.inf.upgrades.includes('8;8')&&tmp.inf.stadium.active("reality", 6)) tmp.ach[132].grant()
	if (player.elementary.fermions.amount.gte(1e3) && player.elementary.bosons.amount.gte(1e3)) tmp.ach[133].grant()
	if (antiBool && player.dc.cores.eq(0) && player.distance.gte("4.4e1100026")) tmp.ach[134].grant()
	if (player.inf.pantheon.heavenlyChips.gte(2.5e7)) tmp.ach[135].grant()
	if (player.velocity.gte("4.4e3750026")) tmp.ach[136].grant()
	// ach137 is in the Elementary reset function
	if (player.distance.gte("4.4e7826")&&player.inf.endorsements.lte(10)) tmp.ach[138].grant()
		
	if (player.elementary.theory.points.gte(1)) tmp.ach[141].grant()
	if (player.inf.pantheon.purge.active && tmp.inf.stadium.active("reality", 6) && antiBool && player.dc.cores.eq(0) && player.distance.gte(4.4e136)) tmp.ach[142].grant()
	if (player.elementary.theory.depth.gte(5)) tmp.ach[143].grant()
	if (player.inf.ascension.power.gte(1e33)) tmp.ach[144].grant()
	if (player.distance.gte("4.4e8000026")) tmp.ach[145].grant()
	if (player.inf.knowledge.gte("1.8e308")) tmp.ach[146].grant()
	if (player.inf.endorsements.lte(10) && player.rank.gte(200)) tmp.ach[147].grant()
	if (player.rank.gte(995)) tmp.ach[148].grant()
		
	if (player.elementary.hc.unl) tmp.ach[151].grant()
	if (player.elementary.hc.best.gte(2.3)) tmp.ach[152].grant()
	if (Object.keys(player.elementary.theory.tree.upgrades).length==0 && player.distance.gte("4.4e8250026")) tmp.ach[153].grant();
	if (player.elementary.hc.best.gte(2.5) && player.bestDistance.gte("e2.8e7")) tmp.ach[154].grant();
	if (player.elementary.theory.inflatons.unl) tmp.ach[155].grant();
	if (player.elementary.theory.depth.gte(9)) tmp.ach[156].grant();
	if (player.elementary.theory.strings.amounts[0].gte(4.4e76)) tmp.ach[157].grant();
	if (player.elementary.hc.best.gte(3.75)) tmp.ach[158].grant();
}

function rowComplete(r) {
	return [r*10+1,r*10+2,r*10+3,r*10+4,r*10+5,r*10+6,r*10+7,r*10+8].every(i => player.achievements.includes(i))
}