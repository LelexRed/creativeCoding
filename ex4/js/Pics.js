class Pics {
  constructor(x, y, radius, ctx, scaleP) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.scaleP = scaleP;
    this.targetScale = scaleP;
    this.originScale = scaleP;
    this.radius = radius;
    this.hue = Math.round(Math.random() * 360);
    this.originHue = this.hue;
    this.targetHue = this.hue;
    this.t = 0;
    this.speed = 0.01;
  }

  draw(angle) {
    //check si on est arrivé à destination
    if (Math.abs(this.targetScale - this.scaleP) > 0.01) this.scale();
    else this.scaleP = this.targetScale; //on force la position finale

    // console.log("DRAW", this.scaleP);

    // first pics
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(angle);
    this.ctx.scale(this.scaleP, this.scaleP);
    this.ctx.fillStyle = "pink";
    this.ctx.beginPath();
    this.ctx.moveTo(-50, 300);
    this.ctx.lineTo(50, 300);
    this.ctx.lineTo(0, 500);
    this.ctx.stroke();
    this.ctx.strokeStyle = "pink";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }

  resetAndGo() {
    //console.log("reset and go");
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

  scale() {
    // console.log("scale");
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.bounceOut(this.t);
    // console.log("ease", ease, this.t);

    //nouvelle position
    // on part de la position d'origine
    // on calcul la distance totale à parcourir (v2-v1)
    // on multiplie cette distance par le facteur d'interpolation
    // this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    // this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
    this.scaleP = Math.abs(
      this.originScale + (this.targetScale - this.originScale) * ease
    );

    // console.log(this.scaleP);
    // this.hue = this.originHue + (this.targetHue - this.originHue) * ease;
  }

  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
