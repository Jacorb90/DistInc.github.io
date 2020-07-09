const ELM_TABS = {
	fermions: function () {
		return true;
	},
	bosons: function () {
		return true;
	}
};

const QUARK_NAMES = ["up", "down", "charm", "strange", "top", "bottom"];
const QUARK_DESCS = {
	up: "Rocket gain is stronger.",
	down: "Cadaver gain is stronger.",
	charm: "Knowledge gain is stronger.",
	strange: "Pathogen gain is boosted by your Fermions.",
	top: "Lepton gain is faster.",
	bottom: "Ascension Power gain is faster."
};

const LEPTON_NAMES = ["electron", "muon", "tau", "netrion", "vibrino", "psi"];
const LEPTON_DESCS = {
	electron: "Perks are stronger.",
	muon: "The Cadaver effect is boosted.",
	tau: "Knowledge boosts Knowledge gain.",
	netrion: "Pathogen Upgrades are stronger.",
	vibrino: "Derivative Boosts are stronger.",
	psi: "Quark gain is faster."
};

const PHOTON_UPGS = 4;

const GLUON_COLOURS = ["r", "g", "b", "ar", "ag", "ab"];

const HIGGS_UPGS = {
	"0;0;0": {
		cost: new ExpantaNum(4e4),
		desc: "Always keep TR Upgrades, the Pathogen Upgrade automator, & the Dark Core automator. You also start with Automation unlocked.",
	},
	"1;0;0": {
		cost: new ExpantaNum(1e5),
		desc: "Unlock Auto-Robots.",
	},
	"0;1;0": {
		cost: new ExpantaNum(1e5),
		desc: "Unlock Auto-Infinity Upgrades, and Infinity Upgrades are never repealed.",
	},
	"0;0;1": {
		cost: new ExpantaNum(1e5),
		desc: "You start with 10 Endorsements on reset.",
	},
}