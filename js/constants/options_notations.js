// Options

const OPT_CHNG_MAX = {
	sf: 8
};
const OPT_CHNG_MIN = {
	sf: 1
};
const OPT_NAMES = {
	not: ["scientific", "engineering", "standard", "mixed", "hexadecimal", "binary", "symbols", "tetrational"],
	theme: ["normal", "dark"],
	saveImp: ["new save", "overwrite"],
	featPerc: ["logarithm", "linear"],
	fonts: ["verdana", "courier", "arial", "times", "Comic Sans MS"],
	visUpd: ["every tick", "every 2 ticks", "every 5 ticks", "every 20 ticks"],
};
const AUTOSAVE_TIME = 12;
const MAX_SAVES = 25;
const VIS_UPDS = {
	"every tick": 1,
	"every 2 ticks": 2,
	"every 5 ticks": 5,
	"every 20 ticks": 20,
}

// Notations

const STANDARD_DATA = {
	STARTS: ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
	ONES: ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
	TENS: ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Ocg", "Nog"],
	HUNDREDS: ["", "C", "Duc", "Tc", "Qac", "Qic", "Sxc", "Spc", "Occ", "Noc"],
	MILESTONE_PREF: ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
	MILESTONES: [
		"",
		"MI",
		"MC",
		"NA",
		"PC",
		"FM",
		"AT",
		"ZP",
		"YC",
		"XN",
		"VE",
		"ME",
		"DE",
		"TE",
		"TEE",
		"PE",
		"HE",
		"HPE",
		"OE",
		"EE",
		"IC"
	],
	MILESTONE_TENS: ["", "CO", "VCO", "TECO", "PCO", "HXCO", "HPCO", "OCCO", "ENCO"],
	MILESTONE_HUNDREDS: ["", "HC", "DUHC", "TUHC", "QAHC", "QIHC", "SXHC", "SPHC", "OCHC", "NOHC"],
	SUPER_MS: ["KL", "MG", "GG", "TR", "PT", "EX", "ZT", "YT", "XEN", "VK"]
};
