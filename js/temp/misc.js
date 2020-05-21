function updateTempMisc() {
	tmp.freeRF = tmp.tr.eff
	tmp.bc = function() {
		let color = "white"
		if (player.tr.active) color = "#de97de"
		return color
	}()
}