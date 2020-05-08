class Feature {
	constructor(data) {
		this.name = data.name
		this.req = data.req
		this.res = data.res
		this.display = data.display
		this.r = data.reached||false
		this.spec = Array.isArray(data.res)
	}
	
	get amt() { return this.spec?(player[this.res[0]][this.res[1]]):player[this.res] }
	
	get dispAmt() { return this.spec?capitalFirst(this.res[1]):capitalFirst(this.res) }
	
	get reached() { return this.amt.gte(this.req)||this.r }
	
	get desc() { return this.reached ? "" : ("Reach "+this.display(this.req)+" "+(this.res=="distance"?"":this.dispAmt)+" to unlock "+this.name+".") }
}