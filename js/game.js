// Variables

var player = Object.assign({}, DEFAULT_START)

// Temp

var tmp = {}

function updateTemp() {
	// Elements
	tmp.el = {}
	for (i=0;i<TMP_DATA.ELS.length;i++) {
		let id = TMP_DATA.ELS[i]
		tmp.el[id] = new Element(id)
	}
	
	// Acceleration
	tmp.acc = new ExpantaNum(0.1)
	if (player.rank.gt(2)) tmp.acc = tmp.acc.times(ExpantaNum.pow(1.1, player.rank))
	if (player.rank.gt(3)) tmp.acc = tmp.acc.times(2)
	if (player.tier.gte(2) && player.rank.gte(3)) tmp.acc = tmp.acc.times(2)
	if (player.rank.gt(4)) tmp.acc = tmp.acc.times(ExpantaNum.pow(3, player.tier))
	if (player.rank.gt(5)) tmp.acc = tmp.acc.times(ExpantaNum.pow(1.975, player.rank))
	if (player.rank.gt(10)) tmp.acc = tmp.acc.times(2)
	if (player.tier.gte(4)) tmp.acc = tmp.acc.times(3)
	if (player.rank.gt(15)) tmp.acc = tmp.acc.times(4)
	if (player.tier.gte(5)) tmp.acc = tmp.acc.times(5)
	if (tmp.rockets) tmp.acc = tmp.acc.times(tmp.rockets.accPow)
	

	// Max Velocity
	tmp.maxVel = new ExpantaNum(1)
	if (player.rank.gt(1)) tmp.maxVel = tmp.maxVel.plus(1)
	if (player.rank.gt(2)) tmp.maxVel = tmp.maxVel.times(ExpantaNum.pow(1.1, player.rank))
	if (player.tier.gte(2) && player.rank.gte(3)) tmp.maxVel = tmp.maxVel.times(5)
	if (player.rank.gt(4)) tmp.maxVel = tmp.maxVel.times(ExpantaNum.pow(3, player.tier))
	if (player.rank.gt(5)) tmp.maxVel = tmp.maxVel.times(ExpantaNum.pow(1.975, player.rank))
	if (player.rank.gt(8)) tmp.maxVel = tmp.maxVel.times(ExpantaNum.pow(1.1, player.rank))
	if (tmp.rockets) tmp.maxVel = tmp.maxVel.times(tmp.rockets.mvPow)
	
	// Ranks
	tmp.ranks = {}
	tmp.ranks.fp = new ExpantaNum(1)
	if (player.tier.gte(1)) tmp.ranks.fp = tmp.ranks.fp.times(1.25)
	if (player.tier.gte(3)) tmp.ranks.fp = tmp.ranks.fp.times(ExpantaNum.pow(1.1, player.tier))
	tmp.ranks.req = new ExpantaNum(10).times(ExpantaNum.pow(2, player.rank.div(tmp.ranks.fp).max(1).sub(1).pow(2)))
	tmp.ranks.desc = player.rank.lt(Number.MAX_VALUE)?(RANK_DESCS[player.rank.toNumber()]?RANK_DESCS[player.rank.toNumber()]:DEFAULT_RANK_DESC):DEFAULT_RANK_DESC
	tmp.ranks.canRankUp = player.distance.gte(tmp.ranks.req)
	tmp.ranks.layer = new Layer("rank", tmp.ranks.canRankUp, "semi-forced")
	
	// Tiers
	tmp.tiers = {}
	tmp.tiers.fp = new ExpantaNum(1)
	tmp.tiers.req = new ExpantaNum(3).plus(player.tier.times(tmp.tiers.fp).pow(2))
	tmp.tiers.desc = player.tier.lt(Number.MAX_VALUE)?(TIER_DESCS[player.tier.toNumber()]?TIER_DESCS[player.tier.toNumber()]:DEFAULT_TIER_DESC):DEFAULT_TIER_DESC
	tmp.tiers.canTierUp = player.rank.gte(tmp.tiers.req)
	tmp.tiers.layer = new Layer("tier", tmp.tiers.canTierUp, "semi-forced")
	
	// Rockets
	
	tmp.rockets = {}
	tmp.rockets.canRocket = player.distance.gte(LAYER_REQS["rockets"][1])
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal")
	tmp.rockets.eff = player.rockets.plus(1).logBase(3)
	tmp.rockets.accPow = tmp.acc.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	tmp.rockets.mvPow = tmp.maxVel.plus(1).log10().pow(tmp.rockets.eff).plus(player.rockets)
	
	// Features
	
	tmp.features = {
		rockets: new Feature({name: "rockets", req: LAYER_REQS["rockets"][1], res: "distance", display: formatDistance, reached: player.rockets.gt(0)}),
	}
	tmp.nf = "none"
	for (let i=0;i<Object.keys(tmp.features).length;i++) {
		let feature = Object.values(tmp.features)[i]
		if (!feature.reached) {
			tmp.nf = feature.name
			break;
		}
	}
	
	// Achievements
	tmp.ach = {}
	for (let r=1;r<=ACH_DATA.rows;r++) {
		for (let c=1;c<=ACH_DATA.cols;c++) {
			let id = r*10+c
			tmp.ach[id] = new Achievement({name: id, has: player.achievements.includes(id)})
		}
	}
	if (tmp.selAch===undefined||player.tab!=="achievements") tmp.selAch = 0
}

