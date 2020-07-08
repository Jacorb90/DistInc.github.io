function updateTempElementary() {
	if (tmp.elm) {
		tmp.psiEff = tmp.elm.ferm.leptonR("psi")
	}
	
	// Elementary Layer
	tmp.elm = {}
	tmp.elm.can = player.rockets.gte(LAYER_REQS.elementary[0][1])&&player.collapse.cadavers.gte(LAYER_REQS.elementary[1][1])&&player.inf.endorsements.gte(LAYER_REQS.elementary[2][1])
	tmp.elm.gain = function() {
		if (!tmp.elm.can) return new ExpantaNum(0)
		let f1 = player.rockets.max(1).log10().div(LAYER_REQS.elementary[0][1].log10()).sqrt()
		let f2 = player.collapse.cadavers.max(1).log10().div(LAYER_REQS.elementary[1][1].log10())
		let f3 = ExpantaNum.pow(2, player.inf.endorsements.div(LAYER_REQS.elementary[2][1]).sub(1))
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
	// Quarks
	tmp.elm.ferm.quarkGain = player.elementary.fermions.amount.times(player.inf.endorsements.plus(1).sqrt()).times((tmp.psiEff?tmp.psiEff:new ExpantaNum(0)).max(1))
	tmp.elm.ferm.quarkRewards = new ExpantaNum(player.elementary.fermions.quarks.amount).max(1).logBase(50).floor()
	tmp.elm.ferm.quarkName = function(noExp=false) {
		let name = QUARK_NAMES[player.elementary.fermions.quarks.type-1]
		let stacks = tmp.elm.ferm.quarkRewards.sub(player.elementary.fermions.quarks.type).div(QUARK_NAMES.length).plus(1).ceil()
		return capitalFirst(name)+(noExp?"":(stacks.gt(1)?("<sup>"+stacks+"</sup>"):""))
	}
	tmp.elm.ferm.quarkEff = function(name) {
		let qks = player.elementary.fermions.quarks.amount
		let stacks = tmp.elm.ferm.quarkRewards.sub(QUARK_NAMES.indexOf(name)+1).div(QUARK_NAMES.length).plus(1).ceil()
		if (stacks.gte(8)) stacks = stacks.sqrt().times(Math.sqrt(8))
		if (name=="up") return qks.plus(1).pow(ExpantaNum.mul(5, stacks))
		else if (name=="down") return qks.plus(1).pow(ExpantaNum.mul(Math.sqrt(2), stacks.sqrt()))
		else if (name=="charm") return qks.plus(1).pow(ExpantaNum.mul(0.1, stacks.cbrt()))
		else if (name=="strange") return player.elementary.fermions.amount.plus(1).times(qks.plus(1).sqrt().log10().plus(1)).pow(ExpantaNum.mul(0.2, stacks.sqrt())).times(qks.eq(0)?0:1).plus(1)
		else if (name=="top") return ExpantaNum.pow(ExpantaNum.mul(2, qks.plus(1).log10().div(100).plus(1)), stacks.pow(0.8)).times(qks.eq(0)?0:1).plus(1)
		else if (name=="bottom") return ExpantaNum.pow(ExpantaNum.mul(0.4, qks.plus(1).log10()).plus(1), stacks.plus(1))
	}
	tmp.elm.ferm.quarkR = function(name) {
		if (name==QUARK_NAMES[player.elementary.fermions.quarks.type-1]) return tmp.elm.ferm.quarkEff(name)
		else return new ExpantaNum(1)
	}
	tmp.elm.ferm.quarkDesc = function(name) {
		let desc = QUARK_DESCS[name]+"     "
		desc += "Currently: "+showNum(tmp.elm.ferm.quarkEff(name))+"x"
		return desc
	}
	tmp.elm.ferm.changeQuark = function() { player.elementary.fermions.quarks.type=player.elementary.fermions.quarks.type%6+1 }
	
	// Leptons
	tmp.elm.ferm.leptonGain = player.elementary.fermions.amount.times(tmp.inf.pantheon.totalGems.plus(1)).div(2.5).times(tmp.elm.ferm.quarkR("top").max(1))
	tmp.elm.ferm.leptonRewards = new ExpantaNum(player.elementary.fermions.leptons.amount).max(1).logBase(100).floor()
	tmp.elm.ferm.leptonName = function(noExp=false) {
		let name = LEPTON_NAMES[player.elementary.fermions.leptons.type-1]
		let stacks = tmp.elm.ferm.leptonRewards.sub(player.elementary.fermions.leptons.type).div(LEPTON_NAMES.length).plus(1).ceil()
		return capitalFirst(name)+(noExp?"":(stacks.gt(1)?("<sup>"+stacks+"</sup>"):""))
	}
	tmp.elm.ferm.leptonEff = function(name) {
		let lpts = player.elementary.fermions.leptons.amount
		let stacks = tmp.elm.ferm.leptonRewards.sub(LEPTON_NAMES.indexOf(name)+1).div(LEPTON_NAMES.length).plus(1).ceil()
		if (stacks.gte(8)) stacks = stacks.sqrt().times(Math.sqrt(8))
		if (name=="electron") return lpts.plus(1).times(10).slog(10).pow(ExpantaNum.mul(0.1, stacks.plus(1).log10().plus(1))).sub(1).div(10).max(0)
		else if (name=="muon") return lpts.times(ExpantaNum.pow(2.5, stacks)).plus(1).times(10).slog(10).sqrt()
		else if (name=="tau") return ExpantaNum.pow(player.inf.knowledge.plus(1).log10().plus(1).log10().plus(1), lpts.times(ExpantaNum.pow(2.5, stacks)).plus(1).times(10).slog(10).div(5))
		else if (name=="netrion") return lpts.times(ExpantaNum.pow(2, stacks)).plus(1).times(10).slog(10).sub(1).div(100).max(0)
		else if (name=="vibrino") return lpts.times(ExpantaNum.pow(1.4, stacks)).plus(1).times(16).slog(16).sub(1).div(250).max(0)
		else if (name=="psi") return lpts.plus(1).log10().plus(1).pow(stacks.plus(0.5))
	}
	tmp.elm.ferm.leptonR = function(name) {
		if (name==LEPTON_NAMES[player.elementary.fermions.leptons.type-1]) return tmp.elm.ferm.leptonEff(name)
		else return new ExpantaNum(1)
	}
	tmp.elm.ferm.leptonDesc = function(name) {
		let desc = LEPTON_DESCS[name]+"      Currently: "
		let eff = tmp.elm.ferm.leptonEff(name)
		if (name=="electron"||name=="netrion"||name=="vibrino") desc+="+"+showNum(eff.times(100))+"%"
		else if (name=="muon") desc += "^"+showNum(eff)
		else desc += showNum(eff)+"x" 
		return desc
	}
	tmp.elm.ferm.changeLepton = function() { player.elementary.fermions.leptons.type=player.elementary.fermions.leptons.type%6+1 }
	
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
	tmp.elm.bos.scalarGain = player.elementary.bosons.amount.sqrt().times(0.6)
}