const NEWS_DATA = {
	// No Conditions
	m1: ["Welcome to the truest of travels."],
	m2: ["We of the news ticker committee say hi."],
	m3: ["Accelerate from here to the end of the universe."],
	m4: ["Maximum Velocity is the scourge of the multiverse."],
	m5: ["Cancer notation has been kept away for now..."],
	m6: ["Try to win without achievements"],
	m7: ["You have probably ran over at least 1 snail so far on your journey"],
	m8: ["If you want to be cursed, try Engineering Notation, which doesn't exist"],
	m9: ["There is no True Infinity here"],
	m10: ["Try a byte of binary notation!"],
	m11: ["Pentation is for the weak"],
	m12: ["If you can see this, you are officially Canadian"],
	m13: ["5 lighthours until the update"],
	m14: ["You should try Absurd Mode, you might have fun"],
	m15: ["Never gonna give you down, never gonna let you up - Ack Ristley"],
	
	// Distance-based Conditions
	d1: ["You've travelled more than me today", function() {return player.distance.gte(500)}],
	d2: ["The world is your pebble", function() {return player.distance.gte(DISTANCES.ly)}],
	d3: ["I guess multiple universes exist then", function() {return player.distance.gte(DISTANCES.uni)}],
	d4: ["To Infinity and beyond!", function() {return player.distance.gte(ExpantaNum.mul(DISTANCES.uni, Number.MAX_VALUE))}],
	
	// Mode-based Conditions
	mod1: ["How could you do this to yourself??", function() {return player.modes.includes("hard")}],
	mod2: ["No more achievement grinding for you, buddy", function() {return player.modes.includes("aau")}],
	mod3: ["This mode is the most boring...", function() {return player.modes.includes("na")}],
	mod4: ["This is illegal! You cannot do this to your game!", function() {return player.modes.includes("easy")}],
	mod5: ["The oyster is your oyster is your oyster is your oyster is your oyster", function() {return player.modes.includes("extreme")}],
	mod6: ["How can you even read this?", function() {return player.modes.includes("absurd")}],
	
	// Chance-based Conditions
	c1: ["This is a rare news ticker! You win a negligible amount of minor satisfaction!", function() {return Math.random()<0.25}],
	c2: ["This is a super rare news ticker! You win a decent amount of satisfaction...", function() {return Math.random()<0.1}],
	c3: ["This is an ultra rare news ticker! You win an obscene amount of happiness!", function() {return Math.random()<0.0025}],
	c4: ["All your smarts are no chance for dumb luck", function() {return Math.random()<1e-9}],
	
	// Achievement-based Conditions
	a1: ["You're a superstar in this world of false light", function() {return player.achievements.length>=5}],
	a2: ["Wow, you are slightly dedicated", function() {return player.achievements.length>=10}],
	a3: ["Out to the world beyond the rocket", function() {return player.achievements.length>=20}],
	a4: ["Fueling from here to the grave", function() {return player.achievements.length>=30}],
	a5: ["Reversing time since 2116", function() {return player.achievements.length>=40}],
	a6: ["Death is the new life", function() {return player.achievements.length>=50}],
	a7: ["Nice", function() {return player.achievements.length==69}],
	a8: ["There is no discord in the options menu. Don't look for it please...", function() {return player.achievements.length>=80}],
	a9: ["Get back here in Absurd Mode, I dare you", function() {return player.achievements.length>=96 && !player.modes.includes("absurd")}],
	
	// Special Conditions
	s1: ["Patcail thought Jacorb took his collapse feature. But if he did then I guess Patcail should name his game Ordinal dimensions. - NiceManKSP.", function() {return player.collapse.unl}],
	s2: ["Pathogens more like coronavirus", function() {return player.pathogens.unl}]
}

const NEWS_ADJ = 110
const NEWS_TIME = 6