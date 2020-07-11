function updateNews() {
	if (!player.options.newst) return
	let r = parseFloat(document.getElementById("news").style.right.split("%")[0], 10);
	let visible = r < NEWS_ADJ;
	if (!visible) {
		let possible = Object.values(NEWS_DATA).filter(data =>
			(function () {
				if (data[1] === undefined) return true;
				else return data[1]();
			})()
		);
		let txt = "";
		if (possible.length == 0) txt = "Sorry, we are out of news for the day... try again later?";
		else if (possible.length == 1) txt = possible[0][0];
		else {
			let n = Math.floor(Math.random() * possible.length);
			txt = possible[n][0];
		}
		document.getElementById("news").innerHTML = txt;
		document.getElementById("news").style.right = 0 - NEWS_ADJ + "%";
	} else {
		r += 100 / 33 / NEWS_TIME;
		document.getElementById("news").style.right = r + "%";
	}
}
