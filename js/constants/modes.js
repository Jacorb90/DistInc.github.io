const COMBOS = {
	hard_aau: {
		balancing: "same as hard mode, but faster",
		balanceCheck: false,
	},
	hard_na: {
		balancing: "almost balanced (late game is quite slow)",
		balanceCheck: false,
	},
	aau_na: {
		balancing: "slightly faster than normal",
		balanceCheck: false,
	},
	absurd: {
		balancing: "completely impossible",
		balanceCheck: true,
	},
	easy: {
		balancing: "balanced up to Infinity",
		balanceCheck: false,
	},
	easy_hard: {
		balancing: "balanced up to Infinity",
		balanceCheck: false,
	},
}

const MODES = {
	hard: {
		desc: "The game is harder & slower, with slight compensation to help you slowly grind to the end (this mode does have an ending).",
		balancing: "balanced up to Infinity",
		balanceCheck: false,
		combos: {
			aau: JSON.parse(JSON.stringify(COMBOS.hard_aau)),
			na: JSON.parse(JSON.stringify(COMBOS.hard_na)),
			absurd: JSON.parse(JSON.stringify(COMBOS.absurd)),
			easy: JSON.parse(JSON.stringify(COMBOS.easy_hard)),
		},
	},
	aau: {
		desc: "Start with all achievements unlocked.",
		balancing: "same as normal, but faster.",
		balanceCheck: false,
		combos: {
			hard: JSON.parse(JSON.stringify(COMBOS.hard_aau)),
			na: JSON.parse(JSON.stringify(COMBOS.aau_na)),
			absurd: JSON.parse(JSON.stringify(COMBOS.absurd)),
			easy: JSON.parse(JSON.stringify(COMBOS.easy)),
		},
	},
	na: {
		desc: "All unnecessary achievements are gone.",
		balancing: "almost balanced (late game is slow)",
		balanceCheck: false,
		combos: {
			hard: JSON.parse(JSON.stringify(COMBOS.hard_na)),
			aau: JSON.parse(JSON.stringify(COMBOS.aau_na)),
			absurd: JSON.parse(JSON.stringify(COMBOS.absurd)),
			easy: JSON.parse(JSON.stringify(COMBOS.easy)),
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
			easy: JSON.parse(JSON.stringify(COMBOS.absurd)),
		},
	},
	easy: {
		desc: "This mode is easier & faster to help you reach the end faster (this mode does have an ending).",
		balancing: "balanced up to Infinity",
		balanceCheck: false,
		combos: {
			hard: JSON.parse(JSON.stringify(COMBOS.easy_hard)),
			aau: JSON.parse(JSON.stringify(COMBOS.easy)),
			na: JSON.parse(JSON.stringify(COMBOS.easy)),
			absurd: JSON.parse(JSON.stringify(COMBOS.absurd)),
		},
	},
}