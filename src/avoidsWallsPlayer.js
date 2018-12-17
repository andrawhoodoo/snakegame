/**Class representing an AI snake game player that avoids crashing into walls. */
class AvoidWallsPlayer extends Player {
  /**
   * Create an AvoidWallsPlayer by going to constructor of parent class Player.
   * @param {class} sc - the SnakeController you need to pass to the parent class.
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


