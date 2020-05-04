/**
 * Motus: Eclipse diamond
 */
const canvasSize = 520;
const cx = canvasSize / 2;
const radius = 190;
const pointsDetail = 200;
const pointsAngle = (Math.PI * 2) / pointsDetail;
let numOfRings = 3;
const freq = 5;
const amplitude = 36;

let timer = 0;
const speed = 0.02;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(30);
  pixelDensity(2);
}


// Draw tick
function draw() {
  background(39);
  noFill();
  stroke(239, 200);
  strokeWeight(10);

  // Number of rings changes
  numOfRings = map(sin(timer), -1, 1, 2, 5);

  // Draw rings
  for (let ring = 0; ring < numOfRings; ring++) {
    const angleOffset = (TWO_PI / numOfRings) * ring;

    // Draw ring
    beginShape();
    for (let i = 0; i < TWO_PI; i += pointsAngle) {
      const amp = constrain(sin(timer - i) * amplitude, 2, amplitude);
      const movement = timer;

      const wave = cos(i * freq + angleOffset + movement) * amp;
      const x = (cos(i) * (radius + wave)) + cx;
      const y = (sin(i) * (radius + wave)) + cx;
      vertex(x, y);
    }
    endShape();
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}
