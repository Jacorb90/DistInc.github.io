class Achievement {
	constructor(data) {
		this.name = data.name
		this.has = data.has
	}
	
	get desc() { return ACH_DATA.descs[this.name] }
	
	select() { tmp.selAch = this.name }
	
	grant() { if (!player.achievements.includes(this.name)) player.achievements.push(this.name) }
}