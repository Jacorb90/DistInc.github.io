const PATHOGENS_UNL = new ExpantaNum(2.5e5)
const PTH_UPGS = {
	1: { start: new ExpantaNum(5), inc: new ExpantaNum(3.5), desc: "Time Reversal Upgrade 2 is boosted by your Pathogens." },
	2: { start: new ExpantaNum(100), inc: new ExpantaNum(10), desc: "Rocket gain is boosted by your Cadavers." },
	3: { start: new ExpantaNum(100), inc: new ExpantaNum(10), desc: "Time Cube gain is boosted by your Cadavers." },
	4: { start: new ExpantaNum(800), inc: new ExpantaNum(4), desc: "Maximum Velocity is boosted by your Pathogens." },
	5: { start: new ExpantaNum(300), inc: new ExpantaNum(10/3), desc: "Boost Pathogen gain." },
	6: { start: new ExpantaNum(800), inc: new ExpantaNum(12), desc: "The transfer from Cadavers to Life Essence is more efficient." },
	7: { start: new ExpantaNum(3000), inc: new ExpantaNum(30), desc: "The rocket gain softcap starts later." },
	8: { start: new ExpantaNum(4000), inc: new ExpantaNum(40), desc: "The rocket effect softcap starts later." },
	9: { start: new ExpantaNum(6000), inc: new ExpantaNum(60), desc: "The cadaver gain softcap starts later." },
	10: { start: new ExpantaNum(8000), inc: new ExpantaNum(80), desc: "The cadaver effect softcap starts later." },
}
const PTH_AMT = Object.keys(PTH_UPGS).length