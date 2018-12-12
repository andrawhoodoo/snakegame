/** Class representing the Snakes in the snake game! */
class Snake extends Collidable {
  /**
   * Create a snake.
   * @param {class Point} startPosition - the starting position of the head of the Snake.
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
   * @param {class Actor} s - the actor you wish to see if you collided with.
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
      if(this.position.equals(s.position)) return true;
      else return false;
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

module.exports = Snake;