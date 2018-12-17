/** Class representing a context for the Snake Game: the World Model and Players that are in existence. */
class GameController {
  /**
   * Create a GameController, initialize a players array, create a world model class and collision handlers classes for each possible interaction you want to include.
   * @param {class} g - The game you wish to use.
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
   * @param {class} p - the Player class you wish to use.
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

