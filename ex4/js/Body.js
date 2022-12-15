class Body {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = 250;
    this.ctx = ctx;
  }

  draw(x, y) {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.fillStyle = "pink";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius + 60, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = "pink";
    this.ctx.closePath();
    this.ctx.restore();
  }
}
