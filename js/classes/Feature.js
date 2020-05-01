class Feature {
	constructor(data) {
		this.name = data.name
		this.req = data.req
		this.res = data.res
		this.display = data.display
		this.r = data.reached||false
	}
	
	get reached() { return player[this.res].gte(this.req)||this.r }
	
	get desc() { return this.reached ? "" : ("Reach "+this.display(this.req)+" "+(this.res=="distance"?"":this.res)+" to unlock "+this.name+".") }
}