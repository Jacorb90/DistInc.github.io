// Formatting

function showNum(x) {
	x = new ExpantaNum(x)
	let digits = 5
	var r=x.toPrecision(digits,true);
	for (var i=0;i<r.length;i++){
		if ("0123456789.".indexOf(r[i])!=-1){
			for (var j=i+1;j<=r.length;j++){
				if ("0123456789.".indexOf(r[j])==-1||j==r.length){
					var s=r.substring(i,j);
					var n=String(Number(s));
					r=r.substring(0,i)+n+r.substring(j);
					i=i+n.length;
					break;
				}
			}
		}
	}
	return r;
}

function formatDistance(x) {
	x = new ExpantaNum(x)
	for (i=Object.keys(DISTANCES).length-1;i>=0;i--) {
		let name = Object.keys(DISTANCES)[i]
		let val = DISTANCES[name]
		if (x.lt(val) && i>0) continue
		return showNum(x.div(val))+name
	}
}

// Tabs

function isTabShown(name) {
	return player.tab==name
}

function getTabBtnsShown() {
	let btns = []
	for (j=0;j<Object.keys(TABBTN_SHOWN).length;j++) if (Object.values(TABBTN_SHOWN)[i]()) btns.push(Object.keys(TABBTN_SHOWN)[i])
	return btns
}

function updateTabs() {
	var tabs = document.getElementsByClassName("tab")
	for (i=0;i<tabs.length;i++) {
		var el = new Element(tabs[i].id)
		el.setDisplay(isTabShown(tabs[i].id))
		var elT = new Element(tabs[i].id+"tabbtn")
		elT.setDisplay(getTabBtnsShown().includes(tabs[i].id))
	}
}

function showTab(name) { player.tab = name }