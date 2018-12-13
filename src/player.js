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
  /**
   * @type {boolean}
   */
  isActive() {
    return this.sc_.isSnakeActive;
  }
}

module.exports = Player;