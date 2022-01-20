/**
 * Genuary Day 20
 * "Make a sea of shapes"
 *
 * @motus_art
 */
const boxCount = 43;
const boxSize = 20;
const boxGap = boxSize * 0.2;
let timer = 0;
const speed = 0.002;


// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  frameRate(30);
}


// Draw tick
function draw() {
  // Styles
  background(39);
  fill(39);
  stroke(150);
  strokeWeight(1);

  // Camera
  rotateX(1.2);
  rotateZ(0.6);
  translate(boxSize * (boxCount * -0.6), boxSize * (boxCount * -0.6), -0);

  // Ocean
  for (let x = 0; x < boxCount; x++) {
    const xThea = sin((-timer * TWO_PI * 2) + (x / 3));

    for (let y = 0; y < boxCount; y++) {
      const yThea = cos((-timer * TWO_PI) + (y / 10));
      const h = map(xThea * yThea, -1, 1, 3, 8);

      push();
      translate(x * boxSize, y * boxSize, boxSize * h * 0.5);
      box(boxSize - boxGap);
      pop();
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
