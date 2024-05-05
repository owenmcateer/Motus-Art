/**
 * Waving stars
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
const s = 170 / 2;
let timer = 0;

function setup() {
  createCanvas(960, 960);
  background(39);
}

function draw() {
  background(39);
  stroke(239);
  noFill();
  rectMode(CENTER);

  timer = frameCount * 0.005;

  for (let x = 0; x < width; x += s) {
    for (let y = 0; y < height; y += s) {
      drawShape(x, y, timer + (-x * 0.0001) + (-y * 0.00025));
    }
  }
}

// Draw a shape at x, y with rotation t
function drawShape(x, y, t) {
  push();
  translate(x, y);
  rotate(t);
  rect(0, 0, s, s);
  pop();

  push();
  translate(x + s, y);
  rotate(-t);
  rect(0, 0, s, s);
  pop();

  push();
  translate(x, y + s);
  rotate(-t);
  rect(0, 0, s, s);
  pop();

  push();
  translate(x + s, y + s);
  rotate(t);
  rect(0, 0, s, s);
  pop();
}
