class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.angle = Math.random() * 360;
  }

  draw() {
    const luminosity_percentage = this.detectLuminance(this.color_decomposed);
    if (luminosity_percentage > 0.16) {
      this.ctx.save();
      this.ctx.beginPath();
      // this.ctx.arc(0, 0, this.radius * luminosity_percentage, 0, 2 * Math.PI); -> rond/line
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.restore();
      this.y += luminosity_percentage * 10;
    }
  }

  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }
}
