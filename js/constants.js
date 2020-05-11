// Default Values

const DEFAULT_START = {
	tab: "main",
	optionsTab: "saving",
	achievements: [],
	options: {
		sf: 5,
	},
	modes: [],
	time: new Date().getTime(),
	distance: new ExpantaNum(0),
	velocity: new ExpantaNum(0),
	rank: new ExpantaNum(1),
	tier: new ExpantaNum(0),
	rockets: new ExpantaNum(0),
	rf: new ExpantaNum(0),
	automation: {
		unl: false,
		scraps: new ExpantaNum(0),
		intelligence: new ExpantaNum(0),
		robots: {},
		open: "none",
	},
	tr: {
		unl: false,
		active: false,
		cubes: new ExpantaNum(0),
		upgrades: [],
	},
	collapse: {
		unl: false,
		cadavers: new ExpantaNum(0),
		lifeEssence: new ExpantaNum(0),
	},
	pathogens: {
		unl: false,
		amount: new ExpantaNum(0),
		upgrades: {
			1: new ExpantaNum(0),
			2: new ExpantaNum(0),
			3: new ExpantaNum(0),
			4: new ExpantaNum(0),
			5: new ExpantaNum(0),
			6: new ExpantaNum(0),
			7: new ExpantaNum(0),
			8: new ExpantaNum(0),
			9: new ExpantaNum(0),
			10: new ExpantaNum(0),
		},
	},
	dc: {
		unl: false,
		matter: new ExpantaNum(0),
		energy: new ExpantaNum(0),
		fluid: new ExpantaNum(0),
		cores: new ExpantaNum(0),
	},
}

// Temp Data

const TMP_DATA = {
	ELS: ["distance", "velocity", "maxVel", "acceleration", "rank", "rankUp", "rankDesc", "rankReq", "tier", "tierUp", "tierDesc", "tierReq", "rocketReset", "rocketGain", "rocketsAmt", "rocketsEff", "nextFeature", "achDesc", "rf", "rfReset", "rfReq", "rfEff", "scraps", "intAmt", "rankbot", "tierbot", "fuelbot", "robotTab", "robotName", "robotInterval", "robotMagnitude", "buyRobotInterval", "buyRobotMagnitude", "rt", "tc", "frf", "ts", "collapseReset", "cadaverGain", "cadavers", "cadaverEff", "sacrificeCadavers", "lifeEssence", "robotMax", "body", "rocketGainSC", "rocketEffSC", "timeCubeEffSC", "cadaverGainSC", "cadaverEffSC", "pathogensAmt", "tdeEff", "rankName", "tierName", "rfName", "pthUpgPow", "pthGainSC", "sf"],
}

// Formatting Data

const DISTANCES = {
	cm: 1/100,
	m: 1,
	km: 1e3,
	Mm: 1e6,
	Gm: 1e9,
	Tm: 1e12, 
	Pm: 1e15,
	ly: 9.461e15,
	pc: 3.086e16,
	kpc: 3.086e19,
	Mpc: 3.086e22,
	Gpc: 3.086e25,
	uni: 4.4e26,
}

const TIMES = {
	ms: 1/1000,
	s: 1,
	m: 60,
	h: 3600,
	d: 86400,
	w: 604800,
	y: 31556736,
	mil: 31556736000,
}

// Ranks

const RANK_DESCS = {
	1: "increase the maximum velocity by 1m/s.",
	2: "increase the acceleration and maximum velocity by 10% for each rank up.",
	3: "double your acceleration.",
	4: "triple your acceleration & maximum velocity for each tier up.",
	5: "increase the acceleration and maximum velocity by 97.5% for each rank up.",
	8: "increase your maximum velocity by 10% for each rank up.",
	10: "double your acceleration.",
	14: "multiply your acceleration & maximum velocity by (n+1)^1.6, where n is your rocket fuel.",
	15: "quadruple your acceleration.",
	20: "double intelligence gain.",
	25: "multiply your acceleration by 10.",
	30: "triple intelligence gain.",
	35: "time goes by 50% faster.",
	40: "multiply intelligence gain by the number of primes less than or equal to your scrap amount (minimum 1, softcaps after 1,000,000,000 primes).",
	45: "time goes by 80% faster.",
	50: "multiply your acceleration by 15.",
	55: "double your maximum velocity for each rank up.",
	60: "double scrap gain.",
	70: "time goes by 40% faster.",
	75: "multiply your acceleration by 25.",
	80: "time goes by 50% faster.",
	90: "time goes by 75% faster.",
	100: "double rocket gain.",
	111: "double intelligence gain for each rank up.",
	125: "time goes by 50% faster.",
	150: "time goes by 55% faster.",
	175: "time goes by 60% faster.",
	200: "time goes by 70% faster.",
	250: "time goes by 80% faster.",
	300: "time goes by 90% faster.",
	500: "time goes by 95% faster.",
	1000: "time goes by 98% faster.",
	10000: "time goes by 100% faster.",
}

