class Notifier {
	doNotify(txt, type, id="none") { id!=="none"?$("#"+id).notify(txt, type):$.notify(txt, type) }
	
	success(txt, id="none") { this.doNotify(txt, "success", id) }
	
	info(txt, id="none") { this.doNotify(txt, "info", id) }
	
	warn(txt, id="none") { this.doNotify(txt, "warn", id) }
	
	error(txt, id="none") { this.doNotify(txt, "error", id) }
}