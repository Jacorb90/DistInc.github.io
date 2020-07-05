class Layer {
	constructor(name, avail, type, spec) {
		this.name = name
		this.avail = avail
		this.type = type
		this.spec = !(!spec)
		this.addS = this.name=="rank"||this.name=="tier"
	}
	
	get gain() {
		if (this.type=="forced"||this.type=="semi-forced") return new ExpantaNum(1)
		let req = LAYER_REQS[this.name]
		let nr = req[1]
		if (tmp[this.name].lrm !== undefined) nr = new ExpantaNum(req[1]).times(tmp[this.name].lrm)
		let gain = player[req[0]].div(nr).pow(LAYER_FP[this.name])
		let sc = new ExpantaNum(LAYER_SC[this.name])
		if (tmp[this.name].sc !== undefined) sc = tmp[this.name].sc
		if (gain.gte(sc)) gain = gain.sqrt().times(ExpantaNum.sqrt(sc))
		if (tmp.lm) if (tmp.lm[this.name]) gain = gain.times(tmp.lm[this.name])
		return gain.floor()
	}
	
	get fcBulk() {
		if (!(this.type=="forced"||this.type=="semi-forced")) return new ExpantaNum(0)
		if (!this.avail) return new ExpantaNum(0)
		if (this.name=="rf") return tmp[this.name].bulk.floor()
		else return tmp[this.name+(this.addS?"s":"")].bulk.floor()
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
		modeLoad(LAYER_RESETS_EXTRA[this.name])
		if (tmp[this.name]) if (tmp[this.name].onReset !== undefined) tmp[this.name].onReset(prev)
		updateTemp()
	}
	
	bulk(mag=new ExpantaNum(1)) {
		if (!this.avail) return
		if (!(this.type=="forced"||this.type=="semi-forced")) return
		let m = player[this.name].plus(mag).min(this.fcBulk).floor()
		player[this.name] = player[this.name].max(m)
		this.reset(true)
	}
}