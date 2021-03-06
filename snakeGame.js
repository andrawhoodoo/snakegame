let snakeLevel = [];
function levelCreation() {
  let string1 = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww";
  let string2 = "w                                        w";
  let string3 = "w                                        w";
  let string4 = "w                                        w";
  let string5 = "w   f                                    w";
  let string6 = "w                                        w";
  let string7 = "w                                        w";
  let string8 = "w                                 f      w";
  let string9 = "w                                        w";
  let string10 = "w                                        w";
  let string11 = "w         f                              w";
  let string12 = "w                                        w";
  let string13 = "w                                        w";
  let string14 = "w                           f            w";
  let string15 = "w                                        w";
  let string16 = "w                                        w";
  let string17 = "w               f                        w";
  let string18 = "w                                        w";
  let string19 = "w                                        w";
  let string20 = "w                     f                  w";
  let string21 = "w                                        w";
  let string22 = "w                                        w";
  let string23 = "w                                        w";
  let string24 = "w                 f                      w";
  let string25 = "w                                        w";
  let string26 = "w                                        w";
  let string27 = "w                         f              w";
  let string28 = "w                                        w";
  let string29 = "w                                        w";
  let string30 = "w           f                            w";
  let string31 = "w                                        w";
  let string32 = "w                                        w";
  let string33 = "w                               f        w";
  let string34 = "w                                        w";
  let string35 = "w                                        w";
  let string36 = "w     f                                  w";
  let string37 = "w                                        w";
  let string38 = "w                                        w";
  let string39 = "w                                     f  w";
  let string40 = "w                                        w";
  let string41 = "w                                        w";
  let string42 = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww";
  snakeLevel.push(string1);
  snakeLevel.push(string2);
  snakeLevel.push(string3);
  snakeLevel.push(string4);
  snakeLevel.push(string5);
  snakeLevel.push(string6);
  snakeLevel.push(string7);
  snakeLevel.push(string8);
  snakeLevel.push(string9);
  snakeLevel.push(string10);
  snakeLevel.push(string11);
  snakeLevel.push(string12);
  snakeLevel.push(string13);
  snakeLevel.push(string14);
  snakeLevel.push(string15);
  snakeLevel.push(string16);
  snakeLevel.push(string17);
  snakeLevel.push(string18);
  snakeLevel.push(string19);
  snakeLevel.push(string20);
  snakeLevel.push(string21);
  snakeLevel.push(string22);
  snakeLevel.push(string23);
  snakeLevel.push(string24);
  snakeLevel.push(string25);
  snakeLevel.push(string26);
  snakeLevel.push(string27);
  snakeLevel.push(string28);
  snakeLevel.push(string29);
  snakeLevel.push(string30);
  snakeLevel.push(string31);
  snakeLevel.push(string32);
  snakeLevel.push(string33);
  snakeLevel.push(string34);
  snakeLevel.push(string35);
  snakeLevel.push(string36);
  snakeLevel.push(string37);
  snakeLevel.push(string38);
  snakeLevel.push(string39);
  snakeLevel.push(string40);
  snakeLevel.push(string41);
  snakeLevel.push(string42);
}

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
	/**
	 *Method that returns true when a point p has the same position as this point.
	 * @param {Point} p - the point whose position you wish to compare to your own.
	 */
  equals(p) {
    if(p.posX == this.posX && p.posY == this.posY) return true;
    else return false;
  }
}

/** Interface representing an object that will be displayed in the game */
class Actor {
  constructor() {
    if(this.constructor===Actor) throw new Error("Cannot instantiate an Actor which is an interface.");
    else if(!(this.update instanceof Function)) throw new Error("Actor must have an update method.");
  }
}

/**Base class representing an actor that is capable of colliding with other actors. */
class Collidable extends Actor {
  constructor() {
    super();
    if(this.constructor === Collidable) throw new Error("Cannot instantiate a Collidable which is an interface.");
    else if(!(this.didCollide instanceof Function)) throw new Error("Collidable must have a didCollide method.");
  }
}


