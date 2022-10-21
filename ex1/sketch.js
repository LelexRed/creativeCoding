var x = 0;
var speed = 10;

function setup() {
  createCanvas(770, 1235);
  //windowResized();
  //
}

function draw() {
  background(221, 194, 47);

  //rect haut
  rect(0, x, windowWidth / 3.5, windowHeight / 4.46);
  fill("black");
  x += speed;
  if (x < 0 || x > height) {
    speed *= -1;
  }

  //line(x, 0, x, height);

  //rect bas
  rect(x, windowHeight / 1.304, windowWidth, windowWidth / 10);
  fill(38, 37, 43);
  x += speed;
  if (x < 0 || x > height) {
    speed *= -1;
  }
}
