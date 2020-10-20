class Feature {
	constructor(data) {
		this.name = data.name;
		this.req = data.req;
		this.res = data.res;
		this.display = data.display;
		this.r = data.reached || (function() { return false });
		this.spec = data.spec ? data.spec : Array.isArray(data.res);
		this.superSpec = data.superSpec || false
		this.resName = data.resName || "???"
		this.disp = data.displayName ? data.displayName : data.name;
		this.progress = data.progress
			? data.progress
			: function () {
					return 0;
			  };
		this.res_amt = data.res_amt || 1;
		this.specRes = data.specRes || [];
	}

	amt(x = 1) {
		if (this.res_amt > 1) {
			if (this.superSpec?this.superSpec[x - 1]:false) return this.res[x - 1]()
			else return this.spec[x - 1] ? player[this.res[x - 1][0]][this.res[x - 1][1]] : player[this.res[x - 1]];
		} else {
			if (this.superSpec) return this.res()
			else return this.spec ? player[this.res[0]][this.res[1]] : player[this.res];
		}
	}

	dispAmt(x = 1) {
		if (this.specRes[x-1]) return this.specRes[x-1]
		if (this.res_amt > 1) {
			if (this.superSpec?this.superSpec[x - 1]:false) return capitalFirst(this.resName[x - 1])
			else return this.spec[x - 1] ? capitalFirst(this.res[x - 1][1]) : capitalFirst(this.res[x - 1]);
		} else {
			if (this.superSpec) return capitalFirst(this.resName)
			else return this.spec ? capitalFirst(this.res[1]) : capitalFirst(this.res);
		}
	}

	get reached() {
		if (this.res_amt > 1) {
			let bool = true;
			for (let i = 1; i <= this.res_amt; i++) bool = (bool && this.amt(i).gte(this.req[i - 1])) || this.r();
			return bool;
		} else return this.amt().gte(this.req()) || this.r();
	}

	get desc() {
		if (this.res_amt > 1) {
			let desc = "Reach ";
			if (!this.reached) {
				for (let i = 1; i <= this.res_amt; i++) {
					desc +=
						this.display[i - 1](this.req[i - 1]) +
						(this.res[i - 1] == "distance" ? "" : (" "+this.dispAmt(i)));
					if (i == this.res_amt - 1) desc += ", and ";
					else if (i < this.res_amt - 1) desc += ", ";
				}
				desc +=
					" to unlock " + this.disp + " (" + showNum(new ExpantaNum(this.progress() || 0).times(100)) + "%)";
				return desc;
			} else return "";
		} else {
			return this.reached
				? ""
				: "Reach " +
						this.display(this.req()) +
						" " +
						(this.res == "distance" ? "" : this.dispAmt()) +
						" to unlock " +
						this.disp +
						" (" +
						showNum(new ExpantaNum(this.progress() || 0).times(100)) +
						"%)";
		}
	}
}
