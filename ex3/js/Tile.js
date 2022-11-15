class Tile {
  // this = pour que variable peut passer d'une fonction à l'autre
  constructor(x, y, size, color, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = false;
    this.angle = Math.round(Math.random()) * (Math.PI / 2);
    this.ctx = ctx;
    // this.bgColor = color;
    //this.lineColor = this.bgColor === "black" ? "pink" : "black";
  }

  //accède aux functions mathématiques déjà existentes
  updateAngle() {
    this.angle += Math.PI / 2;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);

    //this.ctx.fillStyle = this.bgColor;
    this.ctx.fillStyle = "#B22222";
    this.ctx.beginPath();
    this.ctx.rect(5 - this.size / 2, -this.size / 2, this.size, this.size);
    this.ctx.fill();
    this.ctx.closePath();

    // this.ctx.strokeStyle = this.lineColor;

    this.ctx.lineWidth = 20;
    this.ctx.beginPath();

    this.ctx.strokeStyle = "white";
    this.ctx.arc(
      0 - this.size / 2,
      0 + this.size / 2,
      this.size / 2,
      //début point et fin du point
      Math.PI * 1.5,
      0,
      false
    );
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    //
    this.ctx.beginPath();

    this.ctx.strokeStyle = "white";
    this.ctx.arc(
      0 - this.size / 2,
      0 - this.size / 2,
      this.size / 2,
      0,
      Math.PI / 2,
      false
    );
    // this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    // line
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";

    this.ctx.moveTo(-this.size, this.size);
    this.ctx.lineTo(-this.size, -this.size);
    this.ctx.stroke();

    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
