class Achievement {
	constructor(id) {
		this.name = id;
	}
	
	get has() { return player.achievements.includes(this.name) }

	parse(txt) {
		if (txt.indexOf("boolean") != -1) {
			let txt2 = txt.split("boolean")[1];
			let content = txt2.slice(1, txt2.indexOf(")")).split(",");
			let newTxt = txt.split("boolean")[0];
			if (modeActive(content[0])) newTxt += content[1];
			else if (content.length > 2) newTxt += content[2];
			newTxt += txt2.split(")")[1];
			txt = newTxt;
		}
		if (txt.indexOf("showNum") != -1) {
			let txt2 = txt.split("showNum")[1];
			return txt.split("showNum")[0] + showNum(txt2.slice(1, txt2.indexOf(")"))) + txt2.split(")")[1];
		} else if (txt.indexOf("formatDistance") != -1) {
			let txt2 = txt.split("formatDistance")[1];
			return (
				txt.split("formatDistance")[0] + formatDistance(txt2.slice(1, txt2.indexOf(")"))) + txt2.split(")")[1]
			);
		} else if (txt.indexOf("formatTime") != -1) {
			let txt2 = txt.split("formatTime")[1];
			return txt.split("formatTime")[0] + formatTime(txt2.slice(1, txt2.indexOf(")"))) + txt2.split(")")[1];
		}
		return txt;
	}

	get reward() {
		return ACH_DATA.rewards[this.name] !== undefined ? this.parse(ACH_DATA.rewards[this.name]) : "";
	}

	get title() {
		return ACH_DATA.names[this.name] !== undefined ? ACH_DATA.names[this.name] : "";
	}

	get desc() {
		return (
			this.title +
			"\n" +
			(ACH_DATA.descs[this.name] !== undefined
				? this.parse(ACH_DATA.descs[this.name])
				: "Not currently implemented.") +
			"\n" +
			(this.reward === "" ? "" : "Reward: " + this.reward)
		);
	}

	select() {
		tmp.selAch = this.name;
	}

	grant() {
		if (!player.achievements.includes(this.name) && getAllAchievements().includes(this.name)) {
			player.achievements.push(this.name);
			notifier.success("Achievement gotten: " + ACH_DATA.names[this.name]);
		}
	}
}
