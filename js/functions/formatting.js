function disp(val, places, locs, base) {	
	// Taken from ExpantaNum.js (but altered slightly)
    var b=0;
    var s="";
    var m=Math.pow(base,places);
    if (!val.layer) s+="";
    else if (val.layer<3) s+="J".repeat(val.layer);
    else s+="J^"+showNum(val.layer)+" ";
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
        var q=w>=5?"{"+w.toString(base)+"}":"^".repeat(w);
        if (x>1) s+="10"+q+"^"+x.toString(base)+" ";
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
    if (b) s+=decimalPlaces(b,places,base);
    else if (!l) s+=String(decimalPlaces(k,places,base));
    else if (l<3) s+="e".repeat(l-1)+decimalPlaces(Math.pow(10,k-Math.floor(k)),places,base)+"e"+decimalPlaces(Math.floor(k),places,base);
    else if (l<8) s+="e".repeat(l)+decimalPlaces(k,places,base);
    else if (val.array.length<3+locs) s+="10^^"+decimalPlaces(l,places,base)+" "+decimalPlaces(k,places,base);
    return s;
}

function showNum(val) {
	val = new ExpantaNum(val)
	if (isNaN(val.array[0][1])) return "NaN";
    if (!isFinite(val.array[0][1])) return "Infinity";
	if (val.eq(0)) return "0"
	if (val.sign==-1) return "-"+showNum(val.abs());
	return notations[player.options.not](new ExpantaNum(val), player.options.sf-1, 2)
}

function decimalPlaces(value, places, base=10) {
	if (value>=1e5) return showNum(value)
	
	// Taken from ExpantaNum.js
	var len=places+1;
    var numDigits=Math.ceil(Math.log10(Math.abs(value)));
    var rounded=Math.round(value*Math.pow(10,len-numDigits))*Math.pow(10,numDigits-len);
    if (base==10) return parseFloat(rounded.toFixed(Math.min(Math.max(len-numDigits,0), 100)));
	else {
		let p = Math.min(Math.max(len-numDigits,0), 100)
		for (let i=1;i<=p;i++) {
			if (value.toString(base).split(".")[0].length<4+(places-2)) {
				return (value*(Math.pow(base, len-numDigits))/Math.pow(base, len-numDigits)).toString(base).slice(0, places+1).toUpperCase()
			} else {
				value = new ExpantaNum(value)
				let exponent = value.logBase(base).floor().toNumber().toString(base).toUpperCase()
				let mantissa = (Math.round(value.div(ExpantaNum.pow(base, exponent)).toNumber()*Math.pow(base, numDigits))/Math.pow(base, numDigits)).toString(base).toUpperCase()
				return mantissa+"e"+exponent
			}
		}
	}
}

function formatDistance(x) {
	x = new ExpantaNum(x)
	for (i=Object.keys(DISTANCES).length-1;i>=0;i--) {
		let name = Object.keys(DISTANCES)[i]
		let val = DISTANCES[name]
		if (x.lt(val) && i>0) continue
		return showNum(x.div(val))+" "+name
	}
}

function capitalFirst(str) { return str.split(" ").map(x => x[0].toUpperCase()+x.slice(1)).join(" "); }

function formatTime(x) {
	x = new ExpantaNum(x)
	for (i=Object.keys(TIMES).length-1;i>=0;i--) {
		let name = Object.keys(TIMES)[i]
		let val = TIMES[name]
		if (x.lt(val) && i>0) continue
		return showNum(x.div(val))+" "+name
	}
}