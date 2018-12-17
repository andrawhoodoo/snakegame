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
