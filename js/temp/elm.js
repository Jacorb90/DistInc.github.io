function updateTempElementary() {
	// Elementary Layer
	tmp.elm = {}
	tmp.elm.can = player.rockets.gte(LAYER_REQS.elementary[0][1])&&player.collapse.cadavers.gte(LAYER_REQS.elementary[1][1])&&player.inf.endorsements.gte(LAYER_REQS.elementary[2][1])
	tmp.elm.gain = function() {
		if (!tmp.elm.can) return new ExpantaNum(0)
		let f1 = player.rockets.max(1).log10().div(LAYER_REQS.elementary[0][1].log10()).pow(2)
		let f2 = player.collapse.cadavers.max(1).log10().div(LAYER_REQS.elementary[1][1].log10()).pow(2)
		let f3 = ExpantaNum.pow(10, player.inf.endorsements.div(LAYER_REQS.elementary[2][1]).sub(1))
		let gain = f1.times(f2).times(f3)
		return gain.floor()
	}()
	tmp.elm.layer = new Layer("elementary", tmp.elm.can, "multi-res", true, "elm")
	tmp.elm.doGain = function() {
		if (!confirm("Are you sure you want to do this? It will take some time for you to get back here!")) return "NO"
		player.elementary.particles = player.elementary.particles.plus(tmp.elm.layer.gain)
	}
	tmp.elm.onReset = function(prev) {
		player.elementary.times = player.elementary.times.plus(1)
		player.elementary.fermions.quarks.amount = new ExpantaNum(0)
		player.elementary.fermions.leptons.amount = new ExpantaNum(0)
		player.elementary.bosons.gauge = {
			amount: new ExpantaNum(0),
			force: new ExpantaNum(0),
			photons: {
				amount: new ExpantaNum(0),
				upgrades: player.elementary.bosons.gauge.photons.upgrades,
			},
			w: new ExpantaNum(0),
			z: new ExpantaNum(0),
			gluons: {
				r: {amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades},
				g: {amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades},
				b: {amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades},
				ar: {amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades},
				ag: {amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades},
				ab: {amount: new ExpantaNum(0), upgrades: player.elementary.bosons.gauge.gluons.r.upgrades},
			},
			gravitons: new ExpantaNum(0),
		}
		player.elementary.bosons.scalar.amount = new ExpantaNum(0)
		player.elementary.bosons.scalar.higgs.amount = new ExpantaNum(0)
	}
	
	// Elementary Tab System
	tmp.elm.updateTabs = function() {
		let tabs = Element.allFromClass("elmtab")
		for (let i=0;i<tabs.length;i++) {
			tabs[i].setDisplay(elmTab==tabs[i].id)
			new Element(tabs[i].id+"tabbtn").setDisplay(ELM_TABS[tabs[i].id]())
		}
	}
	tmp.elm.showTab = function(name) {
		if (elmTab==name) return
		elmTab = name
		tmp.elm.updateTabs()
	}
	tmp.elm.updateTabs()
	
	// Fermions
	tmp.elm.ferm = {}
	tmp.elm.ferm.transfer1 = function() {
		if (player.elementary.particles.lt(1)) return
		player.elementary.particles = player.elementary.particles.sub(1)
		player.elementary.fermions.amount = player.elementary.fermions.amount.plus(1)
	}
	tmp.elm.ferm.transfer = function(ratio) {
		if (player.elementary.particles.times(ratio).floor().lt(1)) return
		let toSub = player.elementary.particles.times(ratio).floor()
		player.elementary.particles = player.elementary.particles.sub(toSub)
		player.elementary.fermions.amount = player.elementary.fermions.amount.plus(toSub)
	}
	tmp.elm.ferm.quarkGain = player.elementary.fermions.amount.times(player.inf.endorsements.plus(1).sqrt())
	tmp.elm.ferm.leptonGain = player.elementary.fermions.amount.times(tmp.inf.pantheon.totalGems.plus(1)).div(2.5)
	
	// Bosons
	tmp.elm.bos = {}
	tmp.elm.bos.transfer1 = function() {
		if (player.elementary.particles.lt(1)) return
		player.elementary.particles = player.elementary.particles.sub(1)
		player.elementary.bosons.amount = player.elementary.bosons.amount.plus(1)
	}
	tmp.elm.bos.transfer = function(ratio) {
		if (player.elementary.particles.times(ratio).floor().lt(1)) return
		let toSub = player.elementary.particles.times(ratio).floor()
		player.elementary.particles = player.elementary.particles.sub(toSub)
		player.elementary.bosons.amount = player.elementary.bosons.amount.plus(toSub)
	}
	tmp.elm.bos.updateTabs = function() {
		let tabs = Element.allFromClass("bostab")
		for (let i=0;i<tabs.length;i++) tabs[i].setDisplay(bosTab==tabs[i].id)
	}
	tmp.elm.bos.showTab = function(name) {
		if (bosTab==name) return
		bosTab = name
		tmp.elm.bos.updateTabs()
	}
	tmp.elm.bos.updateTabs()
	tmp.elm.bos.gaugeGain = player.elementary.bosons.amount.times(player.inf.ascension.power.plus(1).log10().plus(1))
	tmp.elm.bos.scalarGain = player.elementary.bosons.amount.sqrt().div(1.8)
}