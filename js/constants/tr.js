const TR_UPGS = {
	1: {
		cost: function(){
			return new ExpantaNum(50)
		},
		desc: "Increase Time Cube gain by 10% for each Rank or Tier.",
		current: function () {
			return tr1Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	2: {
		cost: function(){
			return new ExpantaNum(300)
		},
		desc: "Time goes by (log(n+1)) times faster, where n is your Time Cubes.",
		current: function () {
			return tr2Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	3: { cost: function(){return new ExpantaNum(1000)}, desc: "The Rank requirement formula is 10% slower." },
	4: {
		cost: function(){
			return new ExpantaNum(2500)
		},
		desc: "Time Cube gain is increased by 33% for every OoM of Rockets (softcaps after a while).",
		current: function () {
			return tr4Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	5: { cost: function(){return new ExpantaNum(15000)}, desc: "Rocket Fuel is 10% stronger." },
	6: {
		cost: function(){
			return new ExpantaNum(25000)
		},
		desc: "Scrap & Intelligence gain are increased by 10% for every OoM of Time Cubes.",
		current: function () {
			return tr6Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	7: {
		cost: function(){
			return new ExpantaNum(40000)
		},
		desc: "Time goes by 5% faster for every achievement gotten.",
		current: function () {
			return tr7Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	8: {
		cost: function(){
			return new ExpantaNum(75000)
		},
		desc: "Rankbot's interval boosts its magnitude.",
		current: function () {
			return tr8Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	9: {
		cost: function(){
			return new ExpantaNum(1.2e5)
		},
		desc: "Tierbot's interval boosts its magnitude, but not as strongly as the previous upgrade.",
		current: function () {
			return tr9Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	10: {
		cost: function(){
			return new ExpantaNum(2e5)
		},
		desc: "Rocket gain is increased by 10% for every OoM of Time Cubes (softcaps after a while).",
		current: function () {
			return tr10Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	11: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e70 : 1e60)
		},
		desc: "Time Cubes and Dark Flow boost each other, and Scaled Rank scaling starts 10 Ranks later.",
		current: function () {
			return tr11Eff();
		},
		disp: function (g) {
			return "Cubes: " + showNum(g.cg) + "x, Flow: " + showNum(g.dcf) + "x";
		}
	},
	12: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e105 : 1e70)
		},
		desc: "Each component of The Dark Circle boosts Dark Flow, and Scaled Tier scaling starts 2 Tiers later.",
		current: function () {
			return tr12Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	13: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e115 : 1e105)
		},
		desc: "Each component of The Dark Circle boosts Pathogen Upgrade efficiency.",
		current: function () {
			return tr13Eff();
		},
		disp: function (x) {
			return "+" + showNum(x.times(100)) + "%";
		}
	},
	14: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e123 : 1e115)
		},
		desc:
			"Tiers do not reset anything, Scaled Tier scaling starts later based on your Dark Cores, and Tiers boost Cadaver gain.",
		current: function () {
			return tr14Eff();
		},
		disp: function (g) {
			return "Tier scaling: " + showNum(g.ss) + " later, Cadavers: " + showNum(g.cd) + "x";
		}
	},
	15: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e127 : 4.56e123)
		},
		desc:
			"Scaled Rank scaling starts 32 Ranks later, and all effects of The Dark Circle are stronger based on your Dark Cores.",
		current: function () {
			return tr15Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	16: {
		cost: function(){
			return new ExpantaNum(4)
		},
		desc: "Time Cube gain & Coal gain boost each other.",
		current: function () {
			return { tc: player.furnace.coal.plus(1).log10().sqrt().plus(1), co: player.tr.cubes.plus(1) };
		},
		disp: function (g) {
			return "Cubes: " + showNum(g.tc) + "x, Coal: " + showNum(g.co) + "x";
		}
	},
	17: {
		cost: function(){
			return new ExpantaNum(10)
		},
		desc: "Blue Flame is stronger based on your Time Cubes, and getting Rocket Fuel does not reset anything.",
		current: function () {
			return player.tr.cubes.plus(1).times(10).slog(10);
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	18: {
		cost: function(){
			return new ExpantaNum(500)
		},
		desc: "Time goes by faster based on your Rank Cheapeners.",
		current: function () {
			return ExpantaNum.pow(2, player.rankCheap.sqrt());
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	19: {
		cost: function(){
			return new ExpantaNum(1e5)
		},
		desc: "Rank Cheapener-bot's interval boosts its magnitude.",
		current: function () {
			return tr19Eff();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	20: {
		cost:function(){
			return new ExpantaNum(1.5e5)
		},
		desc: "Rank Cheapeners also cheapen Tiers, but at a very reduced rate.",
		current: function () {
			return player.rankCheap.plus(1).log10().plus(1).log10().plus(1);
		},
		disp: function (x) {
			return "The tier cost increases " + showNum(x) + "x slower";
		}
	},
	21: { cost: function(){ return new ExpantaNum(1e13)}, desc: "Automate The Furnace." },
	22: {
		cost: function(){
			return new ExpantaNum(1e24)
		},
		desc: "Rank Cheapeners are stronger based on your Cadavers (not retroactive).",
		current: function () {
			return player.collapse.cadavers.plus(1).times(10).slog(10).sqrt();
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	23: {
		cost: function(){
			return new ExpantaNum(2.5e26)
		},
		desc: "Blue Flame boosts Time Speed.",
		current: function () {
			return ExpantaNum.pow(2.5, player.furnace.blueFlame);
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	24: { cost: function(){return new ExpantaNum(1.2e30)}, desc: "The 'Time Doesnt Exist' achievement effect is 75% stronger." },
	25: { cost: function(){return new ExpantaNum(1e32)}, desc: "Double the Coal effect, and quintuple Pathogen gain." },
	26: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e120 : 1e100)
		},
		desc: "Dark Flow boosts Blue Flame.",
		current: function () {
			let ret = tmp.dc.flow.max(1).log10().plus(1);
			return ret;
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	27: {
		cost: function(){
			return new ExpantaNum(1e136)
		},
		desc: "Coal boosts Pathogen Upgrade Power.",
		current: function () {
			let ret = player.furnace.coal.plus(1).times(10).slog(10).sub(1).div(5).max(0);
			if (player.tr.upgrades.includes(32)) return player.furnace.coal.plus(1).log10().plus(1).log10().div(7.5).max(ret).times(1.04);
			else return ret
		},
		disp: function (x) {
			return "+" + showNum(x.times(100)) + "%";
		}
	},
	28: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e182 : 1e162)
		},
		desc: "Coal boosts Rocket gain.",
		current: function () {
			return player.furnace.coal.plus(1).pow(0.15);
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	29: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e190 : 1e178)
		},
		desc: "Dark Fluid & Rockets boost Rocket gain.",
		current: function () {
			return player.rockets.plus(1).logBase(2).pow(player.dc.fluid.plus(1).times(10).slog(10).pow(2).max(1));
		},
		disp: function (x) {
			return showNum(x) + "x";
		}
	},
	30: {
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? 1e210 : 1e190)
		},
		desc: "Time Speed is raised to a power based on your Pathogens.",
		current: function () {
			return extremeStadiumActive("flamis", 2)?new ExpantaNum(1):player.pathogens.amount.plus(1).log10().plus(1).times(10).slog(10).pow(1.2);
		},
		disp: function (x) {
			return "^" + showNum(x);
		}
	},
	31: { cost: function(){return new ExpantaNum("1e700")}, desc: "Unlock a fourth Furnace Upgrade, the Coal effect is 80% stronger, and Time Speed is nerfed less by Extreme Mode." },
	32: { 
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? "8.8e888" : "8.8e880")
		}, 
		desc: "The above upgrade uses a better formula." 
	},
	33: { 
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? "1e1010" : "1e960")
		}, 
		desc: "The rocket effect also affects Coal gain." 
	},
	34: { 
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? "1e1275" : "1e980")
		}, 
		desc: "Time Speed is faster based on your Blue Flame.",
		current: function() {
			return ExpantaNum.pow(10, player.furnace.blueFlame.pow(1.725));
		},
		disp: function(x) {
			return showNum(x)+"x"
		},
	},
	35: { 
		cost: function(){
			return new ExpantaNum(modeActive("extreme+hikers_dream") ? "1e1500" : "1e1350")
		}, 
		desc: "Furnace Upgrade 4 works in Furnace Challenges, but it is weaker in them." 
	},
};
const TR_UPG_AMT = Object.keys(TR_UPGS).length;
