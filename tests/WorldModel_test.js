describe("WorldModel", function() {
  it("has a working getter for Snake", function() {
    let foo = new Snake;
    let bar = new WorldModel(foo);
    expect(bar.snake).toBeDefined();
  });
  it("has a working getter for width", function() {
    let T = new Snake;
    let TWorld = new WorldModel(T);
    expect(TWorld.width).toBeDefined();
  });
  it("has a working getter for height", function() {
    let t = new Snake;
    let tWorld = new WorldModel(t);
    expect(tWorld.height).toBeDefined();
  });
  it("has a workling setter for view", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    expect(aWorld.view_).toBe(null);
    let foo = new CanvasView(10);
    aWorld.view = foo;
    expect(aWorld.view_).toBeDefined();
  });
  it("updates correctly", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    aWorld.update(5);
    expect(aWorld.snake.position.posX).toBe(5);
    expect(aWorld.snake.position.posY).toBe(0);
  });
});
