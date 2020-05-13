var notations = {}

notations.scientific = function(val, places, locs) {
	// Taken from ExpantaNum.js (but altered slightly)
    var b=0;
    var s="";
    var m=Math.pow(10,places);
    if (!val.layer) s+="";
    else if (val.layer<3) s+="J".repeat(val.layer);
    else s+="J^"+val.layer+" ";
    if (val.array.length>=3||val.array.length==2&&val.array[1][0]>=2){
	  let iter = 0
      for (var i=val.array.length-1;!b&&i>=2;--i){
        var e=val.array[i];
        var w=e[0];
        var x=e[1];
        if (x>=m){
          ++w;
          b=x;
          x=1;
        }else if (val.array[i-1][0]==w-1&&val.array[i-1][1]>=m){
          ++x;
          b=val.array[i-1][1];
        }
        var q=w>=5?"{"+w+"}":"^".repeat(w);
        if (x>1) s+="10"+q+"^"+x+" ";
        else if (x==1) s+="10"+q;
		iter++;
		if (iter>=locs) break;
      }
    }
    var k=val.operator(0);
    var l=val.operator(1);
    if (k>m){
      k=Math.log10(k);
      ++l;
    }
    if (b) s+=decimalPlaces(b,places);
    else if (!l) s+=String(decimalPlaces(k,places));
    else if (l<3) s+="e".repeat(l-1)+decimalPlaces(Math.pow(10,k-Math.floor(k)),places)+"e"+decimalPlaces(Math.floor(k),places);
    else if (l<8) s+="e".repeat(l)+decimalPlaces(k,places);
    else if (val.array.length<3+locs) s+="10^^"+decimalPlaces(l,places)+" "+decimalPlaces(k,places);
    return s;
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