var notations = {}

notations.scientific = function(val, places, locs) {
	return disp(val, places, locs, 10)
}

notations.standard = function(val, places, locs) {
	if (val.lt(0.1)) return "1/"+notations.standard(val.pow(-1), places, locs)
	else if (val.lt(1e3)) return decimalPlaces(val, places)
	else if (val.lt(1e33)) {
		return decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places)+" "+STANDARD_DATA.STARTS[val.log10().sub(3).div(3).floor().toNumber()]
	} else if (val.lt(1e303)) {
		return decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places)+" "+STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()]+STANDARD_DATA.TENS[val.log10().sub(3).div(30).floor().toNumber()]
	} else if (val.lt("1e3003")) {
		return decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places)+" "+STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()]+STANDARD_DATA.TENS[val.log10().sub(3).div(30).mod(10).floor().toNumber()]+STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(300).floor().toNumber()]
	} else if (val.lt(ExpantaNum.pow(10, ExpantaNum.pow(10, 63).times(3)).times(1e3))) {
		let highest = val.log10().sub(3).div(3).log10().div(3).floor().toNumber()
		let size = Math.min(locs, highest)
		let mag = decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places)
		if (mag===undefined) mag = "1"
		let txt = mag
		for (let x=highest;x>Math.max(highest-size, 0);x--) {
			let m = ExpantaNum.pow(1000, x)
			txt += " "+STANDARD_DATA.MILESTONE_PREF[val.log10().sub(3).div(m.times(3)).mod(10).floor().toNumber()]+STANDARD_DATA.TENS[val.log10().sub(3).div(m.times(30)).mod(10).floor().toNumber()]+STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(m.times(300)).mod(10).floor().toNumber()]
			txt += STANDARD_DATA.MILESTONES[x]+"-"
		}
		txt += STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()]+STANDARD_DATA.TENS[val.log10().sub(3).div(30).mod(10).floor().toNumber()]+STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(300).mod(10).floor().toNumber()]
		return txt
	} else if (val.lt(ExpantaNum.pow(10, ExpantaNum.pow(10, 303).times(3)).times(1e3))) {
		let x = val.log10().sub(3).div(3).log10().div(3).floor().toNumber()
		let mag = decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places)
		if (mag===undefined) mag = "1"
		let txt = mag
		let m = ExpantaNum.pow(1000, x)
		txt += " "+STANDARD_DATA.MILESTONE_PREF[val.log10().sub(3).div(m.times(3)).mod(10).floor().toNumber()]+STANDARD_DATA.TENS[val.log10().sub(3).div(m.times(30)).mod(10).floor().toNumber()]+STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(m.times(300)).mod(10).floor().toNumber()]
		txt += STANDARD_DATA.MILESTONE_TENS[Math.floor(x/10)]+STANDARD_DATA.MILESTONES[x%10]+"-"
		txt += STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()]+STANDARD_DATA.TENS[val.log10().sub(3).div(30).mod(10).floor().toNumber()]+STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(300).mod(10).floor().toNumber()]
		return txt
	} else if (val.lt(ExpantaNum.pow(10, ExpantaNum.pow(10, 3003).times(3)).times(1e3))) {
		let x = val.log10().sub(3).div(3).log10().div(3).floor().toNumber()
		let mag = decimalPlaces(val.div(ExpantaNum.pow(10, val.log10().div(3).floor().times(3))), places)
		if (mag===undefined) mag = "1"
		let txt = mag
		let m = ExpantaNum.pow(1000, x)
		txt += " "+STANDARD_DATA.MILESTONE_PREF[val.log10().sub(3).div(m.times(3)).mod(10).floor().toNumber()]+STANDARD_DATA.TENS[val.log10().sub(3).div(m.times(30)).mod(10).floor().toNumber()]+STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(m.times(300)).mod(10).floor().toNumber()]
		txt += STANDARD_DATA.MILESTONE_HUNDREDS[Math.floor(x/100)]+STANDARD_DATA.MILESTONE_TENS[Math.floor(x/10)%10]+STANDARD_DATA.MILESTONES[x%10]+"-"
		txt += STANDARD_DATA.ONES[val.log10().sub(3).div(3).mod(10).floor().toNumber()]+STANDARD_DATA.TENS[val.log10().sub(3).div(30).mod(10).floor().toNumber()]+STANDARD_DATA.HUNDREDS[val.log10().sub(3).div(300).mod(10).floor().toNumber()]
		return txt
	} else if (val.lt(STANDARD_DATA.SUPER_MS.length>val.div(1e3).log10().div(3).log10().sub(3).div(3).logBase(1000).floor().toNumber())) return STANDARD_DATA.SUPER_MS[val.div(1e3).log10().div(3).log10().sub(3).div(3).logBase(1000).floor().toNumber()]
	else return notations.scientific(val, places, locs)
}

notations.mixed = function(val, places, locs) {
	if (val.lt(1e33)) return notations.standard(val, places, locs)
	else return notations.scientific(val, places, locs)
}

notations.hexadecimal = function(val, places, locs) {
	return disp(val, places, locs, 16)
}