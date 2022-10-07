/**
 * Motus: 500k lines
 * https://owenmcateer.github.io/Motus-Art
 */
let progress = 0;
const linesToDraw = 500000;
const linesPerSet = 2500;
const voidSize = 100;

// Setup
function setup() {
  createCanvas(1080, 1080);
  background(0);
}

// Draw tick
function draw() {
  translate(width / 2, height / 2);
  rotate(-HALF_PI);
  stroke(255, 4);

  for (let i = 0; i < linesPerSet; i++) {
    const angle = (TWO_PI / linesToDraw) * (progress + i);
    const radLength = random(voidSize, 520);
    line(
      cos(angle) * voidSize,
      sin(angle) * voidSize,
      cos(angle) * radLength,
      sin(angle) * radLength,
    );
  }

  progress += linesPerSet;
  if (progress > linesToDraw - linesPerSet) {
    noLoop();
  }
}