// Elements

function updateElements() {
	// Main
	tmp.el.distance.setTxt(formatDistance(player.distance))
	tmp.el.velocity.setTxt(formatDistance(player.velocity))
	tmp.el.maxVel.setTxt(formatDistance(tmp.maxVel))
	tmp.el.acceleration.setTxt(formatDistance(tmp.acc))
	
	// Ranks
	tmp.el.rank.setTxt(showNum(player.rank))
	tmp.el.rankUp.setClasses({btn: true, locked: !tmp.ranks.canRankUp})
	tmp.el.rankDesc.setTxt(tmp.ranks.desc)
	tmp.el.rankReq.setTxt(formatDistance(tmp.ranks.req))
	
	// Tiers
	tmp.el.tier.setTxt(showNum(player.tier))
	tmp.el.tierUp.setClasses({btn: true, locked: !tmp.tiers.canTierUp})
	tmp.el.tierDesc.setTxt(tmp.tiers.desc)
	tmp.el.tierReq.setTxt(showNum(tmp.tiers.req))
	
	// Rockets
	tmp.el.rocketReset.setClasses({btn: true, locked: !tmp.rockets.canRocket})
	tmp.el.rocketGain.setTxt(showNum(tmp.rockets.layer.gain))
	tmp.el.rocketsAmt.setTxt(showNum(player.rockets))
	tmp.el.rocketsEff.setTxt(showNum(tmp.rockets.eff))
	
	// Features
	tmp.el.nextFeature.setTxt((tmp.nf === "none") ? "" : (tmp.features[tmp.nf].desc))
	
	// Achievements
	tmp.el.achDesc.setHTML("<br>"+(tmp.selAch==0?"":tmp.ach[tmp.selAch].desc))
	for (let r=1;r<=ACH_DATA.rows;r++) {
		for (let c=1;c<=ACH_DATA.cols;c++) {
			let id = r*10+c
			tmp.el["ach"+id].setClasses({achCont: true, dgn: player.achievements.includes(id)})
		}
	}
}

// Achievements

function updateAchievements() {
	if (player.distance.gte(100)) tmp.ach[11].grant()
	if (player.rank.gt(1)) tmp.ach[12].grant()
	if (player.tier.gte(1)) tmp.ach[13].grant()
	if (player.rockets.gt(0)) tmp.ach[14].grant()
	
	if (player.distance.gte(5e5)) tmp.ach[21].grant()
	if (player.rank.gte(8)) tmp.ach[22].grant()
	if (player.tier.gte(3)) tmp.ach[23].grant()
	if (player.rockets.gte(2)) tmp.ach[24].grant()
}

// Game Loop

function gameLoop(diff) {
	updateTemp()
	updateElements()
	player.velocity = player.velocity.plus(tmp.acc.times(diff)).min(tmp.maxVel)
	player.distance = player.distance.plus(player.velocity.times(diff))
	updateTabs()
	updateAchievements()
}

var interval = setInterval(function() {
	gameLoop(new ExpantaNum(1/33))
}, 33)