function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background("black");
  noFill();
  stroke(255);

  translate(width / 2, height / 2);

  for (var i = -50; i < 10; i++) {
    push();

    // peut changer le * i et c'est koul
    rotate(sin(frameCount + i * 2) * 100);

    rect(0, 0, 600 - i * 3, 600 - i * 3, 200 - i);

    pop();
  }
}
