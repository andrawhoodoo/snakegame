const Point = require("../src/point.js");
const Snake = require("../src/snake.js");
const ActorCollisionHandler = require("../src/actorCollisionHandler.js");
const WallFoodCollisionHandler = require("../src/wallFoodCollisionHandler.js");
const SnakeWallCollisionHandler = require("../src/snakeWallCollisionHandler.js");
const SnakeFoodCollisionHandler = require("../src/snakeFoodCollisionHandler.js");
const SnakeSnakeCollisionHandler = require("../src/snakeSnakeCollisionHandler.js");
const WorldModel = require("../src/worldModel.js");
const SnakeController = require("../src/snakeController.js");
const HumanPlayer = require("../src/humanPlayer.js");
const LRKeyInputHandler = require("../src/LRKeyInputHandler.js");
const CanvasView = require("../src/canvasView.js");

function SharedSetup() {
	beforeEach(function() {
		let p = new Point(0, 0);
		let foo = new Snake(p, 5);
		let Handler = new ActorCollisionHandler;
		let WFCH = new WallFoodCollisionHandler;
		Handler.addCollisionAction("Wall", "Food", WFCH);
		let SWCH = new SnakeWallCollisionHandler;
		Handler.addCollisionAction("Snake", "Wall", SWCH);
		let SFCH = new SnakeFoodCollisionHandler;
		Handler.addCollisionAction("Snake", "Food", SFCH);
		let SSCH = new SnakeSnakeCollisionHandler;
		Handler.addCollisionAction("Snake", "Snake", SSCH);
		HelloWorld = new WorldModel(Handler, 42, 42);
		let SC = new SnakeController(HelloWorld, foo);
		let player = new HumanPlayer(SC, new LRKeyInputHandler);
		HelloWorld.addActor(foo);
	});
}


describe("WorldModel", function() {
  it("has a working getter for Actors", function() {
		SharedSetup();
    expect(HelloWorld.actors).toBeDefined();
  });
  it("has a working getter for width", function() {
		SharedSetup();
    expect(HelloWorld.width).toBeDefined();
  });
  it("has a working getter for height", function() {
		SharedSetup();
    expect(HelloWorld.height).toBeDefined();
  });
  it("has a workling setter for view", function() {
		SharedSetup();
		HelloWorld.addView(new CanvasView(10));
    expect(HelloWorld.view_).toBeDefined();
  });
  it("updates correctly", function() {
		SharedSetup();
    HelloWorld.update(5);
    expect(HelloWorld.snake.position.posX).toBe(5);
    expect(HelloWorld.snake.position.posY).toBe(0);
		expect(HelloWorld.actors_.some(x => x.type === "Food")).toBe(true);
  });
	it("has a working method to add actors", function() {
		SharedSetup();
		let f = new Food(10,10);
		HelloWorld.addActor(f);
		expect(HelloWorld.actors_.some(x => (x === f))).toBe(true);
	});
	it("has a working method to add views", function() {
		SharedSetup();
		expect(HelloWorld.views_.length).toBe(0);
		HelloWorld.addView(new CanvasView(10));
		expect(HelloWorld.views_.length).toBe(1);
	});
	it("resets correctly", function() {
		SharedSetup();
		HelloWorld.addView(new CanvasView(10));
		let f = new Food(10,10);
		HelloWorld.addActor(f);
		HelloWorld.reset();
		expect(HelloWorld.views_.length).toBe(0);
		expect(HelloWorld.actors_.length).toBe(0);
	});
});
