/** Interface class that ensures any type of view has a display method.*/
class View {
  /**
   * Create a new view.
   */
  constructor() {
    if(this.constructor === View) throw new Error("Cannot instantiate a View, which is an interface");
    else if(!(this.display instanceof Function)) throw new Error("View class must implement display method.");
    else if(!(this.dispose instanceof Function)) throw new Error("View class must implement dispose method.");
  }
}

