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
		if (gain.gte(LAYER_SC[this.name])) gain = gain.sqrt().times(ExpantaNum.sqrt(LAYER_SC[this.name]))
		if (tmp.lm) if (tmp.lm[this.name]) gain = gain.times(tmp.lm[this.name])
		return gain.floor()
	}
	
	get fcBulk() {
		if (!(this.type=="forced"||this.type=="semi-forced")) return new ExpantaNum(0)
		if (!this.avail) return new ExpantaNum(0)
		return tmp[this.name+"s"].bulk.floor()
	}
	
	reset(force=false) {
		if (!force) {
			if (!this.avail || this.gain.lt(1)) return
			player[this.name] = player[this.name].plus(this.gain)
		}
		for (let i=0;i<LAYER_RESETS[this.name].length;i++) player[LAYER_RESETS[this.name][i]] = DEFAULT_START[LAYER_RESETS[this.name][i]]
	}
	
	bulk(mag=new ExpantaNum(1)) {
		if (!this.avail) return
		if (!(this.type=="forced"||this.type=="semi-forced")) return
		let m = player[this.name].plus(mag).min(this.fcBulk)
		player[this.name] = player[this.name].max(m)
		this.reset(true)
	}
}