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
		return player.inf.unl;
	},
	elementary: function () {
		return (tmp.elm ? tmp.elm.can : false) || player.elementary.times.gt(0);
	}
};
