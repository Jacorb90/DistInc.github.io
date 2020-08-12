function nerfActive(name) {
	if (name == "maxVelActive") {
		let active = true;
		if (tmp.inf) if (tmp.inf.upgs.has("6;7")) active = false;
		return active;
	}
	if (name == "nerfAccel") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("reality", 4) : true);
		return active;
	}
	if (name == "nerfMaxVel") {
		let active = false;
		active =
			active ||
			(tmp.inf ? tmp.inf.stadium.active("infinity", 2) || tmp.inf.stadium.active("reality", 3) : true);
		return active;
	}
	if (name == "scaledRank") {
		let active = false;
		active =
			active ||
			(tmp.inf ? tmp.inf.stadium.active("drigganiz", 2) || tmp.inf.stadium.active("solaris", 3) : true);
		return active;
	}
	if (name == "noRank") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("infinity") : true);
		return active;
	}
	if (name == "scaledTier") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("drigganiz", 3) : true);
		return active;
	}
	if (name == "noTier") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("infinity") : true);
		if (extremeStadiumActive("aqualon", 4)) active = true;
		return active;
	}
	if (name == "noRockets") {
		let active = false;
		active =
			active ||
			(tmp.inf ? tmp.inf.stadium.active("spaceon") || tmp.inf.stadium.active("drigganiz", 5) : true);
		return active;
	}
	if (name == "scaledRF") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("solaris", 2) : true);
		return active;
	}
	if (name == "noRF") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("infinity", 3) : true);
		return active;
	}
	if (name == "noTimeCubes") {
		let active = false;
		active =
			active ||
			(tmp.inf ? tmp.inf.stadium.active("eternity", 5) || tmp.inf.stadium.active("infinity", 6) : true);
		return active;
	}
	if (name == "nerfTS") {
		let active = false;
		active =
			active ||
			(tmp.inf ? tmp.inf.stadium.active("drigganiz") || tmp.inf.stadium.active("spaceon", 2) : true);
		if (extremeStadiumActive("aqualon", 5)) active = true
		return active;
	}
	if (name == "noTS") {
		let active = false;
		active =
			active || (tmp.inf ? (tmp.inf.stadium.active("eternity")&&!(tmp.ach[116].has && modeActive('extreme')&&(player.inf.pantheon.purge.active||HCCBA("purge")))) || tmp.inf.stadium.active("reality", 2) : true);
		return active;
	}
	if (name == "noCadavers") {
		let active = false;
		active =
			active ||
			(tmp.inf
				? (((tmp.inf.stadium.active("solaris") && (!modeActive("extreme") || player.inf.stadium.current=="solaris")) ||
				  tmp.inf.stadium.active("drigganiz", 5)) && !((player.inf.pantheon.purge.active||HCCBA("purge"))&&(tmp.ach[147].has||modeActive("extreme"))))
				: true);
		if (HCCBA("noCad")) active = true
		return active;
	}
	if (name == "noLifeEssence") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("spaceon", 3) : true);
		return active;
	}
	if (name == "weakPathogenUpgs") {
		let active = false;
		active =
			active ||
			(tmp.inf ? tmp.inf.stadium.active("eternity", 3) || tmp.inf.stadium.active("infinity", 5) : true);
		return active;
	}
	if (name == "noPathogenUpgs") {
		let active = false;
		active =
			active ||
			(tmp.inf
				? ((tmp.inf.stadium.active("drigganiz") ||
				  tmp.inf.stadium.active("eternity", 6)) && !((tmp.ach[147].has||modeActive("extreme"))&&(player.inf.pantheon.purge.active||HCCBA("purge")))) ||
				  tmp.inf.stadium.active("reality", 6)
				: true);
		if (HCCBA("noPU")) active = true
		return active;
	}
	if (name == "noDarkFlow") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("eternity", 2) : true);
		return active;
	}
	if (name == "noDarkCores") {
		let active = false;
		active =
			active ||
			(tmp.inf ? tmp.inf.stadium.active("reality", 5) || tmp.inf.stadium.active("drigganiz", 6) : true);
		if (HCCBA("noDC")) active = true
		return active;
	}
	if (name == "noInf1;1") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("spaceon", 4) : true);
		return active;
	}
	if (name == "preInf.1") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.active("reality") : true);
		return active;
	}
	if (name == "noPerks") {
		let active = false;
		active = active || (tmp.inf ? tmp.inf.stadium.anyActive() : true);
		return active;
	}
	return false
}

function adjustGen(val, type) {
	let preinf =
		type == "vel" ||
		type == "dist" ||
		type == "fn" ||
		type == "scraps" ||
		type == "intel" ||
		type == "tc" ||
		type == "rockets" ||
		type == "pathogens" ||
		type == "dc" ||
		type == "lifeEssence" ||
		type == "cadavers";
	let pre_elem =
		type == "knowledge" ||
		type == "ascension" ||
		type == "heavenlyChips" ||
		type == "demonicSouls" ||
		type == "derv" || preinf;
	let post_elem = type == "quarks" || type == "leptons" || type == "gauge" || type == "scalar" || type=="ss" || type=="str" || type=="preons" || type=="accelerons" || type=="inflatons" || type=="hc";
	let exp = new ExpantaNum(1);
	if (player.elementary.theory.supersymmetry.unl && pre_elem && tmp.elm) val = new ExpantaNum(val).times(new ExpantaNum(tmp.elm.theory.ss.waveEff||1).max(1))
	if (nerfActive("preInf.1") && preinf) exp = exp.div(10);
	if ((player.inf.pantheon.purge.active||HCCBA("purge")) && type == "vel") exp = exp.div(modeActive('extreme')?0.925:3);
	if ((player.elementary.theory.active||HCTVal("tv").gt(-1)) && pre_elem) exp = exp.times(tmp.elm.theory.nerf)
	if (modeActive("extreme") && preinf) {
		let e = new ExpantaNum(FCComp(4)?0.825:0.75);
		if (extremeStadiumActive("spectra")) e = e.pow(2)
		exp = exp.times(e);
	}
	let newVal = val.pow(exp);
	if (modeActive("hard") && pre_elem) newVal = newVal.div(3.2)
	if (modeActive("hard") && (type=="pathogens"||(extremeStadiumComplete("aqualon") && preinf))) newVal = newVal.times(3)
	if (extremeStadiumActive("aqualon") && preinf) newVal = newVal.div(9e15)
	return newVal;
}

