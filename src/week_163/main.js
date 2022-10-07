/**
 * Motus: Twisted audio
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 0;
const speed = 1 / 1200;
let colourValue = 200;
let scaleValue = 1;
const pings = [
  232,
  714,
  1192,
  1673,
  2159,
  2632,
  3106,
];

// Setup
function setup() {
  createCanvas(1080, 1080, WEBGL);
  frameRate(60);
}

// Draw tick
function draw() {
  colourValue = max(220, colourValue -= 0.2);
  scaleValue = min(1, scaleValue += 0.01);
  if (pings.includes(frameCount)) {
    colourValue = 239;
    scaleValue = 0.7;
  }

  ambientLight(colourValue, colourValue, colourValue);
  pointLight(255, 255, 255, 1500, 0, 50);
  shininess(0.05);

  background(39);
  fill(colourValue);
  stroke(0);
  strokeWeight(2);

  // Ring
  rotateX(t * TWO_PI);
  rotateY(t * TWO_PI);
  for (let i = 0; i < TWO_PI; i += TWO_PI / 90) {
    push();
    rotateZ(i + t * TWO_PI);
    translate(0, 400);
    rotateX(t * TWO_PI * -5 + cos(i * 4));
    box(15, 300, 50);
    pop();
  }

  t += speed;
  if (t >= 1) {
    t = 0;
  }
}
