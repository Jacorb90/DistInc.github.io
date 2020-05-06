// Default Values

const DEFAULT_START = {
	tab: "main",
	achievements: [],
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
}

// Temp Data

const TMP_DATA = {
	ELS: ["distance", "velocity", "maxVel", "acceleration", "rank", "rankUp", "rankDesc", "rankReq", "tier", "tierUp", "tierDesc", "tierReq", "rocketReset", "rocketGain", "rocketsAmt", "rocketsEff", "nextFeature", "achDesc", "rf", "rfReset", "rfReq", "rfEff", "scraps", "intAmt", "rankbot", "tierbot", "fuelbot", "robotTab", "robotName", "robotInterval", "robotMagnitude", "buyRobotInterval", "buyRobotMagnitude", "rt", "tc", "frf", "ts", "collapseReset", "cadaverGain", "cadavers", "cadaverEff", "sacrificeCadavers", "lifeEssence", "robotMax", "body"],
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
}

// Achievements

const ACH_DATA = {
	rows: 5,
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

// Re-Update Temp Data
for (let r=1;r<=ACH_DATA.rows;r++) {
	for (let c=1;c<=ACH_DATA.cols;c++) {
		let id = r*10+c
		TMP_DATA.ELS.push("ach"+id)
	}
}
for (let i=1;i<=TR_UPG_AMT;i++) TMP_DATA.ELS.push("tr"+i)
for (let i=1;i<=EM_AMT;i++) TMP_DATA.ELS.push("lem"+i)