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
}

function updateBeforeTick() {
	updateTemp()
	updateHTML()
}

function updateAfterTick() {
	if (player.distance.gte(ExpantaNum.mul(AUTO_UNL, tmp.auto.lrm))) player.automation.unl = true
	if (player.distance.gte(DISTANCES.ly)) player.tr.unl = true
	if (player.distance.gte(ExpantaNum.mul(COLLAPSE_UNL, tmp.collapse.lrm))) player.collapse.unl = true
	if (player.collapse.cadavers.gte(ExpantaNum.mul(PATHOGENS_UNL, tmp.pathogens.lrm))) player.pathogens.unl = true
	if (player.distance.gte(DC_UNL)) player.dc.unl = true
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