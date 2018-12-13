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
module.exports = HumanPlayer;