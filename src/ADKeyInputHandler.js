/** Class representing an event handler for A and D key inputs. Inherits from the InputHandler interface. */
class ADKeyInputHandler extends KeyInputHandler {
  /**
   * Create a new ADKeyInputHandler. Start listening for a keydown event of A key or D key. If event occurs, call eventHandler method.
   */
  constructor() {
    super();
    let eventHandler = event => {
      if(event.keyCode === 68) {
        this.wasRightPushed_ = true;
      }
      else if(event.keyCode === 65) {
        this.wasLeftPushed_ = true;
      }
    }
    window.addEventListener("keydown", eventHandler);  
  }
}