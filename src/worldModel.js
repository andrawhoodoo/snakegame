/** Model Class representing a virtual world for a Snake. */
class WorldModel {
  /**
   * Creates a world model and ensures that an instance of Snake class is passed. Also initializes a views, actors arrays
   * @param {class} aca - allows for interactions between the world's classes.
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
        if(x.type === "Snake" && x.didCollide(this.actors_[index])) {
          this.aca_.applyCollisionAction(x, this.actors_[index]);
        }
        if(x.type === "Wall" && x.didCollide(this.actors_[index])) {
          this.aca_.applyCollisionAction(x, this.actors_[index]);
        }
      }
    });
    this.actors_.forEach(x => {
      for(let index = 0; index < this.actors_.length; index ++) {
      if(!(this.actors_[index].isActive)) this.actors_.splice(index, 1);
      }
    });
    if(!(this.views_ == [])) {
      this.views_.forEach(x => x.display(this));
    }

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
   * @type {class}
   */	
  get view() {
    return this.views_[0];
  }
  /**
   * Adds an actor to the actors array.
   * @param {class} a - the actor you wish to add. 
   */	
  addActor(a) {
    if(a instanceof Actor) {
      this.actors_.push(a);
    }
    else throw new Error("Must be given a valid actor.");
  }
  /**
   * Adds a view to the views array.
   * @param {class} v - the CanvasView you wish to add. 
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
