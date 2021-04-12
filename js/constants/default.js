const DEFAULT_START = {
	tab: "main",
	version: 2.0,
	optionsTab: "saving",
	achievements: [],
	savePos: 1,
	saveID: Math.floor(Math.random() * 9000000000000 + 1000000000000), // I know this might cause a problem since two save IDs might be the same, but there is a 1 in 10 trillion chance of it happening per save, so whatever
	options: {
		sf: 5,
		not: "scientific",
		theme: "dark",
		name: "Save #",
		autoSave: true,
		newst: true,
		elc: true,
		mltnc: false,
		mltforcetab: true,
		hideMltBtn: false,
		saveImp: "new save",
		hot: true,
		featPerc: "logarithm",
		tabsHidden: [],
		dcPulse: true,
		fonts: "courier",
		hideAch: false,
		visUpd: "every tick",
		tht: true,
		hcc: true,
		modeComboTableActive: false,
	},
	modes: [],
	time: new Date().getTime(),
	distance: new ExpantaNum(0),
	bestDistance: new ExpantaNum(0),
	bestV: new ExpantaNum(0),
	bestA: new ExpantaNum(0),
	bestEnd: new ExpantaNum(0),
	bestEP: new ExpantaNum(0),
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
		open: "none"
	},
	tr: {
		unl: false,
		active: false,
		cubes: new ExpantaNum(0),
		upgrades: []
	},
	collapse: {
		unl: false,
		cadavers: new ExpantaNum(0),
		lifeEssence: new ExpantaNum(0)
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
			11: new ExpantaNum(0),
			12: new ExpantaNum(0),
			13: new ExpantaNum(0),
			14: new ExpantaNum(0),
			15: new ExpantaNum(0)
		}
	},
	dc: {
		unl: false,
		matter: new ExpantaNum(0),
		energy: new ExpantaNum(0),
		fluid: new ExpantaNum(0),
		cores: new ExpantaNum(0)
	},
	inf: {
		unl: false,
		bestDist: new ExpantaNum(0),
		endorsements: new ExpantaNum(0),
		knowledge: new ExpantaNum(0),
		upgrades: [],
		ascension: {
			time: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
			enlightenments: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
			power: new ExpantaNum(0)
		},
		stadium: {
			current: "",
			completions: []
		},
		pantheon: {
			gems: new ExpantaNum(0),
			angels: new ExpantaNum(0),
			demons: new ExpantaNum(0),
			heavenlyChips: new ExpantaNum(0),
			demonicSouls: new ExpantaNum(0),
			hauntingEnergy: new ExpantaNum(0),
			purge: {
				unl: false,
				active: false,
				power: new ExpantaNum(0)
			}
		},
		derivatives: {
			unl: false,
			amts: {},
			unlocks: new ExpantaNum(0)
		}
	},
	automators: {},
	autoModes: {},
	autoTxt: {},
	elementary: {
		time: new ExpantaNum(0),
		times: new ExpantaNum(0),
		particles: new ExpantaNum(0),
		fermions: {
			amount: new ExpantaNum(0),
			quarks: {
				amount: new ExpantaNum(0),
				type: 1
			},
			leptons: {
				amount: new ExpantaNum(0),
				type: 1
			}
		},
		bosons: {
			amount: new ExpantaNum(0),
			gauge: {
				amount: new ExpantaNum(0),
				force: new ExpantaNum(0),
				photons: {
					amount: new ExpantaNum(0),
					upgrades: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)]
				},
				w: new ExpantaNum(0),
				z: new ExpantaNum(0),
				gluons: {
					r: { amount: new ExpantaNum(0), upgrades: [new ExpantaNum(0), new ExpantaNum(0)] },
					g: { amount: new ExpantaNum(0), upgrades: [new ExpantaNum(0), new ExpantaNum(0)] },
					b: { amount: new ExpantaNum(0), upgrades: [new ExpantaNum(0), new ExpantaNum(0)] },
					ar: { amount: new ExpantaNum(0), upgrades: [new ExpantaNum(0), new ExpantaNum(0)] },
					ag: { amount: new ExpantaNum(0), upgrades: [new ExpantaNum(0), new ExpantaNum(0)] },
					ab: { amount: new ExpantaNum(0), upgrades: [new ExpantaNum(0), new ExpantaNum(0)] }
				},
				gravitons: new ExpantaNum(0)
			},
			scalar: {
				amount: new ExpantaNum(0),
				higgs: {
					amount: new ExpantaNum(0),
					upgrades: []
				}
			}
		},
		theory: {
			unl: false,
			active: false,
			points: new ExpantaNum(0),
			depth: new ExpantaNum(0),
			bestDepth: new ExpantaNum(0),
			supersymmetry: {
				unl: false,
				squarks: new ExpantaNum(0),
				sleptons: new ExpantaNum(0),
				neutralinos: new ExpantaNum(0),
				charginos: new ExpantaNum(0),
			},
			tree: {
				unl: false,
				spent: new ExpantaNum(0),
				upgrades: {},
			},
			strings: {
				unl: false,
				amounts: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
				entangled: new ExpantaNum(0),
			},
			preons: {
				unl: false,
				amount: new ExpantaNum(0),
				boosters: new ExpantaNum(0),
			},
			accelerons: {
				unl: false,
				amount: new ExpantaNum(0),
				expanders: new ExpantaNum(0),
			},
			inflatons: {
				unl: false,
				amount: new ExpantaNum(0),
			},
		},
		hc: {
			unl: false,
			active: false,
			best: new ExpantaNum(0),
			hadrons: new ExpantaNum(0),
			claimed: new ExpantaNum(0),
			selectors: {},
		},
		foam: {
			unl: false,
			amounts: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
			maxDepth: new ExpantaNum(1),
			upgrades: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
			autoUnl: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
		},
		entropy: {
			unl: false,
			bestDepth: new ExpantaNum(1),
			amount: new ExpantaNum(0),
			best: new ExpantaNum(0),
			upgrades: [],
		},
		sky: {
			unl: false,
			amount: new ExpantaNum(0),
			pions: {
				amount: new ExpantaNum(0),
				field: {},
			},
			spinors: {
				amount: new ExpantaNum(0),
				field: {},
			},
		},
	},
	mlt: {
		times: new ExpantaNum(0),
		energy: new ExpantaNum(0),
		bestEnergy: new ExpantaNum(0),
		totalEnergy: new ExpantaNum(0),
		highestCompleted: 0,
		highestUnlocked: 0,
		active: 0,
		quiltUpgs: [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)],
		mlt1selected: [],
		mlt3selected: [],
	},
};
