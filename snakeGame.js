 /** Class representing a 2 dimensional point. */
class Point {
  /**
   * Create a point.
   * @param {int} x - the "x" coordinate on a cartesian plane.
   * @param {int} y - the "y" coordinate on a cartesian plane.
   */
  constructor(x, y) {
    this.x_ = x;
    this.y_ = y;
  }
  /**
   * @type {int}
   */
  get posX() {
    return this.x_;
  }
  /**
   * @type {int}
   */
  get posY() {
    return this.y_;
  }
  equals(p) {
    if(p.posX == this.posX && p.posY == this.posY) return true;
    else return false;
  }
}

/** Class representing a Snake.*/
class Snake {
  /**
   * Create a snake.
   */
  constructor(startPosition, size) {
    this.parts_ = [startPosition];
    for(let index=1; index < (size - 1); index++) this.parts_.push(new Point(startPosition.posX, startPosition.posY + index));
    this.currentDir_ = "right";
  }
  /**
   * Changes the direction of the Snake by making a left turn relative to its current direction.
   */
  turnLeft() {
    if (this.currentDir_ === "right") {
      this.currentDir_ = "up";
    }
    else if(this.currentDir_ === "up") {
      this.currentDir_ = "left";
    }
    else if(this.currentDir_ === "left") {
      this.currentDir_ = "down";
    }
    else if(this.currentDir_ === "down") {
      this.currentDir_ = "right";
    }
  }
  /**
   * Changes the direction of the Snake by making a right turn relative to its current direction.
   */
  turnRight() {
    if (this.currentDir_ === "right") {
      this.currentDir_ = "down";
    }
    else if(this.currentDir_ === "up") {
      this.currentDir_ = "right";
    }
    else if(this.currentDir_ === "left") {
      this.currentDir_ = "up";
    }
    else if(this.currentDir_ === "down") {
      this.currentDir_ = "left";
    }
  }
  /**
   * Moves the Snake's position forward along its current direction.
   * @param {int} steps - The amount of 'steps' along the grid to increase the snake's position by.
   */
  move(steps) {
    for(let index = (this.parts_.length - 1); index > 0; index = index - 1) {
      this.parts_[index] = this.parts_[index-1];
    }
    if (this.currentDir_ === "right") {      
      this.parts_[0] = new Point(this.position.posX + steps, this.position.posY);
    }

    else if(this.currentDir_ === "left") {
      this.parts_[0] = new Point(this.position.posX - steps, this.position.posY);
    }
    else if(this.currentDir_ === "up") {
      this.parts_[0] = new Point(this.position.posX, this.position.posY - steps);
    }
    else if(this.currentDir_ === "down") {
      this.parts_[0] = new Point(this.position.posX, this.position.posY + steps);
    }
  }
  /**
   * @type {tuple}
   */
  get position() {
    return this.parts_[0];
  }
  /**
   * @type {string}
   */
  get direction() {
    return this.currentDir_;
  }
  didCollide(s) {
    if(s === this && this.parts_.slice(1).some(x => this.position.equals(x))) {
      return true;
    }
    else if(s != this && s.parts_.some(x => this.position.equals(x))) {
      return true;
    }
    else return false;
  }
}

/** Model Class representing a virtual world for a Snake. */
class WorldModel {
  /**
   * Creates a world model and ensures that an instance of Snake class is passed. Also initializes a view property.
   * @param {int} w - width of desired world view.  If no int passed, default to 100.
   * @param {int} h - height of desired world view. If no int passed, default to 100.
   */
  constructor(w, h) {
    this.width_ = w || 100;
    this.height_ = h || 100;
    this.views_ = [];
    this.snakes_ = [];
  }
  /**
   * Moves the snake belonging to the WorldModel; updates the display of CanvasView if there is a paired CanvasView class with this WorldModel.
   * @param {int} steps - the input for the snake's move function.
   */

