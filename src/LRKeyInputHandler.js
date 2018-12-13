/** Class representing an event handler for left and right arrow key inputs. Inherits from the InputHandler interface. */
class LRKeyInputHandler extends KeyInputHandler {
  /**
   * Create a new LRKeyInputHandler. Start listening for a keydown event of Left Arrow Key or Right Arrow Key. If event occurs, call eventHandler method.
   */
  constructor() {
    super();
    let eventHandler = event => {
      if(event.key === "ArrowRight") {
        this.wasRightPushed_ = true;
      }
      else if(event.key === "ArrowLeft") {
        this.wasLeftPushed_ = true;
      }
    }
    window.addEventListener("keydown", eventHandler);  
  }
}

module.exports = LRKeyInputHandler;