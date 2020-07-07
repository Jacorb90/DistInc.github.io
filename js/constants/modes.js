const COMBOS = {
	hard_aau: {
		balancing: "only somewhat balanced (quite fast early-game, but quite slow late-game)",
		balanceCheck: true,
	},
	hard_na: {
		balancing: "almost balanced (late game is quite slow)",
		balanceCheck: true,
	},
	aau_na: {
		balancing: "only somewhat balanced (quite fast early-game)",
		balanceCheck: true,
	},
	absurd: {
		balancing: "completely impossible",
		balanceCheck: true,
	},
};

const MODES = {
	hard: {
		desc:
			"Time goes by 25% slower, the first two Ranks are twice as expensive, the first two Tiers require 1 extra Rank, halves maximum velocity, thirds acceleration, makes Rockets unlock 100% later, makes Rocket gain softcap instantly, makes the Rocket effect softcap sooner (^5 -> ^4.5), makes the Rocket Fuel effect weaker by 2%, makes Automation unlock 900% later, makes Scrap/Intelligence gain half as fast, makes Interval/Magnitude upgrades 33.33% weaker, makes Time Cube gain 3x slower, makes those 'Interval boosts Magnitude' upgrades 50% weaker, halves Cadaver gain after 10, makes the Cadaver effect softcap 100x sooner, makes the transfer from Cadavers to Life Essence 40% less efficient, thirds Pathogen gain, makes Pathogen upgrades slightly weaker, & makes Pathogen upgrade effects softcap instantly, but to compensate, Universal Collapse is unlocked 50x sooner and Pathogens are unlocked 5x sooner.",
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
		balancing: "almost balanced (late game is slow)",
		balanceCheck: true,
		combos: {
			hard: JSON.parse(JSON.stringify(COMBOS.hard_na)),
			aau: JSON.parse(JSON.stringify(COMBOS.aau_na)),
			absurd: JSON.parse(JSON.stringify(COMBOS.absurd)),
		},
	},
	absurd: {
		desc:
			"Ehehe... You'll see... (by the way, if you enter this mode and need to reset your save, close the game tab, enter the console on any website with the same browser that you played this game on, and type in the following: localStorage.clear(). Then re-open the game tab, and your save should be wiped completely (maybe export first).)",
		balancing: "completely impossible",
		balanceCheck: true,
		combos: {
			hard: JSON.parse(JSON.stringify(COMBOS.absurd)),
			aau: JSON.parse(JSON.stringify(COMBOS.absurd)),
			na: JSON.parse(JSON.stringify(COMBOS.absurd)),
		},
	},
};
