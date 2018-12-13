/** Class representing an object that understands the context of the index.html page and is able to manipulate and read it. */
class MainMenuController {
  /**
   * Create a new Main Menu Controller. Creates buttons and inputs on the document running the script. Listens for a click to start the game.
   * @param {class} game - the game you are going to run.
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

module.exports = MainMenuController;