  update(steps) {
    var crashedSnakes = [];
    this.snakes.forEach(x => x.move(steps));
    if(!(this.views_ == [])) {
      this.views_.forEach(x => x.display(this));
    }
    this.snakes.forEach(x => {
      for(let index = 0; index < this.snakes.length; index ++) {
      if(x.didCollide(this.snakes[index]) && crashedSnakes.every(y => y != x)) crashedSnakes.push(x);
      }
    });
    crashedSnakes.forEach(x => {
      for(let index = 0; index < this.snakes.length; index ++) {
      if(this.snakes[index] === x) this.snakes.splice(index, 1);
      }
    });
  }
  /**
   * @type {tuple}
   */
  get snakes() {
    return this.snakes_;
  }
  /**
   * @type {int}
   */
  get width() {
    return this.width_;
  }
  /**
   * @type {int}
   */
  get height() {
    return this.height_;
  }
  addSnake(s) {
    if(s instanceof Snake) {
      this.snakes_.push(s);
    }
    else throw new Error("Must be given a valid snake.");
  }
  addView(v) {
    if(v instanceof View) {
      this.views_.push(v);
    }
    else throw new Error("Must be given a valid view.");
  }
}

/** Class representing a means for a player to control the way a Snake class moves in a WorldModel class. */
class SnakeController {
  /**
   * Create a new SnakeController.
   * @param {class} World - the WorldModel you wish to use.
   * @param {class} Slitherer - the Snake you wish to use.
   */
  constructor(World, Slitherer) {
    if(World instanceof WorldModel) {
      this.snakeWorld_ = World;
    }
    else throw new Error("Not given a valid WorldModel");
    if(Slitherer instanceof Snake) {
      this.slitherer_ = Slitherer;
    }
    else throw new Error("Not given a valid Snake");
  }
  /**
   * Turns the snake left.
   */
  turnSnakeLeft() {
    this.slitherer_.turnLeft();
  }
  /**
   * Turns the snake right.
   */
  turnSnakeRight() {
    this.slitherer_.turnRight();
  }
  /**
   * @type {tuple}
   */  
  get snakePosition() {
    return this.slitherer_.position;
  }
  /**
   * @type {string}
   */  
  get snakeDirection() {
    return this.slitherer_.direction;
  }
  /**
   * @type {int}
   */  
  get worldHeight() {
    return this.snakeWorld_.height;
  }
  /**
   * @type {int}
   */  
  get worldWidth() {
    return this.snakeWorld_.width;
  }
}

/** Abstract base class that ensures any object of type "Player" has the ability to make the snake turn. */
class Player {
  /**
   * Create a new player.
   * @param {class} snakeController - the SnakeController class you wish to use.
   */
  constructor(snakeController) {
    if(!(snakeController instanceof SnakeController)) throw new Error("Not given a valid Snake Controller.");
    else this.sc_ = snakeController;
    if(this.constructor === Player) throw new Error("Cannot instantiate a Player, which is an abstract base class");
    else if(!(this.makeTurn instanceof Function)) throw new Error("Base class must implement makeTurn method.");
  }
}

