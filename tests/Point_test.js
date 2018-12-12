const Point = require("../src/point.js");
describe("Point", function() {
  it("has a working getter for x-coordinate", function() {
    let p = new Point(1, 2);
    expect(p.posX).toBeDefined();
  });
  it("has a working getter for y-coordinate", function() {
    let t = new Point(2, 1);
    expect(t.posY).toBeDefined();
  });
	it("has a working method to see if other points share the same coordinate", function () {
			let p = new Point(10, 11);
			let q = new Point(12, 9);
			let r = new Point(10, 11);
			expect(p.equals(r)).toBe(true);
			expect(p.equals(q)).toBe(false);
	});
});