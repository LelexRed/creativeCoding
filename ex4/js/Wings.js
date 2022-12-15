class Wings {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
  }

  draw(x, y) {
    // calculate the angle between the eye and the mouse
    const angle = Math.atan2(y - this.y, x - this.x);
    // calculate the position of the pupil
    const wingsX = this.x + Math.cos(angle) * this.radius * 0.3;
    const wingsY = this.y + Math.sin(angle) * this.radius * 0.3;
    this.ctx.save();
    this.ctx.translate(wingsX, wingsY);
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(0, 240, this.radius + 60, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(0, 120, this.radius * 2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.closePath();
    this.ctx.restore();
  }
}
