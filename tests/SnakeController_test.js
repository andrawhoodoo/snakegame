describe("SnakeController", function() {
  it("has a working getter for the Snake's position", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    let aCont = new SnakeController(aWorld, a);
    expect(aCont.snakePosition).toBeDefined();
  });
  it("has a working getter for the Snake's direction", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    let aCont = new SnakeController(aWorld, a);
    expect(aCont.snakeDirection).toBeDefined();
  });
  it("has a working getter for the World's height", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    let aCont = new SnakeController(aWorld, a);
    expect(aCont.worldHeight).toBeDefined();
  });
  it("has a working getter for the World's width", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    let aCont = new SnakeController(aWorld, a);
    expect(aCont.worldWidth).toBeDefined();
  });
  it("turns the snake left correctly", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    let aCont = new SnakeController(aWorld, a);
    aCont.turnSnakeLeft();
    expect(aCont.snakeDirection).toBe("up");
  });
  it("turns the snake right correctly", function() {
    let a = new Snake;
    let aWorld = new WorldModel(a);
    let aCont = new SnakeController(aWorld, a);
    aCont.turnSnakeRight();
    expect(aCont.snakeDirection).toBe("down");
  });
});