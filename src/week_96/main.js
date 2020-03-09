/**
 * Motus: Dance of the fireflies
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
let timer = 0;
const speed = 0.0005;
const arms = 10;
const noiseScale = 160;


function setup() {
  createCanvas(canvasSize, canvasSize);
}


function draw() {
  background(39);
  noStroke();
  fill(255, 100);

  // Arms
  for (let i = 1; i < arms; i++) {
    // Entities
    for (let j = 1; j < 7; j++) {
      const stageJ = j / 5;
      const phase = (i % arms) * timer;
      const x = sin(phase * 2 * TWO_PI) * (stageJ * 340) + cx;
      const y = cos(phase * TWO_PI) * (stageJ * 340) + cx;
      // Draw entity
      fill(255, (noise(x / noiseScale, y / noiseScale) * 80) + 20);
      ellipse(x, y, 90);
    }
  }

  // Border
  noFill();
  stroke(100);
  strokeWeight(2);
  rect(40, 40, width - 80, height - 80);

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
