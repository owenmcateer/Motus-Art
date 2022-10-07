/**
 * Motus: Low poly waves
 * https://owenmcateer.github.io/Motus-Art
 */
const gridCount = 20;
const gridSize = 100;
let wavePhase = 0;
const waveHeight = 150;

// Setup
function setup() {
  createCanvas(1080, 1080, WEBGL);
}

// Draw tick
function draw() {
  background(0);
  stroke(239);
  strokeWeight(2);

  lightFalloff(0.97, 0.003, 0);
  pointLight(3, 227, 252, -400, 200, -400);
  pointLight(3, 227, 252, 600, 200, 600);
  directionalLight(1.5, 114, 126, 30, 300, -200);
  specularMaterial(39);
  shininess(2);

  translate(gridSize * gridCount * -0.51, -280, gridSize * gridCount * -0.4);
  rotateX(PI * 0.41);
  rotateZ(-0.5);

  for (let y = 0; y < gridCount; y++) {
    stroke(map(y, 0, gridCount, 39, 239));
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < gridCount; x++) {
      const z = sin(x / 3 + wavePhase)
              * cos(y / 4 + -wavePhase)
              * sin(x / 2 + wavePhase) * waveHeight;
      vertex(x * gridSize, y * gridSize, z);

      const z2 = sin(x / 3 + wavePhase)
               * cos((y + 1) / 4 + -wavePhase)
               * sin(x / 2 + wavePhase) * waveHeight;
      vertex(x * gridSize, (y + 1) * gridSize, z2);
    }
    endShape();
  }

  wavePhase = frameCount * 0.01;
}
