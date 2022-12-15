class Eye {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.setup();
  }

  setup() {}

  draw(x, y) {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius + 60, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
    //
    // calculate the angle between the eye and the mouse
    const angle = Math.atan2(y - this.y, x - this.x);
    // calculate the position of the pupil
    const pupilX = this.x + Math.cos(angle) * this.radius * 0.3;
    const pupilY = this.y + Math.sin(angle) * this.radius * 0.3;
    this.ctx.save();
    this.ctx.translate(pupilX, pupilY);
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 110, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.closePath();
    this.ctx.restore();

    // petite pupille
    const pupilA = this.x + Math.cos(angle) * this.radius * 0.5;
    const pupilB = this.y + Math.sin(angle) * this.radius * 0.5;
    this.ctx.save();
    this.ctx.translate(pupilA, pupilB);
    this.ctx.beginPath();
    this.ctx.arc(10, -35, 80, 0, Math.PI * 2);
    this.ctx.fillStyle = "white";
    this.ctx.fill();

    this.ctx.closePath();
    this.ctx.restore();

    // petite petite pupille

    const pupilC = this.x + Math.cos(angle) * this.radius * 0.5;
    const pupilD = this.y + Math.sin(angle) * this.radius * 0.5;
    this.ctx.save();
    this.ctx.translate(pupilC, pupilD);
    this.ctx.beginPath();
    this.ctx.arc(-50, 60, 20, 0, Math.PI * 2);
    this.ctx.fillStyle = "white";
    this.ctx.fill();

    this.ctx.closePath();
    this.ctx.restore();
  }

  resetAndGo() {
    console.log("reset and go");
    this.pied[0].resetAndGo();
    this.pied[1].resetAndGo();
    this.t = 0;
    if (this.scaleP == 0) {
      this.targetScale = 1;
      this.originScale = 0;
    } else {
      this.targetScale = 0;
      this.originScale = 1;
    }
    // this.originHue = this.hue;
    // this.targetHue = this.hue + 50;
    // this.scaleP = 0;
  }
}
