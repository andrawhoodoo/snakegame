/** Collision Handler that applies an action when a Wall actor and a Food actor Collide. */
class WallFoodCollisionHandler extends CollisionHandler {
  constructor() {
    super();
  }
  /**
   * Method that causes the food to be destroyed.
   * @param {class Wall} wall - the Wall actor participating in the collision.
   * @param {class Food} food - the Food actor participating in the collision.
   */
  applyAction(wall, food) {
    food.eat();
  }
}