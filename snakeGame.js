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

/** Model Class representing a virtual world for a Snake. */
class WorldModel {
  /**
   * Creates a world model and ensures that an instance of Snake class is passed. Also initializes a view property.
   * @param {int} w - width of desired world view.  If no int passed, default to 100.
   * @param {int} h - height of desired world view. If no int passed, default to 100.
   */
  constructor(aca, w, h) {
    this.aca_ = aca;
    this.width_ = w || 100;
    this.height_ = h || 100;
    this.views_ = [];
    this.actors_ = [];
  }
  /**
   * Moves the snake belonging to the WorldModel; updates the display of CanvasView if there is a paired CanvasView class with this WorldModel.
   * @param {int} steps - the input for the snake's move function.
   */

  update(steps) {
    var foodParticles = this.actors_.filter(x => x.type === "Food");
    if(foodParticles.length === 0) {
      let pieceOfFood = new Food(Math.floor((this.width_)*Math.random()), Math.floor((this.height_)*Math.random()))
      this.addActor(pieceOfFood);
    }
    this.actors_.forEach(x => {
      if(x.type === "Snake") x.move(steps);
    });
    if(!(this.views_ == [])) {
      this.views_.forEach(x => x.display(this));
    }
    this.actors_.forEach(x => {
      for(let index = 0; index < this.actors_.length; index ++) {
        if(x.type === "Snake" && x.didCollide(this.actors_[index])) {
          this.aca_.applyCollisionAction(x, this.actors_[index]);
        }
      }
    });
    this.actors_.forEach(x => {
      for(let index = 0; index < this.actors_.length; index ++) {
      if(!(this.actors_[index].isActive)) this.actors_.splice(index, 1);
      }
    });
  }
  /**
   * @type {tuple}
   */
  get actors() {
    return new ArrayIterator(this.actors_);
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
  addActor(a) {
    if(a instanceof Actor) {
      this.actors_.push(a);
    }
    else throw new Error("Must be given a valid actor.");
  }
  addView(v) {
    if(v instanceof View) {
      this.views_.push(v);
    }
    else throw new Error("Must be given a valid view.");
  }
  reset() {
    this.views_.forEach(x => x.dispose());
    this.views_ = [];
    this.actors_ = [];
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
  get isSnakeActive() {
    return this.slitherer_.isActive;
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
  isActive() {
    return this.sc_.isSnakeActive;
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
    else if(!(this.dispose instanceof Function)) throw new Error("View class must implement dispose method.");
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
    world.actors.forEach(x => {
      if(x.type === "Snake") {
        this.context_.fillStyle = x.color; 
        for(let index = 0; index < x.parts_.length; index++) {
          this.context_.fillRect(x.parts_[index].posX, x.parts_[index].posY, this.scalingFactor_, this.scalingFactor_);
        }
      }
      else {
        this.context_.fillStyle = "purple";
        this.context_.fillRect(x.position.posX*this.scalingFactor_, x.position.posY*this.scalingFactor_, this.scalingFactor_, this.scalingFactor_);
      }
    });
  }
  dispose() {
    document.body.removeChild(this.canvas_);
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

class KeyInputHandler extends InputHandler {
  constructor() {
    super();
    this.wasLeftPushed_ = false;
    this.wasRightPushed_ = false;
  }
  madeLeftMove() {
    return this.wasLeftPushed_;
  }
  madeRightMove() {
    return this.wasRightPushed_;
  }
  resetLeftMove() {
    this.wasLeftPushed_ = false;
  }
  resetRightMove() {
    this.wasRightPushed_ = false;
  }
}

/** Class representing an event handler for left and right arrow key inputs. Inherits from the InputHandler interface. */
class LRKeyInputHandler extends KeyInputHandler {
  /**
   * Create a new LRKeyInputHandler. Start listening for a keydown event. If event occurs, call eventHandler method.
   */
  constructor() {
    super();
    let eventHandler = event => {
      if(event.key === "ArrowRight") {
        this.wasRightPushed_ = true;
      }
      else if(event.key === "ArrowLeft") {
        this.wasLeftPushed_ = true;
      }
    }
    window.addEventListener("keydown", eventHandler);  
  }
}

class ADKeyInputHandler extends KeyInputHandler {
  /**
   * Create a new ADKeyInputHandler. Start listening for a keydown event. If event occurs, call eventHandler method.
   */
  constructor() {
    super();
    let eventHandler = event => {
      if(event.keyCode === 68) {
        this.wasRightPushed_ = true;
      }
      else if(event.keyCode === 65) {
        this.wasLeftPushed_ = true;
      }
    }
    window.addEventListener("keydown", eventHandler);  
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

class WorldLoader {
  readData(levelData, w) {
    levelData.forEach((item, index) => item.split("").forEach((a, x) => {
      if(a === "f") w.addActor(new Food(x, index))
    }));
  }
}

/** Class representing a context for the Snake Game: the World Model and Players that are in existence. */
class GameController {
  /**
   * Create a GameController.
   * @param {class} world - The WorldModel you wish to use.
   */
  constructor(g) {
    this.game_ = g;
    /** Manage potential collisions */
    let Handler = new ActorCollisionHandler;
    let SFCH = new SnakeFoodCollisionHandler;
    Handler.addCollisionAction("Snake", "Food", SFCH);
    let SSCH = new SnakeSnakeCollisionHandler;
    Handler.addCollisionAction("Snake", "Snake", SSCH);
    this.world_ = new WorldModel(Handler, 42, 42);
    this.players_ = [];
  }
  init(data) {
    let arr = [new LRKeyInputHandler, new ADKeyInputHandler];
    for(let i=0; i < (data.numOfHumanPlayers); i++) {
      let p = i*20;
      let foo = new Point(p, p);
      let snek = new Snake(foo, 50);
      let sc = new SnakeController(this.world_, snek);
      let player = new HumanPlayer(sc, arr[i]);
      this.player = player;
    }
    for(let i=0; i < (data.numOfAIPlayers); i++) {
      let p = (i*20) + 40;
      let foo = new Point(p, p);
      let snek = new Snake(foo, 50);
      let sc = new SnakeController(this.world_, snek);
      let player = new AvoidWallsPlayer(sc, 10);
      this.player = player;
    }
    let loadEmUp = new WorldLoader();
    let string1 = "                        f  f f   f      f";
    let string2 = "                                   f  f  ";
    let string3 = "                                         ";
    let string4 = "                  f      f               ";
    let myArr = [string1, string2, string3, string4];
    loadEmUp.readData(myArr, this.world_);
    this.world_.addView(new CanvasView(10));
    this.run();
  }
  /**
   * Sets player 1 to an instance of a Player Class 'p'.
   * @param {class} p - the Player class you wish to use.
   */
  set player(p) {
    if(p instanceof Player) {
      this.players_.push(p);
    }
    else throw new Error("Must provide a valid player.");
  }
  run() {
    var lastTime = 0;
    let updateFrame = milliseconds => {
      this.players_.forEach(x => x.makeTurn());
      if((milliseconds - lastTime) > 25){
        this.world_.update(1);
        lastTime = lastTime + 25;
      }
      if(this.players_.length > 0) {
        requestAnimationFrame(updateFrame);
      }
      else {
        this.players_ = [];
        this.world_.reset();
        this.game_.switchContext();
      }
    }
    if(this.players_.length > 1) {
      requestAnimationFrame(updateFrame);
    }
    else {
      this.players_ = [];
      this.world_.reset();
      this.game_.switchContext();
    }
  }
}



class Actor {
  constructor() {
    if(this.constructor===Actor) throw new Error("Cannot instantiate an Actor which is an interface.");
    else if(!(this.update instanceof Function)) throw new Error("Actor must have an update method.");
  }
}

class Collidable extends Actor {
  constructor() {
    super();
    if(this.constructor === Collidable) throw new Error("Cannot instantiate a Collidable which is an interface.");
    else if(!(this.didCollide instanceof Function)) throw new Error("Collidable must have a didCollide method.");
  }
}

class Food extends Actor {
  constructor(x, y) {
    super();
    this.position_ = new Point(x, y);
    this.isActive_ = true;
  }
  eat() {
    this.isActive_ = false;
  }
  get position() {
    return this.position_;
  }
  get isActive() {
    return this.isActive_;
  }
  get type() {
    return "Food";
  }
  update() {

  }
}

class CollisionHandler {
  constructor() {
    if(this.constructor === CollisionHandler) throw new Error("Cannot instantiate a CollisionHandler which is an Interface.");
    else if(!(this.applyAction instanceof Function)) throw new Error("Collision Handler must have an applyAction method.");
  }
}

class SnakeFoodCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  applyAction(snake, food) {
    food.eat();
    snake.grow();
  }
}

class SnakeSnakeCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  applyAction(snake1, snake2) {
    snake1.die();
  }
}

class ActorCollisionHandler {
  constructor() {
    this.pairs_ = new Map();
  }
  toKey_(colliderType, collidedType) {
    return colliderType + ", " + collidedType;
  }
  addCollisionAction(colliderType, collidedType, actionApplicator) {
    this.pairs_.set(this.toKey_(colliderType, collidedType), actionApplicator);
  }
  hasCollisionAction(colliderType, collidedType) {
    return this.pairs_.has(this.toKey_(colliderType, collidedType));
  }
  applyCollisionAction(collider, collided) {
    if(this.hasCollisionAction(collider.type, collided.type)) {
      this.pairs_.get(this.toKey_(collider.type, collided.type)).applyAction(collider, collided);
    }
  }
}

class ArrayIterator {
  constructor(arr) {
    this.arr_ = arr;
    this.index_ = 0;
  }
  next() {
    let ind = this.index_++;
    let done = (ind === this.arr_.length)
    let value = (done) ? undefined : this.arr_[ind];
    return {value: value, done: done};
  }
  forEach(f) {
    this.arr_.forEach(x => f(x));
  }
}

class Snake extends Collidable {
  /**
   * Create a snake.
   * @param {class Point} startPosition - the starting position of the head of the Snake.
   * @param {int} size - the desired size of the Snake.
   */
  constructor(startPosition, size, color) {
    super();
    this.isActive_ = true;
    this.color_ = color || "orange";
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
   * Moves the Snake's head position forward along its current direction. Moves each part of the tail "up" to the previous position of the tail part "above" it.
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
    if(s instanceof Snake) {  
      if(s === this && this.parts_.slice(1).some(x => this.position.equals(x))) {
        return true;
      }
      else if(s != this && s.parts_.some(x => this.position.equals(x))) {
        return true;
      }
      else return false;
    }
    else {
      if(this.position.equals(s.position)) return true;
      else return false;
    }
  }
  update(steps) {
    this.move(steps);
  }
  die() {
    this.isActive_ = false;
  }
  get isActive() {
    return this.isActive_;
  }
  grow() {
    if(this.direction === "left") {
      this.parts_.push(new Point(this.parts_[this.parts.length - 1].posX + 1, this.parts_[this.parts.length - 1].posY));
    }
    else if(this.direction === "right") {
      this.parts_.push(new Point(this.parts_[this.parts.length - 1].posX - 1, this.parts_[this.parts.length - 1].posY));
    }
    else if(this.direction === "down") {
      this.parts_.push(new Point(this.parts_[this.parts.length - 1].posX, this.parts_[this.parts.length - 1].posY - 1));
    }
    else {
      this.parts_.push(new Point(this.parts_[this.parts.length - 1].posX, this.parts_[this.parts.length - 1].posY + 1));
    }
  }
  get type() {
    return "Snake";
  }
  get color() {
    return this.color_;
  }
}

class MainMenuController {
  constructor(game) {
    this.game_ = game;
    this.playGameButton_ = document.createElement("button");
    this.humanPlayersInput_ = document.createElement("input");
    this.humanPlayersInput_.placeholder = "Enter number of Human players";
    this.aiPlayersInput_ = document.createElement("input");
    this.aiPlayersInput_.placeholder = "Enter number of AI players";
    this.playGameButton_.appendChild(document.createTextNode("Start Game!"));  
    this.playGameButton_.addEventListener("click", this.switchContext_.bind(this));
  }
  init(data) {
    document.getElementById("game-area").appendChild(this.humanPlayersInput_);
    document.getElementById("game-area").appendChild(this.aiPlayersInput_);
    document.getElementById("game-area").appendChild(this.playGameButton_);
  }
  switchContext_() {
    document.getElementById("game-area").removeChild(this.playGameButton_);
    document.getElementById("game-area").removeChild(this.humanPlayersInput_);
    document.getElementById("game-area").removeChild(this.aiPlayersInput_);
    this.game_.switchContext({numOfHumanPlayers: parseInt(this.humanPlayersInput_.value), numOfAIPlayers: parseInt(this.aiPlayersInput_.value)});
  }
}

class Game {
  constructor () {
    this.contextSwitches_ = new Map();
    this.contextSwitches_.set("Start", "Game");
    this.contextSwitches_.set("Game", "Start");
    this.controllers_ = new Map();
    this.controllers_.set("Start", new MainMenuController(this));
    this.controllers_.set("Game", new GameController(this));
    this.currentContext_ = "Start";
  }
  switchContext(data) {
    this.currentContext_ = this.contextSwitches_.get(this.currentContext_);
    this.controllers_.get(this.currentContext_).init(data);
  }
  run(data) {
    this.controllers_.get(this.currentContext_).init(data);
  }
}

let hereWeGo = new Game();
hereWeGo.run();


