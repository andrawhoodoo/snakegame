/** Collision Handler that applies an action when two Snake actors collide. */
class SnakeSnakeCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  /**
   * Method that causes the snake whose head collided with the other snake to die
   * @param {class Snake} snake1 - the Snake actor participating in the collision whose head collided.
   * @param {class Snake} snake2 - the Snake actor participating in the collision who was collided into.
   */
  applyAction(snake1, snake2) {
    snake1.die();
  }
}

module.exports = SnakeSnakeCollisionHandler;