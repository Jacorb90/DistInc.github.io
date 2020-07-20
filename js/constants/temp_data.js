const TMP_DATA = {
	ELS: [
		"distance",
		"velocity",
		"maxVel",
		"acceleration",
		"rank",
		"rankUp",
		"rankDesc",
		"rankReq",
		"tier",
		"tierUp",
		"tierDesc",
		"tierReq",
		"rocketReset",
		"rocketGain",
		"rocketsAmt",
		"rocketsEff",
		"nextFeature",
		"achDesc",
		"rf",
		"rfReset",
		"rfReq",
		"rfEff",
		"scraps",
		"intAmt",
		"rankbot",
		"rankCheapbot",
		"tierbot",
		"fuelbot",
		"robotTab",
		"robotName",
		"robotInterval",
		"robotMagnitude",
		"buyRobotInterval",
		"buyRobotMagnitude",
		"rt",
		"tc",
		"frf",
		"ts",
		"collapseReset",
		"cadaverGain",
		"cadavers",
		"cadaverEff",
		"sacrificeCadavers",
		"lifeEssence",
		"robotMax",
		"body",
		"rocketGainSC",
		"rocketEffSC",
		"timeCubeEffSC",
		"cadaverGainSC",
		"cadaverEffSC",
		"pathogensAmt",
		"tdeEff",
		"rankName",
		"tierName",
		"rfName",
		"pthUpgPow",
		"pthGainSC",
		"sf",
		"not",
		"darkMatter",
		"darkEnergy",
		"darkFluid",
		"darkCore",
		"arrowToDarkMatter",
		"darkFlow",
		"trRow3",
		"trRow4",
		"trRow5",
		"trRow6",
		"autoSave",
		"mainContainer",
		"endorsements",
		"nextEndorsement",
		"knowledge",
		"infUpgData",
		"knowledgeBase",
		"endorsementName",
		"endorsementManual",
		"perkPower",
		"ascPower",
		"perkAccel",
		"forceInf",
		"exitStad",
		"emInner",
		"mvName",
		"accEn",
		"spectralGems",
		"spectralGemName",
		"nextSpectralGem",
		"angels",
		"demons",
		"transferAngels",
		"transferDemons",
		"respecSpectralGems",
		"chips",
		"chipBoost",
		"souls",
		"soulBoost",
		"tudeEff",
		"purgeDiv",
		"purgeBtn",
		"purgePower",
		"purgePowerEff",
		"dervUnlock",
		"rankCheapDiv",
		"rankCheapName",
		"rankCheap",
		"rankCheapUp",
		"rankCheapReq",
		"furnacetabbtn",
		"coal",
		"coalEff",
		"bf",
		"bfReq",
		"bfAmt",
		"bfEff",
		"knowledgeGain",
		"chipGain",
		"soulGain",
		"theme",
		"footer",
		"rf2",
		"elmReset",
		"elmt",
		"elmp",
		"newsticker",
		"newst",
		"elc",
		"fermionsamt",
		"bosonsamt",
		"transfer1Fermions",
		"transfer10pFermions",
		"transfer50pFermions",
		"transfer100pFermions",
		"transfer1Bosons",
		"transfer10pBosons",
		"transfer50pBosons",
		"transfer100pBosons",
		"quarks",
		"quarkGain",
		"quarkRewards",
		"leptons",
		"leptonGain",
		"leptonRewards",
		"gaugeAmt",
		"gaugeGain",
		"gaugeForce",
		"gaugeForceGain",
		"gaugeForceEff",
		"photons",
		"photonGain",
		"w",
		"wg",
		"w1",
		"w2",
		"z",
		"zg",
		"z1",
		"z2",
		"grav",
		"gravGain",
		"gravMult",
		"scalarAmt",
		"scalarGain",
		"higgs",
		"higgsGain",
		"loading",
		"stadiumProg",
		"best",
		"bestV",
		"bestA",
		"maxEnd",
		"maxEP",
		"scaleStatDiv",
		"theoriverse",
		"thp",
		"ssUnl",
		"ssDiv",
		"squarks",
		"squarkGain",
		"squarkEff",
		"sleptons",
		"sleptonGain",
		"sleptonEff",
		"neutralinos",
		"neutralinoGain",
		"neutralinoEff",
		"charginos",
		"charginoGain",
		"charginoEff",
		"wavelength",
		"waveEff",
		"treeUnl",
		"treeDiv",
		"treeRespec",
		"saveImp",
		"stringsUnl",
		"stringsDiv",
		"nextStr",
		"entangleDiv",
		"entangle",
		"entangleAmt",
		"entangleEff",
		"preonsUnl",
		"preonsDiv",
		"preonAmt",
		"preonGain",
		"theoryBoost",
		"theoryBoosters",
		"acceleronsUnl",
		"acceleronsDiv",
		"accel",
		"accelGain",
		"accelEff",
		"darkExp",
		"darkExpAmt",
		"gravBoostDiv",
		"gravBoosts",
		"gravBoostMult",
		"hotkeys",
		"hot",
		"furnChalls",
		"fns1",
		"fnc2",
		"fns2",
		"fnc3",
		"fns3",
		"fnc4",
		"fns4",
		"fnc5",
		"fns5",
		"chipNerf",
		"soulNerf"
	]
};
for (let r = 1; r <= ACH_DATA.rows; r++) {
	for (let c = 1; c <= ACH_DATA.cols; c++) {
		let id = r * 10 + c;
		TMP_DATA.ELS.push("ach" + id);
	}
}
for (let i = 1; i <= 3; i++) {
	TMP_DATA.ELS.push("fnu" + i);
	TMP_DATA.ELS.push("fnu" + i + "cost");
	TMP_DATA.ELS.push("fnu" + i + "name");
	TMP_DATA.ELS.push("fnu" + i + "lvl");
}
for (let i = 1; i <= TR_UPG_AMT; i++) TMP_DATA.ELS.push("tr" + i);
for (let i = 1; i <= EM_AMT; i++) TMP_DATA.ELS.push("lem" + i);
for (let i = 0; i < Object.keys(MODES).length; i++) TMP_DATA.ELS.push(Object.keys(MODES)[i] + "Mode");
for (let i = 1; i <= PTH_AMT; i++) TMP_DATA.ELS.push("pth" + i);
for (let r = 1; r <= INF_UPGS.rows; r++)
	for (let c = 1; c <= INF_UPGS.cols; c++) TMP_DATA.ELS.push("inf" + r + ";" + c);