/**Class representing an AI snake game player that avoids crashing into walls. */
class AvoidWallsPlayer extends Player {
  /**
   * Create an AvoidWallsPlayer by going to constructor of parent class Player.
   * @param {class} sc - the SnakeController you need to pass to the parent class.
   * @param {int} scalingFactor - must be the same exact scaling factor integer as provided for the CanvasView class.
   */
  constructor(sc, scalingFactor) {
    super(sc);
    this.scalingFactor_ = scalingFactor
  }
  /**
   * Turns the snake to avoid crashing into walls. Turns towards the direction in which there is the most space to move. If no collision with wall impending, does nothing.
   */
  makeTurn() {
    if(this.sc_.snakeDirection === "left" && this.sc_.slitherer_.position.posX == 0) {
      if(this.sc_.slitherer_.position.posY < ((this.sc_.worldHeight - 1)*(this.scalingFactor_))/2) {
        this.sc_.turnSnakeLeft();
      }
      else this.sc_.turnSnakeRight(); 
    }
    else if(this.sc_.snakeDirection === "right" && this.sc_.slitherer_.position.posX == ((this.sc_.worldWidth - 1)*(this.scalingFactor_))) {
      if(this.sc_.slitherer_.position.posY < ((this.sc_.worldHeight - 1)*(this.scalingFactor_))/2) {
        this.sc_.turnSnakeRight();
      }
      else this.sc_.turnSnakeLeft();
    }
    else if(this.sc_.snakeDirection === "up" && this.sc_.slitherer_.position.posY == 0) {
      if(this.sc_.slitherer_.position.posX < ((this.sc_.worldWidth - 1)*(this.scalingFactor_))/2) {
        this.sc_.turnSnakeRight();
      }
      else this.sc_.turnSnakeLeft();
    }
    else if(this.sc_.snakeDirection === "down" && this.sc_.slitherer_.position.posY == ((this.sc_.worldHeight - 1)*(this.scalingFactor_))) {
      if(this.sc_.slitherer_.position.posX < ((this.sc_.worldWidth - 1)*(this.scalingFactor_))/2) {
        this.sc_.turnSnakeLeft();
      }
      else this.sc_.turnSnakeRight();
    }
  }
}

/** Interface class that ensures any type of view has a display method.*/
class View {
  /**
   * Create a new view.
   */
  constructor() {
    if(this.constructor === View) throw new Error("Cannot instantiate a View, which is an interface");
    else if(!(this.display instanceof Function)) throw new Error("View class must implement display method.");
  }
}

/** Class representing what our player sees on their screen.*/
class CanvasView extends View {
  /**
   * Create a new CanvasView. Calls the constructor of the parent class View.
   * @param {int} scalingFactor - integer with which the width and height for the canvas as well as the dimensions of the snake is determined.
   */
  constructor(scalingFactor) {
    super();
    this.scalingFactor_ = scalingFactor;
    this.canvas_ = document.createElement("canvas");
    this.canvas_.id = "game";
    document.body.appendChild(this.canvas_);
    this.context_= this.canvas_.getContext("2d");
  }
  /**
   * Determines the width and height of the canvas as well as the size of the snake utilizing the scaling factor property.  Also displays both the canvas and our snake's current position.
   * @param {class} World - the WorldModel class in which our Snake class lives, i.e. the WorldModel we want to display.
   */
  display(world) {
    this.canvas_.width = this.scalingFactor_ * world.width;
    this.canvas_.height = this.scalingFactor_ * world.height;
    this.context_.fillStyle = "orange";
    world.snakes.forEach(x => {
      for(let index = 0; index < x.parts_.length; index++) {
        this.context_.fillRect(x.parts_[index].posX, x.parts_[index].posY, this.scalingFactor_, this.scalingFactor_);
      }
    });
  }
}

/** Interface ensuring any type of InputHandler has the madeLeftMove, madeRightMove, resetLeftMove, and resetRightMove methods. */
class InputHandler {
  /**
   * Create a new InputHandler.
   */
  constructor() {
    if(!(this.madeRightMove instanceof Function)) throw new Error("input handler must have madeRightMove method");
    if(!(this.madeLeftMove instanceof Function)) throw new Error("input handler must have madeLeftMove method");
    if(!(this.resetRightMove instanceof Function)) throw new Error("input handler must have resetRightMove method");
    if(!(this.resetLeftMove instanceof Function)) throw new Error("input handler must have resetLeftMove method");
  }
}

