class Layer {
	constructor(name, avail, type, spec, tName) {
		this.name = name;
		this.tName = tName || name;
		this.avail = avail;
		this.type = type;
		this.spec = !!spec;
		this.addS = this.name == "rank" || this.name == "tier";
	}

	get gain() {
		if (this.type == "multi-res") return tmp[this.tName].gain();
		if (this.type == "forced" || this.type == "semi-forced") return new ExpantaNum(1);
		let req = LAYER_REQS[this.name];
		let nr = req[1];
		if (tmp[this.tName].lrm !== undefined) nr = new ExpantaNum(req[1]).times(tmp[this.tName].lrm);
		let gain = player[req[0]].div(nr).pow(LAYER_FP[this.name]);
		let sc = new ExpantaNum(LAYER_SC[this.name]);
		if (tmp[this.tName].sc !== undefined) sc = tmp[this.tName].sc;
		if (gain.gte(sc)) gain = gain.sqrt().times(ExpantaNum.sqrt(sc));
		if (tmp.lm) if (tmp.lm[this.name]) gain = gain.times(tmp.lm[this.name]);
		if (this.name=="collapse"&&(player.inf.pantheon.purge.active||HCCBA("purge"))) gain = gain.plus(1).pow(gain.plus(1).times(10).slog(10).pow(-1)).min(gain)
		if (this.name=="collapse"&&modeActive("extreme")) gain = gain.sub(2).max(0)
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
			if (!this.avail || this.gain.lt(1)) return;
			if (!this.spec) player[this.name] = player[this.name].plus(this.gain);
			else {
				let gc = tmp[this.tName].doGain(auto);
				if (gc == "NO") return;
			}
		}
		let prev = transformToEN(player, DEFAULT_START);
		for (let i = 0; i < LAYER_RESETS[this.name].length; i++)
			player[LAYER_RESETS[this.name][i]] =
				DEFAULT_START[LAYER_RESETS[this.name][i]] instanceof Object &&
				!(DEFAULT_START[LAYER_RESETS[this.name][i]] instanceof ExpantaNum)
					? JSON.parse(JSON.stringify(DEFAULT_START[LAYER_RESETS[this.name][i]]))
					: DEFAULT_START[LAYER_RESETS[this.name][i]];
		player = transformToEN(player, DEFAULT_START);
		modeLoad(LAYER_RESETS_EXTRA[this.name]);
		if (tmp[this.tName]) if (tmp[this.tName].onReset !== undefined) tmp[this.tName].onReset(prev);
		needUpdate = true
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
