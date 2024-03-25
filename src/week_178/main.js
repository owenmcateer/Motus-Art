/**
 * Lines &amp; Loops
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
const speed = 0.00075;
let t = 0;

// Setup
function setup() {
  createCanvas(800, 800);
}

// Tick
function draw() {
  background(39);
  stroke(239, 100);
  strokeWeight(4);

  translate(width * 0.5, height * 0.5);

  const radius = cos(t * TWO_PI) * width * 0.845;
  const cirRadius = sin(t * TWO_PI) * 512;

  const cirOffset = TWO_PI / 21;

  for (let cir = 0; cir < TWO_PI; cir += cirOffset) {
    const centerX = cos(cir + t * 4 * cirOffset) * 60;
    const centerY = sin(cir + t * 4 * cirOffset) * 60;

    const cirX = cos(cir + t * 4 * cirOffset) * radius;
    const cirY = sin(cir + t * 4 * cirOffset) * radius;

    for (let i = 0; i < TWO_PI; i += TWO_PI / 12) {
      const x = cos(i + -t * TWO_PI) * cirRadius + cirX;
      const y = sin(i + -t * TWO_PI) * cirRadius + cirY;

      strokeWeight(1);
      line(x, y, centerX, centerY);
    }
  }

  t += speed;
  if (t >= 1) {
    t = 0;
  }
}
