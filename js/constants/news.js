const NEWS_DATA = {
	// No Conditions
	m1: ["Welcome to the truest of travels."],
	m2: ["We of the news ticker committee say hi."],
	m3: ["Accelerate from here to the end of the universe."],
	m4: ["Maximum Velocity is the scourge of the multiverse."],
	m5: ["Cancer notation has been kept away for now..."],
	m6: ["Try to win without achievements"],
	m7: ["You have probably ran over at least 1 snail so far on your journey"],
	m8: ["If you want to be cursed, try Engineering Notation"],
	m9: ["There is no True Infinity here"],
	m10: ["Try a byte of binary notation!"],
	m11: ["Pentation is for the weak"],
	m12: ["If you can see this, you are officially Canadian"],
	m13: ["5 lighthours until the update"],
	m14: ["You should try Absurd Mode, you might have fun"],
	m15: ["Never gonna give you down, never gonna let you up - Ack Ristley"],
	m16: ["We report that there is a very fast man Naruto-running towards Area 51, but 5 months too late"],
	m17: ["This game was inspired by Antimatter Dimensions by Hevipelle (and its mods, especially NG+++)"],
	m18: ["Offline progression is weak here, but only because we don't want you to leave :("],
	m19: ["People say that this is unbalanced, but really it's just that all the other games are too balanced."],
	m20: ["The mysterious virus of Corvid Twenty has been dealt with (at least for now)"],
	m21: ["Why progress when you can revert back to square one?"],
	m22: ["The high gods are looking down at you (or up, maybe you're further than I thought)"],
	m23: ["If I'm not mistaken, the current date is "+new Date().toISOString().substring(0, 10)+"."],
	m24: ["Egg is the next mechanic"],
	m25: ["This game doesn't lag, your eyeballs are just too dilated."],
	m26: ["Please don't disable the news, it's my only way to get my voice heard..."],
	m27: ["Now that we use OmegaNum, we have become ordinals."],
	m28: ["There is a timewall coming up, I can just sense it."],
	m29: ["Bad testing"],
	m30: ["Click <a href='https://www.youtube.com/watch?v=lXMskKTw3Bc' style='color: grey;'>here</a> to unlock something special..."],
	m31: ['"Can you make this a news ticker?" - The guy who made Tree Game'],
	m32: ['"Ya like jazz?" - BBB'],
	m33: ["Remember to export often!"],
	m34: ["Gotta wonder what you're using to travel this far"],
	m35: ["BREAKING NEWS: Florida Man goes out for a jog: becomes High God of the Omniverse"],
	m36: ["This feature is definitely not a ripoff of anything else..."],
	m37: ["This is not the 69th news ticker"],
	m38: ["If you saw the loading screen, I know, it's really creative."],
	m39: ["If you can see this, get back to playing the game"],
	m40: ["There is a news ticker entry out there that has apparently tried to rick roll people. So far only they have 1 known victim."],
	m41: ["What if you wanted to go to heaven, but god said <span class='sc'>(softcapped)</span>"],
	m42: ["Softcapped: the game"],
	m43: ['"Playing the game 5 times is fun" - Bugged out Ink'],
	m44: ['"Gaming." - Danny DeVito'],
	m45: ['"I need a raise" - Ink after wasting his life actually enjoying something'],
	m46: ["And the winner is, Leonardo DiCarlo"],
	m47: ['"But thats just a theory, a game theory!"- Matpat'],
	m48: ['"But thats just a theory, a film theory!"- Matpat'],
	m49: ['"But thats just a theory, a food theory!"- Patmat'],
	m50: ['"Nont" - Jacorb after 5 hours has passed'],
	m51: ["The most recent feature of Distance Incremental is not a ripoff, or at least you can't prove that in court"],
	m52: ["I should make a mod of Antimatter Dimensions that releases Reality before Hevipelle does..."],
	m53: ["Maybe you're actually Slabdrill and just don't realize it"],
	m54: ["Kirb is still faster than you"],
	m55: ["Hotkeys are the latest fashion trend"],
	m56: ["Mom, look! I'm on the news!"],
	m57: ["Are we getting paid for this?"],
	m58: ['"If you stare too long at the ticker, the ticker stares back at you" - Some guy that played Antimatter Dimensions'],
	m59: ["Are you the real Slim Shady? If so, get out of your chair as soon as you feasibly can."],
	m60: ["Click <a href='https://www.youtube.com/watch?v=xfr64zoBTAQ' style='color: grey;'>this</a> to walk 1 extra micrometer, whatever that means..."],
	m61: ['"Wait... Its all softcapped?"   "Always has been."   *Gets shot by (softcapped)*'],
	m62: ["Click <a href='#' onclick='return false;'>here</a> to make nothing happen"],
	m63: ["Due to a recent influx of news stories we have decided to make the news ticker <span class='sc'>(softcapped)</span>"],
	m64: ['"I wonder if my lore will ever catch up to the most recent update" -CRG'],
	m65: ["This message has been (softcapped) so you can't re-"],
	m66: ["Maybe try getting some distance in real life? It's just a suggestion..."],
	m67: ['"The engineers have invaded Distance Incremental and have invented their own notation! Get out while you still can!" - A Scientist'],
	m68: ['"I heard that Absurd Mode is fun, might try it out later" - Some new player who just finished normal mode'],
	m69: ['"Nice." - The guy who made the 69th news ticker message'],
	m70: ["A softcapped is you!"],
	m71: ['"Absurd mode is just dumb." - A reddit user'],
	m72: ['I tried looking for some inflation, but suddenly I heard a quiet yet scary noise: "softcapped"'],
	m73: ["1 Star Rating: Egg isn't the next mechanic"],

	// Distance-based Conditions
	d1: [
		"You've travelled more than me today",
		function () {
			return player.distance.gte(500);
		}
	],
	d2: [
		"The world is your pebble",
		function () {
			return player.distance.gte(DISTANCES.ly);
		}
	],
	d3: [
		"I guess multiple universes exist then",
		function () {
			return player.distance.gte(DISTANCES.uni);
		}
	],
	d4: [
		"To Infinity and beyond!",
		function () {
			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, Number.MAX_VALUE));
		}
	],
	d5: [
		"You are a very dedicated addict",
		function () {
			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e100000"));
		}
	],
	d6: [
		"Stop grinding or you'll go insane within the next 5 hours!",
		function () {
			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e2000000"));
		}
	],
	d7: [
		"Uni sounds like a prestige currency",
		function () {
			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, 5));
		}
	],
	d8: [
		"The new feature in v1.8 will be <span style='color: white;'>Quantum Foam</span>",
		function() {
			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e42000000"));
		}
	],

	// Mode-based Conditions
	mod1: [
		"How could you do this to yourself??",
		function () {
			return player.modes.includes("hard");
		}
	],
	mod2: [
		"No more achievement grinding for you, buddy",
		function () {
			return player.modes.includes("aau");
		}
	],
	mod3: [
		"This mode is the most boring...",
		function () {
			return player.modes.includes("na");
		}
	],
	mod4: [
		"This is illegal! You cannot do this to your game!",
		function () {
			return player.modes.includes("easy");
		}
	],
	mod5: [
		"The oyster is your oyster is your oyster is your oyster is your oyster",
		function () {
			return player.modes.includes("extreme");
		}
	],
	mod6: [
		"How can you even read this?",
		function () {
			return player.modes.includes("absurd");
		}
	],

	// Chance-based Conditions
	c1: [
		"This is a rare news ticker! You win a negligible amount of minor satisfaction!",
		function () {
			return Math.random() < 0.25;
		}
	],
	c2: [
		"This is a super rare news ticker! You win a decent amount of satisfaction...",
		function () {
			return Math.random() < 0.1;
		}
	],
	c3: [
		"This is an ultra rare news ticker! You win an obscene amount of happiness!",
		function () {
			return Math.random() < 0.0025;
		}
	],
	c4: [
		"All your smarts are no chance for dumb luck",
		function () {
			return Math.random() < 1e-9;
		}
	],
	c5: [
		"Your luck skills have broke the universe",
		function () {
			return Math.random() < 1e-15;
		}
	],

	// Achievement-based Conditions
	a1: [
		"You're a superstar in this world of false light",
		function () {
			return player.achievements.length >= 5;
		}
	],
	a2: [
		"Wow, you are slightly dedicated",
		function () {
			return player.achievements.length >= 10;
		}
	],
	a3: [
		"Out to the world beyond the rocket",
		function () {
			return player.achievements.length >= 20;
		}
	],
	a4: [
		"Fueling from here to the grave",
		function () {
			return player.achievements.length >= 30;
		}
	],
	a5: [
		"Reversing time since 2116",
		function () {
			return player.achievements.length >= 40;
		}
	],
	a6: [
		"Death is the new life",
		function () {
			return player.achievements.length >= 50;
		}
	],
	a7: [
		"Nice",
		function () {
			return player.achievements.length == 69;
		}
	],
	a8: [
		"There is no discord in the options menu. Don't look for it please...",
		function () {
			return player.achievements.length >= 80;
		}
	],
	a9: [
		"Get back here in Absurd Mode, I dare you",
		function () {
			return player.achievements.length >= 96 && !player.modes.includes("absurd");
		}
	],

	// Special Conditions
	s1: [
		"Patcail thought Jacorb took his collapse feature. But if he did then I guess Patcail should name his game Ordinal Dimensions. - NiceManKSP",
		function () {
			return player.collapse.unl;
		}
	],
	s2: [
		"Pathogens more like coronavirus",
		function () {
			return player.pathogens.unl;
		}
	],
	s3: [
		"The universe was calm, but then the Pathogen Nation attacked.",
		function () {
			return player.elementary.times.gt(0);
		}
	],
	s4: [
		"Leptons sound like a soft drink - Mark's Rival's Rival",
		function () {
			return player.elementary.times.gt(0);
		}
	],
	s5: [
		"The Bosons will Gauge out your eyes",
		function () {
			return player.elementary.times.gt(0);
		}
	],
	s6: [
		"The news ticker committee notice that you are starting to move. They are not quite afraid just yet.",
		function () {
			return player.inf.endorsements.gt(0);
		}
	],
	s7: [
		"We released the Higgs Update before Aarex! Yay!",
		function () {
			return player.elementary.times.gt(0);
		}
	],
	s8: [
		"Weren't we already using those?",
		function () {
			return player.rockets.gt(0);
		}
	],
	s9: [
		"It's time to grind some Elementaries!",
		function () {
			return player.elementary.times.gte(3);
		}
	],
	s10: [
		"NASA can't afford to fund you anymore.",
		function () {
			return player.tr.cubes.gt(0);
		}
	],
	s11: [
		'"1/5 no botbot" - Guy after unlocking the Auto-Robots Automator',
		function () {
			return player.automators["robots"]
		}
	],
	s12: [
		'"To elementary, and beyond!" - Buzz e600k uni',
		function () {
			return player.distance.gte("1e600027")
		}
	],
	s13: [
		'"I want more PP" - Guy who completes the game and sees no Pantheon Boosts',
		function () {
			return player.inf.pantheon.unl
		}
	],
	s14: [
		"What if crackle is an affiliate of Slabdrill?",
		function () {
			return player.inf.derivatives.unl
		},
	],
	s15: [
		"Accelerons were your biggest mistake",
		function () {
			return player.elementary.theory.accelerons.unl
		},
	],
	s16: [
		"We were originally planning on giving a pg-3 rating for this game, but after Cadavers were added, we have decided to up it to 18+",
		function () {
			return player.collapse.cadavers.gt(0)
		},
	],
	s17: [
		"You have achieved true lightspeed!",
		function () {
			return player.bestV.gte(299792458)
		},
	],
	s18: [
		"Physics can no longer hold me down!",
		function () {
			return player.bestV.gte(299792458*1.1)
		},
	],
	s19: [
		'"But where are the replicants?" - NG+++ fan after unlocking preons',
		function () {
			return player.elementary.theory.preons.unl
		}
	],
	s20: [
		"This is a crime against Reality.",
		function () {
			return player.inf.pantheon.purge.active && !player.inf.stadium.current=="reality"
		}
	],
	s21: [
		'"Help" - People who realized that Cadavers are just bodies',
		function () {
			return player.collapse.cadavers.gt(0)
		}
	],
	s22: [
		"Wait, Ordinal Dimensions is taken?",
		function () {
			return player.collapse.unl;
		}
	],
};

const NEWS_ADJ = 110;
const NEWS_TIME = 8;
