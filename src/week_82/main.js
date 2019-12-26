/**
 * Motus: Twisted diamond
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
let timer = 0;
const speed = 0.0035;
const rows = 9;
let bottomYoffset;
const spacing = 60;
const dotSize = 30;


function setup() {
  createCanvas(canvasSize, canvasSize);
  bottomYoffset = (rows * 2) * spacing - 20;
}


function draw() {
  background(40);
  fill(239);
  noStroke();

  const phaser = timer * TWO_PI;

  for (let i = 0; i < rows; i++) {
    const offset = i / rows;
    const ii = i / 15;
    fill(239);
    noStroke();

    // Right
    const x = sin(phaser + ii) * (offset * 350) + cx;
    const y = i * spacing + 50;
    const s = map(cos(phaser), -1, 1, 0, 50);
    ellipse(x, y, (s * offset) + dotSize);

    // Left
    const x2 = sin(phaser + ii) * -(offset * 350) + cx;
    const s2 = map(cos(phaser), -1, 1, 50, 0);
    ellipse(x2, y, (s2 * offset) + dotSize);

    // Bottom half
    if (i < rows - 1) {
      ellipse(x, bottomYoffset - y, (s * offset) + dotSize);
      ellipse(x2, bottomYoffset - y, (s2 * offset) + dotSize);
    }

    // Lines
    noFill();
    stroke(239);
    line(x, y, x2, y);

    // Bottom line
    if (i < rows - 1) {
      line(x, bottomYoffset - y, x2, bottomYoffset - y);
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