for (let i = 0; i < Object.keys(AUTOMATORS).length; i++) {
	TMP_DATA.ELS.push("automator-" + Object.keys(AUTOMATORS)[i]);
	TMP_DATA.ELS.push("automatorDiv-" + Object.keys(AUTOMATORS)[i]);
}
for (let i = 1; i <= 4; i++) {
	TMP_DATA.ELS.push("perk" + i);
	TMP_DATA.ELS.push("perkEff" + i);
	TMP_DATA.ELS.push("enl" + i);
	TMP_DATA.ELS.push("enleff" + i);
	TMP_DATA.ELS.push("buyEnl" + i);
	TMP_DATA.ELS.push("enlScale" + i);
}
for (let i = 0; i < Object.keys(STADIUM_DESCS).length; i++) {
	TMP_DATA.ELS.push(Object.keys(STADIUM_DESCS)[i] + "Div");
	TMP_DATA.ELS.push(Object.keys(STADIUM_DESCS)[i] + "Chall");
	TMP_DATA.ELS.push(Object.keys(STADIUM_DESCS)[i] + "Btm");
}
for (let i = 0; i < DERV.length; i++) {
	let name = DERV[i];
	TMP_DATA.ELS.push("dervDiv" + name);
	TMP_DATA.ELS.push("derv" + name);
	TMP_DATA.ELS.push("dervgain" + name);
}
for (let i = 1; i <= PHOTON_UPGS; i++) {
	TMP_DATA.ELS.push("photon" + i);
	TMP_DATA.ELS.push("photonLvl" + i);
	TMP_DATA.ELS.push("photonDesc" + i);
	TMP_DATA.ELS.push("photonCost" + i);
}
for (let i = 0; i < GLUON_COLOURS.length; i++) {
	let col = GLUON_COLOURS[i];
	TMP_DATA.ELS.push(col + "g");
	TMP_DATA.ELS.push(col + "gg");
	TMP_DATA.ELS.push("glu"+col+"3");
	for (let x = 1; x <= 3; x++) {
		TMP_DATA.ELS.push(col + "Upg" + x);
		TMP_DATA.ELS.push(col + "Lvl" + x);
		TMP_DATA.ELS.push(col + "Eff" + x);
		TMP_DATA.ELS.push(col + "Cost" + x);
	}
}
for (let i=0;i<Object.keys(HIGGS_UPGS).length;i++) {
	let name = Object.keys(HIGGS_UPGS)[i]
	TMP_DATA.ELS.push("higgs"+name)
}

for (let i=0;i<Object.keys(SCALING_STARTS).length;i++) {
	TMP_DATA.ELS.push(Object.keys(SCALING_STARTS)[i]+"Stat")
}
for (let i=1;i<=TREE_AMT;i++) TMP_DATA.ELS.push("tree"+i)
for (let i=1;i<=TOTAL_STR;i++) {
	if (i>1) TMP_DATA.ELS.push("str"+i)
	TMP_DATA.ELS.push("str"+i+"amt")
	TMP_DATA.ELS.push("str"+i+"eff")
	TMP_DATA.ELS.push("str"+i+"gain")
}