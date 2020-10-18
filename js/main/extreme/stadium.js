function extremeStadiumTooltip(name) {
	if (!modeActive("extreme")) return ""
	let descs = EXTREME_STADIUM_DATA[name].descs;
	let l = Math.min(player.extremeStad.length + 1, Object.keys(EXTREME_STADIUM_DATA).length);
	if (player.extremeStad.includes(name))
		l = Math.min(player.extremeStad.indexOf(name) + 1, l);
	let tooltip = "Difficulty Level "+l+"\n";
	for (let i = 0; i < l; i++) {
		tooltip += descs[i];
		if (i < l - 1) tooltip += ", ";
	}
	return tooltip;
}

function extremeStadDiffLevel(name) {
	let l = player.extremeStad.length + 1;
	if (player.extremeStad.includes(name)) l = Math.min(player.extremeStad.indexOf(name) + 1, l);
	return l
}

function extremeStadiumActive(name, rank=1) {
	if (!modeActive("extreme")) return false;
	if (rank <= HCTVal(name)) return true;
	let active = player.inf.stadium.current == name;
	let l = player.extremeStad.length + 1;
	if (player.extremeStad.includes(name))
		l = Math.min(player.extremeStad.indexOf(name) + 1, l);
	if (rank > 1) active = active && l >= rank;
	return active;
}

function extremeStadiumGoal(name) {
	if (!modeActive("extreme")) return new ExpantaNum(1/0)
	let goal_data = EXTREME_STADIUM_DATA[name].goals;
	let l = player.extremeStad.length + 1;
	if (player.extremeStad.includes(name))
		l = Math.min(player.extremeStad.indexOf(name) + 1, l);
	let goal = goal_data[l - 1] ? goal_data[l - 1] : new ExpantaNum(1 / 0);
	return goal;
}

function startExtremeStadium(name) {
	if (!modeActive("extreme")) return;
	if (extremeStadiumActive(name)) return;
	if (player.inf.stadium.current != "") return;
	tmp.inf.layer.reset(true);
	player.inf.stadium.current = name;
}

function extremeStadiumComplete(name) {
	if (extremeStadiumActive("spectra", 3)) return false
	return modeActive("extreme")?player.extremeStad.includes(name):false;
}

function resetExtremeStad() {
	if (!modeActive("extreme")) return;
	if (!confirm("Are you sure you want to do this? You will need to do the second row all again!")) return
	player.extremeStad = []
	tmp.inf.reset(true)
}