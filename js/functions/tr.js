function reverseTime(force = false) {
	if (!player.tr.unl) return;
	player.tr.active = !player.tr.active;
}

function buyTRUpg(n) {
	if (player.tr.upgrades.includes(n)) return;
	if (player.tr.cubes.lt(TR_UPGS[n].cost)) return;
	player.tr.cubes = player.tr.cubes.sub(TR_UPGS[n].cost);
	player.tr.upgrades.push(n);
}