const DEFAULT_RANK_DESC = "rank up."

// Tiers

const TIER_DESCS = {
	0: "make the rank requirement formula 25% slower.",
	1: "double your acceleration and quintuple your maximum velocity if you are at least Rank 3.",
	2: "make the rank requirement formula 10% slower for each tier up.",
	3: "triple your acceleration.",
	4: "double intelligence gain.",
	5: "quintuple your acceleration.",
	6: "time goes by 50% faster.",
	7: "time goes by 10% faster for each rocket fuel.",
	8: "multiply your acceleration by 10.",
	9: "intelligence boosts maximum velocity.",
	10: "multiply your acceleration by 15.",
	12: "triple intelligence gain.",
	13: "quadruple intelligence gain.",
	15: "multiply your acceleration by 25.",
	16: "time goes by 60% faster.",
	18: "time goes by 80% faster.",
	20: "time goes by 100% faster.",
}

const DEFAULT_TIER_DESC = "tier up."

// Layers

const LAYER_RESETS = {
	rank: ["distance", "velocity"],
	tier: ["distance", "velocity", "rank"],
	rockets: ["distance", "velocity", "rank", "tier"],
	rf: ["rockets"],
	collapse: ["distance", "velocity", "rank", "tier", "rockets", "rf", "tr"],
}

const LAYER_REQS = {
	rank: ["distance", 10],
	tier: ["rank", 3],
	rockets: ["distance", 5e7],
	rf: ["rockets", 25],
	collapse: ["distance", 50*DISTANCES.Mpc],
}

const LAYER_FP = {
	rank: 1,
	tier: 1,
	rockets: 0.4,
	rf: 1,
	collapse: 0.1,
}

const LAYER_SC = {
	rank: new ExpantaNum(1/0),
	tier: new ExpantaNum(1/0),
	rockets: new ExpantaNum(1e5),
	rf: new ExpantaNum(1/0),
	collapse: new ExpantaNum(100),
}

// Tab Data

const TABBTN_SHOWN = {
	main: function() { return true },
	options: function() { return true },
	achievements: function() { return true },
	rockets: function() { return (tmp.rockets ? (tmp.rockets.canRocket||player.rockets.gt(0)||player.rf.gt(0)) : false) },
	auto: function() { return player.automation.unl },
	tr: function() { return player.tr.unl },
	collapse: function() { return player.collapse.unl },
	pathogens: function() { return player.pathogens.unl },
	dc: function() { return player.dc.unl },
}

// Achievements

