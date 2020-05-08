class Mode {
	constructor(name) {
		this.name = name
	}
	
	get active() { return player.modes.includes(this.name) }
}