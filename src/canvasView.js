/** Class representing what our player sees on their screen.*/
class CanvasView extends View {
  /**
   * Create a new CanvasView. Calls the constructor of the parent class View.
   * @param {int} scalingFactor - integer with which the width and height for the canvas as well as the dimensions of the snake is determined.
   */
  constructor(scalingFactor) {
    super();
    this.scalingFactor_ = scalingFactor;
    this.canvas_ = document.createElement("canvas");
    this.canvas_.id = "game";
    document.body.appendChild(this.canvas_);
    this.context_= this.canvas_.getContext("2d");
  }
  /**
   * Determines the width and height of the canvas as well as the size of the actors utilizing the scaling factor property.  Also displays both the canvas and our actor's current position.
   * @param {class} World - the WorldModel class in which our Snake class lives, i.e. the WorldModel we want to display.
   */
  display(world) {
    this.canvas_.width = this.scalingFactor_*world.width;
    this.canvas_.height = this.scalingFactor_*world.height;
    world.actors.forEach(x => {
      if(x.type === "Snake") {
        this.context_.fillStyle = x.color; 
        for(let index = 0; index < x.parts_.length; index++) {
          this.context_.fillRect(x.parts_[index].posX*this.scalingFactor_, x.parts_[index].posY*this.scalingFactor_, this.scalingFactor_, this.scalingFactor_);
        }
      }
      else if(x.type === "Food") {
        this.context_.fillStyle = "rgb(0, 179, 202)";
        this.context_.fillRect(x.position.posX*this.scalingFactor_, x.position.posY*this.scalingFactor_, this.scalingFactor_, this.scalingFactor_);
      }
      else if(x.type === "Wall") {
        this.context_.fillStyle = "black";
        this.context_.fillRect(x.position.posX*this.scalingFactor_, x.position.posY*this.scalingFactor_, this.scalingFactor_, this.scalingFactor_);
      }
    });
  }
  /**
   * removes the canvas from the document in the event of the game ending.
   */
  dispose() {
    document.body.removeChild(this.canvas_);
  }
}

module.exports = CanvasView;