const ACH_DATA = {
	rows: 7,
	cols: 8,
	names: {
		11: "Quick Sprint",
		12: "Better Shoes",
		13: "Extreme Workout",
		14: "Off to Space!",
		15: "Rocket Blast",
		16: "Humans are Irrelevant",
		17: "Yet you're still moving forward.",
		18: "Intentional Death",
		
		21: "Driving for Hours",
		22: "Oil Change",
		23: "Three's the Lucky Number",
		24: "Blastoff Again?",
		25: "Refuel",
		26: "Automated Evolution",
		27: "Time of the Fittest",
		28: "Piling the Bodies",
		
		31: "Just Under 1 Saturn Revolution",
		32: "Putting in the Fake Fuel",
		33: "IV Test",
		34: "Why fly once when you can fly ten times?",
		35: "Triple the Fuel",
		36: "Automated Power Boosts",
		37: "That's so many?",
		38: "The Pain is Real",
		
		41: "Parallax Time to the Tenth",
		42: "Strong Winds",
		43: "Like the drink",
		44: "Now this is just pointless.",
		45: "Not Quite 9000",
		46: "A magnet's work.",
		47: "Gotta buy em all!",
		48: "Super Smart",
		
		51: "Out of this World",
		52: "Taking up all the space.",
		53: "2+2=10",
		54: "Cacophany of Pain",
		55: "Zooming at the Speed of Sound",
		56: "Auto-Gas",
		57: "No More Thinking",
		58: "The Multiverse is Ever-Expanding",
		
		61: "Jimmy the Crow's Debut",
		62: "Alive Plus",
		63: "Time Doesn't Exist",
		64: "Acceleration does nothing.",
		65: "One Death",
		66: "I thought that was a lot?",
		67: "Atoms in the universe, of universes.",
		68: "Corvid Twenty",
		
		71: "The Infinite Satanic Cult Of Orderly Layers",
	},
	descs: {
		11: "Go at least 100m.",
		12: "Do a rank reset.",
		13: "Do a tier reset.",
		14: "Do a rocket reset.",
		15: "Get at least 1 rocket fuel.",
		16: "Unlock automation.",
		17: "Unlock Time Reversal.",
		18: "Perform a Universal Collapse reset.",
		
		21: "Go at least 500km.",
		22: "Reach Rank 8.",
		23: "Reach Tier 3.",
		24: "Reach 2 Rockets.",
		25: "Get at least 2 rocket fuel.",
		26: "Unlock Rankbot.",
		27: "Reach 1000 Time Cubes.",
		28: "Reach 66 Cadavers.",
		
		31: "Go at least 1Tm",
		32: "Reach Rank 12",
		33: "Reach Tier 4",
		34: "Reach 10 Rockets.",
		35: "Get at least 3 rocket fuel.",
		36: "Unlock Tierbot.",
		37: "Purchase 5 Time Reversal Upgrades.",
		38: "Reach all 12 Collapse Milestones.",
		
		41: "Go at least 10pc.",
		42: "Reach Rank 20",
		43: "Reach Tier 5.",
		44: "Reach 1e+5 Rockets.",
		45: "Get at least 6 normal rocket fuel.",
		46: "Reach 5000 scraps.",
		47: "Purchase 10 Time Reversal Upgrades.",
		48: "Reach 1e+10 intelligence.",
		
		51: "Go at least 1uni.",
		52: "Reach 1e+8 Rockets.",
		53: "Get at least 10 normal rocket fuel.",
		54: "Reach 1e+7 Time Cubes.",
		55: "Get a Time Speed above 1e+5x.",
		56: "Unlock Fuelbot.",
		57: "Reach 9e15 Time Cubes.",
		58: "Go at least 2.22e22uni.",
		
		61: "Unlock Pathogens.",
		62: "Reach 1e+6 Life Essence.",
		63: "Reach 1e28 Time Cubes.",
		64: "Reach Rank 50.",
		65: "Reach 5e+7 Cadavers.",
		66: "Get Fuelbot's interval less than or equal to 2 minutes.",
		67: "Reach 1e80uni.",
		68: "Get 1 of each of the 10 Pathogen upgrades.",
		
		71: "Unlock The Dark Circle.",
	},
	rewards: {
		12: "Acceleration is 10% higher.",
		14: "Acceleration & Maximum Velocity are 50% higher.",
		15: "Rocket gain is increased by 5%.",
		17: "Time goes by 1% faster.",
		18: "Time goes by 50% faster.",
		
		21: "Maximum Velocity is 10% higher.",
		23: "Acceleration is 20% higher.",
		24: "Maximum Velocity is 25% higher.",
		26: "Rocket gain is increased by 10%.",
		27: "Time goes by 10% faster.",
		
		32: "Acceleration is 80% higher.",
		34: "Rocket gain is increased by 10%.",
		35: "Acceleration is 80% higher.",
		36: "Scrap & intelligence gain are increased by 50%.",
		38: "Cadaver gain is doubled.",
		
		41: "Maximum Velocity is 50% higher.",
		43: "The Rank requirement formula is 2.5% slower.",
		44: "Rocket gain is increased by 15%.",
		46: "Intelligence gain is doubled.",
		47: "Time goes by 50% faster.",
		48: "You can buy max robot upgrades.",
		
		51: "Maximum Velocity is 50% higher.",
		52: "Time goes by 20% faster.",
		55: "You gain 10% more Time Cubes.",
		57: "Time goes by 10% faster.",
		58: "The Rocket Fuel reset only resets Rockets to 50% of their current amount.",
		
		61: "Maximum Velocity is 60% higher.",
		63: "Time Speed boosts Pathogen gain at a reduced rate.",
		65: "Cadaver gain is increased by 40%.",
		67: "Time goes by 11.11% faster.",
		68: "Pathogen gain is 1% faster.",
	},
}

// Automation

