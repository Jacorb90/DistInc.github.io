function updateTempNerfs() {
	tmp.nerfs = {}
	tmp.nerfs.active = function(name) {
		if (name=="maxVelActive") {
			let active = true
			if (tmp.inf) if (tmp.inf.upgs.has("6;7")) active = false
			return active
		}
		if (name=="nerfAccel") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("reality", 4):true)
			return active
		}
		if (name=="nerfMaxVel") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("infinity", 2)||tmp.inf.stadium.active("reality", 3)):true)
			return active
		}
		if (name=="scaledRank") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("drigganiz", 2)||tmp.inf.stadium.active("solaris", 3)):true)
			return active
		}
		if (name=="noRank") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("infinity"):true)
			return active
		}
		if (name=="scaledTier") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("drigganiz", 3):true)
			return active
		}
		if (name=="noTier") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("infinity"):true)
			return active
		}
		if (name=="noRockets") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("spaceon")||tmp.inf.stadium.active("drigganiz", 5)):true)
			return active
		}
		if (name=="scaledRF") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("solaris", 2):true)
			return active
		}
		if (name=="noRF") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("infinity", 3):true)
			return active
		}
		if (name=="noTimeCubes") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("eternity", 5)||tmp.inf.stadium.active("infinity", 6)):true)
			return active
		}
		if (name=="nerfTS") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("drigganiz")||tmp.inf.stadium.active("spaceon", 2)):true)
			return active
		}
		if (name=="noTS") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("eternity")||tmp.inf.stadium.active("reality", 2)):true)
			return active
		}
		if (name=="noCadavers") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("solaris")||tmp.inf.stadium.active("drigganiz", 5)):true)
			return active
		}
		if (name=="noLifeEssence") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("spaceon", 3):true)
			return active
		}
		if (name=="weakPathogenUpgs") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("eternity", 3)||tmp.inf.stadium.active("infinity", 5)):true)
			return active
		}
		if (name=="noPathogenUpgs") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("drigganiz")||tmp.inf.stadium.active("eternity", 6)||tmp.inf.stadium.active("reality", 6)):true)
			return active
		}
		if (name=="noDarkFlow") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("eternity", 2):true)
			return active
		}
		if (name=="noDarkCores") {
			let active = false
			active = active||(tmp.inf?(tmp.inf.stadium.active("reality", 5)||tmp.inf.stadium.active("drigganiz", 6)):true)
			return active
		}
		if (name=="noInf1;1") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("spaceon", 4):true)
			return active
		}
		if (name=="preInf.1") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.active("reality"):true)
			return active
		}
		if (name=="noPerks") {
			let active = false
			active = active||(tmp.inf?tmp.inf.stadium.anyActive():true)
			return active
		}
	}
	tmp.nerfs.adjust = function(val, type) {
		let preinf = (type=="vel"||type=="dist"||type=="scraps"||type=="intel"||type=="tc"||type=="rockets"||type=="pathogens"||type=="dc"||type=="lifeEssence"||type=="cadavers")
		let postinf = (type=="knowledge"||type=="ascension")
		let exp = new ExpantaNum(1)
		if (tmp.nerfs.active("preInf.1") && preinf) exp = exp.div(10)
		if (player.inf.pantheon.purge.active && type=="vel") exp = exp.div(3)
		return val.pow(exp)
	}
}