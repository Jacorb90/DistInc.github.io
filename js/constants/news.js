var eheheTimes = 0;
var eheheResetAmt = 0;
var eheheResetReq = 1000;
var ehehe = function() { 
	eheheTimes+=eheheResetAmt+1;
	if (eheheTimes>=eheheResetReq) return 'EHEHE '+eheheTimes+': Copy paste the following to prestige: console.log(ehehePrestige())'
	else return 'EHEHE '+eheheTimes+': Copy paste the following into the console and press enter: console.log(ehehe())' 
}
var ehehePrestige = function() {
	if (eheheTimes<eheheResetReq) return "NOT ENOUGH EHEHE, YOU NEED "+eheheResetReq;
	else {
		eheheTimes = 0
		eheheResetReq = Math.round(eheheResetReq*1.2);
		eheheResetAmt++;
		return "EHEHE PRESTIGE POINTS: "+eheheResetAmt+": Multiply EHEHE gain by "+(eheheResetAmt+1)+" (copy paste the following into the console: console.log(ehehe()))"
	}
}
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
	m46: ["And the winner is, Leonardo DiCaprio"],
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
	m74: ["Crackle comes in the egg update in 5 minutes"],
	m75: ["Does fome even exist?"],
	m76: ["There are at least 2 rick rolls in the news... can you collect them all???"],
	m77: ["&quot;It's Siivagunner, not Silvagunner&quot; - somebody that once told me that they were gonna give me up"],
	m78: ["Breaking News: Florida man starts speaking French after another news ticker tells him that he's officially Canadian"],
	m79: ["I'm gonna add some new news ticker messages, so I need ideas"],
	m80: ["Jacorbian balancing is liked now, but in 10 years, incremental games will be completable in under 3 minutes."],
	m81: ["Maybe this is a meta joke. Maybe this is a bored game dev running out of news ticker ideas. Who knows!"],
	m82: ["This game is brought to you by Jacorb, the incremental game dev who has no idea what he's doing"],
	m83: ["In an alternate universe, all the (softcapped) are replaced with (obscured), the scalings have no names, and Distance Incremental has weeklong timewalls."],
	m84: ["I wonder if you can escape the multiverse..."],
	m85: ['"Darn it, I have to restart my lore because we are not even at the thing after multiverse!" -CRG'],
	m86: ['"Canada does not exist..." -Him'],
	m87: ["Jacorb only created Hiker's Dream because he doesn't exercise."],
	m88: ["You may have noticed that there's a donate button. If you didn't, well you have noticed now!"],
	m89: ["For all the tickers saying you are Canadian: Canadian or not, you are enjoying this game."],
	m90: ["In 2073, we will be at v193.6, with over 200 prestige layers, and the game will cost over $20.00"],
	m91: ["Well yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually yes, but actually -INFINITE LOOP-"],
	m92: ["Check the console after pressing <a href='#' onclick='console.log(ehehe()); return false;'>here</a>..."],
	m93: ["Hello puny mortals. I have come back in time to tell you that this game will be dead in two days... or maybe I've come back too far?"],
	m94: ['"If I edit a message to ping, will it actually ping the user?" - New Discord User'],
	m95: ['"Sea urchins, malt? Whats next, cream pie?" - A food nerd'],
	m96: ["Jacorb finds it mind-boggling that DI was first released publicly on May 1st 2020. You'd better remember that, you might see it in a Kahoot!"],
	m97: ["Ticker: Ticker: Ticker: Ticker: Ticker: Ticker: Ticker: T- go to #spam please :)"],
	m98: ["Paradoxes 101: This statement is false."],
	m99: ["Paradoxes 201: The following statement is false. The previous statement is true."],
	m100: ["Paradoxes 301: The following statement is false. The following statement is false. The first statement is false."],
	m101: ["Jacorb's mental instability is increasing quite quickly. If he reaches 100% mental instability, the multiverse implodes."],
	m102: ["Has this game been abandoned by its developer? "+((Math.random()>0.5)?"Obviously yes.":"Definitely not.")],
	m103: ['"When is the egg update coming?" - The Almighty Orb about his own game'],
	m104: ["We're lucky that our universes were never infected, I'm sure there's some parallel multiverse out there where that's an issue..."],
	m105: ["Some people say that each multiverse does not have its own High Gods. Those people tend not to survive very long around here."],
	m106: ["Some people say that there is only one set of High Gods. Those people tend not to survive very long around here."],

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
		"Welcome to the Fome Club...",
		function() {
			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e42000000"));
		}
	],
	d9: [
		"Heya. You've been busy, huh? So, i've got a question for ya. Do you think even the worst person can change? That everybody can be a good person, if they just try? Heh heh heh he... All right. Well here's a better question. Do you wanna have a bad time? 'Cause if you take another step forward... You are REALLY not going to like what happens next. Welp. Sorry, old lady. This is why i never make promises.",
		function() {
			return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, "1e108000000"));
		}
	],
	d10: [
		"The multiverse isn't enough for you, is it?",
		function() { return player.distance.gte(DISTANCES.mlt) },
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
	mod7: [
		"If you're really a hiker, then go for a hike.",
		function () {
			return player.modes.includes("hikers_dream")
		}
	],
	mod8: [
		"Hiker's Dream was brought to you by ~reda~ (if you're angry about anything in this mode, it's his fault)",
		function () {
			return player.modes.includes("hikers_dream")
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
	c6: [
		"Your luck skills have broke the multiverse, and everything within it",
		function() {
			return Math.random() < 1e-30;
		}
	],
	c7: [
		"If you went through 1 news ticker every planck time, and waited until the end of the universe's life, you still should not see this",
		function() {
			return Math.random() < 1e-80;
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
	s23: [
		"Fome does exist!",
		function() { return player.elementary.foam.unl },
	],
	s24: [
		"Time to refoam your protofoam.",
		function() { return player.elementary.foam.maxDepth.gte(5) },
	],
	s25: [
		"Entropy is the arrow of time, leading you to the future (hopefully it doesn't take you too far into the future)",
		function() { return player.elementary.entropy.unl },
	],
	s26: [
		"I guess it's time to sacrifice your Fermions into Skyrmions!",
		function() { return player.elementary.sky.unl },
	],
	s27: [
		"This isn't an Aarex game, there is no Elementary News Ticker...",
		function() { return player.elementary.particles.gt(0) },
	],
	s28: [
		"Believe it or not, the news ticker is this game's only source of RNG.",
		function() { return player.distance.gte(1e86)&&player.distance.lte("1e10000") },
	],
	s29: [
		"This message started at the exact moment you reached the end of the multiverse!",
		function() { return !player.ended&&player.distance.gte(DISTANCES.mlt) },
	],
	s30: [
		"Wow you completed TV20, a completely meaningless quest that got you no reward. How do you feel now?",
		function() { return player.elementary.theory.depth.gt(20) },
	],
	s31: [
		"Gonna transfoam myself to Skyrmions!",
		function() { return player.elementary.sky.unl },
	],
	s32: [
		"Florida Man tried to reach the end of multiverse, but dissolved into 3 quantum fields.",
		function() { return player.elementary.foam.unl },
	],
	s33: [
		'"Elementary is cool, it has hadronic challenged me to make up theories and has brought to photonic light a new meme: fome, I must go now, my skyrmions need me." - A really punny guy',
		function() { return player.elementary.sky.unl },
	],
	s34: [
		"No wait please, don't obliterate the multiverse, I need it to survive!",
		function() { return player.distance.gte(DISTANCES.mlt)&&player.mlt.times.eq(0) },
	],
	s35: [
		"If the world is your oyster, then the multiverse is your ocean. That's right, you own the ocean now.",
		function() { return player.mlt.times.gt(0) },
	],
	s36: [
		'"But where are the pentogens?" - Incremental Mass fan after unlocking multiverses',
		function () {
			return player.mlt.times.gt(0)
		}
	],
	s37: [
		"lOoK iT'S cRaCKlE!?!?!?!!",
		function() { return player.inf.derivatives.amts.crackle!==undefined },
	],
	s38: [
		'"(Derivative after the latest you have unlocked) when?" - A derivative enthusiast',
		function() { return player.mlt.highestCompleted>=2 },
	],
	s39: [
		"Even the High Gods aren't perfect. Although they're supposed to look over the multiverse, there are some threats that are just... too much.",
		function() { return player.elementary.times.gte(555) && player.elementary.times.lt(777777) },
	],
	s40: [
		"There are more multiverses out there, somewhere... I wonder what sort of chaos is going on over there.",
		function() { return player.mlt.highestCompleted>=5 },
	],
};