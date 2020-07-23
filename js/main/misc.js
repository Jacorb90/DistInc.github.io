function updateTempMisc() {
	tmp.bc = (function () {
		let color = "white";
		if (player.options.theme == "dark") {
			color = "black";
			if (player.tr.active) color = "#6b486b";
		} else if (player.tr.active) color = "#de97de";
		return color;
	})();
}
