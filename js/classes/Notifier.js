class Notifier {
	doNotify = function(txt, type, id="none") { id!=="none"?$("#"+id).notify(txt, type):$.notify(txt, type) }
	
	success = function(txt, id="none") { this.doNotify(txt, "success", id) }
	
	info = function(txt, id="none") { this.doNotify(txt, "info", id) }
	
	warn = function(txt, id="none") { this.doNotify(txt, "warn", id) }
	
	error = function(txt, id="none") { this.doNotify(txt, "error", id) }
}