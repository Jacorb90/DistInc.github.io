const TMP_DATA = {
	ELS: ["distance", "velocity", "maxVel", "acceleration", "rank", "rankUp", "rankDesc", "rankReq", "tier", "tierUp", "tierDesc", "tierReq", "rocketReset", "rocketGain", "rocketsAmt", "rocketsEff", "nextFeature", "achDesc", "rf", "rfReset", "rfReq", "rfEff", "scraps", "intAmt", "rankbot", "tierbot", "fuelbot", "robotTab", "robotName", "robotInterval", "robotMagnitude", "buyRobotInterval", "buyRobotMagnitude", "rt", "tc", "frf", "ts", "collapseReset", "cadaverGain", "cadavers", "cadaverEff", "sacrificeCadavers", "lifeEssence", "robotMax", "body", "rocketGainSC", "rocketEffSC", "timeCubeEffSC", "cadaverGainSC", "cadaverEffSC", "pathogensAmt", "tdeEff", "rankName", "tierName", "rfName", "pthUpgPow", "pthGainSC", "sf", "not", "darkMatter", "darkEnergy", "darkFluid", "darkCore", "arrowToDarkMatter", "darkFlow", "trRow3", "autoSave", "mainContainer", "endorsements", "nextEndorsement", "knowledge", "infUpgData", "knowledgeBase", "endorsementName", "endorsementManual", "perkPower", "ascPower"],
}
for (let r=1;r<=ACH_DATA.rows;r++) {
	for (let c=1;c<=ACH_DATA.cols;c++) {
		let id = r*10+c
		TMP_DATA.ELS.push("ach"+id)
	}
}
for (let i=1;i<=TR_UPG_AMT;i++) TMP_DATA.ELS.push("tr"+i)
for (let i=1;i<=EM_AMT;i++) TMP_DATA.ELS.push("lem"+i)
for (let i=0;i<Object.keys(MODES).length;i++) TMP_DATA.ELS.push(Object.keys(MODES)[i]+"Mode")
for (let i=1;i<=PTH_AMT;i++) TMP_DATA.ELS.push("pth"+i)
for (let r=1;r<=INF_UPGS.rows;r++) for (let c=1;c<=INF_UPGS.cols;c++) TMP_DATA.ELS.push("inf"+r+";"+c)
for (let i=0;i<Object.keys(AUTOMATORS).length;i++) {
	TMP_DATA.ELS.push("automator-"+Object.keys(AUTOMATORS)[i])
	TMP_DATA.ELS.push("automatorDiv-"+Object.keys(AUTOMATORS)[i])
}
for (let i=1;i<=4;i++) {
	TMP_DATA.ELS.push("perk"+i)
	TMP_DATA.ELS.push("perkEff"+i)
}