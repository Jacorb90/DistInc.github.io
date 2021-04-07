class Layer {
	constructor(name, avail, type, spec, tName, useCustomGain) {
		this.name = name;
		this.tName = tName || name;
		this.avail = avail;
		this.type = type;
		this.spec = !!spec;
		this.customGain = useCustomGain||type=="multi-res";
		this.addS = this.name == "rank" || this.name == "tier";
	}

	get gain() {
		if (this.customGain) return tmp[this.tName].gain();
		if (this.type == "forced" || this.type == "semi-forced") return new ExpantaNum(1);
		let req = LAYER_REQS[this.name];
		let nr = req[1];
		if (tmp[this.tName].lrm !== undefined) nr = new ExpantaNum(req[1]).times(tmp[this.tName].lrm);
		let gain = player[req[0]].div(nr).pow(LAYER_FP[this.name]);
		if (modeActive("extreme+hikers_dream") && player.achievements.includes(38) && this.name == "collapse") gain = gain.times(Math.max(player.energyUpgs.length, 1)**2)
		let sc = new ExpantaNum(LAYER_SC[this.name]);
		if (tmp[this.tName].sc !== undefined) sc = tmp[this.tName].sc;
		if (gain.gte(sc)) gain = gain.sqrt().times(ExpantaNum.sqrt(sc));
		if (tmp.lm) if (tmp.lm[this.name]) gain = gain.times(tmp.lm[this.name]);
		if (this.name == "collapse"){
			if (player.inf.pantheon.purge.active || HCCBA("purge")) gain = gain.plus(1).pow(gain.plus(1).times(10).slog(10).pow(-1)).min(gain)
			if (modeActive("extreme") && !modeActive("hikers_dream")) gain = gain.sub(2).max(0)
		}
		if (modeActive("hikers_dream") && player.elementary.theory.depth.gte(10) && player.elementary.theory.active && gain.gt(1)) gain = gain.pow(3).root(player.elementary.theory.depth)
		return gain.floor();
	}

	get fcBulk() {
		if (!(this.type == "forced" || this.type == "semi-forced")) return new ExpantaNum(0);
		if (!this.avail) return new ExpantaNum(0);
		if (this.name == "rf") return tmp[this.tName].bulk.floor();
		else return tmp[this.tName + (this.addS ? "s" : "")].bulk.floor();
	}

	reset(force=false, auto=false) {
		if (!force) {
			if (tmp[this.tName]) if (tmp[this.tName].updateOnReset !== undefined && !auto) tmp[this.tName].updateOnReset();
			if (!(this.avail || (!(this.name === "infinity") && player.inf.endorsements.lte(10) && infActive)) || this.gain.lt(1)) return;
			if (!this.spec) player[this.name] = player[this.name].plus(this.gain);
			else {
				let gc = tmp[this.tName].doGain(auto);
				if (gc == "NO") return;
			}
		}
		if (LAYER_RESETS_NOTHING[this.name]()) return;
		let prev = transformToEN(player, DEFAULT_START);
		for (let i = 0; i < LAYER_RESETS[this.name].length; i++) 
			player[LAYER_RESETS[this.name][i]] =
				DEFAULT_START[LAYER_RESETS[this.name][i]] instanceof Object &&
				!(DEFAULT_START[LAYER_RESETS[this.name][i]] instanceof ExpantaNum)
					? JSON.parse(JSON.stringify(DEFAULT_START[LAYER_RESETS[this.name][i]]))
					: DEFAULT_START[LAYER_RESETS[this.name][i]];
		player = transformToEN(player, DEFAULT_START);
		modeLoad(LAYER_RESETS_EXTRA[this.name]);
		if (tmp[this.tName]) if (tmp[this.tName].onReset !== undefined) tmp[this.tName].onReset(prev, auto)
		if (this.name!="rf"&&modeActive("hikers_dream")) calcInclines();
		updateBeforeTick();
		updateAfterTick();
	}

	bulk(mag = new ExpantaNum(1)) {
		if (!this.avail) return;
		if (!(this.type == "forced" || this.type == "semi-forced")) return;
		let m = player[this.name].plus(mag).min(this.fcBulk).floor();
		let pre = player[this.name]
		player[this.name] = player[this.name].max(m);
		if (m.gt(pre)) this.reset(true);
	}
}
