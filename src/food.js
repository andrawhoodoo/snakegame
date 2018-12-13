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
   * @type {class Point}
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

module.exports = Food;