/** Class representing the Snakes in the snake game! */
class Snake extends Collidable {
  /**
   * Create a snake.
   * @param {Point} startPosition - the starting position of the head of the Snake.
   * @param {int} size - the desired size of the Snake.
   * @param {string} color - the desired color of the Snake.
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
  /**
   * Method that determines if the snake collided with either itself or another actor.
   * @param {Actor} s - the actor you wish to see if you collided with.
   */
  didCollide(s) {
    if(s instanceof Snake) {  
      if(s === this && this.parts_.slice(1).some(x => this.position.equals(x))) {
        return true;
      }
      else if(s !== this && s.parts_.some(x => this.position.equals(x))) {
        return true;
      }
      else return false;
    }
    else {
      return (this.position.equals(s.position))
    }
  }
  /**
   * Method that moves the Snake a given amount of steps.
   * @param {int} steps - the amount of spaces you want the snake to move.
   */
  update(steps) {
    this.move(steps);
  }
  /**
   * Method that sets the active property to false.  Will result in the snake being removed from the game.
   */
  die() {
    this.isActive_ = false;
  }
  /**
   * @type {boolean}
   */
  get isActive() {
    return this.isActive_;
  }
  /**
   * Method that adds length to the snake in a certain direction depending on the snake's current direction.
   */
  grow() {
    if(this.direction === "left") {
      this.parts_.push(new Point(this.parts_[this.parts_.length - 1].posX + 1, this.parts_[this.parts_.length - 1].posY));
    }
    else if(this.direction === "right") {
      this.parts_.push(new Point(this.parts_[this.parts_.length - 1].posX - 1, this.parts_[this.parts_.length - 1].posY));
    }
    else if(this.direction === "down") {
      this.parts_.push(new Point(this.parts_[this.parts_.length - 1].posX, this.parts_[this.parts_.length - 1].posY - 1));
    }
    else {
      this.parts_.push(new Point(this.parts_[this.parts_.length - 1].posX, this.parts_[this.parts_.length - 1].posY + 1));
    }
  }
  /**
   * @type {string}
   */
  get type() {
    return "Snake";
  }
  /**
   * @type {string}
   */
  get color() {
    return this.color_;
  }
}

/** Model Class representing a virtual world for a Snake. */
class WorldModel {
  /**
   * Creates a world model and ensures that an instance of Snake class is passed. Also initializes a views, actors arrays
   * @param {ActorCollisionHandler} aca - allows for interactions between the world's classes.
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
   * Moves the snake belonging to the WorldModel, checks for collisions between actors.
   * Updates the display of CanvasView if there is a paired CanvasView class with this WorldModel.
   * @param {int} steps - the input for the snake's move function.
   */

