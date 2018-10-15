describe("AvoidWallsPlayer", function() {
  it("avoids walls correctly", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    let aCont = new SnakeController(aWorld, a);
    let foo = new AvoidWallsPlayer(aCont);
    a.move(99);
    foo.makeTurn();
    expect(a.direction).toBe("down");
  });
});