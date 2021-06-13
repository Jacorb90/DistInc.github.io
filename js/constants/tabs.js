const TABBTN_SHOWN = {
	main: function () {
		return true;
	},
	options: function () {
		return true;
	},
	statistics: function () {
		return true;
	},
	achievements: function () {
		return true;
	},
	energy: function() {
		return modeActive("hikers_dream");
	},
	rockets: function () {
		return tmp.rockets ? tmp.rockets.canRocket || player.rockets.gt(0) || player.rf.gt(0) : false;
	},
	furnace: function () {
		return modeActive("extreme") ? player.rf.gt(0) : false;
	},
	auto: function () {
		return player.automation.unl;
	},
	tr: function () {
		return player.tr.unl;
	},
	collapse: function () {
		return player.collapse.unl;
	},
	pathogens: function () {
		return player.pathogens.unl;
	},
	dc: function () {
		return player.dc.unl;
	},
	inf: function () {
		return player.inf.unl || (player.mlt.times.gt(0)&&tmp.inf.can);
	},
	elementary: function () {
		return (tmp.elm ? tmp.elm.can : false) || player.elementary.times.gt(0) || player.elementary.theory.active || player.elementary.hc.active;
	},
};

const FULL_TAB_NAMES = {
	main: "Main",
	options: "Options",
	statistics: "Statistics",
	achievements: "Achievements",
	energy: "Energy",
	rockets: "Rockets",
	furnace: "Furnace",
	auto: "Automation",
	tr: "Time Reversal",
	collapse: "Universal Collapse",
	pathogens: "Pathogens",
	dc: "Dark Circle",
	inf: "Infinity",
	elementary: "Elementary",
}

const HIDE_WHITELIST = ["main","options"]

const STAT_TABBTN_SHOWN = {
	mainStats() { return true },
	scalings() { return statScalingsShown },
	rankTiers() { return player.rank.gt(1)||player.tier.gt(0) },
}