  update(steps) {
    let foodParticles = this.actors_.filter(x => x.type === "Food");
    if(foodParticles.length === 0) {
      let pieceOfFood = new Food(Math.floor((this.width_)*Math.random()), Math.floor((this.height_)*Math.random()));
      this.addActor(pieceOfFood);
      let wallUnit = new Wall(Math.floor((this.width_)*Math.random()), Math.floor((this.height_)*Math.random()));
      this.addActor(wallUnit);
    }
    this.actors_.forEach(x => {
      if(x.type === "Snake") x.move(steps);
    });
    this.actors_.forEach(x => {
      for(let index = 0; index < this.actors_.length; index ++) {
        if((x.type === "Snake" || x.type === "Wall") && x.didCollide(this.actors_[index])) {
          this.aca_.applyCollisionAction(x, this.actors_[index]);
        }
      }
    });
    this.actors_.forEach(x => {
      for(let index = 0; index < this.actors_.length; index ++) {
      if(!(this.actors_[index].isActive)) this.actors_.splice(index, 1);
      }
    });
	this.views_.forEach(x => x.display(this));
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
  /**
   * @type {View}
   */	
  get view() {
    return this.views_[0];
  }
  /**
   * Adds an actor to the actors array.
   * @param {Actor} a - the actor you wish to add. 
   */	
  addActor(a) {
    if(a instanceof Actor) {
      this.actors_.push(a);
    }
    else throw new Error("Must be given a valid actor.");
  }
  /**
   * Adds a view to the views array.
   * @param {CanvasView} v - the CanvasView you wish to add. 
   */
  addView(v) {
    if(v instanceof View) {
      this.views_.push(v);
    }
    else throw new Error("Must be given a valid view.");
  }
  /**
   * Resets the game; clears the view and actor arrays, resets all properties of the world and disposes of all views.
   */
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
   * @param {WorldModel} world - the WorldModel you wish to use.
   * @param {Snake} slitherer - the Snake you wish to use.
   */
  constructor(world, slitherer) {
    if(world instanceof WorldModel) {
      this.snakeWorld_ = world;
    }
    else throw new Error("Not given a valid WorldModel");
    if(slitherer instanceof Snake) {
      this.slitherer_ = slitherer;
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
  /**
   * @type {boolean}
   */ 
  get isSnakeActive() {
    return this.slitherer_.isActive;
  }
}

/** Abstract base class that ensures any object of type "Player" has the ability to make the snake turn. */
class Player {
  /**
   * Create a new player.
   * @param {SnakeController} snakeController - the SnakeController class you wish to use.
   */
  constructor(snakeController) {
    if(!(snakeController instanceof SnakeController)) throw new Error("Not given a valid Snake Controller.");
    else this.sc_ = snakeController;
    if(this.constructor === Player) throw new Error("Cannot instantiate a Player, which is an abstract base class");
    else if(!(this.makeTurn instanceof Function)) throw new Error("Base class must implement makeTurn method.");
  }
  /**
   * @type {boolean}
   */
  isActive() {
    return this.sc_.isSnakeActive;
  }
}


/**Class representing an AI snake game player that avoids crashing into walls. */
class AvoidWallsPlayer extends Player {
  /**
   * Create an AvoidWallsPlayer by going to constructor of parent class Player.
   * @param {SnakeController} sc - the SnakeController you need to pass to the parent class.
   */
  constructor(sc) {
    super(sc)
  }
  /**
   * Turns the snake to avoid crashing into walls. Turns towards the direction in which there is the most space to move. If no collision with wall impending, does nothing.
   */
    makeTurn() {
    if(this.sc_.snakeDirection === "left" && this.sc_.slitherer_.position.posX == 1) {
      if(this.sc_.slitherer_.position.posY < ((this.sc_.worldHeight - 1)/2)) {
        this.sc_.turnSnakeLeft();
      }
      else this.sc_.turnSnakeRight(); 
    }
    else if(this.sc_.snakeDirection === "right" && this.sc_.slitherer_.position.posX == (this.sc_.worldWidth - 2)) {
      if(this.sc_.slitherer_.position.posY < ((this.sc_.worldHeight - 1)/2)) {
        this.sc_.turnSnakeRight();
      }
      else this.sc_.turnSnakeLeft();
    }
    else if(this.sc_.snakeDirection === "up" && this.sc_.slitherer_.position.posY == 1) {
      if(this.sc_.slitherer_.position.posX < ((this.sc_.worldWidth - 1)/2)) {
        this.sc_.turnSnakeRight();
      }
      else this.sc_.turnSnakeLeft();
    }
    else if(this.sc_.snakeDirection === "down" && this.sc_.slitherer_.position.posY == (this.sc_.worldHeight - 2)) {
      if(this.sc_.slitherer_.position.posX < ((this.sc_.worldWidth - 1)/2)) {
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
   * Determines the width and height of the canvas as well as the size of the actors utilizing the scaling factor property.  Also displays both the canvas and our actor's current position.
   * @param {WorldModel} world - the WorldModel class in which our Snake class lives, i.e. the WorldModel we want to display.
   */
  display(world) {
    this.canvas_.width = this.scalingFactor_*world.width;
    this.canvas_.height = this.scalingFactor_*world.height;
    world.actors.forEach(x => {
      if(x.type === "Snake") {
        this.context_.fillStyle = x.color; 
        for(let index = 0; index < x.parts_.length; index++) {
          this.context_.fillRect(x.parts_[index].posX*this.scalingFactor_, x.parts_[index].posY*this.scalingFactor_, this.scalingFactor_, this.scalingFactor_);
        }
      }
      else if(x.type === "Food") {
        this.context_.fillStyle = "rgb(0, 179, 202)";
        this.context_.fillRect(x.position.posX*this.scalingFactor_, x.position.posY*this.scalingFactor_, this.scalingFactor_, this.scalingFactor_);
      }
      else if(x.type === "Wall") {
        this.context_.fillStyle = "black";
        this.context_.fillRect(x.position.posX*this.scalingFactor_, x.position.posY*this.scalingFactor_, this.scalingFactor_, this.scalingFactor_);
      }
    });
  }
  /**
   * removes the canvas from the document in the event of the game ending.
   */
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

/** Base Class Representing an Input handler that listens for left and right movements. */
class KeyInputHandler extends InputHandler {
  constructor() {
    super();
    this.wasLeftPushed_ = false;
    this.wasRightPushed_ = false;
  }
  /**
   *Determines if a left move has been made.
   */
  madeLeftMove() {
    return this.wasLeftPushed_;
  }
  /**
   *Determines if a right move has been made.
   */	
  madeRightMove() {
    return this.wasRightPushed_;
  }
  /**
   * Resets the status of the left move boolean to false.
   */
  resetLeftMove() {
    this.wasLeftPushed_ = false;
  }
  /**
   * Resets the status of the right move boolean to false.
   */
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

/** Class representing an event handler for A and D key inputs. Inherits from the InputHandler interface. */
class ADKeyInputHandler extends KeyInputHandler {
  /**
   * Create a new ADKeyInputHandler. Start listening for a keydown event of A key or D key. If event occurs, call eventHandler method.
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
   * @param {SnakeController} snakeController - the SnakeController class needed to pass to the Player class interface.
   * @param {KeyInputHandler} inputHandler - the type of KeyInputHandler class you wish to use.
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

/** Class representing an object that can read level data and create the level's non-player actors in the world model. */

class WorldLoader {
  /**
   * Method that takes a level and adds the actors to the world model.
   * @param {array} levelData - an array of strings from the levelCreator.
   * @param {WorldModel} - the world model you are loading the level to.
   */
  readData(levelData, w) {
    levelData.forEach((item, index) => item.split("").forEach((a, x) => {
      if(a === "f") w.addActor(new Food(x, index));
      else if (a === "w") w.addActor(new Wall(x, index));
    }));
  }
}


/** Class representing a context for the Snake Game: the World Model and Players that are in existence. */
class GameController {
  /**
   * Create a GameController, initialize a players array, create a world model class and collision handlers classes for each possible interaction you want to include.
   * @param {Game} g - The game you wish to use.
   */
  constructor(g) {
    this.game_ = g;
    /** Manage potential collisions */
    let Handler = new ActorCollisionHandler;
    let WFCH = new WallFoodCollisionHandler;
    Handler.addCollisionAction("Wall", "Food", WFCH);
    let SWCH = new SnakeWallCollisionHandler;
    Handler.addCollisionAction("Snake", "Wall", SWCH);
    let SFCH = new SnakeFoodCollisionHandler;
    Handler.addCollisionAction("Snake", "Food", SFCH);
    let SSCH = new SnakeSnakeCollisionHandler;
    Handler.addCollisionAction("Snake", "Snake", SSCH);
    this.world_ = new WorldModel(Handler, 42, 42);
    this.players_ = [];
  }
  /**
   * Method that takes the inputs from the main menu screen and index.html inputs to create correct amount of human and AI players, and their respective required classes for the construction for said players.
   * Creates a new world loader, runs the level creation function, and reads the given data.
   * Creates a new canvas view, adds it to the current world model.
   * Calls its own run method.
   * @param {object} data - the inputs for # of human players and # of ai players from the main menu in JSON.
   */
  init(data) {
    let arr = [new LRKeyInputHandler, new ADKeyInputHandler];
    let myCols = ["red", "blue"];
    let compCols = ["green", "black", "cyan", "purple", "magenta"]
    if((data.numOfHumanPlayers !== 0) && (data.numOfHumanPlayers < 3)) {
      for(let i=1; i < (data.numOfHumanPlayers + 1); i++) {
        let p = i*5;
        let foo = new Point(p, p);
        let snek = new Snake(foo, 5, myCols[i-1]);
        let sc = new SnakeController(this.world_, snek);
        let player = new HumanPlayer(sc, arr[i-1]);
        this.player = player;
        this.world_.addActor(snek);
      }
    }
    if(data.numOfHumanPlayers > 2) {
      
    }
    if(data.numOfAIPlayers !== 0) {
      for(let i=1; i < (data.numOfAIPlayers + 1); i++) {
        let p = (i*5) + 10;
        let foo = new Point(p, p);
        let snek = new Snake(foo, 5, compCols[i-1]);
        let sc = new SnakeController(this.world_, snek);
        let player = new AvoidWallsPlayer(sc);
        this.player = player;
        this.world_.addActor(snek);
      }
    }
    let loadEmUp = new WorldLoader();
    levelCreation();
    loadEmUp.readData(snakeLevel, this.world_);
    this.world_.addView(new CanvasView(10));
    this.run();
  }
  /**
   * Adds an instance of a Player Class 'p' to the players array property.
   * @param {Player} p - the Player class you wish to use.
   */
  set player(p) {
    if(p instanceof Player) {
      this.players_.push(p);
    }
    else throw new Error("Must provide a valid player.");
  }
  /**
   * Method that continually calls update frame if there is at least one Player and at least one Snake in the current game.  Else the game resets as do all of the world model's properties. The players array is reset to empty, and the screen is brought back to the Main Menu.
   */
  run() {
    let lastTime = 0;
    let giveTime = milliseconds => {
      lastTime = milliseconds;
      requestAnimationFrame(updateFrame);
    }
    let updateFrame = milliseconds => {
      this.players_.forEach(x => x.makeTurn());
      if((milliseconds - lastTime) > 200){
        this.world_.update(1);
        lastTime = lastTime + 200;
      }
      let it = this.world_.actors;
      let itemPair = it.next();
      while (!itemPair.done && !(itemPair.value.type === "Snake")) {
        itemPair = it.next(); 
      }
      if(itemPair.done) {
        console.log("sorry, I have to reset");
        this.players_ = [];
        this.world_.reset();
        this.game_.switchContext();
      }
      else requestAnimationFrame(updateFrame);
    }
    if(this.players_.length > 0) {
      requestAnimationFrame(giveTime);
    }
    else {
      this.players_ = [];
      this.world_.reset();
      this.game_.switchContext();
    }
  }
}


/** Class representing a solid wall boundary for the game. */
class Wall extends Collidable {
  /** Create a new wall. Initialize the active property to true.
   * @param {int} x - the x coordinate for the wall actor.
   * @param {int} y - the y coordinate for the wall actor.
   */
  constructor(x, y) {
    super();
    this.position_ = new Point(x, y);
    this.isActive_ = true;
  }
  /**
   * @type {Point}
   */
  get position() {
    return this.position_;
  }
  /**
   * @type {boolean}
   */
  get isActive() {
    return this.isActive_;
  }
  /**
   * @type {string}
   */
  get type() {
    return "Wall";
  }
  /**
   * empty method to satisfy actor interface requirements.
   */
  update() {

  }
  /**
   * Method checking whether or not the wall collides with food actor; returns a boolean. Semantically odd, but ensures food does not spawn inside of wall. if it does, the food is destroyed.
   * @param {Actor} f - the food in question.
   */
  didCollide(f) {
    if(f.type === "Food") {
      if(this.position_.equals(f.position)) return true;
    }
    else return false;
  }
}

/** Class representing a Food particle for the game. */
class Food extends Actor {
  /** Create a Food actor. Initialize the active property to true.
   * @param {int} x - the x coordinate for the food.
   * @param {int} y - the y coordinate for the food.
   */
  constructor(x, y) {
    super();
    this.position_ = new Point(x, y);
    this.isActive_ = true;
  }
  /**
   * Method de-activating the food. The food will be removed from the game as a result.
   */
  eat() {
    this.isActive_ = false;
  }
  /**
   * @type {Point}
   */
  get position() {
    return this.position_;
  }
  /**
   * @type {boolean}
   */
  get isActive() {
    return this.isActive_;
  }
  /**
   * @type {string}
   */
  get type() {
    return "Food";
  }
  /**
   * empty method to satisfy actor interface requirements.
   */
  update() {

  }
}

/** Interface representing an object that determines the action to take when two specific actors collide. */
class CollisionHandler {
  constructor() {
    if(this.constructor === CollisionHandler) throw new Error("Cannot instantiate a CollisionHandler which is an Interface.");
    else if(!(this.applyAction instanceof Function)) throw new Error("Collision Handler must have an applyAction method.");
  }
}


/** Collision Handler that applies an action when a Snake actor and A Food actor Collide. */
class SnakeFoodCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  /**
   * Method that causes the food to disappear and the snake to increase in size.
   * @param {Snake} snake - the Snake actor participating in the collision.
   * @param {Food} food - the Food actor participating in the collision.
   */
  applyAction(snake, food) {
    food.eat();
    snake.grow();
  }
}

/** Collision Handler that applies an action when a Snake actor and a Wall actor Collide. */
class SnakeWallCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  /**
   * Method that causes the snake to disappear.
   * @param {Snake} snake - the Snake actor participating in the collision.
   * @param {Snake} wall - the Wall actor participating in the collision.
   */
  applyAction(snake, wall) {
    snake.die();
  }
}

/** Collision Handler that applies an action when two Snake actors collide. */
class SnakeSnakeCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  /**
   * Method that causes the snake whose head collided with the other snake to die
   * @param {Snake} snake1 - the Snake actor participating in the collision whose head collided.
   * @param {Snake} snake2 - the Snake actor participating in the collision who was collided into.
   */
  applyAction(snake1, snake2) {
    snake1.die();
  }
}

/** Collision Handler that applies an action when a Wall actor and a Food actor Collide. */
class WallFoodCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  /**
   * Method that causes the food to be destroyed.
   * @param {Wall} wall - the Wall actor participating in the collision.
   * @param {Food} food - the Food actor participating in the collision.
   */
  applyAction(wall, food) {
    food.eat();
  }
}



/** Class representing an object that has a map containing a key-value pair as follows: {key: a string representation of the two actors colliding, value: appropriate collision handler}. */ 
class ActorCollisionHandler {
  /**
   * Create a new ActorCollisionHandler. Initialize a new map.
   */
  constructor() {
    this.pairs_ = new Map();
  }
  /**
   * Private method that takes two actors types and returns a string in the form of "param1, param2".
   * @param {string} colliderType - type property of the actor that collided.
   * @param {string} collidedType - type property of the actor that was collided into.
   */
  toKey_(colliderType, collidedType) {
    return colliderType + ", " + collidedType;
  }
  /**
   * Method that utilizes the private toKey_ method to add the appropriate collision handler for the string of colliders to the map property.
   * @param {string} colliderType - type property of the actor that collided.
   * @param {string} collidedType - type property of the actor that was collided into.
   * @param {CollisionHandler} actionApplicator - the collision handler you are assigning to handle the collision.
   */
  addCollisionAction(colliderType, collidedType, actionApplicator) {
    this.pairs_.set(this.toKey_(colliderType, collidedType), actionApplicator);
  }
  /**
   * Method that checks the map property to see if an action applicator exists for the type of collision provided.
   * @param {string} colliderType - type property of the actor that collided.
   * @param {string} collidedType - type property of the actor that was collided into.
   */
  hasCollisionAction(colliderType, collidedType) {
    return this.pairs_.has(this.toKey_(colliderType, collidedType));
  }
  /**
   * Method that carries out the actionApplicator's applyAction method based on the search in the pairs_ property for a given collision.
   * @param {Collidable} collider - the object that collided.
   * @param {Actor} collided - the object that was collided into.
   */
  applyCollisionAction(collider, collided) {
    if(this.hasCollisionAction(collider.type, collided.type)) {
      this.pairs_.get(this.toKey_(collider.type, collided.type)).applyAction(collider, collided);
    }
  }
}

/** Class representing an object that can iterate over objects that are not neccessarily arrays, as if they were arrays. i.e. strings, lists */
class ArrayIterator {
  /**
   * Create a new ArrayIterator.
   * @param{list, string, array} arr - the item you wish to iterate over.
   */
  constructor(arr) {
    this.arr_ = arr;
    this.index_ = 0;
  }
  /**
   * Stores current index, determines whether the array is at the end. Returns a JSON object of the value at the current index and whether or not the array is at its end.
   */
  next() {
    let ind = this.index_++;
    let done = (ind === this.arr_.length)
    let value = (done) ? undefined : this.arr_[ind];
    return {value: value, done: done};
  }
  /**
   * Mimics the forEach method of Array.prototype.
   * @param {function} f - the Function you want to apply to each item.
   */
  forEach(f) {
    this.arr_.forEach(x => f(x));
  }
}



/** Class representing an object that understands the context of the index.html page and is able to manipulate and read it. */
class MainMenuController {
  /**
   * Create a new Main Menu Controller. Creates buttons and inputs on the document running the script. Listens for a click to start the game.
   * @param {Game} game - the game you are going to run.
   */
  constructor(game) {
    this.game_ = game;
    this.playGameButton_ = document.createElement("button");
    this.humanPlayersInput_ = document.createElement("input");
    this.humanPlayersInput_.placeholder = "Enter # of Human players";
    this.aiPlayersInput_ = document.createElement("input");
    this.aiPlayersInput_.placeholder = "Enter # of AI players";
    this.playGameButton_.appendChild(document.createTextNode("Start Game!"));  
    this.playGameButton_.addEventListener("click", this.switchContext_.bind(this));
  }
  /**
   * Method that adds the start button and player inputs to the document.
   * @param {null} data - null.
   */
  init(data) {
    document.getElementById("game-area").appendChild(this.humanPlayersInput_);
    document.getElementById("game-area").appendChild(this.aiPlayersInput_);
    document.getElementById("game-area").appendChild(this.playGameButton_);
  }
  /**
   * Method that removes all buttons and inputs from the document and subsequently calls the switchContext method of the game_ property, passing a JSON object containing the input values of the document.
   */
  switchContext_() {
    document.getElementById("game-area").removeChild(this.playGameButton_);
    document.getElementById("game-area").removeChild(this.humanPlayersInput_);
    document.getElementById("game-area").removeChild(this.aiPlayersInput_);
    this.game_.switchContext({numOfHumanPlayers: parseInt(this.humanPlayersInput_.value), numOfAIPlayers: parseInt(this.aiPlayersInput_.value)});
  }
}

/** Class representing a fully functional snake game. */
class Game {
  /**
   * Create a new Game. 
   * Initialize a new map containing context switches; When in game context, switch to main menu context, and vice versa.
   * Initialize a new map containing new controllers; a main menu controller for the main menu context, and a game controller for the game context.
   */ 
  constructor () {
    this.contextSwitches_ = new Map();
    this.contextSwitches_.set("Start", "Game");
    this.contextSwitches_.set("Game", "Start");
    this.controllers_ = new Map();
    this.controllers_.set("Start", new MainMenuController(this));
    this.controllers_.set("Game", new GameController(this));
    this.currentContext_ = "Start";
  }
  /**
   * Method that gets the current context, changes it, and calls init method of the new context.
   * @param {object} data - object containing the input values of the document.
   */
  switchContext(data) {
    this.currentContext_ = this.contextSwitches_.get(this.currentContext_);
    this.controllers_.get(this.currentContext_).init(data);
  }
  /**
   * Method that gets the current context and calls its init method.
   * @param {object} data - object containing the input values of the document.
   */
  run(data) {
    this.controllers_.get(this.currentContext_).init(data);
  }
}

let SnakeGame = new Game();
SnakeGame.run();
