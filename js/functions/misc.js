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
	ret.tr.cubes = new ExpantaNum(ret.tr.cubes).toString()
	ret.collapse.cadavers = new ExpantaNum(ret.collapse.cadavers).toString()
	ret.collapse.lifeEssence = new ExpantaNum(ret.collapse.lifeEssence).toString()
	ret.pathogens.amount = new ExpantaNum(ret.pathogens.amount).toString()
	for (let i=1;i<=Object.keys(ret.pathogens.upgrades).length;i++) ret.pathogens.upgrades[i] = new ExpantaNum(ret.pathogens.upgrades[i]).toString()
	ret.dc.matter = new ExpantaNum(ret.dc.matter).toString()
	ret.dc.energy = new ExpantaNum(ret.dc.energy).toString()
	ret.dc.fluid = new ExpantaNum(ret.dc.fluid).toString()
	ret.dc.cores = new ExpantaNum(ret.dc.cores).toString()
	return ret
}

function transformToEN(obj, sc=DEFAULT_START) {
    let ret = deepCopy(obj)
    for (const key in sc) if (ret[key]===undefined) ret[key] = deepCopy(sc[key])
	for (const key in sc.options) if (ret.options[key]===undefined) ret.options[key] = deepCopy(sc.options[key])
	ret.distance = new ExpantaNum(ret.distance)
	ret.velocity = new ExpantaNum(ret.velocity)
	ret.rank = new ExpantaNum(ret.rank)
	ret.tier = new ExpantaNum(ret.tier)
	ret.rockets = new ExpantaNum(ret.rockets)
	ret.rf = new ExpantaNum(ret.rf)
	ret.automation.scraps = new ExpantaNum(ret.automation.scraps)
	ret.automation.intelligence = new ExpantaNum(ret.automation.intelligence)
	for (let i=0;i<Object.values(ret.automation.robots).length;i++) for (let j=0;j<=1;j++) ret.automation.robots[Object.keys(ret.automation.robots)[i]][j] = new ExpantaNum(Object.values(ret.automation.robots)[i][j])
	ret.tr.cubes = new ExpantaNum(ret.tr.cubes)
	ret.collapse.cadavers = new ExpantaNum(ret.collapse.cadavers)
	ret.collapse.lifeEssence = new ExpantaNum(ret.collapse.lifeEssence)
	ret.pathogens.amount = new ExpantaNum(ret.pathogens.amount)
	for (let i=1;i<=Object.keys(sc.pathogens.upgrades).length;i++) ret.pathogens.upgrades[i] = new ExpantaNum(ret.pathogens.upgrades[i])
	ret.dc.matter = new ExpantaNum(ret.dc.matter)
	ret.dc.energy = new ExpantaNum(ret.dc.energy)
	ret.dc.fluid = new ExpantaNum(ret.dc.fluid)
	ret.dc.cores = new ExpantaNum(ret.dc.cores)
    return ret
}

function primesLTE(x) {
	x = new ExpantaNum(x).round()
	if (x.lte(1)) return new ExpantaNum(0)
	if (x.lte(11)) return ExpantaNum.mul(2.7135e-158, ExpantaNum.pow(2.116e14, x)).sub(x.pow(2).times(0.053030303)).plus(x.times(1.02576)).sub(0.9).round()
	let ret = x.div(x.ln())
	return ret.round()
}

function copyToClipboard(str) {
	const el = document.createElement('textarea')
	el.value = str
	document.body.appendChild(el)
	el.select()
	document.execCommand('copy')
	document.body.removeChild(el)
}

function reload() { 
	reloaded = true
	gameWindow = window.open("index.html", "", "width="+screen.width+", height="+screen.height+", fullscreen=yes, titlebar=no, dialog=no, resizable=no, toolbar=no, menubar=no, frame=no")
	gameWindow.location.reload()
	window.close()
}

function getCurrentTime() { return new Date().getTime() }

function getAllAchievements() {
	let a = []
	for (let r=1;r<=ACH_DATA.rows;r++) for (let c=1;c<=ACH_DATA.cols;c++) a.push(r*10+c)
	if (tmp.modes.na.active) a = a.filter(x => Object.keys(ACH_DATA.rewards).includes(x.toString()))
	return a
}

function reverseTri(n) { return Math.ceil(0.5*(Math.sqrt(8*n+1)-1)) }