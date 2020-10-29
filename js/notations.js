var notations = {};

notations.scientific = function (val, places, locs) {
	return disp(val, places, locs, 10);
};

notations.engineering = function(val, places=(player.options.sf - 1), locs) {
	if (val.lt(0.001)) return notations.scientific(val, places, locs)
	else if (val.lt(1e3)) return decimalPlaces(val, places, val.eq(val.round()))
	else if (val.lt("1e10000")) {
		let back = val.logBase(1e3).floor().times(3)
		let front = val.div(ExpantaNum.pow(10, back))
		return decimalPlaces(front, places, val.eq(val.round()))+"e"+decimalPlaces(back, places, true)
	} else if (val.lt("ee1000")) {
		let back = val.log10().logBase(1e3).floor().times(3)
		let front = val.log10().div(ExpantaNum.pow(10, back))
		return "e"+decimalPlaces(front, places)+"e"+decimalPlaces(back, places, true)
	} else if (val.lt("eee1000")) {
		let back = val.log10().log10().logBase(1e3).floor().times(3)
		let front = val.log10().log10().div(ExpantaNum.pow(10, back))
		return "ee"+decimalPlaces(front, places)+"e"+decimalPlaces(back, places, false)
	} else return disp(val, places, locs, 10)
}

notations.standard = function (val, places, locs) {
	if (val.lt(0.001)) return notations.scientific(val, places, locs);
	else if (val.lt(1e3)) return decimalPlaces(val, places, val.eq(val.round()));
	else if (val.lt(1e33)) {
		return (
			decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places, val.eq(val.round())) +
			" " +
			STANDARD_DATA.STARTS[val.log10().sub(3).div(3).floor().toNumber()]
		);
	} else if (val.lt(1e303)) {
		return (
			decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places, val.eq(val.round())) +
			" " +
			STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()] +
			STANDARD_DATA.TENS[val.log10().sub(3).div(30).floor().toNumber()]
		);
	} else if (val.lt("1e3003")) {
		return (
			decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places) +
			" " +
			STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()] +
			STANDARD_DATA.TENS[val.log10().sub(3).div(30).mod(10).floor().toNumber()] +
			STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(300).floor().toNumber()]
		);
	} else if (val.lt(ExpantaNum.pow(10, ExpantaNum.pow(10, 63).times(3)).times(1e3))) {
		let highest = val.log10().sub(3).div(3).log10().div(3).floor().toNumber();
		let size = Math.min(locs, highest);
		let mag = decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places);
		if (mag === undefined) mag = "1";
		let txt = mag+" ";
		for (let x = highest; x > Math.max(highest - size, 0); x--) {
			let m = ExpantaNum.pow(1000, x);
			txt +=
				STANDARD_DATA.MILESTONE_PREF[val.log10().sub(3).div(m.times(3)).mod(10).floor().toNumber()] +
				STANDARD_DATA.TENS[val.log10().sub(3).div(m.times(30)).mod(10).floor().toNumber()] +
				STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(m.times(300)).mod(10).floor().toNumber()];
			txt += STANDARD_DATA.MILESTONES[x] + "-";
		}
		txt +=
			STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()] +
			STANDARD_DATA.TENS[val.log10().sub(3).div(30).mod(10).floor().toNumber()] +
			STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(300).mod(10).floor().toNumber()];
		return txt;
	} else if (val.lt(ExpantaNum.pow(10, ExpantaNum.pow(10, 303).times(3)).times(1e3))) {
		let x = val.log10().sub(3).div(3).log10().div(3).floor().toNumber();
		let mag = decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places);
		if (mag === undefined) mag = "1";
		let txt = mag;
		let m = ExpantaNum.pow(1000, x);
		txt +=
			" " +
			STANDARD_DATA.MILESTONE_PREF[val.log10().sub(3).div(m.times(3)).mod(10).floor().toNumber()] +
			STANDARD_DATA.TENS[val.log10().sub(3).div(m.times(30)).mod(10).floor().toNumber()] +
			STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(m.times(300)).mod(10).floor().toNumber()];
		txt += STANDARD_DATA.MILESTONE_TENS[Math.floor(x / 10)] + STANDARD_DATA.MILESTONES[x % 10] + "-";
		txt +=
			STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()] +
			STANDARD_DATA.TENS[val.log10().sub(3).div(30).mod(10).floor().toNumber()] +
			STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(300).mod(10).floor().toNumber()];
		return txt;
	} else if (val.lt(ExpantaNum.pow(10, ExpantaNum.pow(10, 3003).times(3)).times(1e3))) {
		let x = val.log10().sub(3).div(3).log10().div(3).floor().toNumber();
		let mag = decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places);
		if (mag === undefined) mag = "1";
		let txt = mag;
		let m = ExpantaNum.pow(1000, x);
		txt +=
			" " +
			STANDARD_DATA.MILESTONE_PREF[val.log10().sub(3).div(m.times(3)).mod(10).floor().toNumber()] +
			STANDARD_DATA.TENS[val.log10().sub(3).div(m.times(30)).mod(10).floor().toNumber()] +
			STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(m.times(300)).mod(10).floor().toNumber()];
		txt +=
			STANDARD_DATA.MILESTONE_HUNDREDS[Math.floor(x / 100)] +
			STANDARD_DATA.MILESTONE_TENS[Math.floor(x / 10) % 10] +
			STANDARD_DATA.MILESTONES[x % 10] +
			"-";
		txt +=
			STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()] +
			STANDARD_DATA.TENS[val.log10().sub(3).div(30).mod(10).floor().toNumber()] +
			STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(300).mod(10).floor().toNumber()];
		return txt;
	} else if (
		val.lt(
			STANDARD_DATA.SUPER_MS.length >
				val.div(1e3).log10().div(3).log10().sub(3).div(3).logBase(1000).floor().toNumber()
		)
	)
		return STANDARD_DATA.SUPER_MS[
			val.div(1e3).log10().div(3).log10().sub(3).div(3).logBase(1000).floor().toNumber()
		];
	else return notations.scientific(val, places, locs);
};

notations.mixed = function (val, places, locs) {
	if (val.lt(0.001)) return notations.scientific(val, places, locs);
	else if (val.lt(1e33)) return notations.standard(val, places, locs);
	else if (val.lt(ExpantaNum.pow(10, ExpantaNum.pow(10, places - 1)))) return notations.scientific(val, places, locs);
	else if (val.lt("ee33")) return "e" + notations.standard(val.log10(), places, locs);
	else return notations.scientific(val, places, locs);
};

notations.hexadecimal = function (val, places, locs) {
	return disp(val, places, locs, 16);
};

notations.binary = function (val, places, locs) {
	return disp(val, places, locs, 2);
};

notations.tetrational = function (val, places, locs) {
	if (val.eq(0)) return "0";
	else if (val.lt(1)) return "1/" + notations.tetrational(val.pow(-1), places, locs);
	else if (val.eq(1)) return "10^^0";
	else if (val.lt("10^^1000")) return "10^^" + disp(val.slog(10), places, locs);
	else return notations.scientific(val, places, locs);
};

notations.symbols = function (val, places, locs) {
	let r = disp(val, places, locs, 26);
	let c = "";
	for (let i = 0; i < r.length; i++) {
		c += String.fromCharCode(r[i].charCodeAt(0) + 10000);
	}
	return c;
};
