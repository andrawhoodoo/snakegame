/** Base Class Representing an Input handler that listens for left and right movements. */
class KeyInputHandler extends InputHandler {
  constructor() {
    super();
    this.wasLeftPushed_ = false;
    this.wasRightPushed_ = false;
  }
  /**
   *Determines if a left move has been made.
   */
  madeLeftMove() {
    return this.wasLeftPushed_;
  }
  /**
   *Determines if a right move has been made.
   */	
  madeRightMove() {
    return this.wasRightPushed_;
  }
  /**
   * Resets the status of the left move boolean to false.
   */
  resetLeftMove() {
    this.wasLeftPushed_ = false;
  }
  /**
   * Resets the status of the right move boolean to false.
   */
  resetRightMove() {
    this.wasRightPushed_ = false;
  }
}

