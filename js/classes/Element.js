class Element {
	constructor(el) {
		this.id = (typeof el == "string")?el:el.id
		this.el = document.getElementById(this.id)
	}
	
	setTxt(txt) { this.el.textContent = txt }
	static setTxt(id, txt) { new Element(id).setTxt(txt) }
	
	setHTML(html) { this.el.innerHTML = html }
	static setHTML(id, html) { new Element(id).setHTML(html) }
	
	setDisplay(bool) { this.el.style.display = bool?"":"none" }
	static setDisplay(id, bool) { new Element(id).setDisplay(bool) }
	
	addClass(name) { this.el.classList.add(name) }
	static addClass(id, name) { new Element(id).addClass(name) }
	
	removeClass(name) { this.el.classList.remove(name) }
	static removeClass(id, name) { new Element(id).removeClass(name) }
	
	clearClasses() { this.el.className = "" }
	static clearClasses(id) { new Element(id).clearClasses() }
	
	setClasses(data) {
		this.clearClasses()
		let list = Object.keys(data).filter(x => data[x])
		for (let i=0;i<list.length;i++) this.addClass(list[i])
	}
	static setClasses(id, data) { new Element(id).setClasses(data) }
	
	changeStyle(type, input) { this.el.style[type] = input }
	static changeStyle(id, type, input) { new Element(id).changeStyle(type, input) }
}