const AUTO_UNL = new ExpantaNum(1e12)
const ROBOT_REQS = {
	rankbot: new ExpantaNum(10),
	tierbot: new ExpantaNum(50),
	fuelbot: new ExpantaNum(1e6),
}
const ROBOT_COST_INC = {
	interval: {
		rankbot: new ExpantaNum(7),
		tierbot: new ExpantaNum(8),
		fuelbot: new ExpantaNum(15),
	},
	magnitude: {
		rankbot: new ExpantaNum(3),
		tierbot: new ExpantaNum(4),
		fuelbot: new ExpantaNum(12),
	},
}
const ROBOT_COST_START = {
	interval: {
		rankbot: new ExpantaNum(2),
		tierbot: new ExpantaNum(2),
		fuelbot: new ExpantaNum(1e5),
	},
	magnitude: {
		rankbot: new ExpantaNum(1),
		tierbot: new ExpantaNum(1),
		fuelbot: new ExpantaNum(4e5),
	},
}
const ROBOT_START_INTERVAL = {
	rankbot: new ExpantaNum(4),
	tierbot: new ExpantaNum(5),
	fuelbot: new ExpantaNum(3600),
}
const ROBOT_FL = {
	rankbot: "ranks",
	tierbot: "tiers",
	fuelbot: "rf",
}

// Time Reversal

const TR_UPGS = {
	1: { cost: new ExpantaNum(50), desc: "Increase Time Cube gain by 10% for each Rank or Tier." },
	2: { cost: new ExpantaNum(300), desc: "Time goes by (log(n+1)) times faster, where n is your Time Cubes." },
	3: { cost: new ExpantaNum(1000), desc: "The Rank requirement formula is 10% slower." },
	4: { cost: new ExpantaNum(2500), desc: "Time Cube gain is increased by 33% for every OoM of Rockets (softcaps at 1e+10 Rockets)." },
	5: { cost: new ExpantaNum(15000), desc: "Rocket Fuel is 10% stronger." },
	6: { cost: new ExpantaNum(25000), desc: "Scrap & Intelligence gain are increased by 10% for every OoM of Time Cubes." },
	7: { cost: new ExpantaNum(40000), desc: "Time goes by 5% faster for every achievement gotten." },
	8: { cost: new ExpantaNum(75000), desc: "Rankbot's interval boosts its magnitude." },
	9: { cost: new ExpantaNum(1.2e5), desc: "Tierbot's interval boosts its magnitude, but not as strongly as the previous upgrade." },
	10: { cost: new ExpantaNum(2e5), desc: "Rocket gain is increased by 10% for every OoM of Time Cubes (softcaps at 1e+10 Time Cubes)." },
}
const TR_UPG_AMT = Object.keys(TR_UPGS).length
	
// Universal Collapse

const COLLAPSE_UNL = new ExpantaNum(50*DISTANCES.Mpc)
const ESSENCE_MILESTONES = {
	1: { req: new ExpantaNum(1), desc: "Time goes by 100x faster, but this gets weaker the further you go (minimum 2x, at 50Mpc)." },
	2: { req: new ExpantaNum(2), desc: "Time goes by 5x faster." },
	3: { req: new ExpantaNum(3), desc: "Start with 10 Rockets on reset." },
	4: { req: new ExpantaNum(5), desc: "Start with 1 Rocket Fuel on reset." },
	5: { req: new ExpantaNum(10), desc: "Unlock Fuelbot, and Cadaver gain is boosted by Time Cubes." },
	6: { req: new ExpantaNum(15), desc: "Gain 10x more Rockets." },
	7: { req: new ExpantaNum(25), desc: "Keep Time Reversal upgrades on reset." },
	8: { req: new ExpantaNum(50), desc: "Time Speed multiplies Rocket gain at a reduced rate." },
	9: { req: new ExpantaNum(75), desc: "Gain 1% of Rocket gain every second (does nothing when Time is Reversed, but unaffected by Time Speed)." },
	10: { req: new ExpantaNum(100), desc: "Life Essence boosts Cadaver gain." },
	11: { req: new ExpantaNum(1000), desc: "Tiers do not reset Ranks." },
	12: { req: new ExpantaNum(10000), desc: "Ranks do not reset anything." },
}
const EM_AMT = Object.keys(ESSENCE_MILESTONES).length

// Modes

const COMBOS = {
	hard_aau: {
		balancing: "only somewhat balanced (quite fast early-game, but quite slow late-game)",
		balanceCheck: true,
	},
	hard_na: {
		balancing: "completely balanced",
		balanceCheck: false,
	},
	aau_na: {
		balancing: "only somewhat balanced (quite fast early-game)",
		balanceCheck: true,
	},
	absurd: {
		balancing: "completely impossible",
		balanceCheck: true,
	},
}

