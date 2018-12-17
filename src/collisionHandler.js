/** Interface representing an object that determines the action to take when two specific actors collide. */
class CollisionHandler {
  constructor() {
    if(this.constructor === CollisionHandler) throw new Error("Cannot instantiate a CollisionHandler which is an Interface.");
    else if(!(this.applyAction instanceof Function)) throw new Error("Collision Handler must have an applyAction method.");
  }
}
