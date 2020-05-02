class Layer {
	constructor(name, avail, type) {
		this.name = name
		this.avail = avail
		this.type = type
	}
	
	get gain() {
		if (this.type=="forced"||this.type=="semi-forced") return new ExpantaNum(1)
		let req = LAYER_REQS[this.name]
		let gain = player[req[0]].div(req[1]).pow(LAYER_FP[this.name])
		if (this.name=="rockets") if (tmp.ach) if (tmp.ach[34].has) gain = gain.times(1.1)
		if (this.name=="rockets") if (tmp.ach) if (tmp.ach[15].has) gain = gain.times(1.05)
		return gain.floor()
	}
	
	reset(force=false) {
		if (!force) {
			if (!this.avail || this.gain.lt(1)) return
			player[this.name] = player[this.name].plus(this.gain)
		}
		for (let i=0;i<LAYER_RESETS[this.name].length;i++) player[LAYER_RESETS[this.name][i]] = DEFAULT_START[LAYER_RESETS[this.name][i]]
	}
}