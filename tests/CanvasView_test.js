const CanvasView = require("../src/canvasView.js");
const Point = require("../src/point.js");
const Snake = require("../src/snake.js");
const WorldModel = require("../src/worldModel.js");
const ActorCollisionHandler = require("../src/actorCollisionHandler.js");

function SharedSetup () {
	beforeEach( function() {
		let foo = new CanvasView(10);
	});
}

describe("CanvasView", function() {
	it("properly initializes a scalingFactor_ property, a canvas_ property, and context_ property.", function() {
		SharedSetup();
		expect(this.scalingFactor_).toBeDefined();
		expect(this.canvas_).toBeDefined();
		expect(this.context_).toBeDefined();
	});
	it("displays properly", function() {
		SharedSetup();
		let ach = new ActorCollisionHandler;
		let bar = new WorldModel(ach);
		foo.display(bar);
		expect(foo.canvas_.width).toBe(1000);
		expect(foo.canvas_.height).toBe(1000);
	});
});
