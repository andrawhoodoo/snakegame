/** Class representing an object that has a map containing a key-value pair as follows: {key: a string representation of the two actors colliding, value: appropriate collision handler}. */ 
class ActorCollisionHandler {
  /**
   * Create a new ActorCollisionHandler. Initialize a new map.
   */
  constructor() {
    this.pairs_ = new Map();
  }
  /**
   * Private method that takes two actors types and returns a string in the form of "param1, param2".
   * @param {string} colliderType - type property of the actor that collided.
   * @param {string} collidedType - type property of the actor that was collided into.
   */
  toKey_(colliderType, collidedType) {
    return colliderType + ", " + collidedType;
  }
  /**
   * Method that utilizes the private toKey_ method to add the appropriate collision handler for the string of colliders to the map property.
   * @param {string} colliderType - type property of the actor that collided.
   * @param {string} collidedType - type property of the actor that was collided into.
   * @param {CollisionHandler} actionApplicator - the collision handler you are assigning to handle the collision.
   */
  addCollisionAction(colliderType, collidedType, actionApplicator) {
    this.pairs_.set(this.toKey_(colliderType, collidedType), actionApplicator);
  }
  /**
   * Method that checks the map property to see if an action applicator exists for the type of collision provided.
   * @param {string} colliderType - type property of the actor that collided.
   * @param {string} collidedType - type property of the actor that was collided into.
   */
  hasCollisionAction(colliderType, collidedType) {
    return this.pairs_.has(this.toKey_(colliderType, collidedType));
  }
  /**
   * Method that carries out the actionApplicator's applyAction method based on the search in the pairs_ property for a given collision.
   * @param {Collidable} collider - the object that collided.
   * @param {Actor} collided - the object that was collided into.
   */
  applyCollisionAction(collider, collided) {
    if(this.hasCollisionAction(collider.type, collided.type)) {
      this.pairs_.get(this.toKey_(collider.type, collided.type)).applyAction(collider, collided);
    }
  }
}
