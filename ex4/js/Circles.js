class Circles {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    //scale de la forme
    this.originRadius = radius;
    this.targetRadius = radius;
    this.hue = Math.round(Math.random() * 360);
    this.originHue = this.hue;
    this.targetHue = this.hue;
    this.radius = radius;
    this.ctx = ctx;
    /*
        vitesse de d'incrémentation de t
      */
    this.speed = 0.01;
    /*
        t est un compteur qui va de 0 à 1
        qui definit la portion du chemin parcouru
      */
    this.t = 0;
  }

  draw(angle) {
    //check si on est arrivé à destination
    if (Math.abs(this.targetRadius - this.radius) > 0.01) this.scale();
    else this.radius = this.targetRadius; //on force la position finale

    this.ctx.fillStyle = `hsl(${this.hue},50%,50%)`;

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);

    this.ctx.rotate(angle);
    this.ctx.beginPath();
    this.ctx.arc(
      this.position.x / 5,
      this.position.y / 5,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  resetAndGo() {
    this.t = 0;
    this.originRadius = this.radius;
    if (this.radius == 0) {
      this.targetRadius = 100 + 100;
    } else {
      this.targetRadius = 0;
    }
    this.originHue = this.hue;
    this.targetHue = this.hue + 50;
  }

  //animation
  scale() {
    //on incrémente t par la vitesse
    this.t += this.speed;
    //on calcule le facteur d'interpolation suivant le type de easing
    const ease = Easing.bounceOut(this.t);

    //nouvelle position
    this.radius = Math.abs(
      this.originRadius + (this.targetRadius - this.originRadius) * ease
    );
    this.hue = this.originHue + (this.targetHue - this.originHue) * ease;
  }

  /**
   * calcul de la distance entre deux points
   */
  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
