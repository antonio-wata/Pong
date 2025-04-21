var GameEngine = (function(GameEngine) {
  var PI2 = 2*Math.PI;
  var ab = 3*(Math.PI)/4;
  var ar = 5*(Math.PI)/4;

  class Ball {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;

      this.vx = 0;
      this.vy = 0;


      
    }

    update(elapsed) {
      this.x += this.vx * elapsed;
      this.y += this.vy * elapsed;
      /*
      if(this.angle == 0 || this.angle == Math.PI){
      	this.angle = Math.random()*(ab-ar)+ar;
      }
*/
      if(Math.floor(Math.random()*2) == 1){
      	this.angle = Math.random()*(ab-ar)+ar;
      }else{
      	this.angle = Math.random()*(ab-ar)+ar + Math.PI;
      }

    }

    render(ctx) {
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, PI2);
      ctx.fill();  
    }
  }

  GameEngine.Ball = Ball;
  return GameEngine;
})(GameEngine || {})