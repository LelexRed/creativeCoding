/**
 *  EASING REF:
 *  https://easings.net/#
 */

let allPics = [];
let allCircles = [];
class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.all_bouche = [];
    this.setup();
  }

  setup() {
    this.mouse = { x: 0, y: 0 };

    const center = {
      x: (window.innerWidth / 2) * this.pixelRatio,
      y: (window.innerHeight / 2) * this.pixelRatio,
    };

    this.circles = new Circles(
      (window.innerWidth / 2) * this.pixelRatio,
      (window.innerHeight / 2) * this.pixelRatio,
      0,
      this.ctx
    );

    //BODY
    this.body = new Body(center.x, center.y, this.radius, this.ctx);

    //PICS
    for (let i = 0; i < 20; i++) {
      let pics = new Pics(center.x, center.y, 0, this.ctx, 0);

      allPics.push(pics);
    }
    //console.log(allPics);
    //WINGS
    this.wingsone = new Wings(center.x - 300, center.y - 200, 80, this.ctx);
    this.wingstwo = new Wings(center.x + 300, center.y - 200, 80, this.ctx);

    //EYES
    this.eyeone = new Eye(center.x - 120, center.y - 100, 50, this.ctx);
    this.eyetwo = new Eye(center.x + 120, center.y - 100, 50, this.ctx);

    //permet de bouger
    document.addEventListener("mousemove", this.move.bind(this));
    document.addEventListener("click", this.click.bind(this));

    //pétales
    this.ctx.save();
    // this.ctx.translate(center.x, center.y);

    for (let i = 0; i < 20; i++) {
      let circles = new Circles(center.x, center.y, 300, this.ctx);

      allCircles.push(circles);
    }
    this.ctx.restore();

    //this.circle = new Circle(center.x - 200, center.y - 200, 300, this.ctx);
    //this.circle2 = new Circle(center.x - 300, center.y - 200, 300, this.ctx);

    this.draw();
  }

  // click(e) {}

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.wingsone.draw(this.mouse.x, this.mouse.y);
    this.wingstwo.draw(this.mouse.x, this.mouse.y);

    // lenght recup quantité du tableau, 10 = espace entre chaque pique, nb de radien entre chaque pique
    for (let i = 0; i < allPics.length; i++) {
      allPics[i].draw((i / 10) * Math.PI);
    }

    for (let i = 0; i < allCircles.length; i++) {
      allCircles[i].draw((i / 10) * Math.PI);
    }
    // this.circle.draw();
    // this.circle2.draw();

    this.body.draw();

    this.eyeone.draw(this.mouse.x, this.mouse.y);
    this.eyetwo.draw(this.mouse.x, this.mouse.y);

    requestAnimationFrame(this.draw.bind(this));
  }

  click(e) {
    for (let i = 0; i < allPics.length; i++) {
      setTimeout(() => {
        allPics[i].resetAndGo();
      }, i * 40);
    }

    for (let i = 0; i < allCircles.length; i++) {
      allCircles[i].resetAndGo();
    }
    //this.circle.resetAndGo();
    //this.circle2.resetAndGo();
  }

  move(e) {
    this.mouse = {
      x: e.clientX * this.pixelRatio,
      y: e.clientY * this.pixelRatio,
    };
  }
}

window.onload = function () {
  new App();
};
