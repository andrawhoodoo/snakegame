describe("Point", function() {
  it("has a working getter for x-coordinate", function() {
    let p = new Point(1, 2);
    expect(p.posX).toBeDefined();
  });
  it("has a working getter for y-coordinate", function() {
    let t = new Point(2, 1);
    expect(t.posY).toBeDefined();
  });
});