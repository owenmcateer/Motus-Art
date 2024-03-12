/**
 * Cubes & math
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
function setup() {
  createCanvas(1080, 1080, WEBGL);
}

function draw() {
  smooth();
  background(0);
  stroke(255);
  strokeWeight(1.5);
  fill(5, 100);

  const s = 80;
  const grid = 11;
  const t = frameCount / 50;

  translate(s * (grid - 1) * -0.5, s * (grid - 1) * -0.5, 0);

  for (let x = 0; x < grid; x++) {
    for (let y = 0; y < grid; y++) {
      push();
      const z = sin(noise(x, y) * cos(t + x -y) + t) * tan(t + (x + 1) * (y + 1)) * s * 2.2;
      translate(x * s, y * s, z);
      
      if (x === 5 && y === 5) {
        rotateX(t);
        rotateY(t);
        scale(0.9)
      }
      box(s * 0.9);
      pop();
    }
  }
}
