/** Class representing a solid wall boundary for the game. */
class Wall extends Collidable {
  /** Create a new wall. Initialize the active property to true.
   * @param {int} x - the x coordinate for the wall actor.
   * @param {int} y - the y coordinate for the wall actor.
   */
  constructor(x, y) {
    super();
    this.position_ = new Point(x, y);
    this.isActive_ = true;
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
    return "Wall";
  }
  /**
   * empty method to satisfy actor interface requirements.
   */
  update() {

  }
  /**
   * Method checking whether or not the wall collides with food actor; returns a boolean. Semantically odd, but ensures food does not spawn inside of wall. if it does, the food is destroyed.
   * @param {class Food} f - the food in question.
   */
  didCollide(f) {
    if(f.type === "Food") {
      if(this.position_.equals(f.position)) return true;
    }
    else return false;
  }
}

module.exports = Wall;