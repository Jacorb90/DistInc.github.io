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

function capitalFirst(str) { return str.split(" ").map(x => x[0].toUpperCase()+x.slice(1)).join(" "); }

function formatTime(x) {
	x = new ExpantaNum(x)
	for (i=Object.keys(TIMES).length-1;i>=0;i--) {
		let name = Object.keys(TIMES)[i]
		let val = TIMES[name]
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

// Saving/Loading

function save() { localStorage.setItem("dist-inc", btoa(JSON.stringify(ENString(player)))) }

function load() {
	let ls = localStorage.getItem("dist-inc")
	loaded = true
	if (!((ls||"x")=="x")) {
		let data = JSON.parse(atob(ls))
		player = transformToEN(data, DEFAULT_START)
	}
	interval = setInterval(function() {
		gameLoop(new ExpantaNum(1/33))
	}, 33)
}

// Achievements

function updateAchievements() {
	if (player.distance.gte(100)) tmp.ach[11].grant()
	if (player.rank.gt(1)) tmp.ach[12].grant()
	if (player.tier.gte(1)) tmp.ach[13].grant()
	if (player.rockets.gt(0)) tmp.ach[14].grant()
	if (player.rf.gt(0)) tmp.ach[15].grant()
	if (player.automation.unl) tmp.ach[16].grant()
	
	if (player.distance.gte(5e5)) tmp.ach[21].grant()
	if (player.rank.gte(8)) tmp.ach[22].grant()
	if (player.tier.gte(3)) tmp.ach[23].grant()
	if (player.rockets.gte(2)) tmp.ach[24].grant()
	if (player.rf.gte(2)) tmp.ach[25].grant()
	if (Object.keys(player.automation.robots).includes("rankbot")) tmp.ach[26].grant()
		
	if (player.distance.gte(1e12)) tmp.ach[31].grant()
	if (player.rank.gte(12)) tmp.ach[32].grant()
	if (player.tier.gte(4)) tmp.ach[33].grant()
	if (player.rockets.gte(10)) tmp.ach[34].grant()
	if (player.rf.gte(3)) tmp.ach[35].grant()
	if (Object.keys(player.automation.robots).includes("tierbot")) tmp.ach[36].grant()
}

// Automation

function autoTick(diff) {
	player.automation.scraps = player.automation.scraps.plus(tmp.auto.scrapGain.times(diff))
	player.automation.intelligence = player.automation.intelligence.plus(tmp.auto.intGain.times(diff))
	for (let i=0;i<Object.keys(ROBOT_REQS).length;i++) {
		let name = Object.keys(ROBOT_REQS)[i]
		if (tmp.auto[name].unl) {
			autoTimes[name] = autoTimes[name].plus(diff)
			if (autoTimes[name].gte(tmp.auto[name].interval)) {
				autoTimes[name] = new ExpantaNum(0)
				tmp.auto[name].act()
			}
		}
	}
}

// Miscellaneous

function deepCopy(obj) { return JSON.parse(JSON.stringify(obj)) }

function ENString(obj) {
	let ret = deepCopy(obj)
	ret.distance = new ExpantaNum(ret.distance).toString()
	ret.velocity = new ExpantaNum(ret.velocity).toString()
	ret.rank = new ExpantaNum(ret.rank).toString()
	ret.tier = new ExpantaNum(ret.tier).toString()
	ret.rockets = new ExpantaNum(ret.rockets).toString()
	ret.rf = new ExpantaNum(ret.rf).toString()
	ret.automation.scraps = new ExpantaNum(ret.automation.scraps).toString()
	ret.automation.intelligence = new ExpantaNum(ret.automation.intelligence).toString()
	for (let i=0;i<Object.values(ret.automation.robots).length;i++) for (let j=0;j<=1;j++) ret.automation.robots[Object.keys(ret.automation.robots)[i]][j] = new ExpantaNum(Object.values(ret.automation.robots)[i][j]).toString()
	return ret
}

function transformToEN(obj, sc) {
    let ret = deepCopy(obj)
    for (const key in sc) if (ret[key]===undefined) ret[key] = sc[key]
	ret.distance = new ExpantaNum(ret.distance)
	ret.velocity = new ExpantaNum(ret.velocity)
	ret.rank = new ExpantaNum(ret.rank)
	ret.tier = new ExpantaNum(ret.tier)
	ret.rockets = new ExpantaNum(ret.rockets)
	ret.rf = new ExpantaNum(ret.rf)
	ret.automation.scraps = new ExpantaNum(ret.automation.scraps)
	ret.automation.intelligence = new ExpantaNum(ret.automation.intelligence)
	for (let i=0;i<Object.values(ret.automation.robots).length;i++) for (let j=0;j<=1;j++) ret.automation.robots[Object.keys(ret.automation.robots)[i]][j] = new ExpantaNum(Object.values(ret.automation.robots)[i][j])
    return ret
}

function primesLTE(x) {
	x = new ExpantaNum(x).round()
	if (x.lte(1)) return new ExpantaNum(0)
	if (x.lte(11)) return ExpantaNum.mul(2.7135e-158, ExpantaNum.pow(2.116e14, x)).sub(x.pow(2).times(0.053030303)).plus(x.times(1.02576)).sub(0.9).round()
	let ret = x.div(x.ln())
	return ret.round()
}