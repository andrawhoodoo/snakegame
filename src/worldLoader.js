/** Class representing an object that can read level data and create the level's non-player actors in the world model. */

class WorldLoader {
  /**
   * Method that takes a level and adds the actors to the world model.
   * @param {array} levelData - an array of strings from the levelCreator.
   * @param {class} - the world model you are loading the level to.
   */
  readData(levelData, w) {
    levelData.forEach((item, index) => item.split("").forEach((a, x) => {
      if(a === "f") w.addActor(new Food(x, index));
      else if (a === "w") w.addActor(new Wall(x, index));
    }));
  }
}
