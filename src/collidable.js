/**Base class representing an actor that is capable of colliding with other actors. */
class Collidable extends Actor {
  constructor() {
    super();
    if(this.constructor === Collidable) throw new Error("Cannot instantiate a Collidable which is an interface.");
    else if(!(this.didCollide instanceof Function)) throw new Error("Collidable must have a didCollide method.");
  }
}

module.exports = Collidable;