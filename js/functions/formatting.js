function disp(val, places, locs, base) {
	// Taken from OmegaNum.js (but altered slightly)
	if (val.sign==-1) return "-"+disp(val.abs(), places, locs, base);
	if (isNaN(val.array[0])) return "NaN";
	if (!isFinite(val.array[0])) return "Infinity";
	var s="";
	if (val.array.length>=2){
		for (var i=val.array.length-1;i>=2;--i){
			var q=i>=5?"{"+decimalPlaces(i, places, true, base)+"}":"^".repeat(i);
			if (val.array[i]>1) s+="10"+decimalPlaces(q, places, true, base)+"^"+decimalPlaces(val.array[i], places, true, base)+" ";
			else if (val.array[i]==1) s+="10"+decimalPlaces(q, places, true, base);
		}
	}
	if (!val.array[1]) s+=decimalPlaces(val.toNumber(), places, val.eq(val.round()), base);
	else if (val.array[1]<3) s+="e".repeat(val.array[1]-1)+decimalPlaces(Math.pow(10,val.array[0]-Math.floor(val.array[0])), places, false, base)+"e"+decimalPlaces(Math.floor(val.array[0]), places, true, base);
	else if (val.array[1]<8) s+="e".repeat(val.array[1])+decimalPlaces(val.array[0], places, false, base);
	else s+="10^^"+decimalPlaces(val.array[1], places, true, base)+" "+decimalPlaces(val.array[0], places, false, base);
	return s;
}

function showNum(val) {
	val = new ExpantaNum(val);
	if (val.eq(NaN)) return "NaN";
	if (val.gte(1/0)) return "Infinity";
	if (val.eq(0)) return "0";
	if (val.sign == -1) return "-" + showNum(val.abs());
	return notations[player.options.not](new ExpantaNum(val), player.options.sf - 1, 2);
}

function addZeroes(orig, num, digits, roundWhole=false) {
	if (typeof(num)=="string") num = parseFloat(num)
	let result = (orig==Math.round(orig))?Math.round(num).toString():num.toLocaleString("en", {useGrouping: false, minimumFractionDigits: Math.max(digits, 1)})
	if (roundWhole && result.includes(".") && result[result.length-1]=="0") {
		while (result[result.length-1]=="0") result = result.substring(0, result.length-1);
	}
	if (result[result.length-1]==".") result = result.substring(0, result.length-1);
	return result
}

function decimalPlaces(value, places, roundWhole=false, base = 10) {
	// Taken from ExpantaNum.js (but altered slightly)
	var len = places + 1;
	var numDigits = Math.ceil(Math.log10(Math.max(Math.abs(value), 1)));
	var rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
	if (base == 10) {
		if (value<0.001) {
			if (value<=1e-100) return "0"
			let e = Math.floor(-1*Math.log10(value))
			let m = value*Math.pow(10, e+1)
			return decimalPlaces(m, places, false, base)+"e-"+decimalPlaces(e, places, true, base)
		} else if (value<Math.pow(10, places)||value<1000) {
			return addZeroes(value, parseFloat(rounded.toFixed(Math.min(Math.max(len - numDigits, 0), places))), len - numDigits, roundWhole);
		} else {
			let e = Math.floor(Math.log10(value))
			let m = value/Math.pow(10, e)
			return decimalPlaces(m, places, roundWhole, base)+"e"+e
		}
	} else {
		if (value.toString(base).split(".")[0].length < places + 2) {
			return ((value * Math.pow(base, len - numDigits)) / Math.pow(base, len - numDigits))
				.toString(base)
				.slice(0, places + 1)
				.toUpperCase();
		} else {
			value = new ExpantaNum(value);
			let exponent = value.max(1).logBase(base).floor().toNumber().toString(base).toUpperCase();
			let mantissa = (
				Math.round(value.div(ExpantaNum.pow(base, exponent)).toNumber() * Math.pow(base, numDigits)) /
				Math.pow(base, numDigits)
			)
				.toString(base)
				.toUpperCase();
			return mantissa + "e" + exponent;
		}
	}
}

function formatDistance(x, fc=multiverseCapped()) {
	x = new ExpantaNum(x);
	for (i = Object.keys(DISTANCES).length - 1; i >= 0; i--) {
		let name = Object.keys(DISTANCES)[i];
		let val = new ExpantaNum(DISTANCES[name]);
		if (x.lt(val) && i > 0) continue;
		if (name=="mlt"&&fc) {
			if (x.eq(val)) return showNum(x.div(DISTANCES.uni)) + " uni";
			return "??? uni"
		}
		if (DISTANCE_TYPES[name]=="log") return showNum(x.log10().div(val.log10())) + " " + name; 
		return showNum(x.div(val)) + " " + name;
	}
}

function capitalFirst(str) {
	if (str=="" || str==" ") return str
	return str
		.split(" ")
		.map(x => x[0].toUpperCase() + x.slice(1))
		.join(" ");
}

function formatTime(x) {
	x = new ExpantaNum(x);
	for (i = Object.keys(TIMES).length - 1; i >= 0; i--) {
		let name = Object.keys(TIMES)[i];
		let val = TIMES[name];
		if (x.lt(val) && i > 0) continue;
		return showNum(x.div(val)) + " " + name;
	}
}

function formatGain(amt, gain, name, isDist, gainNotIncluded) {
	let trueGain = ExpantaNum.mul(name?adjustGen(gain, name):gain, gainNotIncluded||1)
	let func = isDist?formatDistance:showNum
	if (trueGain.gte(1e100) && trueGain.gt(amt)) return "(+"+showNum(trueGain.max(1).log10().sub(amt.max(1).log10().max(1)).times(50/VIS_UPDS[player.options.visUpd]))+" OoMs/sec)"
	else return "(+"+func(trueGain)+"/sec)"
}

function isFunc(f) {
	let n = {};
	return n.toString.call(f) === '[object Function]';
}

function checkFunc(f) {
	if (isFunc(f)) return f();
	else return f;
}