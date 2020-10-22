// Variables

var player = transformToEN(DEFAULT_START, DEFAULT_START);
var loaded = false;
var interval;
var intervalPerSec;
var autoTimes = {};
for (let i = 0; i < Object.keys(ROBOT_REQS).length; i++) autoTimes[Object.keys(ROBOT_REQS)[i]] = new ExpantaNum(0);
var tmp = {};
var last = getCurrentTime();
var modesSelected = [];
var reloaded = false;
var ddState = "none";
var notifier = new Notifier();
var saveTimer = 0;
var showContainer = true;
var infActive = false;
var fnTab = "nfn";
var infTab = "infinity";
var elmTab = "fermions";
var bosTab = "gauge";
var hcTab = "mainHC";
var foamTab = "qf1";
var skyTab = "skyrmions";
var statTab = "mainStats";
var statScalingsShown = false;
var pionSel = 0;
var spinorSel = 0;
var ttaid = 1;
var gluonTab = "r";
var thTab = "tv";
var enTab = "mainEN";
var autoRobotTarget = 0
var betaID = "beta1.91";
var needUpdate = true
var updating = false
var visUpdTicks = 1/0
var robotActives = {}
var correctLink = "jacorb90.github.io"
var outerShiftDown = false

// Game Loops 

function tickWithoutTS(diff) {
	saveTimer += diff.toNumber();
	player.bestEnd = player.bestEnd.max(player.inf.endorsements)

	if (tmp.ach[95].has && !nerfActive("noRockets"))
		player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff));
	else if (hasCollapseMilestone(9) && !nerfActive("noRockets"))
		player.rockets = player.rockets.plus(tmp.rockets.layer.gain.times(diff.div(100)));

	if (tmp.ach[96].has && !nerfActive("noCadavers"))
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain.times(diff));
	else if (tmp.inf.upgs.has("2;4") && !nerfActive("noCadavers"))
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain.times(diff.div(100)));
	if (tmp.ach[97].has && !nerfActive("noLifeEssence"))
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(
			player.collapse.cadavers.times(tmp.collapse.sacEff).max(1).times(diff)
		);
	else if (tmp.inf.upgs.has("5;3") && !nerfActive("noLifeEssence"))
		player.collapse.lifeEssence = player.collapse.lifeEssence.plus(
			player.collapse.cadavers.times(tmp.collapse.sacEff).max(1).times(diff.div(10))
		);

	if (player.pathogens.unl)
		player.pathogens.amount = player.pathogens.amount.plus(
			adjustGen(tmp.pathogens.gain, "pathogens").times(diff)
		);
	
	if (player.dc.unl) tmp.dc.tick(diff);
	if (player.inf.unl) infTick(diff);
	if (modeActive("extreme")?tmp.fn.enh.unl:false) {
		player.furnace.enhancedCoal = player.furnace.enhancedCoal.plus(adjustGen(tmp.fn.enh.gain, "fn").times(diff));
	}
	if (player.elementary.times.gt(0)) elTick(diff);
	if (modeActive("hikers_dream")) {
		player.energy = player.energy.sub(tmp.hd.energyLoss.times(diff)).max(0);
		if (player.inf.endorsements.gte(10)) player.energy = player.energy.plus(tmp.hd.energyGen.times(diff)).min(getEnergyLim())
		player.bestMotive = player.bestMotive.max(tmp.hd.motive)
	}
	if (modeActive("extreme")&&player.elementary.sky.unl) {
		if (tmp.fn.pl.exp.gte(1)) player.plasma.amount = player.plasma.amount.root(tmp.fn.pl.exp).plus(diff).pow(tmp.fn.pl.exp);
		player.plasma.whiteFlame = player.plasma.whiteFlame.plus(adjustGen(tmp.fn.pl.wfGain, "plasma").times(diff));
	}
}

function tickWithTR(diff) {
	player.velocity = player.velocity
		.plus(adjustGen(tmp.acc, "vel").times(diff))
		.min(nerfActive("maxVelActive") ? tmp.maxVel : 1 / 0)
		.max(0);
	player.distance = player.distance.plus(adjustGen(player.velocity, "dist").times(modeActive("hikers_dream")?tmp.hd.enEff:1).times(diff)).max(0);
	let fc = futureCapped()
	if (fc) {
		player.velocity = player.velocity.min(DISTANCES.mlt)
		player.distance = player.distance.min(DISTANCES.mlt)
		if (player.distance.gte(DISTANCES.mlt)) end1point9()
	}
	player.inf.bestDist = player.inf.bestDist.max(player.distance)
	player.bestDistance = player.bestDistance.max(player.distance)
	player.bestV = player.bestV.max(player.velocity)
	player.bestA = player.bestA.max(tmp.acc)
	autoTick(diff);
	if (modeActive("extreme")) {
		if (player.rf.gt(0)) {
			player.furnace.coal = player.furnace.coal.plus(adjustGen(tmp.fn.gain, "fn").times(ExpantaNum.div(diff, (inFC(5)?tmp.timeSpeed:1)))).max(0);
		}
	}
}

function tickWithTS(diff) {
	if (player.tr.active && !nerfActive("noTimeCubes"))
		player.tr.cubes = player.tr.cubes.plus(adjustGen(getTimeCubeGain(), "tc").times(diff));
	else if (tmp.ach[72].has && player.tr.unl && !nerfActive("noTimeCubes"))
		player.tr.cubes = player.tr.cubes.plus(adjustGen(getTimeCubeGain(), "tc").times(diff.div(2)));
	if (player.inf.derivatives.unl) tmp.inf.derv.tick(diff);
	tickWithTR(diff.times(player.tr.active ? -1 : 1));
}

function gameLoop(diff) {
	visUpdTicks++
	if (needUpdate) updating = true
	updateBeforeTick();
	if (showContainer && !needUpdate && !infActive) {
		tickWithoutTS(diff);
		tickWithTS(diff.times(nerfActive("noTS") ? 1 : tmp.timeSpeed));
	}
	updateAfterTick();
	if (updating) {
		updating = false
		needUpdate = false
	}
}