const MODES = {
	hard: {
		desc: "Time goes by 25% slower, the first two Ranks are twice as expensive, the first two Tiers require 1 extra Rank, halves maximum velocity, thirds acceleration, makes Rockets unlock 100% later, makes Rocket gain softcap instantly, makes the Rocket effect softcap sooner (^5 -> ^4.5), makes the Rocket Fuel effect weaker by 2%, makes Automation unlock 900% later, makes Scrap/Intelligence gain half as fast, makes Interval/Magnitude upgrades 33.33% weaker, makes Time Cube gain 3x slower, makes those 'Interval boosts Magnitude' upgrades 50% weaker, halves Cadaver gain after 10, makes the Cadaver effect softcap 100x sooner, makes the transfer from Cadavers to Life Essence 40% less efficient, thirds Pathogen gain, makes Pathogen upgrades slightly weaker, & makes Pathogen upgrade effects softcap instantly, but to compensate, Universal Collapse is unlocked 50x sooner and Pathogens are unlocked 5x sooner.",
		balancing: "completely balanced (albeit quite slow)",
		balanceCheck: false,
		combos: {
			aau: JSON.parse(JSON.stringify(COMBOS.hard_aau)),
			na: JSON.parse(JSON.stringify(COMBOS.hard_na)),
			absurd: JSON.parse(JSON.stringify(COMBOS.absurd)),
		},
	},
	aau: {
		desc: "Start with all achievements unlocked.",
		balancing: "only somewhat balanced (quite fast early-game)",
		balanceCheck: true,
		combos: {
			hard: JSON.parse(JSON.stringify(COMBOS.hard_aau)),
			na: JSON.parse(JSON.stringify(COMBOS.aau_na)),
			absurd: JSON.parse(JSON.stringify(COMBOS.absurd)),
		},
	},
	na: {
		desc: "All unnecessary achievements are gone.",
		balancing: "completely balanced (since gameplay is almost identical to normal mode)",
		balanceCheck: false,
		combos: {
			hard: JSON.parse(JSON.stringify(COMBOS.hard_na)),
			aau: JSON.parse(JSON.stringify(COMBOS.aau_na)),
			absurd: JSON.parse(JSON.stringify(COMBOS.absurd)),
		},
	},
	absurd: {
		desc: "Ehehe... You'll see...",
		balancing: "completely impossible",
		balanceCheck: true,
		combos: {
			hard: JSON.parse(JSON.stringify(COMBOS.absurd)),
			aau: JSON.parse(JSON.stringify(COMBOS.absurd)),
			na: JSON.parse(JSON.stringify(COMBOS.absurd)),
		},
	},
}

// Pathogens

const PATHOGENS_UNL = new ExpantaNum(2.5e5)
const PTH_UPGS = {
	1: { start: new ExpantaNum(5), inc: new ExpantaNum(3.5), desc: "Time Reversal Upgrade 2 is boosted by your Pathogens." },
	2: { start: new ExpantaNum(100), inc: new ExpantaNum(10), desc: "Rocket gain is boosted by your Cadavers." },
	3: { start: new ExpantaNum(100), inc: new ExpantaNum(10), desc: "Time Cube gain is boosted by your Cadavers." },
	4: { start: new ExpantaNum(800), inc: new ExpantaNum(4), desc: "Maximum Velocity is boosted by your Pathogens." },
	5: { start: new ExpantaNum(300), inc: new ExpantaNum(10/3), desc: "Boost Pathogen gain." },
	6: { start: new ExpantaNum(800), inc: new ExpantaNum(12), desc: "The transfer from Cadavers to Life Essence is more efficient." },
	7: { start: new ExpantaNum(3000), inc: new ExpantaNum(30), desc: "The rocket gain softcap starts later." },
	8: { start: new ExpantaNum(4000), inc: new ExpantaNum(40), desc: "The rocket effect softcap starts later." },
	9: { start: new ExpantaNum(6000), inc: new ExpantaNum(60), desc: "The cadaver gain softcap starts later." },
	10: { start: new ExpantaNum(8000), inc: new ExpantaNum(80), desc: "The cadaver effect softcap starts later." },
}
const PTH_AMT = Object.keys(PTH_UPGS).length

// Scaling

const SCALINGS = ["scaled"]
const SCALING_STARTS = {
	scaled: { rank: new ExpantaNum(50), tier: new ExpantaNum(8), rf: new ExpantaNum(35), pathogenUpg: new ExpantaNum(10) },
	superscaled: { rank: new ExpantaNum(100), tier: new ExpantaNum(15), rf: new ExpantaNum(100), pathogenUpg: new ExpantaNum(40) },
}

// Options

const OPT_CHNG_MAX = {
	sf: 8,
}
const OPT_CHNG_MIN = {
	sf: 3,
}

// Dark Circles

const DC_UNL = new ExpantaNum(1e128).times(DISTANCES.uni)

// Re-Update Temp Data
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