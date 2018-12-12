/** Collision Handler that applies an action when a Snake actor and A Food actor Collide. */
class SnakeFoodCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  /**
   * Method that causes the food to disappear and the snake to increase in size.
   * @param {class Snake} snake - the Snake actor participating in the collision.
   * @param {class Food} food - the Food actor participating in the collision.
   */
  applyAction(snake, food) {
    food.eat();
    snake.grow();
  }
}