/** Class representing an event handler for left and right arrow key inputs. Inherits from the InputHandler interface. */
class LRKeyInputHandler extends InputHandler {
  /**
   * Create a new LRKeyInputHandler. Start listening for a keydown event. If event occurs, call eventHandler method.
   */
  constructor() {
    super();
    this.wasLeftArrowPushed_ = false;
    this.wasRightArrowPushed_ = false;
    let eventHandler = event => {
      if(event.key === "ArrowRight") {
        this.wasRightArrowPushed_ = true;
      }
      else if(event.key === "ArrowLeft") {
        this.wasLeftArrowPushed_ = true;
      }
    }
    window.addEventListener("keydown", eventHandler);  
  }
  madeLeftMove() {
    return this.wasLeftArrowPushed_;
  }
  madeRightMove() {
    return this.wasRightArrowPushed_;
  }
  resetLeftMove() {
    this.wasLeftArrowPushed_ = false;
  }
  resetRightMove() {
    this.wasRightArrowPushed_ = false;
  }
}
/** Class representing a Human Player of the snake game. */
class HumanPlayer extends Player {
  /**
   * Create a new HumanPlayer.
   * @param {class} snakeController - the SnakeController class needed to pass to the Player class interface.
   * @param {class} inputHandler - the type of InputHandler class you wish to use.
   */
  constructor(snakeController, inputHandler) {
    super(snakeController);
    this.inputHandler_ = inputHandler;
  }
  /**
   * turns the snake left or right using the HumanPlayer's SnakeController based on the InputHandler registering a left arrow keypress or a  right arrow keypress. If no keys are pressed, does nothing.
   */
  makeTurn() {
    if(this.inputHandler_.madeLeftMove() == true) {
      this.sc_.turnSnakeLeft();
      this.inputHandler_.resetLeftMove();
    }
    else if(this.inputHandler_.madeRightMove() == true) {
      this.sc_.turnSnakeRight();
      this.inputHandler_.resetRightMove();
    }
  }
}

/** Class representing a context for the Snake Game: the World Model and Players that are in existence. */
class GameController {
  /**
   * Create a GameController.
   * @param {class} world - The WorldModel you wish to use.
   */
  constructor(world) {
    this.world_ = world;
    this.player1_ = null;
    this.player2_ = null;
  }
  /**
   * Sets player 1 to an instance of a Player Class 'p'.
   * @param {class} p - the Player class you wish to use.
   */
  set player1(p) {
    if(p instanceof Player) this.player1_ = p;
    else throw new Error("Must provide a valid player.");
  }
  /**
   * Sets player 2 to an instance of a Player Class 'p'.
   * @param {class} p - the Player class you wish to use.
   */
  set player2(p) {
    if(p instanceof Player) this.player2_ = p;
    else throw new Error("Must provide a valid player.");
  }
  
  run() {
    var lastTime = 0;
    let updateFrame = milliseconds => {
      if(!(this.player1_ === null))this.player1_.makeTurn();
      if(!(this.player2_ === null))this.player2_.makeTurn();
      if((milliseconds - lastTime) > 50){
        this.world_.update(1);
        lastTime = lastTime + 50;
      }
      requestAnimationFrame(updateFrame);
    }
    requestAnimationFrame(updateFrame);
  }
}

let foo = new Point(0, 0);
let bar = new Point(0, 400);
let friendlySnake = new Snake(foo, 50);
let enemySnake = new Snake(bar, 20);
let gameTime = new WorldModel(42, 42);
let FooView = new CanvasView(10);
gameTime.addSnake(enemySnake);
gameTime.addSnake(friendlySnake);
gameTime.addView(FooView);
let AIcontrol = new SnakeController(gameTime, enemySnake);
let SlitherControl = new SnakeController(gameTime, friendlySnake);
let KeyboardBrain = new LRKeyInputHandler;
let Hooman = new HumanPlayer(SlitherControl, KeyboardBrain);
let GameControl = new GameController(gameTime);
let FakeHuman = new AvoidWallsPlayer(AIcontrol, 10);
GameControl.player1 = Hooman;
GameControl.player2 = FakeHuman;
GameControl.run();


