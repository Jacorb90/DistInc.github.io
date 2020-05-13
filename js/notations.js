var notations = {}

notations.scientific = function(val, places, locs) {
	val = new ExpantaNum(val)
	
	// Also taken from ExpantaNum.js (but altered slightly)
	if (val.eq(0)) return "0"
	if (val.sign==-1) return "-"+val.abs();
    if (isNaN(val.array[0][1])) return "NaN";
    if (!isFinite(val.array[0][1])) return "Infinity";
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