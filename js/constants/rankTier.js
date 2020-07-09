// Ranks

const RANK_DESCS = {
	1: "increase the maximum velocity by 1m/s.",
	2: "increase the acceleration and maximum velocity by 10% for each rank up.",
	3: "double your acceleration.",
	4: "triple your acceleration & maximum velocity for each tier up.",
	5: "increase the acceleration and maximum velocity by 97.5% for each rank up.",
	8: "increase your maximum velocity by 10% for each rank up.",
	10: "double your acceleration.",
	14: "multiply your acceleration & maximum velocity by (n+1)^1.6, where n is your rocket fuel.",
	15: "quadruple your acceleration.",
	20: "double intelligence gain.",
	25: "multiply your acceleration by 10.",
	30: "triple intelligence gain.",
	35: "time goes by 50% faster.",
	40: "multiply intelligence gain by the number of primes less than or equal to your scrap amount (minimum 1, softcaps after 1,000,000,000 primes).",
	45: "time goes by 80% faster.",
	50: "multiply your acceleration by 15.",
	55: "double your maximum velocity for each rank up.",
	60: "double scrap gain.",
	70: "time goes by 40% faster.",
	75: "multiply your acceleration by 25.",
	80: "time goes by 50% faster.",
	90: "time goes by 75% faster.",
	100: "double rocket gain.",
	111: "double intelligence gain for each rank up.",
	125: "time goes by 50% faster.",
	150: "time goes by 55% faster.",
	175: "time goes by 60% faster.",
	200: "time goes by 70% faster.",
	250: "time goes by 80% faster.",
	300: "time goes by 90% faster.",
	500: "time goes by 95% faster.",
	1000: "time goes by 98% faster.",
	10000: "time goes by 100% faster."
};

const DEFAULT_RANK_DESC = "rank up.";

// Tiers

const TIER_DESCS = {
	0: "make the rank requirement formula 25% slower.",
	1: "double your acceleration and quintuple your maximum velocity if you are at least Rank 3.",
	2: "make the rank requirement formula 10% slower for each tier up.",
	3: "triple your acceleration.",
	4: "double intelligence gain.",
	5: "quintuple your acceleration.",
	6: "time goes by 50% faster.",
	7: "time goes by 10% faster for each rocket fuel.",
	8: "multiply your acceleration by 10.",
	9: "intelligence boosts maximum velocity.",
	10: "multiply your acceleration by 15.",
	12: "triple intelligence gain.",
	13: "quadruple intelligence gain.",
	15: "multiply your acceleration by 25.",
	16: "time goes by 60% faster.",
	18: "time goes by 80% faster.",
	20: "time goes by 100% faster."
};

const DEFAULT_TIER_DESC = "tier up.";
