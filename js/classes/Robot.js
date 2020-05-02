class Robot {
	constructor(name) {
		this.name = name
		this.unl = Object.keys(player.automation.robots).includes(this.name)
		this.tabOpen = player.automation.open == this.name
		this.i = player.automation.robots[this.name]===undefined?new ExpantaNum(0):player.automation.robots[this.name][0]
		this.m = player.automation.robots[this.name]===undefined?new ExpantaNum(0):player.automation.robots[this.name][1]
	}
	
	get interval() { return this.unl?ExpantaNum.div(4, (this.i.plus(1))):new ExpantaNum(1/0) }
	
	get magnitude() { return this.unl?this.m.pow(2).plus(1):new ExpantaNum(0) }
	
	get intCost() { return ExpantaNum.pow(7, this.i).times(2) }
	
	get magCost() { return ExpantaNum.pow(3, this.m.plus(1).pow(2)) }
	
	get btnTxt() {
		if (!this.unl) return "Purchase the "+capitalFirst(this.name)+" for "+showNum(ROBOT_REQS[this.name])+" scraps."
		if (this.tabOpen) return "Exit this tab."
		return "Open up "+capitalFirst(this.name)+" for improvements."
	}
	
	btn() {
		if (this.unl) player.automation.open = this.tabOpen ? "none" : this.name
		else {
			if (player.automation.scraps.lt(ROBOT_REQS[this.name])) return
			player.automation.scraps = player.automation.scraps.sub(ROBOT_REQS[this.name])
			player.automation.robots[this.name] = [new ExpantaNum(0), new ExpantaNum(0)]
		}
	}
	
	buy(v) {
		if (!this.unl) return
		let cost = v==0?this.intCost:this.magCost
		if (player.automation.intelligence.lt(cost)) return
		player.automation.intelligence = player.automation.intelligence.sub(cost)
		player.automation.robots[this.name][v] = player.automation.robots[this.name][v].plus(1)
	}
	
	act() { 
		if (this.name=="rankbot") tmp.ranks.layer.bulk(this.magnitude)
		if (this.name=="tierbot") tmp.tiers.layer.bulk(this.magnitude)
	}
}