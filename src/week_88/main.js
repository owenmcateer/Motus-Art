/**
 * Motus: Chequered brain
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const border = 80;
const lines = 17;
const resolution = lines;
const freq = (canvasSize - (border * 2)) / resolution;
const lineSpace = (canvasSize - (border * 2)) / lines;
const amplitude = lineSpace * 1.8;

const triggerArea = 220;
let triggerPos = -triggerArea;
const triggerSpeed = 4;


function setup() {
  createCanvas(canvasSize, canvasSize);
}


function draw() {
  background(220);
  noFill();
  stroke(39);
  strokeWeight(8);

  for (let l = 0; l <= lines; l++) {
    beginShape();

    const pointY = l * lineSpace + border;
    let yNoise = constrain(dist(0, triggerPos, 0, pointY), -triggerArea, triggerArea);
    yNoise = map(yNoise, -triggerArea, triggerArea, 1, 0);

    for (let r = 0; r <= resolution; r++) {
      const pointX = r * freq + border;

      // Calculate noise
      let noiseAmount = noise(r, l * canvasSize);
      noiseAmount = map(noiseAmount, 0, 1, -amplitude, amplitude);
      noiseAmount *= yNoise;

      // Draw vertex point
      curveVertex(pointX, pointY + noiseAmount);

      // If first or last point, draw twice.
      // Required for curveVertex to get angle.
      if (r === 0 || r === resolution) {
        curveVertex(pointX, pointY + noiseAmount);
      }
    }
    endShape();
  }

  triggerPos += triggerSpeed;
  if (triggerPos >= canvasSize + triggerArea) {
    triggerPos = -triggerArea;
  }
}
