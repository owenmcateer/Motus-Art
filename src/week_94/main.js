/**
 * Motus: The Reactor
 * https://owenmcateer.github.io/Motus-Art
 */
const pillars = 30;
let timer = 0;
const speed = 0.0025;


function setup() {
  createCanvas(540, 540, WEBGL);
  pixelDensity(2);
  smooth();
}


function draw() {
  // Styling
  background(239);
  fill(39);
  stroke(100);
  strokeWeight(2);

  // Positioning
  scale(1.2);
  translate(20, 0);
  rotateY(HALF_PI / 2);
  rotateZ(timer * TWO_PI);

  // Draw pillars
  for (let i = 0; i < pillars; i++) {
    push();
    const pillarHeight = map(cos(((timer * 2) + (i / pillars)) * TWO_PI), -1, 1, 0, 100);
    rotate((TWO_PI / pillars) * i);
    translate(100, pillarHeight);

    // Draw rows
    for (let j = 0; j < 4; j++) {
      translate(10, 0);
      box(4, 20, ((j % 2) * 100) - pillarHeight);
    }
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
