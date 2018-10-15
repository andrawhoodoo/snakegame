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
}

/** Class representing a Snake.*/
class Snake {
  /**
   * Create a snake.
   */
  constructor() {
    this.pos_ = new Point(0, 0);
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
    if (this.currentDir_ === "right") {      
      this.pos_ = new Point(this.position.posX + steps, this.position.posY);
    }

    else if(this.currentDir_ === "left") {
      this.pos_ = new Point(this.position.posX - steps, this.position.posY);
    }
    else if(this.currentDir_ === "up") {
      this.pos_ = new Point(this.position.posX, this.position.posY + steps);
    }
    else if(this.currentDir_ === "down") {
      this.pos_ = new Point(this.position.posX, this.position.posY - steps);
    }
  }
  /**
   * @type {tuple}
   */
  get position() {
    return this.pos_;
  }
  /**
   * @type {tuple}
   */
  get direction() {
    return this.currentDir_;
  }
}

/** Model Class representing a virtual world for a Snake. */
class WorldModel {
  /**
   * Creates a world model and ensures that an instance of Snake class is passed.
   * @param {class} s - instance of snake class
   * @param {int} w - width of desired world view.  If no int passed, default to 100.
   * @param {int} h - height of desired world view. If no int passed, default to 100.
   */
  constructor(s, w, h) {
    if(s instanceof Snake) {
      this.snake_ = s;
    }
    else throw new Error("Not given a valid Snake");
    this.width_ = w || 100;
    this.height_ = h || 100;
  }
  /**
   * Moves the snake belonging to the WorldModel.
   * @param {int} steps - the input for the snake's move function.
   */
  update(steps) {
    this.snake_.move(steps);
  }
  /**
   * @type {tuple}
   */
  get snake() {
    return this.snake_;
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
    this.sc_ = snakeController;
    if(this.constructor === Player) throw new Error("Cannot instantiate a Player, which is an abstract base class");
    else if(!(this.makeTurn instanceof Function)) throw new Error("Base class must implement makeTurn method");
  }
}

/**Class representing an AI snake game player that avoids crashing into walls. */
class AvoidWallsPlayer extends Player {
  /**
   * Create an AvoidWallsPlayer by going to constructor of parent class Player.
   */
  constructor() {
    super();
  }
  /**
   * Turns the snake to avoid crashing into walls. Turns towards the direction in which there is the most space to move.
   */
  makeTurn() {
    if(this.sc_.snakeDirection === "left" && this.sc_.slitherer_.position.posX == 0) {
      if(this.sc_.slitherer_.position.posY < (this.sc_.worldHeight - 1)/2) {
        this.sc_.turnSnakeLeft();
      }
      else this.sc_.turnSnakeRight(); 
    }
    else if(this.sc_.snakeDirection === "right" && this.sc_.slitherer_.position.posX == (this.sc_.worldWidth - 1)) {
      if(this.sc_.slitherer_.position.posY < (this.sc_.worldHeight - 1)/2) {
        this.sc_.turnSnakeRight();
      }
      else this.sc_.turnSnakeLeft();
    }
    else if(this.sc_.snakeDirection === "up" && this.sc_.slitherer_.position.posY == 0) {
      if(this.sc_.slitherer_.position.posX < (this.sc_.worldWidth - 1)/2) {
        this.sc_.turnSnakeRight();
      }
      else this.sc_.turnSnakeLeft();
    }
    else if(this.sc_.snakeDirection === "down" && this.sc_.slitherer_.position.posY == (this.sc_.worldHeight - 1)) {
      if(this.sc_.slitherer_.position.posX < (this.sc_.worldWidth - 1)/2) {
        this.sc_.turnSnakeLeft();
      }
      else this.sc_.turnSnakeRight();
    }
    else {
      pass;
    }
  }
}

/*
let bigSnake = new Snake();
let littleSnake = new Snake();
console.log(bigSnake.position);

bigSnake.move(7);
console.log(bigSnake.position);
bigSnake.turnLeft();
bigSnake.move(5);
console.log("Big Snake is at position (", bigSnake.position.posX, ",", bigSnake.position.posY, ")");

littleSnake.turnRight();
littleSnake.move(1);
littleSnake.move(3);
littleSnake.turnLeft();
littleSnake.move(4);
console.log("Little Snake is at position (", littleSnake.position.posX, ",", littleSnake.position.posY, ")");
*/
let friendlySnake = new Snake();
let gameTime = new WorldModel(friendlySnake);
//gameTime.update(13);
//gameTime.snake.turnLeft();
//gameTime.update(7);
//console.log("Our snake is at", gameTime.snake_.position);
let bigBrain = new SnakeController(gameTime, friendlySnake);
//console.log(bigBrain.snakePosition);
//console.log(bigBrain.snakeDirection);
