const Point = require("../src/point.js");
const Snake = require("../src/snake.js");

function SharedSetup() {
	beforeEach(function() {
		let p = new Point(0, 0);
		let S = new Snake(p, 5);
	});
}

let p = new Point(0, 0);
let S = new Snake(p, 5);
describe("Snake", function() {
  it("has a working getter for direction", function() {
		SharedSetup();
    expect(S.direction).toBeDefined();
  });
  it("has a working getter for position", function() {
		SharedSetup();
    expect(S.position).toBeDefined();
  });
  it("turns left correctly", function() {
    SharedSetup();
		S.turnLeft();
    expect(S.direction).toBe("up");
    S.turnLeft();
    expect(S.direction).toBe("left");
    S.turnLeft();
    expect(S.direction).toBe("down");
    S.turnLeft();
    expect(S.direction).toBe("right");
  });
  it("turns right correctly", function() {
    SharedSetup();
		S.turnLeft();
    expect(S.direction).toBe("down");
    S.turnLeft();
    expect(S.direction).toBe("left");
    S.turnLeft();
    expect(S.direction).toBe("up");
    S.turnLeft();
    expect(S.direction).toBe("right");
  });
  it("moves correctly", function(), {
    SharedSetup();
		S.move(2);
    expect(S.position).toBe("Point { x_: 2, y_: 0 }");
  });
	it("has a working getter for isActive", function() {
		SharedSetup();
		expect(S.isActive).toBeDefined();
	});
	it("grows correctly", function() {
		SharedSetup();
		S.grow();
		expect(S.parts_.length).toBe(6);
	});
	it("has a working didCollide method", function() {
		SharedSetup();
		let q = new Point(0, 0);
		expect(S.didCollide(q)).toBe(true);
	})
	it("dies correctly", function() {
		SharedSetup();
		S.die();
		expect(S.isActive).toBe(false);
	});
	it("has a working getter for type", function() {
		SharedSetup();
		expect(S.type).toBe("Snake");
	});
	it("has a working getter for color", function() {
		SharedSetup();
		expect(S.color).toBeDefined();
	})
});