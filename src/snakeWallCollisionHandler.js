/** Collision Handler that applies an action when a Snake actor and a Wall actor Collide. */
class SnakeWallCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  /**
   * Method that causes the snake to disappear.
   * @param {class Snake} snake - the Snake actor participating in the collision.
   * @param {class Wall} wall - the Wall actor participating in the collision.
   */
  applyAction(snake, wall) {
    snake.die();
  }
}

module.exports = SnakeWallCollisionHandler;