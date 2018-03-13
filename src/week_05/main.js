/**
 * Motus: Noctiluca scintillans
 * https://owenmcateer.github.io/Motus-Art
 *
 * Inspiration and orgiona code from Dexter Shepherd's Pumpkin wave article:
 * https://blog.kadenze.com/creative-technology/p5-js-crash-course-pumpkin-wave/
 */
const canvas = 1080;
const numPoints = 1500;
const modelSize = 200;
let wavePhase = 0;
const waveVertices = [];

function setup() {
  createCanvas(canvas, canvas, WEBGL);

  for (let i = 0; i < numPoints; i++) {
    waveVertices[i] = createVector(random(-5, 5), 0, random(-5, 5));
  }
}

function draw() {
  background(0);
  // base lighting color
  ambientLight(10, 200, 255);

  // Position camera
  rotateZ(radians(180));
  rotateX(radians(20));
  rotateY(radians(90));
  translate(0, 50, 0);

  for (let i = 0; i < numPoints; i++) {
    // Calculate wave
    const waveVertex = waveVertices[i];
    waveVertex.y = sin(waveVertex.x + wavePhase) * cos(waveVertex.z + wavePhase) * 0.4;
    const vert = createVector(waveVertex.x, waveVertex.y, waveVertex.z);

    // Draw
    push();
    translate(vert.x * modelSize, vert.y * modelSize, vert.z * modelSize);
    noStroke();
    box(2, 2, 2, 1, 1);
    pop();
  }

  wavePhase = frameCount * 0.02;
}
