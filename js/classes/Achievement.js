class Achievement {
	constructor(data) {
		this.name = data.name
		this.has = data.has
	}
	
	get reward() { return (ACH_DATA.rewards[this.name]!==undefined)?ACH_DATA.rewards[this.name]:"" }
	
	get desc() { return (ACH_DATA.descs[this.name]!==undefined?ACH_DATA.descs[this.name]:"Not currently implemented.")+"<br>"+(this.reward===""?"":("Reward: "+this.reward)) }
	
	select() { tmp.selAch = this.name }
	
	grant() { if (!player.achievements.includes(this.name)) player.achievements.push(this.name) }
}