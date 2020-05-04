class Layer {
	constructor(name, avail, type, spec) {
		this.name = name
		this.avail = avail
		this.type = type
		this.spec = !(!spec)
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
		if (this.name=="rf") return tmp[this.name].bulk.floor()
		else return tmp[this.name+"s"].bulk.floor()
	}
	
	reset(force=false) {
		if (!force) {
			if (!this.avail || this.gain.lt(1)) return
			if (!this.spec) player[this.name] = player[this.name].plus(this.gain)
			else tmp[this.name].doGain()
		}
		let prev = transformToEN(player, DEFAULT_START)
		for (let i=0;i<LAYER_RESETS[this.name].length;i++) player[LAYER_RESETS[this.name][i]] = ((DEFAULT_START[LAYER_RESETS[this.name][i]] instanceof Object && !(DEFAULT_START[LAYER_RESETS[this.name][i]] instanceof ExpantaNum)) ? JSON.parse(JSON.stringify(DEFAULT_START[LAYER_RESETS[this.name][i]])) : DEFAULT_START[LAYER_RESETS[this.name][i]])
		player = transformToEN(player, DEFAULT_START)
		if (tmp[this.name]) if (tmp[this.name].onReset !== undefined) tmp[this.name].onReset(prev)
	}
	
	bulk(mag=new ExpantaNum(1)) {
		if (!this.avail) return
		if (!(this.type=="forced"||this.type=="semi-forced")) return
		let m = player[this.name].plus(mag).min(this.fcBulk).floor()
		player[this.name] = player[this.name].max(m)
		this.reset(true)
	}
}