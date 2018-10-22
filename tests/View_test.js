describe("CanvasView", function() {
	it("properly initializes a scalingFactor_ property, a canvas_ property, and context_ property.", function() {
		let foo = new CanvasView(10);
		expect(this.scalingFactor_).toBeDefined();
		expect(this.canvas_).toBeDefined();
		expect(this.context_).toBeDefined();
	});
	it("displays properly", function() {
		let foo = new CanvasView(10);
		let s = new Snake;
		let bar = new WorldModel(s);
		foo.display(bar);
		expect(this.canvas_.width).toBe(1000);
		expect(this.canvas_.height).toBe(1000);
	});
});