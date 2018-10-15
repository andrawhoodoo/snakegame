describe("Snake", function() {
  it("has a working getter for direction", function() {
    let A = new Snake;
    expect(A.direction).toBeDefined();
  });
  it("has a working getter for position", function() {
    let B = new Snake;
    expect(B.position).toBeDefined();
  });
  it("turns left correctly", function() {
    let a = new Snake;
    a.turnLeft();
    expect(a.direction).toBe("up");
    a.turnLeft();
    expect(a.direction).toBe("left");
    a.turnLeft();
    expect(a.direction).toBe("down");
    a.turnLeft();
    expect(a.direction).toBe("right");
  });
  it("turns right correctly", function() {
    let b = new Snake;
    b.turnRight();
    expect(b.direction).toBe("down");
    b.turnRight();
    expect(b.direction).toBe("left");
    b.turnRight();
    expect(b.direction).toBe("up");
    b.turnRight();
    expect(b.direction).toBe("right");
  });
  it("moves correctly", function(), {
    let S = new Snake;
    let s = new Snake;
    S.move(2);
    s.turnLeft();
    s.move(1);
    expect(S.position).toBe("Point { x_: 2, y_: 0 }");
    expect(s.position).toBe("Point { x_: 0, y_: 1 }");
  });
});