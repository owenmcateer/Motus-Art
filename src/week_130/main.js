/**
 * Motus: Wave Machine
 * https://owenmcateer.github.io/Motus-Art
 */
const boxCount = 26;
const boxSize = 15;
let timer = 0;
const speed = 0.0008;


// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  pixelDensity(2);
  frameRate(30);
}


// Draw tick
function draw() {
  // Styles
  background(39);
  fill(239);
  stroke(100);
  strokeWeight(1);

  // Camera
  rotateX(1.25);
  rotateZ(-timer * TWO_PI);
  translate(boxSize * (boxCount * -0.5), boxSize * (boxCount * -0.5), -90);

  // Ocean
  for (let x = 0; x < boxCount; x++) {
    const xThea = sin((timer * TWO_PI * 8) + (x / 3));

    for (let y = 0; y < boxCount; y++) {
      const yThea = cos((timer * TWO_PI * 4) + (y / 10));
      const h = map(xThea * yThea, -1, 1, 3, 8);

      // Option 1, block
      // for (let z = 0; z < h; z++) {
      //   boxHeight = boxSize;
      //   if (h-z<1) {
      //     boxHeight *= h - z;
      //   }
      //   push();
      //   translate(x*boxSize, y*boxSize, z*boxSize-(boxSize-boxHeight));
      //   box(boxSize, boxSize, boxHeight);
      //   pop();
      // }

      // Option 2, single block
      push();
      translate(x * boxSize, y * boxSize, boxSize * h * 0.5);
      box(boxSize, boxSize, h * boxSize);
      pop();
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
