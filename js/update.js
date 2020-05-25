function updateTemp() {
	updateTempOptions()
	updateTempScaling()
	updateTempEffects()
	updateTempEarlyGame()
	updateTempRanks()
	updateTempTiers()
	updateTempRockets()
	updateTempSpecial()
	updateTempRF()
	updateTempAuto()
	updateLayerMults()
	updateTempTR()
	updateTempCollapse()
	updateTempPathogens()
	updateTempDC()
	updateTempInf()
	updateTempSC()
	updateTempMisc()
	updateTempTimeSpeed()
}

function setupHTML() {
	// Achievement Table
	let achTable = new Element("achTable")
	let table = ""
	for (let r=1;r<=ACH_DATA.rows;r++) {
		table+="<tr>"
		for (let c=1;c<=ACH_DATA.cols;c++) {
			let id = r*10+c
			table+="<td id='ach"+id+"' class='achCont' onmouseover='tmp.ach["+id+"].select()'>"
			table+="</td>"
		}
		table+="</tr>"
	}
	achTable.setHTML(table)
	
	// Time Reversal Upgrade Table
	let trTable = new Element("trTable")
	table = ""
	for (let r=1;r<=Math.ceil(TR_UPG_AMT/5);r++) {
		table+="<tr id='trRow"+r+"'>"
		for (let c=1;c<=5;c++) {
			let id=(r-1)*5+c
			table+="<td><button id='tr"+id+"' class='btn locked' onclick='tmp.tr.upg["+id+"]()' style='height: 140px;'></button></td>"
			table+="</td>"
		}
		table+="</tr>"
	}
	trTable.setHTML(table)
	
	// Collapse Milestone Upgrade Table
	let cmTable = new Element("cmTable")
	table = ""
	for (let r=1;r<=Math.ceil(EM_AMT/4);r++) {
		table+="<tr>"
		for (let c=1;c<=4;c++) {
			let id=(r-1)*4+c
			table+="<td id='lem"+id+"' class='msCont r'></td>"
		}
		table+="</tr>"
	}
	cmTable.setHTML(table)
	
	// Pathogen Upgrade Pyramid
	let pthUpgs = new Element("pthUpgs")
	let data = ""
	let pID = 0
	for (let r=1;r<=reverseTri(PTH_AMT);r++) {
		data += "<table><tr>"
		for (let c=1;c<=r;c++) {
			pID++
			data+="<td><button id='pth"+pID+"' class='btn locked' onclick='tmp.pathogens["+pID+"].buy()' style='height: 150px;'></button></td>"
		}
		data += "</tr></table>"
	}
	pthUpgs.setHTML(data)
	
	// Infinity Upgrade Table
	let infTable = new Element("infUpgs")
	table = ""
	for (let r=1;r<=INF_UPGS.rows;r++) {
		table+="<tr>"
		for (let c=1;c<=INF_UPGS.cols;c++) {
			let id=r+";"+c
			table+="<td><button id='inf"+id+"' class='btn locked' onmouseover='tmp.inf.upgs.hover(&quot;"+id+"&quot;)' onclick='tmp.inf.upgs.buy(&quot;"+id+"&quot;)'>inf"+id+"</button></td>"
		}
		table+="</tr>"
	}
	infTable.setHTML(table)
	
	// Automators
	let au = new Element("automator")
	autos = ""
	for (let i=0;i<Object.keys(AUTOMATORS).length;i++) {
		autos+="<div id='automatorDiv-"+Object.keys(AUTOMATORS)[i]+"'>"+capitalFirst(Object.keys(AUTOMATORS)[i])+": <input id='automator-"+Object.keys(AUTOMATORS)[i]+"' type='checkbox'></input></div><br>"
	}
	au.setHTML(autos)
	for (let i=0;i<Object.keys(player.automators).length;i++) {
		let el = new Element("automator-"+Object.keys(player.automators)[i])
		el.el.checked = Object.values(player.automators)[i]
	}
}

function updateBeforeTick() {
	updateTemp()
	updateHTML()
}

function updateAfterTick() {
	updateUnlocks()
	if (player.options.autoSave && saveTimer>=AUTOSAVE_TIME) {
		tmp.options.save()
		saveTimer = 0
	}
	if (tmp.modes.absurd.active && !reloaded) {
		gameWindow.resizeTo(Math.random()*400, Math.random()*400)
		gameWindow.moveTo(Math.random()*1000, Math.random()*200)
	}
	updateTabs()
	if (player.tab=="options") updateOptionsTabs()
	updateAchievements()
}

function updateUnlocks() {
	if (player.distance.gte(ExpantaNum.mul(AUTO_UNL, tmp.auto.lrm))) player.automation.unl = true
	if (player.distance.gte(DISTANCES.ly)) player.tr.unl = true
	if (player.distance.gte(ExpantaNum.mul(COLLAPSE_UNL, tmp.collapse.lrm))) player.collapse.unl = true
	if (player.collapse.cadavers.gte(ExpantaNum.mul(PATHOGENS_UNL, tmp.pathogens.lrm))) player.pathogens.unl = true
	if (player.distance.gte(DC_UNL)) player.dc.unl = true
	if (tmp.inf.can && !infActive && player.inf.endorsements.lt(10)) tmp.inf.forceReset()
}