const SCALING_STARTS = {
	scaled: { rank: new ExpantaNum(50), tier: new ExpantaNum(8), rf: new ExpantaNum(35), pathogenUpg: new ExpantaNum(10), darkCore: new ExpantaNum(15) },
	superscaled: { rank: new ExpantaNum(100), tier: new ExpantaNum(15), rf: new ExpantaNum(100), pathogenUpg: new ExpantaNum(40) },
	hyper: { rank: new ExpantaNum(160), tier: new ExpantaNum(20)},
}
const SCALING_RES = {
	rank: function(n=0) { return player.rank },
	tier: function(n=0) { return player.tier },
	rf: function(n=0) { return player.rf },
	pathogenUpg: function(n=0) { return player.pathogens.upgrades[n] },
	darkCore: function(n=0) { return player.dc.cores },
}