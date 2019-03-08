/**
 * Motus: 126 bpm
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 540;
const boxSize = 120;
const fps = 60;
let moving = 0;
const boxes = 8;
const bpm = 126;
let speed;
let rotationTick;
let rotation = 0;
let offset = 0;


function setup() {
  createCanvas(canvas, canvas, WEBGL);
  pixelDensity(2);
  frameRate(fps);
  setAttributes('antialias', true);

  // Settings
  speed = round((fps * 60) / bpm);
  rotationTick = HALF_PI / speed;
}


function draw() {
  // Background
  background(20);

  // Camera angle
  rotateX(1.25);
  rotateZ(0.25);

  // Style
  noFill();

  // Loop boxes
  for (let i = 0; i < boxes; i++) {
    push();

    // Active block
    if (i === moving) {
      rotation += rotationTick;
      rotateX(rotation);
    }

    // Position
    translate((i * boxSize) + (width / -1.5) + offset, 0);

    // Draw box
    stroke(255, 25);
    strokeWeight(7);
    box(boxSize);

    stroke(255, 100);
    strokeWeight(6);
    box(boxSize);

    stroke(255, 150);
    strokeWeight(4);
    box(boxSize);

    stroke(255);
    strokeWeight(3);
    box(boxSize);

    pop();
  }

  // Next block
  if (rotation >= HALF_PI) {
    moving++;
    rotation = 0;

    // End of the line
    if (moving >= boxes) {
      moving = 0;
      offset = 0;
    }
  }

  // Move line
  offset -= boxSize / (speed * boxes);
}
