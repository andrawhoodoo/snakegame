/** Interface representing an object that will be displayed in the game */
class Actor {
  constructor() {
    if(this.constructor===Actor) throw new Error("Cannot instantiate an Actor which is an interface.");
    else if(!(this.update instanceof Function)) throw new Error("Actor must have an update method.");
  }
}
